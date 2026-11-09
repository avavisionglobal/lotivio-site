// Trames de code : au survol, une lentille suit le pointeur et fait réapparaître le code
// sur toute la surface du bloc, y compris là où la trame de fond est effacée.
// Uniquement sur les appareils avec une souris (pas d'effet au toucher).

const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RAMP = ' .:-=+*#%@';
const CW = 5.9; // largeur d'un caractère : Geist Mono 9 px (0,6 em) + 0,5 px d'interlettrage
const CH = 9; // hauteur d'une ligne

/** Trame de la taille du bloc, image recadrée façon « cover ». */
function texture(img: HTMLImageElement, W: number, H: number) {
  const cols = Math.ceil(W / CW), rows = Math.ceil(H / CH);
  const c = document.createElement('canvas'); c.width = cols; c.height = rows;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const sw = W / s, sh = H / s;
  x.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, cols, rows);
  const d = x.getImageData(0, 0, cols, rows).data;
  const frag = document.createDocumentFragment(); let line = '';
  for (let y = 0; y < rows; y++) {
    for (let i = 0; i < cols; i++) {
      const p = (y * cols + i) * 4, l = (d[p] * 0.3 + d[p + 1] * 0.59 + d[p + 2] * 0.11) / 255;
      // Plancher à « . » : le code reste lisible même dans les zones claires de la photo.
      const ch = RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.floor((1 - l) * RAMP.length)))];
      if (Math.random() < 0.006) { frag.append(line); line = ''; const b = document.createElement('b'); b.textContent = ch; frag.append(b); }
      else line += ch;
    }
    line += '\n';
  }
  frag.append(line);
  return frag;
}

function lens(pre: HTMLElement) {
  const host = pre.parentElement;
  if (!host || host.dataset.lens) return;
  host.dataset.lens = '1';
  const R = host.matches('.hv1') ? 210 : 170;
  let wrap: HTMLDivElement | null = null, inner: HTMLPreElement | null = null, img: HTMLImageElement | null = null;
  let size = '', raf = 0, active = false, ready = false, x = 0, y = 0, tx = 0, ty = 0, cx = 0, cy = 0;

  const fill = () => {
    if (!img?.complete || !inner) return;
    const W = host.offsetWidth, H = host.offsetHeight, key = W + 'x' + H;
    if (key !== size) { size = key; inner.replaceChildren(texture(img, W, H)); }
    ready = true;
    if (active) show();
  };
  const build = () => {
    if (wrap) return;
    wrap = document.createElement('div'); wrap.className = 'tex-lens'; wrap.setAttribute('aria-hidden', 'true');
    wrap.style.setProperty('--lens', R * 2 + 'px');
    const cs = getComputedStyle(pre);
    if (cs.zIndex !== 'auto') wrap.style.zIndex = cs.zIndex;
    // Fond sombre (trame foncée) : code plus clair ; fond clair : code plus foncé que la trame.
    const [r, g, b] = (cs.color.match(/\d+/g) ?? ['200', '200', '200']).map(Number);
    wrap.style.setProperty('--hi', host.matches('.hv1') ? '#9A9488' : (r * 0.3 + g * 0.59 + b * 0.11) / 255 < 0.45 ? '#B3ADA3' : '#5C574E'); // hero : plus clair, le texte reste lisible
    inner = document.createElement('pre'); inner.className = 'tex-hi';
    wrap.append(inner); pre.after(wrap);
    img = new Image(); img.decoding = 'async'; img.src = pre.dataset.src!;
    img.onload = () => idle(fill);
  };
  const place = () => {
    wrap!.style.transform = `translate3d(${x - R}px,${y - R}px,0)`;
    inner!.style.transform = `translate3d(${R - x}px,${R - y}px,0)`;
  };
  // Position du pointeur dans le bloc, recalculée à chaque image : la lentille reste
  // sous la souris même quand la page défile sans que la souris bouge.
  const target = () => {
    const rect = host.getBoundingClientRect();
    const sx = rect.width / host.offsetWidth || 1, sy = rect.height / host.offsetHeight || 1; // bloc éventuellement mis à l'échelle
    tx = (cx - rect.left) / sx; ty = (cy - rect.top) / sy;
  };
  const loop = () => {
    if (active) target();
    const k = reduced ? 1 : 0.2;
    x += (tx - x) * k; y += (ty - y) * k; place();
    raf = active || Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
  };
  const show = () => {
    target(); x = tx; y = ty; place();
    host.classList.add('is-lit');
    if (!raf) raf = requestAnimationFrame(loop);
  };

  host.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    cx = e.clientX; cy = e.clientY; active = true;
    if (ready) show(); else { build(); if (img?.complete) idle(fill); } // jamais de construction pendant le survol
  });
  host.addEventListener('pointermove', (e) => { cx = e.clientX; cy = e.clientY; }, { passive: true });
  host.addEventListener('pointerleave', () => { active = false; host.classList.remove('is-lit'); });

  return build;
}

// Préparation à l'avance, en temps libre, quand le bloc approche de l'écran.
const idle = (cb: () => void) => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 120));
if (fine) {
  const builders = new Map<Element, () => void>();
  document.querySelectorAll<HTMLElement>('pre.tex[data-src]').forEach((pre) => {
    const b = lens(pre); if (b && pre.parentElement) builders.set(pre.parentElement, b);
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    idle(() => builders.get(e.target)?.());
  }), { rootMargin: '700px 0px' });
  builders.forEach((_, host) => io.observe(host));
}
