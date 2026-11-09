// Trames de code tirées des photos, dessinées dans un <canvas>.
// Avant : des dizaines de milliers de caractères insérés dans la page (lourd à mettre en page,
// DOM énorme). Maintenant : une seule image, même rendu, même police (Geist Mono 9 px).

const RAMP = ' .:-=+*#%@';
const FONT = '9px "Geist Mono Variable", ui-monospace, monospace';
const LINE = 9; // hauteur de ligne, comme l'ancienne trame en texte
const SPACING = 0.5; // interlettrage, comme l'ancienne trame en texte

let fontPromise: Promise<unknown> | null = null;
/** Attend la police mono (sinon le canvas dessinerait avec une police de secours). */
export const monoReady = () => (fontPromise ??= (document.fonts?.load(FONT) ?? Promise.resolve()).catch(() => {}));

let advance = 0;
/** Largeur d'un caractère, interlettrage compris (≈ 5,9 px). */
export function charWidth() {
  if (!advance) {
    const x = document.createElement('canvas').getContext('2d')!;
    x.font = FONT; advance = x.measureText('0').width + SPACING;
  }
  return advance;
}

export interface AsciiOptions {
  cols: number;
  rows: number;
  color: string;
  accent: string; // couleur des quelques caractères mis en avant (orange de marque)
  accentRate: number; // part des caractères mis en avant
  cover?: boolean; // recadrage façon « cover » (sinon l'image est étirée sur la grille)
  floor?: boolean; // jamais d'espace : le code reste visible dans les zones claires
}

export function asciiCanvas(img: HTMLImageElement, o: AsciiOptions) {
  const { cols, rows } = o, cw = charWidth();
  // 1. Échantillonnage : un pixel par caractère.
  const s = document.createElement('canvas'); s.width = cols; s.height = rows;
  const sx = s.getContext('2d', { willReadFrequently: true })!;
  if (o.cover) {
    const W = cols * cw, H = rows * LINE, k = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const w = W / k, h = H / k;
    sx.drawImage(img, (img.naturalWidth - w) / 2, (img.naturalHeight - h) / 2, w, h, 0, 0, cols, rows);
  } else sx.drawImage(img, 0, 0, cols, rows);
  const d = sx.getImageData(0, 0, cols, rows).data;

  // 2. Rendu : une ligne de texte par rangée, net sur écran Retina.
  const W = Math.ceil(cols * cw), H = rows * LINE, dpr = Math.min(2, devicePixelRatio || 1);
  const c = document.createElement('canvas');
  c.width = Math.ceil(W * dpr); c.height = Math.ceil(H * dpr);
  c.style.cssText = `display:block;width:${W}px;height:${H}px`;
  const x = c.getContext('2d')!;
  x.scale(dpr, dpr); x.font = FONT; x.textBaseline = 'top'; x.fillStyle = o.color;
  const spaced = 'letterSpacing' in x;
  if (spaced) (x as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = SPACING + 'px';
  const accents: [number, number, string][] = [];
  for (let y = 0; y < rows; y++) {
    let line = '';
    for (let i = 0; i < cols; i++) {
      const p = (y * cols + i) * 4, l = (d[p] * 0.3 + d[p + 1] * 0.59 + d[p + 2] * 0.11) / 255;
      let k = Math.min(RAMP.length - 1, Math.floor((1 - l) * RAMP.length));
      if (o.floor) k = Math.max(1, k);
      const ch = RAMP[k];
      if (ch !== ' ' && Math.random() < o.accentRate) { accents.push([i, y, ch]); line += ' '; }
      else line += ch;
    }
    if (spaced) x.fillText(line, 0, y * LINE);
    else for (let i = 0; i < cols; i++) if (line[i] !== ' ') x.fillText(line[i], i * cw, y * LINE);
  }
  x.fillStyle = o.accent;
  for (const [i, y, ch] of accents) x.fillText(ch, i * cw, y * LINE);
  return c;
}

export const LINE_HEIGHT = LINE;
