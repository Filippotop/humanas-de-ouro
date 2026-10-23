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
})(window.DATA);
