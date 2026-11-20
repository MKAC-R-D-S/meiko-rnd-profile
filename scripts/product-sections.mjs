// Optional, data-driven product page sections (stats rail, architecture, diagram, I/O blocks,
// scroll story, scenario, FAQ). Every section renders only when its field exists in the product JSON,
// so a product with just the basic fields still gets a complete page.
// Every translatable string is registered into `copy` under a data-t key (vi/en/ja).
import {text} from '../assets/home-copy.mjs';

const LANGS = ['vi','en','ja'];
export const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export const tri = o => LANGS.map(l => (o && (o[l] || o.vi)) || '');
const pad = n => String(n).padStart(2,'0');
const KIND_KEY = {photo:'kPhoto', render3d:'k3d', cad:'kCad', installation:'kInstall', diagram:'kDiagram', sample:'kSample', ai:'kAi'};
const kindKey = k => KIND_KEY[k] || 'kPhoto';

/** Registers a trilingual value and returns the element markup. */
export const tx = (copy,key,o,{tag='span',cls='',raw=false}={}) => {
  copy[key] = tri(o);
  return `<${tag}${cls?` class="${cls}"`:''} data-t="${key}">${raw?copy[key][0]:esc(copy[key][0])}</${tag}>`;
};
const textOf = (copy,key,o) => { copy[key] = tri(o); return esc(copy[key][0]); };
const tagFor = kind => `<span class="kind-tag${kind==='sample'?' warn':''}" data-t="${kindKey(kind)}">${text(kindKey(kind))}</span>`;

/* ---------- stats rail (inside hero) ---------- */
export function statsRail(p,copy) {
  if (!(p.stats||[]).length) return '';
  const items = p.stats.map((s,i) => `<li><span class="n">${esc(s.value)}${s.unit?`<small>${esc(s.unit)}</small>`:''}</span>${tx(copy,`st${i}`,s.label,{cls:'l'})}</li>`).join('');
  return `<div class="keyrail"><div class="wrap"><ul data-aria="pStatsAria" aria-label="${esc(text('pStatsAria'))}">${items}</ul>${p.statsNote?tx(copy,'stNote',p.statsNote,{tag:'p',cls:'keyrail-note'}):''}</div></div>`;
}

/* ---------- diagram figure ---------- */
function diagramFigure(p,copy,prefix) {
  const d = p.diagram; if (!d) return '';
  copy.dgAlt = tri(d.alt);
  return `<figure class="diagram"><a href="${prefix}${d.path}" target="_blank" rel="noopener"><img src="${prefix}${d.path}" alt="${esc(copy.dgAlt[0])}" loading="lazy" decoding="async"></a><figcaption>${tagFor(d.kind||'diagram')}${d.caption?tx(copy,'dgCap',d.caption):''}<span data-t="pZoom">${text('pZoom')}</span></figcaption></figure>`;
}

/* ---------- architecture: boards + diagram ---------- */
export function architecture(p,copy,prefix,cls) {
  const a = p.architecture; if (!a && !p.diagram) return '';
  const boards = (a?.boards||[]).map((b,i) => `<article class="board-card"><span class="mono rev">${esc(b.rev)}</span><h3>${esc(b.name)}</h3><ul>${(b.items||[]).map((it,j)=>`<li>${tx(copy,`ab${i}i${j}`,it)}</li>`).join('')}</ul></article>`);
  const joined = boards.length === 2
    ? `<div class="twoboards">${boards[0]}<div class="joint" aria-hidden="true"><span class="mono">${esc(a.joint||'')}</span></div>${boards[1]}</div>`
    : boards.length ? `<div class="board-row">${boards.join('')}</div>` : '';
  const titled = Boolean(a?.title);
  const head = titled
    ? `<div class="head"><h2 id="arch-title">${tx(copy,'archTitle',a.title,{raw:true})}</h2>${a.lead?tx(copy,'archLead',a.lead,{tag:'p',cls:'lead'}):''}</div>`
    : `<h2 id="arch-title" class="sr-only" data-t="pnArch">${text('pnArch')}</h2>`;
  return `<section class="chapter ${cls}" id="kien-truc" aria-labelledby="arch-title"><div class="wrap">${head}<div class="arch-a">${diagramFigure(p,copy,prefix)}${joined}</div></div></section>`;
}

/* ---------- I/O blocks ---------- */
const cellList = (cells,cls,cols) => `<ol class="cells" style="--cols:${cols}">${cells.map(c=>`<li class="${esc(cls||'')}">${esc(c)}</li>`).join('')}</ol>`;
function cellGroups(g,copy,i) {
  const groups = g.groups || [];
  if (g.columns) {
    const legend = (g.legend||[]).length ? `<div class="legend">${g.legend.map((l,j)=>`<span><i class="${esc(l.cls)}"></i>${tx(copy,`io${i}lg${j}`,l.label)}</span>`).join('')}</div>` : '';
    const all = groups.flatMap(x => x.cells.map(c => `<li class="${esc(x.cls||'')}">${esc(c)}</li>`)).join('');
    return `<ol class="cells" style="--cols:${Number(g.columns)}" aria-label="${esc(g.ariaLabel||'')}">${all}</ol>${legend}`;
  }
  return `<div class="groups-row" style="--g:${groups.length}">${groups.map(x=>`<figure>${cellList(x.cells,x.cls,x.cells.length)}${x.label?`<figcaption class="mono">${esc(x.label)}</figcaption>`:''}</figure>`).join('')}</div>`;
}
function ioBody(g,copy,i) {
  if (g.type === 'slots') return `<ul class="adc-slots" aria-label="${esc(g.ariaLabel||'')}">${g.slots.map(s=>`<li><span>${esc(s)}</span><span></span></li>`).join('')}</ul>`;
  if (g.type === 'chips') return `<ul class="chips">${g.chips.map((c,j)=>`<li>${tx(copy,`io${i}c${j}`,c.t)}${c.sub?tx(copy,`io${i}s${j}`,c.sub,{tag:'small'}):''}</li>`).join('')}</ul>`;
  if (g.type === 'kv') return `<dl class="kv">${g.rows.map((r,j)=>`<div><dt>${tx(copy,`io${i}k${j}`,r.k)}</dt><dd>${tx(copy,`io${i}v${j}`,r.v)}</dd></div>`).join('')}</dl>`;
  return cellGroups(g,copy,i);
}
export function ioBlocks(p,copy) {
  const groups = p.ioGroups; if (!(groups||[]).length) return '';
  const cards = groups.map((g,i) => `<article class="io-card w${[4,8,12].includes(g.w)?g.w:4}" aria-labelledby="io-t${i}"><h3 id="io-t${i}">${g.count?`<span class="count">${esc(g.count)}</span>`:''}${tx(copy,`io${i}t`,g.title)}${g.badge===false?'':`<span class="provisional" data-t="specProvisional">${text('specProvisional')}</span>`}</h3>${ioBody(g,copy,i)}${g.note||g.pending?`<p class="meta">${g.note?tx(copy,`io${i}n`,g.note):''}${g.pending?` ${tx(copy,`io${i}p`,g.pending,{cls:'pending'})}`:''}</p>`:''}</article>`).join('');
  return `<section class="chapter dark" id="io" aria-labelledby="io-title"><div class="wrap"><div class="head"><h2 id="io-title" data-t="pIoHead">${text('pIoHead')}</h2>${p.ioLead?tx(copy,'ioLead',p.ioLead,{tag:'p',cls:'lead'}):''}</div><div class="io-grid">${cards}</div></div></section>`;
}

/* ---------- scroll story (sticky media) ---------- */
const stageTone = img => img.tone === 'grey' ? 'is-grey' : img.dark ? 'is-dark' : img.kind === 'installation' ? 'is-photo' : 'is-studio';

/** Steps for the story: explicit `story[]`, or one step per non-installation image when there are >=4. */
export function storySteps(p) {
  const imgs = (p.images||[]).filter(i => i.kind !== 'installation');
  if ((p.story||[]).length) return p.story.map(s => ({...s, img:(p.images||[]).find(i=>i.path===s.image)})).filter(s => s.img);
  if (imgs.length >= 4) return imgs.map(i => ({image:i.path, img:i, cap:i.caption, title:i.caption}));
  return [];
}

export function story(p,copy,prefix,steps) {
  if (!steps.length) return '';
  const slides = [...new Map(steps.map(s => [s.image,s.img])).values()];
  const stage = slides.map((img,i) => `<div class="slide ${stageTone(img)}${i===0?' on':''}" data-path="${esc(img.path)}"><img src="${prefix}${img.path}" alt="${esc(img.note||p.name)}"${i===0?'':' loading="lazy"'} decoding="async"></div>`).join('');
  const kindOf = s => s.kind || s.img.kind;
  const capKey = (s,i) => s.cap ? `sc${i}` : kindKey(kindOf(s));
  const capText = (s,i) => s.cap ? textOf(copy,`sc${i}`,s.cap) : esc(text(kindKey(kindOf(s))));
  const first = steps[0];
  const layers = p.storyLayers || [];
  const layerBtns = layers.length ? `<div class="layer" role="group" data-aria="pLayerAria" aria-label="${esc(text('pLayerAria'))}"><span class="mono" data-t="pLayer">${text('pLayer')}</span>${layers.map((l,i)=>`<button type="button" data-step="${Number(l.step)}" data-layer="${i}" aria-pressed="${i===0}">${tx(copy,`ly${i}`,l.label)}</button>`).join('')}<p class="layer-info" aria-live="polite">${layers.map((l,i)=>`<span data-layer-info="${i}"${i?' hidden':''}>${tx(copy,`ly${i}i`,l.info)}</span>`).join('')}</p></div>` : '';
  const ticks = `<div class="ticks" aria-hidden="true">${steps.map((_,i)=>`<i${i?'':' class="on"'}></i>`).join('')}</div>`;
  const stepHtml = steps.map((s,i) => {
    const kk = kindKey(kindOf(s));
    return `<article class="step" data-slide="${esc(s.image)}" data-layer="${s.layer ?? ''}" aria-labelledby="stp${i}"><span class="mono ref">${pad(i+1)} · <span class="cap-src" data-t="${capKey(s,i)}">${capText(s,i)}</span></span><span hidden class="kind-src" data-t="${kk}">${text(kk)}</span>
<h3 id="stp${i}" class="step-title">${s.title?tx(copy,`stt${i}`,s.title):`<span data-t="${kk}">${text(kk)}</span>`}</h3>${s.text?tx(copy,`stx${i}`,s.text,{tag:'p'}):''}${(s.items||[]).length?`<ul>${s.items.map((it,j)=>`<li>${tx(copy,`sti${i}_${j}`,it.t)}${it.sub?tx(copy,`sts${i}_${j}`,it.sub,{tag:'small'}):''}</li>`).join('')}</ul>`:''}${s.note?tx(copy,`stn${i}`,s.note,{tag:'p',cls:'note-provisional'}):''}<figure class="stepimg ${stageTone(s.img)}"><img src="${prefix}${s.img.path}" alt="${esc(s.img.note||p.name)}" loading="lazy" decoding="async"></figure></article>`;
  }).join('');
  const kk0 = kindKey(kindOf(first));
  return `<section class="chapter dark story-sec" id="hinh-anh" aria-labelledby="story-title"><div class="wrap"><div class="head"><h2 id="story-title" data-t="pStoryHead">${text('pStoryHead')}</h2><p class="lead" data-t="pStoryLead">${text('pStoryLead')}</p></div></div>
<div class="wrap story-grid"><div class="stage-col"><div class="viewport" data-story-stage>${stage}<div class="hud" aria-hidden="true"><div class="l"><span class="kind-tag" data-hud-kind>${text(kk0)}</span><span class="cap" data-hud-cap>${capText(first,0)}</span></div><span class="idx" data-hud-idx>${pad(1)} / ${pad(steps.length)}</span></div></div>${layerBtns}${ticks}</div>
<div class="steps-col" role="group" data-aria="pStoryAria" aria-label="${esc(text('pStoryAria'))}">${stepHtml}</div></div></section>`;
}

/* ---------- scenario ---------- */
export function scenario(p,copy,prefix) {
  const s = p.scenario; if (!s) return '';
  copy.scAlt = tri(s.image?.alt);
  const img = s.image ? `<figure class="diagram"><img src="${prefix}${s.image.path}" alt="${esc(copy.scAlt[0])}" loading="lazy" decoding="async"><figcaption>${tagFor(s.image.kind||'diagram')}${s.image.caption?tx(copy,'scCap',s.image.caption):''}</figcaption></figure>` : '';
  return `<section class="chapter dark" id="ung-dung" aria-labelledby="sc-title"><div class="wrap scenario"><div><h2 id="sc-title">${tx(copy,'scTitle',s.title,{raw:true})}</h2>${s.lead?tx(copy,'scLead',s.lead,{tag:'p',cls:'lead'}):''}${(s.steps||[]).length?`<ol class="flow-s">${s.steps.map((x,i)=>`<li>${tx(copy,`scs${i}`,x)}</li>`).join('')}</ol>`:''}${s.caveat?tx(copy,'scCav',s.caveat,{tag:'p',cls:'caveat'}):''}</div>${img}</div></section>`;
}

/* ---------- documents + FAQ ---------- */
export function docsFaq(p,copy,prefix,cls,arrow) {
  const docs = p.documents||[], pend = p.pendingDocs||[], faq = p.faq||[];
  if (!docs.length && !pend.length && !faq.length) return '';
  const linkRows = docs.length ? `<ul class="doc-list">${docs.map((d,i)=>`<li><a href="${prefix}${d.path}" target="_blank" rel="noopener"><span class="mono">${esc(String(d.type).toUpperCase())}</span><strong data-t="d${i}">${esc(copy[`d${i}`][0])}</strong>${arrow}</a></li>`).join('')}</ul>` : '';
  const pendRows = pend.length ? `<ul class="doc-rows">${pend.map((d,i)=>`<li><strong>${tx(copy,`pd${i}`,d.label)}</strong><span class="provisional">${esc(d.badge||'DRAFT')}</span></li>`).join('')}</ul><p class="doc-note" data-t="pDocsPending">${text('pDocsPending')}</p>` : '';
  const hasDocs = docs.length || pend.length;
  const docsCol = hasDocs ? `<div><h2 id="doc-title" class="sec-title" data-t="pDocs">${text('pDocs')}</h2>${linkRows}${pendRows}</div>` : '';
  const faqCol = faq.length ? `<div class="faq"><h2 class="sec-title${hasDocs?' sr-only':''}" id="faq-title" data-t="pFaq">${text('pFaq')}</h2>${faq.map((f,i)=>`<details><summary>${tx(copy,`fq${i}`,f.q)}</summary><p>${tx(copy,`fa${i}`,f.a)}</p></details>`).join('')}</div>` : '';
  return `<section class="chapter ${cls} docs-sec" id="tai-lieu" aria-labelledby="${hasDocs?'doc-title':'faq-title'}"><div class="wrap${hasDocs&&faq.length?' docs-faq':''}">${docsCol}${faqCol}</div></section>`;
}

/* ---------- pending specs box ---------- */
export function pendingBox(p,copy) {
  if (!(p.pending||[]).length) return '';
  return `<div class="pending-box"><strong data-t="pPendingHead">${text('pPendingHead')}</strong><ul>${p.pending.map((x,i)=>`<li>${tx(copy,`pn${i}`,x)}</li>`).join('')}</ul></div>`;
}
