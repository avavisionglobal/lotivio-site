// Éclaircit l'image agrandie (job 63059e00) sans créer de bandes : calcul en 16 bits, courbe douce,
// légère saturation, puis tramage invisible avant l'export 8 bits.
const sharp = require(process.env.HOME + '/brandiamemory/lotivio-site/node_modules/sharp');
const [G, GAIN, SAT] = [+(process.argv[2] || 0.72), +(process.argv[3] || 1.06), +(process.argv[4] || 1.12)];
(async () => {
  const { data, info } = await sharp('upscale-4k-63059e00.png').removeAlpha().toColourspace('rgb16').raw({ depth: 'ushort' }).toBuffer({ resolveWithObject: true });
  const n = info.width * info.height, out = Buffer.alloc(n * 3);
  let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  for (let p = 0; p < n; p++) {
    const c = [0, 1, 2].map((k) => Math.min(1, Math.pow(data.readUInt16LE((p * 3 + k) * 2) / 65535, G) * GAIN));
    const l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    for (let k = 0; k < 3; k++) {
      const v = Math.min(1, Math.max(0, l + (c[k] - l) * SAT)) * 255 + (rnd() - 0.5) * 1.4;
      out[p * 3 + k] = Math.max(0, Math.min(255, Math.round(v)));
    }
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile('lumineuse-4k.png');
  console.log('ok', G, GAIN, SAT);
})();
