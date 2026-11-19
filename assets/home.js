import {text,localeIndex} from './home-copy.mjs';

let lang = 'vi';
let formState = '';
try {
 const saved = localStorage.getItem('preferred-lang');
 lang = saved === 'jp' ? 'ja' : (saved in localeIndex ? saved : 'vi');
} catch { /* storage unavailable: stay on Vietnamese */ }

// Page-specific strings (product pages) override the shared copy: {key: [vi, en, ja]}.
let pageCopy = {};
try { pageCopy = JSON.parse(document.getElementById('page-copy')?.textContent || '{}'); } catch { pageCopy = {}; }
const tr = key => {
 const row = pageCopy[key];
 if (!row) return text(key, lang);
 const i = localeIndex[lang] ?? 0;
 return row[i] ?? row[1] ?? row[0] ?? key;
};
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const nav = document.getElementById('navigation');
const menu = document.querySelector('.menu-toggle');

/* Product filter */
let filter = 'all';
function updateProducts() {
 let count = 0;
 document.querySelectorAll('.tile[data-category]').forEach(card => {
  card.hidden = !(filter === 'all' || card.dataset.category === filter);
  if (!card.hidden) count++;
 });
 document.getElementById('mosaic')?.classList.toggle('filtered', filter !== 'all');
 document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
 const result = document.getElementById('results-status');
 if (result) result.textContent = `${count} ${tr('resultCount')}`;
}

function applyLanguage(code) {
 lang = code;
 document.documentElement.lang = code;
 document.title = tr('title');
 document.querySelector('meta[name="description"]').content = tr('description');
 document.querySelector('meta[property="og:title"]').content = tr('title');
 document.querySelector('meta[property="og:description"]').content = tr('description');
 document.querySelectorAll('[data-t]').forEach(el => { el.innerHTML = tr(el.dataset.t); });
 document.querySelectorAll('[data-aria]').forEach(el => el.setAttribute('aria-label', tr(el.dataset.aria)));
 document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === code)));
 try { localStorage.setItem('preferred-lang', code); } catch { /* ignore */ }
 updateProducts();
 if (status && formState) status.textContent = tr(formState);
 if (form) {
  const submit = form.querySelector('[type=submit]');
  if (submit.disabled) submit.textContent = tr('sending');
 }
}

document.querySelectorAll('[data-language]').forEach(el => el.addEventListener('click', () => applyLanguage(el.dataset.language)));
document.querySelectorAll('button[data-filter]').forEach(el => el.addEventListener('click', () => { filter = el.dataset.filter; updateProducts(); }));
document.querySelectorAll('[data-jump-filter]').forEach(el => el.addEventListener('click', () => { filter = el.dataset.jumpFilter; updateProducts(); }));

menu?.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 nav.classList.toggle('open', open);
});
nav?.addEventListener('click', e => {
 if (e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => {
 if (e.key === 'Escape' && nav?.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); }
});

if (form) {
 const product = form.elements.product;
 const preset = new URLSearchParams(location.search).get('product');
 if ([...product.options].some(o => o.value === preset)) product.value = preset;
 document.querySelectorAll('[data-product]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  product.value = a.dataset.product;
  const query = new URLSearchParams(location.search);
  query.set('product', product.value);
  history.replaceState(null, '', `?${query}#contact`);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('contact').scrollIntoView({behavior: reduce ? 'instant' : 'smooth'});
  form.elements.name.focus({preventScroll: true});
 }));
 form.addEventListener('input', e => e.target.removeAttribute?.('aria-invalid'));
 form.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = form.querySelector('[type=submit]');
  if (submit.disabled) return;
  const values = Object.fromEntries(new FormData(form));
  form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  const missing = [...form.elements].filter(el => el.willValidate && !el.checkValidity());
  if (missing.length) {
   missing.forEach(el => el.setAttribute('aria-invalid', 'true'));
   formState = 'formInvalid'; status.textContent = tr(formState);
   missing[0].focus();
   return;
  }
  if (!values.email.trim() && !values.phone.trim()) {
   form.elements.email.setAttribute('aria-invalid', 'true'); form.elements.phone.setAttribute('aria-invalid', 'true');
   formState = 'contactHint'; status.textContent = tr(formState);
   form.elements.email.focus();
   return;
  }
  submit.disabled = true; submit.textContent = tr('sending'); formState = 'sending'; status.textContent = tr(formState);
  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 15000);
  try {
   // Same EmailJS service/template as the previous homepage; new fields are folded into `message`.
   const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, signal: abort.signal,
    body: JSON.stringify({service_id: 'service_bafttzj', template_id: 'template_gqzxynz', user_id: 'YIbFJs9EGrlXjhb7D',
     template_params: {...values, reply_to: values.email, message: `Product: ${values.product || 'General'}\nCompany: ${values.company}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`}})
   });
   if (!response.ok) throw new Error('Delivery failed');
   formState = 'sent';
   const selected = product.value; form.reset(); product.value = selected;
  } catch {
   formState = 'sendError';
  } finally {
   clearTimeout(timeout); submit.disabled = false; submit.textContent = tr('send'); status.textContent = tr(formState);
  }
 });
}


/* Solutions diagram: draw connectors between the real node positions */
const arch = document.querySelector('.arch');
function drawWires() {
 const svg = arch?.querySelector('.wires'); const g = document.getElementById('wires');
 if (!svg || !g) return;
 if (getComputedStyle(svg).display === 'none') { g.innerHTML = ''; return; }
 const f = arch.getBoundingClientRect();
 const box = id => { const r = document.getElementById(id).getBoundingClientRect(); return {l: r.left - f.left, t: r.top - f.top, r: r.right - f.left, b: r.bottom - f.top, cx: (r.left + r.right) / 2 - f.left, cy: (r.top + r.bottom) / 2 - f.top}; };
 svg.setAttribute('viewBox', `0 0 ${f.width} ${f.height}`);
 const A = box('nA'), B = box('nB'), C = box('nC'), D = box('nD');
 const paths = [
  `M${A.l + (A.r - A.l) * .3} ${A.b} C ${A.l + (A.r - A.l) * .3} ${A.b + 60}, ${B.cx} ${B.t - 60}, ${B.cx} ${B.t}`,
  `M${B.r - 40} ${B.t} C ${B.r - 40} ${B.t - 90}, ${C.l - 70} ${C.b + 10}, ${C.l + 40} ${C.b}`,
  `M${C.r - 30} ${C.b} C ${C.r - 30} ${C.b + 30}, ${D.r - 30} ${D.t - 30}, ${D.r - 30} ${D.t}`];
 const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
 g.innerHTML = paths.map((d, i) => `<path class="wire" d="${d}"/>` + (still ? '' : `<path class="wire-live" d="${d}"/><circle class="pulse" r="0"><set attributeName="r" to="4" begin="${i * .9}s"/><animateMotion dur="2.6s" begin="${i * .9}s" repeatCount="indefinite" path="${d}"/></circle>`)).join('');
}
if (arch) {
 new ResizeObserver(() => requestAnimationFrame(drawWires)).observe(arch);
 addEventListener('load', () => setTimeout(drawWires, 1200));
}

applyLanguage(lang);
if ('serviceWorker' in navigator) navigator.serviceWorker.register((document.documentElement.dataset.root || '') + 'sw.js').catch(() => {});
