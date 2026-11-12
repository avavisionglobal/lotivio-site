// S01 · Hero : quand une impulsion arrive dans le téléphone (tenu par la main), la demande s'ajoute en haut
// de l'écran, une impulsion part vers la carte « Demandes reçues », son compteur et la barre du jour montent.
// Les impulsions sont des animations CSS ; ce script écoute seulement leurs arrivées.
// Données de démonstration : personnes et lots fictifs.

const hero = document.querySelector<HTMLElement>('.hc');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && !reduced) {
  const feed = hero.querySelector<SVGPathElement>('#p-feed');
  const n = hero.querySelector<HTMLElement>('#hc-n');
  const up = hero.querySelector<HTMLElement>('#hc-up');
  const last = hero.querySelector<HTMLElement>('#hc-last');
  const today = hero.querySelector<HTMLElement>('#hc-today');
  const list = hero.querySelector<HTMLUListElement>('#ph-list');
  const phN = hero.querySelector<HTMLElement>('#ph-n');
  const model = list?.firstElementChild as HTMLLIElement | null;
  let count = Number(n?.textContent) || 38;
  let fresh = Number(phN?.textContent) || 5;
  let k = 0;

  const people = ['Noah Perrin', 'Léa Monnier', 'Marc Jaquet', 'Elsa Rey', 'Yann Cuche', 'Chloé Vuille', 'Hugo Matthey', 'Nina Robert'];
  const lots = ['Les Terrasses · Lot B4', 'Clos des Vergers · Lot A3', 'Les Terrasses · Lot C2', 'Clos des Vergers · Lot A6', 'Les Terrasses · Lot A1'];

  const restart = (node: Element | null, cls: string) => {
    if (!node) return;
    node.classList.remove(cls);
    void (node as HTMLElement).getBoundingClientRect(); // relance l'animation CSS
    node.classList.add(cls);
  };

  const addLead = (src: string) => {
    if (!list || !model) return;
    list.querySelectorAll('li.new').forEach((li) => {
      li.classList.remove('new');
      const t = li.querySelector('time');
      if (t) t.textContent = '1 min';
    });
    // Nouvelle ligne : copie d'une ligne existante, icône copiée depuis la tuile du canal.
    const li = model.cloneNode(true) as HTMLLIElement;
    const icon = hero.querySelector(`.src-t[title="${CSS.escape(src)}"]`)?.firstElementChild;
    const slot = li.querySelector('.ph-src');
    if (slot) slot.replaceChildren(...(icon ? [icon.cloneNode(true)] : []));
    li.querySelector('b')!.textContent = people[k % people.length];
    li.querySelector('.ph-who span')!.textContent = lots[k % lots.length];
    li.querySelector('time')!.textContent = 'maintenant';
    li.className = 'new';
    k++;
    list.prepend(li);
    while (list.children.length > 6) list.lastElementChild?.remove();
    restart(list, 'push');
    // Credible values: beyond 9 unread, the agent is assumed to have processed some (back to 4).
    fresh = fresh >= 9 ? 4 : fresh + 1;
    if (phN) { phN.textContent = String(fresh); restart(phN, 'bump'); }
  };

  hero.querySelectorAll<SVGGElement>('.pz').forEach((g) => {
    const name = g.dataset.src ?? '';
    g.querySelector('.p-core')?.addEventListener('animationiteration', () => {
      if (hero.classList.contains('is-off')) return;
      addLead(name);
      setTimeout(() => {
        restart(feed, 'go');
        count = count >= 52 ? 39 : count + 1; // the week loops back after 14 arrivals (about 34 s)
        if (n) { n.textContent = String(count); restart(n, 'bump'); }
        if (up) restart(up, 'bump');
        if (last) last.textContent = `${name} · à l'instant`;
        if (today) today.style.setProperty('--v', String(Math.min((10 + count - 38) / 20, 1)));
      }, 420);
    });
  });

  // Tout s'arrête quand le hero sort de l'écran.
  new IntersectionObserver(([e]) => hero.classList.toggle('is-off', !e.isIntersecting)).observe(hero);
}
