(() => {
  const reveal = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));

  // Scroll-controlled upside-down crawler and left-side greeting.
  const right = document.querySelector('.right-spidey');
  const left = document.querySelector('.left-spidey');
  const updateCrawlers = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = scrollY / max;
    if(right){
      const y = -300 + p * (innerHeight * 1.45);
      right.style.transform = `translate3d(0,${y}px,0) rotate(${Math.sin(p*8)*2}deg)`;
      right.style.opacity = p > .04 && p < .98 ? '1' : '0';
    }
    if(left){
      const active = p > .18 && p < .9;
      left.style.opacity = active ? '1' : '0';
      left.style.transform = active ? 'translate3d(0,-12px,0)' : 'translate3d(0,40px,0)';
    }
  };
  addEventListener('scroll',updateCrawlers,{passive:true});
  addEventListener('resize',updateCrawlers,{passive:true});
  updateCrawlers();

  // Spider-web cursor: tiny thread follows the mouse, then fades.
  const c=document.createElement('canvas'); c.className='cursor-web'; document.body.appendChild(c);
  const ctx=c.getContext('2d'); let pts=[]; let w=innerWidth,h=innerHeight;
  const resize=()=>{w=innerWidth;h=innerHeight;c.width=w*devicePixelRatio;c.height=h*devicePixelRatio;c.style.width=w+'px';c.style.height=h+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}; resize(); addEventListener('resize',resize);
  addEventListener('pointermove',e=>{pts.push({x:e.clientX,y:e.clientY,t:performance.now()});if(pts.length>20)pts.shift()},{passive:true});
  const loop=()=>{ctx.clearRect(0,0,w,h);const now=performance.now();pts=pts.filter(p=>now-p.t<520);if(pts.length>1){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle='rgba(229,9,20,.22)';ctx.lineWidth=1;ctx.stroke()}requestAnimationFrame(loop)};loop();

  // Mobile menu generated without a framework.
  const header=document.querySelector('header');
  const menu=document.querySelector('.menu');
  if(menu) menu.addEventListener('click',()=>header.classList.toggle('open'));
})();


/* V4 hover-to-reveal interaction */
(() => {
  const stage = document.getElementById('spiderStage');
  if (!stage) return;

  const dot = document.createElement('span');
  dot.className = 'reveal-pointer';
  Object.assign(dot.style, {
    position:'fixed', width:'8px', height:'8px', borderRadius:'50%',
    background:'#e10600', boxShadow:'0 0 16px rgba(225,6,0,.8)',
    pointerEvents:'none', zIndex:'60', opacity:'0', transform:'translate(-50%,-50%)',
    transition:'opacity .2s, transform .12s'
  });
  document.body.appendChild(dot);

  stage.addEventListener('mousemove', e => {
    dot.style.opacity = '1';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    const r = stage.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*10;
    const y = ((e.clientY-r.top)/r.height-.5)*10;
    stage.querySelector('.spider-image-wrap').style.transform =
      `rotate(${1.5+x*.12}deg) scale(${1.015+y*.001})`;
  });
  stage.addEventListener('mouseleave', () => {
    dot.style.opacity='0';
    stage.querySelector('.spider-image-wrap').style.transform='';
  });

  // Tap-to-reveal fallback for touch devices.
  stage.addEventListener('click', () => {
    if (matchMedia('(hover: none)').matches) {
      stage.classList.toggle('touch-reveal');
    }
  });
})();
