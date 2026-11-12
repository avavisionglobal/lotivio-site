// Panneau 02 du parcours : les demandes arrivent en direct (données de démonstration).
// Une pastille part du canal, vole jusqu'à la liste, la demande s'insère en haut, puis le suivi réglé
// avec l'agence s'applique étape par étape (premier contact, brochure, agent). Mouvements en CSS (s06-parcours.css).

type Lead = { img: string; name: string; bien: string; ch: string; from: string; br: string; agent: string };

const ld = document.querySelector<HTMLElement>('.ld[data-leads]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (ld && !reduced) {
  const leads: Lead[] = JSON.parse(ld.dataset.leads ?? '[]');
  const list = ld.querySelector<HTMLElement>('.ld-list')!;
  const tot = ld.querySelector<HTMLElement>('.ld-tot');
  const steps = [...ld.querySelectorAll<HTMLElement>('.ld-step')];
  const br = ld.querySelector<HTMLElement>('.ld-br');
  const ag = ld.querySelector<HTMLElement>('.ld-ag');
  let n = 4, visible = false, started = false, timer = 0;
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const el = (tag: string, cls: string, html = '') => { const e = document.createElement(tag); e.className = cls; e.innerHTML = html; return e; };
  const item = (l: Lead) => {
    const it = el('div', 'ld-it st0 new');
    const img = document.createElement('img');
    img.src = `/media/leads/${l.img}.webp`; img.alt = ''; img.width = 160; img.height = 160; img.decoding = 'async';
    const who = el('span', 'ld-who'); who.append(el('b', '', l.name), el('small', '', l.bien));
    const meta = el('span', 'ld-meta'); meta.append(el('span', 'ld-from', l.from), el('span', 'ld-st', 'Nouveau'));
    it.append(img, who, meta);
    return it;
  };

  // La pastille du canal vole de la colonne des canaux jusqu'en haut de la liste.
  const fly = async (row: HTMLElement) => {
    const box = ld.getBoundingClientRect(), a = row.getBoundingClientRect(), b = list.getBoundingClientRect();
    const f = el('span', 'ld-fly', row.querySelector('.ld-ic')!.innerHTML);
    f.style.left = a.left - box.left + 10 + 'px'; f.style.top = a.top - box.top + a.height / 2 - 14 + 'px';
    ld.append(f);
    void f.offsetWidth;
    f.style.transform = `translate(${b.left - a.left + 4}px, ${b.top - a.top + 6 - a.height / 2 + 14}px) scale(.8)`;
    f.classList.add('go');
    await wait(620);
    f.remove();
  };

  const arrive = async () => {
    const l = leads[n++ % leads.length];
    const row = ld.querySelector<HTMLElement>(`.ld-ch[data-ch="${l.ch}"]`)!;
    steps.forEach((s) => s.classList.remove('on'));
    row.classList.remove('hit'); void row.offsetWidth; row.classList.add('hit');
    const ct = row.querySelector<HTMLElement>('.ld-ct'); if (ct) ct.textContent = String(Number(ct.textContent) + 1);
    if (tot) tot.textContent = String(Number(tot.textContent) + 1);
    await fly(row);
    const it = item(l);
    list.prepend(it);
    while (list.children.length > 4) list.lastElementChild!.remove();
    requestAnimationFrame(() => it.classList.remove('new'));
    const st = it.querySelector<HTMLElement>('.ld-st')!;
    const go = async (k: number, txt: string) => {
      await wait(700);
      it.className = `ld-it st${k}`; st.textContent = txt;
      steps[k - 1]?.classList.add('on');
    };
    if (br) br.textContent = l.br === 'WhatsApp' ? 'Par WhatsApp (lead Meta Ads)' : 'Par e-mail';
    if (ag) ag.textContent = l.agent;
    await go(1, 'Premier contact envoyé');
    await go(2, `Brochure · ${l.br}`);
    await go(3, `Agent · ${l.agent}`);
  };

  const loop = () => {
    clearTimeout(timer);
    timer = window.setTimeout(async () => { if (visible && !document.hidden) await arrive(); loop(); }, 1400);
  };

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; ld.classList.add('on'); setTimeout(loop, 900); }
  }, { threshold: 0.35 }).observe(ld);
}
