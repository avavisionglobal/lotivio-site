// S01 · Hero « circuit » : quand une impulsion arrive dans l'objet Lotivio,
// l'objet s'allume, le compteur « Demandes reçues » monte et une impulsion part vers la carte.
// Les impulsions sont des animations CSS ; ce script ne fait qu'écouter leurs arrivées.
// Données de démonstration.

const hero = document.querySelector<HTMLElement>('.hc');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && !reduced) {
  const hub = hero.querySelector<HTMLElement>('#hub');
  const hubIn = hero.querySelector<HTMLElement>('.hub-in');
  const feed = hero.querySelector<SVGPathElement>('#p-feed');
  const n = hero.querySelector<HTMLElement>('#hc-n');
  const up = hero.querySelector<HTMLElement>('#hc-up');
  const last = hero.querySelector<HTMLElement>('#hc-last');
  let count = Number(n?.textContent) || 38;

  const restart = (node: Element | null, cls: string) => {
    if (!node) return;
    node.classList.remove(cls);
    void (node as HTMLElement).getBoundingClientRect(); // relance l'animation CSS
    node.classList.add(cls);
  };

  hero.querySelectorAll<SVGGElement>('.pz').forEach((g) => {
    const core = g.querySelector('.p-core');
    const name = g.dataset.src ?? '';
    core?.addEventListener('animationiteration', () => {
      if (hero.classList.contains('is-off') || document.documentElement.classList.contains('has-intro')) return;
      restart(hub, 'hit');
      setTimeout(() => {
        restart(feed, 'go');
        if (n) { n.textContent = String(++count); restart(n, 'bump'); }
        if (up) restart(up, 'bump');
        if (last) last.textContent = `${name} · à l'instant`;
      }, 380);
    });
  });

  // Tout s'arrête quand le hero sort de l'écran.
  new IntersectionObserver(([e]) => hero.classList.toggle('is-off', !e.isIntersecting)).observe(hero);

  // L'objet suit légèrement la souris (souris seulement, grand écran).
  if (hubIn && matchMedia('(min-width: 1001px) and (hover: hover) and (pointer: fine)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        hubIn.style.setProperty('--mx', ((e.clientX / innerWidth - 0.5) * 18).toFixed(1) + 'px');
        hubIn.style.setProperty('--my', ((e.clientY / innerHeight - 0.5) * 12).toFixed(1) + 'px');
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { hubIn.style.setProperty('--mx', '0px'); hubIn.style.setProperty('--my', '0px'); });
  }
}
