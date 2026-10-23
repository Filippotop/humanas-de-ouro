/* Humanas de Ouro: aprofundamento de História e Geografia (DATA.deep).
   Mesmo formato de aprofundamento-fs.js: Aprofundamento, Como o Enem cobra (questões oficiais tocáveis) e Pegadinhas, mais 3 questões. */
(function (D) {
  D.deep = D.deep || {};
  const cite = (ex, n) => `<a href="#" data-ex="${ex}" data-n="${n}">Enem 20${ex.slice(0, 2)}, questão ${n}</a>`;
  function deep(id, html, questions) {
    const m = D.modules.find(x => x.id === id), base = m ? m.qs.length : 0;
    D.deep[id] = { html, questions: questions.map((q, i) => Object.assign({ vol: m ? m.vol : 'HG', mod: id, n: base + i + 1, kind: 'extra', tag: 'Inédita, estilo ENEM · aprofundamento', traps: {} }, q, { id: `D-${id}.${i + 1}` })) };
  }

  deep('G9', `<h4>Aprofundamento: poder, blocos e fluxos no mundo atual</h4>
<ul>
<li><strong>Da ordem bipolar à multipolar:</strong> com o fim da Guerra Fria (1991), os EUA ficam como superpotência militar, mas o poder econômico se distribui (China, União Europeia, emergentes). O grupo <strong>Brics</strong> reúne economias emergentes que reivindicam mais peso nas decisões globais.</li>
<li><strong>Blocos econômicos:</strong> a União Europeia é o bloco mais integrado (livre circulação de pessoas, mercadorias e capitais; o euro em parte dos países). O Mercosul (1991) é uma união aduaneira incompleta. Entrar num bloco exige negociação política com os vizinhos.</li>
<li><strong>ONU:</strong> o Conselho de Segurança tem 15 membros, dos quais 5 permanentes com direito a veto (Estados Unidos, Rússia, China, Reino Unido e França). A estrutura reflete a correlação de forças de 1945 e é marcada pela <strong>assimetria</strong>.</li>
<li><strong>Globalização cultural:</strong> filmes, séries, novelas e músicas circulam pelo mundo e influenciam costumes (o "poder brando", ou <em>soft power</em>, de um país).</li>
<li><strong>Nacionalismos e fronteiras:</strong> a fragmentação da antiga Iugoslávia gerou disputas de território, identidade e até de nome. A Macedônia virou Macedônia do Norte (acordo de 2018, em vigor em 2019) para encerrar o impasse com a Grécia e destravar a entrada na União Europeia e na Otan.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 46)}: a Macedônia muda de nome. A resposta: estratégia para <strong>intensificar a integração regional</strong>, já que a Grécia bloqueava a adesão à União Europeia. Foi um dos seus erros: você marcou B (proteger a cultura local), mas o texto deixa claro que a mudança cedeu à Grécia para entrar no bloco.</li>
<li>${cite('24d1', 89)}: o Conselho de Segurança da ONU e o veto. A resposta: <strong>assimetria política</strong> entre os membros.</li>
<li>${cite('24d1', 80)}: novelas brasileiras na Rússia e em Angola. A resposta: aproximação <strong>cultural</strong>, ao subjetivarem costumes da teledramaturgia estrangeira.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Geopolítica aparece com notícias. Pergunte <strong>qual é o objetivo do ator</strong> (país, bloco, organismo) e qual é a <strong>relação de poder</strong> descrita. No caso da Macedônia, a palavra-chave estava no texto: "bloqueou as negociações de adesão".</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Identidade × estratégia: quando um país <strong>abre mão</strong> de algo simbólico (um nome) para entrar num bloco, a resposta é integração, e não proteção da cultura. E o veto no Conselho de Segurança indica desigualdade de poder, não "consenso multipolar".</p></div>`, [
    { base: ['Para aderir a um bloco econômico, um país aceitou rever leis de importação, adotar normas sanitárias comuns e abrir seu mercado a produtos dos vizinhos.'], src: 'Texto escrito para esta apostila.', cmd: 'As medidas descritas visam principalmente',
      alts: ['ao fechamento do mercado nacional à concorrência.', 'à criação de uma moeda própria e independente.', 'à integração econômica regional.', 'à expansão do território nacional.', 'à saída de todos os organismos internacionais.'], ans: 'C', hab: 'H9', dif: 'fácil',
      ex: { C: 'harmonizar leis e normas e abrir o mercado aos vizinhos são passos de integração regional.', A: 'é o oposto: o mercado se abre. Termo oposto.', B: 'não se fala de moeda própria.', D: 'não há expansão territorial.', E: 'o país entra num bloco.' }, traps: { A: 'oposto' } },
    { base: ['Uma resolução sobre um conflito armado recebeu 13 votos favoráveis no Conselho de Segurança da ONU, mas não foi aprovada porque um dos membros permanentes votou contra.'], src: 'Situação escrita para esta apostila.', cmd: 'O episódio evidencia, nas relações internacionais,',
      alts: ['a assimetria de poder garantida pelo direito de veto.', 'a igualdade de peso entre todos os países-membros.', 'a regra da maioria simples nas decisões.', 'o fim da influência das grandes potências.', 'a ausência de normas no funcionamento da ONU.'], ans: 'A', hab: 'H7', dif: 'fácil',
      ex: { A: 'um único voto contrário de membro permanente barra a decisão da maioria: assimetria garantida pelo veto.', B: 'é o contrário. Termo oposto.', C: 'a maioria não bastou.', D: 'o episódio mostra justamente essa influência.', E: 'há norma: o veto é regra.' }, traps: { B: 'oposto', C: 'oposto' } },
    { base: ['Séries sul-coreanas e grupos de música pop do mesmo país passaram a influenciar moda, culinária e até o aprendizado de idiomas de jovens em diversos continentes.'], src: 'Texto escrito para esta apostila.', cmd: 'O fenômeno descrito é um exemplo de',
      alts: ['isolamento cultural dos países asiáticos.', 'conflito armado por fronteiras.', 'formação de um bloco econômico.', 'migração forçada de populações.', 'poder brando, exercido por meio da influência cultural.'], ans: 'E', hab: 'H6, H9', dif: 'fácil',
      ex: { E: 'atrair e influenciar pela cultura, sem força militar, é poder brando (soft power).', A: 'é o contrário: a cultura se expande. Termo oposto.', B: 'não há conflito armado.', C: 'não há acordo comercial.', D: 'não há migração forçada.' }, traps: { A: 'oposto' } }
  ]);

  deep('G5', `<h4>Aprofundamento: modernização, concentração e conflito no campo</h4>
<ul>
<li><strong>Modernização conservadora</strong> (a partir dos anos 1960–70, com a Revolução Verde): máquinas, fertilizantes, sementes selecionadas e agrotóxicos aumentaram a produtividade, mas mantiveram a <strong>concentração da terra</strong> e expulsaram trabalhadores (êxodo rural).</li>
<li><strong>Agronegócio e complexos agroindustriais:</strong> o Brasil está entre os maiores produtores e exportadores mundiais de soja, café, açúcar, suco de laranja e carnes. O resultado vem da entrada do <strong>capital agroindustrial</strong> no campo (crédito, tecnologia, integração com a indústria e o comércio exterior).</li>
<li><strong>Agricultura familiar:</strong> responde por grande parte dos alimentos do mercado interno e ocupa a maior parte dos trabalhadores rurais, com menos terra e menos crédito.</li>
<li><strong>Função social da propriedade</strong> (Constituição de 1988, art. 186): uso racional da terra, preservação ambiental, respeito às leis trabalhistas e bem-estar de proprietários e trabalhadores. A terra que descumpre essa função pode ser desapropriada para a reforma agrária.</li>
<li><strong>Conflitos e alternativas:</strong> MST e luta pela terra; trabalho análogo à escravidão; reservas extrativistas (criadas a partir da luta dos seringueiros, como Chico Mendes), que unem conservação e renda a partir de decisões locais.</li>
<li><strong>Impactos ambientais:</strong> o uso intensivo de agrotóxicos reduz polinizadores (abelhas) e contamina solo e água.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 67)}: desapropriação da fazenda Cabaceiras por trabalho análogo à escravidão e crimes ambientais. A resposta: a promoção da justiça como <strong>revisão das desigualdades econômicas</strong>. Foi um dos seus erros: você marcou A (manutenção da ordem agrária), o oposto de uma desapropriação.</li>
<li>${cite('25d1', 63)}: o ranking mundial da produção agropecuária brasileira. A resposta: <strong>ampliação da entrada do capital agroindustrial no campo</strong>.</li>
<li>${cite('25d1', 75)}: inseticidas na agricultura. A resposta: a diminuição da <strong>diversidade de polinizadores naturais</strong>.</li>
<li>${cite('24d1', 60)}: os seringueiros e as reservas extrativistas. A resposta: gestão territorial baseada na <strong>conexão de valores fundamentados por decisões locais</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Espaço agrário caiu 4 vezes em dois anos. Dois eixos se repetem: a <strong>modernização e seus custos</strong> (ambientais e sociais) e a <strong>justiça no campo</strong> (função social, reforma agrária, populações tradicionais).</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Quando o texto descreve uma desapropriação ou reforma agrária, alternativas como "manutenção da ordem agrária", "legitimação da propriedade privada" ou "hegemonia das classes dominantes" têm o <strong>sinal invertido</strong>. A desapropriação contesta a ordem que concentra a terra.</p></div>`, [
    { base: ['Depois da chegada de grandes empresas de grãos, a região passou a exportar soja em escala recorde, enquanto pequenos produtores venderam suas terras e migraram para as cidades.'], src: 'Texto escrito para esta apostila.', cmd: 'A situação descrita exemplifica a',
      alts: ['desconcentração da propriedade da terra.', 'valorização da agricultura familiar de subsistência.', 'redução da produção voltada à exportação.', 'modernização conservadora, que aumenta a produção e concentra a terra.', 'reforma agrária promovida pelo Estado.'], ans: 'D', hab: 'H26, H27', dif: 'fácil',
      ex: { D: 'produção recorde para exportação combinada com venda das pequenas propriedades e êxodo: modernização conservadora.', A: 'a terra se concentra. Termo oposto.', B: 'a agricultura familiar perde espaço.', C: 'a exportação aumenta.', E: 'não há reforma agrária.' }, traps: { A: 'oposto', E: 'oposto' } },
    { base: ['Uma fazenda onde foram encontrados trabalhadores em condições degradantes e grandes áreas desmatadas ilegalmente foi destinada a assentamentos rurais.'], src: 'Texto escrito para esta apostila.', cmd: 'A destinação da fazenda se fundamenta no princípio constitucional da',
      alts: ['propriedade absoluta, que não admite limites.', 'função social da propriedade, que exige uso adequado, ambiental e trabalhista.', 'livre iniciativa, que dispensa regras ambientais.', 'soberania dos estados sobre as terras da União.', 'proteção irrestrita ao latifúndio produtivo.'], ans: 'B', hab: 'H26', dif: 'média',
      ex: { B: 'trabalho degradante e desmatamento ilegal descumprem a função social, o que permite a desapropriação.', A: 'a Constituição limita a propriedade pela função social.', C: 'a livre iniciativa não dispensa regras ambientais.', D: 'o texto não trata de disputa entre estados e União.', E: '"irrestrita" é exagero e contraria o caso.' }, traps: { A: 'oposto', E: 'exagero' } },
    { base: ['Após anos de pulverização intensiva de inseticidas, produtores de maçã de uma região passaram a alugar colmeias para garantir a polinização dos pomares.'], src: 'Texto escrito para esta apostila.', cmd: 'O problema que levou ao aluguel de colmeias foi a',
      alts: ['elevação da fertilidade natural do solo.', 'expansão das áreas de floresta nativa.', 'redução das chuvas por mudanças no relevo.', 'queda do preço internacional da maçã.', 'diminuição dos polinizadores naturais provocada pelos agrotóxicos.'], ans: 'E', hab: 'H28', dif: 'fácil',
      ex: { E: 'inseticidas matam também abelhas e outros polinizadores; daí a necessidade de colmeias alugadas.', A: 'não há relação com a fertilidade.', B: 'não há expansão florestal.', C: 'não há relação com chuvas ou relevo.', D: 'o texto não fala de preço.' }, traps: { D: 'detalhe' } }
  ]);

  deep('H3', `<h4>Aprofundamento: fé, poder e saber na Idade Média</h4>
<ul>
<li><strong>Feudalismo:</strong> relações de suserania e vassalagem entre nobres (terra em troca de fidelidade militar) e servidão dos camponeses (presos à terra, devendo corveia, talha e banalidades).</li>
<li><strong>Igreja:</strong> poder espiritual e temporal; maior proprietária de terras; quase monopólio da escrita e do ensino nos mosteiros. A salvação da alma orientava a vida.</li>
<li><strong>Cruzadas</strong> (a partir de 1095, convocadas pelo papa Urbano II): expedições para tomar Jerusalém, com promessa de perdão dos pecados (indulgência). Pela primeira vez, a salvação ficava ao alcance de todos os fiéis por meio de uma <strong>ação voluntária</strong>, e não só pela vida religiosa.</li>
<li><strong>Baixa Idade Média</strong> (séculos XI a XV): renascimento comercial e urbano, feiras, burgos, corporações de ofício e as primeiras <strong>universidades</strong> (Bolonha, Paris, Oxford), que reúnem tradição e conhecimento.</li>
<li><strong>Crise do século XIV:</strong> fome, peste negra, Guerra dos Cem Anos e revoltas camponesas.</li>
<li><strong>Mundo islâmico:</strong> preservou e traduziu os gregos e desenvolveu matemática, medicina e astronomia, saberes que chegaram à Europa.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 69)}: a pregação das Cruzadas abre "as portas da graça" a todos os fiéis. A resposta: a salvação por meio das <strong>ações voluntárias</strong> (partir para o Oriente). Foi um dos seus erros: você marcou B (práticas litúrgicas), que seriam os ritos da Igreja, e o texto fala de partir e lutar.</li>
<li>${cite('24d1', 59)}: as universidades medievais como legado. A resposta: <strong>agregar tradição e conhecimento científico</strong>.</li>
<li>${cite('25d1', 89)}: textos sagrados (Bíblia e Alcorão) sobre ciência e ofícios. A resposta: o papel da ciência para o <strong>desenvolvimento social e as práticas laborais</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>O Enem combate a imagem da Idade Média como "idade das trevas": cobra universidades, saberes e instituições que ela legou, e a religiosidade como lógica do período.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>"Idade das trevas" e "rejeição total do saber" costumam ser distratores. E na pergunta sobre a salvação, procure o <strong>meio</strong> descrito no texto (partir, lutar, peregrinar): ele é o que responde ao "por meio de".</p></div>`, [
    { base: ['O senhor concedia ao cavaleiro um feudo; o cavaleiro jurava fidelidade e prometia lutar quando convocado.'], src: 'Texto escrito para esta apostila.', cmd: 'A relação descrita corresponde à',
      alts: ['suserania e vassalagem entre membros da nobreza.', 'servidão entre camponeses e senhores.', 'relação de trabalho assalariado entre patrão e operário.', 'escravidão comercial praticada no Atlântico.', 'organização das corporações de ofício urbanas.'], ans: 'A', hab: 'H1', dif: 'fácil',
      ex: { A: 'terra em troca de fidelidade militar entre nobres: suserania (quem concede) e vassalagem (quem recebe).', B: 'a servidão envolve camponeses presos à terra, não cavaleiros.', C: 'salário é relação capitalista (anacronismo).', D: 'a escravidão atlântica é moderna.', E: 'as corporações reúnem artesãos urbanos.' }, traps: { B: 'detalhe', C: 'anacronismo' } },
    { base: ['A partir do século XI, cidades cresceram ao redor de feiras; mercadores e artesãos passaram a se organizar em associações e a buscar liberdades junto aos senhores.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve um aspecto da Baixa Idade Média, que é o(a)',
      alts: ['fortalecimento do isolamento rural das aldeias.', 'fim completo do poder da Igreja.', 'renascimento comercial e urbano.', 'adoção do trabalho assalariado industrial.', 'colonização da América pelos europeus.'], ans: 'C', hab: 'H1', dif: 'fácil',
      ex: { C: 'feiras, crescimento das cidades e associações de artesãos e mercadores: renascimento comercial e urbano.', A: 'é o oposto: cresce a vida urbana.', B: '"fim completo" é exagero; a Igreja continua poderosa.', D: 'indústria assalariada é posterior (anacronismo).', E: 'a colonização da América é moderna.' }, traps: { B: 'exagero', D: 'anacronismo' } },
    { base: ['Estudiosos de Bagdá e de Córdoba traduziram obras de Aristóteles e de médicos gregos e desenvolveram a álgebra; séculos depois, esses textos chegaram às escolas cristãs da Europa.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto evidencia o papel do mundo islâmico medieval na',
      alts: ['destruição do saber da Antiguidade.', 'proibição do estudo da matemática.', 'separação definitiva entre Oriente e Ocidente.', 'preservação e transmissão do conhecimento antigo.', 'imposição do latim como língua da ciência.'], ans: 'D', hab: 'H2', dif: 'fácil',
      ex: { D: 'traduzir os gregos e desenvolver a álgebra, que depois chegou à Europa, é preservar e transmitir saber.', A: 'é o oposto. Termo oposto.', B: 'a álgebra foi desenvolvida ali.', C: 'houve circulação de saberes.', E: 'as traduções eram para o árabe.' }, traps: { A: 'oposto' } }
  ]);

  deep('H7', `<h4>Aprofundamento: colonização, sociedade e a virada de 1808</h4>
<ul>
<li><strong>Economia colonial:</strong> pau-brasil, depois o açúcar (engenho, <em>plantation</em>, monocultura para exportação, trabalho escravizado africano) e, no século XVIII, o ouro em Minas Gerais (quinto, derrama, crescimento urbano).</li>
<li><strong>Povos indígenas:</strong> resistência, alianças e guerras, aldeamentos jesuíticos e escravização. A <strong>antropofagia ritual</strong> dos tupis seguia regras e conferia honra ao guerreiro; os europeus a usaram para justificar a conquista como luta contra a "selvageria".</li>
<li><strong>Sociedade e instituições:</strong> a Igreja e as irmandades organizavam a assistência. A Roda dos Expostos (Salvador, 1726) acolhia bebês abandonados sob um <strong>preceito sociorreligioso</strong> (caridade e batismo).</li>
<li><strong>Revoltas:</strong> nativistas, sem projeto de independência (Beckman, Emboabas, Mascates), e separatistas (Inconfidência Mineira, 1789; Conjuração Baiana, 1798, com participação popular e de pessoas escravizadas e libertas).</li>
<li><strong>1808:</strong> a corte portuguesa chega ao Rio. Abertura dos portos, Banco do Brasil, Imprensa Régia, elevação a Reino Unido (1815). A imprensa oficial serviu para <strong>integrar as regiões ao poder central</strong> do novo império na América.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 83)}: a Impressão Régia (1808). A resposta: <strong>integrar as regiões territoriais ao poder central</strong>. Foi um dos seus erros: você marcou A (normativas ideológicas aos periódicos), mas o texto destaca a sustentação política do novo império, e não a regulação da imprensa.</li>
<li>${cite('25d1', 73)}: o canibalismo tupi. A resposta: <strong>selvageria</strong> para os europeus e <strong>empoderamento</strong> (honra) para os indígenas.</li>
<li>${cite('25d1', 78)}: a Roda dos Expostos de Salvador. A resposta: justificava-se por um <strong>preceito de natureza sociorreligiosa</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>História do Brasil colonial costuma cobrar o <strong>olhar de cada grupo</strong> (europeu × indígena × africano) e a função das instituições. Quando o comando diz "respectivamente", confira a ordem dos grupos.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Anacronismo: "defesa dos direitos humanos" ou "ideologia abolicionista" para explicar instituições do século XVIII estão fora de época. A Roda dos Expostos era caridade religiosa, não política de direitos.</p></div>`, [
    { base: ['No engenho, a cana era plantada em grandes extensões, moída e transformada em açúcar por trabalhadores escravizados, e o produto seguia para os portos europeus.'], src: 'Texto escrito para esta apostila.', cmd: 'O sistema descrito caracteriza-se por',
      alts: ['pequenas propriedades policultoras voltadas ao mercado interno.', 'latifúndio, monocultura, trabalho escravizado e produção para exportação.', 'trabalho assalariado e industrialização local.', 'agricultura de subsistência indígena.', 'economia mineradora baseada no ouro.'], ans: 'B', hab: 'H17', dif: 'fácil',
      ex: { B: 'grandes extensões, um só produto, trabalho escravizado e destino externo: o modelo de plantation.', A: 'é o oposto em todos os elementos.', C: 'trabalho assalariado e indústria são anacronismo.', D: 'não é subsistência.', E: 'o ouro é do século XVIII; aqui é açúcar.' }, traps: { C: 'anacronismo', E: 'detalhe' } },
    { base: ['Em 1798, em Salvador, panfletos pregavam a igualdade, o fim da escravidão e a república; entre os condenados estavam alfaiates e soldados, muitos deles pardos e libertos.'], src: 'Texto escrito para esta apostila.', cmd: 'A Conjuração Baiana se distingue da Inconfidência Mineira por',
      alts: ['ter sido liderada exclusivamente por grandes proprietários.', 'defender a manutenção do domínio português.', 'ter ocorrido depois da Independência do Brasil.', 'não ter tido nenhuma influência das ideias iluministas.', 'reunir camadas populares e propor o fim da escravidão.'], ans: 'E', hab: 'H3, H8', dif: 'média',
      ex: { E: 'alfaiates, soldados, pardos e libertos, com a proposta de abolir a escravidão: caráter popular, diferente da elite mineira.', A: 'é o contrário: havia muitos populares.', B: 'pregava a república.', C: 'foi em 1798; a Independência é de 1822.', D: 'igualdade e república são ideias iluministas.' }, traps: { A: 'oposto', C: 'anacronismo' } },
    { base: ['Em 1808, logo após a chegada da corte ao Brasil, foi decretada a abertura dos portos às nações amigas.'], src: 'Texto escrito para esta apostila.', cmd: 'A medida representou',
      alts: ['o fim do monopólio comercial português sobre a colônia.', 'a proclamação da Independência do Brasil.', 'a abolição da escravidão no Brasil.', 'a proibição do comércio com a Inglaterra.', 'o início da exploração do pau-brasil.'], ans: 'A', hab: 'H3', dif: 'fácil',
      ex: { A: 'abrir os portos a outras nações rompeu o exclusivo metropolitano.', B: 'a Independência é de 1822.', C: 'a abolição é de 1888.', D: 'a Inglaterra foi a principal beneficiada.', E: 'o pau-brasil é do século XVI.' }, traps: { D: 'oposto' } }
  ]);

  deep('H5', `<h4>Aprofundamento: revoluções, ideologias e o imperialismo do século XIX</h4>
<ul>
<li><strong>Revolução Industrial</strong> (Inglaterra, a partir da segunda metade do século XVIII): máquina a vapor, fábrica, proletariado, jornadas longas, trabalho infantil. Reações: ludismo (quebra de máquinas), cartismo (direitos políticos), sindicatos.</li>
<li><strong>Revolução Francesa</strong> (1789): fim do Antigo Regime, Declaração dos Direitos do Homem e do Cidadão, fases (monarquia constitucional, república jacobina e Terror, Diretório) e Napoleão.</li>
<li><strong>Ideologias:</strong> liberalismo (liberdades individuais e mercado), socialismo (utópico; e o científico de Marx e Engels, <em>Manifesto Comunista</em>, 1848), anarquismo, nacionalismo (unificações da Itália e da Alemanha, esta em 1871).</li>
<li><strong>Imperialismo</strong> (segunda metade do século XIX): busca de matérias-primas, mercados e áreas de investimento; partilha da África na Conferência de Berlim (1884–1885); justificativas como o darwinismo social e a "missão civilizadora".</li>
<li><strong>Ciência e império:</strong> expedições científicas, museus etnográficos e coleções de objetos de outros povos serviram também a <strong>projetos nacionalistas e imperialistas</strong>: conhecer para classificar, dominar e exibir.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 90)}: a expedição do Museu de Antropologia e Etnografia de São Petersburgo (1914) para coletar material na América do Sul. A resposta: um projeto nacionalista de caráter <strong>imperialista e colonizador</strong>. Foi um dos seus erros: você marcou C (lúdico e filantrópico), lendo a expedição como passeio benevolente; o Enem esperava a crítica à ciência a serviço do império.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Expedições, museus e coleções do século XIX e do início do XX aparecem para cobrar a <strong>dimensão política da ciência</strong>. Se o texto fala em coletar objetos e povos de outras regiões para compor coleções nacionais, pense em imperialismo.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Alternativas "benevolentes" (filantropia, lazer, humanitarismo) para ações de potências no século XIX são o distrator clássico. O "além do significado científico" do comando é a pista: pede o sentido político.</p></div>`, [
    { base: ['Em 1884–1885, representantes de potências europeias reuniram-se em Berlim e estabeleceram regras para a ocupação do continente africano, sem a presença de nenhum povo africano.'], src: 'Texto escrito para esta apostila.', cmd: 'A conferência expressa o',
      alts: ['reconhecimento da independência dos povos africanos.', 'fim da presença europeia na África.', 'apoio europeu às tradições políticas africanas.', 'imperialismo, com a partilha da África entre as potências.', 'início do tráfico atlântico de pessoas escravizadas.'], ans: 'D', hab: 'H7', dif: 'fácil',
      ex: { D: 'potências definindo regras para ocupar a África, sem africanos, é a partilha imperialista.', A: 'é o oposto. Termo oposto.', B: 'a presença se amplia.', C: 'as tradições africanas foram ignoradas.', E: 'o tráfico começou séculos antes (anacronismo).' }, traps: { A: 'oposto', E: 'anacronismo' } },
    { base: ['Operários ingleses invadiram fábricas e destruíram teares mecânicos, acusando as máquinas de roubar seus empregos e baixar seus salários.'], src: 'Texto escrito para esta apostila.', cmd: 'O movimento descrito é o',
      alts: ['cartismo, que reivindicava o voto universal masculino.', 'sindicalismo revolucionário do século XX.', 'ludismo, reação à mecanização da produção.', 'liberalismo econômico de Adam Smith.', 'socialismo utópico de Robert Owen.'], ans: 'C', hab: 'H15', dif: 'fácil',
      ex: { C: 'quebrar máquinas contra o desemprego e a queda salarial: ludismo.', A: 'o cartismo reivindicava direitos políticos, sem destruir máquinas.', B: 'o texto é da Revolução Industrial inglesa, antes do século XX.', D: 'o liberalismo é uma doutrina, não um movimento operário.', E: 'Owen propunha comunidades cooperativas.' }, traps: { A: 'detalhe' } },
    { base: ['"Liberdade, igualdade, fraternidade." O lema da Revolução Francesa sintetizava a crítica aos privilégios do clero e da nobreza.'], src: 'Texto escrito para esta apostila.', cmd: 'A crítica aos privilégios dirigia-se ao',
      alts: ['regime socialista soviético.', 'Antigo Regime, com sua sociedade de ordens.', 'liberalismo burguês.', 'parlamentarismo inglês.', 'imperialismo do século XIX.'], ans: 'B', hab: 'H3', dif: 'fácil',
      ex: { B: 'clero e nobreza privilegiados formavam a sociedade de ordens do Antigo Regime.', A: 'o regime soviético é do século XX (anacronismo).', C: 'o lema é burguês, não um ataque ao liberalismo.', D: 'o alvo era a monarquia absolutista francesa.', E: 'o imperialismo é posterior.' }, traps: { A: 'anacronismo', E: 'anacronismo' } }
  ]);

  deep('H1', `<h4>Aprofundamento: memória, patrimônio e disputas sobre o passado</h4>
<ul>
<li><strong>História × memória:</strong> a história é conhecimento crítico, feito com método e fontes; a memória é a lembrança viva de grupos, seletiva e afetiva. As duas se cruzam, mas não são a mesma coisa.</li>
<li><strong>Lugares de memória</strong> (Pierre Nora): monumentos, museus, arquivos, datas comemorativas e muros que um grupo escolhe preservar. Toda preservação é uma <strong>escolha</strong>, e por isso há disputas: o que lembrar, como lembrar, o que apagar.</li>
<li><strong>Patrimônio</strong> histórico e cultural: protegê-lo é proteger a memória coletiva; destruí-lo para um empreendimento privado é uma <strong>violação dessa memória</strong>.</li>
<li><strong>Fontes:</strong> escritas, orais, visuais e materiais. Toda fonte tem autor, contexto e intenção, e precisa de crítica.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Trocar o nome de uma rua que homenageava um torturador da ditadura não "apaga a história": muda o que a cidade escolhe <strong>homenagear</strong>. A história do período continua nos arquivos e nos livros.</p></div>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('25d1', 71)}: berlinenses protestam contra a demolição de um trecho do Muro (East Side Gallery) para um condomínio de luxo. A resposta: a demolição representaria uma <strong>violação da memória coletiva</strong>.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Questões de memória e patrimônio pedem que você reconheça o valor do lugar ou do monumento para a <strong>identidade de um grupo</strong> e a disputa sobre o passado. Alternativas técnicas (arquitetura, mobilidade, fronteiras) costumam ser distratores.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Monumento não é fonte neutra: ele registra a versão de quem o ergueu. E memória não é sinônimo de verdade histórica; é uma das fontes que o historiador critica.</p></div>`, [
    { base: ['Um antigo presídio político da ditadura foi transformado em memorial, com celas preservadas e depoimentos gravados de ex-presos.'], src: 'Texto escrito para esta apostila.', cmd: 'A transformação do presídio em memorial tem como objetivo principal',
      alts: ['preservar a memória das violações e estimular a reflexão sobre o passado.', 'apagar os registros do período autoritário.', 'homenagear os responsáveis pela repressão.', 'ampliar a capacidade do sistema prisional.', 'transformar o local em centro comercial.'], ans: 'A', hab: 'H1', dif: 'fácil',
      ex: { A: 'preservar celas e depoimentos mantém viva a memória e convida à reflexão.', B: 'é o oposto. Termo oposto.', C: 'os depoimentos são das vítimas.', D: 'o presídio deixa de funcionar.', E: 'não há uso comercial.' }, traps: { B: 'oposto', C: 'oposto' } },
    { base: ['Um historiador encontra duas cartas sobre a mesma greve de 1917: uma escrita por um industrial ao prefeito, outra por uma operária à irmã.'], src: 'Situação escrita para esta apostila.', cmd: 'Ao usar as duas cartas como fontes, o historiador deve',
      alts: ['descartar a carta da operária, por não ser documento oficial.', 'considerar a carta do industrial como a versão verdadeira.', 'escolher a carta mais antiga e ignorar a outra.', 'confrontar as fontes, considerando o lugar social e a intenção de cada autor.', 'aceitar as duas cartas sem análise, pois todo documento é neutro.'], ans: 'D', hab: 'H1, H4', dif: 'média',
      ex: { D: 'cada carta expressa um ponto de vista; o trabalho do historiador é confrontá-las criticamente.', A: 'fontes pessoais também são fontes históricas.', B: 'nenhuma fonte é automaticamente verdadeira.', C: 'a data não decide a verdade.', E: 'nenhum documento é neutro.' }, traps: { E: 'exagero' } },
    { base: ['Na praça central, a estátua de um bandeirante é alvo de protestos de grupos indígenas, que lembram a escravização praticada pelas bandeiras.'], src: 'Texto escrito para esta apostila.', cmd: 'O conflito em torno da estátua evidencia que os monumentos',
      alts: ['são registros neutros e objetivos do passado.', 'não têm relação com a identidade das comunidades.', 'expressam escolhas sobre o que lembrar e quem homenagear, sendo objeto de disputa.', 'devem ser preservados sem nenhuma discussão.', 'servem apenas para decorar o espaço urbano.'], ans: 'C', hab: 'H1, H2', dif: 'fácil',
      ex: { C: 'a estátua homenageia um lado da história; os protestos mostram outra memória em disputa.', A: 'monumentos não são neutros.', B: 'o conflito mostra exatamente essa relação.', D: 'o texto mostra que há discussão.', E: 'a disputa vai além da decoração.' }, traps: { A: 'oposto' } }
  ]);

  deep('H2', `<h4>Aprofundamento: cidadania, lei e conflito na Antiguidade</h4>
<ul>
<li><strong>Grécia:</strong> Atenas criou a democracia direta (reformas de Clístenes, fim do século VI a.C.), mas restrita a homens adultos nascidos de pais atenienses: mulheres, estrangeiros (metecos) e escravizados ficavam de fora. Esparta era oligárquica e militarista.</li>
<li><strong>Roma:</strong> Monarquia, República e Império. Na República, patrícios (aristocracia) concentravam o poder; os <strong>plebeus</strong> lutaram por direitos: tribunos da plebe e a <strong>Lei das Doze Tábuas</strong> (meados do século V a.C.), que pôs as leis por escrito e limitou a manipulação da justiça pelos patrícios.</li>
<li><strong>Escravidão antiga:</strong> por dívida ou guerra, base de muitas economias, diferente da escravidão moderna racializada.</li>
<li><strong>Egito e Mesopotâmia:</strong> civilizações dos rios, escrita, Estado teocrático, Código de Hamurábi.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('25d1', 87)}: Fustel de Coulanges: na realeza e no início da República, as leis eram orais e os patrícios manipulavam a justiça. A resposta: a situação foi contestada pelos <strong>plebeus, que almejavam participar da vida política</strong>.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>A Antiguidade aparece para discutir a <strong>origem de conceitos políticos</strong> (cidadania, democracia, lei escrita) e seus limites. Pergunte: quem estava incluído e quem estava excluído?</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Democracia ateniense não era universal: atribuir a ela "inclusão de todos" é anacronismo. E, em Roma, quem reivindica as leis escritas são os <strong>plebeus</strong>, não os patrícios nem os monarcas.</p></div>`, [
    { base: ['Em Atenas, no século V a.C., as decisões eram tomadas na assembleia, onde cada cidadão podia falar e votar.'], src: 'Texto escrito para esta apostila.', cmd: 'Sobre a democracia ateniense, é correto afirmar que',
      alts: ['incluía mulheres, estrangeiros e escravizados.', 'era representativa, com deputados eleitos.', 'foi criada pelo Império Romano.', 'garantia a igualdade política a toda a população.', 'era direta, mas restrita aos cidadãos homens atenienses.'], ans: 'E', hab: 'H3', dif: 'fácil',
      ex: { E: 'participação direta na assembleia, mas só para homens nascidos de pais atenienses.', A: 'esses grupos eram excluídos.', B: 'era direta, não representativa.', C: 'Atenas é grega e anterior ao Império Romano.', D: '"toda a população" é exagero; a maioria não votava.' }, traps: { A: 'oposto', D: 'exagero' } },
    { base: ['"Se um patrono prejudicar seu cliente, que seja maldito." "Se alguém fizer um testamento, que sua palavra seja lei." Trechos atribuídos à Lei das Doze Tábuas.'], src: 'Texto escrito para esta apostila, a partir da Lei das Doze Tábuas.', cmd: 'A criação das Doze Tábuas, em Roma, foi importante porque',
      alts: ['aboliu a escravidão no mundo romano.', 'tornou as leis escritas e públicas, limitando o arbítrio dos patrícios.', 'transformou Roma numa monarquia absolutista.', 'concedeu cidadania a todos os povos conquistados.', 'eliminou as diferenças sociais entre patrícios e plebeus.'], ans: 'B', hab: 'H3', dif: 'média',
      ex: { B: 'com a lei escrita e exposta, a justiça deixava de depender só da interpretação dos patrícios.', A: 'a escravidão continuou.', C: 'Roma era uma república.', D: 'a cidadania ampla é muito posterior (212 d.C.).', E: 'limitar o arbítrio não eliminou as desigualdades. Exagero.' }, traps: { E: 'exagero', D: 'anacronismo' } },
    { base: ['Na Roma antiga, um agricultor que não pagava suas dívidas podia ser reduzido à escravidão; também eram escravizados os prisioneiros de guerra.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto indica que a escravidão antiga',
      alts: ['era baseada exclusivamente na cor da pele.', 'não existia na Roma antiga.', 'era proibida pela Lei das Doze Tábuas.', 'podia resultar de dívidas e de guerras.', 'foi criada pelos portugueses no século XV.'], ans: 'D', hab: 'H3', dif: 'fácil',
      ex: { D: 'dívida e guerra eram origens comuns da escravidão antiga.', A: 'a racialização é traço da escravidão moderna. Anacronismo.', B: 'o texto descreve sua existência.', C: 'as leis romanas regulavam a escravidão.', E: 'a escravidão é muito anterior.' }, traps: { A: 'anacronismo', E: 'anacronismo' } }
  ]);

  deep('H4', `<h4>Aprofundamento: o mundo moderno entre comércio, conquista e Iluminismo</h4>
<ul>
<li><strong>Comércio e cidades:</strong> Veneza, Gênova e depois Lisboa, Sevilha e Amsterdã integram rotas mediterrâneas, africanas e asiáticas; o cosmopolitismo das cidades portuárias nasce dessa <strong>integração comercial</strong>.</li>
<li><strong>Grandes navegações e conquista da América:</strong> exploração, escravização e evangelização. Vozes críticas como o frei <strong>Bartolomeu de Las Casas</strong> denunciaram a violência contra os indígenas e influenciaram as Leis Novas (1542): odiado pelos colonizadores, respeitado pelos povos nativos.</li>
<li><strong>Renascimento, Reforma e Contrarreforma:</strong> humanismo, ruptura da unidade cristã (Lutero, 1517), Concílio de Trento.</li>
<li><strong>Absolutismo e mercantilismo:</strong> concentração do poder no rei, balança comercial favorável, metalismo, colônias como fonte de riqueza.</li>
<li><strong>Iluminismo</strong> (século XVIII): razão, crítica ao absolutismo e à Igreja, direitos naturais. Salões aristocráticos e cafés abertos a todos foram espaços da <strong>esfera pública</strong> (Habermas) onde as ideias circulavam, mas também separavam o "Alto" do "Baixo" Iluminismo.</li>
<li><strong>Cultura popular e corte:</strong> danças e festas camponesas foram ora proibidas, ora apropriadas pela aristocracia.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 49)}: Veneza cosmopolita na pintura e em Braudel. A resposta: a <strong>integração do comércio mediterrâneo</strong>.</li>
<li>${cite('24d1', 50)}: Galeano sobre Las Casas. A resposta: <strong>detestado pelos colonizadores e respeitado pelos povos do lugar</strong>.</li>
<li>${cite('24d1', 75)}: os salões e os cafés do Iluminismo. A resposta: <strong>segregar pensadores e aumentar a circulação de ideias</strong>.</li>
<li>${cite('24d1', 51)}: a valsa rejeitada no início da Idade Moderna. A resposta: por congregar <strong>elementos provenientes de segmentos populares</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>A Idade Moderna é cobrada pela <strong>relação entre grupos</strong>: colonizadores × colonizados, aristocracia × povo, salões × cafés. Leia quem fala de quem e com que juízo.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Em textos com dois pontos de vista ("o homem mais odiado... o homem mais amado"), a resposta junta os <strong>dois grupos certos</strong> na ordem certa. Troque mentalmente os grupos de cada alternativa para conferir.</p></div>`, [
    { base: ['"O Estado sou eu." A frase atribuída a Luís XIV resume uma forma de governo em que o rei concentrava os poderes e se dizia escolhido por Deus.'], src: 'Texto escrito para esta apostila.', cmd: 'A forma de governo descrita é o',
      alts: ['parlamentarismo liberal.', 'federalismo republicano.', 'absolutismo monárquico, justificado pelo direito divino.', 'socialismo de Estado.', 'feudalismo descentralizado.'], ans: 'C', hab: 'H3', dif: 'fácil',
      ex: { C: 'concentração dos poderes no rei e origem divina do poder: absolutismo.', A: 'no parlamentarismo o poder é dividido.', B: 'não há república.', D: 'socialismo é do século XIX em diante (anacronismo).', E: 'o feudalismo era descentralizado, o oposto.' }, traps: { D: 'anacronismo', E: 'oposto' } },
    { base: ['Em 1517, Martinho Lutero criticou a venda de indulgências e defendeu que a salvação vem pela fé e que todo fiel pode ler a Bíblia.'], src: 'Texto escrito para esta apostila.', cmd: 'As ideias de Lutero contribuíram para',
      alts: ['a ruptura da unidade cristã na Europa ocidental.', 'o fortalecimento do monopólio da Igreja de Roma.', 'o início das Cruzadas no Oriente.', 'a proibição da tradução da Bíblia.', 'o fim das monarquias europeias.'], ans: 'A', hab: 'H1, H3', dif: 'fácil',
      ex: { A: 'a crítica de Lutero deu origem às igrejas protestantes e rompeu a unidade cristã.', B: 'é o oposto. Termo oposto.', C: 'as Cruzadas são medievais.', D: 'Lutero traduziu a Bíblia para o alemão.', E: 'muitos reis apoiaram a Reforma.' }, traps: { B: 'oposto', C: 'anacronismo' } },
    { base: ['Para os mercantilistas, um reino é rico quando acumula ouro e prata e exporta mais do que importa; as colônias devem fornecer matérias-primas e comprar só da metrópole.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve princípios do mercantilismo, como',
      alts: ['o livre comércio entre colônias e outras nações.', 'a defesa da autonomia econômica das colônias.', 'a abolição dos impostos sobre o comércio.', 'a valorização do trabalho assalariado industrial.', 'o metalismo, a balança comercial favorável e o exclusivo colonial.'], ans: 'E', hab: 'H17', dif: 'média',
      ex: { E: 'acumular metais, exportar mais do que importar e reservar o comércio colonial à metrópole.', A: 'é o oposto do exclusivo colonial.', B: 'as colônias deviam servir à metrópole.', C: 'não há abolição de impostos.', D: 'trabalho assalariado industrial é posterior.' }, traps: { A: 'oposto', D: 'anacronismo' } }
  ]);

  deep('H6', `<h4>Aprofundamento: guerras, totalitarismos e Guerra Fria</h4>
<ul>
<li><strong>Primeira Guerra Mundial</strong> (1914–1918): imperialismo, nacionalismos, alianças, guerra de trincheiras. A <strong>censura</strong> dos países em guerra controlava as notícias do front; a Espanha, neutra, noticiou livremente a pandemia de gripe de 1918, que ficou injustamente conhecida como "gripe espanhola".</li>
<li><strong>Revolução Russa</strong> (1917) e formação da URSS.</li>
<li><strong>Crise de 1929</strong> e ascensão dos totalitarismos (fascismo italiano, nazismo alemão, stalinismo): partido único, culto ao líder, propaganda, perseguição de opositores e de minorias.</li>
<li><strong>Segunda Guerra Mundial</strong> (1939–1945): Holocausto, bombas atômicas, criação da ONU (1945).</li>
<li><strong>Guerra Fria</strong> (1947–1991): capitalismo × socialismo, corrida armamentista e espacial, Muro de Berlim (1961–1989), conflitos indiretos (Coreia, Vietnã), descolonização da África e da Ásia.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('25d1', 52)}: o nome "gripe espanhola". A resposta: a denominação foi determinada pelo <strong>controle dos relatos oriundos de campos de batalha</strong> nos países em guerra, enquanto a Espanha, neutra, tinha imprensa mais livre.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>O século XX aparece com o <strong>impacto social</strong> dos grandes eventos (censura, propaganda, refugiados, memória do Holocausto), mais do que com batalhas.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Nome não é origem: a "gripe espanhola" não surgiu na Espanha. E na Guerra Fria, EUA e URSS evitaram o confronto direto; as guerras foram indiretas, em outros países.</p></div>`, [
    { base: ['Durante a Guerra Fria, Estados Unidos e União Soviética nunca se enfrentaram diretamente, mas apoiaram lados opostos em guerras na Coreia, no Vietnã e no Afeganistão.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve uma característica da Guerra Fria, que é o(a)',
      alts: ['aliança militar permanente entre as duas superpotências.', 'disputa por meio de conflitos indiretos em outros países.', 'fim da corrida armamentista.', 'neutralidade das superpotências nos conflitos regionais.', 'unificação do mundo sob um só sistema econômico.'], ans: 'B', hab: 'H7', dif: 'fácil',
      ex: { B: 'sem guerra direta, as superpotências disputavam por meio de conflitos em outros países.', A: 'eram rivais. Termo oposto.', C: 'a corrida armamentista marcou o período.', D: 'elas apoiavam os lados em luta.', E: 'havia dois sistemas em disputa.' }, traps: { A: 'oposto', D: 'oposto' } },
    { base: ['Cartazes com o rosto do líder em todas as praças, um único partido permitido, jornais sob controle e perseguição a quem discordasse.'], src: 'Texto escrito para esta apostila.', cmd: 'As características descritas são típicas dos regimes',
      alts: ['parlamentaristas liberais.', 'anarquistas.', 'democráticos pluripartidários.', 'totalitários do século XX.', 'feudais medievais.'], ans: 'D', hab: 'H11', dif: 'fácil',
      ex: { D: 'culto ao líder, partido único, censura e perseguição: totalitarismo.', A: 'o liberalismo admite partidos e imprensa livre.', B: 'o anarquismo rejeita o Estado.', C: 'há partido único, não vários.', E: 'propaganda de massa e partido são modernos (anacronismo).' }, traps: { C: 'oposto', E: 'anacronismo' } },
    { base: ['Após 1945, dezenas de países da África e da Ásia conquistaram a independência, muitas vezes após guerras de libertação contra as metrópoles europeias.'], src: 'Texto escrito para esta apostila.', cmd: 'O processo descrito é a',
      alts: ['descolonização afro-asiática.', 'partilha da África na Conferência de Berlim.', 'expansão marítima europeia.', 'unificação da Alemanha.', 'Revolução Industrial inglesa.'], ans: 'A', hab: 'H7', dif: 'fácil',
      ex: { A: 'independências na África e na Ásia depois de 1945: descolonização.', B: 'a partilha é do século XIX e é o oposto. Termo oposto.', C: 'a expansão marítima é dos séculos XV e XVI.', D: 'a unificação alemã é de 1871.', E: 'a Revolução Industrial é do século XVIII.' }, traps: { B: 'oposto' } }
  ]);

  deep('H8', `<h4>Aprofundamento: Império, escravidão e cidadania restrita</h4>
<ul>
<li><strong>Primeiro Reinado</strong> (1822–1831): Constituição de 1824 com Poder Moderador; voto censitário (por renda).</li>
<li><strong>Regências</strong> (1831–1840): revoltas provinciais (Cabanagem, Balaiada, Sabinada, Farroupilha, Revolta dos Malês, liderada por africanos muçulmanos em Salvador, em 1835).</li>
<li><strong>Segundo Reinado</strong> (1840–1889): café, parlamentarismo "às avessas", Guerra do Paraguai (1864–1870).</li>
<li><strong>Abolição gradual:</strong> fim do tráfico (Lei Eusébio de Queirós, 1850), Lei do Ventre Livre (1871), Lei dos Sexagenários (1885), Lei Áurea (1888). Artistas e intelectuais participaram do movimento abolicionista: Castro Alves, Joaquim Nabuco, André Rebouças, Luiz Gama, Chiquinha Gonzaga.</li>
<li><strong>Lei Saraiva</strong> (1881): eleição direta, mas com a <strong>exigência de alfabetização</strong>, que cortou quase 90% do eleitorado. A República manteve a exclusão dos analfabetos.</li>
<li><strong>Interior e Amazônia:</strong> regatões (comerciantes fluviais) teciam redes de troca e de <strong>sociabilidade</strong> com indígenas, quilombolas e pequenos produtores.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 58)}: José Murilo de Carvalho e a queda do eleitorado após 1881. A resposta: a <strong>exigência da alfabetização</strong>.</li>
<li>${cite('24d1', 64)}: Chiquinha Gonzaga e Castro Alves. A resposta: a defesa do <strong>movimento abolicionista</strong>.</li>
<li>${cite('24d1', 84)}: os regatões da Amazônia no século XIX. A resposta: a <strong>construção de redes de sociabilidade no interior</strong> brasileiro.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>O Império é cobrado pelos <strong>limites da cidadania</strong> (voto censitário e depois a exclusão dos analfabetos) e pela luta contra a escravidão, com destaque para a participação de pessoas negras.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>A Lei Saraiva não restringiu o voto por gênero (as mulheres já eram excluídas) nem tornou o voto obrigatório: a exclusão em massa veio da alfabetização. E a abolição não foi "concessão" isolada da princesa: houve luta de abolicionistas e resistência dos próprios escravizados.</p></div>`, [
    { base: ['A Constituição de 1824 previa que só votasse quem tivesse uma renda mínima anual.'], src: 'Texto escrito para esta apostila.', cmd: 'O critério descrito caracteriza o voto',
      alts: ['universal', 'secreto', 'feminino', 'obrigatório', 'censitário'], ans: 'E', hab: 'H11', dif: 'fácil',
      ex: { E: 'voto condicionado à renda é o voto censitário.', A: 'universal seria sem restrição de renda.', B: 'o texto não trata do sigilo.', C: 'as mulheres não votavam.', D: 'não se fala de obrigatoriedade.' }, traps: { A: 'oposto' } },
    { base: ['Advogado e ex-escravizado, Luiz Gama libertou na Justiça centenas de pessoas mantidas ilegalmente em cativeiro, usando a própria lei de 1831 que proibia o tráfico.'], src: 'Texto escrito para esta apostila.', cmd: 'A atuação de Luiz Gama mostra que a abolição',
      alts: ['foi uma concessão exclusiva da família imperial.', 'contou com a participação ativa de pessoas negras.', 'ocorreu sem nenhum uso das leis do Império.', 'foi defendida pelos grandes fazendeiros de café.', 'aconteceu antes da Independência.'], ans: 'B', hab: 'H3, H8', dif: 'média',
      ex: { B: 'um ex-escravizado liberta centenas pela via jurídica: protagonismo negro na luta abolicionista.', A: '"exclusiva" é falso diante do caso.', C: 'ele usou justamente a lei.', D: 'os cafeicultores resistiam à abolição.', E: 'a abolição é de 1888.' }, traps: { A: 'exagero', D: 'oposto' } },
    { base: ['Em 1835, africanos muçulmanos escravizados e libertos organizaram em Salvador uma revolta, com planos escritos em árabe.'], src: 'Texto escrito para esta apostila.', cmd: 'A revolta descrita, conhecida como Revolta dos Malês, evidencia',
      alts: ['a ausência de resistência dos escravizados.', 'a origem europeia do movimento abolicionista.', 'a organização e a diversidade cultural dos africanos escravizados.', 'o apoio do governo regencial aos revoltosos.', 'a adesão dos revoltosos ao catolicismo oficial.'], ans: 'C', hab: 'H3, H5', dif: 'média',
      ex: { C: 'muçulmanos, letrados em árabe e organizados: a revolta mostra organização e diversidade cultural.', A: 'é o oposto. Termo oposto.', B: 'o movimento foi africano.', D: 'o governo reprimiu a revolta.', E: 'eram muçulmanos.' }, traps: { A: 'oposto' } }
  ]);

  deep('H9', `<h4>Aprofundamento: a República das oligarquias à crise de 1954</h4>
<ul>
<li><strong>Primeira República</strong> (1889–1930): o novo regime quis se apresentar como moderno. Eletricidade, telégrafo, cinema e bondes elétricos foram ligados a uma <strong>visão republicana de nação</strong> e de progresso. Na política, coronelismo, voto de cabresto, política dos governadores e café com leite.</li>
<li><strong>Higienismo e saúde pública:</strong> campanhas sanitárias (Oswaldo Cruz, Revolta da Vacina, 1904) e a organização hierárquica dos serviços, com médicos no topo e auxiliares na base.</li>
<li><strong>Era Vargas</strong> (1930–1945): centralização, leis trabalhistas (CLT, 1943), Estado Novo (1937–1945) com censura e propaganda pelo <strong>DIP</strong>, que divulgava imagens idealizadas e estereotipadas do Brasil.</li>
<li><strong>República de 1946–1964:</strong> Vargas volta eleito em 1950. A oposição da UDN, liderada por Carlos Lacerda, cresce; o atentado da Rua Tonelero (1954), contra Lacerda, envolvendo pessoas ligadas ao governo, <strong>intensificou os ataques udenistas</strong> e levou à crise que terminou no suicídio de Vargas.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 64)}: o atentado da Rua Tonelero. A resposta: a consequência imediata foi a <strong>intensificação dos ataques do grupo udenista</strong>.</li>
<li>${cite('24d1', 77)}: capas da revista <em>Travel in Brazil</em> feitas pelo DIP. A resposta: <strong>estereótipos da cultura nacional</strong>.</li>
<li>${cite('24d1', 49)}: a chegada de inventos no Brasil de 1890 a 1914. A resposta: vinculados à <strong>visão republicana de nação</strong>.</li>
<li>${cite('24d1', 47)}: sanitaristas dos anos 1920 e 1930. A resposta: uma mensagem de <strong>hierarquização profissional</strong> na saúde pública.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>A República foi cobrada 4 vezes em dois anos. Os textos ligam modernização, propaganda e saúde pública a projetos políticos. Pergunte sempre: <strong>que projeto de nação</strong> está por trás?</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Propaganda oficial não é retrato fiel: as imagens do DIP mostravam um Brasil idealizado e estereotipado. E o atentado de 1954 não "mobilizou a defesa do governo": fortaleceu a oposição.</p></div>`, [
    { base: ['No interior, o coronel garantia votos ao candidato do governo estadual em troca de cargos e verbas; o eleitor votava sob vigilância, em voto aberto.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve uma prática da Primeira República conhecida como',
      alts: ['voto secreto e universal.', 'parlamentarismo republicano.', 'reforma agrária popular.', 'coronelismo e voto de cabresto.', 'trabalhismo varguista.'], ans: 'D', hab: 'H11', dif: 'fácil',
      ex: { D: 'troca de votos controlados por favores do governo e voto aberto vigiado: coronelismo e voto de cabresto.', A: 'o voto era aberto. Termo oposto.', B: 'não havia parlamentarismo.', C: 'não há reforma agrária.', E: 'o trabalhismo é da era Vargas.' }, traps: { A: 'oposto', E: 'anacronismo' } },
    { base: ['Em 1943, o governo reuniu as leis trabalhistas num único código, que garantia jornada de oito horas, férias e salário mínimo aos trabalhadores urbanos.'], src: 'Texto escrito para esta apostila.', cmd: 'A medida, tomada durante o governo de Getúlio Vargas, é a',
      alts: ['Consolidação das Leis do Trabalho (CLT).', 'Lei Áurea.', 'Constituição de 1824.', 'Lei de Terras.', 'Lei Saraiva.'], ans: 'A', hab: 'H11', dif: 'fácil',
      ex: { A: 'o código trabalhista de 1943 é a CLT.', B: 'a Lei Áurea é de 1888.', C: 'a Constituição de 1824 é do Império.', D: 'a Lei de Terras é de 1850.', E: 'a Lei Saraiva é de 1881.' } },
    { base: ['Em 1904, no Rio de Janeiro, a população se revoltou contra a vacinação obrigatória, feita com invasão de casas e sem explicação sobre a vacina.'], src: 'Texto escrito para esta apostila.', cmd: 'A Revolta da Vacina expressou',
      alts: ['o apoio unânime da população às campanhas sanitárias.', 'a recusa a qualquer medida de saúde pública por parte da elite.', 'a reação popular ao autoritarismo das reformas sanitárias e urbanas.', 'a vitória dos movimentos operários na Primeira República.', 'o fim da política do café com leite.'], ans: 'C', hab: 'H3, H15', dif: 'média',
      ex: { C: 'a obrigatoriedade imposta com invasão de casas e sem diálogo provocou a revolta popular.', A: 'houve revolta, não apoio. Termo oposto.', B: 'a revolta foi popular, não da elite.', D: 'não se trata de vitória operária.', E: 'o café com leite terminou em 1930.' }, traps: { A: 'oposto', E: 'anacronismo' } }
  ]);

  deep('H10', `<h4>Aprofundamento: ditaduras no Cone Sul e redemocratização</h4>
<ul>
<li><strong>Brasil</strong> (1964–1985): golpe civil-militar, Atos Institucionais (o AI-5, de 1968, fechou o Congresso, suspendeu o <em>habeas corpus</em> e ampliou a censura), bipartidarismo (Arena × MDB), "milagre econômico" com concentração de renda, tortura e desaparecimentos.</li>
<li><strong>Cone Sul:</strong> ditaduras na Argentina, no Chile, no Uruguai e no Paraguai; a Operação Condor coordenou a repressão entre os países. Na Argentina, as <strong>Mães da Praça de Maio</strong> marchavam com lenços brancos para exigir notícias dos filhos desaparecidos e expuseram ao mundo a <strong>violação dos direitos humanos</strong>.</li>
<li><strong>Redemocratização brasileira:</strong> Lei da Anistia (1979), Diretas Já (1984), eleição indireta de Tancredo Neves (1985), Constituição de 1988 ("Constituição Cidadã"). A Comissão Nacional da Verdade (2012–2014) investigou as violações.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('24d1', 85)}: as Mães da Praça de Maio. A resposta: o movimento expôs ao mundo a <strong>violação dos direitos humanos</strong> na Argentina.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Ditaduras aparecem por meio da <strong>resistência</strong> (música de protesto, movimentos de mães, imprensa alternativa) e da memória das violações. A resposta valoriza direitos humanos e democracia.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>O "milagre econômico" teve crescimento alto, mas com <strong>concentração de renda</strong> e endividamento: não "reduziu as desigualdades". E a Anistia de 1979 também beneficiou agentes da repressão, ponto ainda debatido.</p></div>`, [
    { base: ['Em dezembro de 1968, o governo militar decretou um ato que fechou o Congresso, suspendeu o habeas corpus para crimes políticos e ampliou a censura.'], src: 'Texto escrito para esta apostila.', cmd: 'O ato descrito é o',
      alts: ['Ato Adicional de 1834.', 'Ato Institucional nº 5 (AI-5).', 'Lei da Anistia.', 'Estatuto da Terra.', 'Plano Real.'], ans: 'B', hab: 'H3', dif: 'fácil',
      ex: { B: 'dezembro de 1968, Congresso fechado, fim do habeas corpus e censura: AI-5.', A: 'o Ato Adicional é das Regências.', C: 'a Anistia é de 1979 e abre a transição.', D: 'o Estatuto da Terra é de 1964 e trata da questão agrária.', E: 'o Plano Real é de 1994.' } },
    { base: ['Em 1984, milhões de pessoas foram às ruas de várias cidades exigindo eleições diretas para presidente; a emenda foi derrotada no Congresso.'], src: 'Texto escrito para esta apostila.', cmd: 'O movimento descrito, as Diretas Já, expressa',
      alts: ['o apoio popular à continuidade do regime militar.', 'o fim imediato da ditadura com a aprovação da emenda.', 'a defesa do voto censitário.', 'a proposta de volta à monarquia.', 'a mobilização popular pela redemocratização do país.'], ans: 'E', hab: 'H11, H24', dif: 'fácil',
      ex: { E: 'milhões nas ruas por eleições diretas: mobilização pela redemocratização.', A: 'é o oposto. Termo oposto.', B: 'a emenda foi derrotada.', C: 'pedia-se voto direto, não restrito.', D: 'não há proposta monarquista.' }, traps: { A: 'oposto', B: 'detalhe' } },
    { base: ['Durante o chamado "milagre econômico" (1968–1973), o PIB brasileiro cresceu a taxas superiores a 10% ao ano, enquanto o salário mínimo perdia poder de compra.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto evidencia que o crescimento do período',
      alts: ['foi acompanhado de concentração de renda.', 'eliminou a desigualdade social no país.', 'ocorreu num regime democrático.', 'reduziu o endividamento externo.', 'valorizou continuamente os salários.'], ans: 'A', hab: 'H17', dif: 'média',
      ex: { A: 'PIB em alta com salário mínimo perdendo valor: os ganhos se concentraram.', B: '"eliminou" é falso e exagerado.', C: 'foi o período mais repressivo da ditadura.', D: 'a dívida externa cresceu.', E: 'o salário perdeu poder de compra. Termo oposto.' }, traps: { B: 'exagero', E: 'oposto' } }
  ]);

  deep('G1', `<h4>Aprofundamento: o mapa como linguagem e como poder</h4>
<ul>
<li><strong>Escala:</strong> relação entre o tamanho no mapa e o real. Escala <strong>grande</strong> (1:10.000) mostra área pequena com muito detalhe; escala <strong>pequena</strong> (1:10.000.000) mostra área grande com pouco detalhe.</li>
<li><strong>Projeções:</strong> toda projeção distorce algo. Mercator (cilíndrica, conforme) preserva ângulos e foi feita para a navegação, mas aumenta as áreas perto dos polos; Peters (equivalente) preserva áreas e deforma as formas. A escolha da projeção e do centro do mapa (Europa no meio, norte em cima) é uma <strong>escolha política</strong>.</li>
<li><strong>Coordenadas e fusos:</strong> latitude (0° a 90° N/S) e longitude (0° a 180° L/O); cada 15° de longitude equivale a 1 hora.</li>
<li><strong>Geotecnologias:</strong> sensoriamento remoto (satélites), GPS (posicionamento), SIG (cruzamento de camadas de dados). Servem ao monitoramento do desmatamento, ao planejamento urbano e também ao controle militar e comercial do território.</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p>O mapa não é cópia do mundo: é uma <strong>representação</strong> feita por alguém, com objetivos. Ao longo da história, mapas sustentaram conquistas, fronteiras e hegemonias.</p></div>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('24d1', 83)}: o papel histórico da cartografia. A resposta: a <strong>sustentação de hegemonias territoriais</strong>.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Cartografia aparece de dois jeitos: <strong>técnica</strong> (escala, projeção, fuso) e <strong>crítica</strong> (o mapa como instrumento de poder). Nas questões críticas, desconfie de alternativas que tratam o mapa como neutro.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Escala grande ≠ área grande. Quanto maior a escala, menor a área representada e maior o detalhe. E Mercator não "erra": ela foi feita para navegar, e a distorção de áreas é o preço disso.</p></div>`, [
    { base: ['Uma prefeitura precisa de um mapa para localizar cada poste de um bairro; um ministério precisa de outro para mostrar todos os estados do país.'], src: 'Situação escrita para esta apostila.', cmd: 'As escalas mais adequadas para os dois mapas são, respectivamente,',
      alts: ['pequena e grande, pois o bairro é menor.', 'iguais, pois a escala não interfere no detalhe.', 'grande e pequena, pois o bairro exige mais detalhe.', 'pequena nos dois casos, para economizar papel.', 'grande nos dois casos, para mostrar o país inteiro.'], ans: 'C', hab: 'H6', dif: 'média',
      ex: { C: 'escala grande para pouca área e muito detalhe (bairro); escala pequena para grande área (país).', A: 'é a inversão clássica. Termo oposto.', B: 'a escala define o nível de detalhe.', D: 'escala pequena não mostra postes.', E: 'escala grande não cabe o país num mapa útil.' }, traps: { A: 'oposto' } },
    { base: ['No mapa-múndi de Mercator, a Groenlândia parece do tamanho da África, embora a África seja cerca de 14 vezes maior.'], src: 'Texto escrito para esta apostila.', cmd: 'A distorção descrita ocorre porque a projeção de Mercator',
      alts: ['preserva as áreas e distorce os ângulos.', 'preserva os ângulos e aumenta as áreas próximas aos polos.', 'foi feita para representar a Antártida com precisão.', 'não utiliza coordenadas geográficas.', 'é uma projeção azimutal centrada no Equador.'], ans: 'B', hab: 'H6', dif: 'média',
      ex: { B: 'Mercator é conforme: mantém os ângulos (útil na navegação) e exagera as áreas em altas latitudes.', A: 'isso descreve as projeções equivalentes, como a de Peters. Termo oposto.', C: 'a Antártida é a área mais distorcida.', D: 'usa paralelos e meridianos.', E: 'é cilíndrica, não azimutal.' }, traps: { A: 'oposto' } },
    { base: ['Imagens de satélite são comparadas mês a mês e, quando surge uma clareira nova na floresta, um alerta é enviado aos fiscais.'], src: 'Texto escrito para esta apostila.', cmd: 'A tecnologia descrita é o',
      alts: ['astrolábio', 'sistema de fusos horários', 'mapa político impresso', 'sensoriamento remoto aplicado ao monitoramento ambiental', 'censo demográfico'], ans: 'D', hab: 'H6, H29', dif: 'fácil',
      ex: { D: 'satélites captando imagens da superfície para monitorar o desmatamento: sensoriamento remoto.', A: 'o astrolábio é um instrumento de navegação antigo.', B: 'fusos tratam do horário.', C: 'um mapa impresso não gera alertas.', E: 'o censo conta a população.' } }
  ]);

  deep('G2', `<h4>Aprofundamento: forças internas, forças externas e o solo</h4>
<ul>
<li><strong>Agentes internos</strong> (endógenos): tectonismo, vulcanismo e abalos sísmicos. Nas <strong>zonas de subducção</strong>, uma placa mergulha sob outra, gerando terremotos fortes, vulcões e cordilheiras (Andes, Japão). O Brasil fica no centro da placa Sul-Americana, por isso tem poucos tremores.</li>
<li><strong>Agentes externos</strong> (exógenos): intemperismo (físico e químico), erosão e sedimentação. O <strong>intemperismo químico</strong> é forte em clima quente e úmido; a água ácida dissolve rochas calcárias e forma cavernas e <strong>dolinas</strong> (afundamentos do terreno).</li>
<li><strong>Relevo brasileiro:</strong> antigo e desgastado, com planaltos, depressões e planícies (classificação de Jurandyr Ross).</li>
<li><strong>Solo:</strong> nasce do intemperismo da rocha. Desmatamento, monocultura e encostas ocupadas aceleram a erosão, as voçorocas e o assoreamento dos rios.</li>
<li><strong>Inundações e deslizamentos:</strong> dependem da chuva, mas também da <strong>declividade do relevo</strong>, da impermeabilização do solo e da ocupação de várzeas e encostas.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 46)}: terremotos de grande magnitude. A resposta: ocorrem em <strong>zonas de subducção</strong>.</li>
<li>${cite('24d1', 53)}: as inundações descritas no texto. A resposta: influenciadas pela <strong>declividade do relevo local</strong>.</li>
<li>${cite('25d1', 70)}: as dolinas na Flórida. A resposta: resultado do <strong>intemperismo químico</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Geologia e relevo foram cobrados 3 vezes em dois anos, sempre ligando um <strong>processo natural</strong> a uma situação concreta (desastre, paisagem, risco). Identifique primeiro se o agente é interno ou externo.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Intemperismo é a decomposição da rocha no lugar; erosão é o transporte do material. E não confunda limite convergente (subducção, terremotos fortes) com o meio da placa, onde fica o Brasil.</p></div>`, [
    { base: ['Na encosta desmatada, a chuva forte arrastou a camada superficial do solo e abriu sulcos profundos; o material foi parar no leito do rio.'], src: 'Texto escrito para esta apostila.', cmd: 'Os processos descritos são, respectivamente,',
      alts: ['erosão, formação de voçorocas e assoreamento.', 'vulcanismo, dobramento e sedimentação marinha.', 'intemperismo físico, glaciação e subducção.', 'tectonismo, falhamento e terremoto.', 'lixiviação, laterização e salinização.'], ans: 'A', hab: 'H27', dif: 'fácil',
      ex: { A: 'arraste do solo (erosão), sulcos profundos (voçorocas) e acúmulo no rio (assoreamento).', B: 'são agentes internos, não ligados à chuva.', C: 'glaciação e subducção não se aplicam.', D: 'agentes internos.', E: 'processos químicos do solo, não o arraste descrito.' } },
    { base: ['O Japão registra milhares de tremores por ano e tem vulcões ativos; o Brasil tem poucos abalos, quase sempre fracos.'], src: 'Texto escrito para esta apostila.', cmd: 'A diferença entre os dois países se explica porque',
      alts: ['o Brasil tem relevo mais alto que o Japão.', 'o clima tropical impede terremotos no Brasil.', 'o Japão tem rochas mais jovens por causa da erosão.', 'o Brasil fica sobre várias placas que se afastam.', 'o Japão fica em área de encontro de placas, e o Brasil no centro de uma placa.'], ans: 'E', hab: 'H27', dif: 'fácil',
      ex: { E: 'limites convergentes concentram tremores e vulcões; o interior da placa é estável.', A: 'a altitude não explica os tremores.', B: 'clima não causa nem impede terremotos.', C: 'erosão não forma rochas jovens.', D: 'o Brasil está no centro de uma só placa. Termo oposto.' }, traps: { D: 'oposto' } },
    { base: ['Em regiões de rocha calcária e clima úmido, a água da chuva, levemente ácida, dissolve a rocha e forma cavernas subterrâneas.'], src: 'Texto escrito para esta apostila.', cmd: 'O processo descrito é o',
      alts: ['intemperismo físico por variação de temperatura.', 'tectonismo de placas convergentes.', 'intemperismo químico por dissolução da rocha.', 'vulcanismo em área estável.', 'transporte eólico de sedimentos.'], ans: 'C', hab: 'H27', dif: 'média',
      ex: { C: 'a água ácida reage com o calcário e o dissolve: intemperismo químico.', A: 'o físico fragmenta a rocha, sem reação química. Detalhe.', B: 'é agente interno.', D: 'não há vulcanismo.', E: 'o vento não forma cavernas calcárias.' }, traps: { A: 'detalhe' } }
  ]);

  deep('G3', `<h4>Aprofundamento: dinâmica do clima e mudanças climáticas</h4>
<ul>
<li><strong>Tempo × clima:</strong> tempo é o estado da atmosfera agora; clima é o padrão de décadas.</li>
<li><strong>Fatores do clima:</strong> latitude, altitude, maritimidade e continentalidade, correntes marítimas, relevo e <strong>massas de ar</strong>. As massas de ar transportam calor, umidade e também a <strong>fumaça das queimadas</strong> para longe da origem.</li>
<li><strong>Chuvas:</strong> convectivas (calor que faz o ar subir), orográficas (relevo) e frontais (encontro de massas). Na Amazônia, a floresta devolve umidade à atmosfera pela evapotranspiração ("rios voadores"); o <strong>desmatamento reduz as chuvas convectivas</strong>.</li>
<li><strong>Clima urbano:</strong> ilhas de calor (asfalto, concreto, pouca vegetação) e inversão térmica. <strong>Parques públicos</strong> e arborização amenizam a temperatura.</li>
<li><strong>Mudanças climáticas:</strong> intensificação do efeito estufa pela queima de combustíveis fósseis e pelo desmatamento. Acordos: Protocolo de Kyoto (1997), Acordo de Paris (2015), COPs anuais com <strong>organismos supranacionais e sociedade civil</strong>.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 68)}: desmatamento da Amazônia. A resposta: <strong>redução das chuvas convectivas</strong>.</li>
<li>${cite('24d1', 71)}: a COP-26. A resposta: a atuação conjunta de <strong>organismos supranacionais e da sociedade civil</strong>.</li>
<li>${cite('24d1', 88)}: o clima nas cidades. A resposta: a implantação de <strong>parques públicos</strong>.</li>
<li>${cite('25d1', 47)}: a fumaça das queimadas chegando longe. A resposta: a <strong>circulação de massas de ar</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Clima é o tema mais cobrado de Geografia física: 4 questões em dois anos. Elas cruzam processo natural e ação humana. Leia o texto procurando a <strong>causa física</strong> do fenômeno.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Efeito estufa é natural e necessário; o problema é a <strong>intensificação</strong>. Não confunda com o buraco na camada de ozônio (causado por CFCs). E ilha de calor não é inversão térmica.</p></div>`, [
    { base: ['Num dia de inverno, a fumaça dos carros fica presa perto do chão de manhã, pois uma camada de ar quente acima impede a subida do ar frio poluído.'], src: 'Texto escrito para esta apostila.', cmd: 'O fenômeno descrito é a',
      alts: ['ilha de calor.', 'chuva ácida.', 'destruição da camada de ozônio.', 'inversão térmica.', 'chuva orográfica.'], ans: 'D', hab: 'H27', dif: 'fácil',
      ex: { D: 'ar quente acima do ar frio impede a dispersão dos poluentes: inversão térmica.', A: 'ilha de calor é a diferença de temperatura entre cidade e entorno.', B: 'chuva ácida exige precipitação.', C: 'o ozônio é afetado por CFCs.', E: 'chuva orográfica depende do relevo.' }, traps: { A: 'detalhe' } },
    { base: ['O gás carbônico liberado pela queima de petróleo, carvão e florestas retém parte do calor que a Terra emitiria para o espaço.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve',
      alts: ['a formação do buraco na camada de ozônio.', 'a intensificação do efeito estufa pela ação humana.', 'o resfriamento global provocado pelas florestas.', 'a origem das correntes marítimas.', 'a chuva ácida produzida pelos vulcões.'], ans: 'B', hab: 'H27, H30', dif: 'fácil',
      ex: { B: 'mais CO₂ na atmosfera retém mais calor: efeito estufa intensificado.', A: 'o ozônio é destruído por CFCs, outro problema.', C: 'a queima aquece. Termo oposto.', D: 'correntes marítimas não são o tema.', E: 'o texto fala de queima humana.' }, traps: { A: 'detalhe', C: 'oposto' } },
    { base: ['Numa cidade, a temperatura no centro, cheio de asfalto e prédios, chega a ser 5 °C maior que a de um bairro arborizado da periferia.'], src: 'Texto escrito para esta apostila.', cmd: 'Uma medida eficaz para amenizar esse fenômeno é',
      alts: ['impermeabilizar novas áreas verdes.', 'aumentar a frota de veículos particulares.', 'substituir praças por estacionamentos.', 'ampliar o uso de vidro espelhado nas fachadas.', 'ampliar a arborização e os parques urbanos.'], ans: 'E', hab: 'H28, H30', dif: 'fácil',
      ex: { E: 'vegetação sombreia e devolve umidade, reduzindo a ilha de calor.', A: 'impermeabilizar agrava o problema. Termo oposto.', B: 'mais carros, mais calor.', C: 'estacionamentos aquecem mais.', D: 'vidro espelhado reflete calor para a rua.' }, traps: { A: 'oposto', C: 'oposto' } }
  ]);

  deep('G4', `<h4>Aprofundamento: biomas, água e conflitos ambientais</h4>
<ul>
<li><strong>Biomas brasileiros:</strong> Amazônia, Cerrado ("berço das águas", nascentes de grandes bacias), Mata Atlântica (o mais devastado), Caatinga (exclusivamente brasileira), Pantanal (maior planície alagável) e Pampa.</li>
<li><strong>Água:</strong> o Brasil tem cerca de 12% da água doce superficial do mundo, mal distribuída. Aquíferos (Guarani, Alter do Chão), crise hídrica, poluição e conflitos pelo uso.</li>
<li><strong>Desastres socioambientais:</strong> o rompimento das barragens de rejeitos em Mariana (2015) e Brumadinho (2019) destruiu rios, casas e também <strong>vínculos afetivos</strong> das comunidades com o lugar.</li>
<li><strong>Povos e comunidades tradicionais</strong> (indígenas, quilombolas, ribeirinhos, extrativistas): conservam a biodiversidade e usam tecnologias, inclusive a internet, para <strong>valorizar a economia local</strong> e defender seus territórios.</li>
<li><strong>Ciência e conservação:</strong> pesquisas acadêmicas desenvolvem soluções, como técnicas de manejo do fogo no Cerrado.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 48)}: o rompimento da barragem em Mariana. A resposta: a <strong>fragilização de vínculos afetivos</strong> com o lugar.</li>
<li>${cite('24d1', 67)}: a internet nas comunidades tradicionais. A resposta: a <strong>valorização da economia local</strong>.</li>
<li>${cite('25d1', 84)}: uma tecnologia contra queimadas no Cerrado. A resposta: a <strong>importância de pesquisas acadêmicas</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Questões ambientais quase sempre têm um lado <strong>humano</strong>: o impacto sobre comunidades, o saber tradicional, o papel da ciência. A alternativa que ignora as pessoas costuma ser distrator.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Não trate comunidades tradicionais como "atrasadas" ou isoladas da tecnologia: o Enem valoriza a apropriação de recursos modernos por esses grupos. E o bioma exclusivamente brasileiro é a Caatinga, não o Cerrado.</p></div>`, [
    { base: ['Vegetação de galhos retorcidos e casca grossa, raízes profundas que alcançam a água subterrânea e nascentes de rios de várias bacias brasileiras.'], src: 'Texto escrito para esta apostila.', cmd: 'O bioma descrito é o(a)',
      alts: ['Mata Atlântica.', 'Pampa.', 'Pantanal.', 'Amazônia.', 'Cerrado.'], ans: 'E', hab: 'H27', dif: 'fácil',
      ex: { E: 'troncos retorcidos, raízes profundas e nascentes de grandes bacias: Cerrado, o "berço das águas".', A: 'é floresta densa e úmida.', B: 'são campos do Sul.', C: 'é planície alagável.', D: 'é floresta equatorial.' } },
    { base: ['Uma cooperativa de extrativistas de castanha passou a vender diretamente pela internet, sem atravessadores, e a contar nas redes como protege a floresta.'], src: 'Texto escrito para esta apostila.', cmd: 'A situação mostra que o uso da internet por comunidades tradicionais pode',
      alts: ['fortalecer a economia local e a defesa do território.', 'acabar com o modo de vida tradicional.', 'aumentar a dependência de intermediários.', 'estimular o desmatamento para a produção.', 'afastar a comunidade do mercado.'], ans: 'A', hab: 'H28', dif: 'fácil',
      ex: { A: 'venda direta e divulgação: mais renda local e visibilidade para a proteção da floresta.', B: 'a comunidade mantém o extrativismo.', C: 'eliminou atravessadores. Termo oposto.', D: 'a castanha depende da floresta em pé.', E: 'aproximou do mercado. Termo oposto.' }, traps: { C: 'oposto', E: 'oposto' } },
    { base: ['Na cidade, a água chega às torneiras, mas um terço dela se perde em vazamentos; enquanto isso, um rio que corta a cidade recebe esgoto sem tratamento.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto indica que a crise hídrica urbana',
      alts: ['é causada apenas pela falta de chuvas.', 'está ligada também à gestão e ao saneamento.', 'não ocorre em países com muita água doce.', 'foi resolvida pela canalização dos rios.', 'depende exclusivamente do consumo doméstico.'], ans: 'B', hab: 'H28, H30', dif: 'média',
      ex: { B: 'perdas na rede e esgoto sem tratamento são falhas de gestão e saneamento.', A: '"apenas" é exagero; o texto não fala de chuva.', C: 'o Brasil tem muita água e tem crises.', D: 'canalizar não trata esgoto.', E: '"exclusivamente" é exagero.' }, traps: { A: 'exagero', E: 'exagero' } }
  ]);

  deep('G6', `<h4>Aprofundamento: urbanização, segregação e cidade sustentável</h4>
<ul>
<li><strong>Urbanização brasileira:</strong> rápida e concentrada (de 1950 a 1980), puxada pela industrialização e pelo êxodo rural, sem planejamento: favelas, periferias distantes, moradia precária.</li>
<li><strong>Segregação socioespacial:</strong> ricos em áreas valorizadas (às vezes em condomínios fechados), pobres empurrados para as periferias e áreas de risco. A <strong>verticalização</strong> concentra prédios em bairros valorizados e muda a paisagem.</li>
<li><strong>Rede urbana:</strong> metrópoles, conurbação, regiões metropolitanas, cidades médias.</li>
<li><strong>Problemas e planejamento:</strong> mobilidade, enchentes, ilhas de calor. Canalizar e cobrir rios impermeabiliza o solo e contradiz a <strong>cidade sustentável</strong>; a tendência atual é renaturalizar cursos d'água.</li>
<li><strong>Artificialização do espaço:</strong> cidades como Dubai, construídas sobre o deserto e o mar com ilhas artificiais, mostram a capacidade técnica de transformar o meio.</li>
<li><strong>Estatuto da Cidade</strong> (2001): plano diretor e função social da propriedade urbana.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 86)}: Dubai e suas ilhas artificiais. A resposta: a <strong>artificialização do espaço geográfico</strong>.</li>
<li>${cite('25d1', 68)}: a paisagem de Salvador. A resposta: a <strong>verticalização urbana</strong>.</li>
<li>${cite('25d1', 80)}: rios urbanos. A resposta: a <strong>canalização dos cursos hídricos</strong> contradiz a proposta da cidade sustentável.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Questões urbanas pedem que você leia a <strong>paisagem</strong> (foto, mapa, descrição) e reconheça o processo: verticalização, periferização, gentrificação, artificialização.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Verticalização não é sinônimo de favelização nem de periferia: costuma ocorrer em áreas valorizadas. E canalizar um rio parece "obra de melhoria", mas agrava enchentes e vai contra a sustentabilidade.</p></div>`, [
    { base: ['Em uma metrópole, as famílias de alta renda vivem em bairros centrais com infraestrutura, enquanto as de baixa renda moram em periferias distantes, sem saneamento e a duas horas do trabalho.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve o processo de',
      alts: ['conurbação.', 'segregação socioespacial.', 'desmetropolização.', 'êxodo urbano.', 'artificialização do espaço.'], ans: 'B', hab: 'H26', dif: 'fácil',
      ex: { B: 'grupos de renda diferente ocupam espaços desiguais: segregação socioespacial.', A: 'conurbação é a junção física de cidades.', C: 'não há perda de população da metrópole.', D: 'êxodo urbano é a saída da cidade.', E: 'artificialização é a transformação técnica do meio.' } },
    { base: ['Uma cidade decidiu retirar o concreto que cobria um córrego, recuperar as margens com vegetação e criar um parque linear ao longo dele.'], src: 'Texto escrito para esta apostila.', cmd: 'A medida está de acordo com a proposta de cidade sustentável porque',
      alts: ['aumenta a impermeabilização do solo.', 'transforma o rio em esgoto a céu aberto.', 'aumenta a infiltração da água e reduz enchentes.', 'amplia a área para novas avenidas.', 'acelera o escoamento da água para outros bairros.'], ans: 'C', hab: 'H28, H30', dif: 'média',
      ex: { C: 'margens vegetadas absorvem água e reduzem enchentes, ao contrário da canalização.', A: 'retirar o concreto diminui a impermeabilização. Termo oposto.', B: 'a recuperação melhora o rio.', D: 'não há avenida nova.', E: 'a vegetação retarda o escoamento.' }, traps: { A: 'oposto' } },
    { base: ['Numa orla, as casas baixas foram substituídas, em vinte anos, por torres residenciais de mais de trinta andares, que passaram a fazer sombra na praia à tarde.'], src: 'Texto escrito para esta apostila.', cmd: 'A transformação descrita é um exemplo de',
      alts: ['êxodo rural.', 'favelização.', 'periferização.', 'verticalização urbana.', 'desindustrialização.'], ans: 'D', hab: 'H26', dif: 'fácil',
      ex: { D: 'casas baixas trocadas por torres altas: verticalização.', A: 'êxodo rural é migração do campo.', B: 'torres de luxo na orla não são favelas.', C: 'a orla é área valorizada, não periferia. Termo oposto.', E: 'não se fala de indústria.' }, traps: { B: 'oposto', C: 'oposto' } }
  ]);

  deep('G7', `<h4>Aprofundamento: técnica, fluxos e matriz energética</h4>
<ul>
<li><strong>Meio técnico-científico-informacional</strong> (Milton Santos): ciência, técnica e informação se espalham pelo território e <strong>dinamizam os fluxos</strong> de pessoas, mercadorias, capitais e dados.</li>
<li><strong>Indústria:</strong> da concentração no Sudeste à desconcentração (guerra fiscal, mão de obra mais barata). Fordismo × toyotismo (just in time, terceirização).</li>
<li><strong>Transportes:</strong> o Brasil depende das rodovias, o modal mais caro para longas distâncias; ferrovias e hidrovias são mais baratas para grandes volumes. Secas que baixam os rios (como no Reno) <strong>encarecem a logística</strong> hidroviária.</li>
<li><strong>Energia:</strong> a matriz elétrica brasileira é majoritariamente renovável (hidrelétricas), mas grandes usinas alteram a paisagem e afetam povos da Amazônia. Eólica e solar crescem no Nordeste. A geotérmica pode <strong>reduzir a pressão sobre as hidrelétricas</strong>.</li>
<li><strong>Transição energética:</strong> o carro elétrico reduz emissões no uso, mas depende de baterias com <strong>metais raros e mineração</strong>, e de eletricidade que pode vir de fontes não renováveis.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 70)}: Milton Santos e as redes técnicas. A resposta: a <strong>dinamização dos fluxos</strong>.</li>
<li>${cite('25d1', 56)}: a seca do Rio Reno. A resposta: o <strong>encarecimento da logística de transporte</strong>.</li>
<li>${cite('25d1', 59)}: projetos de energia na Amazônia. A resposta: a <strong>alteração da paisagem em locais estratégicos</strong>.</li>
<li>${cite('25d1', 77)}: o carro elétrico. A resposta: a necessidade de <strong>fontes não renováveis</strong>, como os metais raros das baterias.</li>
<li>${cite('25d1', 86)}: a energia geotérmica. A resposta: a <strong>redução da pressão sobre as hidrelétricas</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Energia e transporte somaram 5 questões em dois anos, o tema de Geografia mais cobrado. O padrão: nenhuma fonte é "limpa" sem custo. Procure a <strong>contradição</strong> ou o impacto escondido.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Renovável não significa sem impacto: hidrelétricas alagam terras e deslocam pessoas. E "matriz energética" (toda a energia, inclusive combustíveis) é diferente de "matriz elétrica" (só eletricidade); a elétrica brasileira é muito mais renovável.</p></div>`, [
    { base: ['Uma fábrica de automóveis recebe as peças dos fornecedores poucas horas antes de usá-las, sem manter grandes estoques, e terceiriza parte da produção.'], src: 'Texto escrito para esta apostila.', cmd: 'O modelo de produção descrito é o',
      alts: ['toyotismo, com o sistema just in time.', 'fordismo, com produção em massa e grandes estoques.', 'artesanato, sem divisão do trabalho.', 'taylorismo, com controle de tempos e movimentos.', 'manufatura do século XVIII.'], ans: 'A', hab: 'H17, H18', dif: 'fácil',
      ex: { A: 'peças na hora certa, sem estoques e com terceirização: toyotismo.', B: 'o fordismo mantinha grandes estoques. Termo oposto.', C: 'há indústria, não artesanato.', D: 'o taylorismo trata do controle de tempos, não de estoques.', E: 'manufatura é anterior à indústria moderna.' }, traps: { B: 'oposto', D: 'detalhe' } },
    { base: ['Para levar soja do Centro-Oeste até os portos, o Brasil usa principalmente caminhões, embora as distâncias superem 1.500 km.'], src: 'Texto escrito para esta apostila.', cmd: 'Esse padrão de transporte resulta em',
      alts: ['menor consumo de combustível por tonelada transportada.', 'eliminação das perdas de carga nas estradas.', 'redução dos custos de exportação.', 'menor emissão de poluentes que as hidrovias.', 'custo maior em comparação a ferrovias e hidrovias para grandes volumes.'], ans: 'E', hab: 'H18', dif: 'média',
      ex: { E: 'para longas distâncias e grandes volumes, o rodoviário é mais caro.', A: 'o caminhão consome mais por tonelada. Termo oposto.', B: 'há perdas nas estradas.', C: 'eleva os custos.', D: 'emite mais que as hidrovias. Termo oposto.' }, traps: { A: 'oposto', D: 'oposto' } },
    { base: ['Parques eólicos se multiplicaram no litoral e no sertão do Nordeste, aproveitando ventos fortes e constantes.'], src: 'Texto escrito para esta apostila.', cmd: 'A expansão da energia eólica no Nordeste',
      alts: ['aumenta a dependência do petróleo importado.', 'não gera nenhum impacto ambiental ou social.', 'diversifica a matriz elétrica com fonte renovável, mas pode gerar conflitos com comunidades locais.', 'substituiu completamente as hidrelétricas no Brasil.', 'é inviável pela ausência de ventos na região.'], ans: 'C', hab: 'H27, H29', dif: 'média',
      ex: { C: 'fonte renovável que diversifica a matriz, com impactos como ruído e disputas pelo uso da terra.', A: 'é o oposto. Termo oposto.', B: '"nenhum impacto" é exagero.', D: '"completamente" é exagero.', E: 'o texto fala de ventos fortes.' }, traps: { B: 'exagero', D: 'exagero' } }
  ]);

  deep('G8', `<h4>Aprofundamento: população, migrações e lugar</h4>
<ul>
<li><strong>Transição demográfica:</strong> a natalidade e a mortalidade caem; a população envelhece. No Brasil, a fecundidade caiu de cerca de 6 filhos por mulher (1960) para menos de 2. A <strong>pílula anticoncepcional</strong> (anos 1960) e a urbanização abriram o debate público sobre planejamento familiar.</li>
<li><strong>Pirâmide etária:</strong> base estreitando e topo alargando; bônus demográfico (muitos adultos em idade ativa) e desafio previdenciário.</li>
<li><strong>Migrações internas:</strong> nordestinos para o Sudeste (anos 1950 a 1980), migração de retorno, avanço para o Centro-Oeste e a Amazônia. Hoje cresce a migração entre cidades médias e, na pandemia, o <strong>êxodo urbano</strong>, que foi <strong>seletivo</strong> (quem podia trabalhar remotamente).</li>
<li><strong>Migrações internacionais e refúgio:</strong> refugiado é quem foge de perseguição ou de violação de direitos (Convenção de 1951). O desafio é a <strong>integração socioeconômica</strong>: documentos, trabalho, idioma.</li>
<li><strong>Lugar:</strong> o espaço vivido, com laços afetivos e memórias; migrantes carregam <strong>histórias e itinerários afetivos</strong>.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 66)}: a pílula anticoncepcional. A resposta: abriu o <strong>debate público sobre planejamento familiar</strong>.</li>
<li>${cite('24d1', 79)}: refugiados no Brasil. A resposta: o desafio da <strong>integração socioeconômica</strong>.</li>
<li>${cite('25d1', 54)}: o êxodo urbano. A resposta: a <strong>seletividade dos deslocamentos populacionais</strong>.</li>
<li>${cite('25d1', 57)}: itinerários afetivos. A resposta: <strong>histórias conectadas e recordações do lugar</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>População aparece pelo lado <strong>social</strong>: quem migra, por quê, como é recebido, o que leva consigo. Gráficos de fecundidade e pirâmides também são frequentes.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Refugiado ≠ migrante econômico: o refúgio tem base legal específica. E envelhecimento da população não é "falta de jovens no país": é mudança de proporção, resultado da queda da natalidade com aumento da expectativa de vida.</p></div>`, [
    { base: ['Em 1960, a brasileira tinha em média cerca de 6 filhos; em 2022, menos de 2. No mesmo período, a expectativa de vida subiu mais de 20 anos.'], src: 'Texto escrito para esta apostila, com dados do IBGE.', cmd: 'Os dados indicam que a pirâmide etária brasileira',
      alts: ['tem a base cada vez mais larga.', 'mantém-se igual desde 1960.', 'indica aumento da natalidade.', 'passa por envelhecimento, com base mais estreita e topo mais largo.', 'mostra queda da expectativa de vida.'], ans: 'D', hab: 'H26', dif: 'fácil',
      ex: { D: 'menos nascimentos e vida mais longa: base estreita e topo largo, envelhecimento.', A: 'a base se estreita. Termo oposto.', B: 'os dados mostram mudança.', C: 'a natalidade caiu. Termo oposto.', E: 'a expectativa de vida subiu.' }, traps: { A: 'oposto', C: 'oposto' } },
    { base: ['Uma família síria chegou ao Brasil fugindo da guerra; obteve o reconhecimento como refugiada, mas teve dificuldade de validar o diploma, aprender português e conseguir emprego.'], src: 'Texto escrito para esta apostila.', cmd: 'O caso evidencia que, além do acolhimento legal, os refugiados enfrentam o desafio da',
      alts: ['proibição de trabalhar no país.', 'integração socioeconômica na sociedade de destino.', 'obrigação de retornar ao país de origem.', 'falta de reconhecimento jurídico do refúgio no Brasil.', 'perda automática da nacionalidade síria.'], ans: 'B', hab: 'H26, H24', dif: 'média',
      ex: { B: 'diploma, idioma e emprego: barreiras de integração socioeconômica.', A: 'refugiados podem trabalhar no Brasil.', C: 'o refúgio protege contra o retorno forçado.', D: 'o texto diz que obtiveram o reconhecimento.', E: 'não há perda automática.' }, traps: { D: 'oposto' } },
    { base: ['Na pandemia, profissionais com trabalho remoto e boa renda trocaram a capital por cidades do interior; trabalhadores de serviços presenciais continuaram na metrópole.'], src: 'Texto escrito para esta apostila.', cmd: 'O deslocamento descrito evidencia a',
      alts: ['migração de retorno de nordestinos.', 'expansão da fronteira agrícola.', 'fuga de refugiados de conflitos.', 'transferência de indústrias para o exterior.', 'seletividade dos deslocamentos populacionais.'], ans: 'E', hab: 'H26', dif: 'média',
      ex: { E: 'só quem tinha trabalho remoto e renda pôde sair: deslocamento seletivo.', A: 'não se fala de origem nordestina.', B: 'não há expansão agrícola.', C: 'não é refúgio.', D: 'não se trata de indústrias.' } }
  ]);
})(window.DATA);
