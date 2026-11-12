// S05B · « Lotivio, sur une vraie promotion » — V2 (12.11.2026).
// Réplique interactive de l'app (langage DESIGN.md de ava-crm), promotion fictive « Les Vergers » à Kerzers.
// Deux usages : visite guidée (7 chapitres, curseur animé) et exploration libre (un clic dans l'app met la visite en pause).
// Garde-fous (PROJECT.md « Produit ») :
// - Max (WhatsApp) ne traite que les leads Meta Ads ; il gère le STOP ;
// - seuls les clics sur le lien de brochure sont suivis ; « Chaud » et la priorité des relances = règles ;
// - score de matching = règle (Budget 25, Zone 25, Type 15, Surface 15, Pièces 10, Chambres 5, Étage 5) ;
// - Vue d'ensemble : provenance et conversion par source existent dans l'app (vue-ensemble/types.ts).
// Aucune saisie libre du visiteur : les gabarits ne contiennent que des données fixes.

type Stage = 'none' | 'lead' | 'qualifie' | 'reservation' | 'notaire' | 'vendu';
type LotSt = 'd' | 'r' | 'v';
type Lot = { id: string; p: number; m2: number; fl: string; k: number; price: number; st: LotSt; buyer?: string; src?: string };
type Crit = { p: number; b: number; min: number };
type Contact = {
  id: string; name: string; img: string; src: string; lot: string; stage: Stage; ago: string;
  email: string; tel: string; chips: string[]; crit?: Crit; clicks: number; sig: string; tl: [string, string, string][];
};

const root = document.querySelector<HTMLElement>('[data-lvs]');
if (root) init(root);

function put(el: Element, html: string) {
  el.replaceChildren(document.createRange().createContextualFragment(html));
}

function init(root: HTMLElement) {
  const W = 1280, H = 800;
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector<T>(s)!;
  const fit = $('[data-fit]'), canvas = $('[data-canvas]'), lv = $('[data-lv]'), main = $('[data-main]');
  const drawer = $('[data-drawer]'), toastEl = $('[data-toast]'), phone = $('[data-phone]'), cursor = $('[data-cursor]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scale = 1;
  // Déclarés tôt : render() les lit (légende en exploration libre)
  let cur = 0, playing = false, ready = false;

  // ---------- Mise à l'échelle : l'app est dessinée en 1280 × 800 puis réduite à la largeur disponible ----------
  const resize = () => {
    scale = Math.min(1, fit.clientWidth / W);
    canvas.style.transform = `scale(${scale})`;
    fit.style.height = H * scale + 'px';
  };
  new ResizeObserver(resize).observe(fit);
  resize();

  // ---------- Données de démonstration ----------
  const P = (k: string) => `/media/${k[0] === 'c' ? 'contacts' : 'leads'}/${k}.webp`;
  const TYPES = [2.5, 3.5, 4.5, 3.5, 4.5, 5.5];
  const M2 = [62, 86, 114, 88, 116, 148];
  const FL = ['Rez', '1er', '1er', '2e', '2e', 'Attique'];
  const FLV = [0, 2, 2, 4, 4, 5];
  const ST0: Record<string, [LotSt, string?, string?]> = {
    A1: ['v', 'Yann Renaud', 'Votre site'], A3: ['v', 'Acheteur', 'Meta Ads'], A6: ['v', 'Acheteur', 'Homegate'],
    B5: ['v', 'Acheteur', 'Meta Ads'], C6: ['v', 'Nadia Perret', 'Meta Ads'],
    A5: ['r', 'Pierre-Alain Droz', 'immobilier.ch'], C3: ['r', 'Claude Jeanneret', 'Meta Ads'],
  };
  const makeLots = (): Lot[] =>
    ['A', 'B', 'C'].flatMap((b) => TYPES.map((p, k) => {
      const id = b + (k + 1), s = ST0[id];
      const price = Math.round((M2[k] * 7600 * (1 + k * 0.02)) / 5000) * 5000;
      return { id, p, m2: M2[k] + (b === 'C' ? 2 : 0), fl: FL[k], k, price, st: s ? s[0] : 'd', buyer: s?.[1], src: s?.[2] };
    }));
  const C0 = (): Contact[] => [
    { id: 'l1', name: 'Thomas Rochat', img: 'l1', src: 'Meta Ads', lot: 'C5', stage: 'none', ago: 'il y a 1 min', email: 'thomas.rochat@example-demo.ch', tel: '+41 79 000 21 47', chips: [], clicks: 0, sig: 'Nouveau · Meta Ads',
      tl: [['21:47', 'Demande Meta Ads', 'Les Vergers · Lot C5']] },
    { id: 'l2', name: 'Laura Girardin', img: 'l2', src: 'Homegate', lot: 'A2', stage: 'lead', ago: 'il y a 3 h', email: 'laura.girardin@example-demo.ch', tel: '+41 79 000 76 94', chips: ['700K–800K CHF', 'Kerzers', 'Appartement', '3.5 pièces'], clicks: 0, sig: 'À engager',
      tl: [['18:20', 'Demande Homegate', 'Les Vergers · Lot A2'], ['18:21', 'Contact créé', 'Source gardée jusqu’à la signature']] },
    { id: 'l5', name: 'Lucas Berset', img: 'l5', src: 'Votre site', lot: 'B2', stage: 'lead', ago: 'il y a 10 h', email: 'lucas.berset@example-demo.ch', tel: '+41 79 000 48 89', chips: ['Kerzers', 'Appartement', '3.5 pièces'], clicks: 1, sig: 'Brochure téléchargée',
      tl: [['08:02', 'Demande sur votre site', 'Les Vergers · Lot B2'], ['08:02', 'Brochure téléchargée', 'Depuis la page de la promotion']] },
    { id: 'c1', name: 'Céline Favre', img: 'c1', src: 'Homegate', lot: 'B3', stage: 'qualifie', ago: 'il y a 6 j', email: 'celine.favre@example-demo.ch', tel: '+41 79 000 12 30', chips: ['≤ CHF 920’000', 'Kerzers', 'Appartement', '4.5 pièces'], crit: { p: 4.5, b: 920000, min: 110 }, clicks: 1, sig: 'Brochure consultée',
      tl: [['Il y a 6 j', 'Demande Homegate', 'Les Vergers · Lot B3'], ['Il y a 6 j', 'Brochure envoyée · e-mail', 'Lien suivi'], ['Lundi', 'Brochure consultée', '']] },
    { id: 'c3', name: 'Monique Matthey', img: 'c3', src: 'Homegate', lot: 'C2', stage: 'qualifie', ago: 'il y a 9 j', email: 'monique.matthey@example-demo.ch', tel: '+41 79 000 33 18', chips: ['≤ CHF 800’000', 'Seeland', '3.5 pièces'], crit: { p: 3.5, b: 800000, min: 80 }, clicks: 0, sig: 'Match envoyé · 1re relance',
      tl: [['Il y a 12 j', 'Demande Homegate', 'Les Vergers · Lot C2'], ['Il y a 9 j', 'Match envoyé', '3 lots']] },
    { id: 'c2', name: 'Marc Vuilleumier', img: 'c2', src: 'Votre site', lot: 'B6', stage: 'qualifie', ago: 'il y a 4 j', email: 'marc.vuilleumier@example-demo.ch', tel: '+41 79 000 55 02', chips: ['≤ CHF 1,3 mio', 'Kerzers', '5.5 pièces'], crit: { p: 5.5, b: 1300000, min: 140 }, clicks: 0, sig: 'Sans réponse · 4 j',
      tl: [['Il y a 8 j', 'Demande sur votre site', 'Les Vergers · Lot B6'], ['Il y a 4 j', 'Brochure envoyée · e-mail', 'Sans réponse depuis']] },
    { id: 'l4', name: 'Isabelle Monnier', img: 'l4', src: 'ImmoScout24', lot: 'C2', stage: 'qualifie', ago: 'il y a 6 j', email: 'isabelle.monnier@example-demo.ch', tel: '+41 79 000 64 11', chips: ['≤ CHF 820’000', 'Kerzers', '3.5 pièces'], crit: { p: 3.5, b: 820000, min: 80 }, clicks: 0, sig: 'Match envoyé',
      tl: [['Il y a 7 j', 'Demande ImmoScout24', 'Les Vergers · Lot C2'], ['Il y a 6 j', 'Match envoyé', '2 lots']] },
    { id: 'l3', name: 'Pierre-Alain Droz', img: 'l3', src: 'immobilier.ch', lot: 'A5', stage: 'reservation', ago: 'il y a 3 sem.', email: 'pa.droz@example-demo.ch', tel: '+41 79 000 90 75', chips: ['4.5 pièces'], clicks: 0, sig: 'Réservation',
      tl: [['Il y a 3 sem.', 'Demande immobilier.ch', 'Les Vergers · Lot A5'], ['Il y a 5 j', 'Réservation', 'Lot A5']] },
    { id: 'c6', name: 'Claude Jeanneret', img: 'c6', src: 'Meta Ads', lot: 'C3', stage: 'notaire', ago: 'il y a 2 mois', email: 'claude.jeanneret@example-demo.ch', tel: '+41 79 000 27 63', chips: ['4.5 pièces'], clicks: 0, sig: 'Notaire',
      tl: [['Il y a 2 mois', 'Demande Meta Ads', 'Les Vergers · Lot C3']] },
    { id: 'c4', name: 'Yann Renaud', img: 'c4', src: 'Votre site', lot: 'A1', stage: 'vendu', ago: 'il y a 3 mois', email: 'yann.renaud@example-demo.ch', tel: '+41 79 000 48 12', chips: ['2.5 pièces'], clicks: 0, sig: 'Vendu', tl: [] },
    { id: 'c5', name: 'Nadia Perret', img: 'c5', src: 'Meta Ads', lot: 'C6', stage: 'vendu', ago: 'il y a 2 mois', email: 'nadia.perret@example-demo.ch', tel: '+41 79 000 81 40', chips: ['5.5 pièces'], clicks: 0, sig: 'Vendu', tl: [] },
  ];
  const CANAUX: [string, number, number][] = [['Meta Ads', 16, 12], ['Homegate', 11, 7], ['Votre site', 7, 5], ['ImmoScout24', 5, 2], ['immobilier.ch', 3, 1]];

  let S = fresh();
  function fresh() {
    return { screen: 'today', lots: makeLots(), cs: C0(), relDone: new Map<string, string>(), why: '', mc: 'c1', sent: false, drawer: '' };
  }
  const C = (id: string) => S.cs.find((c) => c.id === id)!;
  const L = (id: string) => S.lots.find((l) => l.id === id)!;

  // ---------- Formats et pictos ----------
  const chf = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  const mio = (n: number) => (n / 1e6).toFixed(1) + 'M';
  const ST_LAB: Record<LotSt, string> = { d: 'Disponible', r: 'Réservé', v: 'Vendu' };
  const STAGE_LAB: Record<Stage, string> = { none: '', lead: 'À engager', qualifie: 'Qualifié', reservation: 'Réservation', notaire: 'Notaire', vendu: 'Vendu' };
  const ico = {
    send: '<svg viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    ok: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    loop: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.6 3.5 5.2"/></svg>',
    wallet: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3"/></svg>',
    bm: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    uplus: '<svg viewBox="0 0 24 24"><circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.8-3.5 3.4-5.5 6.5-5.5 1.5 0 2.9.5 4 1.3M19 14v6M16 17h6"/></svg>',
  };
  const ava = (c: Contact, s = 40) => `<img class="lv-ava" src="${P(c.img)}" alt="" width="${s}" height="${s}" style="width:${s}px;height:${s}px">`;
  const pill = (t: string) => `<span class="lv-pill">${t}</span>`;
  const chip = (t: string) => `<span class="lv-chip">${t}</span>`;
  const lotBadge = (s: LotSt) => `<span class="lv-lb lb-${s}">${ST_LAB[s]}</span>`;

  // ---------- Score de matching (règle) ----------
  function score(l: Lot, c: Crit) {
    const over = l.price / c.b - 1, dp = Math.abs(l.p - c.p);
    const parts: [string, number, number][] = [
      ['Budget', over <= 0 ? 25 : over < 0.1 ? Math.round(25 * (1 - over / 0.1)) : 0, 25],
      ['Zone', 25, 25],
      ['Type de bien', 15, 15],
      ['Surface', l.m2 >= c.min ? 15 : Math.max(0, Math.round(15 * (1 - ((c.min - l.m2) / c.min) * 3))), 15],
      ['Pièces', dp === 0 ? 10 : dp === 1 ? 5 : 0, 10],
      ['Chambres', dp === 0 ? 5 : dp === 1 ? 2 : 0, 5],
      ['Étage', FLV[l.k], 5],
    ];
    return { t: parts.reduce((s, p) => s + p[1], 0), parts };
  }
  const matchesFor = (c: Contact) =>
    S.lots.filter((l) => l.st === 'd').map((l) => ({ l, s: score(l, c.crit!) })).filter((x) => x.s.t >= 70).sort((a, b) => b.s.t - a.s.t);

  // ---------- Compteurs ----------
  const leadsToEngage = () => S.cs.filter((c) => c.stage === 'lead');
  const relRows = () => ['c1', 'c3', 'c2', 'l4'].map(C);
  const relOpen = () => relRows().filter((c) => !S.relDone.has(c.id)).length;
  function badges() {
    const n: Record<string, number> = { today: leadsToEngage().length + relOpen() + 3, leads: leadsToEngage().length, relance: relOpen() };
    root.querySelectorAll<HTMLElement>('[data-badge]').forEach((b) => {
      const v = n[b.dataset.badge!];
      if (b.textContent && b.textContent !== String(v)) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
      b.textContent = String(v);
    });
  }

  // ---------- Écrans ----------
  function stockBar() {
    const n = { v: 0, r: 0, d: 0 } as Record<LotSt, number>;
    S.lots.forEach((l) => n[l.st]++);
    return `<span class="lv-stock"><span class="sv" style="flex:${n.v}"></span><span class="sr" style="flex:${n.r}"></span><span class="sd" style="flex:${n.d}"></span></span>
      <span class="lv-leg"><span><i class="sv"></i>${n.v} vendus</span><span><i class="sr"></i>${n.r} réservés</span><span><i class="sd"></i>${n.d} disponibles</span></span>`;
  }
  function leadCard(c: Contact) {
    const l = L(c.lot);
    return `<button type="button" class="lv-card lv-lead" data-open="${c.id}" data-c="${c.id}">
      <span class="lv-lh">${ava(c)}<span class="lv-who"><b>${c.name}</b><small>${c.email} · ${c.tel}</small></span>${pill(c.src)}<span class="lv-ago">${c.ago}</span></span>
      <span class="lv-lbody"><span class="lv-lt">Les Vergers · Lot ${l.id}</span><span class="lv-chips">${c.chips.map(chip).join('')}</span>
      <span class="lv-eng st-${c.stage}">${STAGE_LAB[c.stage]}</span></span>
    </button>`;
  }

  const V: Record<string, () => string> = {
    today() {
      const leads = leadsToEngage();
      const tasks: [string, string, number, string][] = [
        ['Leads reçus — à engager', 'Nouvelles demandes en attente d’un premier contact', leads.length, 'leads'],
        ['Relances à faire', 'Envois restés sans réponse au-delà du délai', relOpen(), 'relance'],
        ['Qualifiés — matching à lancer', 'Critères connus, prêts pour une sélection de biens', 2, 'match'],
        ['Signaux', 'Consultations et réouvertures de brochures', C('c1').clicks >= 3 ? 2 : 1, 'relance'],
      ];
      return `<div class="lv-pg">
        <div class="lv-eyb">Votre journée</div>
        <div class="lv-h1row"><h1>Bonjour Sarah, voici vos priorités.</h1><span class="lv-date">Jeudi 12 novembre 2026</span></div>
        <p class="lv-sub">${tasks.reduce((s, t) => s + t[2], 0)} actions demandent votre attention. Le reste suit les réglages de votre agence.</p>
        <div class="lv-g2">
          <button type="button" class="lv-card lv-promo" data-go="promo">
            <span class="lv-pimg" style="background-image:url(/media/residence-800.webp)"><span class="lv-ptag">En commercialisation</span></span>
            <span class="lv-pbody"><span class="lv-eyb">Promotion</span><b class="lv-ptitle">Les Vergers</b>
              <span class="lv-ploc">${ico.pin}Kerzers · 18 appartements en PPE</span>${stockBar()}<span class="lv-open">Ouvrir la promotion ${ico.arrow}</span></span>
          </button>
          <div class="lv-card lv-tasks"><div class="lv-ch">Tâches à réaliser</div>
            ${tasks.map(([t, s, n, go], i) => `<button type="button" class="lv-task${i === 0 ? ' is-sel' : ''}" data-go="${go}"><span><b>${t}</b><small>${s}</small></span><em>${n}</em></button>`).join('')}
          </div>
        </div>
        <div class="lv-sec"><div><h2>Leads reçus — à engager</h2><p>Nouvelles demandes en attente d’un premier contact</p></div><button type="button" class="lv-link" data-go="leads">Ouvrir dans Leads ${ico.arrow}</button></div>
        <div class="lv-list" data-leadlist>${leads.map(leadCard).join('')}</div>
      </div>`;
    },
    leads() {
      const all = S.cs.filter((c) => c.stage === 'lead' || c.stage === 'qualifie');
      return `<div class="lv-pg">
        <div class="lv-eyb">Gestion des demandes</div><h1>Leads</h1>
        <p class="lv-sub">Toutes les demandes reçues depuis le site, les campagnes et les portails.</p>
        <div class="lv-tabs"><span>Tous <i>42</i></span><span class="is-on">À engager <i>${leadsToEngage().length}</i></span><span>Qualifiés <i>27</i></span><span>Sans réponse <i>2</i></span><span>Erreurs <i>0</i></span></div>
        <div class="lv-list">${all.map(leadCard).join('')}</div>
      </div>`;
    },
    relance() {
      const rows = relRows();
      return `<div class="lv-pg">
        <div class="lv-eyb">Relance</div><h1><span data-reln>${relOpen()}</span> relances à traiter</h1>
        <p class="lv-sub">Envois restés sans réponse au-delà du délai, et signaux d’intérêt.</p>
        <div class="lv-card lv-rel" data-rel-list style="height:${rows.length * 74 + 14}px">
          ${rows.map((c) => `<div class="lv-rr" data-r="${c.id}">
            <span class="lv-ric">${ico.loop}</span>${ava(c, 34)}
            <span class="lv-who"><b>${c.name}<span class="lv-hot">Chaud</span></b><small>Les Vergers — Lot ${c.lot}</small></span>
            <span class="lv-tag" data-sig>${ico.eye}<span></span></span>
            <span class="lv-age">${c.ago}</span>
            <span class="lv-acts"><button type="button" class="lv-btn" data-rel="${c.id}">${ico.send}Relancer</button><button type="button" class="lv-btn" data-retour="${c.id}">${ico.mail}Retour reçu</button><button type="button" class="lv-btn" data-traite="${c.id}">${ico.ok}Traité</button></span>
            <span class="lv-done">${ico.ok}<span data-done></span></span>
          </div>`).join('')}
        </div>
        <p class="lv-note">Priorité et « Chaud » suivent des règles : clics sur le lien de la brochure, ancienneté, absence de réponse.</p>
      </div>`;
    },
    match() {
      const c = C(S.mc), ms = matchesFor(c);
      const hot = C('c1');
      const best = hot.stage === 'qualifie' ? matchesFor(hot)[0] : undefined;
      const tabs = ['c1', 'l1', 'l4'].filter((id) => C(id).crit && C(id).stage === 'qualifie');
      return `<div class="lv-pg">
        <h1>Matching</h1><p class="lv-sub lv-sub0"><b>64</b> correspondances contacts ↔ biens · Les Vergers</p>
        ${hot.clicks >= 3 && best ? `<div class="lv-banner"><span class="lv-bi">${ico.spark}</span><span><b>Céline Favre est chaude</b><small>Brochure consultée ${hot.clicks}× · meilleur lot : ${best.l.id} à ${best.s.t} %</small></span>
          <button type="button" class="lv-bb" data-mc="c1">Voir son profil</button><button type="button" class="lv-bb lv-bw" data-send3>Envoyer les 3 meilleurs</button></div>` : ''}
        <div class="lv-mtabs"><span>Par contact</span>${tabs.map((id) => `<button type="button" class="${id === S.mc ? 'is-on' : ''}" data-mc="${id}">${ava(C(id), 22)}${C(id).name}</button>`).join('')}</div>
        <div class="lv-card lv-mc">
          <div class="lv-mch">${ava(c, 44)}<span class="lv-who"><b>${c.name} <span class="lv-pill lv-pill-s">${ms.length} lots</span></b><small>${c.chips.join(' · ')}</small></span>
            <span class="lv-pct">${ms[0] ? ms[0].s.t : '—'}%</span></div>
          ${ms.slice(0, 4).map(({ l, s }, i) => `<div class="lv-mr${S.why === l.id ? ' is-why' : ''}" style="--i:${i}">
            <span class="lv-thumb" style="background-image:url(/media/${i % 2 ? 'lac' : 'residence'}-480.webp)"></span>
            <span class="lv-mi"><span class="lv-mt"><b>Lot ${l.id}</b>${lotBadge(l.st)}</span><small><b>CHF ${chf(l.price)}</b> · ${l.m2} m² · ${l.p} pcs · ${l.fl} · Les Vergers, Kerzers</small></span>
            <button type="button" class="lv-why" data-why="${l.id}">Pourquoi ce score ?</button><span class="lv-pct">${s.t}%</span>
            <span class="lv-wbox">${s.parts.map(([k, v, m]) => `<span class="lv-wp"><span>${k}</span><span class="lv-wg"><i style="width:${(v / m) * 100}%"></i></span><b>${v}/${m}</b></span>`).join('')}</span>
          </div>`).join('') || '<p class="lv-note">Aucun lot disponible au-dessus de 70 %.</p>'}
        </div>
        <p class="lv-note">Le score est une règle, réglée avec votre agence : Budget 25, Zone 25, Type 15, Surface 15, Pièces 10, Chambres 5, Étage 5.</p>
      </div>`;
    },
    pipe() {
      const cols: [Stage, string, string][] = [['qualifie', 'Qualifié', '#4F46E5'], ['reservation', 'Réservation', '#E8762D'], ['notaire', 'Notaire', '#9A4A1C'], ['vendu', 'Vendu', '#0E8345']];
      const by = (st: Stage) => S.cs.filter((c) => c.stage === st);
      const sold = S.lots.filter((l) => l.st === 'v');
      const tot = (st: Stage) => st === 'vendu' ? sold.reduce((s, l) => s + l.price, 0) : by(st).reduce((s, c) => s + L(c.lot).price, 0);
      const val = S.lots.filter((l) => l.st !== 'd').reduce((s, l) => s + l.price, 0);
      const actifs = S.cs.filter((c) => c.stage !== 'none' && c.stage !== 'lead').length + 31;
      const extraSold = sold.length - by('vendu').length;
      return `<div class="lv-pg">
        <h1>Pipeline</h1><p class="lv-sub lv-sub0">Consultez l’avancement des contacts dans le pipeline · Les Vergers.</p>
        <div class="lv-kpis3">
          <div class="lv-k3 k-b"><span>Contacts actifs${ico.users}</span><b>${actifs}</b><small>Les Vergers</small></div>
          <div class="lv-k3 k-g"><span>Valeur pipeline${ico.wallet}</span><b>CHF ${mio(val)}</b><small>réservé + notaire + vendu</small></div>
          <div class="lv-k3 k-y"><span>Délai moyen${ico.clock}</span><b>64j</b><small>lead → signature</small></div>
        </div>
        <div class="lv-kan">${cols.map(([st, lab, col]) => `<div class="lv-col" data-col="${st}" style="--c:${col}">
          <div class="lv-colh"><span><i></i>${lab}</span><em>${st === 'vendu' ? sold.length : st === 'qualifie' ? by(st).length + 23 : by(st).length}</em></div>
          ${st !== 'qualifie' ? `<div class="lv-tot"><span>Total</span><b>${chf(tot(st))} CHF</b></div>` : ''}
          ${by(st).map((c) => `<button type="button" class="lv-pc" data-pc="${c.id}" data-adv="${c.id}">
            <span class="lv-pch">${ava(c, 30)}<span class="lv-who"><b>${c.name}</b><small>${c.src}</small></span></span>
            <span class="lv-pcl">${ico.bm}${chf(L(c.lot).price)} CHF</span>
            <span class="lv-pct2"><i></i>Les Vergers · ${c.lot}</span>
            ${st !== 'vendu' ? `<span class="lv-adv">Avancer →</span>` : ''}
          </button>`).join('')}
          ${st === 'vendu' && extraSold > 0 ? `<div class="lv-more">+ ${extraSold} ventes</div>` : ''}
          ${st === 'qualifie' ? `<div class="lv-more">+ 23 contacts</div>` : ''}
        </div>`).join('')}</div>
      </div>`;
    },
    promo() {
      const n = { v: 0, r: 0, d: 0 } as Record<LotSt, number>;
      S.lots.forEach((l) => n[l.st]++);
      const prices = S.lots.map((l) => l.price);
      return `<div class="lv-pg lv-pg-promo">
        <span class="lv-back">‹ Retour au catalogue</span>
        <div class="lv-card lv-hero">
          <span class="lv-himg" style="background-image:url(/media/residence-1600.webp)"><span class="lv-hc">1 / 6</span></span>
          <div class="lv-hinfo">
            <span class="lv-thumbs"><i style="background-image:url(/media/residence-480.webp)"></i><i style="background-image:url(/media/lac-480.webp)"></i><i style="background-image:url(/media/residence-portrait-480.webp)"></i></span>
            <span class="lv-ht"><b>Les Vergers</b><small>${ico.pin}Kerzers · Seeland</small></span>
            <span class="lv-hp">${pill('Appartement')}<span class="lv-pill lv-pub"><i></i>Publié</span></span>
          </div>
          <div class="lv-stats"><span><small>Prix</small><b>CHF ${chf(Math.min(...prices))} – ${chf(Math.max(...prices))}</b></span><span><small>Livraison</small><b>Été 2028</b></span><span><small>Total lots</small><b>18</b></span><span><small>Disponibles</small><b class="g">${n.d}</b></span></div>
          <div class="lv-dif"><small>Diffusion</small>${['Site internet', 'Homegate', 'immobilier.ch', 'Properstar'].map((x) => `<span class="lv-chip is-on"><i></i>${x}</span>`).join('')}<span class="lv-gerer">Gérer ›</span></div>
        </div>
        <div class="lv-sec lv-sec-s"><div><h2>Lots</h2><p>${n.v} vendus · ${n.r} réservés · ${n.d} disponibles</p></div><span class="lv-docs">PDF de vente · Brochure · Disponibilités · Fiches lots</span></div>
        <div class="lv-lots">${S.lots.map((l) => `<div class="lv-lot lt-${l.st}" data-lot="${l.id}"><b>${l.id}</b><small>${l.p} p. · ${l.m2} m² · ${l.fl}</small><em>CHF ${chf(l.price)}</em>${lotBadge(l.st)}</div>`).join('')}</div>
      </div>`;
    },
    vue() {
      const n = { v: 0, r: 0, d: 0 } as Record<LotSt, number>;
      S.lots.forEach((l) => n[l.st]++);
      const buyers: Record<string, number> = {};
      S.lots.filter((l) => l.st !== 'd').forEach((l) => (buyers[l.src!] = (buyers[l.src!] || 0) + 1));
      const kpis: [string, string, number, string][] = [
        ['Nouveaux leads', ico.uplus, 42, '+18 % vs période précédente'], ['Qualifiés', ico.check, 27, '64 % des nouveaux leads'],
        ['Visites', ico.pin, 12, '44 % des qualifiés'], ['Réservations', ico.bm, n.r + n.v, 'réservés, notaire ou vendus'], ['Vendus', ico.key, n.v, `${Math.round((n.v / 18) * 100)} % du stock`],
      ];
      const funnel: [string, number][] = [['Prospects', 42], ['Qualifiés', 27], ['Visites', 12], ['Réservations', n.r + n.v], ['Vendus', n.v]];
      const maxD = Math.max(...CANAUX.map((c) => c[1]));
      const recent = S.lots.filter((l) => l.st !== 'd' && l.buyer && l.buyer !== 'Acheteur');
      return `<div class="lv-pg">
        <div class="lv-vh"><div><div class="lv-eyb">Pilotage de l’agence</div><h1>Vue d’ensemble</h1></div>
          <div class="lv-filt"><span class="lv-sel">Les Vergers · Kerzers</span><span class="lv-sel">Tous les agents</span><span class="lv-seg"><i>30 j</i><i class="is-on">90 j</i><i>1 an</i></span></div></div>
        <div class="lv-kpis">${kpis.map(([k, ic, v, s]) => `<div class="lv-card lv-kpi"><span class="lv-ki">${ic}</span><small>${k}</small><b data-n="${v}">${v}</b><em>${s}</em></div>`).join('')}</div>
        <div class="lv-g2 lv-g2v">
          <div class="lv-card lv-pad"><div class="lv-ct"><b>Provenance et conversion</b><span>90 jours</span></div>
            <div class="lv-conv"><span class="lv-cvh"><span>Canal</span><span>Demandes</span><span>Qualifiés</span><span>Acheteurs</span></span>
            ${CANAUX.map(([c, d, q]) => `<span class="lv-cvr"><b>${c}</b><span class="lv-cvb"><i style="width:${(d / maxD) * 100}%"></i><em data-n="${d}">${d}</em></span><span class="lv-cvq" data-n="${q}">${q}</span><span class="lv-cva${buyers[c] ? '' : ' z'}"><b data-n="${buyers[c] || 0}">${buyers[c] || 0}</b></span></span>`).join('')}</div>
            <p class="lv-foot">Acheteurs : contacts réservés, chez le notaire ou vendus, selon leur source d’origine.</p>
          </div>
          <div class="lv-card lv-pad"><div class="lv-ct"><b>Ce qui se vend · Les Vergers</b><span class="lv-big"><b data-n="${Math.round((n.v / 18) * 100)}">${Math.round((n.v / 18) * 100)}</b> % vendu</span></div>
            ${stockBar()}
            <div class="lv-rec">${recent.map((l) => `<span class="lv-rc"><b>Lot ${l.id}</b><span>${l.p} p. · ${l.fl}</span><span class="lv-rcn">${l.buyer}</span>${pill(l.src!)}${lotBadge(l.st)}</span>`).join('')}</div>
          </div>
        </div>
        <div class="lv-card lv-pad lv-fun"><div class="lv-ct"><b>Funnel commercial</b><span>90 jours · Les Vergers</span></div>
          <div class="lv-fr">${funnel.map(([k, v], i) => `<span class="lv-fs" style="--i:${i}"><small>${k}</small><b data-n="${v}">${v}</b><span class="lv-fb"><i style="width:${(v / 42) * 100}%"></i></span>${i ? `<em>${Math.round((v / funnel[i - 1][1]) * 100)} %</em>` : '<em>—</em>'}</span>`).join('')}</div>
        </div>
      </div>`;
    },
  };

  function render(screen = S.screen, anim = true) {
    S.screen = screen;
    root.querySelectorAll<HTMLElement>('.lv-nav [data-go]').forEach((b) => b.classList.toggle('is-on', b.dataset.go === screen));
    put(main, V[screen]());
    main.scrollTop = 0;
    if (anim && !reduce) { main.classList.remove('is-fresh'); void main.offsetWidth; main.classList.add('is-fresh'); }
    if (screen === 'relance') placeRel(true);
    if (screen === 'vue' && anim) countUp();
    badges();
    // En exploration libre, la légende suit l'écran ouvert
    const idx = ['today', 'leads', 'relance', 'match', 'pipe', 'promo', 'vue'].indexOf(screen);
    if (!playing && ready && idx >= 0 && idx !== cur) { cur = idx; caption(idx); }
  }

  // Relance : lignes positionnées par priorité (règle)
  function placeRel(instant = false) {
    const list = main.querySelector<HTMLElement>('[data-rel-list]');
    if (!list) return;
    const w = (c: Contact) => S.relDone.has(c.id) ? -1 : c.id === 'c1' ? c.clicks * 1.1 + (c.clicks >= 3 ? 1 : 0) : ({ c3: 1.6, c2: 1.2, l4: 1 } as Record<string, number>)[c.id];
    const rows = relRows().sort((a, b) => w(b) - w(a));
    if (instant) list.classList.add('no-t');
    rows.forEach((c, i) => {
      const r = list.querySelector<HTMLElement>(`[data-r="${c.id}"]`)!;
      r.style.setProperty('--y', String(i));
      r.classList.toggle('is-hot', c.id === 'c1' && c.clicks >= 3);
      r.classList.toggle('is-done', S.relDone.has(c.id));
      r.querySelector('[data-sig] span')!.textContent = c.id === 'c1' ? `Brochure consultée ${c.clicks}×` : c.sig;
      r.querySelector('[data-done]')!.textContent = S.relDone.get(c.id) || '';
    });
    const n = main.querySelector('[data-reln]');
    if (n) n.textContent = String(relOpen());
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => list.classList.remove('no-t')));
    badges();
  }

  // ---------- Fiche contact (tiroir) ----------
  const tlItem = ([t, a, b]: [string, string, string], cls = '') => `<li class="${cls}"><i></i><span><b>${a}</b>${b ? `<small>${b}</small>` : ''}</span><em>${t}</em></li>`;
  const dmLine = (c: Contact) => {
    const m = matchesFor(c);
    return m[0] ? `<span class="lv-bi">${ico.spark}</span><span><b>${m.length} lots au-dessus de 70 %</b><small>Meilleur : Lot ${m[0].l.id} · ${m[0].s.t} %</small></span><button type="button" class="lv-bb lv-bw" data-go="match">Voir</button>` : '';
  };
  function openDrawer(id: string, steps?: number) {
    const c = C(id), l = L(c.lot);
    S.drawer = id;
    if (c.crit) S.mc = id;
    const tl = steps === undefined ? c.tl : c.tl.slice(0, steps);
    put(drawer, `<div class="lv-dh">${ava(c, 48)}<span class="lv-who"><b>${c.name}</b><small>${c.email}</small></span>
        <span class="lv-st st-${c.stage}" data-dst>${STAGE_LAB[c.stage] || 'Nouveau'}</span><button type="button" class="lv-x" data-close aria-label="Fermer">${ico.x}</button></div>
      <div class="lv-db">
        <div class="lv-kv"><span><small>Source</small>${pill(c.src)}<em>Gardée jusqu’à la signature</em></span><span><small>Lot demandé</small><b>Les Vergers · ${l.id}</b><em>${l.p} pièces · ${l.m2} m² · CHF ${chf(l.price)}</em></span><span><small>Agent</small><b>Sarah Keller</b><em>Attribuée selon le projet</em></span></div>
        <div class="lv-blk"><h4>Critères de recherche</h4><div class="lv-chips" data-dcrit>${c.chips.length ? c.chips.map(chip).join('') : '<span class="lv-wait">En attente des réponses</span>'}</div></div>
        <div class="lv-blk"><h4>Activité</h4><ol class="lv-tl" data-dtl>${tl.map((x) => tlItem(x)).join('')}</ol></div>
        <div class="lv-dm${c.crit ? '' : ' is-off'}" data-dm>${c.crit ? dmLine(c) : ''}</div>
      </div>`);
    drawer.classList.add('is-on');
    drawer.setAttribute('aria-hidden', 'false');
    lv.classList.add('is-dr');
  }
  function closeDrawer() {
    S.drawer = '';
    drawer.classList.remove('is-on');
    drawer.setAttribute('aria-hidden', 'true');
    lv.classList.remove('is-dr');
    phone.classList.remove('is-on');
  }

  // ---------- Téléphone de l'acheteur (WhatsApp, lead Meta Ads) ----------
  const WA: [0 | 1, string][] = [
    [0, 'Bonjour Thomas, merci pour votre intérêt pour Les Vergers à Kerzers. Voici la brochure.'],
    [0, '<span class="wa-pdf"><i>PDF</i><span>Les Vergers · Brochure<small>12 pages · plans et prix</small></span></span>'],
    [0, 'Pour vous proposer les bons lots : combien de pièces recherchez-vous ?'],
    [1, 'Un 4.5 pièces, si possible avec terrasse.'],
    [0, 'Merci. Et quel budget maximum ?'],
    [1, 'Environ 1 million.'],
    [0, 'Parfait, Sarah Keller vous recontacte. Répondez STOP à tout moment pour ne plus recevoir de messages.'],
  ];
  function showPhone(n: number) {
    put(phone, `<div class="ph-top"><span>21:52</span><span class="ph-isl"></span><span class="ph-bat"></span></div>
      <div class="ph-h"><span class="ph-back">‹</span><span class="ph-av"><img src="/brand/lotivio-mark.svg" alt="" width="16" height="16"></span><span><b>Les Vergers · Kerzers</b><small>Max · assistant de l’agence</small></span></div>
      <div class="ph-chat">${WA.slice(0, n).map(([me, t], i) => `<span class="ph-m${me ? ' me' : ''}${i === n - 1 ? ' is-new' : ''}">${t}</span>`).join('')}</div>
      <div class="ph-in"><span>Message</span></div>`);
    phone.classList.add('is-on');
    const chat = phone.querySelector('.ph-chat');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }

  // ---------- Notification ----------
  let tt = 0;
  function toast(t: string) {
    put(toastEl, `<i>${ico.ok}</i>${t}`);
    toastEl.classList.remove('is-on'); void toastEl.offsetWidth; toastEl.classList.add('is-on');
    clearTimeout(tt); tt = window.setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  // ---------- Chiffres qui défilent ----------
  function countUp() {
    if (reduce) return;
    main.querySelectorAll<HTMLElement>('[data-n]').forEach((el) => {
      const to = +el.dataset.n!, t0 = performance.now(), d = 1000;
      const step = (t: number) => { const k = Math.min(1, (t - t0) / d); el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  // ---------- Actions (clic du visiteur ou du curseur de la visite) ----------
  lv.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    // Clic sur le voile derrière la fiche : on la ferme
    if (S.drawer && !t.closest('.lv-drawer')) { closeDrawer(); if (!t.closest('.lv-side')) return; }
    const go = t.closest<HTMLElement>('[data-go]');
    if (go) { closeDrawer(); render(go.dataset.go!); return; }
    const open = t.closest<HTMLElement>('[data-open]');
    if (open) { openDrawer(open.dataset.open!); return; }
    if (t.closest('[data-close]')) { closeDrawer(); return; }
    const rel = t.closest<HTMLElement>('[data-rel],[data-traite],[data-retour]');
    if (rel) {
      const id = rel.dataset.rel || rel.dataset.traite || rel.dataset.retour!;
      S.relDone.set(id, rel.dataset.rel ? 'Relancé · e-mail' : rel.dataset.traite ? 'Traité' : 'Retour reçu'); placeRel();
      toast(rel.dataset.rel ? `Relance envoyée · ${C(id).name} · e-mail` : rel.dataset.traite ? `${C(id).name} · marqué comme traité` : `${C(id).name} · retour reçu`);
      return;
    }
    const why = t.closest<HTMLElement>('[data-why]');
    if (why) { S.why = S.why === why.dataset.why ? '' : why.dataset.why!; render('match', false); return; }
    const mc = t.closest<HTMLElement>('[data-mc]');
    if (mc) { S.mc = mc.dataset.mc!; S.why = ''; render('match', false); return; }
    if (t.closest('[data-send3]')) { S.sent = true; toast('3 lots envoyés à Céline Favre · e-mail'); return; }
    const adv = t.closest<HTMLElement>('[data-adv]');
    if (adv) advance(adv.dataset.adv!);
  });
  const NEXT: Partial<Record<Stage, Stage>> = { qualifie: 'reservation', reservation: 'notaire', notaire: 'vendu' };
  function advance(id: string) {
    const c = C(id), to = NEXT[c.stage];
    if (!to) return;
    c.stage = to;
    const l = L(c.lot);
    if (to === 'reservation') { l.st = 'r'; l.buyer = c.name; l.src = c.src; }
    if (to === 'vendu') l.st = 'v';
    render('pipe', false);
    main.querySelector<HTMLElement>(`[data-pc="${id}"]`)?.classList.add('is-moved');
    toast(to === 'reservation' ? `Lot ${l.id} réservé · ${c.name}` : to === 'notaire' ? `${c.name} · chez le notaire` : `Lot ${l.id} vendu · ${c.name}`);
  }

  // ---------- Curseur de la visite ----------
  function cursorTo(el: Element | null) {
    if (!el) return;
    const r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    const x = (r.left - c.left + Math.min(r.width * 0.5, 70)) / scale, y = (r.top - c.top + Math.min(r.height * 0.55, 40)) / scale;
    cursor.style.transform = `translate(${x}px,${y}px)`;
    cursor.classList.add('is-on');
  }
  const clickFx = () => { cursor.classList.remove('is-click'); void cursor.offsetWidth; cursor.classList.add('is-click'); };

  // ---------- Visite guidée ----------
  let run = 0;
  const sleep = (ms: number, id = run) => new Promise<void>((res, rej) => setTimeout(() => (id === run ? res() : rej(new Error('stop'))), reduce ? Math.min(ms, 60) : ms));
  async function press(sel: string, wait = 750) {
    const el = root.querySelector<HTMLElement>(sel);
    cursorTo(el); await sleep(wait); clickFx(); await sleep(160);
    el?.click();
  }
  function qualifyThomas() {
    const c = C('l1');
    c.stage = 'qualifie'; c.crit = { p: 4.5, b: 1000000, min: 110 };
    c.chips = ['≤ CHF 1’000’000', 'Kerzers', 'Appartement', '4.5 pièces'];
    c.tl = [['21:47', 'Demande Meta Ads', 'Les Vergers · Lot C5'], ['21:47', 'Max · premier message WhatsApp', 'Lead Meta Ads, consentement donné'], ['21:48', 'Brochure envoyée · WhatsApp', 'Lien suivi'], ['21:52', 'Critères reçus', '4.5 pièces · ≤ CHF 1’000’000 · Kerzers'], ['21:52', 'Statut : Qualifié', 'Matching lancé']];
  }
  function reserveCeline() {
    const c = C('c1'), l = L('B3');
    c.stage = 'reservation'; l.st = 'r'; l.buyer = c.name; l.src = c.src;
  }
  async function fly(card: HTMLElement, col: HTMLElement) {
    const cr = canvas.getBoundingClientRect(), a = card.getBoundingClientRect(), b = col.getBoundingClientRect();
    const ghost = card.cloneNode(true) as HTMLElement;
    ghost.classList.add('lv-ghost');
    const x0 = (a.left - cr.left) / scale, y0 = (a.top - cr.top) / scale;
    Object.assign(ghost.style, { left: x0 + 'px', top: y0 + 'px', width: a.width / scale + 'px' });
    canvas.appendChild(ghost); card.style.opacity = '.2';
    const dx = (b.left - a.left) / scale, dy = (b.top - a.top) / scale + 92;
    await sleep(40);
    ghost.style.transform = `translate(${dx}px,${dy}px) rotate(-2deg) scale(1.03)`;
    cursor.style.transform = `translate(${x0 + dx + 70}px,${y0 + dy + 34}px)`;
    try { await sleep(950); } finally { ghost.remove(); }
  }

  const CH: { k: string; t: string; s: string; d: number; apply: () => void; run: () => Promise<void> }[] = [
    { k: 'Aujourd’hui', t: 'Votre journée, déjà triée.', s: 'Les demandes, relances et signaux du jour, avec l’état de la promotion de Kerzers.', d: 7000,
      apply: () => { C('l1').stage = 'lead'; },
      run: async () => {
        render('today'); await sleep(900); cursorTo(main.querySelector('.lv-promo')); await sleep(1500);
        C('l1').stage = 'lead'; render('today', false);
        main.querySelector('[data-c="l1"]')?.classList.add('is-new');
        toast('Nouvelle demande · Meta Ads · Les Vergers, lot C5');
        cursorTo(main.querySelector('[data-c="l1"]')); await sleep(2600);
      } },
    { k: 'La demande', t: 'Une demande Meta Ads arrive à 21:47.', s: 'Max répond sur WhatsApp, envoie la brochure et demande les critères. Il ne traite que les leads Meta Ads ; pour les autres canaux, le premier contact se règle avec votre agence.', d: 13000,
      apply: () => { qualifyThomas(); },
      run: async () => {
        if (!main.querySelector('[data-c="l1"]')) render('today', false);
        await press('[data-c="l1"]', 700);
        openDrawer('l1', 1); cursor.classList.remove('is-on');
        const steps: [number, [string, string, string], () => void][] = [
          [2, ['21:47', 'Max · premier message WhatsApp', 'Lead Meta Ads, consentement donné'], () => {}],
          [3, ['21:48', 'Brochure envoyée · WhatsApp', 'Lien suivi'], () => {}],
          [6, ['21:52', 'Critères reçus', '4.5 pièces · ≤ CHF 1’000’000 · Kerzers'], () => { C('l1').chips = ['≤ CHF 1’000’000', 'Kerzers', 'Appartement', '4.5 pièces']; }],
          [7, ['21:52', 'Statut : Qualifié', 'Matching lancé'], () => { qualifyThomas(); }],
        ];
        showPhone(1); await sleep(900);
        for (const [n, item, fx] of steps) {
          for (let m = phone.querySelectorAll('.ph-m').length + 1; m <= n; m++) { showPhone(m); await sleep(850); }
          fx();
          $('[data-dtl]', drawer).insertAdjacentHTML('beforeend', tlItem(item, 'is-new'));
          if (n >= 6) put($('[data-dcrit]', drawer), C('l1').chips.map(chip).join(''));
          if (n === 7) {
            const st = $('[data-dst]', drawer); st.textContent = 'Qualifié'; st.className = 'lv-st st-qualifie is-bump';
            const dm = $('[data-dm]', drawer); put(dm, dmLine(C('l1'))); dm.classList.remove('is-off');
            toast('Thomas Rochat est qualifié · matching lancé');
          }
          await sleep(700);
        }
        await sleep(1800);
      } },
    { k: 'Relance', t: 'Vous savez qui rappeler en premier.', s: 'Céline ouvre la brochure une troisième fois : elle remonte en tête et passe en « Chaud ». La relance de Marc part en un clic.', d: 10500,
      apply: () => { C('c1').clicks = 3; S.relDone.set('c2', 'Relancé · e-mail'); },
      run: async () => {
        closeDrawer(); if (S.screen !== 'today') render('today', false);
        await press('.lv-nav [data-go="relance"]', 650);
        await sleep(1200); C('c1').clicks = 2; placeRel();
        await sleep(1400); C('c1').clicks = 3; placeRel(); toast('Céline Favre passe en « Chaud » · brochure consultée 3×');
        cursorTo(main.querySelector('[data-r="c1"]'));
        await sleep(1800);
        await press('[data-rel="c2"]', 800);
        await sleep(1800);
      } },
    { k: 'Matching', t: 'Le bon lot pour chaque acheteur.', s: 'Chaque lot disponible reçoit un score sur 100 selon les critères de l’acheteur. Le calcul est une règle, détaillée dans « Pourquoi ce score ? ».', d: 10000,
      apply: () => { S.sent = true; S.why = 'B3'; S.mc = 'c1'; },
      run: async () => {
        S.mc = 'c1'; S.why = '';
        if (S.screen !== 'relance') render('relance', false);
        await press('.lv-nav [data-go="match"]', 650);
        await sleep(1000);
        await press('[data-why="B3"]', 800);
        await sleep(2400);
        await press('[data-send3]', 900);
        await sleep(1800);
      } },
    { k: 'Pipeline', t: 'Chaque dossier, jusqu’à la signature.', s: 'Céline réserve le lot B3 : le pipeline, sa valeur et le stock de la promotion se mettent à jour.', d: 9500,
      apply: () => { reserveCeline(); },
      run: async () => {
        if (S.screen !== 'match') render('match', false);
        await press('.lv-nav [data-go="pipe"]', 650);
        await sleep(1000);
        const card = main.querySelector<HTMLElement>('[data-pc="c1"]')!;
        cursorTo(card); await sleep(900); clickFx();
        await fly(card, main.querySelector<HTMLElement>('[data-col="reservation"]')!);
        advance('c1');
        cursorTo(main.querySelector('[data-pc="c1"]')); await sleep(2600);
      } },
    { k: 'La promotion', t: 'Le stock à jour, au même endroit.', s: 'Lots disponibles, réservés et vendus, documents de vente et diffusion de la promotion sur les portails.', d: 8500,
      apply: () => {},
      run: async () => {
        if (S.screen !== 'pipe') render('pipe', false);
        await press('.lv-nav [data-go="promo"]', 650);
        await sleep(1600);
        main.scrollTo({ top: main.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
        await sleep(1000);
        const lot = main.querySelector<HTMLElement>('[data-lot="B3"]');
        cursorTo(lot); lot?.classList.add('is-flash');
        await sleep(2800);
      } },
    { k: 'Vue d’ensemble', t: 'Ce qui se vend. D’où viennent les acheteurs.', s: 'Demandes, qualifiés et acheteurs par canal : vous voyez quelles actions d’acquisition poursuivre.', d: 10000,
      apply: () => {},
      run: async () => {
        if (S.screen !== 'promo') render('promo', false);
        await press('.lv-nav [data-go="vue"]', 650);
        await sleep(1800);
        cursorTo(main.querySelector('.lv-cva')); await sleep(2800);
        cursorTo(main.querySelector('.lv-rec')); await sleep(2400);
      } },
  ];

  // ---------- Pilotage de la visite ----------
  const chapBtns = [...root.querySelectorAll<HTMLButtonElement>('[data-chap]')];
  function caption(i: number) {
    $('[data-cap-n]').textContent = '0' + (i + 1);
    $('[data-cap-k]').textContent = CH[i].k;
    $('[data-cap-t]').textContent = CH[i].t;
    $('[data-cap-s]').textContent = CH[i].s;
    chapBtns.forEach((b, k) => {
      const li = b.parentElement!;
      li.classList.remove('is-cur');
      li.classList.toggle('is-done', k < i);
      li.style.setProperty('--d', CH[k].d + 'ms');
      b.setAttribute('aria-current', k === i ? 'step' : 'false');
    });
    const li = chapBtns[i].parentElement!; void li.offsetWidth; li.classList.add('is-cur');
    const capEl = $('.lvs-cap');
    if (!reduce) { capEl.classList.remove('is-in'); void capEl.offsetWidth; capEl.classList.add('is-in'); }
  }
  function setPlaying(p: boolean) {
    playing = p;
    root.classList.toggle('is-paused', !p);
    $('[data-play-l]').textContent = p ? 'Pause' : 'Reprendre la visite';
    $('[data-play]').setAttribute('aria-label', p ? 'Mettre la visite en pause' : 'Reprendre la visite');
    $('[data-mode]').textContent = p ? 'Visite guidée' : 'Exploration libre · cliquez dans l’app';
    if (!p) cursor.classList.remove('is-on');
  }
  async function playFrom(i: number) {
    const id = ++run;
    S = fresh(); closeDrawer();
    for (let j = 0; j < i; j++) CH[j].apply();
    render(['today', 'today', 'today', 'relance', 'match', 'pipe', 'promo'][i], false);
    setPlaying(true);
    try {
      for (let k = i; k < CH.length; k++) {
        cur = k; caption(k);
        const t0 = performance.now();
        await CH[k].run();
        await sleep(Math.max(0, CH[k].d - (performance.now() - t0)), id);
        CH[k].apply();
      }
      setPlaying(false);
      $('[data-play-l]').textContent = 'Revoir la visite';
      cur = -1;
    } catch { /* visite interrompue par le visiteur */ }
  }
  function stop() { run++; setPlaying(false); }

  chapBtns.forEach((b, i) => b.addEventListener('click', () => playFrom(i)));
  $('[data-play]').addEventListener('click', () => (playing ? stop() : playFrom(cur < 0 ? 0 : cur)));
  // Un geste réel dans l'app = exploration libre
  lv.addEventListener('pointerdown', (e) => { if (e.isTrusted && playing) stop(); });
  root.addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement).closest('.lv')) return;
    if (e.key === 'ArrowRight' && cur < CH.length - 1) playFrom(Math.max(0, cur) + 1);
    if (e.key === 'ArrowLeft' && cur > 0) playFrom(cur - 1);
  });

  // État initial, puis lancement quand la scène est visible
  render('today', false); caption(0); setPlaying(false); ready = true;
  $('[data-play-l]').textContent = 'Lancer la visite';
  if (!reduce) {
    const io = new IntersectionObserver((en) => {
      if (en.some((x) => x.isIntersecting)) { io.disconnect(); playFrom(0); }
    }, { threshold: 0.45 });
    io.observe(fit);
  }
}
