// S01 · Hero : quand une impulsion arrive dans l'objet Lotivio (tenu par la main), l'objet s'éclaire,
// une impulsion part vers la carte « Demandes reçues » et son compteur monte.
// Les impulsions sont des animations CSS ; ce script écoute seulement leurs arrivées.
// Données de démonstration.

const hero = document.querySelector<HTMLElement>('.hc');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && !reduced) {
  const hand = hero.querySelector<HTMLElement>('#hand');
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
    const name = g.dataset.src ?? '';
    g.querySelector('.p-core')?.addEventListener('animationiteration', () => {
      if (hero.classList.contains('is-off')) return;
      restart(hand, 'hit');
      setTimeout(() => {
        restart(feed, 'go');
        if (n) { n.textContent = String(++count); restart(n, 'bump'); }
        if (up) restart(up, 'bump');
        if (last) last.textContent = `${name} · à l'instant`;
      }, 420);
    });
  });

  // Tout s'arrête quand le hero sort de l'écran.
  new IntersectionObserver(([e]) => hero.classList.toggle('is-off', !e.isIntersecting)).observe(hero);
}
