// S05B · « Essayez Lotivio » (V1, 12.11.2026). Simulation dans la page : rien n'est envoyé ni enregistré.
// Règles reprises de l'app (PROJECT.md, « Produit ») :
// - WhatsApp automatique seulement pour les leads Meta Ads ;
// - seuls les clics sur le lien de la brochure sont suivis ;
// - priorité des relances, « Chaud » et score de matching = règles. Pondération du score :
//   Budget 25, Zone 25, Type 15, Surface 15, Pièces 10, Chambres 5, Étage 5.
// Les saisies du visiteur (nom, localité) passent toujours par esc() avant d'entrer dans un gabarit.

type Lot = { id: string; p: number; m2: number; fl: string; price: number };
type SrcId = 'hg' | 'is' | 'im' | 'me' | 'si';

const root = document.querySelector<HTMLElement>('[data-ess]');
if (root) init(root);

// Remplace le contenu d'un nœud par un gabarit (données fixes + saisies échappées).
function put(el: Element, html: string) {
  el.replaceChildren(document.createRange().createContextualFragment(html));
}

function init(root: HTMLElement) {
  const main = root.querySelector<HTMLElement>('[data-ess-main]')!;
  const note = root.querySelector<HTMLElement>('[data-ess-note]')!;
  const steps = [...root.querySelectorAll<HTMLElement>('.es')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  // ---------- Données de démonstration ----------
  const SRC: Record<SrcId, { name: string; img: string; who: string; lot: number }> = {
    hg: { name: 'Homegate', img: 'l2', who: 'Laura Girardin', lot: 1 },
    is: { name: 'ImmoScout24', img: 'l4', who: 'Isabelle Monnier', lot: 4 },
    im: { name: 'immobilier.ch', img: 'l3', who: 'Pierre-Alain Droz', lot: 5 },
    me: { name: 'Meta Ads', img: 'l1', who: 'Thomas Rochat', lot: 2 },
    si: { name: 'Votre site', img: 'l5', who: 'Lucas Berset', lot: 3 },
  };
  const TYPES = [2.5, 3.5, 4.5, 3.5, 4.5, 5.5];
  const M2: Record<string, number> = { '2.5': 61, '3.5': 84, '4.5': 112, '5.5': 146 };
  const FLOORS = ['Rez', '1er', '1er', '2e', '2e', 'Attique'];
  const PPM2 = 8600;
  const others = [
    { id: 'c1', name: 'Céline Favre', sig: 'Brochure consultée 2×', w: 2.5 },
    { id: 'c3', name: 'Monique Matthey', sig: 'Match envoyé · 1re relance', w: 1.6 },
    { id: 'c2', name: 'Marc Vuilleumier', sig: 'Sans réponse · 4 j', w: 1.2 },
    { id: 'c6', name: 'Claude Jeanneret', sig: 'Match envoyé', w: 1 },
  ];

  // ---------- État ----------
  const S = {
    step: 0, max: 0, done: new Set<number>(),
    nom: 'Les Vergers', loc: 'Kerzers', lots: 6, published: false,
    src: 'hg' as SrcId, fc: 'auto', br: 'mail', rc: 'mail', rd: 3, clicks: 0,
    pc: 4.5, budget: 1_000_000, zn: 'loc',
  };

  const chf = (n: number) => 'CHF ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  const mio = (n: number) => (n / 1e6).toLocaleString('fr-CH', { maximumFractionDigits: 2 }) + ' mio';
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
  const nom = () => esc(S.nom.trim() || 'Votre promotion');
  const loc = () => esc(S.loc.trim() || 'Votre localité');
  const buyer = () => SRC[S.src];
  const first = () => buyer().who.split(' ')[0];
  const isMeta = () => S.src === 'me';
  const img = (k: string) => `/media/${k[0] === 'c' ? 'contacts' : 'leads'}/${k}.webp`;

  function lots(): Lot[] {
    return Array.from({ length: S.lots }, (_, i) => {
      const k = i % 6, p = TYPES[k], m2 = M2[String(p)] + ((i * 7) % 5);
      const price = Math.round((m2 * PPM2 * (1 + k * 0.025)) / 5000) * 5000;
      return { id: 'ABCD'[Math.floor(i / 6)] + (k + 1), p, m2, fl: FLOORS[k], price };
    });
  }
  const wanted = () => lots()[buyer().lot % S.lots];

  // ---------- Contrôles du rail ----------
  const segOf = (name: string) => root.querySelector<HTMLElement>(`.es-seg[data-name="${name}"]`)!;
  function setSeg(seg: HTMLElement, v: string) {
    seg.querySelectorAll<HTMLButtonElement>('button').forEach((x) => {
      const on = x.dataset.v === v;
      x.classList.toggle('is-on', on);
      x.setAttribute('aria-checked', String(on));
    });
  }
  root.querySelectorAll<HTMLElement>('.es-seg').forEach((seg) => {
    seg.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button');
      if (!b || b.disabled) return;
      const name = seg.dataset.name!, v = b.dataset.v!;
      setSeg(seg, v);
      if (name === 'lots') S.lots = +v;
      else if (name === 'rd') S.rd = +v;
      else if (name === 'pc') S.pc = +v;
      else (S as Record<string, unknown>)[name] = v;
      if (name === 'src') {
        S.br = isMeta() ? 'wa' : S.src === 'si' ? 'dl' : 'mail';
        S.rc = isMeta() ? 'wa' : 'mail';
        resetBuyer();
        // Une nouvelle source = une nouvelle demande à recevoir
        S.done.delete(1); hideNext(1); S.max = Math.min(S.max, 1);
        lockAfter(1);
      }
      if (name === 'lots') resetBuyer();
      sync();
      if (['lots', 'pc', 'zn', 'src', 'br', 'fc', 'rc', 'rd'].includes(name)) {
        if (['br', 'fc'].includes(name)) { S.done.delete(2); hideNext(2); }
        if (['rc', 'rd'].includes(name)) { S.done.delete(3); hideNext(3); }
        render();
      }
    });
  });

  root.querySelectorAll<HTMLInputElement>('input[type="text"]').forEach((inp) =>
    inp.addEventListener('input', () => {
      (S as Record<string, unknown>)[inp.name] = inp.value;
      sync();
      if (S.step === 0) render();
    }));
  const range = root.querySelector<HTMLInputElement>('input[name="budget"]')!;
  range.addEventListener('input', () => { S.budget = +range.value; sync(); render(); });

  function resetBuyer() {
    const l = wanted();
    S.pc = l.p;
    S.budget = Math.min(2_200_000, Math.ceil((l.price * 1.06) / 50000) * 50000);
    S.zn = 'loc';
    S.clicks = 0;
  }
  const hideNext = (i: number) => { const n = root.querySelector<HTMLElement>(`[data-next="${i}"]`); if (n) n.hidden = true; };
  function lockAfter(i: number) {
    steps.forEach((li, k) => {
      if (k > i) { S.done.delete(k); hideNext(k); }
      li.querySelector<HTMLButtonElement>('.es-h')!.disabled = k > S.max || k === S.step;
    });
  }

  // Disponibilités selon la source, résumés, libellés
  const BR: Record<string, string> = { wa: 'WhatsApp', mail: 'E-mail', dl: 'Déjà téléchargée', none: 'Ma liste' };
  function sync() {
    const br = segOf('br'), rc = segOf('rc');
    br.querySelector<HTMLButtonElement>('[data-v="wa"]')!.disabled = !isMeta();
    br.querySelector<HTMLButtonElement>('[data-v="dl"]')!.disabled = S.src !== 'si';
    rc.querySelector<HTMLButtonElement>('[data-v="wa"]')!.disabled = !isMeta();
    if ((S.br === 'wa' && !isMeta()) || (S.br === 'dl' && S.src !== 'si')) S.br = 'mail';
    if (S.rc === 'wa' && !isMeta()) S.rc = 'mail';
    setSeg(br, S.br); setSeg(rc, S.rc);
    setSeg(segOf('pc'), String(S.pc)); setSeg(segOf('zn'), S.zn);
    root.querySelector('[data-why-br]')!.textContent = isMeta()
      ? 'Lead Meta Ads : Max peut envoyer la brochure sur WhatsApp et demander les critères.'
      : S.src === 'si'
        ? 'L’acheteur a téléchargé la brochure sur votre site : le suivi commence déjà.'
        : 'WhatsApp automatique : réservé aux leads Meta Ads. Ici, la brochure part par e-mail.';
    root.querySelector('[data-why-rc]')!.textContent = isMeta() ? '' : 'Relance WhatsApp : leads Meta Ads uniquement.';
    root.querySelectorAll('[data-first]').forEach((n) => (n.textContent = first()));
    root.querySelector('[data-loc-label]')!.textContent = S.loc.trim() || 'Votre localité';
    range.value = String(S.budget);
    root.querySelector('[data-budget-out]')!.textContent = chf(S.budget);
    root.querySelector('[data-act="3"] .cbtn-t')!.textContent = `Avancer de ${S.rd} jours`;
    root.querySelector('[data-act="2"] .cbtn-t')!.textContent =
      S.br === 'dl' ? 'Voir l’activité' : S.fc === 'agent' ? 'Valider et envoyer' : 'Envoyer la brochure';
    root.querySelector('[data-clicks]')!.textContent = S.clicks + '×';

    const sums = [
      `${S.nom.trim() || '—'} · ${S.loc.trim() || '—'} · ${S.lots} lots`,
      `${buyer().who} · ${buyer().name}`,
      `${BR[S.br]} · ${S.fc === 'auto' ? 'automatique' : 'validé par l’agent'}`,
      S.rc === 'none' ? `Liste d’appels après ${S.rd} j` : `${BR[S.rc]} après ${S.rd} j`,
      `Brochure consultée ${S.clicks}×`,
      '',
    ];
    steps.forEach((li, i) => {
      li.querySelector('[data-sum]')!.textContent = S.done.has(i) && i !== S.step ? sums[i] : '';
      li.classList.toggle('is-ok', S.done.has(i) && i !== S.step);
    });
  }

  // ---------- Navigation entre étapes ----------
  function go(i: number, scroll = true) {
    S.step = i; S.max = Math.max(S.max, i);
    steps.forEach((li, k) => {
      li.classList.toggle('is-cur', k === i);
      const h = li.querySelector<HTMLButtonElement>('.es-h')!;
      h.disabled = k > S.max || k === i;
      h.setAttribute('aria-expanded', String(k === i));
    });
    root.querySelector('.ew-toast')?.classList.remove('is-on');
    root.querySelector('[data-ess-cur]')!.textContent = String(i + 1);
    root.querySelector<HTMLElement>('[data-ess-bar]')!.style.width = ((i + 1) / 6) * 100 + '%';
    sync(); render(true);
    if (scroll && matchMedia('(max-width: 1000px)').matches)
      root.querySelector('.ess-stage')!.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  steps.forEach((li, i) => li.querySelector('.es-h')!.addEventListener('click', () => go(i)));
  root.querySelectorAll<HTMLElement>('[data-next]').forEach((b) => b.addEventListener('click', () => go(+b.dataset.next! + 1)));
  root.querySelector('[data-restart]')!.addEventListener('click', () => {
    Object.assign(S, { step: 0, max: 0, published: false, src: 'hg', fc: 'auto', br: 'mail', rc: 'mail', rd: 3, clicks: 0 });
    S.done.clear();
    root.querySelectorAll<HTMLElement>('.es-next').forEach((b) => (b.hidden = true));
    setSeg(segOf('src'), 'hg'); setSeg(segOf('fc'), 'auto'); setSeg(segOf('rd'), '3');
    resetBuyer(); go(0, false);
    root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
  function finish(i: number) {
    S.done.add(i);
    const n = root.querySelector<HTMLElement>(`[data-next="${i}"]`);
    if (n) n.hidden = false;
    sync();
  }

  // ---------- Actions ----------
  let busy = false;
  root.querySelectorAll<HTMLButtonElement>('[data-act]').forEach((b) =>
    b.addEventListener('click', async () => {
      if (busy) return;
      busy = true; b.setAttribute('aria-busy', 'true');
      const i = +b.dataset.act!;
      // Sur mobile, la fenêtre est au-dessus des réglages : on la ramène à l'écran avant d'animer
      if (matchMedia('(max-width: 1000px)').matches) {
        root.querySelector('.ess-stage')!.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        await wait(450);
      }
      try { await ACT[i](); finish(i); } finally { busy = false; b.removeAttribute('aria-busy'); }
    }));

  const ACT: Record<number, () => Promise<void>> = {
    // 01 · publication : statut, puis canaux de diffusion un par un
    0: async () => {
      S.published = true; render();
      for (const c of main.querySelectorAll<HTMLElement>('.ep-dif span')) { await wait(260); c.classList.add('is-on'); }
      await wait(150); toast('Promotion publiée');
    },
    // 02 · la demande arrive en tête de liste
    1: async () => {
      resetBuyer(); sync(); render();
      await wait(60);
      main.querySelector('.ed-list')?.classList.add('is-arrive');
      await wait(900);
      main.querySelector('.ed-card')?.classList.add('is-in');
      await wait(300);
      toast(`Nouvelle demande · ${buyer().name}`);
    },
    // 03 · brouillon éventuel, puis envoi
    2: async () => {
      render();
      const box = main.querySelector<HTMLElement>('.eb')!;
      if (S.br === 'dl') { box.classList.add('is-sent'); await wait(500); return; }
      if (S.fc === 'agent') { box.classList.add('is-draft'); await wait(1200); box.classList.add('is-valid'); await wait(600); }
      box.classList.add('is-sent'); await wait(900);
      toast(S.br === 'wa' ? 'Brochure envoyée sur WhatsApp' : 'Brochure envoyée par e-mail');
    },
    // 04 · le temps passe, pas de réponse, la relance part
    3: async () => {
      render();
      const tl = main.querySelector<HTMLElement>('.er')!;
      const d = tl.querySelector<HTMLElement>('.er-day b')!;
      tl.classList.add('is-run');
      for (let k = 1; k <= S.rd; k++) { await wait(420); d.textContent = 'J+' + k; }
      tl.classList.add('is-silent'); await wait(650);
      tl.classList.add('is-fired'); await wait(500);
      toast(S.rc === 'none' ? 'Ajouté à vos relances à traiter' : 'Relance envoyée');
    },
  };

  // Clics sur la brochure : le contact remonte dans la liste
  root.querySelector('[data-click]')!.addEventListener('click', () => {
    S.clicks = Math.min(S.clicks + 1, 5);
    sync(); placeRows();
    finish(4);
    if (S.clicks === 3) toast(`${first()} passe en « Chaud »`);
  });

  // ---------- Rendu de la fenêtre ----------
  const NAV = ['pro', 'dem', 'dem', 'rel', 'rel', 'mat'];
  const NOTES = [
    'La diffusion sur les portails s’active organisation par organisation.',
    'Portails, Meta Ads, votre site : chaque demande arrive avec sa source.',
    'Premier contact, canal de la brochure et relance se règlent avec votre agence à la mise en place.',
    'Délai et canal de relance : réglés avec votre agence. WhatsApp seulement pour les leads Meta Ads.',
    'Le classement suit des règles (clics sur la brochure, demandes récentes, absence de réponse), pas l’IA.',
    'Le score est une règle : Budget 25, Zone 25, Type 15, Surface 15, Pièces 10, Chambres 5, Étage 5.',
  ];
  function render(fresh = false) {
    root.querySelectorAll<HTMLElement>('[data-nav]').forEach((n) => n.classList.toggle('is-on', n.dataset.nav === NAV[S.step]));
    put(main, [vPromo, vDemande, vBrochure, vRelance, vPriorite, vMatching][S.step]());
    if (fresh && !reduce) { main.classList.remove('is-fresh'); void main.offsetWidth; main.classList.add('is-fresh'); }
    note.textContent = NOTES[S.step];
    if (S.step === 4) placeRows(true);
  }

  function vPromo() {
    const L = lots();
    const ps = [...new Set(L.map((l) => l.p))].sort((a, b) => a - b);
    const prices = L.map((l) => l.price);
    const on = S.published && S.done.has(0) ? 'is-on' : '';
    return `
      <div class="ep">
        <div class="ep-h">
          <div><small class="ew-k">Promotions › ${S.published ? nom() : 'Nouvelle'}</small><h4>${nom()}</h4>
            <span class="ep-sub">${loc()} · ${L.length} lots · ${ps[0]} à ${ps[ps.length - 1]} pièces · ${chf(Math.min(...prices))} à ${chf(Math.max(...prices))}</span></div>
          <span class="ep-st ${S.published ? 'is-pub' : ''}">${S.published ? 'Publiée' : 'Brouillon'}</span>
        </div>
        <div class="ep-grid c${L.length}">
          ${L.map((l, i) => `<div class="ep-lot" style="--i:${i}"><b>${l.id}</b><span>${l.p} p. · ${l.m2} m² · ${l.fl}</span><em>${chf(l.price)}</em><i>Disponible</i></div>`).join('')}
        </div>
        <div class="ep-dif"><small class="ew-k">Diffusion</small>
          ${['Votre site', 'Homegate', 'immobilier.ch', 'Properstar'].map((c) => `<span class="${on}"><i></i>${c}</span>`).join('')}
        </div>
      </div>`;
  }

  function vDemande() {
    const b = buyer(), l = wanted(), arrived = S.done.has(1) ? 'is-arrive' : '';
    const old = [
      ['c3', 'Monique Matthey', 'Homegate', 'Il y a 2 h'],
      ['c2', 'Marc Vuilleumier', 'Votre site', 'Ce matin'],
      ['c6', 'Claude Jeanneret', 'Meta Ads', 'Hier'],
    ];
    return `
      <div class="ed">
        <div class="ed-fh"><small class="ew-k">Demandes reçues</small><span class="ed-live"><i></i>Aujourd’hui</span></div>
        <div class="ed-list ${arrived}">
          <div class="ed-row ed-new">
            <img src="${img(b.img)}" alt="" width="40" height="40" />
            <span class="ed-who"><b>${b.who}</b><small>${nom()} · Lot ${l.id}</small></span>
            <span class="ed-src">${b.name}</span><span class="ed-tm">À l’instant</span><span class="st n">Nouveau</span>
          </div>
          ${old.map(([k, n, s, t]) => `<div class="ed-row"><img src="${img(k)}" alt="" width="40" height="40" /><span class="ed-who"><b>${n}</b><small>${nom()}</small></span><span class="ed-src">${s}</span><span class="ed-tm">${t}</span><span class="st b">En suivi</span></div>`).join('')}
        </div>
        <div class="ed-card ${S.done.has(1) ? 'is-in' : ''}">
          <div><small class="ew-k">Source</small><b>${b.name}</b><span>Gardée jusqu’à la signature</span></div>
          <div><small class="ew-k">Lot demandé</small><b>Lot ${l.id} · ${l.p} pièces</b><span>${l.m2} m² · ${chf(l.price)}</span></div>
          <div><small class="ew-k">Agent</small><b>Sarah K.</b><span>Attribuée selon le projet</span></div>
        </div>
      </div>`;
  }

  function vBrochure() {
    const b = buyer(), l = wanted(), sent = S.done.has(2) ? 'is-draft is-valid is-sent' : '';
    const pdf = `<span class="eb-pdf"><i>PDF</i><span><b>${nom()} · Brochure</b><small>Lien suivi · chaque clic est compté</small></span></span>`;
    if (S.br === 'dl') {
      return `
        <div class="eb eb-dl ${sent}">
          <small class="ew-k">Fiche · ${b.who}</small>
          <ul class="eb-act">
            <li><i></i><span><b>Demande sur votre site</b><small>${nom()} · Lot ${l.id}</small></span><em>14:02</em></li>
            <li><i></i><span><b>Brochure téléchargée</b><small>Depuis la page de la promotion</small></span><em>14:02</em></li>
            <li class="eb-last"><i></i><span><b>${S.fc === 'auto' ? 'Premier contact envoyé · e-mail' : 'Premier contact à valider par l’agent'}</b><small>Le suivi des clics sur la brochure est actif</small></span><em>14:03</em></li>
          </ul>
        </div>`;
    }
    if (S.br === 'wa') {
      return `
        <div class="eb eb-wa ${sent}">
          <div class="eb-wa-h"><img src="${img(b.img)}" alt="" width="34" height="34" /><span><b>${b.who}</b><small>WhatsApp · numéro de l’agence</small></span></div>
          <div class="eb-chat">
            <div class="eb-draft">Brouillon prêt · à valider par l’agent</div>
            <div class="eb-msg">Bonjour ${first()}, merci pour votre intérêt pour ${nom()} à ${loc()}. Voici la brochure :${pdf}</div>
            <div class="eb-msg eb-2">Pour vous proposer les bons lots : combien de pièces et quel budget recherchez-vous ?</div>
            <div class="eb-tick">Envoyé par Max · assistant WhatsApp</div>
          </div>
        </div>`;
    }
    return `
      <div class="eb eb-mail ${sent}">
        <div class="eb-mh"><small class="ew-k">Nouveau message</small>
          <span><em>À</em>${b.who}</span><span><em>Objet</em>${nom()}, ${loc()} · votre brochure</span></div>
        <div class="eb-draft">Brouillon prêt · à valider par l’agent</div>
        <div class="eb-body">
          <p>Bonjour ${first()},</p>
          <p>Merci pour votre demande concernant le lot ${l.id} (${l.p} pièces, ${l.m2} m²). Vous trouverez ci-dessous la brochure de ${nom()}, avec les plans et les disponibilités.</p>
          ${pdf}
          <p>Sarah K.</p>
        </div>
        <div class="eb-tick">Envoyé · e-mail</div>
      </div>`;
  }

  function vRelance() {
    const lab: Record<string, string> = { wa: 'WhatsApp', mail: 'e-mail', dl: 'téléchargée sur le site' };
    const fired = S.rc === 'none'
      ? `<b>Ajouté à « Relances à traiter »</b><small>${first()} apparaît dans votre liste d’appels</small>`
      : `<b>Relance envoyée · ${lab[S.rc]}</b><small>« Bonjour ${first()}, avez-vous pu consulter la brochure ? »</small>`;
    const done = S.done.has(3);
    return `
      <div class="er ${done ? 'is-run is-silent is-fired' : ''}">
        <div class="er-day"><small class="ew-k">Depuis la brochure</small><b>${done ? 'J+' + S.rd : 'J+0'}</b><span class="er-clock"><i></i></span></div>
        <ol class="er-tl">
          <li class="er-0"><i></i><span><b>Brochure · ${lab[S.br]}</b><small>${buyer().who} · ${nom()}</small></span><em>J+0</em></li>
          <li class="er-1"><i></i><span><b>Pas de réponse</b><small>Aucun retour de ${first()} depuis ${S.rd} jours</small></span><em>J+${S.rd}</em></li>
          <li class="er-2"><i></i><span>${fired}</span><em>J+${S.rd}</em></li>
        </ol>
      </div>`;
  }

  function vPriorite() {
    const b = buyer();
    const rows = [
      ...others.map((o) => `<div class="eq-r" data-id="${o.id}"><img src="${img(o.id)}" alt="" width="36" height="36" /><span class="eq-who"><b>${o.name}</b><small>${o.sig}</small></span><span class="eq-a">Appeler</span></div>`),
      `<div class="eq-r is-me" data-id="me"><img src="${img(b.img)}" alt="" width="36" height="36" /><span class="eq-who"><b>${b.who}<span class="eq-hot">Chaud</span></b><small data-me-sig></small></span><span class="eq-a">Appeler</span></div>`,
    ];
    return `
      <div class="eq">
        <div class="eq-h"><small class="ew-k">Relance</small><span><b>5</b> relances à traiter</span></div>
        <div class="eq-list">${rows.join('')}</div>
      </div>`;
  }
  function placeRows(instant = false) {
    const list = main.querySelector<HTMLElement>('.eq-list');
    if (!list) return;
    const meW = S.clicks === 0 ? 0.8 : S.clicks * 1.1 + (S.clicks >= 3 ? 1 : 0);
    const order = [...others.map((o) => ({ id: o.id, w: o.w })), { id: 'me', w: meW }].sort((a, b) => b.w - a.w);
    const me = list.querySelector<HTMLElement>('[data-id="me"]')!;
    me.classList.toggle('is-hot', S.clicks >= 3);
    me.querySelector('[data-me-sig]')!.textContent =
      S.clicks === 0 ? (S.rc === 'none' ? `Sans réponse depuis ${S.rd} jours` : `Sans réponse · relance envoyée à J+${S.rd}`) : `Brochure consultée ${S.clicks}×`;
    if (instant) list.classList.add('no-t');
    order.forEach((o, i) => list.querySelector<HTMLElement>(`[data-id="${o.id}"]`)!.style.setProperty('--y', String(i)));
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => list.classList.remove('no-t')));
  }

  // Surface : proche de la surface visée (celle du lot demandé, ou la surface type des pièces choisies).
  // Étage : préférence pour l'étage du lot demandé ou plus haut.
  function score(l: Lot) {
    const w = wanted();
    const over = l.price / S.budget - 1;
    const target = S.pc === w.p ? w.m2 : M2[String(S.pc)];
    const dp = Math.abs(l.p - S.pc);
    const fl = (x: Lot) => FLOORS.indexOf(x.fl);
    const parts: [string, number, number][] = [
      ['Budget', over <= 0 ? 25 : over < 0.1 ? Math.round(25 * (1 - over / 0.1)) : 0, 25],
      ['Zone', S.zn === 'loc' ? 25 : S.zn === 'reg' ? 15 : 0, 25],
      ['Type', 15, 15],
      ['Surface', Math.max(0, Math.round(15 - Math.abs(l.m2 - target) * 1.5)), 15],
      ['Pièces', dp === 0 ? 10 : dp === 1 ? 5 : 0, 10],
      ['Chambres', dp === 0 ? 5 : dp === 1 ? 2 : 0, 5],
      ['Étage', fl(l) >= fl(w) ? 5 : 2, 5],
    ];
    return { total: parts.reduce((s, p) => s + p[1], 0), parts };
  }
  function vMatching() {
    const ranked = lots().map((l) => ({ l, s: score(l) })).sort((a, b) => b.s.total - a.s.total || a.l.price - b.l.price);
    const top = ranked.slice(0, 5), best = top[0];
    const zone = S.zn === 'loc' ? loc() : S.zn === 'reg' ? 'La région' : 'Ailleurs';
    return `
      <div class="em">
        <div class="em-l">
          <div class="em-h"><img src="${img(buyer().img)}" alt="" width="36" height="36" /><span><b>${buyer().who}</b><small>${S.pc} pièces · ≤ ${mio(S.budget)} · ${zone}</small></span></div>
          ${top.map(({ l, s }, i) => `
            <div class="em-r ${i === 0 ? 'is-best' : ''}" style="--i:${i}">
              <span class="em-id"><b>Lot ${l.id}</b><small>${l.p} p. · ${l.m2} m² · ${chf(l.price)}</small></span>
              <span class="em-g"><i style="--w:${s.total}%"></i></span><em>${s.total}</em>
            </div>`).join('')}
        </div>
        <div class="em-why">
          <small class="ew-k">Pourquoi ce score ? · Lot ${best.l.id}</small>
          <b class="em-big">${best.s.total}<span>/100</span></b>
          ${best.s.parts.map(([k, v, m]) => `<div class="em-p"><span>${k}</span><span class="em-pg"><i style="--w:${(v / m) * 100}%"></i></span><em>${v}/${m}</em></div>`).join('')}
        </div>
      </div>`;
  }

  // ---------- Notification ----------
  let tt = 0;
  function toast(t: string) {
    let el = root.querySelector<HTMLElement>('.ew-toast');
    if (!el) { el = document.createElement('div'); el.className = 'ew-toast'; el.setAttribute('role', 'status'); root.querySelector('.ew')!.appendChild(el); }
    put(el, `<i></i>${esc(t)}`);
    el.classList.remove('is-on'); void el.offsetWidth; el.classList.add('is-on');
    clearTimeout(tt); tt = window.setTimeout(() => el!.classList.remove('is-on'), 2400);
  }

  resetBuyer(); go(0, false);
}
