import {text,localeIndex} from './site-copy.mjs';
import {setupRoad} from './road.js';
let lang='vi',filter='all',solution='energy',formState='';
try{const saved=localStorage.getItem('preferred-lang');lang=saved==='jp'?'ja':saved in localeIndex?saved:'vi';}catch{}
const tr=key=>text(key,lang);
const form=document.getElementById('contact-form');
const status=document.getElementById('form-status');
const search=document.getElementById('product-search');
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
function updateProducts(){if(!search)return;let count=0;const query=normalize(search.value.trim());document.querySelectorAll('.product-card').forEach(card=>{card.hidden=!(filter==='all'||card.dataset.category===filter)||!normalize(card.dataset.search).includes(query);if(!card.hidden)count++;});document.getElementById('no-results').hidden=count>0;document.getElementById('results-status').textContent=`${count} ${tr('resultCount')}`;}
function updateSolution(){const title=document.getElementById('solution-title');if(!title)return;title.dataset.t=solution+'Title';title.innerHTML=tr(solution+'Title');const desc=document.getElementById('solution-description');desc.dataset.t=solution+'Text';desc.textContent=tr(solution+'Text');document.getElementById('solution-products').textContent={energy:'MESI-V1 + MGWI-V1',operations:'MGAW-V1',data:'Modbus reader + MGWI-V1'}[solution];}
function applyLanguage(code){lang=code;document.documentElement.lang=code;const product=document.querySelector('[data-product-page]')?.dataset.productPage;document.title=product?`${product} | Meiko Automation R&D`:tr('title');document.querySelector('meta[name="description"]').content=tr('description');document.querySelector('meta[property="og:title"]').content=document.title;document.querySelector('meta[property="og:description"]').content=tr('description');document.querySelectorAll('[data-t]').forEach(el=>{el.innerHTML=tr(el.dataset.t);});document.querySelectorAll('[data-placeholder]').forEach(el=>el.placeholder=tr(el.dataset.placeholder));document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===code)));try{localStorage.setItem('preferred-lang',code);}catch{}updateSolution();updateProducts();if(status&&formState)status.textContent=tr(formState);if(form){form.elements.email.setCustomValidity('');const submit=form.querySelector('[type=submit]');if(submit.disabled)submit.textContent=tr('sending');}document.dispatchEvent(new Event('site-language'));}
document.querySelectorAll('[data-language]').forEach(el=>el.addEventListener('click',()=>applyLanguage(el.dataset.language)));
document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>{filter=el.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));updateProducts();}));
search?.addEventListener('input',updateProducts);
document.querySelectorAll('[data-solution]').forEach(el=>el.addEventListener('click',()=>{solution=el.dataset.solution;document.querySelectorAll('[data-solution]').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));updateSolution();}));
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
if(form){
  const product=form.elements.product;
  const preset=new URLSearchParams(location.search).get('product');
  if([...product.options].some(o=>o.value===preset))product.value=preset;
  document.querySelectorAll('[data-product]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();product.value=a.dataset.product;history.replaceState(null,'',`?product=${encodeURIComponent(product.value)}#contact`);document.getElementById('contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});form.elements.name.focus({preventScroll:true});}));
  for(const name of ['email','phone'])form.elements[name].addEventListener('input',()=>form.elements.email.setCustomValidity(''));
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(form.querySelector('[type=submit]').disabled)return;
    const values=Object.fromEntries(new FormData(form));
    if(!values.email.trim()&&!values.phone.trim()){form.elements.email.setCustomValidity(tr('contactHint'));form.elements.email.reportValidity();return;}
    if(!form.reportValidity())return;
    const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent=tr('sending');formState='sending';status.textContent=tr(formState);
    const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),15000);
    try{
      // Preserve the project's existing EmailJS service/template. Include new fields
      // in message too, so templates with only the old variables receive them.
      const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},signal:abort.signal,body:JSON.stringify({service_id:'service_bafttzj',template_id:'template_gqzxynz',user_id:'YIbFJs9EGrlXjhb7D',template_params:{...values,reply_to:values.email,message:`Product: ${values.product||'General'}\nCompany: ${values.company}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`}})});
      if(!response.ok)throw new Error('Delivery failed');formState='sent';const selected=product.value;form.reset();product.value=selected;
    }catch{formState='sendError';}finally{clearTimeout(timeout);submit.disabled=false;submit.textContent=tr('send');status.textContent=tr(formState);}
  });
}
applyLanguage(lang);setupRoad(tr);
