// Lotivio — comportements fonctionnels (sans dépendance d'animation).
// Toutes les données affichées sont des données de démonstration.
import { asciiCanvas, monoReady } from './ascii';

const ORANGE = '#EB6E2C';
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
// Dessinées dans un canvas (src/scripts/ascii.ts) : une image au lieu de milliers de caractères.
function drawTexture(pre: HTMLElement) {
  const img = new Image();
  img.decoding = 'async';
  img.src = pre.dataset.src!;
  img.onload = async () => {
    await monoReady();
    const w = parseFloat(pre.dataset.w || '.6'), ratio = parseFloat(pre.dataset.r || '.42');
    const cols = Math.max(40, Math.round((Math.min(innerWidth, 1600) * w) / 6.1)), rows = Math.round(cols * ratio);
    const color = getComputedStyle(pre).color;
    pre.replaceChildren(asciiCanvas(img, { cols, rows, color, accent: ORANGE, accentRate: 0.004 }));
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

const belowFold = () => {

/* ---------- S03 · onde de la dictée ---------- */
(() => {
  const w = $('#wave3'); if (!w) return;
  for (let i = 0; i < 30; i++) { const b = el('i'); b.style.setProperty('--h', 6 + Math.abs(Math.sin(i * 1.3)) * 22 + 'px'); b.style.animationDelay = i * 0.05 + 's'; w.append(b); }
})();

/* ---------- S06.1 · sources : la sélection passe d'une source à l'autre ---------- */
(() => {
  const srcs = $('#srcs'); if (!srcs) return;
  // [nom, demandes, logo, logo haut ?, largeur, hauteur intrinsèques — proportions déclarées]
  const srcData: [string, number, string, boolean, number, number][] = [
    ['Homegate', 12, '/media/logos/homegate.svg', false, 737, 125], ['ImmoScout24', 6, '/media/logos/immoscout24.svg', true, 567, 341],
    ['immobilier.ch', 7, '/media/logos/immobilier-ch.svg', false, 433, 61], ['Properstar', 4, '/media/logos/properstar-logo-84.webp', false, 545, 84], ['Meta Ads', 18, '/media/logos/meta-64.webp', false, 318, 64],
  ];
  srcData.forEach((s, i) => {
    const c = el('div', 'sc' + (i === 3 ? ' on' : '')), ln = el('span', 'ln');
    [52, 38, 46].forEach((w) => { const b = el('i'); b.style.width = w + 'px'; ln.append(b); });
    const ct = el('span', 'ct', String(s[1])); ct.append(el('small', null, 'demandes'));
    const nm = el('img', 'lgo' + (s[3] ? ' tall' : '')); nm.src = s[2]; nm.alt = s[0]; nm.width = s[4]; nm.height = s[5]; nm.loading = 'lazy'; nm.decoding = 'async';
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
    b.dataset.label = x.toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long' });
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
  const when = () => `${picked(days)!.dataset.label} · ${picked(slotsBox)!.textContent}`;
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

};
// Tout ce bloc concerne des sections sous la ligne de flottaison : initialisé en temps libre,
// le premier écran devient interactif sans l’attendre.
idle(belowFold);

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
// + barre de navigation en verre dépoli dès qu'on quitte le haut de page.
(() => {
  const pr = $('#prog'), nav = $('.nav');
  let raf = 0, max = 1, lastP = -1, scrolled = false;
  // Hauteur de page mise en cache (relue seulement quand elle change), pas à chaque image.
  const measure = () => { max = Math.max(1, document.documentElement.scrollHeight - innerHeight); };
  measure(); new ResizeObserver(measure).observe(document.body); addEventListener('resize', measure);
  const update = () => {
    raf = 0;
    const p = Math.min(100, Math.round((scrollY / max) * 100));
    if (pr && p !== lastP) { lastP = p; pr.textContent = p + '%'; }
    const s = scrollY > 40;
    if (nav && s !== scrolled) { scrolled = s; nav.classList.toggle('is-scrolled', s); }
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  update();
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
