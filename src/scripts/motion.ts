// Lotivio — couche d'animation.
// Défilement : Lenis réglé comme meotis.ch (lerp 0.11, molette ×1).
// Apparitions : transitions CSS déclenchées une fois par une classe `.in` (global.css,
// « Apparitions façon meotis.ch ») — le navigateur les joue hors du fil JavaScript.
// GSAP ne sert plus qu'aux effets liés au défilement (scrub) et au texte « décodé » (ScrambleText).
// Les titres sont animés par flash.ts (éclair orange mot par mot, réf. fourmula.ai).
// Si l'utilisateur demande moins de mouvement, rien n'est animé et le contenu reste visible.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import Lenis from 'lenis';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const tick = () => new Promise<void>((r) => setTimeout(r, 0));

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
// (init() est lancé en fin de fichier, une fois toutes les fonctions déclarées)

/* ---------- Déclencheur unique des apparitions ---------- */
// Un élément déjà visible au moment où le script arrive reçoit `.in` tout de suite
// (pas de clignotement) ; les autres le reçoivent en entrant dans l'écran.
const callbacks = new WeakMap<Element, () => void>();
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  callbacks.get(e.target)?.();
  io.unobserve(e.target);
}), { rootMargin: '0px 0px -8% 0px' });
const watch = (el: Element, onIn?: () => void) => {
  if (onIn) callbacks.set(el, onIn);
  if (el.getBoundingClientRect().top < innerHeight * 0.92) { el.classList.add('in'); onIn?.(); return; }
  io.observe(el);
};
const index = (els: Element[]) => els.forEach((el, i) => (el as HTMLElement).style.setProperty('--i', String(i)));

async function init() {
  /* ---------- Lenis (réglages meotis.ch), synchronisé avec ScrollTrigger ---------- */
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('lotivio:lock', (e) => ((e as CustomEvent).detail ? lenis.stop() : lenis.start()));

  // Ancres internes : défilement Lenis, focus déplacé pour le clavier.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(id === '#top' ? 0 : (target as HTMLElement), { offset: id === '#demo' ? -40 : 0 });
    history.replaceState(null, '', id);
    if (id !== '#top') { (target as HTMLElement).setAttribute('tabindex', '-1'); (target as HTMLElement).focus({ preventScroll: true }); }
  });

  await tick(); // étape courte : le navigateur reprend la main entre deux groupes
  /* ---------- Préparation des apparitions (avant d'activer les états cachés) ---------- */
  // Les titres (data-flash) sont animés par flash.ts : éclair orange mot par mot, en CSS.
  $$('[data-stagger]').forEach((g) => index([...g.children]));
  $$('.bfan').forEach((f) => index($$('.bp', f)));
  // Tout ce qui est déjà à l'écran est marqué visible avant d'activer les états cachés.
  const targets = $$('[data-reveal], [data-stagger], .bfan, .flow4 .pn')
    .filter((el) => !el.closest('#hs-track'));
  targets.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('in'); });
  root.classList.add('rv-on');
  await tick();

  targets.forEach((el) => {
    if (el.classList.contains('in')) return;
    if (el.matches('.flow4 .pn')) return; // seuil plus tardif : voir pnIo
    if (el.matches('.bfan')) watch(el, () => setTimeout(() => el.classList.add('done'), 1700));
    else watch(el);
  });
  // Panneaux S06 : le titre et la scène apparaissent quand le panneau occupe l'écran.
  const pnIo = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); pnIo.unobserve(e.target); } }), { rootMargin: '0px 0px -35% 0px' });
  $$('.flow4 .pn').forEach((pn) => { if (!pn.classList.contains('in')) pnIo.observe(pn); });

  await tick(); // étape courte : le navigateur reprend la main entre deux groupes
  /* ---------- Labels : texte « décodé » (ScrambleText) à l'apparition ---------- */
  $$('[data-scramble]').forEach((lab) => {
    const text = lab.textContent?.trim() ?? '';
    if (/\p{Extended_Pictographic}/u.test(text)) return; // drapeau : pas de brouillage
    watch(lab, () => gsap.to(lab, { duration: 1.2, ease: 'none', scrambleText: { text, chars: 'lotivio0123456789/', revealDelay: 0.2, speed: 0.55 } }));
  });

  /* ---------- S02 · compteur ---------- */
  $$('.count[data-to]').forEach((c) => {
    const to = Number(c.dataset.to); const o = { v: 0 };
    c.textContent = '0';
    watch(c, () => gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', snap: { v: 1 }, onUpdate: () => (c.textContent = String(o.v)) }));
  });

  /* ---------- S04 · la ligne active s'allume (transition de couleur en CSS) ---------- */
  $$('#ai-lines li').forEach((li) => ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 38%', toggleClass: 'on' }));

  await tick();
  /* ---------- Effets liés au défilement : directement sur le défilement Lenis (scrub: true),
     sans second lissage par-dessus — c'est ce double retard qui donnait l'effet « mou ». ---------- */

  const mm = gsap.matchMedia();

  // S06 · panneaux empilés : le précédent recule et s'assombrit.
  mm.add('(min-width: 1001px)', () => {
    const pns = $$('.flow4 .pn');
    pns.forEach((pn, i) => {
      const nextPn = pns[i + 1]; if (!nextPn) return;
      const st = { trigger: nextPn, start: 'top bottom', end: 'top top', scrub: true };
      gsap.to(pn.querySelector('.pn-in'), { scale: 0.92, yPercent: -3, ease: 'none', scrollTrigger: st });
      gsap.to(pn.querySelector('.pn-dim'), { opacity: 0.5, ease: 'none', scrollTrigger: { ...st } });
    });
  });

  await tick(); // étape courte : le navigateur reprend la main entre deux groupes
  // S07 · piste horizontale pilotée par le défilement.
  mm.add('(min-width: 1001px)', () => {
    const sec = $('#mise-en-place'), track = $('#hs-track');
    if (!sec || !track) return;
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const setH = () => { sec.style.height = innerHeight + dist() + 'px'; };
    setH();
    ScrollTrigger.addEventListener('refreshInit', setH);
    const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
    // Chaque carte arrive légèrement inclinée et se redresse. Elle doit être droite au plus tard quand la piste
    // s'arrête : la dernière carte ne passe jamais le repère des 60 %, sa fin est donc ramenée à sa position finale.
    const finalLeft = (card: HTMLElement) =>
      card.getBoundingClientRect().left - track.getBoundingClientRect().left + (track.parentElement?.getBoundingClientRect().left ?? 0) - dist();
    $$('.oc', track).forEach((card) => {
      gsap.from(card, {
        rotate: 3, y: 50, scale: 0.95, ease: 'none',
        scrollTrigger: {
          trigger: card, containerAnimation: tween, start: 'left right', scrub: true, invalidateOnRefresh: true,
          end: () => `left ${Math.max(innerWidth * 0.6, finalLeft(card) + 8)}px`,
        },
      });
    });
    return () => { ScrollTrigger.removeEventListener('refreshInit', setH); sec.style.height = ''; };
  });

  await tick();
  // S07B · les porte-clés viennent se suspendre au tableau.
  mm.add('(min-width: 1001px)', () => {
    const sec = $('#pourquoi'); if (!sec) return;
    const head = $('#why-head')!, cta = $('#why-cta')!, rail = $('.rail', sec)!, cap = $('.board-cap', sec)!;
    const tags = $$('.tag', sec);
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const upd = (p: number) => {
      const h = Math.min(1, p / 0.4);
      gsap.set(head, { opacity: 1 - h, xPercent: -50, x: 0, y: -90 * h });
      rail.classList.toggle('on', p > 0.25); cap.classList.toggle('on', p > 0.45);
      tags.forEach((t, i) => {
        const a = ease(Math.min(1, Math.max(0, (p - 0.05 - i * 0.06) / 0.62)));
        const x = +t.dataset.x!, y = +t.dataset.y!, r = +t.dataset.r!;
        t.style.transform = `translate3d(${x * (1 - a)}px,${y * (1 - a)}px,0) rotate(${r * (1 - a)}deg)`;
        t.classList.toggle('hang', a >= 1);
      });
      cta.classList.toggle('on', p > 0.8);
    };
    head.style.transform = '';
    const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: 'bottom bottom', onUpdate: (self) => upd(self.progress) });
    upd(0);
    return () => { st.kill(); gsap.set(head, { clearProps: 'all' }); tags.forEach((t) => { t.style.transform = ''; t.classList.remove('hang'); }); };
  });

  // S10 · la carte de démo se redresse.
  const card = $('.cta10-card');
  if (card) gsap.fromTo(card, { scale: 0.93 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 35%', scrub: true } });

  // S11 · le haut du footer descend en place pendant que la page le découvre.
  const foot = $('#foot2'), page = $('#page');
  if (foot && page && $('.f-top', foot)) {
    gsap.fromTo('.f-top', { y: -60, autoAlpha: 0.2 }, {
      y: 0, autoAlpha: 1, ease: 'none',
      scrollTrigger: { trigger: page, start: 'bottom bottom', end: () => `bottom ${innerHeight - foot.offsetHeight * 0.6}px`, scrub: true, invalidateOnRefresh: true },
    });
  }

  await tick(); // étape courte : le navigateur reprend la main entre deux groupes
  /* ---------- S00 · navigation masquée en descendant ---------- */
  const nav = $('.nav');
  if (nav) {
    let hidden = false;
    lenis.on('scroll', (l: Lenis) => {
      const menuOpen = $('#menu-btn')?.getAttribute('aria-expanded') === 'true';
      const h = !menuOpen && l.direction === 1 && l.scroll > 240;
      if (h !== hidden) { hidden = h; nav.classList.toggle('is-hidden', h); }
    });
  }

  /* ---------- Menu : ouverture animée ---------- */
  document.addEventListener('lotivio:menu', (e) => {
    if (!(e as CustomEvent).detail) return;
    const menu = $('#menu')!;
    gsap.fromTo(menu, { autoAlpha: 0, y: -10, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out' });
    gsap.fromTo($$('li, .menu-cta', menu), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'expo.out', stagger: 0.04, delay: 0.05 });
  });

  // Recalcul des positions seulement si quelque chose peut encore changer les hauteurs.
  // ScrollTrigger calcule déjà ses positions à la création : un recalcul de plus après coup
  // relance une mise en page complète (coûteux sur mobile).
  if (document.readyState !== 'complete') addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => ScrollTrigger.refresh());
}

if (!reduced) void init();
