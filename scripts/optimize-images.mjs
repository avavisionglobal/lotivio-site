// Convertit les médias des maquettes en WebP optimisés pour le site.
import sharp from 'sharp';
import { readdirSync, copyFileSync } from 'node:fs';
const src = 'proofs/assets', out = 'public/media';
const jobs = [
  ['lake-residence.webp', 'residence', [800, 1600]],
  ['lake-residence-portrait.webp', 'residence-portrait', [600, 1100]],
  ['photo-lac.jpg', 'lac', [800, 1600]],
  ['ui-leads.png', 'ui-leads', [900, 1800]],
  ['ui-wa.png', 'ui-whatsapp', [500]],
  ['ui-relance.png', 'ui-relance', [1000]],
  ['ui-pipeline.png', 'ui-pipeline', [1000]],
  ['ui-stock.png', 'ui-stock', [900, 1600]],
];
for (const [file, name, widths] of jobs) {
  for (const w of widths) {
    await sharp(`${src}/${file}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${out}/${name}-${w}.webp`);
  }
}
for (const f of readdirSync(`${src}/logos`)) if (/\.(svg|png)$/.test(f)) copyFileSync(`${src}/logos/${f}`, `${out}/logos/${f}`);
copyFileSync(`${src}/lotivio-mark.svg`, 'public/brand/lotivio-mark.svg');
console.log('ok');
