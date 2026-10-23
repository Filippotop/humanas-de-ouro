/* Humanas de Ouro: aprofundamento de Filosofia e Sociologia (DATA.deep).
   Cada módulo ganha três seções (Aprofundamento, Como o Enem cobra, Pegadinhas) e 3 questões novas.
   As questões oficiais citadas vêm de DATA.enemMap e abrem a imagem do caderno ao toque. */
(function (D) {
  D.deep = D.deep || {};
  const cite = (ex, n) => `<a href="#" data-ex="${ex}" data-n="${n}">Enem 20${ex.slice(0, 2)}, questão ${n}</a>`;
  function deep(id, html, questions) {
    const m = D.modules.find(x => x.id === id), base = m ? m.qs.length : 0;
    D.deep[id] = { html, questions: questions.map((q, i) => Object.assign({ vol: m ? m.vol : 'FS', mod: id, n: base + i + 1, kind: 'extra', tag: 'Inédita, estilo ENEM · aprofundamento', traps: {} }, q, { id: `D-${id}.${i + 1}` })) };
  }

  deep('F1', `<h4>Aprofundamento: do mito ao logos</h4>
<p>A passagem do mito à filosofia não foi uma ruptura instantânea. Os primeiros filósofos ainda usam imagens poéticas, mas mudam a <strong>pergunta</strong>: em vez de "que deus fez isso?", perguntam "qual é o princípio (<em>arché</em>) de todas as coisas?" e respondem com argumentos que podem ser discutidos e criticados.</p>
<div class="tw"><table><thead><tr><th>Pensador</th><th>Ideia central</th></tr></thead><tbody>
<tr><td>Tales</td><td>A água como princípio</td></tr>
<tr><td>Anaximandro</td><td>O <em>ápeiron</em>, o indeterminado</td></tr>
<tr><td>Pitágoras</td><td>O número organiza o cosmos</td></tr>
<tr><td>Heráclito</td><td>Tudo flui (devir); a realidade é tensão e unidade entre contrários</td></tr>
<tr><td>Parmênides</td><td>O ser é, o não ser não é: o movimento é ilusão dos sentidos</td></tr>
<tr><td>Sofistas</td><td>Ensinam retórica; o homem é a medida de todas as coisas (Protágoras): relativismo</td></tr>
<tr><td>Sócrates</td><td>"Só sei que nada sei"; ironia e maiêutica para buscar definições</td></tr>
</tbody></table></div>
<div class="box conceito"><b class="box-t">Conceito</b><p>Em Heráclito, os opostos não se anulam: <strong>dependem um do outro</strong>. Dia e noite, guerra e paz, fome e saciedade formam pares que estruturam o cosmos. Por isso o Enem fala em "distribuição dicotômica": o mundo pensado em pares de contrários em tensão.</p></div>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('25d1', 72)}: dois fragmentos de Heráclito ("Deus é dia-noite, inverno-verão, guerra-paz..."). A resposta destacava a organização do cosmos em <strong>pares de opostos</strong>. Os distratores apostavam no oposto de Heráclito: "imobilidade imanente do universo" é Parmênides.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Pré-socráticos aparecem em fragmentos curtos. Pergunte: o texto fala de <strong>mudança</strong> (Heráclito), de <strong>permanência</strong> (Parmênides), de <strong>número</strong> (Pitágoras) ou de um <strong>elemento</strong> (Tales, Anaxímenes)?</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Heráclito × Parmênides é a troca mais cobrada: fluxo × imobilidade. E sofista não é sinônimo de mentiroso: no Enem, sofista é o professor de retórica que relativiza a verdade, criticado por Platão por buscar a persuasão em vez do conhecimento.</p></div>`, [
    { base: ['"Não se pode entrar duas vezes no mesmo rio, pois outras são as águas que correm."'], src: 'Fragmento atribuído a Heráclito (tradução livre).', cmd: 'O fragmento expressa a ideia de que a realidade é marcada pelo(a)',
      alts: ['devir, isto é, pela mudança permanente das coisas.', 'imobilidade do ser, que os sentidos não percebem.', 'número, que organiza harmonicamente o cosmos.', 'água como princípio material de tudo.', 'relativismo moral defendido pelos sofistas.'], ans: 'A', hab: 'H1, H15', dif: 'fácil',
      ex: { A: 'o rio nunca é o mesmo porque as águas mudam: tudo flui, é o devir de Heráclito.', B: 'imobilidade do ser é Parmênides, o oposto de Heráclito.', C: 'o número é Pitágoras.', D: 'a água como princípio é Tales; aqui o rio ilustra a mudança.', E: 'o fragmento fala da natureza, não de moral.' }, traps: { B: 'autor', D: 'detalhe' } },
    { base: ['Na praça, um professor cobra para ensinar os jovens a vencer qualquer debate: "Sobre todo assunto há dois discursos opostos, e o hábil sabe tornar mais forte o mais fraco."'], src: 'Texto escrito para esta apostila.', cmd: 'A postura descrita corresponde à dos sofistas, criticados por Platão porque',
      alts: ['defendiam a existência de verdades eternas e imutáveis.', 'buscavam o conhecimento por meio da maiêutica.', 'negavam a importância da linguagem na vida política.', 'privilegiavam a persuasão em detrimento da busca da verdade.', 'recusavam cobrar pelos ensinamentos que ofereciam.'], ans: 'D', hab: 'H1', dif: 'média',
      ex: { D: 'tornar "mais forte o discurso mais fraco" é vencer pela persuasão, não pela verdade: é a crítica platônica aos sofistas.', A: 'verdades eternas são a posição de Platão contra os sofistas.', B: 'a maiêutica é o método de Sócrates.', C: 'é o contrário: valorizavam a linguagem e a retórica.', E: 'o texto diz que o professor cobra.' }, traps: { A: 'oposto', B: 'autor' } },
    { base: ['— O que é a coragem? — pergunta Sócrates. — É não fugir da batalha — responde o general. — E quem recua para atrair o inimigo a uma emboscada, não é corajoso? O general hesita.'], src: 'Diálogo escrito para esta apostila, no estilo platônico.', cmd: 'O procedimento de Sócrates no diálogo consiste em',
      alts: ['impor uma definição pronta ao interlocutor.', 'examinar a definição proposta até revelar suas falhas.', 'recorrer aos mitos para explicar a coragem.', 'defender que toda opinião é igualmente verdadeira.', 'encerrar o debate com um argumento de autoridade.'], ans: 'B', hab: 'H1', dif: 'fácil',
      ex: { B: 'com uma pergunta, Sócrates mostra que a definição não cobre todos os casos: é a ironia que prepara a busca de uma definição melhor.', A: 'Sócrates pergunta, não impõe.', C: 'não há recurso ao mito.', D: 'relativismo é traço sofista.', E: 'não há autoridade invocada.' }, traps: { D: 'autor' } }
  ]);

  deep('F2', `<h4>Aprofundamento: alma, Estado e virtude em Platão e Aristóteles</h4>
<ul>
<li><strong>Dualismo platônico:</strong> o mundo sensível (cópias mutáveis) se opõe ao mundo inteligível (Ideias eternas). A alma, imortal, é superior ao corpo, que a aprisiona. É a origem do <strong>pensamento dicotômico</strong> alma × corpo que atravessa a tradição ocidental.</li>
<li><strong>A cidade justa de Platão</strong> (<em>A República</em>): cada classe cumpre sua função (governantes-filósofos, guardiões, produtores). Justiça é cada parte fazer o que lhe cabe, sob o governo da razão. Ética e política são inseparáveis.</li>
<li><strong>Aristóteles:</strong> rejeita o mundo das Ideias separado; a forma está nas coisas. Na <em>Política</em>, classifica as constituições pelo número de governantes e pela finalidade: governam para o bem comum (<strong>monarquia, aristocracia e governo constitucional</strong>, que o Enem chamou de democracia) ou desviam para o interesse de uma parte (tirania, oligarquia, demagogia).</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p>O critério de Aristóteles não é só "quantos governam", mas <strong>para quem governam</strong>. A mesma forma (o governo de um só) pode ser justa (monarquia) ou desviada (tirania).</p></div>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 61)}: trecho da <em>Política</em> sobre o governo de um, de poucos ou de todos. A resposta: as três formas <strong>monarquia, aristocracia e democracia</strong>.</li>
<li>${cite('25d1', 82)}: a cidade ideal de Platão, governada pelos filósofos. A resposta: a indissociabilidade entre <strong>ética e exercício do poder</strong>.</li>
<li>${cite('24d1', 55)}: texto de Foucault que descreve a alma como algo que escapa do corpo. A resposta: a concepção metafísica clássica do <strong>pensamento dicotômico</strong> (alma × corpo).</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Platão e Aristóteles aparecem muito em textos de comentadores (Marilena Chaui, por exemplo). O comando pede a <strong>ideia estruturante</strong>: dualismo, função das classes, formas de governo, virtude como hábito.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>"Primazia da retórica" e "cidadania" na cidade de Platão são distratores: Platão desconfiava da retórica e da democracia ateniense. E, em Aristóteles, tirania, oligarquia e demagogia são as formas <strong>desviadas</strong>, não as justas.</p></div>`, [
    { base: ['Para Platão, aquilo que vemos é sombra e reflexo; o que verdadeiramente é só pode ser alcançado pelo pensamento.'], src: 'Texto escrito para esta apostila.', cmd: 'Essa concepção fundamenta-se na distinção entre',
      alts: ['matéria e energia, típica da física moderna.', 'fé e razão, típica da escolástica medieval.', 'mundo sensível e mundo inteligível.', 'natureza e cultura, típica da antropologia.', 'sujeito e objeto, típica do empirismo inglês.'], ans: 'C', hab: 'H1', dif: 'fácil',
      ex: { C: 'sombras e reflexos (sensível) × o que verdadeiramente é, alcançado pelo pensamento (inteligível): o dualismo platônico.', A: 'é distinção da física, não de Platão.', B: 'fé e razão é tema medieval.', D: 'natureza e cultura é tema antropológico.', E: 'o empirismo é moderno e valoriza a experiência.' }, traps: { B: 'anacronismo', E: 'anacronismo' } },
    { base: ['"Quando o governo de um só visa ao próprio interesse, e não ao bem comum, temos não a realeza, mas a tirania."'], src: 'Texto escrito para esta apostila, a partir da Política de Aristóteles.', cmd: 'Segundo esse critério, uma forma de governo é considerada desviada quando',
      alts: ['é exercida por muitos cidadãos.', 'tem leis escritas.', 'é exercida por um único governante.', 'surge de uma revolução.', 'serve ao interesse de quem governa, e não ao bem comum.'], ans: 'E', hab: 'H11', dif: 'fácil',
      ex: { E: 'para Aristóteles, o desvio está na finalidade: governar para si, e não para todos.', A: 'o governo de muitos pode ser justo.', B: 'leis escritas não são o critério.', C: 'o governo de um só pode ser justo (monarquia).', D: 'a origem não é o critério.' }, traps: { C: 'detalhe' } },
    { base: ['Para Aristóteles, ninguém se torna justo lendo sobre justiça, mas praticando atos justos, assim como se torna tocador de cítara tocando cítara.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto expressa a concepção aristotélica de que a virtude',
      alts: ['é adquirida pelo hábito, na prática repetida.', 'é inata e não pode ser ensinada.', 'depende apenas do conhecimento teórico do bem.', 'é uma graça concedida por Deus.', 'consiste em obedecer à vontade da maioria.'], ans: 'A', hab: 'H1', dif: 'média',
      ex: { A: 'praticando atos justos alguém se torna justo: a virtude moral nasce do hábito.', B: 'é o contrário: a virtude se adquire.', C: 'ler sobre justiça não basta.', D: 'graça divina é noção cristã.', E: 'não há relação com a maioria.' }, traps: { C: 'oposto', D: 'anacronismo' } }
  ]);

  deep('F3', `<h4>Aprofundamento: viver bem em tempos de crise e conciliar fé e razão</h4>
<ul>
<li><strong>Helenísticas</strong> (depois de Alexandre, com a crise da pólis): a pergunta passa a ser como ser feliz individualmente. <strong>Epicurismo:</strong> felicidade como ausência de dor no corpo e de perturbação na alma (ataraxia), com prazeres simples e amizade. <strong>Estoicismo:</strong> viver de acordo com a natureza e a razão; aceitar o que não depende de nós (apatia, no sentido de não ser dominado pelas paixões). <strong>Ceticismo:</strong> suspender o juízo (epoché) para alcançar a tranquilidade.</li>
<li><strong>Medievais:</strong> Agostinho (séculos IV e V) aproxima o cristianismo de Platão: iluminação divina, cidade de Deus × cidade dos homens, livre-arbítrio e origem do mal. Tomás de Aquino (século XIII) aproxima o cristianismo de Aristóteles: fé e razão não se contradizem; as cinco vias para demonstrar a existência de Deus.</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p>Prazer epicurista não é excesso: é o prazer estável, que não traz dor depois. Por isso Epicuro valoriza a moderação, a amizade e a vida simples.</p></div>
<h4>Como o Enem cobra</h4>
<p>Nenhuma questão das provas de 2024 e 2025 (caderno Azul) foi sobre este módulo. Em edições anteriores, o tema apareceu com trechos de Epicuro sobre o prazer moderado, de Sêneca sobre a brevidade da vida e de Agostinho ou Tomás sobre fé e razão. Ele segue valendo, mas, com o tempo curto, a prioridade são os módulos com questões recentes (F6, F4, F7 e F2).</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Quando aparece, a pergunta costuma ser: qual é o caminho para a felicidade proposto no texto (moderação, aceitação, suspensão do juízo) ou como o autor relaciona fé e razão.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Epicurismo não é hedonismo desenfreado. E a "apatia" estoica não é preguiça: é não ser escravo das paixões.</p></div>`, [
    { base: ['"Não é a abundância de banquetes que traz a vida feliz, mas o raciocínio sóbrio, que busca as causas de cada escolha e afasta as opiniões que perturbam a alma."'], src: 'Texto escrito para esta apostila, a partir da Carta a Meneceu, de Epicuro.', cmd: 'Para o epicurismo, a felicidade consiste em',
      alts: ['acumular o maior número possível de prazeres intensos.', 'renunciar a todo prazer em nome da virtude religiosa.', 'obedecer cegamente às leis da cidade.', 'alcançar a tranquilidade pela moderação e pela razão.', 'suspender todo juízo sobre o mundo.'], ans: 'D', hab: 'H1', dif: 'média',
      ex: { D: 'raciocínio sóbrio e afastamento do que perturba a alma levam à ataraxia, a tranquilidade epicurista.', A: 'o texto rejeita a "abundância de banquetes". Termo oposto.', B: 'Epicuro não renuncia ao prazer; modera.', C: 'não há obediência às leis no texto.', E: 'suspender o juízo é o ceticismo.' }, traps: { A: 'oposto', E: 'autor' } },
    { base: ['"Algumas coisas dependem de nós, outras não. Dependem de nós a opinião, o desejo e a aversão; não dependem de nós o corpo, os bens, a reputação."'], src: 'Texto escrito para esta apostila, a partir do Manual de Epicteto.', cmd: 'A orientação estoica presente no texto propõe',
      alts: ['controlar o corpo e a reputação a qualquer custo.', 'concentrar-se no que depende de nós e aceitar o restante.', 'buscar prazeres simples com os amigos.', 'duvidar de toda afirmação sobre o mundo.', 'conciliar a fé cristã com a razão aristotélica.'], ans: 'B', hab: 'H1', dif: 'fácil',
      ex: { B: 'separar o que depende de nós (opiniões, desejos) do que não depende, e aceitar o segundo: é a ética estoica.', A: 'o texto diz que corpo e reputação não dependem de nós.', C: 'prazeres e amizade são ênfase epicurista.', D: 'a dúvida generalizada é cética.', E: 'a conciliação fé-razão é medieval (Tomás).' }, traps: { C: 'autor', E: 'anacronismo' } },
    { base: ['Para Tomás de Aquino, a razão pode demonstrar que Deus existe, observando, por exemplo, que tudo o que se move é movido por outro, e que é preciso haver um primeiro motor.'], src: 'Texto escrito para esta apostila.', cmd: 'O argumento evidencia a tentativa medieval de',
      alts: ['negar qualquer papel da razão na religião.', 'substituir a fé pela ciência experimental.', 'mostrar que o mundo sensível é ilusão.', 'defender o relativismo das crenças.', 'conciliar fé e razão, apoiando-se em Aristóteles.'], ans: 'E', hab: 'H1, H2', dif: 'média',
      ex: { E: 'o "primeiro motor" vem de Aristóteles e é usado para demonstrar racionalmente a existência de Deus: fé e razão conciliadas.', A: 'é o contrário: a razão demonstra. Termo oposto.', B: 'não há ciência experimental (anacronismo).', C: 'Tomás parte do mundo sensível (o movimento).', D: 'não há relativismo.' }, traps: { A: 'oposto', B: 'anacronismo' } }
  ]);

  deep('F4', `<h4>Aprofundamento: como sabemos o que sabemos</h4>
<ul>
<li><strong>Racionalismo</strong> (Descartes): a razão é a fonte segura do conhecimento; a dúvida metódica leva ao "penso, logo existo".</li>
<li><strong>Empirismo</strong> (Locke, Hume): todo conhecimento vem da experiência. Hume critica a causalidade: vemos um fato seguir outro, mas a ligação necessária é hábito da mente.</li>
<li><strong>Kant:</strong> síntese; o conhecimento começa com a experiência, mas é organizado por estruturas do sujeito (espaço, tempo, categorias).</li>
<li><strong>Indução × dedução:</strong> a indução parte de casos particulares para uma lei geral (sempre provável, nunca certa); a dedução parte de premissas gerais para uma conclusão necessária.</li>
<li><strong>Filosofia da ciência e da linguagem:</strong> Popper (a ciência avança por falseamento), o Círculo de Viena e Carnap (só têm sentido os enunciados verificáveis pela experiência), Quine (crítica a esses "dogmas" do empirismo).</li>
<li><strong>Injustiça epistêmica</strong> (Miranda Fricker): o preconceito faz o ouvinte dar menos credibilidade ao que alguém diz por causa de gênero, raça ou classe.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>O peru de Russell: alimentado todas as manhãs, conclui por indução que sempre será alimentado às 9h, até a véspera do Natal. A observação repetida não garante a lei universal.</p></div>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('24d1', 82)}: o peru de Russell. A resposta: raciocínio <strong>indutivo</strong>, que infere leis universais de eventos particulares.</li>
<li>${cite('24d1', 62)}: Quine e Carnap divergem sobre o <strong>estatuto epistemológico da linguagem</strong> (o que torna um enunciado significativo).</li>
<li>${cite('24d1', 54)}: Fricker e a <strong>injustiça epistêmica</strong>, que prejudica as trocas de informação.</li>
<li>${cite('25d1', 48)}: Hume critica a eloquência que domina pelos afetos. A resposta a restringia ao <strong>âmbito da persuasão</strong>, de modo análogo às críticas de Platão aos sofistas.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Este módulo apareceu 4 vezes em 2024 e 2025. As perguntas pedem o <strong>tipo de raciocínio</strong> ou o critério de conhecimento. Ligue o autor à fonte do saber: razão (Descartes), experiência (Hume), síntese (Kant), falseamento (Popper).</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Indução × dedução: muitas observações levando a uma lei geral é <strong>indução</strong>, mesmo que pareça "demonstração". E o empirismo de Hume não nega a ciência; mostra que a causalidade não é observável, é hábito.</p></div>`, [
    { base: ['"Todas as vezes que vi água aquecida a 100 °C ao nível do mar, ela ferveu. Logo, a água sempre ferve a 100 °C ao nível do mar."'], src: 'Texto escrito para esta apostila.', cmd: 'O raciocínio apresentado é',
      alts: ['indutivo, porque generaliza a partir de casos observados.', 'dedutivo, porque parte de uma lei geral para um caso particular.', 'analógico, porque compara duas situações diferentes.', 'intuitivo, porque dispensa qualquer observação.', 'dialético, porque confronta tese e antítese.'], ans: 'A', hab: 'H1', dif: 'fácil',
      ex: { A: 'das ocorrências observadas ("todas as vezes que vi") chega-se a uma lei geral: indução.', B: 'a dedução vai do geral ao particular; aqui é o contrário.', C: 'não há comparação entre situações distintas.', D: 'o raciocínio se apoia na observação.', E: 'não há confronto de teses.' }, traps: { B: 'oposto' } },
    { base: ['Numa reunião, a ideia de uma funcionária é ignorada; minutos depois, um colega repete a mesma ideia e é elogiado por todos.'], src: 'Situação escrita para esta apostila.', cmd: 'À luz do conceito de injustiça epistêmica, a situação revela que',
      alts: ['a ideia do colega era tecnicamente superior.', 'a reunião seguiu critérios objetivos de avaliação.', 'o preconceito reduziu a credibilidade atribuída à fala da funcionária.', 'a funcionária não dominava o assunto discutido.', 'a repetição de uma ideia sempre a torna mais convincente.'], ans: 'C', hab: 'H24', dif: 'média',
      ex: { C: 'a mesma ideia recebe credibilidade diferente conforme quem fala: é a injustiça epistêmica descrita por Fricker.', A: 'a ideia era a mesma.', B: 'os critérios não foram objetivos; a fala dela foi ignorada.', D: 'nada indica falta de domínio.', E: '"sempre" é exagero e ignora o preconceito.' }, traps: { E: 'exagero' } },
    { base: ['"Não vemos a causa: vemos apenas que um evento costuma seguir o outro. A ideia de conexão necessária nasce do costume."'], src: 'Texto escrito para esta apostila, a partir de David Hume.', cmd: 'O texto expressa a posição empirista segundo a qual',
      alts: ['a razão, sozinha, garante o conhecimento das causas.', 'Deus é a origem de toda causalidade.', 'as Ideias eternas explicam a ligação entre os fatos.', 'a matemática prova a necessidade dos fenômenos.', 'a causalidade é uma expectativa formada pelo hábito.'], ans: 'E', hab: 'H1', dif: 'média',
      ex: { E: 'para Hume, a "conexão necessária" é costume da mente diante da repetição, não algo observado.', A: 'a razão sozinha garantindo o conhecimento é o racionalismo.', B: 'o texto não fala de Deus.', C: 'Ideias eternas são Platão.', D: 'a matemática não aparece.' }, traps: { A: 'autor', C: 'autor' } }
  ]);

  deep('F5', `<h4>Aprofundamento: poder, legitimidade e direitos</h4>
<ul>
<li><strong>Soberania popular</strong>: o poder legítimo vem do conjunto dos cidadãos (Rousseau; também a democracia moderna). Ortega y Gasset distingue a pergunta "quem deve mandar?" (a democracia responde: todos) da pergunta "até onde vai o poder?" (o liberalismo responde: com limites).</li>
<li><strong>Direito × justiça</strong> (Derrida): o direito é cálculo, regra; a justiça é incalculável. Por isso pode haver ação justa em desconformidade com a lei, como na <strong>desobediência civil</strong> (Thoreau, Gandhi, Martin Luther King): pública, não violenta, contra uma lei considerada injusta.</li>
<li><strong>Direitos como construção histórica</strong> (Bobbio): os direitos humanos mudam com as condições históricas, as necessidades e as lutas; não são naturais nem eternos, e o desafio atual é protegê-los.</li>
<li><strong>Weber:</strong> o Estado detém o monopólio do uso legítimo da força. Formas de dominação legítima: tradicional, carismática e racional-legal.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 50)}: Derrida, o direito como cálculo e a justiça incalculável. A resposta: <strong>casos de desobediência civil</strong> como exemplo de ação justa em desconformidade com o ordenamento jurídico. Foi um dos seus erros: você marcou D (manifestações sindicais), que não são, por definição, desconformidade com a lei.</li>
<li>${cite('25d1', 76)}: Bobbio, os direitos como classe variável. A resposta: os direitos como <strong>convenções coletivas</strong>, construídas historicamente. Seu outro erro: você marcou B (conquistas atemporais), o oposto da tese.</li>
<li>${cite('24d1', 87)}: Ortega y Gasset sobre a democracia. A resposta: <strong>soberania popular</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Os dois erros de 2025 caíram no mesmo tipo de armadilha: a alternativa errada parecia "nobre" (sindicatos, direitos atemporais), mas <strong>contradizia o texto</strong>. Volte sempre à tese do autor: Bobbio diz "variável", logo "atemporal" está fora.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Desobediência civil não é qualquer protesto: é <strong>violação pública e pacífica de uma lei considerada injusta</strong>, aceitando as consequências. E "direitos naturais" (Locke) × "direitos históricos" (Bobbio) é a troca mais comum.</p></div>`, [
    { base: ['Nos anos 1950, nos Estados Unidos, uma mulher negra se recusou a ceder seu lugar no ônibus a um passageiro branco, como exigia a lei local. Foi presa, e sua atitude inspirou um boicote pacífico aos ônibus da cidade.'], src: 'Texto escrito para esta apostila, sobre o caso de Rosa Parks.', cmd: 'A atitude descrita exemplifica a desobediência civil porque',
      alts: ['usou a violência para derrubar o governo.', 'descumpriu publicamente, sem violência, uma lei considerada injusta.', 'seguiu fielmente o ordenamento jurídico vigente.', 'buscou vantagens econômicas individuais.', 'foi organizada por um partido político para vencer uma eleição.'], ans: 'B', hab: 'H11, H24', dif: 'fácil',
      ex: { B: 'recusa pública, pacífica, a uma lei de segregação, aceitando a prisão: desobediência civil.', A: 'não houve violência.', C: 'ela descumpriu a lei. Termo oposto.', D: 'não houve vantagem individual.', E: 'não se trata de campanha eleitoral.' }, traps: { C: 'oposto' } },
    { base: ['O direito à proteção de dados pessoais não constava das declarações de direitos do século XVIII; hoje, é reconhecido em constituições e leis de vários países.'], src: 'Texto escrito para esta apostila.', cmd: 'O exemplo reforça a tese de Norberto Bobbio de que os direitos humanos',
      alts: ['são naturais e imutáveis, anteriores a qualquer sociedade.', 'foram integralmente definidos na Revolução Francesa.', 'dependem apenas da vontade de um governante.', 'são construções históricas que variam com as condições de cada época.', 'perderam importância no mundo contemporâneo.'], ans: 'D', hab: 'H11', dif: 'fácil',
      ex: { D: 'um direito que surge com a tecnologia mostra que os direitos mudam com a história: é a tese de Bobbio.', A: 'naturais e imutáveis é o oposto de Bobbio (e lembra Locke).', B: 'o exemplo mostra um direito posterior ao século XVIII.', C: 'o texto fala de constituições e leis.', E: 'o texto mostra ampliação, não perda.' }, traps: { A: 'oposto', C: 'exagero' } },
    { base: ['Para Max Weber, o Estado moderno é a comunidade humana que reivindica, com sucesso, o monopólio do uso legítimo da força física dentro de um território.'], src: 'Texto escrito para esta apostila.', cmd: 'Segundo essa definição, o que distingue o Estado de outros grupos que usam a força é',
      alts: ['o tamanho do seu exército.', 'a origem divina do seu poder.', 'a legitimidade reconhecida do uso da força.', 'a ausência de leis escritas.', 'a riqueza acumulada pelos governantes.'], ans: 'C', hab: 'H11', dif: 'média',
      ex: { C: 'a palavra-chave é "legítimo": o Estado usa a força com reconhecimento, ao contrário de milícias ou grupos criminosos.', A: 'o tamanho do exército não é o critério.', B: 'Weber não fala de origem divina.', D: 'o Estado moderno tem leis.', E: 'a riqueza não é o critério.' }, traps: { B: 'anacronismo' } }
  ]);

  deep('F6', `<h4>Aprofundamento: as grandes teorias éticas</h4>
<div class="tw"><table><thead><tr><th>Teoria</th><th>Pergunta central</th><th>Autores</th></tr></thead><tbody>
<tr><td><strong>Ética das virtudes</strong></td><td>Que tipo de pessoa devo ser? Felicidade (<em>eudaimonia</em>) como atividade virtuosa</td><td>Aristóteles</td></tr>
<tr><td><strong>Deontologia</strong> (dever)</td><td>Qual é o meu dever, independentemente das consequências?</td><td>Kant: imperativo categórico ("age de modo que a máxima da tua ação possa valer como lei universal")</td></tr>
<tr><td><strong>Utilitarismo</strong> (consequencialismo)</td><td>Qual ação produz a maior felicidade para o maior número?</td><td>Bentham, Stuart Mill</td></tr>
<tr><td><strong>Ética do cuidado</strong></td><td>Como responder às necessidades de quem é vulnerável?</td><td>Carol Gilligan, Nel Noddings</td></tr>
</tbody></table></div>
<ul>
<li><strong>Altruísmo:</strong> agir pelo bem do outro, mesmo com custo próprio.</li>
<li><strong>Adam Smith</strong>, além de <em>A riqueza das nações</em>, escreveu <em>Teoria dos sentimentos morais</em>: a empatia (simpatia) e o julgamento moral também orientam a vida econômica.</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p>A "regra de ouro" (trate os outros como gostaria de ser tratado) é aproximada no Enem do <strong>imperativo categórico</strong> de Kant: a ação moral é aquela que eu poderia querer como regra para todos.</p></div>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 79)}: Bentham relaciona punição e felicidade. A resposta: <strong>aplicação de meios para atingir um fim</strong> (a lógica utilitarista). Foi um dos seus erros: você marcou B (regras para estabelecer um dever), que é a deontologia de Kant, a teoria rival.</li>
<li>${cite('25d1', 65)}: Clarice Lispector quer ser "lutadora" pelo bem dos outros. A resposta: <strong>pensamento altruísta</strong>.</li>
<li>${cite('25d1', 60)}: Adam Smith e a moral nos negócios. A resposta: o lucro associado à <strong>percepção de responsabilidade ética</strong>.</li>
<li>${cite('24d1', 58)}: a <em>eudaimonia</em> aristotélica. A resposta: o <strong>aperfeiçoamento das condutas humanas</strong>.</li>
<li>${cite('24d1', 72)}: a vulnerabilidade da pessoa com deficiência. A resposta: uma ética centrada no <strong>cuidado, proteção e valorização</strong> dos indivíduos.</li>
<li>${cite('24d1', 78)}: a regra de ouro. A resposta: o <strong>imperativo categórico</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Ética foi o módulo de Filosofia mais cobrado em 2024 e 2025: <strong>6 questões</strong>. Identifique o critério do texto: consequências (utilitarismo), dever universal (Kant), virtude e hábito (Aristóteles) ou cuidado com o vulnerável.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Utilitarismo × deontologia é a troca do seu erro na 79. Se o texto fala em <strong>felicidade, prazer, dor e consequências</strong>, é utilitarismo; se fala em <strong>dever, regra universal e dignidade independentemente do resultado</strong>, é Kant.</p></div>`, [
    { base: ['Um gestor decide fechar uma ala do hospital para abrir outra que atenderá três vezes mais pacientes. "A decisão certa é a que produz o maior bem para o maior número de pessoas", justifica.'], src: 'Situação escrita para esta apostila.', cmd: 'A justificativa do gestor se fundamenta na ética',
      alts: ['das virtudes, que busca formar o caráter pelo hábito.', 'kantiana, que exige agir por dever, independentemente das consequências.', 'do cuidado, centrada na relação com quem é vulnerável.', 'estoica, que recomenda aceitar o que não depende de nós.', 'utilitarista, que avalia as ações por suas consequências.'], ans: 'E', hab: 'H22', dif: 'fácil',
      ex: { E: '"maior bem para o maior número" é a fórmula utilitarista: a decisão é julgada pelo resultado.', A: 'não se fala em caráter ou hábito.', B: 'Kant ignora as consequências; o gestor se guia por elas. Termo oposto.', C: 'o foco não é a relação de cuidado individual.', D: 'não há aceitação do que não depende de nós.' }, traps: { B: 'oposto' } },
    { base: ['Mesmo podendo ganhar muito dinheiro, uma pessoa se recusa a mentir num contrato: "Se todos mentissem quando lhes conviesse, nenhum contrato teria valor."'], src: 'Situação escrita para esta apostila.', cmd: 'O raciocínio corresponde ao imperativo categórico de Kant porque',
      alts: ['avalia se a regra da ação poderia valer para todos.', 'calcula o prazer e a dor que a mentira produziria.', 'busca o meio-termo entre dois vícios.', 'segue o costume local da comunidade.', 'obedece a uma ordem religiosa.'], ans: 'A', hab: 'H22', dif: 'média',
      ex: { A: 'testar se a máxima ("mentir quando convém") poderia ser universal e ver que ela se destrói é o imperativo categórico.', B: 'calcular prazer e dor é utilitarismo.', C: 'o meio-termo é Aristóteles.', D: 'não se apoia em costume.', E: 'não há ordem religiosa.' }, traps: { B: 'autor', C: 'autor' } },
    { base: ['Uma enfermeira adapta a rotina do hospital para que um paciente idoso, com demência, possa receber a visita diária da neta, que o acalma mais do que qualquer remédio.'], src: 'Situação escrita para esta apostila.', cmd: 'A conduta da enfermeira se aproxima da ética do cuidado porque',
      alts: ['aplica rigidamente as normas da instituição.', 'busca o máximo lucro para o hospital.', 'calcula friamente as consequências para o maior número.', 'responde às necessidades concretas de uma pessoa vulnerável.', 'renuncia a qualquer vínculo afetivo com o paciente.'], ans: 'D', hab: 'H22', dif: 'fácil',
      ex: { D: 'atenção à necessidade concreta de alguém vulnerável, com vínculo e responsabilidade: é o centro da ética do cuidado.', A: 'ela adapta a norma, não a aplica rigidamente.', B: 'não há lucro envolvido.', C: 'o foco é uma pessoa, não o maior número.', E: 'é o contrário: valoriza o vínculo. Termo oposto.' }, traps: { E: 'oposto' } }
  ]);

  deep('F7', `<h4>Aprofundamento: suspeitar, criticar e existir</h4>
<ul>
<li><strong>Escola de Frankfurt:</strong> Adorno e Horkheimer criticam a <strong>indústria cultural</strong>, que padroniza a arte e transforma o público em massa homogênea; Marcuse descreve a sociedade industrial que satisfaz necessidades e, com isso, neutraliza a crítica: a <strong>sociedade unidimensional</strong>.</li>
<li><strong>Foucault:</strong> o poder não está só no Estado; é uma rede de práticas. A <strong>disciplina</strong> vigia, treina e normaliza corpos em escolas, hospitais, quartéis e prisões; a vigilância se espalha ("capilariza").</li>
<li><strong>Existencialismo:</strong> Sartre ("a existência precede a essência": o ser humano se define pelas escolhas e é responsável por elas); Heidegger e a consciência da <strong>finitude</strong>; Simone de Beauvoir ("não se nasce mulher, torna-se").</li>
<li><strong>Deleuze e Guattari:</strong> o <strong>rizoma</strong>, rede sem centro, em que qualquer ponto se liga a qualquer outro (contra a árvore hierárquica).</li>
<li><strong>Hannah Arendt:</strong> banalidade do mal, e poder × violência.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 66)}: Marcuse e a sociedade industrial que torna o não conformismo "socialmente inútil". A resposta: <strong>realidade unidimensional</strong>. Foi um dos seus erros: você marcou E (desenvolvimento tecnológico), um detalhe verdadeiro que não é a tese.</li>
<li>${cite('25d1', 55)}: Foucault, a disciplina em colégios, hospitais e quartéis. A resposta: <strong>capilarização das práticas de controle</strong>.</li>
<li>${cite('24d1', 61)}: reflexão de personagem sobre a morte e o tempo. A resposta: a <strong>finitude humana</strong>.</li>
<li>${cite('24d1', 76)}: o rizoma. A resposta: <strong>pluralidade de interações</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Filosofia contemporânea aparece com textos densos e alternativas abstratas. Procure a <strong>palavra-tese</strong> do autor (unidimensional, disciplina, rizoma, finitude) e escolha a alternativa que a nomeia.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Em Marcuse e Adorno, a tecnologia e o conforto são o <strong>cenário</strong>; a tese é a perda da capacidade crítica. "Desenvolvimento tecnológico" é verdade sobre o contexto, mas não responde à pergunta: é o detalhe verdadeiro que derrubou você em 2025.</p></div>`, [
    { base: ['"A existência precede a essência: o homem primeiro existe, se encontra, surge no mundo, e só depois se define."'], src: 'Texto escrito para esta apostila, a partir de Jean-Paul Sartre.', cmd: 'Para o existencialismo de Sartre, isso significa que o ser humano',
      alts: ['tem uma natureza fixa, definida antes do nascimento.', 'é determinado inteiramente pela sua classe social.', 'constrói o que é por meio de suas escolhas, pelas quais é responsável.', 'deve aceitar o destino traçado pelos deuses.', 'alcança a felicidade ao suspender todo juízo.'], ans: 'C', hab: 'H1', dif: 'fácil',
      ex: { C: 'sem essência prévia, o ser humano se define pelo que faz e responde pelas escolhas: é o núcleo do existencialismo.', A: 'é o oposto da tese. Termo oposto.', B: 'Sartre recusa o determinismo absoluto.', D: 'destino divino é estranho ao existencialismo ateu de Sartre.', E: 'suspender o juízo é o ceticismo antigo.' }, traps: { A: 'oposto', E: 'autor' } },
    { base: ['Num aplicativo de entregas, o trabalhador é avaliado por notas, cronometrado a cada pedido e classificado num ranking; quem cai de posição recebe menos corridas.'], src: 'Situação escrita para esta apostila.', cmd: 'À luz do pensamento de Michel Foucault, a situação ilustra',
      alts: ['o fim de qualquer forma de controle sobre o trabalho.', 'mecanismos disciplinares de vigilância, avaliação e normalização dos corpos.', 'o poder exercido exclusivamente pelo Estado.', 'a autonomia plena do trabalhador sobre seu tempo.', 'a recuperação das corporações de ofício medievais.'], ans: 'B', hab: 'H11, H15', dif: 'média',
      ex: { B: 'notas, cronômetro e ranking vigiam, avaliam e moldam o comportamento: são técnicas disciplinares, agora digitais.', A: 'o controle aumenta.', C: 'quem controla é uma empresa: o poder não é só estatal.', D: 'o ranking condiciona o trabalhador.', E: 'não há relação com as corporações medievais.' }, traps: { A: 'oposto', C: 'exagero' } },
    { base: ['Adorno e Horkheimer afirmam que a indústria cultural oferece ao público produtos padronizados que parecem diferentes, mas repetem as mesmas fórmulas.'], src: 'Texto escrito para esta apostila.', cmd: 'A crítica dos autores aponta que a indústria cultural',
      alts: ['estimula a reflexão crítica e a autonomia do público.', 'valoriza a arte popular tradicional.', 'garante a diversidade real das produções culturais.', 'elimina o caráter comercial da arte.', 'homogeneíza o gosto e funciona como mecanismo de controle social.'], ans: 'E', hab: 'H15', dif: 'média',
      ex: { E: 'produtos padronizados, com falsa diferença, moldam um público homogêneo e passivo: controle social.', A: 'é o contrário: inibe a reflexão. Termo oposto.', B: 'a indústria cultural não é a arte popular tradicional.', C: 'a diversidade é aparente, diz o texto.', D: 'a arte vira mercadoria.' }, traps: { A: 'oposto', C: 'oposto' } }
  ]);

  deep('S1', `<h4>Aprofundamento: as três lentes clássicas</h4>
<div class="tw"><table><thead><tr><th></th><th>Durkheim</th><th>Weber</th><th>Marx</th></tr></thead><tbody>
<tr><td>Objeto</td><td><strong>Fato social</strong>: exterior, coercitivo e geral</td><td><strong>Ação social</strong>: conduta dotada de sentido, orientada pelos outros</td><td><strong>Relações de produção</strong> e luta de classes</td></tr>
<tr><td>Conceitos-chave</td><td>Solidariedade mecânica × orgânica; anomia; consciência coletiva</td><td>Tipos de ação (racional por fins, por valores, afetiva, tradicional); dominação legítima; racionalização e "desencantamento do mundo"</td><td>Mais-valia; alienação; ideologia; infraestrutura e superestrutura</td></tr>
<tr><td>Sociedade como...</td><td>Organismo que precisa de coesão</td><td>Teia de ações com sentido</td><td>Arena de conflito entre classes</td></tr>
</tbody></table></div>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Solidariedade mecânica</strong>: coesão pela semelhança, em sociedades simples. <strong>Orgânica</strong>: coesão pela interdependência das funções (divisão do trabalho), em sociedades complexas. <strong>Anomia</strong>: enfraquecimento das normas que dão sentido e limite à vida social.</p></div>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>A obrigação de usar uniforme na escola é um <strong>fato social</strong> (Durkheim): existia antes do aluno, vale para todos e é imposta por sanções. Já a decisão de um estudante de acordar cedo para estudar porque quer passar no Enem é uma <strong>ação social racional com relação a fins</strong> (Weber).</p></div>
<h4>Como o Enem cobra</h4>
<p>Nenhuma questão das provas de 2024 e 2025 (caderno Azul) teve os clássicos como tema central. Os conceitos deles, porém, sustentam muitas questões de outros módulos: alienação (S2, ${cite('24d1', 90)}), dominação legítima (F5) e racionalização. Revise a tabela como ferramenta para ler os outros temas.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Quando aparecem, os clássicos vêm em trechos curtos com uma palavra-chave: "coerção" e "exterior" (Durkheim), "sentido" e "racionalização" (Weber), "classe" e "mais-valia" (Marx).</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>"Fato social" não é qualquer acontecimento social: precisa ser exterior, coercitivo e geral. E Weber não reduz a sociedade à economia; quem dá centralidade às relações de produção é Marx.</p></div>`, [
    { base: ['Numa pequena aldeia, todos plantam, caçam e celebram juntos; as crenças são compartilhadas e quem as desrespeita é punido severamente pelo grupo.'], src: 'Texto escrito para esta apostila.', cmd: 'Segundo Durkheim, a coesão dessa sociedade se baseia na solidariedade',
      alts: ['orgânica, fundada na interdependência das profissões.', 'mecânica, fundada na semelhança entre os indivíduos.', 'contratual, fundada em acordos comerciais.', 'de classe, fundada na exploração do trabalho.', 'racional, fundada na burocracia estatal.'], ans: 'B', hab: 'H11', dif: 'fácil',
      ex: { B: 'todos fazem as mesmas coisas e compartilham as crenças: coesão pela semelhança, a solidariedade mecânica.', A: 'a orgânica é das sociedades complexas, com divisão do trabalho. Termo oposto.', C: 'não há contratos.', D: 'classe e exploração são conceitos de Marx.', E: 'burocracia é tema de Weber e das sociedades modernas.' }, traps: { A: 'oposto', D: 'autor' } },
    { base: ['Um operário passa o dia apertando o mesmo parafuso; não conhece o produto final, não decide o ritmo de trabalho e o que produz pertence a outro.'], src: 'Texto escrito para esta apostila.', cmd: 'A situação ilustra o conceito marxista de',
      alts: ['anomia, a falta de normas sociais.', 'ação afetiva, movida pelas emoções.', 'solidariedade orgânica, fundada na cooperação.', 'desencantamento do mundo, a perda da explicação mágica.', 'alienação, a separação entre o trabalhador e o produto do seu trabalho.'], ans: 'E', hab: 'H24', dif: 'fácil',
      ex: { E: 'o trabalhador não controla o processo nem o produto, que pertence a outro: alienação, em Marx.', A: 'anomia é conceito de Durkheim, sobre normas.', B: 'ação afetiva é tipo de Weber.', C: 'a solidariedade orgânica é de Durkheim e não trata da exploração.', D: 'desencantamento é conceito de Weber.' }, traps: { A: 'autor', D: 'autor' } },
    { base: ['Para Weber, a modernidade organiza cada vez mais a vida por regras impessoais, cálculo e eficiência, como nas empresas e na administração pública.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve o processo que Weber chamou de',
      alts: ['luta de classes', 'solidariedade mecânica', 'racionalização', 'consciência coletiva', 'mais-valia'], ans: 'C', hab: 'H11', dif: 'fácil',
      ex: { C: 'regras impessoais, cálculo e eficiência: a racionalização da vida moderna, em Weber.', A: 'luta de classes é Marx.', B: 'solidariedade mecânica é Durkheim.', D: 'consciência coletiva é Durkheim.', E: 'mais-valia é Marx.' }, traps: { A: 'autor', B: 'autor', D: 'autor', E: 'autor' } }
  ]);

  deep('S2', `<h4>Aprofundamento: como o trabalho foi organizado</h4>
<div class="tw"><table><thead><tr><th>Modelo</th><th>Marcas</th></tr></thead><tbody>
<tr><td><strong>Taylorismo</strong> (início do século XX)</td><td>Estudo de tempos e movimentos; separação entre quem planeja e quem executa</td></tr>
<tr><td><strong>Fordismo</strong></td><td>Linha de montagem, produção em massa padronizada, trabalhador especializado numa tarefa repetitiva</td></tr>
<tr><td><strong>Toyotismo</strong> (pós-1970)</td><td>Produção flexível, <em>just in time</em>, estoque mínimo, trabalhador polivalente, terceirização</td></tr>
<tr><td><strong>Plataformização</strong> ("uberização")</td><td>Trabalho mediado por aplicativos, controle por algoritmos e notas, renda por tarefa, sem vínculo empregatício</td></tr>
</tbody></table></div>
<ul>
<li><strong>Precarização:</strong> perda de direitos, contratos temporários, informalidade.</li>
<li><strong>Alienação</strong> (Marx): o trabalhador não se reconhece no que produz.</li>
<li><strong>Contradição apontada por Castoriadis:</strong> o capitalismo tenta reduzir o trabalhador a peça de máquina, mas depende da criatividade e da iniciativa humanas para funcionar.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul><li>${cite('24d1', 90)}: Castoriadis afirma que uma fábrica com operários reduzidos a peças pararia em quinze minutos. A resposta: a <strong>alienação decorrente da organização do trabalho</strong>.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Os textos comparam modelos de produção (rigidez fordista × flexibilidade toyotista) ou discutem a precarização atual. Identifique o modelo pelas marcas e o efeito sobre o trabalhador.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Flexibilidade toyotista não significa mais autonomia ou mais direitos: costuma vir com intensificação do trabalho e terceirização. E "empreendedorismo" de aplicativo pode esconder a ausência de garantias trabalhistas.</p></div>`, [
    { base: ['Na fábrica, as peças chegam exatamente quando serão usadas, o estoque é mínimo e cada operário opera várias máquinas diferentes.'], src: 'Texto escrito para esta apostila.', cmd: 'As características descritas pertencem ao modelo',
      alts: ['taylorista, baseado no estudo de tempos e movimentos.', 'fordista, baseado na linha de montagem rígida.', 'artesanal, baseado na produção doméstica.', 'toyotista, baseado na produção flexível e no trabalhador polivalente.', 'escravista, baseado no trabalho compulsório.'], ans: 'D', hab: 'H17', dif: 'fácil',
      ex: { D: '"just in time", estoque mínimo e trabalhador polivalente: toyotismo.', A: 'o taylorismo separa planejamento e execução, sem polivalência.', B: 'o fordismo tem estoques grandes e tarefa única.', C: 'não é produção doméstica.', E: 'não há trabalho compulsório.' }, traps: { B: 'oposto' } },
    { base: ['"Sou meu próprio patrão", diz o entregador. Mas é o aplicativo que define o preço da corrida, bloqueia quem recusa pedidos e avalia cada entrega.'], src: 'Texto escrito para esta apostila.', cmd: 'A situação evidencia uma contradição do trabalho por plataformas, que é a',
      alts: ['apresentação de autonomia combinada com controle intenso por algoritmos.', 'garantia plena de direitos trabalhistas aos entregadores.', 'fim da relação entre trabalho e tecnologia.', 'volta ao modelo de produção artesanal.', 'eliminação da concorrência entre trabalhadores.'], ans: 'A', hab: 'H17, H24', dif: 'média',
      ex: { A: 'o discurso de ser "patrão" convive com preço, bloqueio e avaliação definidos pela plataforma.', B: 'o texto não indica direitos garantidos.', C: 'a tecnologia é central.', D: 'não há relação com o artesanato.', E: 'os bloqueios e avaliações sugerem concorrência.' }, traps: { B: 'oposto' } },
    { base: ['Cada operário repete o mesmo gesto o dia inteiro, numa esteira que define o ritmo de trabalho, para produzir milhares de carros iguais.'], src: 'Texto escrito para esta apostila.', cmd: 'O modelo descrito é o fordismo, cuja principal característica é a',
      alts: ['produção sob demanda com estoque mínimo.', 'polivalência dos trabalhadores.', 'produção em massa padronizada na linha de montagem.', 'personalização de cada produto.', 'organização do trabalho por aplicativos.'], ans: 'C', hab: 'H17', dif: 'fácil',
      ex: { C: 'esteira, gesto repetido e milhares de produtos iguais: produção em massa na linha de montagem.', A: 'sob demanda e estoque mínimo é toyotismo.', B: 'polivalência é toyotismo.', D: 'os carros são iguais.', E: 'aplicativos são da plataformização.' }, traps: { A: 'autor', B: 'autor' } }
  ]);

  deep('S3', `<h4>Aprofundamento: cultura, identidade, memória e meios</h4>
<ul>
<li><strong>Cultura</strong>, em sentido antropológico, é todo o modo de vida de um grupo: crenças, saberes, técnicas, festas, linguagem. Não há povo "sem cultura".</li>
<li><strong>Etnocentrismo × relativismo cultural:</strong> julgar o outro pelos padrões do próprio grupo × compreender cada cultura em seus próprios termos. <strong>Alteridade</strong>: reconhecer o outro como diferente e legítimo.</li>
<li><strong>Identidade</strong> (Stuart Hall): na globalização, as identidades deixam de ser fixas e "fechadas" e se tornam plurais, posicionais, o que abre espaço para as <strong>pautas das minorias</strong>.</li>
<li><strong>Memória coletiva</strong> (Halbwachs): os grupos reconstroem o passado em ritos, festas e lugares, que mantêm a identidade.</li>
<li><strong>Indústria cultural</strong> (Adorno e Horkheimer): padronização e controle social pela cultura de massa.</li>
<li><strong>Religiões afro-brasileiras:</strong> candomblé e umbanda, alvo de preconceito e intolerância; o Enem discute sua invisibilização e o direito à diversidade religiosa.</li>
<li><strong>Saberes tradicionais e patrimônio imaterial:</strong> conhecimentos indígenas e populares (sementes, medicina, artes) reconhecidos como complexos e protegidos.</li>
</ul>
<h4>Como o Enem cobra</h4>
<p>Foi o tema mais cobrado de Humanas em 2024 e 2025: <strong>9 questões</strong>.</p>
<ul>
<li>${cite('24d1', 56)}: o axexê, rito fúnebre do candomblé. A resposta: <strong>manutenção de uma memória coletiva</strong>.</li>
<li>${cite('24d1', 74)}: o Círio de Nazaré como patrimônio. A resposta: <strong>registro de bens culturais de natureza imaterial</strong>.</li>
<li>${cite('24d1', 73)}: a xilogravura nas capas de cordel. A resposta: renovação da <strong>estética editorial</strong>.</li>
<li>${cite('24d1', 63)}: a indústria cultural. A resposta: um <strong>mecanismo de controle social</strong>.</li>
<li>${cite('24d1', 65)}: Stuart Hall e a globalização. A resposta: <strong>fortalecer as pautas das minorias</strong>.</li>
<li>${cite('25d1', 74)}: a invisibilização das religiões afro-brasileiras. A resposta: <strong>precariedade de coesão representativa e recusa da alteridade</strong>.</li>
<li>${cite('25d1', 53)}: a dança condenada pela Igreja antiga e a dança gospel atual. A resposta: <strong>dogmatismo religioso e adesão de fiéis</strong>.</li>
<li>${cite('25d1', 85)}: dois textos sobre o cinema no início do século XX. A resposta: <strong>argumentos contrários sobre o mesmo tipo de diversão</strong>.</li>
<li>${cite('25d1', 88)}: a declaração da ONU sobre os povos indígenas. A resposta: a <strong>complexidade dos saberes tradicionais</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>O padrão das 9 questões: a resposta <strong>valoriza</strong> a cultura descrita (memória, patrimônio, saberes complexos, identidade) ou <strong>nomeia criticamente</strong> o mecanismo que a ameaça (controle social, recusa da alteridade). Alternativas exotizantes ou depreciativas quase nunca estão certas.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Ritos afro-brasileiros não são "contestação de identidade" nem "prática pagã a legitimar": para os adeptos, mantêm a memória e a identidade. E patrimônio de uma festa religiosa é <strong>imaterial</strong> (a celebração), não arqueológico.</p></div>`, [
    { base: ['Durante uma viagem, um turista comenta: "Essa comida deles é estranha e sem sentido; civilizado mesmo é o jeito como se come no meu país."'], src: 'Texto escrito para esta apostila.', cmd: 'O comentário do turista expressa',
      alts: ['relativismo cultural, ao compreender a cultura do outro em seus próprios termos.', 'alteridade, ao reconhecer a legitimidade da diferença.', 'diversidade cultural, ao valorizar diferentes modos de vida.', 'memória coletiva, ao preservar tradições do grupo visitado.', 'etnocentrismo, ao julgar a outra cultura pelos padrões da sua.'], ans: 'E', hab: 'H6', dif: 'fácil',
      ex: { E: 'tomar o próprio país como medida do "civilizado" é etnocentrismo.', A: 'o relativismo é o oposto da atitude do turista. Termo oposto.', B: 'ele não reconhece a diferença como legítima.', C: 'não há valorização.', D: 'não se trata de memória do grupo.' }, traps: { A: 'oposto', B: 'oposto' } },
    { base: ['Todos os anos, a comunidade reencena, na festa do padroeiro, a chegada dos primeiros moradores ao vale; os mais velhos contam as histórias e os jovens aprendem as cantigas.'], src: 'Texto escrito para esta apostila.', cmd: 'A festa descrita contribui principalmente para',
      alts: ['substituir a cultura local por padrões globais.', 'manter a memória coletiva e a identidade do grupo.', 'eliminar as diferenças entre gerações.', 'transformar a tradição em produto da indústria cultural.', 'apagar a história dos primeiros moradores.'], ans: 'B', hab: 'H1, H5', dif: 'fácil',
      ex: { B: 'reencenar a origem, contar histórias e ensinar cantigas transmite a memória e reforça a identidade.', A: 'não há padrões globais.', C: 'as gerações se encontram, mas não se igualam.', D: 'não há mercantilização.', E: 'é o contrário: a festa preserva essa história. Termo oposto.' }, traps: { E: 'oposto' } },
    { base: ['"Antes eu era só brasileiro. Hoje sou nordestino em São Paulo, evangélico, gamer, filho de migrantes e militante ambiental, e cada lugar me pede uma dessas faces."'], src: 'Depoimento escrito para esta apostila.', cmd: 'O depoimento ilustra a ideia de Stuart Hall de que, na globalização, as identidades se tornam',
      alts: ['plurais e posicionais, combinando diferentes pertencimentos.', 'fixas e unificadas em torno da nação.', 'inexistentes, pela dissolução de todo pertencimento.', 'definidas exclusivamente pela classe social.', 'determinadas pela origem biológica.'], ans: 'A', hab: 'H5', dif: 'média',
      ex: { A: 'o falante acumula pertencimentos e muda de "face" conforme o lugar: identidades plurais e posicionais.', B: 'é o oposto do que o texto mostra. Termo oposto.', C: 'há muitas identidades, não ausência delas. Exagero.', D: 'a classe não aparece como única definição.', E: 'nada é biológico no depoimento.' }, traps: { B: 'oposto', C: 'exagero' } }
  ]);

  deep('S4', `<h4>Aprofundamento: desigualdade, cidadania e movimentos sociais</h4>
<ul>
<li><strong>Cidadania</strong> (T. H. Marshall): direitos civis (liberdades individuais), políticos (votar e ser votado) e sociais (educação, saúde, trabalho). No Brasil, os direitos sociais muitas vezes vieram antes dos políticos (era Vargas), em ordem diferente da inglesa.</li>
<li><strong>Movimentos sociais:</strong> feminista, negro, indígena, quilombola, LGBTQIA+, sem-terra. Lutam por reconhecimento e por redistribuição.</li>
<li><strong>Ações afirmativas</strong> ("discriminação positiva"): políticas que tratam desigualmente os desiguais para reduzir a desigualdade (cotas, delegacias especializadas de atendimento à mulher, Lei Maria da Penha, titulação de terras quilombolas, prevista na Constituição de 1988).</li>
<li><strong>Interseccionalidade:</strong> gênero, raça, classe e outras opressões se cruzam; uma mulher negra pobre enfrenta discriminações combinadas.</li>
<li><strong>Racismo estrutural:</strong> o racismo não é só atitude individual; está nas instituições e nas relações sociais.</li>
<li><strong>Utopia</strong> (Bauman): imaginar que o mundo pode ser diferente aponta alternativas possíveis e mobiliza a ação.</li>
</ul>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 81)}: Saffioti e a "discriminação positiva de mulheres" pelo Estado. A resposta: <strong>criação de delegacia especializada</strong>. Foi um dos seus erros: você marcou A (ampliação do sufrágio universal), que é direito igual para todos, e não discriminação positiva.</li>
<li>${cite('25d1', 62)}: Bauman e a utopia. A resposta: <strong>apontar alternativas possíveis</strong>.</li>
<li>${cite('24d1', 52)}: o Black Lives Matter. A resposta: <strong>integrar a diversidade do grupo identitário</strong>.</li>
<li>${cite('24d1', 69)}: Mary Wollstonecraft, no século XVIII. A resposta: <strong>valorização do papel social</strong> das mulheres.</li>
<li>${cite('24d1', 81)}: comunidades quilombolas e a Constituição de 1988. A resposta: <strong>políticas de inserção social</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Quando o texto fala em <strong>discriminação positiva, equidade ou reparação</strong>, a resposta é uma política <strong>focalizada</strong> num grupo (delegacia da mulher, cotas, titulação quilombola), e não uma medida universal.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Medida universal × ação afirmativa: sufrágio universal e redução da jornada valem para todos; a ação afirmativa é <strong>dirigida</strong> a quem sofre a desigualdade. E as alternativas com sinal invertido ("extinção do crime de feminicídio", "redução da licença-maternidade") contrariam o texto.</p></div>`, [
    { base: ['Uma universidade pública reserva parte de suas vagas para estudantes de escolas públicas e para pretos, pardos e indígenas, considerando a sub-representação histórica desses grupos no ensino superior.'], src: 'Texto escrito para esta apostila.', cmd: 'A medida descrita é um exemplo de',
      alts: ['política universal, igual para todos os candidatos.', 'privatização do ensino superior.', 'meritocracia sem correção de desigualdades.', 'ação afirmativa, que trata de forma diferente os desiguais para promover equidade.', 'segregação racial institucionalizada.'], ans: 'D', hab: 'H11, H25', dif: 'fácil',
      ex: { D: 'reservar vagas a grupos sub-representados para corrigir desigualdade histórica é ação afirmativa.', A: 'a medida é focalizada, não universal. Termo oposto.', B: 'a universidade continua pública.', C: 'a medida corrige desigualdades.', E: 'a política inclui, não separa. Termo oposto.' }, traps: { A: 'oposto', E: 'oposto' } },
    { base: ['Uma trabalhadora doméstica negra relata que, no mesmo dia, foi seguida por um segurança numa loja, recebeu menos que um colega homem pelo mesmo serviço e teve o pedido de crédito negado no banco.'], src: 'Depoimento escrito para esta apostila.', cmd: 'O relato pode ser compreendido pelo conceito de interseccionalidade porque mostra',
      alts: ['que a discriminação depende apenas da renda.', 'a ausência de desigualdades no mercado de trabalho.', 'o cruzamento de discriminações de raça, gênero e classe na mesma pessoa.', 'que o racismo se limita a atitudes isoladas.', 'a igualdade de tratamento entre homens e mulheres.'], ans: 'C', hab: 'H11', dif: 'média',
      ex: { C: 'vigilância racista, salário menor por ser mulher e crédito negado: raça, gênero e classe se combinam.', A: 'o relato mostra mais de um fator.', B: 'o relato mostra desigualdades.', D: 'há várias situações e instituições envolvidas.', E: 'ela recebeu menos que o colega.' }, traps: { A: 'exagero' } },
    { base: ['"Uma cidade sem carros nas ruas centrais parecia sonho. Mas foi esse sonho que reuniu moradores, que pressionaram vereadores, que mudaram a lei."'], src: 'Texto escrito para esta apostila.', cmd: 'Na perspectiva de Zygmunt Bauman, o "sonho" descrito cumpre a função da utopia de',
      alts: ['legitimar o passado como modelo ideal.', 'impedir qualquer transformação social.', 'garantir soluções definitivas e conclusivas.', 'apagar os conflitos entre os moradores.', 'apontar alternativas possíveis e mobilizar a ação coletiva.'], ans: 'E', hab: 'H24', dif: 'média',
      ex: { E: 'imaginar a cidade diferente mobilizou moradores e mudou a lei: a utopia aponta caminhos e move a ação.', A: 'o sonho olha para o futuro.', B: 'ele provocou mudança. Termo oposto.', C: 'a utopia não oferece soluções definitivas.', D: 'houve pressão política, não fim de conflitos.' }, traps: { B: 'oposto', C: 'exagero' } }
  ]);

  deep('S5', `<h4>Aprofundamento: instituições, espaço público e vida nas cidades</h4>
<ul>
<li><strong>Instituições sociais</strong> (família, escola, Estado, religião, mercado) e <strong>socialização</strong>: primária (família) e secundária (escola, trabalho, mídia). O <strong>controle social</strong> pode ser formal (leis, polícia) ou informal (olhares, costumes).</li>
<li><strong>Espaço público:</strong> não é lugar de consenso pronto, mas de debate, conflito e visibilidade das oposições; por isso é condição da <strong>democracia</strong>.</li>
<li><strong>Vida urbana:</strong> Simmel e a "atitude blasé" (indiferença como defesa diante do excesso de estímulos da metrópole); Bauman e a <strong>modernidade líquida</strong> (vínculos frágeis, pressa, relações provisórias).</li>
<li><strong>Direito à cidade</strong> (Henri Lefebvre): todos devem poder usar, transformar e decidir sobre o espaço urbano; contra a segregação socioespacial.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Dois amigos se cruzam no sinal fechado: "Quanto tempo! Precisamos nos ver, pra semana, prometo". O sinal abre e a conversa acaba. A cena resume a vida urbana acelerada e a fragilidade dos vínculos.</p></div>
<h4>Como o Enem cobra</h4>
<ul>
<li>${cite('25d1', 51)}: "Sinal fechado", de Paulinho da Viola. A resposta: a <strong>efemeridade dos vínculos de afetividade</strong> na vida cotidiana.</li>
<li>${cite('24d1', 57)}: espaços públicos como canais de conflito e visibilidade das oposições. A resposta: a <strong>construção da democracia</strong>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Canções e crônicas sobre a cidade aparecem para cobrar a pressa, o anonimato e a fragilidade dos laços. Textos de geógrafos e sociólogos sobre praças e ruas cobram o espaço público como lugar do conflito democrático.</p></div>
<h4>Pegadinhas</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Espaço público democrático não é lugar sem conflito: é onde o conflito aparece e é negociado. Alternativas como "erradicação da violência" ou "vigilância da sociedade" desviam desse sentido.</p></div>`, [
    { base: ['Uma criança aprende em casa a cumprimentar os mais velhos; na escola, aprende a esperar a vez de falar e a cumprir horários.'], src: 'Texto escrito para esta apostila.', cmd: 'O texto descreve, respectivamente, os processos de socialização',
      alts: ['primária e secundária.', 'secundária e primária.', 'formal e informal.', 'política e econômica.', 'religiosa e militar.'], ans: 'A', hab: 'H11', dif: 'fácil',
      ex: { A: 'a família é a socialização primária; a escola, a secundária.', B: 'a ordem está invertida.', C: 'formal e informal é classificação do controle social.', D: 'não se trata de política ou economia.', E: 'não há instituições religiosas nem militares.' }, traps: { B: 'oposto', C: 'detalhe' } },
    { base: ['No metrô lotado, as pessoas evitam se olhar, usam fones de ouvido e fingem não perceber o que acontece ao redor.'], src: 'Texto escrito para esta apostila.', cmd: 'O comportamento descrito pode ser interpretado, a partir de Georg Simmel, como',
      alts: ['solidariedade mecânica típica das pequenas aldeias.', 'ação afetiva movida pela paixão.', 'luta de classes no transporte público.', 'atitude blasé, uma defesa diante do excesso de estímulos urbanos.', 'socialização primária realizada na família.'], ans: 'D', hab: 'H11', dif: 'média',
      ex: { D: 'a indiferença como proteção diante da multidão e dos estímulos é a atitude blasé de Simmel.', A: 'a cena é metropolitana, não de aldeia.', B: 'não há paixão; há indiferença.', C: 'não se discute classe.', E: 'não ocorre na família.' }, traps: { A: 'autor', C: 'autor' } },
    { base: ['Moradores de um bairro afastado do centro ocupam uma praça abandonada, organizam feiras e saraus e passam a reivindicar iluminação e transporte à prefeitura.'], src: 'Texto escrito para esta apostila.', cmd: 'A ação dos moradores se relaciona ao conceito de direito à cidade porque',
      alts: ['aceita a segregação entre centro e periferia.', 'reivindica o uso, a transformação e a participação nas decisões sobre o espaço urbano.', 'busca privatizar o espaço público.', 'transfere a responsabilidade pela praça a uma empresa.', 'rejeita qualquer relação com o poder público.'], ans: 'B', hab: 'H13', dif: 'média',
      ex: { B: 'ocupar, transformar e reivindicar serviços é exercer o direito à cidade (Lefebvre).', A: 'é o contrário: contestam a segregação.', C: 'eles revitalizam um espaço público, não o privatizam.', D: 'não há empresa.', E: 'eles reivindicam à prefeitura.' }, traps: { A: 'oposto', E: 'oposto' } }
  ]);
})(window.DATA);
