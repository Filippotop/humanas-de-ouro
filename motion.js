/* Animações (GSAP). Efeitos inspirados no React Bits, em JS puro. Sem GSAP ou com "reduzir movimento", não faz nada. */
(function(){
  if(!window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const app=document.getElementById('app'); if(!app) return;
  const SEL='.pagehead,.panel,.stat,.task,.line,.aring,.excard,.q,.fc,.err,.game,.prompt';
  let lastKey=null;

  function enter(){
    const key=document.body.dataset.view; // só anima ao trocar de tela, não a cada clique
    if(key===lastKey) return; lastKey=key;
    const els=[...app.querySelectorAll(SEL)].filter(e=>!e.parentElement.closest(SEL)).slice(0,30);
    if(els.length) gsap.from(els,{opacity:0,y:16,duration:.5,ease:'power3.out',stagger:.05,clearProps:'opacity,transform'});
    app.querySelectorAll('.aring circle[stroke-dasharray]').forEach(c=>{
      const [a,b]=c.getAttribute('stroke-dasharray').split(' ').map(Number);
      gsap.fromTo(c,{attr:{'stroke-dasharray':'0 '+b}},{attr:{'stroke-dasharray':a+' '+b},duration:1,delay:.2,ease:'power2.out'});
    });
    app.querySelectorAll('.bar2 i').forEach(i=>{
      const w=i.style.width; if(w) gsap.fromTo(i,{width:'0%'},{width:w,duration:.9,delay:.2,ease:'power2.out'});
    });
    app.querySelectorAll('.stat .n').forEach(n=>{ // contagem: só números inteiros no início do texto
      const t=n.firstChild; if(!t||t.nodeType!==3) return; const m=t.nodeValue.match(/^(\d+)(%?)$/); if(!m) return;
      const to=+m[1], o={v:0}; gsap.to(o,{v:to,duration:.9,delay:.15,ease:'power1.out',onUpdate:()=>{t.nodeValue=Math.round(o.v)+m[2];},onComplete:()=>{t.nodeValue=m[1]+m[2];}});
    });
  }
  new MutationObserver(()=>requestAnimationFrame(enter)).observe(app,{childList:true});
  enter();

  // Marca com brilho: o ponto colorido gira devagar.
  const dot=document.querySelector('.brand .dot'); if(dot) gsap.to(dot,{rotation:360,duration:24,repeat:-1,ease:'none'});

  // Spotlight (SpotlightCard): luz dourada segue o ponteiro. Só com mouse.
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove',e=>{
      const c=e.target.closest&&e.target.closest('.panel,.task,.stat,.line'); if(!c) return;
      const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px');
    },{passive:true});
  }
})();
