// Builds every product page (products/<slug>/index.html), the catalogue page (products/index.html)
// and sitemap.xml from _data/products/*.json, using the homepage design system.
// Run: node scripts/build-products.mjs
import {readdirSync,readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {text} from '../assets/home-copy.mjs';
import {statsRail,architecture,ioBlocks,story,storySteps,scenario,docsFaq,pendingBox} from './product-sections.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const SITE = 'https://mkac-r-d-s.github.io/meiko-rnd-profile/';
const EMAIL = 'duc.vuminh@meiko.vn';
const LANGS = ['vi','en','ja'];
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const tri = o => LANGS.map(l => (o && (o[l] || o.vi)) || '');
const arrow = '<svg class="arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';

const FAMILY = {iot:'fIot', test:'fTest', special:'fSpecial', automation:'fAuto', medical:'roleMed'};
const KIND = {photo:'kPhoto', render3d:'k3d', cad:'kCad', installation:'kInstall', diagram:'kDiagram', sample:'kSample'};
const FAMILY_ORDER = ['iot','automation','test','special','medical'];

/* ---------- data ---------- */
const dataDir = resolve(root,'_data/products');
const products = readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.startsWith('_')).map(f => JSON.parse(readFileSync(resolve(dataDir,f),'utf8')));
for (const p of products) {
  for (const img of p.images || []) if (!existsSync(resolve(root,img.path))) throw new Error(`${p.slug}: missing image ${img.path}`);
  for (const d of p.documents || []) if (!existsSync(resolve(root,d.path))) throw new Error(`${p.slug}: missing document ${d.path}`);
  for (const path of [p.diagram?.path, p.scenario?.image?.path]) if (path && !existsSync(resolve(root,path))) throw new Error(`${p.slug}: missing image ${path}`);
  for (const st of p.story || []) if (!(p.images || []).some(i => i.path === st.image)) throw new Error(`${p.slug}: story step uses an image not listed in images[]: ${st.image}`);
}
// Catalogue-only entries whose pages are not generated from data yet (kept as they are).
const legacyFile = resolve(dataDir,'_legacy.json');
const legacy = existsSync(legacyFile) ? JSON.parse(readFileSync(legacyFile,'utf8')) : [];
const all = [...products, ...legacy].sort((a,b) => FAMILY_ORDER.indexOf(a.family) - FAMILY_ORDER.indexOf(b.family) || a.name.localeCompare(b.name));
const bySlug = Object.fromEntries(all.map(p => [p.slug,p]));
// Installation photos never lead unless flagged: they show a site, not necessarily this exact device.
const heroOf = p => (p.images || []).find(i => i.useAsHero) || (p.images || []).find(i => i.kind !== 'installation') || p.hero || null;

/* ---------- shared parts ---------- */
const t = (key,tag='span',attrs='') => `<${tag} data-t="${key}"${attrs?' '+attrs:''}>${text(key)}</${tag}>`;
const header = prefix => `<a class="skip-link" href="#main" data-t="skip">${text('skip')}</a><header class="site-header"><div class="bar wrap">
<a class="brand" href="${prefix}index.html"><img src="${prefix}assets/home/logo-meiko.png" width="196" height="29" alt="Meiko Automation"></a>
<button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false">${t('menu')}</button>
<nav id="navigation" aria-label="Điều hướng chính" data-aria="ariaMain">${[['navCap',`${prefix}index.html#capabilities`],['navSol',`${prefix}index.html#solutions`],['navProd',`${prefix}products/`],['navApp',`${prefix}index.html#applications`],['navContact',`${prefix}index.html#contact`]].map(([k,h])=>`<a href="${h}" data-t="${k}">${text(k)}</a>`).join('')}
<div class="languages" role="group" aria-label="Ngôn ngữ" data-aria="ariaLang"><button type="button" data-language="vi" lang="vi" aria-label="VI, Tiếng Việt" aria-pressed="true">VI</button><button type="button" data-language="en" lang="en" aria-label="EN, English" aria-pressed="false">EN</button><button type="button" data-language="ja" lang="ja" aria-label="JP, 日本語" aria-pressed="false">JP</button></div></nav>
</div></header>`;
const footer = prefix => `<footer class="site-footer"><div class="wrap"><img src="${prefix}assets/home/logo-meiko.png" width="150" height="22" alt="Meiko Automation" loading="lazy"><span data-t="footNote">${text('footNote')}</span><a class="to-top" href="#main"><span data-t="backTop">${text('backTop')}</span><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><path d="M10 17V4M4.5 9.5 10 4l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></a></div></footer><noscript><p class="noscript-note">JavaScript đang tắt. Liên hệ / Contact: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></noscript>`;
const consult = (prefix,name) => `${prefix}index.html${name?'?product='+encodeURIComponent(name):''}#contact`;

const page = ({prefix,path,title,description,pageCopy,body,jsonLd,image}) => `<!doctype html><html lang="vi" data-root="${prefix}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${SITE}${path}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${SITE}${path}">${image?`<meta property="og:image" content="${SITE}${image}">`:''}<meta name="theme-color" content="#0b0a09"><link rel="icon" href="${prefix}assets/meiko-logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,300..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="${prefix}assets/home.css"><link rel="stylesheet" href="${prefix}assets/product.css"><link rel="modulepreload" href="${prefix}assets/home.js"><script type="application/json" id="page-copy">${JSON.stringify(pageCopy).replace(/</g,'\\u003c')}</script>${jsonLd?`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\u003c')}</script>`:''}<script type="module" src="${prefix}assets/home.js"></script></head><body>${header(prefix)}<main id="main" tabindex="-1">${body}</main>${footer(prefix)}</body></html>
`;

/* ---------- illustration for products without a verified image ---------- */
const illustration = family => family === 'automation'
  ? `<svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-opacity=".3"><rect x="40" y="50" width="120" height="100"/><path d="M40 80h120M40 120h120"/></g>${[0,1,2,3,4,5].map(i=>`<circle cx="${58+i*17}" cy="65" r="4" fill="${i===2?'#ef5a2a':'currentColor'}" fill-opacity="${i===2?1:.35}"/>`).join('')}${[0,1,2,3,4,5].map(i=>`<circle cx="${58+i*17}" cy="135" r="4" fill="currentColor" fill-opacity=".25"/>`).join('')}</svg>`
  : `<svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-opacity=".28"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="76" stroke-dasharray="2 6"/></g><circle cx="100" cy="100" r="9" fill="#ef5a2a"/></svg>`;

const disKey = img => 'dis_' + img.path.replace(/\W+/g,'_');
const media = (p,img,prefix,{hero=false}={}) => img
  ? `<figure class="pmedia k-${img.kind}${img.dark?' is-dark':''}${img.tone==='grey'?' is-grey':''}"><img src="${prefix}${img.path}" alt="${esc(img.note || p.name)}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async"><figcaption class="mono"><span class="kind-tag${img.kind==='sample'?' warn':''}" data-t="${KIND[img.kind]||'kPhoto'}">${text(KIND[img.kind]||'kPhoto')}</span>${img.disclaimer?`<span class="disclaimer" data-t="${disKey(img)}">${esc(tri(img.disclaimer)[0])}</span>`:''}</figcaption></figure>`
  : `<figure class="pmedia k-ill"><div class="ill">${illustration(p.family)}</div><figcaption class="mono"><span data-t="noPhoto">${text('noPhoto')}</span></figcaption></figure>`;

const tile = (p,prefix) => {
  const img = heroOf(p);
  const cls = !img ? 'ill' : img.kind === 'installation' ? 'cover' : img.dark ? 'is-dark' : img.tone === 'grey' ? 'is-grey' : 'studio';
  const href = p.legacyHref ? `${prefix}${p.legacyHref}` : `${prefix}products/${p.slug}/`;
  return `<article class="tile ${cls}" data-category="${p.family}"><a class="tile-link" href="${href}" tabindex="-1" aria-hidden="true"></a>
<span class="kind mono" data-t="${img?KIND[img.kind]||'kPhoto':'noPhoto'}">${text(img?KIND[img.kind]||'kPhoto':'noPhoto')}</span>
${img?`<img src="${prefix}${img.path}" alt="" loading="lazy" decoding="async">`:`<div class="ill">${illustration(p.family)}</div>`}
<div class="cap"><span class="role mono" data-t="r_${p.slug}">${esc(tri(p.role)[0])}</span><h3>${esc(p.name)}</h3>
<div class="tile-actions"><a href="${href}" data-t="details">${text('details')}</a><a href="${consult(prefix,p.name)}" data-product="${esc(p.name)}" data-t="consult">${text('consult')}</a></div></div></article>`;
};

/* ---------- product page ---------- */
function productPage(p) {
  const prefix = '../../';
  const copy = {
    title: LANGS.map(l => `${p.name} | ${(p.role[l]||p.role.vi)} | Meiko Automation R&D`),
    description: tri(p.summary).map(s => s.slice(0,158)),
    pTag: tri(p.tagline), pSum: tri(p.summary),
    fam: LANGS.map(l => text(FAMILY[p.family], l)),
  };
  (p.highlights||[]).forEach((h,i) => { copy[`h${i}t`] = tri(h.title); copy[`h${i}x`] = tri(h.text); });
  (p.applications||[]).forEach((a,i) => { copy[`a${i}`] = tri(a); });
  (p.specs||[]).forEach((s,i) => { copy[`s${i}`] = tri(s.label); if (s.value && typeof s.value === 'object') copy[`v${i}`] = tri(s.value); });
  (p.documents||[]).forEach((d,i) => { copy[`d${i}`] = tri(d.label); });
  (p.images||[]).forEach(img => { if (img.disclaimer) copy[disKey(img)] = tri(img.disclaimer); });
  for (const q of all) copy[`r_${q.slug}`] = tri(q.role);
  const hero = heroOf(p);
  const steps = storySteps(p);
  const inStory = new Set(steps.map(s => s.image));
  const gallery = (p.images||[]).filter(i => i !== hero && !inStory.has(i.path));
  const related = (p.related||[]).map(s => bySlug[s]).filter(Boolean);
  const specs = p.specs || [];
  const advanced = Boolean(p.stats || p.architecture || p.diagram || p.ioGroups || steps.length);

  // Sections in page order. Non-dark sections alternate light/mist; dark ones keep their own tone.
  const sections = [];
  const add = (id,navKey,dark,render) => sections.push({id,navKey,dark,render});
  if ((p.highlights||[]).length) add('hl','pHighlights',false,cls => `<section class="chapter ${cls}" id="hl" aria-labelledby="hl-title"><div class="wrap"><h2 id="hl-title" class="sec-title" data-t="pHighlights">${text('pHighlights')}</h2>
<ul class="hl-list">${p.highlights.map((h,i)=>`<li><span class="ref mono">0${i+1}</span><h3 data-t="h${i}t">${esc(tri(h.title)[0])}</h3><p data-t="h${i}x">${esc(tri(h.text)[0])}</p></li>`).join('')}</ul></div></section>`);
  if (p.architecture || p.diagram) add('kien-truc','pnArch',false,cls => architecture(p,copy,prefix,cls));
  if ((p.ioGroups||[]).length) add('io','pnIo',true,() => ioBlocks(p,copy));
  if (steps.length) add('hinh-anh','pGallery',true,() => story(p,copy,prefix,steps));
  if (gallery.length) add(steps.length?'anh-khac':'hinh-anh',steps.length?'pnMore':'pGallery',false,cls => `<section class="chapter ${cls}" id="${steps.length?'anh-khac':'hinh-anh'}" aria-labelledby="gal-title"><div class="wrap"><h2 id="gal-title" class="sec-title" data-t="${steps.length?'pnMore':'pGallery'}">${text(steps.length?'pnMore':'pGallery')}</h2><div class="gallery">${gallery.map(img=>media(p,img,prefix)).join('')}</div></div></section>`);
  add('thong-so','pSpecs',false,cls => `<section class="chapter ${cls}" id="thong-so" aria-labelledby="spec-title"><div class="wrap spec-grid">
<div class="spec-side"><h2 id="spec-title" class="sec-title" data-t="pSpecs">${text('pSpecs')}</h2><p class="spec-legend" data-t="${specs.length?'specLegend':'specNone'}">${text(specs.length?'specLegend':'specNone')}</p>
${(p.applications||[]).length?`<h3 class="side-title" data-t="pApplications">${text('pApplications')}</h3><ul class="apps-list">${p.applications.map((a,i)=>`<li data-t="a${i}">${esc(tri(a)[0])}</li>`).join('')}</ul>`:''}</div>
${specs.length?`<div class="spec-main"><table class="specs"><tbody>${specs.map((s,i)=>`<tr><th scope="row" data-t="s${i}">${esc(tri(s.label)[0])}</th><td${typeof s.value==='object'?` data-t="v${i}"`:''}>${esc(typeof s.value==='object'?tri(s.value)[0]:s.value)}</td><td><span class="chip ${s.status==='verified'?'chip-v':'chip-p'}" data-t="${s.status==='verified'?'specVerified':'specProvisional'}">${text(s.status==='verified'?'specVerified':'specProvisional')}</span></td></tr>`).join('')}</tbody></table>${pendingBox(p,copy)}</div>`:''}
</div></section>`);
  if (p.scenario) add('ung-dung','pApplications',true,() => scenario(p,copy,prefix));
  if ((p.documents||[]).length || (p.pendingDocs||[]).length || (p.faq||[]).length) add('tai-lieu','pnDocsFaq',false,cls => docsFaq(p,copy,prefix,cls,arrow));
  if (related.length) add('lien-quan','pRelated',false,cls => `<section class="chapter ${cls}" id="lien-quan" aria-labelledby="rel-title"><div class="wrap"><h2 id="rel-title" class="sec-title" data-t="pRelated">${text('pRelated')}</h2><div class="catalog-grid">${related.map(q=>tile(q,prefix)).join('')}</div></div></section>`);

  let prevTone = 'dark'; // the hero is dark
  const rendered = sections.map(s => {
    const tone = s.dark ? 'dark' : (prevTone === 'light' ? 'mist' : 'light');
    prevTone = tone;
    return s.render(tone);
  });
  const toc = advanced && sections.length >= 4
    ? `<nav class="subnav" data-aria="pToc" aria-label="${esc(text('pToc'))}"><div class="wrap"><ul>${sections.filter(s=>s.id!=='lien-quan'&&s.id!=='anh-khac').map(s=>`<li><a href="#${s.id}" data-t="${s.navKey}">${text(s.navKey)}</a></li>`).join('')}</ul></div></nav>`
    : '';

  const doc0 = (p.documents||[])[0];
  const body = `<section class="phero" aria-labelledby="p-title"><div class="wrap phero-grid">
<div class="phero-copy"><nav class="crumbs" aria-label="Breadcrumb"><a href="${prefix}products/" data-t="pProducts">${text('pProducts')}</a><span aria-hidden="true">/</span><span data-t="fam">${text(FAMILY[p.family])}</span></nav>
<h1 id="p-title">${esc(p.name)} <strong data-t="pTag">${esc(tri(p.tagline)[0])}</strong></h1>
<p class="lead" data-t="pSum">${esc(tri(p.summary)[0])}</p>
${p.status==='provisional'?`<p class="note-provisional" data-t="provisionalPage">${text('provisionalPage')}</p>`:''}
<div class="actions"><a class="btn btn-signal" href="${consult(prefix,p.name)}"><span data-t="ctaConsult">${text('ctaConsult')}</span>${arrow}</a>${doc0?`<a class="btn btn-ghost" href="${prefix}${doc0.path}" target="_blank" rel="noopener"><span data-t="d0">${esc(tri(doc0.label)[0])}</span></a>`:(p.stats?`<a class="btn btn-ghost" href="#thong-so"><span data-t="pSeeSpecs">${text('pSeeSpecs')}</span></a>`:'')}</div></div>
<div class="phero-media">${media(p,hero,prefix,{hero:true})}</div>
</div>${statsRail(p,copy)}</section>
${toc}${rendered.join('\n')}
<section class="pcta darkest"><div class="wrap"><p data-t="pCtaHead">${text('pCtaHead')}</p><a class="btn btn-signal" href="${consult(prefix,p.name)}"><span data-t="ctaConsult">${text('ctaConsult')}</span>${arrow}</a></div></section>${steps.length?`<script>document.documentElement.classList.add('js')</script><script type="module" src="${prefix}assets/product.js"></script>`:''}`;

  return page({prefix, path:`products/${p.slug}/`, title:copy.title[0], description:copy.description[0], pageCopy:copy, body, image: hero?.path,
    jsonLd:{'@context':'https://schema.org','@type':'Product',name:p.name,description:copy.description[0],brand:{'@type':'Brand',name:'Meiko Automation'},url:`${SITE}products/${p.slug}/`,...(hero?{image:`${SITE}${hero.path}`}:{})}});
}

/* ---------- catalogue page ---------- */
function catalogPage() {
  const prefix = '../';
  const copy = {title: ['Sản phẩm | Meiko Automation R&D','Products | Meiko Automation R&D','製品 | Meiko Automation R&D'], description: LANGS.map(l => text('catalogLead', l))};
  for (const q of all) copy[`r_${q.slug}`] = tri(q.role);
  const fams = FAMILY_ORDER.filter(f => all.some(p => p.family === f));
  const body = `<section class="phero phero-slim" aria-labelledby="cat-title"><div class="wrap"><h1 id="cat-title" data-t="catalogHead">${text('catalogHead')}</h1><p class="lead" data-t="catalogLead">${text('catalogLead')}</p></div></section>
<section class="chapter mist"><div class="wrap"><div class="filters" role="group" aria-label="Nhóm sản phẩm" data-aria="ariaGroups"><button type="button" data-filter="all" aria-pressed="true" data-t="fAll">${text('fAll')}</button>${fams.map(f=>`<button type="button" data-filter="${f}" aria-pressed="false" data-t="${FAMILY[f]}">${text(FAMILY[f])}</button>`).join('')}</div>
<p class="sr-only" id="results-status" role="status"></p>
<h2 class="sr-only" data-t="pProducts">${text('pProducts')}</h2>
<div class="catalog-grid" id="mosaic">${all.map(p=>tile(p,prefix)).join('')}</div></div></section>
<section class="pcta darkest"><div class="wrap"><p data-t="odmCta">${text('odmCta')}</p><a class="btn btn-signal" href="${consult(prefix,'')}"><span data-t="odmBtn">${text('odmBtn')}</span>${arrow}</a></div></section>`;
  return page({prefix, path:'products/', title:copy.title[0], description:copy.description[0], pageCopy:copy, body});
}

/* ---------- write ---------- */
for (const p of products) {
  const dir = resolve(root,'products',p.slug); mkdirSync(dir,{recursive:true});
  writeFileSync(resolve(dir,'index.html'), productPage(p));
}
writeFileSync(resolve(root,'products/index.html'), catalogPage());
const urls = ['', 'products/', ...products.map(p=>`products/${p.slug}/`), ...legacy.filter(p=>p.legacyHref).map(p=>p.legacyHref)];
writeFileSync(resolve(root,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(urls)].map(u=>`  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built ${products.length} product pages, the catalogue and sitemap (${new Set(urls).size} URLs).`);
