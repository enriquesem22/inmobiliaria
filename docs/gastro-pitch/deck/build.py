#!/usr/bin/env python3
"""Genera el PDF del deck y una hoja de contactos para revisarlo.

Uso:  python3 build.py            (PDF + capturas)
      python3 build.py --pdf      (solo el PDF)

Requiere el Chromium de Playwright en /opt/pw-browsers/chromium y el fichero
fonts.css con las tipografias incrustadas (lo genera fetch_fonts.py).
"""
import base64
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CHROME = "/opt/pw-browsers/chromium"
DECK = os.path.join(HERE, "comanda-deck.html")
PDF = os.path.join(HERE, "comanda-deck.pdf")
SHOTS = os.path.join(HERE, ".shots")

# El viewport util de este Chromium headless es 87px menor que --window-size.
CHROME_HEIGHT_OVERHEAD = 87
SLIDE_W, SLIDE_H = 1280, 720

BASE_FLAGS = [
    CHROME, "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
    "--virtual-time-budget=20000",
]


def run(flags, url):
    subprocess.run(flags + [url], capture_output=True, check=False)


def build_pdf():
    run(BASE_FLAGS + ["--no-pdf-header-footer",
                      "--run-all-compositor-stages-before-draw",
                      f"--print-to-pdf={PDF}"], f"file://{DECK}")
    print(f"PDF: {os.path.getsize(PDF) // 1024} KB")


def build_shots():
    os.makedirs(SHOTS, exist_ok=True)
    src = open(DECK, encoding="utf-8").read()
    n_slides = src.count('<section class="slide')
    win = f"--window-size={SLIDE_W},{SLIDE_H + CHROME_HEIGHT_OVERHEAD}"
    for n in range(1, n_slides + 1):
        page = os.path.join(SHOTS, f"s{n:02d}.html")
        hide = f"\n<style>section.slide:not(:nth-of-type({n})){{display:none!important}}</style>"
        open(page, "w", encoding="utf-8").write(src + hide)
        run(BASE_FLAGS + [win, f"--screenshot={SHOTS}/s{n:02d}.png"], f"file://{page}")

    cells = []
    for n in range(1, n_slides + 1):
        data = base64.b64encode(open(f"{SHOTS}/s{n:02d}.png", "rb").read()).decode()
        cells.append(f'<figure><img src="data:image/png;base64,{data}">'
                     f'<figcaption>{n:02d}</figcaption></figure>')
    sheet = (
        "<!doctype html><meta charset='utf-8'><style>"
        "body{margin:0;background:#555;font-family:monospace}"
        ".g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px}"
        "figure{margin:0;position:relative}img{width:100%;display:block;border:1px solid #000}"
        "figcaption{position:absolute;top:2px;left:4px;color:#fff;background:#000;"
        "padding:1px 5px;font-size:16px}</style>"
        f"<div class='g'>{''.join(cells)}</div>"
    )
    open(f"{SHOTS}/sheet.html", "w", encoding="utf-8").write(sheet)
    rows = (n_slides + 2) // 3
    run(BASE_FLAGS + [f"--window-size=1500,{rows * 330 + 60}",
                      f"--screenshot={SHOTS}/sheet.png"], f"file://{SHOTS}/sheet.html")
    print(f"Capturas: {n_slides} paginas + hoja de contactos en {SHOTS}/")


if __name__ == "__main__":
    build_pdf()
    if "--pdf" not in sys.argv:
        build_shots()
