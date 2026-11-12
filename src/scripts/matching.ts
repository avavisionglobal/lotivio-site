// Panneau 01 du parcours : la base clients rapprochée d'un nouveau lot (données de démonstration).
// Entrée : les cartes sont « distribuées », une ligne balaie la base, les jauges se remplissent pendant que
// les scores défilent, puis les correspondances (≥ 85) s'allument. Ensuite, tant que le panneau est visible,
// la scène passe d'un lot à l'autre et recalcule les jauges. Les mouvements sont en CSS (s06-parcours.css).

type Lot = { img: string; label: string; sc: number[] };

const av = document.querySelector<HTMLElement>('.av[data-lots]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (av && !reduced) {
  const lots: Lot[] = JSON.parse(av.dataset.lots ?? '[]');
  const MATCH = Number(av.dataset.match) || 85;
  const cards = [...av.querySelectorAll<HTMLElement>('.av-c')];
  const bars = cards.map((c) => c.querySelector<HTMLElement>('.av-g i')!);
  const nums = cards.map((c) => c.querySelector<HTMLElement>('.av-g em')!);
  const stack = [...av.querySelectorAll<HTMLImageElement>('.av-stack img')];
  const count = av.querySelector<HTMLElement>('.av-n');
  const lotImg = av.querySelector<HTMLImageElement>('.av-lot img');
  const lotTxt = av.querySelector<HTMLElement>('.av-lot-t');
  const lotBox = av.querySelector<HTMLElement>('.av-lot');
  const shown = cards.map(() => 0);
  let cur = 0, timer = 0, visible = false, started = false;

  const restart = (el: Element | null, cls: string) => {
    if (!el) return;
    el.classList.remove(cls);
    void (el as HTMLElement).offsetWidth;
    el.classList.add(cls);
  };

  // Les scores défilent jusqu'à leur nouvelle valeur (même durée que la jauge).
  const countTo = (k: number, to: number, delay: number) => {
    const from = shown[k], t0 = performance.now() + delay, D = 1100;
    const step = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / D)), e = 1 - Math.pow(1 - p, 4);
      nums[k].textContent = String(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(step); else shown[k] = to;
    };
    requestAnimationFrame(step);
  };

  const apply = (lot: Lot, first: boolean) => {
    restart(av.querySelector('.av-scan'), 'run');
    let n = 0;
    lot.sc.forEach((v, k) => {
      const delay = (first ? 450 : 250) + k * 110;
      setTimeout(() => { bars[k].style.setProperty('--w', v + '%'); }, delay);
      countTo(k, v, delay);
      const on = v >= MATCH; if (on) n++;
      setTimeout(() => {
        cards[k].classList.toggle('m', on);
        if (on) restart(cards[k], 'pop');
        stack[k]?.classList.toggle('on', on);
      }, delay + 900);
    });
    setTimeout(() => { if (count) { count.textContent = String(n); restart(count, 'bump'); } }, 1500);
  };

  const nextLot = () => {
    cur = (cur + 1) % lots.length;
    const lot = lots[cur];
    lotBox?.classList.add('swap');
    setTimeout(() => {
      if (lotImg) lotImg.src = lot.img;
      if (lotTxt) lotTxt.textContent = lot.label;
      lotBox?.classList.remove('swap');
      apply(lot, false);
    }, 320);
  };

  const loop = () => { clearInterval(timer); timer = window.setInterval(() => { if (visible) nextLot(); }, 5600); };

  // État de départ : jauges vides, scores à 0, aucune correspondance (le HTML contient l'état final, sans JS).
  bars.forEach((b) => b.style.setProperty('--w', '0%'));
  nums.forEach((n) => (n.textContent = '0'));
  cards.forEach((c) => c.classList.remove('m'));
  stack.forEach((s) => s.classList.remove('on'));
  if (count) count.textContent = '0';

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) {
      started = true;
      av.classList.add('on');           // entrée des cartes (CSS)
      setTimeout(() => apply(lots[0], true), 650);
      loop();
    }
  }, { threshold: 0.35 }).observe(av);
}
