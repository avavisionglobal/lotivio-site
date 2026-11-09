// Trames de code : au survol, une lentille suit le pointeur et fait réapparaître le code
// sur toute la surface du bloc, y compris là où la trame de fond est effacée.
// Uniquement sur les appareils avec une souris (pas d'effet au toucher).

import { whenCalm } from './app';
import { asciiCanvas, charWidth, monoReady, LINE_HEIGHT } from './ascii';

const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Trame de la taille du bloc, image recadrée façon « cover », dessinée dans un canvas. */
const texture = (img: HTMLImageElement, W: number, H: number, color: string) =>
  asciiCanvas(img, { cols: Math.ceil(W / charWidth()), rows: Math.ceil(H / LINE_HEIGHT), color, accent: '#EB6E2C', accentRate: 0.006, cover: true, floor: true });

function lens(pre: HTMLElement) {
  const host = pre.parentElement;
  if (!host || host.dataset.lens) return;
  host.dataset.lens = '1';
  const R = host.matches('.hv1') ? 210 : 170;
  let wrap: HTMLDivElement | null = null, inner: HTMLDivElement | null = null, img: HTMLImageElement | null = null;
  let size = '', hi = '#5C574E', raf = 0, active = false, ready = false, x = 0, y = 0, tx = 0, ty = 0, cx = 0, cy = 0;

  const fill = async () => {
    if (!img?.complete || !inner) return;
    await monoReady();
    const W = host.offsetWidth, H = host.offsetHeight, key = W + 'x' + H;
    if (key !== size) { size = key; inner.replaceChildren(texture(img, W, H, hi)); }
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
    hi = host.matches('.hv1') ? '#9A9488' : (r * 0.3 + g * 0.59 + b * 0.11) / 255 < 0.45 ? '#B3ADA3' : '#5C574E'; // hero : plus clair, le texte reste lisible
    inner = document.createElement('div'); inner.className = 'tex-hi';
    wrap.append(inner); pre.after(wrap);
    img = new Image(); img.decoding = 'async'; img.src = pre.dataset.src!;
    img.onload = () => whenCalm(fill);
  };
  const place = () => {
    wrap!.style.transform = `translate3d(${x - R}px,${y - R}px,0)`;
    inner!.style.transform = `translate3d(${R - x}px,${R - y}px,0)`;
  };
  // Position du bloc à l'écran, relue seulement quand la page a défilé (pas à chaque image).
  let left = 0, top = 0, sx = 1, sy = 1, dirty = true, last = 0;
  const measure = () => {
    const rect = host.getBoundingClientRect();
    sx = rect.width / host.offsetWidth || 1; sy = rect.height / host.offsetHeight || 1; // bloc éventuellement mis à l'échelle
    left = rect.left; top = rect.top; dirty = false;
  };
  const onScroll = () => { dirty = true; };
  const target = () => { if (dirty) measure(); tx = (cx - left) / sx; ty = (cy - top) / sy; };
  // Suivi amorti, indépendant de la fréquence de l'écran (60, 120 Hz…) : constante de temps 110 ms.
  const loop = (t: number) => {
    const dt = last ? Math.min(64, t - last) : 16; last = t;
    if (active) target();
    const k = reduced ? 1 : 1 - Math.exp(-dt / 110);
    x += (tx - x) * k; y += (ty - y) * k; place();
    if (active || Math.abs(tx - x) + Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
    else { raf = 0; last = 0; }
  };
  const show = () => {
    dirty = true; target(); x = tx; y = ty; place();
    host.classList.add('is-lit');
    if (!raf) raf = requestAnimationFrame(loop);
  };

  host.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    cx = e.clientX; cy = e.clientY; active = true;
    addEventListener('scroll', onScroll, { passive: true });
    if (ready) show(); else { build(); if (img?.complete) whenCalm(fill); } // jamais de construction pendant le survol
  });
  host.addEventListener('pointermove', (e) => { cx = e.clientX; cy = e.clientY; }, { passive: true });
  host.addEventListener('pointerleave', () => { active = false; host.classList.remove('is-lit'); removeEventListener('scroll', onScroll); });

  return build;
}

// Préparation à l'avance, page au repos, quand le bloc approche de l'écran.
if (fine) {
  const builders = new Map<Element, () => void>();
  document.querySelectorAll<HTMLElement>('pre.tex[data-src]').forEach((pre) => {
    const b = lens(pre); if (b && pre.parentElement) builders.set(pre.parentElement, b);
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    whenCalm(() => builders.get(e.target)?.());
  }), { rootMargin: '1000px 0px' });
  builders.forEach((_, host) => io.observe(host));
}
