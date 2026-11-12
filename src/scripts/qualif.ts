// Panneau 03 du parcours : qualifier et savoir qui rappeler (données de démonstration).
// Tour par tour : un signal arrive sur un contact (brochure consultée, critères reçus de Max, absence de réponse),
// il passe en tête de la liste « Relance », sa fiche s'ouvre (critères, signaux), puis l'agent dicte son compte
// rendu : la transcription s'écrit, les informations extraites se surlignent et forment un brouillon à confirmer.
// Une fois confirmé, le contact quitte la liste. Mouvements en CSS (s06-parcours.css).

type Row = { id: string; img: string; name: string; bien: string; sig: string; ico: string; age: string };
type Scen = { id: string; sig: string; ico: string; hot: boolean; crit: string[]; sigs: string[][]; tx: [string, number?][]; ex: string[][]; done: string };

const qf = document.querySelector<HTMLElement>('.qf[data-rows]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (qf && !reduced) {
  const rowsData: Row[] = JSON.parse(qf.dataset.rows ?? '[]');
  const scen: Scen[] = JSON.parse(qf.dataset.scen ?? '[]');
  const ico: Record<string, string> = JSON.parse(qf.dataset.ico ?? '{}');
  const box = qf.querySelector<HTMLElement>('.qf-rows')!;
  const nEl = qf.querySelector<HTMLElement>('.qf-n')!;
  const card = qf.querySelector<HTMLElement>('.qf-card')!;
  const ph = card.querySelector<HTMLImageElement>('.qf-ph')!;
  const nm = card.querySelector<HTMLElement>('.qf-nm')!;
  const bn = card.querySelector<HTMLElement>('.qf-bn')!;
  const crit = card.querySelector<HTMLElement>('.qf-crit')!;
  const sigs = card.querySelector<HTMLElement>('.qf-sigs')!;
  const dic = qf.querySelector<HTMLElement>('.qf-dic')!;
  const tx = qf.querySelector<HTMLElement>('.qf-tx')!;
  const ex = qf.querySelector<HTMLElement>('.qf-ex')!;
  const btn = qf.querySelector<HTMLElement>('.qf-btn')!;
  const draft = qf.querySelector<HTMLElement>('.qf-draft')!;
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const el = (tag: string, cls = '', html = '') => { const e = document.createElement(tag); if (cls) e.className = cls; e.innerHTML = html; return e; };
  const bump = (e: HTMLElement) => { e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); };

  // Construit toutes les lignes ; l'ordre de la liste est porté par --i (les lignes au-delà de 4 sont masquées).
  const mkRow = (r: Row) => {
    const d = el('div', 'qf-r');
    d.dataset.id = r.id;
    d.innerHTML = `<img src="${r.img}" alt="" width="160" height="160" decoding="async"><span class="qf-who"><span class="qf-l1"><b>${r.name}</b><small>${r.bien}</small></span>`
      + `<span class="qf-sig"><span class="qf-si">${ico[r.ico]}</span><span class="qf-st">${r.sig}</span></span></span>`
      + `<span class="qf-acts"><span class="qf-a go"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg></span>`
      + `<span class="qf-a"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12l5 5 9-10"/></svg></span></span>`;
    return d;
  };
  box.innerHTML = '';
  const nodes = new Map<string, HTMLElement>();
  rowsData.forEach((r) => { const d = mkRow(r); nodes.set(r.id, d); box.append(d); });
  let order = rowsData.map((r) => r.id);
  const layout = () => order.forEach((id, k) => { const d = nodes.get(id)!; d.style.setProperty('--i', String(k)); d.classList.toggle('hid', k > 3); });
  layout();
  let count = 7;
  const setCount = (v: number) => { count = v; nEl.textContent = String(v); bump(nEl); };

  const setSig = (d: HTMLElement, text: string, ic: string) => {
    d.querySelector('.qf-st')!.textContent = text;
    d.querySelector('.qf-si')!.innerHTML = ico[ic];
  };

  // Fiche : contenu remplacé avec un léger fondu, puis critères et signaux posés un à un.
  const fillCard = async (r: Row, s: Scen) => {
    const parts = [card.querySelector('.qf-id')!, ...crit.children, ...sigs.children] as HTMLElement[];
    parts.forEach((p) => p.classList.add('sw'));
    await wait(260);
    ph.src = r.img; nm.textContent = r.name; bn.textContent = r.bien;
    card.classList.toggle('hot', s.hot);
    crit.innerHTML = ''; sigs.innerHTML = '';
    s.crit.forEach((c) => crit.append(el('span', 'sw', c)));
    s.sigs.forEach(([t, d], k) => sigs.append(el('div', `sw${k === s.sigs.length - 1 ? ' nw' : ''}`, `<i></i><span>${t}</span><small>${d}</small>`)));
    tx.innerHTML = ''; ex.innerHTML = '';
    dic.classList.remove('saved'); draft.textContent = 'Brouillon à confirmer'; btn.textContent = 'Confirmer';
    card.querySelector('.qf-id')!.classList.remove('sw');
    [...crit.children, ...sigs.children].forEach((c, k) => setTimeout(() => c.classList.remove('sw'), 80 + k * 70));
  };

  // Transcription écrite au fil de la voix, puis extraction surlignée.
  const dictate = async (s: Scen) => {
    dic.classList.add('rec');
    await wait(1300);
    const marks: HTMLElement[] = [];
    const cur = el('span', 'cur');
    tx.append(cur);
    for (const [t, k] of s.tx) {
      const host = k === undefined ? document.createTextNode('') : el('mark');
      if (k !== undefined) marks[k] = host as HTMLElement;
      tx.insertBefore(host, cur);
      for (let c = 0; c < t.length; c += 3) {
        host.textContent = t.slice(0, c + 3);
        await wait(28);
      }
    }
    dic.classList.remove('rec');
    cur.remove();
    await wait(250);
    for (let k = 0; k < s.ex.length; k++) {
      const [lab, val] = s.ex[k];
      const chip = el('span', '', `<small>${lab}</small>${val}`);
      ex.append(chip);
      marks[k]?.classList.add('on');
      requestAnimationFrame(() => requestAnimationFrame(() => chip.classList.add('on')));
      if (lab === 'Critère') { const c = el('span', 'add sw', val); crit.append(c); setTimeout(() => c.classList.remove('sw'), 60); }
      await wait(420);
    }
  };

  let si = 0, visible = false, started = false, running = false;
  const turn = async () => {
    running = true;
    const s = scen[si++ % scen.length];
    const r = rowsData.find((x) => x.id === s.id)!;
    const d = nodes.get(s.id)!;
    // 1. Le signal arrive et le contact remonte en tête.
    nodes.forEach((n) => n.classList.remove('sel'));
    setSig(d, s.sig, s.ico);
    d.classList.toggle('hot', s.hot || s.ico === 'clock');
    d.classList.remove('ping'); void d.offsetWidth; d.classList.add('ping');
    await wait(500);
    order = [s.id, ...order.filter((x) => x !== s.id)];
    layout();
    d.classList.add('sel');
    await wait(700);
    // 2. La fiche s'ouvre.
    await fillCard(r, s);
    await wait(900);
    // 3. Compte rendu dicté → brouillon → confirmé.
    await dictate(s);
    await wait(500);
    btn.classList.add('press'); await wait(180); btn.classList.remove('press');
    dic.classList.add('saved'); draft.textContent = 'Enregistré dans la fiche'; btn.textContent = 'Confirmé ✓';
    const ok = d.querySelector<HTMLElement>('.qf-a:not(.go)');
    ok?.classList.add('press'); setTimeout(() => ok?.classList.remove('press'), 200);
    d.classList.remove('hot'); d.classList.add('done');
    d.querySelector('.qf-st')!.textContent = s.done;
    d.querySelector('.qf-si')!.innerHTML = ico.check;
    await wait(1400);
    // 4. Le contact traité quitte la liste ; il y reviendra plus tard avec son état de départ.
    d.classList.add('out');
    setCount(count - 1);
    await wait(550);
    order = [...order.filter((x) => x !== s.id), s.id];
    d.classList.add('hid');
    d.classList.remove('out', 'done', 'sel', 'ping');
    setSig(d, r.sig, r.ico);
    layout();
    await wait(700);
    setCount(count + 1); // une nouvelle relance arrive
    await wait(300);
    running = false;
  };

  const loop = async () => {
    while (true) {
      if (visible && !document.hidden && !running) await turn();
      else await wait(400);
    }
  };

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; qf.classList.add('on'); setTimeout(loop, 1100); }
  }, { threshold: 0.35 }).observe(qf);
}
