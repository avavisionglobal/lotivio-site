// S07 · scènes de la mise en place (données de démonstration), au niveau des scènes du parcours.
// Chaque scène tourne tant qu'elle est à l'écran ; à la première apparition, ses tuiles entrent floutées (.in).
// Le HTML contient l'état final : sans JS ou en mouvement réduit, rien n'est masqué. Styles : s07-scenes.css.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
const $ = (root: Element, sel: string) => root.querySelector(sel) as HTMLElement;
const $$ = (root: Element, sel: string) => [...root.querySelectorAll(sel)] as HTMLElement[];
const on = (x: Element | null | undefined, v = true) => x?.classList.toggle('on', v);
const restart = (x: Element | null | undefined, cls: string) => { if (!x) return; x.classList.remove(cls); void (x as HTMLElement).offsetWidth; x.classList.add(cls); };
const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
const make = (tag: string, cls = '', text = '') => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
const portrait = (src: string) => { const i = document.createElement('img'); i.src = src; i.alt = ''; i.width = 160; i.height = 160; i.decoding = 'async'; return i; };

// Fait tourner une scène : `setup` une fois (état de départ), puis `turn` en boucle tant qu'elle est visible.
function stage(root: HTMLElement, setup: () => void, turn: () => Promise<void>) {
  let visible = false, started = false;
  setup();
  root.classList.add('run');
  const loop = async () => {
    for (;;) {
      if (visible && !document.hidden) await turn();
      else await wait(400);
    }
  };
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; root.classList.add('in'); setTimeout(loop, 700); }
  }, { threshold: 0.3 }).observe(root);
}

// Fin de boucle : fondu du contenu, remise à zéro, retour.
const fadeOut = async (root: HTMLElement, reset: () => void) => {
  root.classList.add('out');
  await wait(550);
  reset();
  await frame();
  root.classList.remove('out');
  await wait(250);
};

/* ---------- 1 · Atelier : chaque réponse dessine une partie du fonctionnement ---------- */
function atelier(root: HTMLElement) {
  const Q: { q: string }[] = JSON.parse(root.dataset.q ?? '[]');
  const src = [0, 1, 2].map((k) => $(root, `.n${k}`));
  const ag = [$(root, '.n3'), $(root, '.n4')];
  const hub = $(root, '.hub');
  const dr = [0, 1, 2, 3, 4].map((k) => $(root, `.d${k}`));
  const pu = [0, 1, 2].map((k) => $(root, `.p${k}`));
  const qt = $(root, '.qt');
  const chips = (q: number) => $$(root, `.ans span[data-q="${q}"]`);
  const dots = $$(root, '.qd i');
  const mb = $$(root, '.mb'), role = $(root, '.role');

  const reset = () => {
    [...src, ...ag, hub, ...dr, ...dots, ...mb, role].forEach((x) => on(x, false));
    ag.forEach((a) => a.classList.remove('fin', 'hit'));
    $$(root, '.ans span').forEach((c) => c.classList.remove('sh', 'on'));
    qt.textContent = '';
  };
  const type = async (t: string) => {
    qt.textContent = '';
    const txt = document.createTextNode('');
    const car = make('span', 'car');
    qt.append(txt, car);
    for (let i = 0; i < t.length; i++) { txt.textContent = t.slice(0, i + 1); await wait(32); }
    await wait(250);
    car.remove();
  };
  const show = async (c: HTMLElement) => { c.classList.add('sh'); await frame(); on(c); };
  const hide = async (q: number) => { chips(q).forEach((c) => on(c, false)); await wait(300); chips(q).forEach((c) => c.classList.remove('sh')); };

  stage(root, reset, async () => {
    // Q1 : les sources se posent sur la carte, puis la demande.
    on(dots[0]); await type(Q[0].q);
    const c0 = chips(0);
    for (let k = 0; k < 3; k++) { await show(c0[k]); on(src[k]); on(dr[k]); await wait(380); }
    on(hub); await wait(900);
    // Q2 : qui répond.
    await hide(0); on(dots[1]); await type(Q[1].q);
    await show(chips(1)[0]); on(mb[0]); await wait(300);
    on(ag[0]); on(dr[3]); await wait(500);
    restart(pu[0], 'go'); restart(pu[1], 'go'); restart(hub, 'ping');
    await wait(700); ag[0].classList.add('hit'); await wait(700); ag[0].classList.remove('hit');
    // Q3 : qui relance.
    await hide(1); on(dots[2]); await type(Q[2].q);
    await show(chips(2)[0]); on(mb[1]); await wait(300);
    on(ag[1]); on(dr[4]); await wait(500);
    restart(pu[2], 'go'); restart(hub, 'ping');
    await wait(700); ag[1].classList.add('hit'); await wait(600); ag[1].classList.remove('hit');
    // Rôles définis.
    ag.forEach((a) => a.classList.add('fin')); on(role);
    await wait(2800);
    await fadeOut(root, reset);
  });
}

/* ---------- 2 · Branchements : les canaux se connectent, puis les demandes arrivent ---------- */
type Lead = { img: string; name: string; from: string; proj: string; u: number; out: 'mail' | 'wa' };
function branchements(root: HTMLElement) {
  const leads: Lead[] = JSON.parse(root.dataset.leads ?? '[]');
  const order = [1, 2, 3, 7, 4, 5, 6, 8];
  const plugs = order.map((k) => $(root, `.plg.n${k}`));
  const paths = order.map((k) => $(root, `.dr.d${k}`));
  const core = $(root, '.core');
  const list = $(root, '.rl'), cnt = $(root, '.cnt');
  const plugOf: Record<number, string> = { 1: 'n1', 2: 'n2', 3: 'n3', 4: 'n4', 8: 'n7' };
  let i = 3, connected = false;

  stage(root, () => { [...plugs, ...paths, core].forEach((x) => on(x, false)); }, async () => {
    if (!connected) {
      on(core); await wait(350);
      for (let k = 0; k < plugs.length; k++) { on(plugs[k]); on(paths[k]); await wait(170); }
      connected = true;
      await wait(700);
    }
    // Une demande : impulsion du canal vers Lotivio, entrée dans la liste, envoi de la brochure.
    const l = leads[i++ % leads.length];
    const plug = $(root, `.plg.${plugOf[l.u]}`);
    plug.classList.add('hit');
    restart($(root, `.pu.u${l.u}`), 'go');
    await wait(850);
    plug.classList.remove('hit');
    restart(core, 'ping');
    cnt.textContent = String(Number(cnt.textContent) + 1);
    const row = make('span', 'rw new nw');
    const txt = make('span');
    txt.append(make('b', '', l.name), make('small', '', `${l.from} · ${l.proj}`));
    row.append(portrait(l.img), txt);
    list.prepend(row);
    while (list.children.length > 3) list.lastElementChild!.remove();
    await frame();
    row.classList.remove('new');
    await wait(550);
    restart($(root, `.pu.u${l.out}`), 'go');
    const ot = $(root, `.ot[data-o="${l.out}"]`);
    const sm = ot.querySelector('small');
    if (sm) sm.textContent = `Brochure · ${l.name}`;
    await wait(500);
    ot.classList.add('hit');
    await wait(1500);
    ot.classList.remove('hit'); row.classList.remove('nw');
    await wait(500);
  });
}

/* ---------- 3 · Déléguer : ce qui part seul, ce que l'agent valide ---------- */
function deleguer(root: HTMLElement) {
  const who = $(root, '.who');
  const box = $(root, '.stps'), trk = $(root, '.trk'), dot = $(root, '.trk i');
  const st = $$(root, '.stp');
  const cur = $(root, '.cur');
  const doc = $(root, '.doc'), wb = $(root, '.wb');
  const vr = $(root, '.vr'), ln = $(root, '.ln'), btv = $(root, '.btv');

  const reset = () => {
    [who, dot, cur, doc, wb, vr, ln, btv].forEach((x) => on(x, false));
    doc.classList.remove('fly');
    st.forEach((s) => s.classList.remove('done', 'wait', 'cur-on', 'ag'));
    btv.classList.remove('ok2');
  };
  const goStep = (k: number) => {
    const s = st[k];
    dot.style.top = s.offsetTop + s.offsetHeight / 2 - trk.offsetTop + 'px';
    on(dot);
    st.forEach((x, j) => x.classList.toggle('cur-on', j === k));
  };
  // Le curseur se déplace dans le repère de .stps (indépendant de l'inclinaison éventuelle de la carte).
  const cursorTo = (target: HTMLElement) => {
    let x = target.offsetWidth * 0.35, y = target.offsetHeight * 0.45, n: HTMLElement | null = target;
    while (n && n !== box) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
    cur.style.transform = `translate(${x}px, ${y}px)`;
  };

  stage(root, reset, async () => {
    on(who); await wait(700);
    // Premier contact : automatique.
    goStep(0); await wait(800); st[0].classList.add('done'); await wait(700);
    // Brochure : le PDF part dans WhatsApp.
    goStep(1); await wait(400);
    on(doc); await wait(450); doc.classList.add('fly'); await wait(500);
    on(wb); st[1].classList.add('done'); await wait(900);
    // Relance : l'agence a choisi qu'elle passe par l'agent.
    goStep(2);
    const tg = st[2].querySelector('.tg') as HTMLElement;
    cur.style.transition = 'none';
    cur.style.transform = `translate(${box.offsetWidth * 0.95}px, ${box.offsetHeight + 10}px)`;
    await frame(); cur.style.transition = '';
    on(cur); cursorTo(tg); await wait(950);
    restart(cur, 'tap'); st[2].classList.add('ag'); await wait(350);
    st[2].classList.add('wait'); await wait(300); on(cur, false);
    on(vr); await wait(300); on(ln); on(btv); await wait(1300);
    restart(btv, 'press'); btv.classList.add('ok2'); st[2].classList.add('done');
    await wait(2800);
    await fadeOut(root, reset);
  });
}

/* ---------- 4 · Prise en main : import, équipe en ligne, première demande ---------- */
function priseEnMain(root: HTMLElement) {
  const cts: { img: string; name: string }[] = JSON.parse(root.dataset.contacts ?? '[]');
  const stx = $(root, '.stx'), list = $(root, '.cl'), n = $(root, '.file .n'), bar = $(root, '.pbar i');
  const avs = $$(root, '.av'), onl = $(root, '.onl b');
  const tnew = $(root, '.t-new'), nc = $(root, '.nc'), take = $(root, '.take');
  const okTpl = root.querySelector('.cr .ok')?.cloneNode(true) as HTMLElement | undefined;
  const TOTAL = 1248;

  const reset = () => {
    stx.classList.remove('fin'); list.replaceChildren(); n.textContent = '0'; bar.style.setProperty('--p', '0%');
    avs.forEach((a) => on(a, false)); onl.textContent = '0';
    on(nc, false); nc.classList.remove('ring'); take.classList.remove('done'); tnew.classList.remove('has');
  };
  const countTo = (from: number, to: number, D: number) => {
    const t0 = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - t0) / D); n.textContent = fmt(from + (to - from) * p); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };

  stage(root, reset, async () => {
    // Import : les contacts arrivent de la feuille, le compteur et la barre avancent.
    root.classList.add('busy');
    for (let k = 0; k < cts.length; k++) {
      const row = make('span', 'cr new');
      row.append(portrait(cts[k].img), make('b', '', cts[k].name));
      if (okTpl) row.append(okTpl.cloneNode(true));
      list.prepend(row);
      while (list.children.length > 3) list.lastElementChild!.remove();
      await frame(); row.classList.remove('new');
      countTo((TOTAL * k) / cts.length, (TOTAL * (k + 1)) / cts.length, 420);
      bar.style.setProperty('--p', ((k + 1) / cts.length) * 100 + '%');
      await wait(460);
    }
    root.classList.remove('busy'); n.textContent = fmt(TOTAL); stx.classList.add('fin');
    await wait(600);
    // L'équipe se connecte.
    for (let k = 0; k < avs.length; k++) { on(avs[k]); onl.textContent = String(k + 1); await wait(320); }
    await wait(400);
    // Première demande prise en charge.
    tnew.classList.add('has'); on(nc); nc.classList.add('ring'); await wait(1200);
    restart(take, 'press'); take.classList.add('done'); nc.classList.remove('ring');
    await wait(2800);
    await fadeOut(root, reset);
  });
}

if (!reduced) {
  const scenes: Record<string, (r: HTMLElement) => void> = { at: atelier, cx: branchements, dl: deleguer, pm: priseEnMain };
  document.querySelectorAll<HTMLElement>('.s7[data-s7]').forEach((r) => scenes[r.dataset.s7 ?? '']?.(r));
}
