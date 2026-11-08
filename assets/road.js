// Perspective projection on Canvas 2D; not a WebGL dependency.
export function setupRoad(label) {
  const canvas=document.getElementById('data-road');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const button=document.getElementById('motion-toggle');
  if(!ctx){button.hidden=true;return;}
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=media.matches,visible=true,frame=0,w=0,h=0,phase=0,last=0;
  const updateLabel=()=>{button.textContent=label(paused?'resume':'pause');button.setAttribute('aria-pressed',String(paused));};
  function draw(){
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#071c2b';ctx.fillRect(0,0,w,h);
    const horizon=h*.23,shift=Math.min(window.scrollY,700)*.0006;
    function p(x,z){const s=1/(z+.23);return [w*.72+x*s*w*.22+Math.sin(z*1.6+shift)*w*.07,horizon+s*h*.2];}
    function line(a,b,color,width=1){ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
    for(let x=-10;x<=10;x++)line(p(x,0),p(x,9),'#2e5c7140');
    for(let n=0;n<46;n++){const z=(n/5+phase*.3)%9;line(p(-10,z),p(10,z),'#34697c45');}
    // Road bed and the two continuous illuminated edges.
    ctx.beginPath();for(let n=0;n<=120;n++){const a=p(-.8,n/14);n?ctx.lineTo(...a):ctx.moveTo(...a)}for(let n=120;n>=0;n--)ctx.lineTo(...p(.8,n/14));ctx.closePath();ctx.fillStyle='#123648aa';ctx.fill();
    for(const side of [-.8,.8]){ctx.beginPath();for(let n=0;n<=140;n++){const a=p(side,n/16);n?ctx.lineTo(...a):ctx.moveTo(...a)}ctx.strokeStyle='#6fd4df';ctx.lineWidth=1.5;ctx.shadowColor='#3bb7d8';ctx.shadowBlur=10;ctx.stroke();ctx.shadowBlur=0;}
    for(let n=0;n<28;n++){const z=(n*.31+phase*.7)%9;line(p(0,z),p(0,z+.075),'#d0f4f5',Math.max(1,3/(z+.5)));}
    // Sparse roadside posts establish scale without obscuring the copy.
    for(let n=1;n<=12;n++){const z=n*.55;for(const side of [-1.2,1.2]){const a=p(side,z);line(a,[a[0],a[1]-55/(z+.4)],'#65b9c66a');}}
    const fog=ctx.createLinearGradient(0,horizon-100,0,horizon+130);fog.addColorStop(0,'#071c2b');fog.addColorStop(1,'#071c2b00');ctx.fillStyle=fog;ctx.fillRect(0,0,w,horizon+130);
  }
  function tick(now){frame=0;if(paused||!visible||document.hidden){last=0;return;}if(!last||now-last>=32){phase+=Math.min(last?(now-last)/1000:0,.08)*.32;last=now;draw();}frame=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(frame);frame=0;last=0;draw();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick);updateLabel();}
  function resize(){w=canvas.clientWidth;h=canvas.clientHeight;const d=Math.min(devicePixelRatio||1,w<760?1.25:1.5);canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);sync();}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();}).observe(canvas);
  button.addEventListener('click',()=>{paused=!paused;sync();});
  media.addEventListener('change',()=>{paused=media.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('site-language',updateLabel);
  resize();
}
