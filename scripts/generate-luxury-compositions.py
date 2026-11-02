"""Build conceptual JD CORP material studies from the existing generated surfaces.

Requires Pillow and NumPy. These are illustrative compositions, not site photos.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps


ROOT = Path(__file__).resolve().parents[1] / "public" / "images"
SIZE = (1600, 1000)


def surface(name: str) -> Image.Image:
    return ImageOps.fit(
        Image.open(ROOT / name).convert("RGB"), SIZE, method=Image.Resampling.LANCZOS
    )


def wash(image: Image.Image, left: float, right: float, top: float, bottom: float):
    w, h = image.size
    x = np.linspace(left, right, w, dtype=np.float32)[None, :]
    y = np.linspace(top, bottom, h, dtype=np.float32)[:, None]
    opacity = np.clip(x + y, 0, 1)
    arr = np.asarray(image).astype(np.float32)
    tint = np.array([18, 10, 7], dtype=np.float32)
    return Image.fromarray(
        np.uint8(np.clip(arr * (1 - opacity[..., None]) + tint * opacity[..., None], 0, 255))
    )


def save(image: Image.Image, name: str):
    image.save(ROOT / name, "JPEG", quality=86, optimize=True, subsampling=0)
    print(name)


walnut = surface("material-walnut-ribbed.jpg")
stone = surface("material-stone-dark.jpg")
ivory = surface("material-stone-ivory-soft.jpg")

# A recessed stone portal set into ribbed walnut, with narrow concealed brass light.
portal = wash(walnut.copy(), .18, .13, .08, .34)
portal.paste(stone.crop((350, 30, 1120, 945)), (670, 40))
shade = Image.new("RGBA", SIZE)
d = ImageDraw.Draw(shade)
d.rectangle((668, 40, 673, 1000), fill=(9, 6, 4, 230))
d.rectangle((1440, 40, 1460, 1000), fill=(8, 5, 4, 230))
d.rectangle((680, 42, 1438, 48), fill=(151, 111, 65, 190))
d.rectangle((678, 48, 682, 946), fill=(198, 143, 75, 190))
d.rectangle((1435, 48, 1439, 946), fill=(188, 136, 71, 165))
d.polygon([(650, 942), (1460, 942), (1600, 1000), (430, 1000)], fill=(15, 10, 8, 235))
portal = Image.alpha_composite(portal.convert("RGBA"), shade).convert("RGB")
save(wash(portal, .16, .02, 0, .08), "composition-walnut-portal.jpg")

# Brushed metal inlay over polished stone: a macro material detail, not a building.
inlay = wash(stone.copy(), .21, .02, .11, .13)
metal = Image.new("RGBA", SIZE)
d = ImageDraw.Draw(metal)
d.polygon([(1010, -120), (1100, -120), (790, 1120), (700, 1120)], fill=(147, 99, 51, 255))
d.polygon([(1050, -120), (1075, -120), (765, 1120), (739, 1120)], fill=(220, 164, 95, 230))
d.polygon([(1120, -120), (1133, -120), (827, 1120), (812, 1120)], fill=(35, 23, 18, 230))
for offset, color, width in [
    (0, (50, 30, 20, 255), 56),
    (12, (175, 123, 65, 230), 22),
    (21, (225, 178, 115, 210), 5),
]:
    d.arc((1070 + offset, 130 + offset, 1940 - offset, 1000 - offset),
          195, 325, fill=color, width=width)
inlay = Image.alpha_composite(inlay.convert("RGBA"), metal).convert("RGB")
save(inlay, "composition-brass-inlay.jpg")

# Warm ivory stone meets walnut joinery and a single recessed luminous seam.
joinery = wash(ivory.copy(), .05, .01, .01, .1)
joinery.paste(walnut.crop((110, 0, 980, 1000)), (730, 0))
edge = Image.new("RGBA", SIZE)
d = ImageDraw.Draw(edge)
d.rectangle((708, 0, 729, 1000), fill=(29, 16, 11, 255))
d.rectangle((723, 0, 726, 1000), fill=(189, 140, 78, 255))
d.rectangle((728, 0, 731, 1000), fill=(17, 9, 6, 255))
d.rectangle((1420, 0, 1430, 1000), fill=(8, 5, 3, 210))
joinery = Image.alpha_composite(joinery.convert("RGBA"), edge).convert("RGB")
save(joinery, "composition-ivory-joinery.jpg")
