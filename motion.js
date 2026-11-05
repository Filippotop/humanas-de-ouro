/* Animações (GSAP + Lenis). Efeitos inspirados no React Bits, em JS puro.
   Modos (preferência "animações" em Aa): auto, full, light, off. "Reduzir movimento" do aparelho força off. */
(function(){
  if(!window.gsap) return;
  const root=document.documentElement, app=document.getElementById('app'); if(!app) return;
  const RM=matchMedia('(prefers-reduced-motion: reduce)');
  const lowEnd=(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const SEL='.pagehead,.panel,.stat,.task,.line,.aring,.excard,.q,.fc,.err,.game,.prompt';
  const LATE='.panel,.stat,.task,.q,.fc,.err,.excard,.game,.prompt'; // podem esperar a rolagem
  let cur='', undo=[], lastKey=null, io=null;

  const mode=()=>{ const p=root.dataset.motion||'auto'; if(RM.matches||p==='off') return 'off'; if(p==='auto') return lowEnd?'light':'full'; return p; };

  function enter(){
    if(cur==='off') return;
    const key=document.body.dataset.view; if(key===lastKey) return; lastKey=key; // só ao trocar de tela
    const vh=innerHeight, all=[...app.querySelectorAll(SEL)].filter(e=>!e.parentElement.closest(SEL));
    let now=all, later=[];
    if(cur==='full'){ now=all.filter(e=>!e.matches(LATE)||e.closest('.stations')||e.getBoundingClientRect().top<vh); later=all.filter(e=>!now.includes(e)); }
    else now=all.slice(0,30);
    if(now.length) gsap.from(now,{opacity:0,y:16,duration:.5,ease:'power3.out',stagger:.05,clearProps:'opacity,transform'});
    if(later.length&&io){ gsap.set(later,{opacity:0,y:20}); later.forEach(e=>io.observe(e)); }
    app.querySelectorAll('.aring circle[stroke-dasharray]').forEach(c=>{
      const [a,b]=c.getAttribute('stroke-dasharray').split(' ').map(Number);
      gsap.fromTo(c,{attr:{'stroke-dasharray':'0 '+b}},{attr:{'stroke-dasharray':a+' '+b},duration:1,delay:.2,ease:'power2.out'});
    });
    app.querySelectorAll('.bar2 i').forEach(i=>{ const w=i.style.width; if(w) gsap.fromTo(i,{width:'0%'},{width:w,duration:.9,delay:.2,ease:'power2.out'}); });
    app.querySelectorAll('.stat .n').forEach(n=>{ // contagem: só inteiros no início do texto
      const t=n.firstChild; if(!t||t.nodeType!==3) return; const m=t.nodeValue.match(/^(\d+)(%?)$/); if(!m) return;
      const to=+m[1], o={v:0}; gsap.to(o,{v:to,duration:.9,delay:.15,ease:'power1.out',onUpdate:()=>{t.nodeValue=Math.round(o.v)+m[2];},onComplete:()=>{t.nodeValue=m[1]+m[2];}});
    });
    if(cur==='full') app.querySelectorAll('.pagehead h1').forEach(split);
  }

  // SplitText: o título entra palavra por palavra. Só em texto puro; o leitor de tela continua lendo o título inteiro.
  function split(h){
    if(h.childElementCount||!h.textContent.trim()) return;
    const txt=h.textContent; h.setAttribute('aria-label',txt); h.textContent='';
    const ws=txt.trim().split(/\s+/).map(w=>{ const s=document.createElement('span'); s.setAttribute('aria-hidden','true'); s.style.display='inline-block'; s.textContent=w; h.append(s,' '); return s; });
    gsap.from(ws,{opacity:0,yPercent:60,duration:.6,ease:'power3.out',stagger:.07,delay:.05,clearProps:'opacity,transform'});
  }

  function startFull(){
    // Revelar na rolagem (itens fora da tela na entrada).
    io=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; io.unobserve(e.target); gsap.to(e.target,{opacity:1,y:0,duration:.5,ease:'power3.out',clearProps:'opacity,transform'}); }),{rootMargin:'0px 0px -6% 0px'});
    undo.push(()=>{ io.disconnect(); io=null; app.querySelectorAll(SEL).forEach(e=>gsap.set(e,{clearProps:'opacity,transform'})); });

    // Lenis: rolagem suave. Popups, texto e o mapa de linhas rolam do jeito normal.
    if(window.Lenis&&fine.matches){
      const lenis=new Lenis({lerp:.12,prevent:n=>!!n.closest('#pop,textarea,select,.stations,[data-lenis-prevent]')});
      const tick=t=>lenis.raf(t*1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
      undo.push(()=>{ gsap.ticker.remove(tick); lenis.destroy(); });
    }

    // Partículas douradas ao fundo (poucas, paradas com a aba oculta).
    const cv=document.createElement('canvas'); cv.setAttribute('aria-hidden','true'); cv.className='hdo-fx';
    document.body.prepend(cv); const g=cv.getContext('2d'); let W=0,H=0,raf=0;
    const dpr=Math.min(devicePixelRatio||1,1.5), N=innerWidth<700?18:36;
    const ps=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.6+.6,v:Math.random()*.00004+.00001,p:Math.random()*6.3}));
    const fit=()=>{ W=cv.width=innerWidth*dpr; H=cv.height=innerHeight*dpr; };
    const gold=()=>getComputedStyle(root).getPropertyValue('--gold').trim()||'#8F6300';
    let col=gold(), frame=0;
    const draw=t=>{ raf=requestAnimationFrame(draw); if(document.hidden) return; if(!(frame++%240)) col=gold();
      g.clearRect(0,0,W,H); g.fillStyle=col;
      for(const q of ps){ q.y-=q.v*16; if(q.y<-.02) q.y=1.02; const x=(q.x+Math.sin(t/4000+q.p)*.015)*W;
        g.globalAlpha=.12+.1*Math.sin(t/1500+q.p); g.beginPath(); g.arc(x,q.y*H,q.r*dpr,0,6.283); g.fill(); } };
    fit(); addEventListener('resize',fit); raf=requestAnimationFrame(draw);
    undo.push(()=>{ cancelAnimationFrame(raf); removeEventListener('resize',fit); cv.remove(); });

    if(fine.matches){
      // Inclinação 3D nas estatísticas e botões que "puxam" o ponteiro.
      const mv=e=>{
        const s=e.target.closest&&e.target.closest('.stat'); if(s){ const r=s.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
          gsap.to(s,{rotationY:x*8,rotationX:-y*8,transformPerspective:700,duration:.3,overwrite:'auto'}); }
        const b=e.target.closest&&e.target.closest('.btn.primary,.btn.gold'); if(b){ const r=b.getBoundingClientRect();
          gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.18,y:(e.clientY-r.top-r.height/2)*.25,duration:.3,overwrite:'auto'}); } };
      const lv=e=>{ const t=e.target.closest&&e.target.closest('.stat,.btn.primary,.btn.gold'); if(t) gsap.to(t,{rotationX:0,rotationY:0,x:0,y:0,duration:.5,ease:'elastic.out(1,.5)',overwrite:'auto',clearProps:'transform'}); };
      document.addEventListener('pointermove',mv,{passive:true}); document.addEventListener('pointerout',lv,{passive:true});
      undo.push(()=>{ document.removeEventListener('pointermove',mv); document.removeEventListener('pointerout',lv); });
    }
  }

  function apply(){
    const m=mode(); if(m===cur) return;
    undo.forEach(f=>f()); undo=[]; cur=m; root.dataset.fx=m; lastKey=null;
    if(m==='off') return;
    if(m==='full') startFull();
    enter();
  }

  new MutationObserver(()=>requestAnimationFrame(enter)).observe(app,{childList:true});
  new MutationObserver(apply).observe(root,{attributes:true,attributeFilter:['data-motion']});
  RM.addEventListener&&RM.addEventListener('change',apply);

  const dot=document.querySelector('.brand .dot'); if(dot) gsap.to(dot,{rotation:360,duration:24,repeat:-1,ease:'none'});

  // Spotlight (SpotlightCard): luz dourada segue o ponteiro. Só com mouse.
  if(fine.matches) document.addEventListener('pointermove',e=>{
    if(cur==='off') return; const c=e.target.closest&&e.target.closest('.panel,.task,.stat,.line'); if(!c) return;
    const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});

  apply();
})();
