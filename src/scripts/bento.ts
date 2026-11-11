// S07 · illustrations bento animées.
// Chaque scène (.il) déclare ses étapes en millisecondes (data-steps) et la durée de sa boucle
// (data-loop). Le script pose les classes k1, k2… au bon moment ; tous les mouvements sont des
// transitions CSS (global.css, « S07 · illustrations bento »).
// La scène ne tourne que si sa carte est à l'écran ; hors écran, plus aucun minuteur.
// Sans JavaScript ou avec moins de mouvement, la classe .run n'est jamais posée : la scène
// reste dans son état final, complète et lisible.

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

function scene(il: HTMLElement) {
  const steps = (il.dataset.steps ?? '').split(',').map(Number).filter((n) => n >= 0);
  const loop = Number(il.dataset.loop) || 9000;
  let timers: number[] = [];
  let on = false;

  const clear = () => {
    // Retour instantané à l'état initial, invisible (la scène est déjà en fondu de sortie).
    il.classList.add('k-reset');
    steps.forEach((_, i) => il.classList.remove('k' + (i + 1)));
  };
  const play = async () => {
    clear();
    await frame();
    if (!on) return;
    il.classList.remove('k-reset', 'k-out');
    steps.forEach((t, i) => timers.push(window.setTimeout(() => il.classList.add('k' + (i + 1)), t)));
    timers.push(window.setTimeout(() => il.classList.add('k-out'), loop - 650));
    timers.push(window.setTimeout(() => { timers = []; void play(); }, loop));
  };
  const stop = () => { timers.forEach(clearTimeout); timers = []; };

  il.classList.add('run', 'k-out');
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !on) { on = true; void play(); }
    else if (!e.isIntersecting && on) { on = false; stop(); il.classList.add('k-out'); }
  }, { threshold: 0.35 }).observe(il);
}

if (!reduced) document.querySelectorAll<HTMLElement>('.il[data-steps]').forEach(scene);
