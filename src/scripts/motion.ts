// Lotivio — couche d'animation (GSAP + ScrollTrigger + SplitText + ScrambleText, Lenis).
// Niveau visé : fourmula.ai (révélations SplitText, scramble, scrub) et meotis.ch (Lenis, défilement doux).
// Si l'utilisateur demande moins de mouvement, rien n'est animé et le contenu reste visible.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import Lenis from 'lenis';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const EASE = 'expo.out';
const tick = () => new Promise<void>((r) => setTimeout(r, 0));

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

if (reduced) {
  root.classList.add('ready');
  // Ancres sans animation, compteurs à leur valeur finale.
} else {
  void init();
}

async function init() {
  /* ---------- Lenis : défilement doux synchronisé avec ScrollTrigger ---------- */
  // Interpolation continue (lerp) : défilement plus souple qu'une durée fixe, sans à-coups entre deux crans de molette.
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4, anchors: false });
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
    lenis.scrollTo(id === '#top' ? 0 : (target as HTMLElement), { offset: id === '#demo' ? -40 : 0, duration: 1.4 });
    history.replaceState(null, '', id);
    if (id !== '#top') { (target as HTMLElement).setAttribute('tabindex', '-1'); (target as HTMLElement).focus({ preventScroll: true }); }
  });

  /* ---------- S01 · l'intro est en CSS (global.css, « intro du premier écran ») ----------
     Ici seulement : le cadre bascule légèrement en défilant (effet « fenêtre qui s'ouvre »). */
  const stage = $('[data-intro-stage]');
  if (stage) {
    gsap.set(stage, { transformPerspective: 1400, transformOrigin: '50% 0%' });
    gsap.fromTo(stage, { rotateX: 0, scale: 1 }, { rotateX: -4, scale: 1.02, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 60%', end: 'bottom top', scrub: true } });
  }

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- Titres : lignes révélées sous masque (SplitText) ---------- */
  $$('[data-split]').forEach((h) => {
    if (h.closest('#hs-track')) return; // titre de la piste horizontale : traité plus bas
    SplitText.create(h, {
      type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'sl',
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105, duration: 1.15, ease: EASE, stagger: 0.09,
        scrollTrigger: { trigger: h, start: 'top 86%', once: true },
      }),
    });
  });
  // Titres aux lignes posées à la main (.lm > .li) : même effet, sans SplitText
  // (S02 : SplitText duplique le compteur « 4 »).
  $$('[data-lines]').forEach((h) => {
    gsap.from($$('.li', h), { yPercent: 105, duration: 1.15, ease: EASE, stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 86%', once: true } });
  });

  /* ---------- Labels : texte « décodé » (ScrambleText) ---------- */
  $$('[data-scramble]').forEach((lab) => {
    const text = lab.textContent?.trim() ?? '';
    if (/\p{Extended_Pictographic}/u.test(text)) return; // drapeau : pas de brouillage
    gsap.to(lab, {
      duration: 1.3, ease: 'none',
      scrambleText: { text, chars: 'lotivio0123456789/', revealDelay: 0.25, speed: 0.6 },
      scrollTrigger: { trigger: lab, start: 'top 90%', once: true },
    });
  });

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- Blocs : apparition par lots ---------- */
  gsap.set('[data-reveal]', { autoAlpha: 0, y: 60 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.2, ease: EASE, stagger: 0.12, overwrite: true }),
  });
  $$('[data-stagger]').forEach((g) => {
    gsap.from(g.children, { autoAlpha: 0, y: 40, duration: 1, ease: EASE, stagger: 0.12, scrollTrigger: { trigger: g, start: 'top 85%', once: true } });
  });

  /* ---------- S02 · compteur ---------- */
  $$('.count[data-to]').forEach((c) => {
    const to = Number(c.dataset.to); const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', snap: { v: 1 }, onUpdate: () => (c.textContent = String(o.v)), scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
  });

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- S03 · tuiles de la file + collages en parallaxe ---------- */
  $$('[data-tiles]').forEach((g) => {
    gsap.from(g.children, { autoAlpha: 0, scale: 0.86, y: 30, duration: 0.9, ease: 'back.out(1.6)', stagger: { each: 0.06, from: 'start' }, scrollTrigger: { trigger: g, start: 'top 80%', once: true } });
  });
  $$('[data-collage]').forEach((col) => {
    const card = col.closest('article') ?? col;
    $$('[data-speed]', col).forEach((ck) => {
      const s = Number(ck.dataset.speed);
      gsap.fromTo(ck, { y: s }, { y: -s, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
    });
  });
  $$('.f-stage .in-card').forEach((c) => {
    gsap.from(c, { x: -80, rotate: -6, autoAlpha: 0, duration: 1.2, ease: EASE, scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
  });

  /* ---------- S04 · la ligne active s'allume ---------- */
  $$('#ai-lines li').forEach((li) => {
    ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 38%', toggleClass: 'on' });
  });

  const mm = gsap.matchMedia();

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- S06 · panneaux empilés : le précédent recule et s'assombrit ---------- */
  mm.add('(min-width: 1001px)', () => {
    const pns = $$('.flow4 .pn');
    pns.forEach((pn, i) => {
      const nextPn = pns[i + 1]; if (!nextPn) return;
      gsap.to(pn.querySelector('.pn-in'), { scale: 0.9, yPercent: -4, ease: 'none', scrollTrigger: { trigger: nextPn, start: 'top bottom', end: 'top top', scrub: true } });
      gsap.to(pn.querySelector('.pn-dim'), { opacity: 0.55, ease: 'none', scrollTrigger: { trigger: nextPn, start: 'top bottom', end: 'top top', scrub: true } });
    });
    pns.forEach((pn) => {
      const h = pn.querySelector('h3'); const st = pn.querySelector('.stage');
      if (h) gsap.from(h, { yPercent: 30, autoAlpha: 0, duration: 1.1, ease: EASE, scrollTrigger: { trigger: pn, start: 'top 70%', once: true } });
      if (st) gsap.from(st, { y: 120, autoAlpha: 0, duration: 1.3, ease: EASE, scrollTrigger: { trigger: pn, start: 'top 55%', once: true } });
    });
  });

  /* ---------- S07 · piste horizontale pilotée par le défilement ---------- */
  mm.add('(min-width: 1001px)', () => {
    const sec = $('#mise-en-place'), track = $('#hs-track');
    if (!sec || !track) return;
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const setH = () => { sec.style.height = innerHeight + dist() + 'px'; };
    setH();
    ScrollTrigger.addEventListener('refreshInit', setH);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
    });
    // Chaque carte arrive légèrement inclinée et se redresse (containerAnimation).
    $$('.oc', track).forEach((card) => {
      gsap.from(card, { rotate: 4, y: 70, scale: 0.94, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'left 55%', scrub: true } });
    });
    const intro = $('.hs-intro h2', track);
    if (intro) {
      const s = SplitText.create(intro, { type: 'lines', mask: 'lines' });
      gsap.from(s.lines, { yPercent: 105, duration: 1.15, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: sec, start: 'top 75%', once: true } });
    }
    return () => { ScrollTrigger.removeEventListener('refreshInit', setH); sec.style.height = ''; };
  });

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- S07B · les porte-clés viennent se suspendre au tableau ---------- */
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
        t.style.transform = `translate(${x * (1 - a)}px,${y * (1 - a)}px) rotate(${r * (1 - a)}deg)`;
        t.classList.toggle('hang', a >= 1);
      });
      cta.classList.toggle('on', p > 0.8);
    };
    head.style.transform = '';
    const st = ScrollTrigger.create({ trigger: sec, start: 'top top', end: 'bottom bottom', onUpdate: (self) => upd(self.progress) });
    upd(0);
    return () => { st.kill(); gsap.set(head, { clearProps: 'all' }); tags.forEach((t) => { t.style.transform = ''; t.classList.remove('hang'); }); };
  });

  /* ---------- S08.3 · l'éventail de brochures s'ouvre ---------- */
  $$('.bfan').forEach((fan) => {
    const pages = $$('.bp', fan);
    gsap.from(pages, {
      rotate: 0, x: (i) => [-90, -48, 0][i] ?? 0, y: 40, autoAlpha: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: fan, start: 'top 82%', once: true },
      onStart: () => pages.forEach((p) => (p.style.transition = 'none')),
      onComplete: () => gsap.set(pages, { clearProps: 'transform,transition,opacity,visibility' }),
    });
    const sent = $('.sent', fan);
    if (sent) gsap.from(sent, { scale: 0.6, autoAlpha: 0, duration: 0.8, ease: 'back.out(2)', delay: 0.7, scrollTrigger: { trigger: fan, start: 'top 82%', once: true } });
  });

  /* ---------- S10 · la carte de démo se redresse ---------- */
  const card = $('.cta10-card');
  if (card) gsap.fromTo(card, { scale: 0.92 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 35%', scrub: true } });

  await tick(); // rend la main au navigateur entre deux groupes (TBT)
  /* ---------- S11 · le mot « lotivio. » monte lettre par lettre ---------- */
  const word = $('[data-fword]'), foot = $('#foot2'), page = $('#page');
  if (word && foot && page) {
    // Pas de masque : la hauteur de ligne (0.74) couperait les lettres ; le footer rogne déjà le bas.
    const s = SplitText.create(word, { type: 'chars', charsClass: 'fw-c' });
    word.classList.add('is-split');
    gsap.fromTo(s.chars, { yPercent: 110 }, {
      yPercent: 0, ease: 'none', stagger: 0.06,
      scrollTrigger: { trigger: page, start: 'bottom bottom', end: () => `bottom ${innerHeight - foot.offsetHeight * 0.85}px`, scrub: 0.6, invalidateOnRefresh: true },
    });
    gsap.fromTo('.f-top', { y: -60, autoAlpha: 0.2 }, {
      y: 0, autoAlpha: 1, ease: 'none',
      scrollTrigger: { trigger: page, start: 'bottom bottom', end: () => `bottom ${innerHeight - foot.offsetHeight * 0.6}px`, scrub: true, invalidateOnRefresh: true },
    });
  }

  /* ---------- S00 · navigation masquée en descendant ---------- */
  const nav = $('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        const menuOpen = $('#menu-btn')?.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('is-hidden', !menuOpen && self.direction === 1 && self.scroll() > 240);
      },
    });
  }

  /* ---------- Menu : ouverture animée ---------- */
  document.addEventListener('lotivio:menu', (e) => {
    if (!(e as CustomEvent).detail) return;
    const menu = $('#menu')!;
    gsap.fromTo(menu, { autoAlpha: 0, y: -10, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: EASE });
    gsap.fromTo($$('li, .menu-cta', menu), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE, stagger: 0.04, delay: 0.05 });
  });

  /* ---------- Boutons magnétiques ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.magnet').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.4);
      });
      b.addEventListener('pointerleave', () => { gsap.to(b, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }); });
    });
  }

  // Les trames et images chargées après coup changent les hauteurs : on recalcule.
  // (motion.ts est chargé à l'inactivité : l'événement load peut déjà être passé)
  if (document.readyState === 'complete') ScrollTrigger.refresh();
  else addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
