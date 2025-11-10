#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Minimal text->video med OpenAI Sora 2.
Användning (exempel):
    python ai_video.py --prompt "Filmisk solnedgång över fjäll" --seconds 8 --size 1280x720
Krav:
    pip install --upgrade openai
Miljö:
    OPENAI_API_KEY måste vara satt (Windows PowerShell: $env:OPENAI_API_KEY="sk-...").
"""

import argparse
import os
import sys
import time
from pathlib import Path
from typing import Optional

from openai import OpenAI


def expand_prompt(user_prompt: str) -> str:
    """
    Lätt 'smartifiering' om man matar in väldigt kort text.
    Håller det enkelt så vi slipper konfiggrejer.
    """
    base = user_prompt.strip()
    if len(base) < 40:
        base += (
            ". Cinematic look, smooth camera motion, natural lighting, depth of field, "
            "balanced composition, realistic materials, 24 fps."
        )
    return base


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
    Skapar en videouppgift, pollar tills klar, laddar ner MP4.
    Returnerar sökvägen till videon eller None vid fel.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("[FEL] Saknar OPENAI_API_KEY i miljön.")
        return None

    client = OpenAI(api_key=api_key)

    # Säkerställ mapp
    out_path.parent.mkdir(parents=True, exist_ok=True)

    # Starta jobb
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
            size=size,          # t.ex. "1280x720" (landskap) eller "720x1280" (porträtt)
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
        # Timeout
        if time.time() - start > max_wait_seconds:
            print("\n[TIMEOUT] Uppgiften överskred tidsgränsen.")
            print(f"   Du kan spara jobbid och försöka senare: {job_id}")
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
                # SDK-versioner kan skilja i nedladdnings-API—hantera flera fall:
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
            # För felsökning kan status_obj innehålla error-detaljer:
            try:
                err = getattr(status_obj, "error", None)
                if err:
                    print(f"   Detaljer: {err}")
            except Exception:
                pass
            return None

        poll_count += 1
        time.sleep(poll_interval)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Skriv en prompt och få en MP4-video från OpenAI Sora 2."
    )
    p.add_argument(
        "--prompt", "-p",
        type=str,
        required=True,
        help="Din videobeskrivning (text)."
    )
    p.add_argument(
        "--seconds", "-s",
        type=int,
        default=8,
        help="Videolängd i sekunder (t.ex. 4, 8, 12)."
    )
    p.add_argument(
        "--size",
        type=str,
        default="1280x720",
        help='Upplösning, t.ex. "1280x720" (landskap) eller "720x1280" (porträtt).'
    )
    p.add_argument(
        "--model",
        type=str,
        default="sora-2",
        help='Modellnamn, t.ex. "sora-2" eller "sora-2-pro" om du har tillgång.'
    )
    p.add_argument(
        "--output", "-o",
        type=str,
        default=None,
        help="Utfil (MP4). Standard: ./output/<jobid>.mp4"
    )
    return p.parse_args()


def main() -> int:
    args = parse_args()

    # Liten prompt-boost om inmatningen är väldigt kort
    prompt = expand_prompt(args.prompt)

    # Bestäm utfil
    default_name = "ai-video.mp4"  # ersätts med jobid på slutet om None
    out_dir = Path("./output")
    out_file = Path(args.output) if args.output else (out_dir / default_name)

    # Skapa och hämta
    out_path = generate_video(
        prompt=prompt,
        out_path=out_file,
        seconds=args.seconds,
        size=args.size,
        model=args.model,
    )

    if out_path is None:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
