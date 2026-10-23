/* Humanas de Ouro: linha L (Linguagens, Códigos e suas Tecnologias).
   Cada módulo segue o formato dos módulos de Humanas: teoria em camadas (com quadros .box),
   resumo, questões inéditas no estilo do Enem (explicação para cada alternativa), cartões e V ou F.
   Textos-base: escritos para esta apostila ou de domínio público. Habilidades: Matriz de Referência do Enem (Inep). */
(function (D) {
  /* pos: posição final da alternativa correta. Troca de lugar com a alternativa que estava lá e
     remapeia explicações e armadilhas, para o gabarito não se concentrar numa letra. */
  function placeAnswer(q, to) {
    const K = 'ABCDE', i = K.indexOf(q.ans), j = K.indexOf(to);
    [q.alts[i], q.alts[j]] = [q.alts[j], q.alts[i]];
    const swap = o => { const r = Object.assign({}, o); delete r[q.ans]; delete r[to]; if (o[q.ans] !== undefined) r[to] = o[q.ans]; if (o[to] !== undefined) r[q.ans] = o[to]; return r; };
    q.ex = swap(q.ex || {}); q.traps = swap(q.traps || {}); q.ans = to;
  }
  function L(x) {
    x.module.vol = 'LC'; x.module.line = 'L';
    x.module.qs = x.questions.map(q => q.id);
    D.modules.push(x.module);
    x.questions.forEach(q => { if (q.pos && q.pos !== q.ans) placeAnswer(q, q.pos); delete q.pos; });
    x.questions.forEach((q, i) => { q.vol = 'LC'; q.mod = x.module.id; q.n = i + 1; q.kind = q.kind || 'fixacao'; q.tag = q.tag || 'Inédita, estilo ENEM'; q.traps = q.traps || {}; D.questions.push(q); });
    x.cards.forEach((c, i) => D.cards.push({ id: x.module.id + '-c' + i, vol: 'LC', q: c[0], a: c[1] }));
    x.vf.forEach((v, i) => D.vf.push({ id: 'vf-' + x.module.id + '-' + i, mod: x.module.id, s: v[0], v: v[1], why: v[2] }));
  }

  L({
    module: {
      id: 'L1', title: 'Como o Enem cobra Linguagens', habs: 'H1 a H30 (as 9 competências)', faixa: 'A',
      note: 'Não é um conteúdo: é o jeito de ler que vale para as 45 questões. Você fez 37/45 em 2025; os 8 erros estão ligados aos módulos L2, L4, L5, L6, L11 e L14.',
      html: `<h4>1. O que a prova mede</h4>
<p>Linguagens tem <strong>45 questões</strong> no primeiro dia: 5 de língua estrangeira (inglês ou espanhol, à sua escolha) e 40 de Português, Literatura, Artes, Educação Física e Tecnologias da Informação e Comunicação. Quase nenhuma pergunta é sobre regra decorada: a prova apresenta um <strong>texto</strong> (verbal, visual ou misto) e pede que você reconheça <strong>como</strong> ele produz sentido e <strong>para quê</strong>.</p>
<div class="box conceito"><b class="box-t">Conceito</b><p>A Matriz de Referência organiza Linguagens em <strong>9 competências e 30 habilidades (H1 a H30)</strong>. Cada questão mede uma habilidade: por exemplo, H18 (identificar os elementos que concorrem para a progressão temática e para a organização do texto) ou H13 (analisar as diversas produções artísticas como meio de explicar diferentes culturas).</p></div>
<h4>2. As 9 competências, em uma linha cada</h4>
<div class="tw"><table><thead><tr><th>Competência</th><th>Do que trata</th><th>Habilidades</th></tr></thead><tbody>
<tr><td>C1</td><td>Tecnologias da comunicação e da informação no dia a dia</td><td>H1 a H4</td></tr>
<tr><td>C2</td><td>Língua estrangeira como acesso a informações e culturas</td><td>H5 a H8</td></tr>
<tr><td>C3</td><td>Linguagem corporal (Educação Física)</td><td>H9 a H11</td></tr>
<tr><td>C4</td><td>Arte como saber cultural e estético</td><td>H12 a H14</td></tr>
<tr><td>C5</td><td>Recursos expressivos e relação texto–contexto (inclui Literatura)</td><td>H15 a H17</td></tr>
<tr><td>C6</td><td>Sistemas simbólicos das linguagens; organização do texto</td><td>H18 a H20</td></tr>
<tr><td>C7</td><td>Argumentação: confrontar opiniões e pontos de vista</td><td>H21 a H24</td></tr>
<tr><td>C8</td><td>Língua portuguesa: variação, norma e identidade</td><td>H25 a H27</td></tr>
<tr><td>C9</td><td>Impacto das tecnologias da comunicação na vida social</td><td>H28 a H30</td></tr>
</tbody></table></div>
<h4>3. O método de leitura em cinco passos</h4>
<ol>
<li><strong>Leia o comando antes do texto.</strong> Ele diz o que procurar: <em>finalidade</em>, <em>efeito de sentido</em>, <em>estratégia</em>, <em>recurso</em>, <em>característica do gênero</em>, <em>função da linguagem</em>.</li>
<li><strong>Leia a referência.</strong> Autor, veículo e data indicam o gênero (crônica de jornal, post, campanha, poema) e o contexto.</li>
<li><strong>Leia o texto procurando a resposta ao comando</strong>, e não um resumo do texto.</li>
<li><strong>Preveja a resposta com as suas palavras</strong> antes de olhar as alternativas.</li>
<li><strong>Elimine</strong> com os filtros do quadro abaixo e confira a escolhida contra uma frase do texto.</li>
</ol>
<div class="box enem"><b class="box-t">No Enem</b><p>Os comandos mais frequentes em Linguagens: "o texto tem por finalidade", "o efeito de sentido decorre", "a estratégia utilizada para", "o recurso que caracteriza o gênero", "a função da linguagem predominante". Em quase todos, a resposta é <strong>o que o texto faz</strong>, não o que ele diz.</p></div>
<h4>4. Os quatro distratores que mais derrubam</h4>
<ul>
<li><strong>Verdade que não responde:</strong> a alternativa descreve algo que está no texto, mas não é o que o comando pede (pede a <em>estratégia</em> e a alternativa dá o <em>tema</em>).</li>
<li><strong>Extrapolação:</strong> vai além do que o texto autoriza ("a autora defende a proibição...", quando ela só ironiza).</li>
<li><strong>Termo oposto:</strong> troca o sentido (crítica vira elogio; ironia vira literalidade).</li>
<li><strong>Recorte errado:</strong> o fato está certo, mas a relação está errada (o pronome "isso" retoma algo anterior, e a alternativa diz posterior).</li>
</ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Alternativa que <strong>cita uma palavra do texto</strong> parece certa por reconhecimento visual. Desconfie: o Enem usa as palavras do texto justamente nos distratores. Confira a <strong>relação</strong> que a alternativa afirma, não as palavras que ela repete.</p></div>
<h4>5. Tempo e ordem</h4>
<p>No primeiro dia são 5h30 para 90 questões e a redação. Uma divisão realista: cerca de <strong>1h10 para a redação</strong> (incluindo o rascunho), cerca de <strong>2 minutos e meio por questão</strong> de Linguagens e o restante para Humanas. Questão que travar: marque, siga e volte no fim.</p>
<div class="box conexao"><b class="box-t">Conexão</b><p>O mesmo método serve para Humanas (texto-base + comando + eliminação). Os erros de leitura que você corrige aqui valem pontos nas duas áreas.</p></div>`,
      resumo: [
        ['Formato', '45 questões: 5 de língua estrangeira + 40 de Português, Literatura, Artes, Ed. Física e TICs'],
        ['Matriz', '9 competências, 30 habilidades (H1 a H30)'],
        ['Passo 1', 'Ler o comando antes do texto'],
        ['Passo 4', 'Prever a resposta antes de ler as alternativas'],
        ['Verdade que não responde', 'Está no texto, mas não é o que o comando pede'],
        ['Extrapolação', 'Afirma mais do que o texto autoriza'],
        ['Recorte errado', 'Fato certo, relação errada (anterior × posterior, causa × consequência)'],
        ['Tempo', 'Cerca de 2,5 min por questão de Linguagens; redação com cerca de 1h10']
      ]
    },
    questions: [
      {
        id: 'L1.1', base: ['<em>Campanha de uma biblioteca municipal, publicada em rede social:</em>', '"Você não precisa de assinatura para ler o mês inteiro. Precisa de um cartão — e ele é de graça. Venha fazer o seu."'],
        src: 'Texto escrito para esta apostila.', cmd: 'Nesse texto, a estratégia utilizada para convencer o leitor consiste em',
        alts: ['enumerar as obras disponíveis no acervo da biblioteca.', 'contrapor um hábito pago a uma alternativa gratuita oferecida pelo serviço.', 'criticar as empresas de assinatura digital de livros.', 'relatar a história da criação da biblioteca municipal.', 'apresentar dados estatísticos sobre o hábito de leitura.'],
        ans: 'B', pos: 'D', hab: 'H21', dif: 'fácil',
        ex: { B: 'o texto opõe "assinatura" (pago) a "cartão de graça" para levar o leitor à biblioteca: é a estratégia.', A: 'não há lista de obras no texto.', C: 'não há crítica explícita às empresas; a assinatura é só o contraponto. Extrapolação.', D: 'não há relato histórico.', E: 'não há números no texto.' },
        traps: { C: 'exagero' }
      },
      {
        id: 'L1.2', base: ['"Pausa para o café: 15 minutos sem notificações. Seu cérebro agradece."', '<em>Aviso afixado na copa de uma empresa.</em>'],
        src: 'Texto escrito para esta apostila.', cmd: 'A finalidade desse aviso é',
        alts: ['informar o horário de funcionamento da copa.', 'proibir o uso de celulares dentro da empresa.', 'estimular uma pausa breve e desconectada durante o trabalho.', 'divulgar uma pesquisa científica sobre o cérebro.', 'reclamar do excesso de trabalho dos funcionários.'],
        ans: 'C', hab: 'H18', dif: 'fácil',
        ex: { C: 'o aviso convida a uma pausa curta sem notificações e justifica com o benefício ("seu cérebro agradece").', A: 'não há horário de funcionamento.', B: 'não proíbe nada; sugere 15 minutos sem notificações. Exagero.', D: 'a menção ao cérebro é um apelo, não a divulgação de pesquisa.', E: 'não há reclamação.' },
        traps: { B: 'exagero' }
      },
      {
        id: 'L1.3', base: ['"Erro de português"', 'Quando o português chegou<br>Debaixo duma bruta chuva<br>Vestiu o índio<br>Que pena!<br>Fosse uma manhã de sol<br>O índio tinha despido<br>O português.'],
        src: 'ANDRADE, O. Poesias reunidas. Obra em domínio público.', cmd: 'Ao imaginar outra versão para a chegada dos portugueses, o poema',
        alts: ['celebra a colonização como encontro harmonioso entre culturas.', 'ironiza a imposição cultural europeia sobre os povos indígenas.', 'descreve com objetividade o clima no dia do descobrimento.', 'lamenta que os indígenas tenham abandonado suas roupas.', 'defende o ensino da língua portuguesa aos povos originários.'],
        ans: 'B', pos: 'E', hab: 'H16', dif: 'média',
        ex: { B: 'o título faz trocadilho com "erro" e o poema inverte os papéis: com sol, o indígena teria "despido" o português. É ironia contra a imposição cultural.', A: 'o poema critica, não celebra. Termo oposto.', C: 'a chuva é recurso para a ironia, não descrição objetiva.', D: 'quem é vestido é o indígena; a leitura inverte o poema.', E: 'não há defesa de ensino; "erro de português" é trocadilho.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L1.4', base: ['Em uma questão, o comando pede "o efeito de sentido produzido pela repetição da palavra <em>nunca</em>" em um poema.'],
        src: 'Situação escrita para esta apostila.', cmd: 'Para responder a esse comando, o estudante deve procurar, no texto,',
        alts: ['o significado da palavra "nunca" no dicionário.', 'a biografia do autor do poema.', 'o que a repetição provoca no leitor ou no sentido do poema, como ênfase ou angústia.', 'o número exato de vezes em que a palavra aparece.', 'a escola literária a que o poema pertence.'],
        ans: 'C', pos: 'A', hab: 'H17', dif: 'fácil',
        ex: { C: '"efeito de sentido" pede o que o recurso produz (ênfase, insistência, angústia), não o recurso em si.', A: 'o sentido de dicionário não explica o efeito no texto.', B: 'a biografia não responde ao comando.', D: 'contar ocorrências descreve o recurso, mas não o efeito.', E: 'a escola literária é outra pergunta.' },
        traps: { D: 'detalhe' }
      },
      {
        id: 'L1.5', base: ['<em>Post em rede social:</em>', '"Hoje aprendi que \'deixar para depois\' é o jeito mais eficiente de não fazer. #segundafeira"'],
        src: 'Texto escrito para esta apostila.', cmd: 'O humor do post decorre principalmente da',
        alts: ['descrição técnica de um método de produtividade.', 'contradição entre a palavra "eficiente" e o resultado de não fazer nada.', 'crítica direta às pessoas que trabalham às segundas-feiras.', 'informação sobre o calendário semanal.', 'linguagem formal típica de documentos oficiais.'],
        ans: 'B', hab: 'H17', dif: 'média',
        ex: { B: '"eficiente" costuma ser elogio a quem produz; aplicado a "não fazer", gera ironia e humor.', A: 'não há método descrito; a "eficiência" é irônica.', C: 'a hashtag situa o dia, não critica pessoas.', D: 'a referência à segunda-feira é contextual, não informativa.', E: 'a linguagem é informal (post, hashtag).' },
        traps: { A: 'oposto' }
      }
    ],
    cards: [
      ['Quantas questões tem Linguagens?', '45: 5 de língua estrangeira + 40 de Português e demais áreas'],
      ['Quantas competências e habilidades tem a matriz de Linguagens?', '9 competências, 30 habilidades (H1 a H30)'],
      ['"Efeito de sentido" pede o quê?', 'O que o recurso provoca (ênfase, ironia, humor), não o recurso em si'],
      ['Distrator "verdade que não responde"', 'Está no texto, mas não é o que o comando pede'],
      ['Primeiro passo do método', 'Ler o comando antes do texto'],
      ['Por que ler a referência do texto?', 'Ela indica gênero, veículo, época e contexto']
    ],
    vf: [
      ['Em Linguagens, a maioria das questões cobra regras gramaticais decoradas.', false, 'A prova cobra leitura: como o texto produz sentido e com que finalidade.'],
      ['Uma alternativa que repete palavras do texto tende a ser a correta.', false, 'O Enem usa palavras do texto justamente nos distratores; confira a relação afirmada.'],
      ['Prever a resposta antes de ler as alternativas reduz a chance de cair em distratores.', true, 'Você chega às alternativas com um critério próprio, e não se deixa levar pela primeira que parece boa.'],
      ['A competência 4 da matriz de Linguagens trata da arte como saber cultural e estético.', true, 'C4 corresponde às habilidades H12 a H14.']
    ]
  });

  L({
    module: {
      id: 'L2', title: 'Gêneros e tipos textuais', habs: 'H15, H18, H20, H21, H22', faixa: 'A',
      note: 'Seu erro de 2025 está aqui: na questão 7 você marcou "interlocução direta com o leitor" para caracterizar a crônica, um recurso que muitos gêneros usam; o traço da crônica era o fato cotidiano visto de forma reflexiva.',
      html: `<h4>1. Tipo não é gênero</h4>
<p><strong>Tipo textual</strong> é o modo de organizar a linguagem; são poucos e se repetem em qualquer texto. <strong>Gênero textual</strong> é a forma social, reconhecível, em que o texto circula; são incontáveis e nascem das práticas sociais (uma receita, um meme, uma crônica).</p>
<div class="tw"><table><thead><tr><th>Tipo</th><th>O que faz</th><th>Marcas típicas</th></tr></thead><tbody>
<tr><td>Narração</td><td>Conta fatos em sequência, com personagens</td><td>Verbos de ação no pretérito, marcadores de tempo ("depois", "então")</td></tr>
<tr><td>Descrição</td><td>Caracteriza seres, lugares, objetos</td><td>Adjetivos, verbos de estado, enumeração</td></tr>
<tr><td>Exposição</td><td>Explica um assunto, informa</td><td>Presente atemporal, definições, exemplos</td></tr>
<tr><td>Argumentação</td><td>Defende um ponto de vista</td><td>Tese, argumentos, conectivos de causa, oposição e conclusão</td></tr>
<tr><td>Injunção</td><td>Orienta como fazer algo</td><td>Imperativo, passos numerados</td></tr>
</tbody></table></div>
<div class="box conceito"><b class="box-t">Conceito</b><p>Um gênero quase sempre mistura tipos. Uma crônica pode narrar um episódio, descrever uma rua e terminar argumentando. O que define o gênero é a <strong>função social</strong>, o <strong>suporte</strong> e o <strong>estilo</strong>, não um único tipo.</p></div>
<h4>2. Os gêneros que o Enem mais usa</h4>
<ul>
<li><strong>Crônica:</strong> texto curto publicado em jornal, revista ou site; parte de um <strong>fato do cotidiano</strong> e o transforma em reflexão, com tom pessoal (lírico, humorístico ou crítico) e linguagem próxima da conversa.</li>
<li><strong>Notícia × reportagem:</strong> a notícia relata um fato recente de forma objetiva (o quê, quem, quando, onde, como, por quê); a reportagem aprofunda o tema, ouve fontes, traz dados e contexto.</li>
<li><strong>Artigo de opinião × editorial:</strong> os dois argumentam; o artigo é assinado e expressa a opinião do autor; o editorial expressa a opinião do próprio veículo e não é assinado por uma pessoa.</li>
<li><strong>Charge × cartum × tirinha:</strong> a charge comenta um fato atual e datado; o cartum critica um comportamento sem data; a tirinha é uma sequência curta de quadros, geralmente com humor.</li>
<li><strong>Campanha publicitária e institucional:</strong> combinam imagem e texto para levar o público a uma ação ou mudança de atitude.</li>
<li><strong>Resenha:</strong> resume e avalia uma obra (livro, filme, série).</li>
<li><strong>Infográfico:</strong> organiza informação com imagens, números e textos curtos.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Hoje a fila da padaria me ensinou mais sobre paciência do que qualquer livro de autoajuda." Fato banal (a fila), olhar pessoal ("me ensinou") e reflexão (paciência): é o movimento típico da crônica.</p></div>
<h4>3. Gêneros digitais e multimodalidade</h4>
<p>Post, meme, thread, podcast, vídeo curto e comentário são gêneros. O Enem cobra a relação entre <strong>texto verbal e não verbal</strong>: a imagem não é enfeite; ela produz sentido junto com a palavra (multimodalidade). No meme, por exemplo, o humor surge do encontro entre uma imagem conhecida e uma legenda que a aplica a outra situação.</p>
<h4>4. Intertextualidade</h4>
<ul>
<li><strong>Paródia:</strong> retoma um texto conhecido para subvertê-lo, muitas vezes com humor ou crítica.</li>
<li><strong>Paráfrase:</strong> retoma o sentido do original com outras palavras, sem subverter.</li>
<li><strong>Citação e alusão:</strong> a citação reproduz o trecho; a alusão apenas o sugere.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>O comando "o elemento que caracteriza esse texto como [gênero]" pede o <strong>traço definidor</strong> do gênero, não um recurso que aparece nele. Na crônica, o traço é o fato cotidiano tratado com olhar pessoal e reflexivo. Interlocução com o leitor, humor e primeira pessoa podem aparecer, mas não definem o gênero.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>"Apresentação de acontecimentos segundo a ordem de sucessão no tempo" descreve a <strong>narração</strong> (um tipo), não a crônica (um gênero). E "defesa de opiniões sobre tema coletivo" descreve o artigo de opinião. As duas costumam aparecer como distratores em questões sobre crônica.</p></div>`,
      resumo: [
        ['Tipo textual', 'Modo de organizar a linguagem: narração, descrição, exposição, argumentação, injunção'],
        ['Gênero textual', 'Forma social em que o texto circula: crônica, notícia, meme, receita...'],
        ['Crônica', 'Fato do cotidiano + olhar pessoal e reflexivo; jornal, revista ou site'],
        ['Notícia × reportagem', 'Relato objetivo do fato × aprofundamento com fontes e dados'],
        ['Artigo × editorial', 'Opinião assinada do autor × opinião do veículo'],
        ['Charge × cartum', 'Fato atual e datado × comportamento sem data'],
        ['Paródia × paráfrase', 'Subverte o original × reafirma o sentido com outras palavras'],
        ['Multimodalidade', 'Imagem e texto produzem sentido juntos']
      ]
    },
    questions: [
      {
        id: 'L2.1', base: ['Toda manhã, o porteiro do meu prédio cumprimenta as plantas do jardim antes de cumprimentar os moradores. Primeiro achei graça. Depois entendi: ele começa o dia por quem não reclama. Desde então, também tenho dito bom-dia ao vaso da sala. Ele nunca respondeu, mas o meu humor mudou.'],
        src: 'Texto escrito para esta apostila.', cmd: 'O elemento que caracteriza esse texto como uma crônica é a',
        alts: ['defesa de uma tese sobre o cuidado com plantas.', 'exposição de informações científicas sobre jardinagem.', 'abordagem de um fato cotidiano com olhar pessoal e reflexivo.', 'interlocução direta com o leitor por meio de perguntas.', 'descrição objetiva das funções de um porteiro.'],
        ans: 'C', pos: 'E', hab: 'H20', dif: 'fácil',
        ex: { C: 'um hábito banal do porteiro vira reflexão pessoal ("ele começa o dia por quem não reclama"): é o traço definidor da crônica.', A: 'não há tese defendida com argumentos.', B: 'não há informação científica.', D: 'o texto não faz perguntas ao leitor; e mesmo que fizesse, isso não definiria o gênero.', E: 'a descrição é subjetiva e serve à reflexão.' },
        traps: { D: 'detalhe' }
      },
      {
        id: 'L2.2', base: ['"Com 31,8% dos votos, a candidata venceu o primeiro turno na capital, segundo o tribunal eleitoral. O segundo turno será no dia 27."'],
        src: 'Texto escrito para esta apostila.', cmd: 'As características desse trecho permitem classificá-lo como',
        alts: ['artigo de opinião, por apresentar a posição do autor sobre a eleição.', 'notícia, por relatar de forma objetiva um fato recente com fonte e dados.', 'crônica, por partir de um fato cotidiano para uma reflexão pessoal.', 'editorial, por expressar a opinião do jornal sobre a candidata.', 'resenha, por avaliar o desempenho da candidata.'],
        ans: 'B', pos: 'D', hab: 'H20', dif: 'fácil',
        ex: { B: 'fato recente, número, fonte ("segundo o tribunal") e linguagem objetiva: notícia.', A: 'não há opinião do autor.', C: 'não há reflexão pessoal.', D: 'não há posição do veículo.', E: 'não há avaliação de uma obra.' }
      },
      {
        id: 'L2.3', base: ['<em>Charge:</em> numa cidade alagada, um homem rema um barco diante de uma placa onde se lê "Obra concluída: piscinão municipal — inaugurado ontem".'],
        src: 'Descrição de charge criada para esta apostila.', cmd: 'O efeito crítico da charge resulta da',
        alts: ['informação técnica sobre o funcionamento do piscinão.', 'contradição entre o anúncio da obra concluída e a cidade alagada.', 'homenagem aos trabalhadores que construíram a obra.', 'descrição realista de um passeio de barco.', 'defesa da construção de mais obras de drenagem.'],
        ans: 'B', hab: 'H22', dif: 'média',
        ex: { B: 'a placa anuncia a solução, mas a imagem mostra o problema: a ironia nasce da contradição entre texto e imagem.', A: 'não há informação técnica.', C: 'a charge critica, não homenageia. Termo oposto.', D: 'o barco não é passeio; é consequência do alagamento.', E: 'a charge expõe a falha, mas não defende uma proposta; isso extrapola o texto.' },
        traps: { C: 'oposto', E: 'exagero' }
      },
      {
        id: 'L2.4', base: ['<strong>Texto I</strong>: "Minha terra tem palmeiras, / Onde canta o Sabiá; / As aves, que aqui gorjeiam, / Não gorjeiam como lá." (Gonçalves Dias, "Canção do exílio", 1843)', '<strong>Texto II</strong>: "Minha terra tem shoppings, / Onde canta o celular; / As vitrines, que aqui brilham, / Não me deixam respirar."'],
        src: 'Texto I: DIAS, G. Primeiros cantos. Domínio público. Texto II: escrito para esta apostila.', cmd: 'Em relação ao Texto I, o Texto II constitui uma',
        alts: ['paráfrase, porque reafirma com outras palavras o sentido de saudade da pátria.', 'paródia, porque retoma a estrutura do poema para criticar o consumo urbano.', 'citação, porque reproduz literalmente os versos do poema original.', 'resenha, porque avalia a qualidade do poema de Gonçalves Dias.', 'tradução, porque transpõe o poema para outra língua.'],
        ans: 'B', pos: 'A', hab: 'H16', dif: 'média',
        ex: { B: 'mantém o ritmo e a estrutura ("Minha terra tem...") mas troca a exaltação da natureza por crítica ao consumo: paródia.', A: 'a paráfrase não subverte o sentido; aqui o sentido muda.', C: 'os versos foram alterados.', D: 'não há avaliação da obra.', E: 'não há mudança de língua.' }
      },
      {
        id: 'L2.5', base: ['"Ingredientes: 2 xícaras de farinha, 3 ovos, 1 xícara de leite. Modo de preparo: bata os ovos, junte o leite e acrescente a farinha aos poucos."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O tipo textual predominante nesse texto é o',
        alts: ['narrativo, pois conta acontecimentos em sequência.', 'descritivo, pois caracteriza os ingredientes em detalhe.', 'injuntivo, pois orienta o leitor a executar uma tarefa.', 'argumentativo, pois defende a qualidade da receita.', 'expositivo, pois explica a origem do prato.'],
        ans: 'C', hab: 'H18', dif: 'fácil',
        ex: { C: 'verbos no imperativo ("bata", "junte", "acrescente") orientando passos: injunção.', A: 'não há personagens nem fatos narrados.', B: 'a lista de ingredientes é breve e serve à instrução.', D: 'não há defesa de ponto de vista.', E: 'não há explicação de origem.' }
      }
    ],
    cards: [
      ['Tipo × gênero textual', 'Modo de organizar a linguagem × forma social em que o texto circula'],
      ['Traço definidor da crônica', 'Fato cotidiano tratado com olhar pessoal e reflexivo'],
      ['Notícia × reportagem', 'Relato objetivo do fato × aprofundamento com fontes e contexto'],
      ['Artigo de opinião × editorial', 'Assinado, opinião do autor × opinião do veículo'],
      ['Paródia', 'Retoma um texto para subvertê-lo (humor ou crítica)'],
      ['Charge × cartum', 'Fato atual e datado × comportamento sem data']
    ],
    vf: [
      ['A crônica se define pela presença de interlocução direta com o leitor.', false, 'Interlocução aparece em muitos gêneros; o traço da crônica é o fato cotidiano visto de forma pessoal e reflexiva.'],
      ['Um mesmo gênero pode combinar narração, descrição e argumentação.', true, 'Gêneros misturam tipos; o que define o gênero é a função social, o suporte e o estilo.'],
      ['O editorial expressa a opinião do veículo, e não a de um autor individual.', true, 'É a voz institucional do jornal ou revista.'],
      ['A paráfrase subverte o texto original para criticá-lo.', false, 'Quem subverte é a paródia; a paráfrase reafirma o sentido com outras palavras.']
    ]
  });

  L({
    module: {
      id: 'L3', title: 'Funções da linguagem', habs: 'H18, H19, H20', faixa: 'B',
      note: 'Pergunta clássica e rápida: quem sabe os seis elementos da comunicação resolve em menos de um minuto.',
      html: `<h4>1. Os seis elementos da comunicação</h4>
<p>O linguista Roman Jakobson associou cada função da linguagem a um elemento da comunicação. A função <strong>predominante</strong> é a que põe esse elemento em foco.</p>
<div class="tw"><table><thead><tr><th>Elemento em foco</th><th>Função</th><th>Marcas</th><th>Gêneros típicos</th></tr></thead><tbody>
<tr><td>Referente (o assunto)</td><td><strong>Referencial</strong> (denotativa)</td><td>3ª pessoa, objetividade, dados</td><td>Notícia, verbete, texto didático</td></tr>
<tr><td>Emissor</td><td><strong>Emotiva</strong> (expressiva)</td><td>1ª pessoa, sentimentos, exclamações</td><td>Diário, depoimento, poema lírico</td></tr>
<tr><td>Receptor</td><td><strong>Conativa</strong> (apelativa)</td><td>2ª pessoa, "você", imperativo, vocativo</td><td>Propaganda, campanha, discurso político</td></tr>
<tr><td>Canal</td><td><strong>Fática</strong></td><td>Testar ou manter o contato: "alô", "né?", "tá me ouvindo?"</td><td>Conversa, saudações</td></tr>
<tr><td>Código</td><td><strong>Metalinguística</strong></td><td>A linguagem falando de si mesma</td><td>Dicionário, gramática, poema sobre poesia, filme sobre cinema</td></tr>
<tr><td>Mensagem</td><td><strong>Poética</strong></td><td>Trabalho com a forma: ritmo, rima, sonoridade, figuras</td><td>Poema, slogan, letra de música</td></tr>
</tbody></table></div>
<h4>2. Predominância, não exclusividade</h4>
<p>Um texto quase nunca tem uma só função. Uma propaganda com rima tem função poética, mas, se o objetivo é levar você a comprar, a função <strong>predominante</strong> é a conativa.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Beba água. Seu corpo agradece." Imperativo e foco no leitor: conativa. "A água cobre cerca de 71% da superfície da Terra." Foco no assunto, dado objetivo: referencial.</p></div>
<h4>3. Metalinguagem além do dicionário</h4>
<p>A função metalinguística aparece sempre que o código vira tema: um poema que discute como se faz poesia, uma crônica sobre a dificuldade de escrever crônicas, uma série que mostra os bastidores de uma série, um vídeo que comenta palavras da moda.</p>
<div class="box conceito"><b class="box-t">Conceito</b><p>"Código" não é só a língua. Pode ser o cinema, a pintura, a música ou a própria escrita de um gênero. Quando um quadro retrata o ato de pintar, também há metalinguagem.</p></div>
<h4>4. Como o Enem pergunta</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>"Predomina a função..." ou "o texto se volta para...". Pergunte: <strong>o texto está centrado em quê?</strong> No assunto (referencial), em quem fala (emotiva), em quem ouve (conativa), no contato (fática), na própria linguagem (metalinguística) ou na forma da mensagem (poética)?</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Primeira pessoa não garante função emotiva. Em "Eu recomendo: vote consciente", o "eu" aparece, mas o foco é levar o leitor a agir: conativa. E poema não é sinônimo de função poética predominante: um poema sobre como escrever poemas é metalinguístico.</p></div>`,
      resumo: [
        ['Referencial', 'Foco no assunto; objetividade, dados'],
        ['Emotiva', 'Foco no emissor; sentimentos, 1ª pessoa'],
        ['Conativa', 'Foco no receptor; imperativo, "você"'],
        ['Fática', 'Foco no canal; testar ou manter o contato'],
        ['Metalinguística', 'Foco no código; a linguagem falando de si'],
        ['Poética', 'Foco na mensagem; ritmo, rima, figuras'],
        ['Predominância', 'Vários elementos convivem; vale o que está em foco']
      ]
    },
    questions: [
      {
        id: 'L3.1', base: ['"Vacinar é proteger quem você ama. Procure a unidade de saúde mais próxima."'],
        src: 'Texto escrito para esta apostila.', cmd: 'A função da linguagem predominante nesse texto é a',
        alts: ['referencial, pois apresenta dados objetivos sobre vacinas.', 'emotiva, pois expressa os sentimentos do autor.', 'conativa, pois procura levar o leitor a uma ação.', 'fática, pois testa o canal de comunicação.', 'metalinguística, pois explica o significado da palavra "vacinar".'],
        ans: 'C', pos: 'E', hab: 'H19', dif: 'fácil',
        ex: { C: '"você" e imperativo ("procure"): o texto quer que o leitor aja. Conativa.', A: 'não há dados.', B: 'não há expressão de sentimento do emissor.', D: 'não há teste de contato.', E: 'não há explicação do código.' }
      },
      {
        id: 'L3.2', base: ['Escrever um poema é catar palavras no chão da tarde,<br>soprar a poeira de cada uma<br>e ver se ainda acendem.'],
        src: 'Texto escrito para esta apostila.', cmd: 'Nesses versos, predomina a função',
        alts: ['metalinguística, porque o poema trata do próprio fazer poético.', 'referencial, porque descreve objetivamente uma tarde.', 'conativa, porque convence o leitor a escrever poemas.', 'fática, porque mantém o contato com o leitor.', 'emotiva, porque relata um sofrimento do poeta.'],
        ans: 'A', hab: 'H18', dif: 'média',
        ex: { A: 'o tema é como se escreve um poema: o código (a poesia) fala de si mesmo.', B: 'a tarde é imagem metafórica, não descrição objetiva.', C: 'não há apelo ao leitor.', D: 'não há marca de contato.', E: 'não há relato de sofrimento.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'L3.3', base: ['— Alô? Alô? Tá me ouvindo? A ligação tá cortando...'],
        src: 'Texto escrito para esta apostila.', cmd: 'A fala acima exemplifica a função',
        alts: ['poética', 'fática', 'referencial', 'emotiva', 'metalinguística'],
        ans: 'B', pos: 'D', hab: 'H19', dif: 'fácil',
        ex: { B: 'a fala testa o canal ("tá me ouvindo?"): função fática.', A: 'não há trabalho com a forma da mensagem.', C: 'não há informação sobre um assunto.', D: 'não há expressão de sentimento como foco.', E: 'não se fala do código.' }
      },
      {
        id: 'L3.4', base: ['"Saudade: s.f. Lembrança nostálgica e, ao mesmo tempo, suave, de pessoas ou coisas distantes ou extintas."'],
        src: 'Verbete escrito para esta apostila.', cmd: 'O verbete exemplifica a função metalinguística porque',
        alts: ['expressa a saudade sentida pelo autor.', 'convence o leitor a sentir saudade.', 'usa a língua para explicar uma palavra da própria língua.', 'apresenta rimas e ritmo marcados.', 'mantém o contato com o leitor.'],
        ans: 'C', hab: 'H18', dif: 'fácil',
        ex: { C: 'o verbete define uma palavra usando a língua: o código explica o código.', A: 'o verbete é impessoal.', B: 'não há apelo.', D: 'não há rima nem ritmo trabalhados.', E: 'não há marca fática.' }
      },
      {
        id: 'L3.5', base: ['"Não deixe para amanhã: quem lê agora, voa agora."', '<em>Slogan de uma campanha de leitura.</em>'],
        src: 'Texto escrito para esta apostila.', cmd: 'Além da função conativa, o slogan explora a função poética, perceptível',
        alts: ['na definição técnica do verbo "ler".', 'no paralelismo sonoro de "lê agora, voa agora".', 'na apresentação de dados sobre leitura no país.', 'no relato pessoal de um leitor.', 'na referência ao canal de divulgação da campanha.'],
        ans: 'B', pos: 'E', hab: 'H18', dif: 'média',
        ex: { B: 'a repetição da estrutura e do som ("agora... agora") trabalha a forma da mensagem: função poética.', A: 'não há definição.', C: 'não há dados.', D: 'não há relato.', E: 'não há referência ao canal.' }
      }
    ],
    cards: [
      ['Função referencial', 'Foco no assunto: objetividade e informação'],
      ['Função emotiva', 'Foco no emissor: sentimentos, 1ª pessoa'],
      ['Função conativa', 'Foco no receptor: imperativo, "você", apelo'],
      ['Função fática', 'Foco no canal: "alô", "tá me ouvindo?"'],
      ['Função metalinguística', 'Foco no código: a linguagem falando de si'],
      ['Função poética', 'Foco na mensagem: ritmo, rima, sonoridade, figuras']
    ],
    vf: [
      ['Todo texto em primeira pessoa tem função emotiva predominante.', false, 'O "eu" pode estar a serviço de um apelo ao leitor (conativa) ou de uma informação.'],
      ['Um filme que mostra os bastidores de uma filmagem é exemplo de metalinguagem.', true, 'O código (o cinema) se volta para si mesmo.'],
      ['Um slogan pode ter função poética e conativa ao mesmo tempo.', true, 'As funções convivem; costuma predominar a conativa, com a poética reforçando.'],
      ['A função fática está centrada na mensagem.', false, 'A fática está centrada no canal; a centrada na mensagem é a poética.']
    ]
  });

  L({
    module: {
      id: 'L4', title: 'Variação linguística e preconceito linguístico', habs: 'H25, H26, H27', faixa: 'A',
      note: 'Seu erro de 2025 está aqui: na questão 36, a repetição de "daí" era uma estratégia típica da língua oral; você marcou "adequação ao interlocutor".',
      html: `<h4>1. Toda língua varia</h4>
<p>Não existe uma língua portuguesa única e homogênea: ela muda no tempo, no espaço, entre grupos sociais e conforme a situação. O Enem trata a variação como <strong>fato</strong> da língua, não como erro.</p>
<div class="tw"><table><thead><tr><th>Variação</th><th>Depende de</th><th>Exemplo</th></tr></thead><tbody>
<tr><td><strong>Histórica</strong> (diacrônica)</td><td>Tempo</td><td>"Vossa mercê" → "vosmecê" → "você"</td></tr>
<tr><td><strong>Regional</strong> (diatópica)</td><td>Lugar</td><td>Mandioca, aipim, macaxeira</td></tr>
<tr><td><strong>Social</strong> (diastrática)</td><td>Grupo social, idade, profissão</td><td>Gírias, jargões técnicos</td></tr>
<tr><td><strong>Situacional</strong> (diafásica)</td><td>Grau de formalidade da situação</td><td>"E aí, beleza?" × "Bom dia, como vai?"</td></tr>
<tr><td>Fala × escrita</td><td>Modalidade</td><td>Repetições e marcadores na fala; planejamento na escrita</td></tr>
</tbody></table></div>
<h4>2. Norma-padrão, norma culta e adequação</h4>
<ul>
<li><strong>Norma-padrão:</strong> modelo idealizado descrito nas gramáticas normativas.</li>
<li><strong>Norma culta:</strong> o uso real de falantes escolarizados em situações monitoradas; não coincide totalmente com a norma-padrão.</li>
<li><strong>Adequação:</strong> em vez de "certo" e "errado", o Enem fala em uso <strong>adequado ou inadequado à situação</strong>. Uma gíria é adequada numa conversa entre amigos e inadequada numa entrevista de emprego.</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Preconceito linguístico</strong> é julgar pessoas pela variedade que falam, tratando variedades populares ou regionais como "erradas" ou "feias". O tema é recorrente no Enem, que costuma valorizar a diversidade linguística como parte da identidade.</p></div>
<h4>3. Marcas da oralidade</h4>
<p>A fala é produzida em tempo real e tem recursos próprios, que não são defeitos:</p>
<ul>
<li><strong>Marcadores conversacionais:</strong> "daí", "aí", "então", "né?", "tipo", "olha".</li>
<li><strong>Repetições</strong> e retomadas para organizar o raciocínio.</li>
<li><strong>Hesitações e pausas</strong> ("é...", "hum...").</li>
<li><strong>Frases interrompidas</strong> e reformulações.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Daí ele chegou, daí a moça perguntou, daí ele respondeu..." O "daí" amarra os episódios da narrativa oral, como "então" ou "depois". É estratégia de organização da fala, não sinal de origem regional nem de escolaridade.</p></div>
<h4>4. Como o Enem pergunta</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>Transcrições de fala (entrevistas, corpus de pesquisa) aparecem para perguntar o que revela uma marca: <strong>"uma estratégia da linguagem oral"</strong> é a resposta frequente quando há repetição de marcadores. Letras de música, falas de personagens e textos regionais aparecem para perguntar sobre identidade e preconceito.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Alternativas que ligam uma marca de oralidade à <strong>escolaridade</strong>, à <strong>origem regional</strong> ou à <strong>falta de adequação</strong> do falante costumam ser preconceituosas ou extrapolam o texto. Sem pistas explícitas, a leitura certa é a que descreve o funcionamento da fala.</p></div>`,
      resumo: [
        ['Variação histórica', 'Muda com o tempo: vossa mercê → você'],
        ['Variação regional', 'Muda com o lugar: aipim, mandioca, macaxeira'],
        ['Variação social', 'Muda com o grupo: gírias, jargões'],
        ['Variação situacional', 'Muda com a formalidade da situação'],
        ['Adequação', 'Uso adequado ou inadequado à situação, em vez de certo/errado'],
        ['Preconceito linguístico', 'Julgar pessoas pela variedade que falam'],
        ['Marcadores da fala', '"daí", "aí", "né?", "tipo": organizam a fala em tempo real']
      ]
    },
    questions: [
      {
        id: 'L4.1', base: ['<em>Transcrição de fala de um estudante contando um jogo:</em>', '"aí o time deles veio... aí o goleiro saiu errado... aí a bola bateu na trave e entrou... aí todo mundo gritou..."'],
        src: 'Transcrição escrita para esta apostila.', cmd: 'A repetição de "aí" nesse trecho revela',
        alts: ['a origem regional do falante.', 'uma estratégia da língua oral para encadear os acontecimentos.', 'a baixa escolaridade do estudante.', 'a falta de adequação ao interlocutor.', 'uma ênfase em um acontecimento específico.'],
        ans: 'B', pos: 'D', hab: 'H25', dif: 'média',
        ex: { B: '"aí" funciona como marcador que liga os episódios da narrativa oral, como "então".', A: 'o marcador é usado em todo o país; não há pista regional.', C: 'associar o marcador à escolaridade é preconceito linguístico e extrapola o texto.', D: 'nada indica inadequação; é uma conversa sobre um jogo.', E: 'a repetição se distribui por todos os episódios, sem destacar um.' },
        traps: { A: 'exagero', C: 'exagero', D: 'detalhe' }
      },
      {
        id: 'L4.2', base: ['No Nordeste, "macaxeira"; no Rio de Janeiro, "aipim"; em São Paulo, "mandioca". Os três nomes designam a mesma raiz.'],
        src: 'Texto escrito para esta apostila.', cmd: 'O fenômeno descrito é um exemplo de variação',
        alts: ['histórica', 'regional', 'situacional', 'social', 'de modalidade (fala × escrita)'],
        ans: 'B', hab: 'H25', dif: 'fácil',
        ex: { B: 'o nome muda conforme o lugar: variação regional (diatópica).', A: 'não se compara épocas.', C: 'não depende do grau de formalidade.', D: 'não depende de grupo social.', E: 'não se compara fala e escrita.' }
      },
      {
        id: 'L4.3', base: ['Num comentário em rede social, alguém escreve: "Quem fala \'nós vai\' não deveria nem votar."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O comentário manifesta',
        alts: ['uma análise científica da concordância verbal.', 'preconceito linguístico, ao associar uma variedade da língua à incapacidade política.', 'uma defesa da diversidade linguística brasileira.', 'uma variação histórica do português.', 'um uso metalinguístico neutro da linguagem.'],
        ans: 'B', pos: 'E', hab: 'H27', dif: 'fácil',
        ex: { B: 'o autor desqualifica o falante (e seu direito ao voto) por uma marca da variedade que usa: preconceito linguístico.', A: 'não há análise; há julgamento.', C: 'é o contrário. Termo oposto.', D: 'não se trata de mudança no tempo.', E: 'o comentário não é neutro.' },
        traps: { C: 'oposto' }
      },
      {
        id: 'L4.4', base: ['<em>E-mail para uma vaga de estágio:</em>', '"E aí, beleza? Vi a vaga e curti. Manda aí os detalhes!"'],
        src: 'Texto escrito para esta apostila.', cmd: 'Considerando a situação comunicativa, a linguagem do e-mail é',
        alts: ['adequada, porque toda variedade é válida em qualquer situação.', 'inadequada, porque a situação exige um registro mais formal.', 'inadequada, porque gírias são erros gramaticais.', 'adequada, porque e-mails dispensam qualquer formalidade.', 'inadequada, porque o português do Brasil não admite gírias.'],
        ans: 'B', pos: 'C', hab: 'H26', dif: 'fácil',
        ex: { B: 'gírias são legítimas, mas um contato profissional pede registro formal: é questão de adequação.', A: 'todas as variedades são válidas, mas não são igualmente adequadas a todas as situações.', C: 'gíria não é erro gramatical; o problema é a situação.', D: 'a formalidade depende do destinatário e da finalidade, não do suporte.', E: 'gírias fazem parte do português do Brasil.' },
        traps: { A: 'exagero', C: 'oposto' }
      },
      {
        id: 'L4.5', base: ['"Vossa mercê" deu origem a "vosmecê", que deu origem a "você", hoje reduzido a "cê" na fala de muitas regiões.'],
        src: 'Texto escrito para esta apostila.', cmd: 'A sequência descrita exemplifica a variação',
        alts: ['histórica, pois mostra a mudança de uma forma ao longo do tempo.', 'regional, pois cada forma pertence a um estado.', 'situacional, pois cada forma corresponde a um grau de formalidade.', 'social, pois cada forma pertence a uma classe social.', 'gráfica, pois trata apenas da ortografia.'],
        ans: 'A', hab: 'H25', dif: 'fácil',
        ex: { A: 'a mesma forma de tratamento se transforma através dos séculos: variação histórica (diacrônica).', B: 'o texto descreve uma evolução no tempo, não uma distribuição por estados.', C: 'embora "cê" seja informal, o foco do texto é a mudança no tempo.', D: 'não há relação com classes sociais.', E: 'a mudança é na língua falada, não só na grafia.' },
        traps: { C: 'detalhe' }
      }
    ],
    cards: [
      ['Variação diacrônica', 'Histórica: muda com o tempo'],
      ['Variação diatópica', 'Regional: muda com o lugar'],
      ['Variação diastrática', 'Social: muda com o grupo'],
      ['Variação diafásica', 'Situacional: muda com a formalidade'],
      ['"Daí" repetido numa fala revela...', 'Estratégia da língua oral para encadear fatos'],
      ['Preconceito linguístico', 'Julgar pessoas pela variedade que falam']
    ],
    vf: [
      ['Para o Enem, variedades populares são erros que devem ser eliminados.', false, 'O Enem trata a variação como fato e cobra adequação à situação, não "certo × errado".'],
      ['Marcadores como "aí" e "daí" organizam a narrativa oral.', true, 'Funcionam como "então" e "depois", encadeando os episódios.'],
      ['Norma culta e norma-padrão são exatamente a mesma coisa.', false, 'A padrão é um modelo idealizado; a culta é o uso real de falantes escolarizados.'],
      ['Uma gíria pode ser adequada em uma situação e inadequada em outra.', true, 'A adequação depende do interlocutor e da finalidade.']
    ]
  });

  L({
    module: {
      id: 'L5', title: 'Semântica, figuras de linguagem e humor', habs: 'H16, H17, H18', faixa: 'A',
      note: 'Seu erro de 2025 está aqui: na questão 25, a crítica às frases feitas vinha do humor de usar as próprias frases feitas; você marcou "efemeridade de usos aleatórios".',
      html: `<h4>1. Denotação, conotação e polissemia</h4>
<ul>
<li><strong>Denotação:</strong> sentido literal, de dicionário ("a pedra caiu").</li>
<li><strong>Conotação:</strong> sentido figurado, dependente do contexto ("ele tem um coração de pedra").</li>
<li><strong>Polissemia:</strong> uma palavra com vários sentidos relacionados ("banco" de sentar e "banco" de dinheiro são homônimos; "pé" de pessoa, de mesa e de serra são polissemia).</li>
<li><strong>Ambiguidade:</strong> duplo sentido. Pode ser defeito ("vi o acidente do prédio": eu estava no prédio ou o prédio sofreu o acidente?) ou recurso intencional, muito usado no humor e na publicidade.</li>
</ul>
<h4>2. Figuras que o Enem mais cobra</h4>
<div class="tw"><table><thead><tr><th>Figura</th><th>O que faz</th><th>Exemplo</th></tr></thead><tbody>
<tr><td>Metáfora</td><td>Comparação implícita</td><td>"Meu coração é um balde despejado."</td></tr>
<tr><td>Comparação</td><td>Comparação explícita, com conectivo</td><td>"Forte como um touro."</td></tr>
<tr><td>Metonímia</td><td>Troca por relação de proximidade (autor pela obra, parte pelo todo, marca pelo produto)</td><td>"Li Machado." "Não tinha um teto."</td></tr>
<tr><td>Antítese</td><td>Ideias opostas lado a lado</td><td>"Riso e choro na mesma noite."</td></tr>
<tr><td>Paradoxo</td><td>Ideias opostas que se fundem numa afirmação aparentemente impossível</td><td>"Estou cego e vejo."</td></tr>
<tr><td>Ironia</td><td>Diz o contrário do que quer dizer</td><td>"Que bela hora para a chuva!", num dia de casamento.</td></tr>
<tr><td>Hipérbole</td><td>Exagero expressivo</td><td>"Já te disse um milhão de vezes."</td></tr>
<tr><td>Eufemismo</td><td>Suaviza algo desagradável</td><td>"Ele partiu" (morreu).</td></tr>
<tr><td>Prosopopeia</td><td>Dá traços humanos a seres não humanos</td><td>"O vento chorava na janela."</td></tr>
<tr><td>Sinestesia</td><td>Mistura sentidos</td><td>"Um perfume doce e barulhento."</td></tr>
<tr><td>Gradação</td><td>Sequência crescente ou decrescente</td><td>"Andou, correu, voou."</td></tr>
<tr><td>Anáfora</td><td>Repetição no início de versos ou frases</td><td>"É noite, é frio, é espera."</td></tr>
<tr><td>Aliteração / assonância</td><td>Repetição de consoantes / vogais</td><td>"O rato roeu a roupa..."</td></tr>
</tbody></table></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p><strong>Antítese × paradoxo:</strong> na antítese, os opostos convivem lado a lado ("riso e choro"); no paradoxo, eles se fundem numa afirmação que parece impossível ("estou cego e vejo"). E metáfora não tem conectivo; se aparece "como", "tal qual", é comparação.</p></div>
<h4>3. De onde vem o humor</h4>
<ul>
<li><strong>Quebra de expectativa:</strong> o texto conduz a uma conclusão e entrega outra.</li>
<li><strong>Ambiguidade intencional:</strong> o leitor entende um sentido e depois percebe o outro.</li>
<li><strong>Ironia:</strong> o sentido real é o oposto do literal.</li>
<li><strong>Exagero</strong> e <strong>nonsense</strong>.</li>
<li><strong>Uso do próprio objeto da crítica:</strong> um texto que critica clichês escrito só com clichês faz o leitor rir e perceber o problema ao mesmo tempo.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Neste mundo corporativo, precisamos alavancar sinergias para entregar valor e sair da caixinha." Se o objetivo do texto é criticar o jargão, a graça está em amontoar o próprio jargão: a crítica e o humor nascem do mesmo recurso.</p></div>
<h4>4. Como o Enem pergunta</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>"O efeito de humor decorre...", "a estratégia empregada para criticar...", "o recurso expressivo que...". Identifique primeiro <strong>o alvo da crítica</strong> e depois <strong>o recurso que produz o efeito</strong>. Muitas vezes o recurso é usar, de propósito, a linguagem que está sendo criticada.</p></div>`,
      resumo: [
        ['Denotação × conotação', 'Sentido literal × sentido figurado'],
        ['Metáfora × comparação', 'Implícita × explícita (com "como")'],
        ['Metonímia', 'Troca por proximidade: autor pela obra, marca pelo produto'],
        ['Antítese × paradoxo', 'Opostos lado a lado × opostos fundidos numa afirmação "impossível"'],
        ['Ironia', 'Diz o contrário do que quer dizer'],
        ['Eufemismo × hipérbole', 'Suaviza × exagera'],
        ['Humor', 'Quebra de expectativa, ambiguidade, ironia, uso do próprio objeto criticado']
      ]
    },
    questions: [
      {
        id: 'L5.1', base: ['Precisamos ser resilientes, sair da zona de conforto e ressignificar a nossa jornada. Afinal, gratidão é tudo, e quem tem propósito entrega valor. Pronto: escrevi um parágrafo inteiro e não disse absolutamente nada.'],
        src: 'Texto escrito para esta apostila.', cmd: 'A estratégia usada para criticar as expressões da moda é o(a)',
        alts: ['explicação do significado de cada expressão citada.', 'humor gerado pelo acúmulo das próprias expressões criticadas.', 'defesa do uso dessas expressões em contextos profissionais.', 'enumeração de dados sobre a frequência dessas expressões.', 'comparação entre o português e outras línguas.'],
        ans: 'B', pos: 'D', hab: 'H17', dif: 'média',
        ex: { B: 'o texto amontoa os clichês e depois revela o vazio ("não disse nada"): o humor e a crítica vêm das próprias expressões.', A: 'nenhuma expressão é explicada.', C: 'o texto critica, não defende. Termo oposto.', D: 'não há dados.', E: 'não há comparação entre línguas.' },
        traps: { C: 'oposto' }
      },
      {
        id: 'L5.2', base: ['"Ela riu chorando, como quem ganha perdendo."'],
        src: 'Texto escrito para esta apostila.', cmd: 'A figura de linguagem que estrutura o verso é o(a)',
        alts: ['paradoxo, pois funde ideias opostas numa afirmação aparentemente impossível.', 'eufemismo, pois suaviza um fato desagradável.', 'metonímia, pois troca uma palavra por outra próxima.', 'hipérbole, pois exagera os sentimentos.', 'prosopopeia, pois dá traços humanos a objetos.'],
        ans: 'A', pos: 'C', hab: 'H16', dif: 'média',
        ex: { A: '"riu chorando" e "ganha perdendo" unem opostos numa só ação: paradoxo.', B: 'nada é suavizado.', C: 'não há troca por proximidade.', D: 'não há exagero quantitativo.', E: 'não há ser inanimado humanizado.' }
      },
      {
        id: 'L5.3', base: ['"O mar, cansado, deitou-se na areia e dormiu até a manhã."'],
        src: 'Texto escrito para esta apostila.', cmd: 'Nesse trecho, a expressividade decorre principalmente da',
        alts: ['metonímia', 'prosopopeia', 'antítese', 'ironia', 'sinestesia'],
        ans: 'B', hab: 'H16', dif: 'fácil',
        ex: { B: 'o mar ganha ações humanas ("cansado", "deitou-se", "dormiu"): prosopopeia.', A: 'não há troca por proximidade.', C: 'não há ideias opostas.', D: 'não há sentido contrário ao literal.', E: 'não há mistura de sentidos.' }
      },
      {
        id: 'L5.4', base: ['<em>Placa num restaurante:</em> "Aceitamos todos os cartões. Menos os vermelhos."', '<em>A placa está pendurada ao lado da TV que transmite um jogo de futebol.</em>'],
        src: 'Texto escrito para esta apostila.', cmd: 'O humor da placa resulta da',
        alts: ['informação objetiva sobre as formas de pagamento.', 'ambiguidade da palavra "cartões", que remete também ao futebol.', 'crítica ao alto preço da comida do restaurante.', 'linguagem técnica do mundo financeiro.', 'contradição entre a placa e o cardápio.'],
        ans: 'B', hab: 'H17', dif: 'média',
        ex: { B: '"cartões" (de pagamento) passa a evocar os cartões do futebol ("menos os vermelhos"), em contexto de jogo: ambiguidade intencional.', A: 'a informação sobre pagamento é o ponto de partida, não a fonte do humor.', C: 'não há crítica ao preço.', D: 'não há linguagem técnica.', E: 'não há cardápio no texto.' },
        traps: { A: 'detalhe' }
      },
      {
        id: 'L5.5', base: ['"Comprei um Picasso" pode significar, conforme o contexto, ter comprado um quadro do pintor.'],
        src: 'Texto escrito para esta apostila.', cmd: 'Esse uso da linguagem exemplifica a',
        alts: ['metonímia, pois o nome do autor substitui a obra.', 'metáfora, pois compara o comprador ao pintor.', 'hipérbole, pois exagera o valor do quadro.', 'antítese, pois opõe arte e comércio.', 'ironia, pois afirma o contrário do que se pensa.'],
        ans: 'A', hab: 'H16', dif: 'fácil',
        ex: { A: 'autor pela obra é um caso clássico de metonímia.', B: 'não há comparação implícita entre comprador e pintor.', C: 'não há exagero.', D: 'não há termos opostos.', E: 'não há inversão de sentido.' }
      }
    ],
    cards: [
      ['Metáfora × comparação', 'Implícita × explícita (com conectivo)'],
      ['Metonímia', 'Troca por proximidade: autor pela obra, parte pelo todo'],
      ['Antítese × paradoxo', 'Opostos lado a lado × opostos fundidos'],
      ['Prosopopeia', 'Traços humanos em seres não humanos'],
      ['Sinestesia', 'Mistura de sensações: "perfume doce e barulhento"'],
      ['Humor por uso do objeto criticado', 'Critica um jargão usando o próprio jargão']
    ],
    vf: [
      ['"Forte como um touro" é uma metáfora.', false, 'Há conectivo ("como"): é comparação.'],
      ['A ambiguidade pode ser um recurso intencional de humor.', true, 'O leitor percebe dois sentidos e a graça está na passagem de um a outro.'],
      ['"Ele partiu desta para melhor" é um exemplo de eufemismo.', true, 'Suaviza a ideia de morte.'],
      ['Na antítese, as ideias opostas se fundem numa afirmação impossível.', false, 'Isso é paradoxo; na antítese, os opostos apenas aparecem lado a lado.']
    ]
  });
})(window.DATA);
