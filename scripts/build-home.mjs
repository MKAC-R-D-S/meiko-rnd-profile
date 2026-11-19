// Builds index.html (the homepage) only. Product detail pages are not touched.
// Run: node scripts/build-home.mjs
// Direction: Premium Industrial Technology, Advanced Engineering Showcase (dark cinematic hero,
// clean premium capabilities and products, industrial-intelligence solutions diagram).
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {text} from '../assets/home-copy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const t = (key,tag='span',attrs='') => `<${tag} data-t="${key}"${attrs?' '+attrs:''}>${text(key)}</${tag}>`;
const consultHref = name => `index.html${name?'?product='+encodeURIComponent(name):''}#contact`;
const arrow = '<svg class="arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>';
const EMAIL = 'duc.vuminh@meiko.vn'; // TODO: replace with a shared mailbox when available

/* ---------- header ---------- */
const navItems = [['navCap','capabilities'],['navSol','solutions'],['navProd','products'],['navApp','applications'],['navContact','contact']];
const header = `<header class="site-header"><div class="bar wrap">
<a class="brand" href="index.html"><img src="assets/home/logo-meiko.png" width="196" height="29" alt="Meiko Automation" fetchpriority="high"></a>
<button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false">${t('menu')}</button>
<nav id="navigation" aria-label="Điều hướng chính" data-aria="ariaMain">${navItems.map(([k,id])=>`<a href="#${id}" data-t="${k}">${text(k)}</a>`).join('')}
<div class="languages" role="group" aria-label="Ngôn ngữ" data-aria="ariaLang"><button type="button" data-language="vi" lang="vi" aria-label="VI, Tiếng Việt" aria-pressed="true">VI</button><button type="button" data-language="en" lang="en" aria-label="EN, English" aria-pressed="false">EN</button><button type="button" data-language="ja" lang="ja" aria-label="JP, 日本語" aria-pressed="false">JP</button></div></nav>
</div></header>`;

/* ---------- hero: precision object ---------- */
const rail = [['Embedded Hardware','r1v'],['Firmware','r2v'],['Industrial IoT','r3v'],['Automation','r4v'],['ODM/OEM','r5v']];
const hero = `<section class="hero" aria-labelledby="hero-title">
<div class="stage" aria-hidden="true"><div class="glow"></div><div class="board"><img src="assets/home/pcb-board.jpg" width="1100" height="1667" alt="" fetchpriority="high" decoding="async"></div></div>
<div class="wrap hero-copy"><h1 id="hero-title" data-t="heroTitle">${text('heroTitle')}</h1><p class="lead" data-t="heroALead">${text('heroALead')}</p>
<div class="actions"><a class="btn btn-signal" href="#contact"><span data-t="ctaConsult">${text('ctaConsult')}</span>${arrow}</a><a class="btn btn-ghost" href="#capabilities" data-t="ctaCap">${text('ctaCap')}</a></div>
<p class="fig mono"><b>FIG.01</b><span data-t="heroAFig">${text('heroAFig')}</span></p></div>
<div class="rail"><ul class="wrap" aria-label="Lĩnh vực R&D của Meiko" data-aria="ariaTags">${rail.map(([k,v])=>`<li><span class="k">${k}</span><span class="v" data-t="${v}">${text(v)}</span></li>`).join('')}</ul></div>
</section>`;

/* ---------- 01 capabilities: clean premium ---------- */
const capabilities = `<section class="chapter light" id="capabilities" aria-labelledby="cap-title"><div class="wrap">
<div class="head"><h2 id="cap-title" data-t="capHead2">${text('capHead2')}</h2><p class="lead" data-t="capLead">${text('capLead')}</p></div>
<div class="cap-grid">
 <figure class="plate studio plate-jig"><img src="assets/home/jig-studio.jpg" width="985" height="787" alt="Mô hình CAD của JIG kiểm thử" loading="lazy" decoding="async"><figcaption class="mono"><b>CAD</b><span data-t="figJig">${text('figJig')}</span></figcaption></figure>
 <figure class="plate dark plate-pcb"><img src="assets/home/pcb-board.jpg" width="1100" height="1667" alt="" loading="lazy" decoding="async"><figcaption class="mono"><b>3D</b><span data-t="figPcbDetail">${text('figPcbDetail')}</span></figcaption></figure>
 <ol class="flow">${[1,2,3,4].map(n=>`<li><span class="ref mono">0${n}</span><h3 data-t="flow${n}">${text('flow'+n)}</h3><p data-t="flow${n}d">${text('flow'+n+'d')}</p></li>`).join('')}</ol>
 <div class="facts-wrap"><dl class="facts"><div><dt data-t="factYear">${text('factYear')}</dt><dd>2019</dd></div><div><dt data-t="factStaff">${text('factStaff')}</dt><dd>170</dd></div><div><dt data-t="factSmt">${text('factSmt')}</dt><dd>14</dd></div></dl><p class="source" data-t="factSource">${text('factSource')}</p></div>
</div></div></section>`;

/* ---------- 02 solutions: industrial intelligence ---------- */
const node = (id,step,title,kind,body,cls='') => `<div class="node ${cls}" id="${id}"><span class="step mono" data-t="${step}">${text(step)}</span>${body}<div class="meta"><strong data-t="${title}">${text(title)}</strong><span class="mono" data-t="${kind}">${text(kind)}</span></div></div>`;
const dash = `<div class="dash" aria-hidden="true"><div class="bars"><i style="--h:40%"></i><i style="--h:62%"></i><i style="--h:48%"></i><i style="--h:70%"></i><i style="--h:92%"></i><i style="--h:55%"></i></div></div>`;
const groups = [['g1','iot'],['g2','test'],['g3','special'],['g4','']];
const solutions = `<section class="chapter dark" id="solutions" aria-labelledby="sol-title"><div class="wrap sol-grid">
<div class="sol-copy"><h2 id="sol-title" data-t="solHead2">${text('solHead2')}</h2><p class="lead" data-t="solLead2">${text('solLead2')}</p>
<ul class="groups">${groups.map(([k,f],i)=>`<li><a href="${f?'#products':'#contact'}"${f?` data-jump-filter="${f}"`:''}><span class="ref mono">G${i+1}</span><span class="g-name" data-t="${k}">${text(k)}</span><span class="g-desc" data-t="${k}d">${text(k+'d')}</span>${arrow}</a></li>`).join('')}</ul></div>
<figure class="arch" aria-label="${text('archCap')}" data-aria="archCap"><svg class="wires" aria-hidden="true"><g id="wires"></g></svg>
${node('nA','n1','n1t','kPhoto','<div class="pic"><img src="assets/home/mesi-studio.jpg" width="1400" height="1050" alt="" loading="lazy" decoding="async"></div>')}
${node('nB','n2','n2t','k3d','<div class="pic pic-dark"><img src="assets/home/pcb-board.jpg" width="1100" height="1667" alt="" loading="lazy" decoding="async"></div>')}
${node('nC','n3','n3t','kIll',dash)}
${node('nD','n4','n4t','kInstall','<div class="pic"><img src="assets/home/site-alert-tower.jpg" width="1000" height="791" alt="" loading="lazy" decoding="async"></div>')}
<figcaption class="arch-cap mono" data-t="archCap">${text('archCap')}</figcaption></figure>
</div></section>`;

/* ---------- 03 products: collection mosaic ---------- */
const illAlert = `<svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-opacity=".28"><circle cx="100" cy="100" r="30"/><circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="76" stroke-dasharray="2 6"/></g><circle cx="72" cy="100" r="9" fill="#ef5a2a"/><circle cx="100" cy="100" r="9" fill="currentColor" fill-opacity=".35"/><circle cx="128" cy="100" r="9" fill="currentColor" fill-opacity=".2"/></svg>`;
const illTemp = `<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="heat" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ef5a2a" stop-opacity=".75"/><stop offset=".6" stop-color="#e9a13a" stop-opacity=".25"/><stop offset="1" stop-color="#e9a13a" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="80" fill="url(#heat)"/><g fill="none" stroke="currentColor" stroke-opacity=".3"><path d="M30 100c20-30 50-30 70 0s50 30 70 0"/><path d="M30 120c20-30 50-30 70 0s50 30 70 0" stroke-dasharray="3 5"/><path d="M30 80c20-30 50-30 70 0s50 30 70 0" stroke-dasharray="3 5"/></g></svg>`;
const products = [
 {code:'MESI-V1',slug:'mesi-v1',cat:'iot',role:'roleEnergy',desc:'mesiDesc',kind:'kPhoto',img:'assets/home/mesi-studio.jpg',w:1400,h:1050,cls:'t-a big studio'},
 {code:'MGWI-V1',slug:'mgwi-v1',cat:'iot',role:'roleGateway',kind:'k3d',img:'assets/home/pcb-board.jpg',w:1100,h:1667,cls:'t-b dark'},
 {code:'Tool / JIG',slug:'tool-jig',cat:'test',role:'roleTest',kind:'kCad',img:'assets/home/jig-studio.jpg',w:985,h:787,cls:'t-c studio'},
 {code:'TingBox',slug:'tingbox',cat:'special',role:'rolePay',kind:'kPhoto',img:'assets/home/tingbox-body.jpg',w:900,h:589,cls:'t-e cover'},
 {code:'MGAW-V1',slug:'mgaw-v1',cat:'iot',role:'roleAlert',kind:'noPhoto',ill:illAlert,cls:'t-d ill'},
 {code:'MTSI-V1',slug:'mtsi-v1',cat:'iot',role:'roleTemp',desc:'mtsiHome',kind:'noPhoto',ill:illTemp,cls:'t-f ill'},
 {code:'BiPAP',slug:'bipap',cat:'special',role:'roleMed',kind:'kPhoto',img:'assets/home/bipap-studio.jpg',w:900,h:1200,cls:'t-g cover'},
];
const tile = p => `<article class="tile ${p.cls}" data-category="${p.cat}"><a class="tile-link" href="products/${p.slug}/" tabindex="-1" aria-hidden="true"></a>
<span class="kind mono" data-t="${p.kind}">${text(p.kind)}</span>
${p.ill?`<div class="ill">${p.ill}</div>`:`<img src="${p.img}" width="${p.w}" height="${p.h}" alt="" loading="lazy" decoding="async">`}
<div class="cap"><span class="role mono" data-t="${p.role}">${text(p.role)}</span><h3>${p.code}</h3>${p.desc?`<p data-t="${p.desc}">${text(p.desc)}</p>`:''}
<div class="tile-actions"><a href="products/${p.slug}/" data-t="details">${text('details')}</a><a href="${consultHref(p.code)}" data-product="${p.code}" data-t="consult">${text('consult')}</a></div></div></article>`;
const productSection = `<section class="chapter mist" id="products" aria-labelledby="prod-title"><div class="wrap">
<div class="head head-row"><h2 id="prod-title" data-t="prodHead2">${text('prodHead2')}</h2>
<div class="filters" role="group" aria-label="Nhóm sản phẩm" data-aria="ariaGroups">${[['all','fAll'],['iot','fIot'],['test','fTest'],['special','fSpecial']].map(([f,k],i)=>`<button type="button" data-filter="${f}" aria-pressed="${i===0}" data-t="${k}">${text(k)}</button>`).join('')}</div></div>
<p class="sr-only" id="results-status" role="status"></p>
<p class="see-all"><a class="text-link" href="products/"><span data-t="seeAll">${text('seeAll')}</span>${arrow}</a></p>
<div class="mosaic" id="mosaic">${products.map(tile).join('')}
<div class="tile t-h odm"><p data-t="odmCta">${text('odmCta')}</p><a class="btn btn-signal" href="#contact"><span data-t="odmBtn">${text('odmBtn')}</span>${arrow}</a></div></div>
</div></section>`;

/* ---------- 04 applications: cinematic ---------- */
const apps = [
 {k:'operations',txt:'operationsText',img:'assets/home/site-alert-tower.jpg',w:1000,h:791,cap:'appInstall',cls:'a-1',alt:'Loa và đèn cảnh báo gắn tường trong nhà xưởng'},
 {k:'data',txt:'dataText',img:'assets/home/site-gateway.jpg',w:1000,h:750,cap:'appInstall',cls:'a-2',alt:'IoT Gateway Meiko gắn trên tường'},
 {k:'energy',txt:'energyText',img:'assets/home/mesi-studio.jpg',w:1400,h:1050,cap:'appPhoto',cls:'a-3 crop-ct',alt:'Thiết bị đo năng lượng MESI-V1 với ba cảm biến CT'},
];
const applications = `<section class="chapter darkest" id="applications" aria-labelledby="app-title"><div class="wrap">
<div class="head"><h2 id="app-title" data-t="appHead2">${text('appHead2')}</h2><p class="lead" data-t="appLead">${text('appLead')}</p></div>
<ul class="apps">${apps.map((a,i)=>`<li class="app ${a.cls}"><figure><div class="frame"><img src="${a.img}" width="${a.w}" height="${a.h}" alt="${a.alt}" loading="lazy" decoding="async"></div><figcaption class="mono"><b>0${i+1}</b><span data-t="${a.cap}">${text(a.cap)}</span></figcaption></figure><h3 data-t="${a.k}">${text(a.k)}</h3><p data-t="${a.txt}">${text(a.txt)}</p></li>`).join('')}</ul>
</div></section>`;

/* ---------- 05 contact ---------- */
const opts = ['MESI-V1','MGAW-V1','MGWI-V1','MTSI-V1','Modbus reader','Sensor IoT','TingBox','BiPAP','Tool / JIG'];
const field = (key,name,type='text',extra='') => `<label><span data-t="${key}">${text(key)}</span><input type="${type}" name="${name}" ${extra}></label>`;
const contact = `<section class="chapter light" id="contact" aria-labelledby="contact-title"><div class="wrap contact-layout">
<div class="contact-copy"><h2 id="contact-title" data-t="contactHead2">${text('contactHead2')}</h2><p class="lead" data-t="contactDesc">${text('contactDesc')}</p>
<a class="contact-email" href="mailto:${EMAIL}">${EMAIL}</a><address data-t="address">${text('address')}</address><a class="text-link" href="https://meiko-auto.vn/" target="_blank" rel="noopener noreferrer">meiko-auto.vn ${arrow}</a></div>
<form id="contact-form" novalidate><div class="form-row">${field('name','name','text','autocomplete="name" required maxlength="120"')}${field('company','company','text','autocomplete="organization" required maxlength="180"')}</div>
<div class="form-row"><label><span>Email</span><input type="email" name="email" autocomplete="email" maxlength="254" aria-describedby="contact-hint"></label>${field('phone','phone','tel','autocomplete="tel" maxlength="40" aria-describedby="contact-hint"')}</div>
<p id="contact-hint" class="form-hint" data-t="contactHint">${text('contactHint')}</p>
<label><span data-t="productLabel">${text('productLabel')}</span><select name="product" id="contact-product"><option value="" data-t="general">${text('general')}</option>${opts.map(o=>`<option>${o}</option>`).join('')}</select></label>
<label><span data-t="needs">${text('needs')}</span><textarea name="message" rows="4" required maxlength="5000"></textarea></label>
<p class="form-hint" data-t="privacy">${text('privacy')}</p><button class="btn btn-signal" type="submit" data-t="send">${text('send')}</button><p id="form-status" role="status" aria-live="polite"></p></form>
</div></section>`;

const footer = `<footer class="site-footer"><div class="wrap"><img src="assets/home/logo-meiko.png" width="150" height="22" alt="Meiko Automation" loading="lazy"><span data-t="footNote">${text('footNote')}</span><a class="to-top" href="#main"><span data-t="backTop">${text('backTop')}</span><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><path d="M10 17V4M4.5 9.5 10 4l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg></a></div></footer><noscript><p class="noscript-note">JavaScript đang tắt. Liên hệ / Contact: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></noscript>`;

const jsonLd = JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'Meiko Automation R&D Center',url:'https://mkac-r-d-s.github.io/meiko-rnd-profile/',address:{'@type':'PostalAddress',streetAddress:'Lô CN9, KCN Thạch Thất – Quốc Oai',addressLocality:'Hà Nội',addressCountry:'VN'}});

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${text('title')}</title><meta name="description" content="${text('description')}"><meta property="og:title" content="${text('title')}"><meta property="og:description" content="${text('description')}"><meta property="og:type" content="website"><meta name="theme-color" content="#0b0a09"><link rel="icon" href="assets/meiko-logo.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://api.emailjs.com"><link rel="preload" as="image" href="assets/home/pcb-board.jpg"><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,300..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/home.css"><link rel="modulepreload" href="assets/home.js"><link rel="modulepreload" href="assets/home-copy.mjs"><script type="application/ld+json">${jsonLd}</script><script type="module" src="assets/home.js"></script></head><body><a class="skip-link" href="#main" data-t="skip">${text('skip')}</a>${header}<main id="main" tabindex="-1">${hero}${capabilities}${solutions}${productSection}${applications}${contact}</main>${footer}</body></html>
`;

writeFileSync(resolve(root,'index.html'),html);
console.log(`Built index.html (${html.length} bytes).`);
