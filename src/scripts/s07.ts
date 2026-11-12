// S07 · illustrations de la mise en place (v4, données de démonstration).
// À chaque apparition d'une carte, sa scène se joue une fois : chaque élément [data-t] arrive (.on) au bout
// de t ms, chaque élément [data-d] se termine (.done) au bout de d ms. Ensuite la carte reste immobile.
// Le HTML porte l'état final : sans JS ou en mouvement réduit, tout est visible. Styles : s07-scenes.css.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function scene(root: HTMLElement) {
  const tEls = [...root.querySelectorAll<Element>('[data-t]')];
  const dEls = [...root.querySelectorAll<Element>('[data-d]')];
  let timers: number[] = [];
  const reset = () => {
    timers.forEach(clearTimeout); timers = [];
    tEls.forEach((e) => e.classList.remove('on'));
    dEls.forEach((e) => e.classList.remove('done'));
  };
  const play = () => {
    reset();
    tEls.forEach((e) => timers.push(window.setTimeout(() => e.classList.add('on'), Number(e.getAttribute('data-t')))));
    dEls.forEach((e) => timers.push(window.setTimeout(() => e.classList.add('done'), Number(e.getAttribute('data-d')))));
  };
  reset();
  root.classList.add('run');
  let shown = false;
  new IntersectionObserver(([e]) => {
    if (e.intersectionRatio >= 0.4 && !shown) { shown = true; root.classList.add('in'); window.setTimeout(play, 350); }
    else if (!e.isIntersecting && shown && e.intersectionRatio === 0) { shown = false; reset(); }
  }, { threshold: [0, 0.4] }).observe(root);
}

if (!reduced) document.querySelectorAll<HTMLElement>('.s7[data-s7]').forEach(scene);
