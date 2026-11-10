"""
PLACEHOLDER photo generator — run with `npm run placeholders`.

Creates grey, labelled, correctly-sized stand-ins so the layout is final
before real photos arrive. Replace each file with a real photo of the SAME
filename and aspect ratio (no code changes needed):

  public/images/hero.jpg               2000×1333 (3:2)  hero — bar counter / room
  public/images/histoire.jpg           1200×1500 (4:5)  story — archive photo (shown in sepia)
  public/images/photos/<name>.jpg       900×1125 (4:5)  photo strip
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

GREY = (150, 146, 140)
GREY_DARK = (120, 116, 110)
TEXT = (245, 243, 238)

SLOTS = [
    ("hero.jpg", (2000, 1333), "Comptoir du bar", "Bar counter"),
    ("histoire.jpg", (1200, 1500), "Photo d'archive", "Archive photo"),
    ("photos/comptoir.jpg", (900, 1125), "Comptoir du bar", "Bar counter"),
    ("photos/billard.jpg", (900, 1125), "Table de billard", "Pool table"),
    ("photos/quart-froid.jpg", (900, 1125), "Un quart froid", "A cold quart"),
    ("photos/devanture.jpg", (900, 1125), "Devanture", "Storefront"),
    ("photos/cesar.jpg", (900, 1125), "Un César", "A Caesar"),
    ("photos/salle.jpg", (900, 1125), "La salle", "The room"),
]


def make(path: str, size: tuple[int, int], fr: str, en: str) -> None:
    # The hero sits under an 80% burgundy overlay: keep its label faint so it never fights the headline.
    text = (172, 168, 162) if path == "hero.jpg" else TEXT
    w, h = size
    img = Image.new("RGB", size, GREY)
    d = ImageDraw.Draw(img)
    # thin diagonal hatching so it reads as "slot", not a design choice
    step = max(w, h) // 24
    for x in range(-h, w, step):
        d.line([(x, 0), (x + h, h)], fill=GREY_DARK, width=2)
    unit = min(w, h) if w <= h else int(h * 0.55)  # landscape: keep label inside a phone crop
    big, small = ImageFont.truetype(FONT, unit // 14), ImageFont.truetype(FONT, unit // 24)
    lines = [("PHOTO À VENIR", small), (fr, big), (en, small)]
    heights = [d.textbbox((0, 0), t, font=f)[3] for t, f in lines]
    gap = unit // 30
    y = (h - sum(heights) - gap * 2) // 2
    pad = unit // 20
    box_w = max(d.textbbox((0, 0), t, font=f)[2] for t, f in lines) + pad * 2
    d.rectangle([(w - box_w) // 2, y - pad, (w + box_w) // 2, y + sum(heights) + gap * 2 + pad], fill=GREY_DARK)
    for (t, f), lh in zip(lines, heights):
        tw = d.textbbox((0, 0), t, font=f)[2]
        d.text(((w - tw) // 2, y), t, font=f, fill=text)
        y += lh + gap
    out = IMAGES / path
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=70, optimize=True, progressive=True)
    print(f"  {out.relative_to(ROOT)}  {w}×{h}")


if __name__ == "__main__":
    for slot in SLOTS:
        make(*slot)
