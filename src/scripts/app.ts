// Lotivio — comportements fonctionnels (sans dépendance d'animation).
// Toutes les données affichées sont des données de démonstration.

type Cls = string | null;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: Cls, text?: string | null) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Exécute `tick` à intervalle régulier uniquement quand `target` est visible. */
function loopWhenVisible(target: Element | null, tick: () => void, ms: number) {
  if (!target || reduced) return;
  let id = 0;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !id) id = window.setInterval(tick, ms);
    else if (!e.isIntersecting && id) { clearInterval(id); id = 0; }
  }).observe(target);
}

/* ---------- Trames de code tirées des photos (générées à l'approche) ---------- */
function drawTexture(pre: HTMLElement) {
  const img = new Image();
  img.decoding = 'async';
  img.src = pre.dataset.src!;
  img.onload = () => {
    const w = parseFloat(pre.dataset.w || '.6'), ratio = parseFloat(pre.dataset.r || '.42');
    const cols = Math.max(40, Math.round((Math.min(innerWidth, 1600) * w) / 6.1)), rows = Math.round(cols * ratio);
    const c = document.createElement('canvas'); c.width = cols; c.height = rows;
    const x = c.getContext('2d', { willReadFrequently: true })!; x.drawImage(img, 0, 0, cols, rows);
    const d = x.getImageData(0, 0, cols, rows).data, ramp = ' .:-=+*#%@';
    const frag = document.createDocumentFragment(); let line = '';
    for (let y = 0; y < rows; y++) {
      for (let i = 0; i < cols; i++) {
        const p = (y * cols + i) * 4, l = (d[p] * 0.3 + d[p + 1] * 0.59 + d[p + 2] * 0.11) / 255;
        const ch = ramp[Math.min(ramp.length - 1, Math.floor((1 - l) * ramp.length))];
        if (ch !== ' ' && Math.random() < 0.004) { frag.append(document.createTextNode(line)); line = ''; frag.append(el('b', null, ch)); }
        else line += ch;
      }
      line += '\n';
    }
    frag.append(document.createTextNode(line));
    pre.replaceChildren(frag);
    requestAnimationFrame(() => pre.classList.add('drawn')); // fondu d'apparition (CSS)
  };
}
// Une trame vide fait 0 px de haut : on observe donc la section qui la contient.
const texBySection = new Map<Element, HTMLElement[]>();
$$('pre.tex[data-src]').forEach((p) => {
  const host = p.closest('section, header, footer') ?? p.parentElement!;
  texBySection.set(host, [...(texBySection.get(host) ?? []), p]);
});
// File d'attente : une trame par créneau libre, pour ne pas bloquer le fil principal.
const texQueue: HTMLElement[] = [];
let texBusy = false;
const idle = (cb: () => void) => (window.requestIdleCallback ? requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 120));
// Jamais de calcul de trame pendant que la page défile : on attend une pause.
let lastScroll = 0;
addEventListener('scroll', () => { lastScroll = performance.now(); }, { passive: true });
export const whenCalm = (cb: () => void) => {
  const run = () => (performance.now() - lastScroll < 220 ? setTimeout(run, 160) : idle(cb));
  run();
};
const pumpTextures = () => {
  const pre = texQueue.shift();
  if (!pre) { texBusy = false; return; }
  if (!pre.classList.contains('drawn') && !pre.dataset.queued && getComputedStyle(pre).display !== 'none') { pre.dataset.queued = '1'; drawTexture(pre); } // trame masquée (ex. mobile) : ignorée
  whenCalm(pumpTextures);
};
const enqueue = (pres: HTMLElement[]) => {
  texQueue.push(...pres);
  if (!texBusy) { texBusy = true; whenCalm(pumpTextures); }
};
// Priorité aux trames proches de l'écran…
const texIo = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  enqueue(texBySection.get(e.target) ?? []);
  texIo.unobserve(e.target);
}), { rootMargin: '1200px 0px' });
texBySection.forEach((_, host) => texIo.observe(host));
// … puis toutes les autres, une fois la page chargée : elles sont prêtes avant qu'on y arrive.
const all = () => setTimeout(() => enqueue([...texBySection.values()].flat()), 1500);
if (document.readyState === 'complete') all(); else addEventListener('load', all);

/* ---------- S01 · file de demandes en direct ---------- */
(() => {
  const feed = $('#feed'); if (!feed) return;
  const data = [
    ['Homegate', 'David Grosjean', 'Clos des Vergers · Lot A2', 'Nouveau', 'n'],
    ['WhatsApp', 'Nathalie Girard', 'Les Terrasses du Vignoble', 'Qualifié', 'q'],
    ['Site internet', 'Yann Renaud', 'Résidence Lac & Lumière', 'Brochure envoyée', 'b'],
    ['immobilier.ch', 'Claire Monnier', 'Les Terrasses · Attique', 'Nouveau', 'n'],
    ['Meta Ads', 'Marc Vuilleumier', 'Clos des Vergers · Lot C1', 'Qualifié', 'q'],
    ['Properstar', 'Léa Perrin', 'Résidence Lac & Lumière', 'Nouveau', 'n'],
    ['Pipeline', 'Famille Aubry', 'Les Terrasses · Lot B2', 'Vendu', 'v'],
    ['ImmoScout24', 'Sophie Jeanneret', 'Clos des Vergers · Lot A4', 'Nouveau', 'n'],
  ];
  let n = 0, count = 12, minute = 47;
  const row = (d: string[], t: string) => {
    const r = el('div', 'row new'), who = el('div', 'who');
    who.append(el('b', null, d[1]), el('span', null, d[2]));
    r.append(el('span', 'tm', t), el('span', 'src', d[0]), who, el('span', 'st ' + d[4], d[3]));
    setTimeout(() => r.classList.remove('new'), 1400);
    return r;
  };
  for (let i = 0; i < 5; i++) feed.append(row(data[(i + 3) % data.length], '21:' + (40 - i * 3)));
  const countEl = $('#count'), clock = $('#clock'), mark = $('#mark');
  loopWhenVisible(feed, () => {
    const d = data[n++ % data.length]; minute = (minute + 1) % 60;
    const t = '21:' + String(minute).padStart(2, '0');
    feed.prepend(row(d, t)); if (feed.children.length > 7) feed.lastElementChild!.remove();
    if (d[4] === 'n' && countEl) countEl.textContent = ++count + " demandes aujourd'hui";
    if (clock) clock.textContent = t;
    if (mark) mark.style.left = Math.min(98, (n % 12) * 8.5) + '%';
  }, 2400);
})();

/* ---------- S03 · onde de la dictée ---------- */
(() => {
  const w = $('#wave3'); if (!w) return;
  for (let i = 0; i < 30; i++) { const b = el('i'); b.style.setProperty('--h', 6 + Math.abs(Math.sin(i * 1.3)) * 22 + 'px'); b.style.animationDelay = i * 0.05 + 's'; w.append(b); }
})();

/* ---------- S06.1 · sources : la sélection passe d'une source à l'autre ---------- */
(() => {
  const srcs = $('#srcs'); if (!srcs) return;
  const srcData: [string, number, string, boolean?][] = [
    ['Homegate', 12, '/media/logos/homegate.svg'], ['ImmoScout24', 6, '/media/logos/immoscout24.svg', true],
    ['immobilier.ch', 7, '/media/logos/immobilier-ch.svg'], ['Properstar', 4, '/media/logos/properstar-logo.png'], ['Meta Ads', 18, '/media/logos/meta.png'],
  ];
  srcData.forEach((s, i) => {
    const c = el('div', 'sc' + (i === 3 ? ' on' : '')), ln = el('span', 'ln');
    [52, 38, 46].forEach((w) => { const b = el('i'); b.style.width = w + 'px'; ln.append(b); });
    const ct = el('span', 'ct', String(s[1])); ct.append(el('small', null, 'demandes'));
    const nm = el('img', 'lgo' + (s[3] ? ' tall' : '')); nm.src = s[2]; nm.alt = s[0]; nm.loading = 'lazy';
    c.append(el('span', 'rd'), ln, nm, ct); srcs.append(c);
  });
  let si = 3;
  loopWhenVisible(srcs, () => { const cs = srcs.children; cs[si].classList.remove('on'); si = (si + 1) % cs.length; cs[si].classList.add('on'); }, 1700);
})();

/* ---------- S06.2 · qualification : les critères se remplissent ---------- */
(() => {
  const qual = $('#qual'); if (!qual) return;
  const slots = $$('.qslot', qual); let qi = 0;
  if (reduced) { slots.forEach((s) => s.classList.add('done')); return; }
  loopWhenVisible(qual, () => { if (qi < slots.length) slots[qi++].classList.add('done'); else { slots.forEach((s) => s.classList.remove('done')); qi = 0; } }, 1300);
})();

/* ---------- S06.4 · le lot avance dans le pipeline ---------- */
(() => {
  const tool = $('#tool'); if (!tool) return;
  const stg = $$('.stg', tool); let gi = reduced ? stg.length - 1 : 0;
  const stage = () => { stg.forEach((s, i) => { s.classList.toggle('on', i === gi); s.classList.toggle('done', i < gi); }); gi = (gi + 1) % stg.length; };
  stage(); loopWhenVisible(tool, stage, 1500);
})();

/* ---------- S07.3 · réglages cliquables ---------- */
(() => {
  const chain = $('#chain'); if (!chain) return;
  const v = (k: string) => $(`.seg[data-k="${k}"] [aria-pressed="true"]`)?.textContent ?? '';
  const draw = () => {
    const steps = ['Demande', v('first') === 'Automatique' ? 'Message automatique' : "Message validé par l'agent", 'Brochure · ' + v('bro'), v('rel') === 'Aucune' ? 'Pas de relance' : 'Relance · ' + v('rel')];
    const parts: HTMLElement[] = [];
    steps.forEach((s, i) => { if (i) parts.push(el('i', null, '→')); parts.push(el('span', null, s)); });
    chain.replaceChildren(...parts);
  };
  $$('.seg').forEach((seg) => seg.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button'); if (!b) return;
    $$('button', seg).forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); draw();
  }));
  draw();
})();

/* ---------- S08.2 · interrupteurs de diffusion ---------- */
$$('[data-diff] > div').forEach((row) => {
  const sw = $('.sw', row)!; const label = row.firstElementChild!.textContent;
  row.setAttribute('role', 'switch'); row.setAttribute('tabindex', '0'); row.setAttribute('aria-label', 'Diffuser sur ' + label);
  const sync = () => row.setAttribute('aria-checked', String(sw.classList.contains('on')));
  const flip = () => { sw.classList.toggle('on'); sync(); };
  row.addEventListener('click', flip);
  row.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
  (row as HTMLElement).style.cursor = 'pointer'; sync();
});

/* ---------- S10 · réservation en deux étapes ---------- */
(() => {
  const form = $<HTMLFormElement>('#book'); if (!form) return;
  const days = $('#days')!, slotsBox = $('#slots')!, next = $<HTMLButtonElement>('#bk-next')!;
  const steps = $$('.bk-p', form), stepLbl = $('#bk-step')!;
  const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const d = new Date(); const list: Date[] = [];
  while (list.length < 8) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) list.push(new Date(d)); }
  list.forEach((x) => {
    const b = el('button'); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.dataset.date = x.toISOString().slice(0, 10);
    b.setAttribute('aria-label', x.toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long' }));
    b.append(el('small', null, jours[x.getDay()]), el('b', null, String(x.getDate())), el('small', null, mois[x.getMonth()]));
    days.append(b);
  });
  const picked = (box: Element) => $<HTMLButtonElement>('[aria-pressed="true"]', box);
  const pick = (group: Element) => group.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button'); if (!b) return;
    $$('button', group).forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    next.disabled = !(picked(days) && picked(slotsBox));
  });
  pick(days); pick(slotsBox);

  const show = (n: number) => {
    steps.forEach((s) => (s.hidden = s.dataset.step !== String(n)));
    stepLbl.textContent = n < 3 ? `${n}/2` : '';
    const first = $<HTMLElement>(n === 2 ? 'input' : n === 3 ? '[role=status]' : 'button', steps[n - 1]);
    first?.focus({ preventScroll: true });
  };
  const when = () => `${picked(days)!.getAttribute('aria-label')} · ${picked(slotsBox)!.textContent}`;
  next.addEventListener('click', () => { $('#bk-when')!.textContent = when(); show(2); });
  $('#bk-back')!.addEventListener('click', () => show(1));

  const done = (title: string, msg: string, warn = false) => {
    $('#bk-msg-t')!.textContent = title; $('#bk-msg')!.textContent = msg;
    steps[2].classList.toggle('warn', warn); show(3);
  };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = $$<HTMLInputElement>('input', form);
    inputs.forEach((i) => i.setAttribute('aria-invalid', String(!i.checkValidity())));
    if (!form.checkValidity()) { inputs.find((i) => !i.checkValidity())?.focus(); return; }
    const fd = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...fd, date: picked(days)!.dataset.date, time: picked(slotsBox)!.textContent, timezone: 'Europe/Zurich', source: 'lotivio.ch' };
    const { endpoint, email } = form.dataset;
    const send = $<HTMLButtonElement>('#bk-send')!;
    if (endpoint) {
      send.setAttribute('aria-busy', 'true'); send.disabled = true;
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error(String(r.status));
        done('Demande envoyée.', `Créneau demandé : ${when()}. Nous vous le confirmons par e-mail.`);
      } catch {
        done("La demande n'est pas partie.", 'Réessayez dans un instant ou écrivez-nous directement.', true);
      } finally { send.removeAttribute('aria-busy'); send.disabled = false; }
    } else if (email) {
      const body = `Bonjour,\n\nJe souhaite une démo de Lotivio.\n\nCréneau souhaité : ${when()} (heure suisse)\nNom : ${fd.name}\nAgence : ${fd.agency}\nE-mail : ${fd.email}\nTéléphone : ${fd.phone || '—'}\n`;
      location.href = `mailto:${email}?subject=${encodeURIComponent('Demande de démo Lotivio')}&body=${encodeURIComponent(body)}`;
      done('Votre e-mail est prêt.', "Votre messagerie s'est ouverte avec la demande. Il reste à l'envoyer.");
    } else {
      done('Réservation bientôt disponible.', "La réservation en ligne n'est pas encore active : votre demande n'a pas été transmise.", true);
    }
  });
})();

/* ---------- Modale du film ---------- */
(() => {
  const dlg = $<HTMLDialogElement>('#film'), video = $<HTMLVideoElement>('#film-v'); if (!dlg || !video) return;
  let opener: HTMLElement | null = null;
  $$('[data-film]').forEach((b) => b.addEventListener('click', () => {
    opener = b; dlg.showModal(); document.dispatchEvent(new CustomEvent('lotivio:lock', { detail: true }));
    video.play().catch(() => {});
  }));
  const close = () => { video.pause(); if (dlg.open) dlg.close(); };
  $('[data-film-close]', dlg)!.addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('close', () => { video.pause(); document.dispatchEvent(new CustomEvent('lotivio:lock', { detail: false })); opener?.focus(); });
})();

/* ---------- S00 · menu ---------- */
(() => {
  const btn = $<HTMLButtonElement>('#menu-btn'), menu = $('#menu'); if (!btn || !menu) return;
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open)); menu.hidden = !open;
    document.dispatchEvent(new CustomEvent('lotivio:menu', { detail: open }));
  };
  btn.addEventListener('click', () => set(menu.hidden));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
  document.addEventListener('click', (e) => { if (!menu.hidden && !(e.target as Element).closest('.pill-wrap')) set(false); });
  $$('[data-menu-link]', menu).forEach((a) => a.addEventListener('click', () => set(false)));
})();

/* ---------- Progression de lecture ---------- */
(() => {
  const pr = $('#prog'); if (!pr) return;
  let raf = 0;
  addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight); pr.textContent = Math.min(100, Math.round(p * 100)) + '%'; });
  }, { passive: true });
})();

/* ---------- S11 · le footer se révèle sous la page ---------- */
(() => {
  const f = $('#foot2'), p = $('#page'); if (!f || !p) return;
  const fit = () => { p.style.marginBottom = f.offsetHeight + 'px'; };
  fit(); new ResizeObserver(fit).observe(f);
  // Visible seulement à l'approche du bas de page (sinon masqué derrière la page).
  const demo = $('#demo') ?? p;
  new IntersectionObserver(([e]) => {
    f.classList.toggle('is-near', e.isIntersecting || e.boundingClientRect.top < 0);
  }, { rootMargin: '0px 0px 400px 0px' }).observe(demo);
})();

/* ---------- Animations en boucle suspendues hors écran (onde, chargement, porte-clés) ---------- */
(() => {
  const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-off', !e.isIntersecting)), { rootMargin: '200px 0px' });
  $$('#page > header, main > section, .flow4 > .pn').forEach((s) => io.observe(s));
})();
