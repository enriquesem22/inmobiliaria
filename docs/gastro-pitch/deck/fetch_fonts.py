#!/usr/bin/env python3
"""Descarga las tipografias de Google Fonts y las incrusta en fonts.css.

El deck se imprime a PDF con Chromium desde file://, asi que las fuentes tienen
que estar dentro del CSS como data URI: si dependieran de la red, una descarga
lenta haria que el PDF saliera con la tipografia de respaldo.

Uso:  python3 fetch_fonts.py
"""
import base64
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "fonts.css")

# Un UA moderno para que Google Fonts devuelva woff2 en lugar de ttf.
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"}
CSS_URL = ("https://fonts.googleapis.com/css2?"
           "family=Instrument+Serif:ital@0;1"
           "&family=JetBrains+Mono:wght@400;500;700"
           "&family=Karla:wght@300;400;500;600;700;800"
           "&display=swap")
# El castellano se cubre con latin; latin-ext va por si acaso.
SUBSETS = ("latin", "latin-ext")


def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


def main():
    css = fetch(CSS_URL).decode()
    faces = re.findall(r"/\*\s*([\w\-\[\]]+)\s*\*/\s*(@font-face\s*\{[^}]*\})", css)
    out, cache = [], {}
    for subset, face in faces:
        if subset not in SUBSETS:
            continue
        match = re.search(r"url\((https://[^)]+\.woff2)\)", face)
        if not match:
            continue
        url = match.group(1)
        if url not in cache:
            cache[url] = base64.b64encode(fetch(url)).decode()
        out.append(face.replace(url, "data:font/woff2;base64," + cache[url]))

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"fonts.css: {len(out)} faces, {os.path.getsize(OUT) // 1024} KB")


if __name__ == "__main__":
    main()
