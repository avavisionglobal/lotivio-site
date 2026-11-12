// Panneau 04 du parcours : voir ce qui se vend (données de démonstration).
// Pour chaque projet : le stock se colore en vague, les indicateurs défilent, les barres d'origine poussent.
// Puis un acheteur traverse le pipeline (Qualifié → Réservation → Notaire → Vendu) : son lot passe de Disponible
// à Réservé puis Vendu, les compteurs et l'origine des acheteurs se mettent à jour. Ensuite, projet suivant.

type Proj = { name: string; st: string; pipe: number[]; val: number; delai: number; src: number[]; buyer: { img: string; name: string; lot: string; src: string } };

const pl = document.querySelector<HTMLElement>('.pdash[data-proj]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (pl && !reduced) {
  const projs: Proj[] = JSON.parse(pl.dataset.proj ?? '[]');
  const SRC = ['hg', 'me', 'is', 'im', 'si', 'ps'];
  const LOTS = Array.from({ length: 24 }, (_, i) => 'ABCD'[Math.floor(i / 6)] + ((i % 6) + 1));
  const C = 2 * Math.PI * 34;
  const tabsBox = pl.querySelector<HTMLElement>('.pl-tabs')!;
  const tabs = [...pl.querySelectorAll<HTMLElement>('.pl-tab')];
  const ind = pl.querySelector<HTMLElement>('.pl-ind')!;
  const tiles = [...pl.querySelectorAll<HTMLElement>('.pl-lots span')];
  const leg = { d: pl.querySelector<HTMLElement>('[data-c="d"]')!, r: pl.querySelector<HTMLElement>('[data-c="r"]')!, v: pl.querySelector<HTMLElement>('[data-c="v"]')! };
  const arV = pl.querySelector<SVGCircleElement>('.ar-v')!, arR = pl.querySelector<SVGCircleElement>('.ar-r')!;
  const pct = pl.querySelector<HTMLElement>('.pl-pct')!, val = pl.querySelector<HTMLElement>('.pl-val')!, del = pl.querySelector<HTMLElement>('.pl-del')!;
  const bars = [...pl.querySelectorAll<HTMLElement>('.pl-b')];
  const stg = [...pl.querySelectorAll<HTMLElement>('.pl-sg')];
  const stgN = stg.map((s) => s.querySelector<HTMLElement>('.pl-sh b')!);
  const pipeBox = pl.querySelector<HTMLElement>('.pl-pipe')!;
  const card = pl.querySelector<HTMLElement>('.pl-card')!;
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const bump = (e: Element) => { e.classList.remove('bump'); void (e as HTMLElement).offsetWidth; e.classList.add('bump'); };
  const fmt = (v: number, dec: number) => v.toFixed(dec).replace('.', ',');

  // Nombres qui défilent jusqu'à leur valeur.
  const shown = new WeakMap<HTMLElement, number>();
  const countTo = (e: HTMLElement, to: number, dec = 0, D = 1000) => {
    const from = shown.get(e) ?? 0, t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / D), k = 1 - Math.pow(1 - p, 4);
      e.textContent = fmt(from + (to - from) * k, dec);
      if (p < 1) requestAnimationFrame(step); else shown.set(e, to);
    };
    requestAnimationFrame(step);
  };

  let st: string[] = [], pipe: number[] = [], src: number[] = [], cur = 0;
  const counts = () => ({ d: st.filter((x) => x === 'd').length, r: st.filter((x) => x === 'r').length, v: st.filter((x) => x === 'v').length });
  const paintStock = (animate: boolean) => {
    const c = counts();
    (['d', 'r', 'v'] as const).forEach((k) => { if (animate) countTo(leg[k], c[k], 0, 700); else leg[k].textContent = String(c[k]); });
    arV.style.strokeDasharray = `${(c.v / 24) * C} ${C}`;
    arR.style.strokeDasharray = `${(c.r / 24) * C} ${C}`;
    arR.style.strokeDashoffset = String(-(c.v / 24) * C);
    countTo(pct, Math.round((c.v / 24) * 100), 0, 900);
  };
  const paintSrc = () => {
    const max = Math.max(...src, 1);
    bars.forEach((b, k) => {
      b.querySelector<HTMLElement>('.pl-bt i')!.style.setProperty('--w', (src[k] / max) * 100 + '%');
      countTo(b.querySelector<HTMLElement>('b')!, src[k], 0, 900);
      b.classList.toggle('lead', src[k] === max);
    });
  };
  const setTile = (k: number, s: string) => {
    st[k] = s;
    const t = tiles[k];
    t.className = s;
    t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop');
    setTimeout(() => t.classList.remove('pop'), 900);
  };
  const moveCard = (k: number) => {
    const a = stg[k].getBoundingClientRect(), b = pipeBox.getBoundingClientRect();
    card.style.setProperty('--tx', a.left - b.left + 10 + 'px');
  };
  const moveTab = (k: number) => {
    tabs.forEach((t, j) => t.classList.toggle('on', j === k));
    const a = tabs[k].getBoundingClientRect(), b = tabsBox.getBoundingClientRect();
    ind.style.width = a.width + 'px';
    ind.style.transform = `translateX(${a.left - b.left - 4}px)`;
  };

  const show = (k: number, first: boolean) => {
    const p = projs[k];
    st = [...p.st]; pipe = [...p.pipe]; src = [...p.src];
    moveTab(k);
    tiles.forEach((t, j) => { t.className = st[j]; });
    paintStock(true);
    paintSrc();
    countTo(val, p.val, 1, 1000); countTo(del, p.delai, 0, 1000);
    stgN.forEach((n, j) => { countTo(n, pipe[j], 0, 800); });
    card.classList.add('hide');
    setTimeout(() => {
      card.querySelector('img')!.setAttribute('src', p.buyer.img);
      card.querySelector('b')!.textContent = p.buyer.name;
      card.querySelector('small')!.textContent = 'Lot ' + p.buyer.lot;
      card.classList.remove('sold');
      card.style.transition = 'none'; moveCard(0); void card.offsetWidth; card.style.transition = '';
      card.classList.remove('hide');
    }, first ? 600 : 400);
  };

  const step = (from: number, to: number) => {
    pipe[from]--; pipe[to]++;
    [from, to].forEach((j) => { stgN[j].textContent = String(pipe[j]); shown.set(stgN[j], pipe[j]); bump(stgN[j]); });
    moveCard(to);
  };

  const turn = async () => {
    const p = projs[cur];
    const li = LOTS.indexOf(p.buyer.lot);
    await wait(1700);
    step(0, 1); await wait(650); setTile(li, 'r'); paintStock(true);
    await wait(1300);
    step(1, 2);
    await wait(1400);
    step(2, 3); card.classList.add('sold');
    await wait(650);
    setTile(li, 'v'); paintStock(true);
    const si = SRC.indexOf(p.buyer.src); src[si]++; paintSrc();
    bars[si].classList.add('hit'); setTimeout(() => bars[si].classList.remove('hit'), 1800);
    await wait(2800);
    cur = (cur + 1) % projs.length;
    show(cur, false);
  };

  let visible = false, started = false;
  const loop = async () => {
    while (true) {
      if (visible && !document.hidden) await turn();
      else await wait(400);
    }
  };

  // État de départ : jauges et compteurs à zéro, puis remplissage à l'apparition.
  tabsBox.classList.add('js-ind');
  tiles.forEach((t) => (t.className = 'd'));
  bars.forEach((b) => b.querySelector<HTMLElement>('.pl-bt i')!.style.setProperty('--w', '0%'));
  arV.style.strokeDasharray = `0 ${C}`; arR.style.strokeDasharray = `0 ${C}`;
  addEventListener('resize', () => { moveTab(cur); });

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) {
      started = true;
      pl.classList.add('on');
      setTimeout(() => { show(0, true); loop(); }, 500);
    }
  }, { threshold: 0.35 }).observe(pl);
}
