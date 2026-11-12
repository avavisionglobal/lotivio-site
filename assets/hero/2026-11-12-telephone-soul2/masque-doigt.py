# Restores the opacity of the right index finger, partially erased by the background removal (job 88f5f37f).
# Mask computed from the raw photo (raw-13c081fd.png): distance from the beige background color.
# Usage: uv run --with pillow --with numpy python masque-doigt.py
from PIL import Image, ImageFilter
import numpy as np
raw = np.asarray(Image.open("raw-13c081fd.png").convert("RGB")).astype(float)
cut = Image.open("detoure-88f5f37f.png").convert("RGBA"); a = np.asarray(cut).copy()
# background color estimated near the finger (right side, outside the hand)
bg = raw[250:330, 1250:1400].reshape(-1, 3).mean(0)
dist = np.sqrt(((raw - bg) ** 2).sum(-1))
m = np.clip((dist - 28) / 30, 0, 1)  # 0 = background, 1 = hand
m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float)
# area processed: right fingers only
y0, y1, x0, x1 = 300, 1120, 1000, 1250
al = a[..., 3].astype(float)
zone = np.zeros_like(al, bool); zone[y0:y1, x0:x1] = True
new = np.where(zone, np.maximum(al, m), al)
a[..., 3] = new.clip(0, 255).astype(np.uint8)
# color: in the restored zone, use the raw pixels (the remover may have lightened the edges)
fix = zone & (m > al)
a[..., :3][fix] = raw[fix].astype(np.uint8)
Image.fromarray(a).save("main-telephone-masque.png")
print("background", bg.round(), "restored pixels", int(fix.sum()))
