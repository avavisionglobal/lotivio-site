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
// Petites versions 480 px : carte d'intro, tuiles S03, brochure S08 et source des trames de code
// (une trame n'a besoin que de quelques centaines de pixels de large).
for (const [file, name] of [['lake-residence.webp', 'residence'], ['lake-residence-portrait.webp', 'residence-portrait'], ['photo-lac.jpg', 'lac']]) {
  await sharp(`${src}/${file}`).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 70 }).toFile(`${out}/${name}-480.webp`);
}
for (const f of readdirSync(`${src}/logos`)) if (/\.(svg|png)$/.test(f)) copyFileSync(`${src}/logos/${f}`, `${out}/logos/${f}`);
// Logos matriciels à leur taille d'affichage ×2 (smg.png faisait 199 Ko pour une vignette de 40 px).
for (const [file, h] of [['smg.png', 96], ['immobilier-ch.png', 96], ['properstar.png', 96], ['properstar-logo.png', 84], ['meta.png', 64]]) {
  await sharp(`${src}/logos/${file}`).resize({ height: h, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 90 }).toFile(`${out}/logos/${file.replace('.png', '')}-${h}.webp`);
}
copyFileSync(`${src}/lotivio-mark.svg`, 'public/brand/lotivio-mark.svg');
console.log('ok');
