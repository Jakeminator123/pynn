#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Interaktiv text->video med OpenAI Sora 2.
- Sparar MP4 i samma mapp som skriptet körs från (current working directory).
- Först frågar om kontext, sedan om prompt, och kör direkt.

Snabbstart (PowerShell):
    pip install --upgrade openai
    $env:OPENAI_API_KEY = "sk-...din-nyckel..."
    python ai_video.py
"""

import os
import time
from pathlib import Path
from typing import Optional

from openai import OpenAI


def expand_prompt(context: str, user_prompt: str) -> str:
    """
    Kombinerar kontext + prompt och lägger till några filmiska hintar
    om texten är väldigt kort, så att resultatet blir lite stabilare.
    """
    context = context.strip()
    prompt = user_prompt.strip()

    base = f"{prompt}\n\nContext: {context}".strip()

    # Liten "boost" om prompten är kort
    if len(base) < 60:
        base += (
            ". Cinematic look, smooth camera motion, natural lighting, depth of field, "
            "realistic materials, balanced composition, 24 fps."
        )
    return base


def next_timestamped_filename(directory: Path, stem: str = "ai-video", suffix: str = ".mp4") -> Path:
    """
    Skapar ett filnamn med tidsstämpel i angiven katalog.
    Ex: ai-video-20251110-213045.mp4
    """
    ts = time.strftime("%Y%m%d-%H%M%S")
    return directory / f"{stem}-{ts}{suffix}"


def generate_video(
    prompt: str,
    out_path: Path,
    seconds: int = 8,
    size: str = "1280x720",
    model: str = "sora-2",
    poll_interval: int = 6,
    max_wait_seconds: int = 10 * 60,
) -> Optional[Path]:
    """
    Skapar videouppgift, pollar tills klar och laddar ner MP4 till out_path.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("[FEL] Miljövariabeln OPENAI_API_KEY saknas.")
        return None

    client = OpenAI(api_key=api_key)

    print("\n" + "=" * 70)
    print("[VIDEO] Skapar uppgift...")
    print("=" * 70)
    print(f"   Modell: {model}")
    print(f"   Längd: {seconds}s")
    print(f"   Upplösning: {size}")
    print(f"   Prompt: {prompt[:120]}{'...' if len(prompt) > 120 else ''}")

    try:
        job = client.videos.create(
            model=model,
            prompt=prompt,
            size=size,           # t.ex. "1280x720" (landskap) eller "720x1280" (porträtt)
            seconds=str(seconds)
        )
    except Exception as e:
        print(f"[FEL] Kunde inte skapa video-uppgift: {e}")
        return None

    job_id = getattr(job, "id", None)
    if not job_id:
        print("[FEL] Inget job-id i svaret.")
        return None

    print(f"   Jobb-ID: {job_id}")

    # Poll-loop
    start = time.time()
    last_progress = -1
    poll_count = 0
    bar_len = 28

    while True:
        if time.time() - start > max_wait_seconds:
            print("\n[TIMEOUT] Uppgiften överskred tidsgränsen.")
            print(f"   Spara jobbid och försök senare: {job_id}")
            return None

        try:
            status_obj = client.videos.retrieve(job_id)
        except Exception as e:
            print(f"[VARN] Poll-fel: {e}")
            time.sleep(poll_interval)
            continue

        status = getattr(status_obj, "status", "unknown")
        progress = int(getattr(status_obj, "progress", 0) or 0)
        status_msg = getattr(status_obj, "status_message", "")

        if progress != last_progress or poll_count % 8 == 0:
            filled = int(bar_len * (progress / 100.0))
            bar = "█" * filled + "░" * (bar_len - filled)
            elapsed = int(time.time() - start)
            print(f"   [{bar}] {progress:3d}%  ({status})  t={elapsed}s")
            last_progress = progress

        if status == "completed":
            print("\n[OK] Renderingen är klar. Hämtar video...")
            try:
                content = client.videos.download_content(job_id)

                # Skriv direkt till fil i CWD
                out_path.parent.mkdir(parents=True, exist_ok=True)
                if hasattr(content, "write_to_file"):
                    content.write_to_file(str(out_path))
                else:
                    with open(out_path, "wb") as f:
                        if hasattr(content, "iter_bytes"):
                            for chunk in content.iter_bytes():
                                f.write(chunk)
                        elif hasattr(content, "read"):
                            f.write(content.read())
                        else:
                            raise RuntimeError("Okänt innehållsobjekt från SDK.")

                print(f"[OK] Sparad: {out_path.resolve()}")
                return out_path
            except Exception as e:
                print(f"[FEL] Nedladdning misslyckades: {e}")
                return None

        if status == "failed":
            print(f"\n[FEL] Uppgiften misslyckades: {status_msg}")
            try:
                err = getattr(status_obj, "error", None)
                if err:
                    print(f"   Detaljer: {err}")
            except Exception:
                pass
            return None

        poll_count += 1
        time.sleep(poll_interval)


def main() -> int:
    # 1) Fråga KONTEKST först
    context = input("Vad är kontexten i din video? ").strip()

    # 2) Sedan prompten
    user_prompt = input("Skriv din prompt/beskrivning: ").strip()

    # Bygg slutlig prompt
    prompt = expand_prompt(context, user_prompt)

    # Standardvärden (enkelt och internt)
    seconds = 8
    size = "1280x720"
    model = "sora-2"

    # Spara i samma mapp som skriptet körs från (CWD)
    out_dir = Path.cwd()
    out_file = next_timestamped_filename(out_dir, stem="ai-video", suffix=".mp4")

    # Kör genereringen
    result = generate_video(
        prompt=prompt,
        out_path=out_file,
        seconds=seconds,
        size=size,
        model=model,
    )

    return 0 if result else 1


if __name__ == "__main__":
    raise SystemExit(main())
