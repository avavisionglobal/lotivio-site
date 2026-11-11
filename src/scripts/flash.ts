// Titres façon fourmula.ai : quand un titre entre dans l'écran, chaque mot apparaît en orange
// puis reprend sa couleur. L'orange glisse ainsi de mot en mot avant que le titre se stabilise.
// Le JavaScript se contente de découper les mots et de poser une classe ; l'animation est en CSS
// (global.css, « Titres : éclair orange mot par mot »). Sans JavaScript ou avec moins de mouvement,
// le titre reste affiché normalement.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Éléments gardés entiers (compteur, point orange, images) : ils comptent comme un mot.
const ATOMIC = '.count, .o, img, svg';

function wrap(node: Node, words: HTMLElement[]) {
  for (const n of [...node.childNodes]) {
    if (n.nodeType === Node.TEXT_NODE) {
      const parts = (n.textContent ?? '').split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p)) { frag.append(p); continue; }
        const s = document.createElement('span');
        s.className = 'flw'; s.textContent = p;
        words.push(s); frag.append(s);
      }
      n.replaceWith(frag);
    } else if (n instanceof HTMLElement && n.tagName !== 'BR') {
      if (n.matches(ATOMIC)) { n.classList.add('flw'); words.push(n); }
      else wrap(n, words);
    }
  }
}

if (!reduced) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('flh-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -12% 0px' });

  document.querySelectorAll<HTMLElement>('[data-flash]').forEach((h) => {
    const words: HTMLElement[] = [];
    wrap(h, words);
    words.forEach((w, i) => w.style.setProperty('--i', String(i)));
    h.classList.add('flh');
    io.observe(h);
  });
}
