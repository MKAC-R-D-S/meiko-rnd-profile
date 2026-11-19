// Scroll story on product pages: swaps the sticky stage image as steps scroll into view,
// and lets the layer buttons jump the stage to a given step. Loaded only when a page has a story.
const stage = document.querySelector('[data-story-stage]');
if (stage) {
  const slides = [...stage.querySelectorAll('.slide')];
  const steps = [...document.querySelectorAll('.step')];
  const kindEl = stage.querySelector('[data-hud-kind]');
  const capEl = stage.querySelector('[data-hud-cap]');
  const idxEl = stage.querySelector('[data-hud-idx]');
  const ticks = [...document.querySelectorAll('.ticks i')];
  const buttons = [...document.querySelectorAll('.layer button')];
  const infos = [...document.querySelectorAll('[data-layer-info]')];
  const pad = n => String(n).padStart(2, '0');
  let active = 0;

  const setLayer = layer => {
    if (layer === '' || layer == null) return;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.layer === String(layer))));
    infos.forEach(el => { el.hidden = el.dataset.layerInfo !== String(layer); });
  };
  // Text is read from the step itself, so it follows the language switch (data-t elements are re-rendered).
  const paint = i => {
    const step = steps[i];
    kindEl.textContent = step.querySelector('.kind-src')?.textContent ?? '';
    capEl.textContent = step.querySelector('.cap-src')?.textContent ?? '';
    idxEl.textContent = `${pad(i + 1)} / ${pad(steps.length)}`;
    ticks.forEach((t, j) => t.classList.toggle('on', j === i));
  };
  const show = i => {
    active = i;
    slides.forEach(s => s.classList.toggle('on', s.dataset.path === steps[i].dataset.slide));
    paint(i);
    setLayer(steps[i].dataset.layer);
  };

  buttons.forEach(b => b.addEventListener('click', () => {
    const i = Number(b.dataset.step);
    if (steps[i]) { show(i); setLayer(b.dataset.layer); }
  }));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) show(steps.indexOf(e.target));
    }, {rootMargin: '-40% 0px -45% 0px'});
    steps.forEach(s => io.observe(s));
  }
  new MutationObserver(() => paint(active)).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
}
