const sharp = require(process.env.HOME + '/brandiamemory/lotivio-site/node_modules/sharp');
(async () => {
  const cut = await sharp('detoure-d86eb069.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const raw = await sharp('raw-c31cb2a1.png').removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const BG = [231, 224, 199];
  const W = cut.info.width, H = cut.info.height, A = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) A[i] = cut.data[i * 4 + 3];
  // Fond = pixels peu opaques atteignables depuis le bord de l'image.
  const bg = new Uint8Array(W * H), q = new Int32Array(W * H); let h = 0, t = 0;
  const push = (i) => { if (!bg[i] && A[i] <= 100) { bg[i] = 1; q[t++] = i; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (h < t) { const i = q[h++], x = i % W, y = (i / W) | 0;
    if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W); }
  // Distance (en pixels, approx.) au fond, limitée à 3 : les bords gardent leur alpha d'origine.
  const near = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!bg[i]) continue;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const xx = x + dx, yy = y + dy;
      if (xx >= 0 && yy >= 0 && xx < W && yy < H) near[yy * W + xx] = 1; } }
  const out = Buffer.alloc(W * H * 4); let filled = 0;
  for (let i = 0; i < W * H; i++) {
    out[i * 4] = raw.data[i * 3]; out[i * 4 + 1] = raw.data[i * 3 + 1]; out[i * 4 + 2] = raw.data[i * 3 + 2];
    let a = A[i];
    const r = raw.data[i * 3], g = raw.data[i * 3 + 1], b = raw.data[i * 3 + 2];
    const isBg = Math.abs(r - BG[0]) + Math.abs(g - BG[1]) + Math.abs(b - BG[2]) < 42;
    if (!bg[i] && !near[i] && !isBg) { if (a < 255) filled++; a = 255; }
    out[i * 4 + 3] = a;
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile('main-masque-plein.png');
  console.log('pixels rendus opaques:', filled);
  await sharp('main-masque-plein.png').flatten({ background: '#F7F6F3' }).resize(600).jpeg().toFile('check-plein.jpg');
  await sharp('raw-c31cb2a1.png').extract({ left: 420, top: 300, width: 640, height: 640 }).jpeg().toFile('check-face.jpg');
})();
