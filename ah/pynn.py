# -*- coding: utf-8 -*-
"""
Pynn — Monthly Model with Retention Accumulation & Enhanced Timeline (Streamlit, self-bootstrapping)

Interpretation:
- S_new = new Startups added EACH month
- G_new = new Investors added EACH month
- Monthly retention r_s, r_g keep a fraction of actives month-to-month.
- Actives accumulate: Active_S(t) = S_new * (1 - r_s^t) / (1 - r_s)

Everything is MONTHLY (EUR/month for prices and costs).
Required = Base + Marketing + (DiscountRate × CompanyValue)/12  (EUR/month).

Run any of:
    py pynn.py
    python pynn.py
    streamlit run pynn.py

Requires:
    pip install streamlit plotly numpy pandas
"""

from __future__ import annotations
from dataclasses import dataclass
from typing import Optional
import os, sys, subprocess
import math

import numpy as np
import pandas as pd
import plotly.graph_objects as go


# ---------- Self-bootstrap Streamlit (no recursive respawn) ----------
BOOT_FLAG = "PYNN_BOOTSTRAPPED"

def _launched_by_streamlit() -> bool:
    if os.environ.get(BOOT_FLAG) == "1":
        return True
    return any(
        os.environ.get(k)
        for k in ("STREAMLIT_SERVER_PORT", "STREAMLIT_RUNTIME", "STREAMLIT_EXECUTION_CONTEXT")
    )

def _bootstrap_streamlit():
    script_path = os.path.abspath(__file__)
    env = os.environ.copy()
    env[BOOT_FLAG] = "1"
    try:
        subprocess.run([sys.executable, "-m", "streamlit", "run", script_path], check=False, env=env)
    except FileNotFoundError:
        print("Streamlit not found. Install with:  pip install streamlit", file=sys.stderr)


# --------------------------------- Model --------------------------------- #
@dataclass
class Model:
    # Pricing (EUR per month)
    price_startup_eur: float = 19.0
    price_investor_eur: float = 79.0

    # NEW customers per month (acquisitions)
    S_new_per_month: int = 50
    G_new_per_month: int = 50

    # Company finance (EUR per month except value)
    base_costs_eur: float = 10_000.0
    marketing_costs_eur: float = 5_000.0
    company_value_eur: float = 2_500_000.0  # absolute EUR
    discount_rate_pct: float = 10.0         # annual percent

    # Retention (monthly stay probability)
    retention_startup: float = 0.92
    retention_investor: float = 0.92


# ------------------------------- Calculations ------------------------------ #
def monthly_required_eur(m: Model) -> float:
    r_annual = m.discount_rate_pct / 100.0
    return (m.base_costs_eur + m.marketing_costs_eur) + (r_annual * m.company_value_eur) / 12.0

def actives_constant_new(new_per_month: float, r: float, months: int) -> np.ndarray:
    """Active_t with constant acquisitions and retention r: N * (1 - r^t) / (1 - r), t=1..T."""
    if months <= 0:
        return np.zeros(0)
    t = np.arange(1, months + 1)
    r = float(np.clip(r, 0.0, 0.9999))  # guard for r≈1
    # When r == 0 → Active_t = N (only the newest month remains)
    return new_per_month * (1.0 - (r ** t)) / (1.0 - r) if r != 1.0 else new_per_month * t

def project_timeline(m: Model, months: int) -> pd.DataFrame:
    """Monthly projection with accumulation via retention."""
    act_S = actives_constant_new(m.S_new_per_month, m.retention_startup, months)
    act_G = actives_constant_new(m.G_new_per_month, m.retention_investor, months)

    price_S, price_G = m.price_startup_eur, m.price_investor_eur
    revenue = act_S * price_S + act_G * price_G
    required = np.full(months, monthly_required_eur(m))
    net = revenue - required
    cum_net = np.cumsum(net)

    # monthly discount factor (simple) from annual rate
    d = (m.discount_rate_pct / 100.0) / 12.0
    df = 1.0 / ((1.0 + d) ** np.arange(1, months + 1))
    npv_net = net * df

    return pd.DataFrame({
        "Month": np.arange(1, months + 1),
        "Active S": act_S,
        "Active G": act_G,
        "Revenue EUR/mo": revenue,
        "Required EUR/mo": required,
        "Net EUR/mo": net,
        "Cum Net EUR": cum_net,
        "NPV(Net)": npv_net
    })

def steady_state_values(m: Model) -> dict:
    """Steady-state actives and MRR if acquisitions continue forever."""
    r_s = float(np.clip(m.retention_startup, 0.0, 0.9999))
    r_g = float(np.clip(m.retention_investor, 0.0, 0.9999))
    ss_act_S = (m.S_new_per_month / (1.0 - r_s)) if r_s < 1.0 else np.inf
    ss_act_G = (m.G_new_per_month / (1.0 - r_g)) if r_g < 1.0 else np.inf
    ss_mrr = ss_act_S * m.price_startup_eur + ss_act_G * m.price_investor_eur
    return {"ss_act_S": ss_act_S, "ss_act_G": ss_act_G, "ss_mrr": ss_mrr}

def break_even_rate_pct(company_value_eur: float, costs_monthly: float, revenue_monthly: float) -> float:
    """r = 12*(rev - costs)/value  → annual %."""
    if company_value_eur <= 0:
        return 0.0
    r = 12.0 * (revenue_monthly - costs_monthly) / company_value_eur
    return max(0.0, r * 100.0)

def first_payback_month(cum_net: np.ndarray) -> Optional[int]:
    idx = np.where(cum_net >= 0)[0]
    return int(idx[0] + 1) if idx.size else None

def months_to_fraction_ss(retention: float, fraction: float = 0.9) -> Optional[int]:
    """Solve 1 - r^t >= fraction ⇒ r^t <= 1 - fraction ⇒ t >= log(1 - fraction)/log(r)."""
    r = float(retention)
    if not (0.0 < r < 1.0):
        return None
    try:
        t = math.log(1.0 - fraction) / math.log(r)
        return int(math.ceil(t))
    except Exception:
        return None


# --------------------------------- Charts --------------------------------- #
FOOTER = "Made in Boden, Boanova"

def chart_overview_month(rev: float, req: float) -> go.Figure:
    gap = rev - req
    over = gap >= 0
    ymax = max(rev, req) * 1.25 if max(rev, req) > 0 else 1.0

    fig = go.Figure()
    fig.add_trace(go.Bar(name="Revenue (EUR / month)", x=["This month"], y=[rev]))
    fig.add_trace(go.Bar(name="Required (EUR / month)", x=["This month"], y=[req]))
    fig.update_layout(
        title="Revenue vs Required — EUR per month (selected month)",
        barmode="group", hovermode="x", template="plotly_white",
        margin=dict(l=60, r=20, t=60, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
        yaxis=dict(range=[0, ymax], tickformat=",.0f"),
    )
    fig.update_traces(hovertemplate="%{y:,.0f} EUR")
    fig.add_annotation(
        x=0, y=ymax*0.98, xref="x", yref="y",
        text=f"{abs(gap):,.0f} EUR {'surplus' if over else 'needed'}",
        showarrow=False, font=dict(color=("green" if over else "crimson"), size=14)
    )
    fig.add_annotation(
        x=0.5, y=-0.2, xref="paper", yref="paper",
        text=FOOTER,
        showarrow=False, font=dict(size=12, color="#808080")
    )
    return fig

def chart_timeline_actives_stacked(df: pd.DataFrame, ss_S: float, ss_G: float) -> go.Figure:
    x = df["Month"]; yS = df["Active S"]; yG = df["Active G"]
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=yS, mode="lines", name="Active Startups (S)", stackgroup="one", hovertemplate="%{y:,.0f}"))
    fig.add_trace(go.Scatter(x=x, y=yG, mode="lines", name="Active Investors (G)", stackgroup="one", hovertemplate="%{y:,.0f}"))
    fig.add_hline(y=ss_S, line_dash="dot", line_color="#5b9bd5", annotation_text="SS S", annotation_position="top left")
    fig.add_hline(y=ss_G, line_dash="dot", line_color="#ed7d31", annotation_text="SS G", annotation_position="bottom left")
    fig.update_layout(
        title="Active Customers over Time (stacked: S + G) — accumulation with retention",
        xaxis_title="Month", yaxis_title="Active customers",
        hovermode="x unified", template="plotly_white",
        margin=dict(l=60, r=20, t=60, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
    )
    fig.add_annotation(x=0.5, y=-0.18, xref="paper", yref="paper", text=FOOTER, showarrow=False,
                       font=dict(size=12, color="#808080"))
    return fig

def chart_timeline_finance(df: pd.DataFrame, ss_mrr: float, mrr_break_month: Optional[int], payback_month: Optional[int]) -> go.Figure:
    x = df["Month"]; rev = df["Revenue EUR/mo"]; req = df["Required EUR/mo"]
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=rev, mode="lines+markers", name="Revenue EUR/mo", hovertemplate="%{y:,.0f} EUR"))
    fig.add_trace(go.Scatter(x=x, y=req, mode="lines", name="Required EUR/mo", hovertemplate="%{y:,.0f} EUR"))
    fig.add_hline(y=ss_mrr, line_dash="dot", line_color="#2ca02c", annotation_text="SS MRR", annotation_position="top left")
    if mrr_break_month is not None:
        fig.add_vline(x=mrr_break_month, line_dash="dot", line_color="#888")
        fig.add_annotation(x=mrr_break_month, y=max(rev.max(), req.max())*1.02, xref="x", yref="y",
                           text=f"MRR ≥ Required @ m{mrr_break_month}", showarrow=False, font=dict(size=11, color="#666"))
    if payback_month is not None:
        fig.add_vline(x=payback_month, line_dash="dash", line_color="#444")
        fig.add_annotation(x=payback_month, y=max(rev.max(), req.max())*0.95, xref="x", yref="y",
                           text=f"Payback @ m{payback_month}", showarrow=False, font=dict(size=11, color="#444"))
    fig.update_layout(
        title="MRR vs Required over Time (with Steady-State)",
        xaxis_title="Month", yaxis_title="EUR per month",
        hovermode="x unified", template="plotly_white",
        margin=dict(l=60, r=20, t=60, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
    )
    fig.add_annotation(x=0.5, y=-0.18, xref="paper", yref="paper", text=FOOTER, showarrow=False,
                       font=dict(size=12, color="#808080"))
    return fig

def chart_timeline_net_cum(df: pd.DataFrame, payback_month: Optional[int]) -> go.Figure:
    x = df["Month"]; net = df["Net EUR/mo"]; cum = df["Cum Net EUR"]
    colors = ["rgba(33,150,83,0.45)" if v >= 0 else "rgba(244,67,54,0.45)" for v in net]
    fig = go.Figure()
    fig.add_trace(go.Bar(x=x, y=net, name="Net EUR/mo", marker_color=colors, hovertemplate="%{y:,.0f} EUR"))
    fig.add_trace(go.Scatter(x=x, y=cum, mode="lines+markers", name="Cumulative Net EUR", hovertemplate="%{y:,.0f} EUR"))
    if payback_month is not None:
        fig.add_vline(x=payback_month, line_dash="dash", line_color="#444")
        fig.add_annotation(x=payback_month, y=cum.max()*0.9 if cum.max()>0 else 0, xref="x", yref="y",
                           text=f"Payback @ m{payback_month}", showarrow=False, font=dict(size=11, color="#444"))
    fig.update_layout(
        title="Net & Cumulative Net over Time",
        xaxis_title="Month", yaxis_title="EUR",
        hovermode="x unified", template="plotly_white",
        margin=dict(l=60, r=20, t=60, b=60),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
        barmode="overlay"
    )
    fig.add_annotation(x=0.5, y=-0.18, xref="paper", yref="paper", text=FOOTER, showarrow=False,
                       font=dict(size=12, color="#808080"))
    return fig


# ------------------------------- Streamlit UI ------------------------------ #
def run_streamlit_app():
    import streamlit as st  # import only inside the runner

    st.set_page_config(page_title="Pynn — Retention Accumulation", page_icon="📈", layout="wide")

    if "m" not in st.session_state:
        st.session_state.m = Model()
    m: Model = st.session_state.m

    st.title("Pynn — Monthly Model with Retention Accumulation")
    st.caption("S & G are **new customers per month**. Retention accumulates actives over time. All amounts are **EUR per month**.")

    # ---------- Inputs (sidebar) ----------
    with st.sidebar:
        st.header("Pricing (EUR per month)")
        m.price_startup_eur  = st.number_input("Startup price (EUR / month)",  min_value=0.0, value=float(m.price_startup_eur), step=0.5)
        m.price_investor_eur = st.number_input("Investor price (EUR / month)", min_value=0.0, value=float(m.price_investor_eur), step=0.5)

        st.header("New customers each month")
        m.S_new_per_month = st.number_input("New Startups per month (S_new)",  min_value=0, value=int(m.S_new_per_month), step=1)
        m.G_new_per_month = st.number_input("New Investors per month (G_new)", min_value=0, value=int(m.G_new_per_month), step=1)

        st.header("Retention (monthly stay probability)")
        m.retention_startup  = st.number_input("Startups retention r_s (0.000–0.999)",  min_value=0.0, max_value=0.999, value=float(m.retention_startup),  step=0.001, format="%.3f")
        m.retention_investor = st.number_input("Investors retention r_g (0.000–0.999)", min_value=0.0, max_value=0.999, value=float(m.retention_investor), step=0.001, format="%.3f")

        st.header("Company finance")
        m.base_costs_eur      = st.number_input("Base costs (EUR / month)", min_value=0.0, value=float(m.base_costs_eur), step=100.0)
        m.marketing_costs_eur = st.number_input("Marketing (EUR / month)",  min_value=0.0, value=float(m.marketing_costs_eur), step=100.0)
        m.company_value_eur   = st.number_input("Company value (EUR)",      min_value=0.0, value=float(m.company_value_eur), step=10_000.0)
        m.discount_rate_pct   = st.slider("Discount rate (%)", min_value=0.0, max_value=100.0, value=float(m.discount_rate_pct), step=0.5)

        st.header("Projection horizon")
        months = st.slider("Horizon (months)", min_value=1, max_value=120, value=36, step=1)

    # ---------- Projection & steady-state ----------
    df = project_timeline(m, months)
    ss = steady_state_values(m)
    req = monthly_required_eur(m)

    # Useful timing metrics
    pbm = first_payback_month(df["Cum Net EUR"].to_numpy())
    mrr_break_idx = np.where(df["Revenue EUR/mo"].to_numpy() >= df["Required EUR/mo"].to_numpy())[0]
    mrr_break_month = int(mrr_break_idx[0] + 1) if mrr_break_idx.size else None

    t90_S = months_to_fraction_ss(m.retention_startup, 0.90)
    t90_G = months_to_fraction_ss(m.retention_investor, 0.90)

    # ---------- Tabs ----------
    tab_overview, tab_time = st.tabs(["Overview", "Timeline (Retention & Accumulation)"])

    # ===== Overview =====
    with tab_overview:
        # Avoid slider when months == 1 (Streamlit can error on min==max)
        if int(months) == 1:
            show_m = 1
            st.caption("Overview month: 1 (only one month in horizon).")
        else:
            show_m = st.slider("Overview month", min_value=1, max_value=int(months), value=int(months), step=1,
                               help="Select which month to summarize below.")

        row = df.loc[df["Month"] == show_m].iloc[0]
        actS, actG = float(row["Active S"]), float(row["Active G"])
        rev_m, req_m, net_m = float(row["Revenue EUR/mo"]), float(row["Required EUR/mo"]), float(row["Net EUR/mo"])

        # Metrics
        c1, c2, c3, c4, c5 = st.columns(5)
        c1.metric("Active Startups (selected month)", f"{actS:,.0f}")
        c2.metric("Active Investors (selected month)", f"{actG:,.0f}")
        c3.metric("Revenue (EUR / month)", f"{rev_m:,.0f}")
        c4.metric(f"Required @ {m.discount_rate_pct:.1f}% (EUR / month)", f"{req_m:,.0f}",
                  delta=f"{abs(net_m):,.0f} {'surplus' if net_m >= 0 else 'needed'}")
        be_rate = break_even_rate_pct(m.company_value_eur, req_m, rev_m)
        c5.metric("Break-even discount rate", f"{be_rate:.2f}%")
        st.caption("Required (EUR / month) = Base + Marketing + (DiscountRate × CompanyValue)/12.")

        # Chart
        st.plotly_chart(
            chart_overview_month(rev_m, req_m),
            config={"displaylogo": False, "responsive": True}
        )

        # Quick table
        df_head = pd.DataFrame({
            "Segment": ["Startups (S)", "Investors (G)", "Total"],
            "Active (selected month)": [actS, actG, actS + actG],
            "Price (EUR / month)": [m.price_startup_eur, m.price_investor_eur, np.nan],
            "Revenue (EUR / month)": [actS*m.price_startup_eur, actG*m.price_investor_eur, rev_m],
        })
        df_disp = df_head.copy()
        df_disp["Price (EUR / month)"]   = df_head["Price (EUR / month)"].apply(lambda x: "" if pd.isna(x) else f"{x:,.0f}")
        df_disp["Revenue (EUR / month)"] = df_head["Revenue (EUR / month)"].apply(lambda x: f"{x:,.0f}")
        df_disp["Active (selected month)"] = df_head["Active (selected month)"].apply(lambda x: f"{x:,.0f}")
        st.dataframe(df_disp, hide_index=True, width="stretch")

    # ===== Timeline =====
    with tab_time:
        st.subheader("Time-based Projection (Monthly)")
        st.caption("Stacked actives (S+G), MRR vs Required (with SS MRR), and Net/Cumulative Net. "
                   "Also shows when you reach 90% of steady-state and when Revenue ≥ Required / Payback.")

        # Summary for horizon
        tot_rev = float(df["Revenue EUR/mo"].sum())
        tot_req = float(df["Required EUR/mo"].sum())
        cum_end = float(df["Cum Net EUR"].iloc[-1])
        npv_net = float(df["NPV(Net)"].sum())

        c11, c12, c13, c14 = st.columns(4)
        c11.metric(f"Total Revenue ({months} mo)", f"{tot_rev:,.0f} EUR")
        c12.metric(f"Total Required ({months} mo)", f"{tot_req:,.0f} EUR")
        c13.metric(f"Cumulative Net @ {months} mo", f"{cum_end:,.0f} EUR")
        c14.metric(f"NPV(Net) @ {months} mo)", f"{npv_net:,.0f} EUR", help="Discounted by d = annual_rate/12")

        c15, c16, c17, c18 = st.columns(4)
        c15.metric("90% SS for Startups", f"{t90_S if t90_S is not None else '—'} mo")
        c16.metric("90% SS for Investors", f"{t90_G if t90_G is not None else '—'} mo")
        c17.metric("MRR ≥ Required month", f"{mrr_break_month if mrr_break_month is not None else 'not reached'}")
        c18.metric("Payback month", f"{pbm if pbm is not None else 'not reached'}")

        # Charts
        st.plotly_chart(
            chart_timeline_actives_stacked(df, ss_S=ss["ss_act_S"], ss_G=ss["ss_act_G"]),
            config={"displaylogo": False, "responsive": True}
        )
        st.plotly_chart(
            chart_timeline_finance(df, ss_mrr=ss["ss_mrr"], mrr_break_month=mrr_break_month, payback_month=pbm),
            config={"displaylogo": False, "responsive": True}
        )
        st.plotly_chart(
            chart_timeline_net_cum(df, payback_month=pbm),
            config={"displaylogo": False, "responsive": True}
        )

        with st.expander("Show projection table"):
            df_show = df.copy()
            for col in ["Active S","Active G","Revenue EUR/mo","Required EUR/mo","Net EUR/mo","Cum Net EUR","NPV(Net)"]:
                df_show[col] = df_show[col].map(lambda x: f"{x:,.0f}")
            st.dataframe(df_show, hide_index=True, width="stretch")

    # ---------- Footer ----------
    st.markdown(
        f"<div style='text-align:right;color:#808080;'>Made in Boden, Boanova</div>",
        unsafe_allow_html=True
    )


if __name__ == "__main__":
    if _launched_by_streamlit():
        run_streamlit_app()
    else:
        _bootstrap_streamlit()
