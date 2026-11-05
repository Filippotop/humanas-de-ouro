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

    // Aurora (React Bits: Aurora): manchas de cor das quatro linhas à deriva, bem suaves.
    const au=document.createElement('div'); au.className='hdo-aurora'; au.setAttribute('aria-hidden','true');
    au.innerHTML=['--h','--g','--f','--s'].map(v=>`<i style="--c:var(${v})"></i>`).join(''); document.body.prepend(au);
    const bl=[...au.children].map((el,i)=>gsap.to(el,{x:()=>gsap.utils.random(-25,25)+'vw',y:()=>gsap.utils.random(-20,20)+'vh',duration:gsap.utils.random(14,22),ease:'sine.inOut',repeat:-1,yoyo:true,delay:-i*3}));
    undo.push(()=>{ bl.forEach(t=>t.kill()); au.remove(); });

    if(fine.matches){
      // Brilho que segue o cursor + faíscas ao clicar (React Bits: Splash Cursor / Click Spark).
      const gl=document.createElement('div'); gl.className='hdo-glow'; gl.setAttribute('aria-hidden','true'); document.body.append(gl);
      const gx=gsap.quickTo(gl,'x',{duration:.5,ease:'power3'}), gy=gsap.quickTo(gl,'y',{duration:.5,ease:'power3'});
      const pm=e=>{ gx(e.clientX); gy(e.clientY); }, pd=e=>{
        for(let i=0;i<8;i++){ const k=document.createElement('i'); k.className='hdo-spark'; document.body.append(k);
          const a=i/8*6.283+Math.random()*.4, d=gsap.utils.random(18,34);
          gsap.fromTo(k,{x:e.clientX,y:e.clientY,rotation:a+'rad',opacity:1,scaleX:1},{x:e.clientX+Math.cos(a)*d,y:e.clientY+Math.sin(a)*d,opacity:0,scaleX:.2,duration:.45,ease:'power2.out',onComplete:()=>k.remove()}); } };
      document.addEventListener('pointermove',pm,{passive:true}); document.addEventListener('pointerdown',pd,{passive:true});
      undo.push(()=>{ document.removeEventListener('pointermove',pm); document.removeEventListener('pointerdown',pd); gl.remove(); document.querySelectorAll('.hdo-spark').forEach(k=>k.remove()); });
    }

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


  // Rolagem suave (Lenis) é opção separada: sequestra a roda do mouse e pode travar a rolagem em alguns aparelhos.
  let smUndo=null;
  function smoothSync(){
    const want=root.dataset.smooth==='on'&&cur&&cur!=='off'&&fine.matches&&window.Lenis;
    if(!want){ if(smUndo){ smUndo(); smUndo=null; } return; }
    if(smUndo) return;
    const lenis=new Lenis({lerp:.12,prevent:n=>!!n.closest('#pop,textarea,select,input,.stations,[data-lenis-prevent]')});
    const tick=t=>lenis.raf(t*1000); gsap.ticker.add(tick);
    smUndo=()=>{ gsap.ticker.remove(tick); lenis.destroy(); };
  }

  // Fundo 3D (opção separada, "Aa → fundo 3D"): shader de fluido iridescente em WebGL puro, a meia resolução e 30 quadros/s.
  let glUndo=null;
  function bgSync(){
    const want=root.dataset.bg==='on'&&cur&&cur!=='off';
    if(!want){ if(glUndo){ glUndo(); glUndo=null; } return; }
    if(glUndo) return;
    const cv=document.createElement('canvas'); cv.className='hdo-gl'; cv.setAttribute('aria-hidden','true');
    const gl=cv.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,powerPreference:'low-power'}); if(!gl) return;
    const sh=(t,src)=>{ const s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null; };
    const vs=sh(gl.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');
    const fs=sh(gl.FRAGMENT_SHADER,`precision mediump float;uniform vec2 r,m;uniform float t,a;uniform vec3 c1,c2,c3;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,s=.5;for(int i=0;i<4;i++){v+=s*n(p);p*=2.;s*=.5;}return v;}
      void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*2.2;
        vec2 q=vec2(fbm(p+t*.06),fbm(p+vec2(5.2,1.3)-t*.05));
        float f=fbm(p+3.*q+(m-.5)*.8);
        vec3 c=mix(c1,c2,clamp(f*1.7,0.,1.));c=mix(c,c3,clamp(length(q)*.8,0.,1.));
        c+=.12*sin(f*14.+t*.4+vec3(0.,2.,4.));
        gl_FragColor=vec4(c*a,a);}`);
    const pr=gl.createProgram(); if(!vs||!fs){ return; } gl.attachShader(pr,vs); gl.attachShader(pr,fs); gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(pr,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const U=k=>gl.getUniformLocation(pr,k);
    const rgb=v=>{ const x=getComputedStyle(root).getPropertyValue(v).trim().replace('#',''); return x.length===6?[0,2,4].map(i=>parseInt(x.substr(i,2),16)/255):[.5,.4,.2]; };
    const dark=()=>{ const b=rgb('--bg'); return (b[0]+b[1]+b[2])/3<.5; };
    let mx=.5,my=.5,raf=0,last=0,W=0,H=0;
    const fit=()=>{ W=cv.width=Math.max(2,innerWidth>>1); H=cv.height=Math.max(2,innerHeight>>1); gl.viewport(0,0,W,H); };
    const pm=e=>{ mx=e.clientX/innerWidth; my=1-e.clientY/innerHeight; };
    const lost=e=>{ e.preventDefault(); };
    const draw=ts=>{ raf=requestAnimationFrame(draw); if(document.hidden||ts-last<33) return; last=ts;
      gl.uniform2f(U('r'),W,H); gl.uniform2f(U('m'),mx,my); gl.uniform1f(U('t'),ts/1000);
      gl.uniform1f(U('a'),dark()?.4:.22);
      const g=rgb('--gold'),f=rgb('--f'),s=rgb('--s'); gl.uniform3f(U('c1'),...g); gl.uniform3f(U('c2'),...f); gl.uniform3f(U('c3'),...s);
      gl.drawArrays(gl.TRIANGLES,0,3); };
    document.body.prepend(cv); fit(); addEventListener('resize',fit); addEventListener('pointermove',pm,{passive:true}); cv.addEventListener('webglcontextlost',lost);
    raf=requestAnimationFrame(draw);
    glUndo=()=>{ cancelAnimationFrame(raf); removeEventListener('resize',fit); removeEventListener('pointermove',pm); cv.remove(); const x=gl.getExtension('WEBGL_lose_context'); x&&x.loseContext(); };
  }

  function apply(){
    const m=mode(); if(m===cur){ bgSync(); smoothSync(); return; }
    undo.forEach(f=>f()); undo=[]; cur=m; root.dataset.fx=m; lastKey=null;
    bgSync(); smoothSync();
    if(m==='off') return;
    if(m==='full') startFull();
    enter();
  }

  new MutationObserver(()=>requestAnimationFrame(enter)).observe(app,{childList:true});
  new MutationObserver(apply).observe(root,{attributes:true,attributeFilter:['data-motion','data-bg','data-smooth']});
  RM.addEventListener&&RM.addEventListener('change',apply);

  const dot=document.querySelector('.brand .dot'); if(dot) gsap.to(dot,{rotation:360,duration:24,repeat:-1,ease:'none'});

  // Spotlight (SpotlightCard): luz dourada segue o ponteiro. Só com mouse.
  if(fine.matches) document.addEventListener('pointermove',e=>{
    if(cur==='off') return; const c=e.target.closest&&e.target.closest('.panel,.task,.stat,.line'); if(!c) return;
    const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});

  apply();
})();
