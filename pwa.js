/* Humanas de Ouro: camada do app instalável (fora do Claude). */
(function(){
  document.body.classList.add('has-tutor','is-pwa');
  const CLAUDE='https://claude.ai/new';
  const copy=txt=>new Promise((ok,no)=>{ try{ navigator.clipboard.writeText(txt).then(ok,no); }catch(e){ no(e); } });

  function extBox(out,html){ out.innerHTML=`<div class="tutor-out ext">${html}<p class="muted xst" aria-live="polite" style="margin:8px 0 0;font-size:12.5px"></p></div>`; return out.querySelector('.xst'); }

  /* Tutor de texto: copia a pergunta pronta para colar no Claude. */
  window.askTutor=async function(out,prompt){
    const st=extBox(out,`<p style="margin:0 0 8px">O tutor responde dentro do Claude. Copie a pergunta pronta, abra o Claude e cole numa conversa do projeto Enem.</p>
      <div class="row"><button class="btn gold xc">Copiar pergunta</button><a class="btn" href="${CLAUDE}" target="_blank" rel="noopener">Abrir o Claude</a></div>
      <textarea class="xt" readonly hidden style="min-height:90px;font-size:12px;margin-top:8px"></textarea>`);
    out.querySelector('.xc').onclick=()=>copy(prompt).then(()=>{ st.textContent='Copiada. Abra o Claude e cole.'; },()=>{ const ta=out.querySelector('.xt'); ta.hidden=false; ta.value=prompt; ta.focus(); ta.select(); st.textContent='Copie o texto selecionado manualmente.'; });
  };

  /* Tutor das provas: compartilha a imagem da questão com o Claude e copia o pedido. */
  window.explainOfficial=async function(out,id,n,his){
    const e=EX[id]; const sh=Object.entries(e.shared||{}).find(([kk])=>{ const [a,b]=kk.split('-').map(Number); return n>=a&&n<=b; });
    const prompt=officialPrompt(id,n,his,sh);
    const st=extBox(out,`<p style="margin:0 0 8px">O tutor com imagem roda no Claude. O botão abaixo copia o pedido e abre o compartilhamento: escolha o app do Claude, cole o pedido junto da imagem e envie.</p>
      <div class="row"><button class="btn gold xs">Enviar questão ao Claude</button><button class="btn xc">Só copiar o pedido</button><a class="btn" href="${imgUrl(id,n)}" target="_blank" rel="noopener">Abrir a imagem</a></div>`);
    out.querySelector('.xc').onclick=()=>copy(prompt).then(()=>st.textContent='Pedido copiado.',()=>st.textContent='Não consegui copiar.');
    let files=null;
    (async()=>{ try{ let blobs=await imgBlobs(imgUrl(id,n)); if(sh) blobs=(await imgBlobs(`provas/${id}/${sh[1].f}`)).concat(blobs);
      files=blobs.slice(0,4).map((b,i)=>new File([b],`questao-${n}-parte-${i+1}.png`,{type:'image/png'})); }catch(err){ files=false; } })();
    out.querySelector('.xs').onclick=async()=>{
      copy(prompt).catch(()=>{});
      if(files===null){ st.textContent='Preparando a imagem, toque de novo em um segundo.'; return; }
      if(!files||!(navigator.canShare&&navigator.canShare({files}))){ st.textContent='Este navegador não compartilha imagens. O pedido foi copiado: abra a imagem, salve e anexe no Claude.'; return; }
      try{ await navigator.share({files,text:prompt}); st.textContent='Se o Claude abrir sem o texto, cole o pedido (já está copiado) antes de enviar.'; }
      catch(err){ st.textContent= err&&err.name==='AbortError' ? 'Compartilhamento cancelado.' : 'Não consegui compartilhar. Use "Abrir a imagem" e anexe no Claude; o pedido já está copiado.'; }
    };
  };

  /* Selo de sincronização */
  try{ setSync('salvo neste aparelho'); }catch(e){}

  /* Toast de status */
  const toast=document.createElement('div'); toast.id='pwaToast'; toast.hidden=true; toast.setAttribute('role','status'); document.body.appendChild(toast);
  let tt; function say(html,ms){ toast.innerHTML=html; toast.hidden=false; clearTimeout(tt); if(ms) tt=setTimeout(()=>toast.hidden=true,ms); }

  /* Instalação */
  let deferred=null;
  const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferred=e; if(!isStandalone()) offerInstall(); });
  function offerInstall(){
    let seen=0; try{ seen=+localStorage.getItem('pwa-install-seen')||0; }catch(e){}
    if(Date.now()-seen<3*864e5) return;
    say(`<span>Instale o Humanas de Ouro como app.</span><button class="btn gold" id="pwaInst">Instalar</button><button class="btn" id="pwaNo" aria-label="Agora não">Agora não</button>`);
    document.getElementById('pwaInst').onclick=async()=>{ toast.hidden=true; if(deferred){ deferred.prompt(); await deferred.userChoice.catch(()=>{}); deferred=null; } };
    document.getElementById('pwaNo').onclick=()=>{ toast.hidden=true; try{ localStorage.setItem('pwa-install-seen',Date.now()); }catch(e){} };
  }
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios&&!isStandalone()) setTimeout(()=>{ let seen=0; try{ seen=+localStorage.getItem('pwa-install-seen')||0; }catch(e){} if(Date.now()-seen>3*864e5){ say(`<span>Para instalar: toque em Compartilhar e depois em <b>Adicionar à Tela de Início</b>.</span><button class="btn" id="pwaNo">Ok</button>`); document.getElementById('pwaNo').onclick=()=>{ toast.hidden=true; try{ localStorage.setItem('pwa-install-seen',Date.now()); }catch(e){} }; } },2500);

  /* Service worker e download das provas para uso offline */
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(reg=>{
      const warm=()=>{ const w=reg.active||navigator.serviceWorker.controller; if(w) w.postMessage({type:'warm'}); };
      if(reg.active) warm(); else navigator.serviceWorker.addEventListener('controllerchange',warm,{once:true});
      reg.addEventListener('updatefound',()=>{ const nw=reg.installing; if(!nw) return; nw.addEventListener('statechange',()=>{ if(nw.state==='activated'&&navigator.serviceWorker.controller) say(`<span>Nova versão do app disponível.</span><button class="btn gold" id="pwaRl">Atualizar</button>`); const b=document.getElementById('pwaRl'); if(b) b.onclick=()=>location.reload(); }); });
    }).catch(()=>{});
    navigator.serviceWorker.addEventListener('message',e=>{ const d=e.data||{};
      if(d.type==='warm-progress'&&!d.done){ say(`<span>Baixando as provas para usar sem internet: ${d.have}/${d.total}</span>`); }
      if(d.type==='warm-progress'&&d.done){ if(d.fresh) say('<span>Pronto: o app inteiro funciona sem internet.</span>',4000); else toast.hidden=true; try{ setSync('funciona offline'); }catch(err){} }
    });
  }
  window.addEventListener('offline',()=>say('<span>Sem internet: tudo continua funcionando, menos o tutor.</span>',4000));
})();
