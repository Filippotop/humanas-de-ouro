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

  L({
    module: {
      id: 'L6', title: 'Coesão, coerência e argumentação', habs: 'H18, H21, H22, H23, H24', faixa: 'A',
      note: 'Dois dos seus erros de 2025 estão aqui: na questão 38 (a que termo "sua trajetória" se refere) e na questão 17 (o papel da repetição de "antes de" na progressão do texto). É o módulo de Linguagens que mais rende pontos para você.',
      html: `<h4>1. Coesão referencial: quem retoma quem</h4>
<p>Coesão é a costura do texto: as palavras que ligam uma parte à outra. A <strong>coesão referencial</strong> retoma ou anuncia elementos para não repeti-los.</p>
<ul>
<li><strong>Anáfora:</strong> retoma algo que <strong>já apareceu</strong>. "O meteoro chegou sem aviso. <u>Ele</u> era pequeno demais."</li>
<li><strong>Catáfora:</strong> anuncia algo que <strong>ainda vai aparecer</strong>. "O problema é <u>este</u>: ninguém viu o meteoro."</li>
<li><strong>Recursos:</strong> pronomes (ele, isso, o qual, seu), sinônimos, hiperônimos ("o meteoro" → "o corpo celeste"), expressões nominais ("o invasor silencioso"), elipse (omissão: "Chegou sem aviso" = ele chegou).</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>A pergunta típica: "com base na organização coesiva do texto, o termo X refere-se a...". Faça o caminho de volta: <strong>leia a frase do pronome e procure, antes dela, o termo que faz sentido no lugar do pronome</strong>. Teste a substituição: se a frase continuar fazendo sentido e coerente com o texto, achou.</p></div>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Qualquer detrito espacial que se aproximasse seria identificado, e <u>sua</u> trajetória calculada." <em>Trajetória de quem?</em> Do detrito (substitua: "a trajetória do detrito calculada"). O possessivo "sua" retoma o termo mais próximo que faça sentido, não o tema geral do texto.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Pronomes como <strong>isso</strong>, <strong>isto</strong> e <strong>o que</strong> costumam retomar <strong>uma ideia inteira</strong> já dita, e não uma palavra. "A desculpa é que era pequeno demais para chamar a atenção, e por <u>isso</u> os alarmes não funcionaram": "isso" retoma "era pequeno demais", que vem <strong>antes</strong>. Alternativas que dizem "remete ao segmento posterior" invertem a direção.</p></div>
<h4>2. Coesão sequencial: os conectivos e as relações lógicas</h4>
<div class="tw"><table><thead><tr><th>Relação</th><th>Conectivos</th></tr></thead><tbody>
<tr><td>Adição</td><td>e, também, além disso, não só... mas também</td></tr>
<tr><td>Oposição</td><td>mas, porém, contudo, entretanto, todavia, no entanto</td></tr>
<tr><td>Concessão</td><td>embora, ainda que, mesmo que, apesar de</td></tr>
<tr><td>Causa</td><td>porque, já que, visto que, uma vez que</td></tr>
<tr><td>Consequência</td><td>de modo que, tanto que, de forma que</td></tr>
<tr><td>Conclusão</td><td>portanto, logo, assim, por isso, então</td></tr>
<tr><td>Finalidade</td><td>para que, a fim de que, com o objetivo de</td></tr>
<tr><td>Condição</td><td>se, caso, desde que, contanto que</td></tr>
<tr><td>Tempo</td><td>quando, enquanto, assim que, logo que</td></tr>
<tr><td>Comparação</td><td>como, assim como, tal qual, mais... do que</td></tr>
</tbody></table></div>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Oposição × concessão:</strong> "Estudei, <u>mas</u> não passei" (o "mas" introduz o argumento que prevalece). "<u>Embora</u> tenha estudado, não passei" (o "embora" introduz o fato que é admitido, mas não impede o resultado). As duas expressam contraste; a concessão reconhece um argumento contrário antes de superá-lo.</p></div>
<h4>3. Progressão temática e repetição estratégica</h4>
<p>Um texto progride quando cada frase <strong>acrescenta informação nova</strong> ao tema, sem perder o fio. A repetição, que na escola parece defeito, pode ser estratégia: a retomada insistente de uma expressão costura as partes do texto e constrói sentido.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Ela tinha olhos brilhantes. Os mesmos de <u>antes</u>. <u>Antes</u> da fome. <u>Antes</u> das mudanças de cidade..." A repetição de "antes" opõe a avó de antes à avó de agora e faz o leitor <strong>reinterpretar o presente</strong> (o que a doença levou). Não é uma sequência de ações nem uma simples comparação: é o contraste entre passado e presente que move o texto.</p></div>
<h4>4. Coerência</h4>
<p>Coerência é o sentido global: as ideias não se contradizem, combinam com o conhecimento de mundo e com a situação. Um texto pode ser coeso (bem ligado) e incoerente ("Choveu muito, <u>portanto</u> o chão ficou seco"), ou ter poucos conectivos e ser coerente (uma lista de compras).</p>
<h4>5. Argumentação: tese, argumentos e operadores</h4>
<ul>
<li><strong>Tese:</strong> o ponto de vista defendido.</li>
<li><strong>Tipos de argumento:</strong> autoridade (citar especialista ou instituição), exemplificação, dados e estatísticas, causa e consequência, comparação ou analogia, e <strong>contra-argumentação</strong> (reconhecer a posição contrária e refutá-la).</li>
<li><strong>Operadores argumentativos:</strong> palavras que orientam a conclusão. "<u>Até</u> o ministro concordou" (o mais forte da escala); "<u>Apenas</u> 10% votaram" (minimiza); "<u>Aliás</u>" (acrescenta um argumento decisivo); "<u>Afinal</u>" (apresenta a justificativa final).</li>
</ul>
<div class="box conexao"><b class="box-t">Conexão</b><p>A competência 4 da redação (coesão) e a competência 3 (argumentação) usam exatamente estas ferramentas. Treinar a leitura aqui melhora a sua escrita.</p></div>`,
      resumo: [
        ['Anáfora', 'Retoma algo que já apareceu'],
        ['Catáfora', 'Anuncia algo que ainda vai aparecer'],
        ['"Isso", "o que"', 'Costumam retomar uma ideia inteira, anterior'],
        ['Teste do pronome', 'Substitua o pronome pelo termo candidato e veja se a frase faz sentido'],
        ['Oposição × concessão', 'mas, porém × embora, ainda que'],
        ['Conclusão × consequência', 'portanto, logo × de modo que, tanto que'],
        ['Progressão temática', 'Cada frase acrescenta informação nova ao tema'],
        ['Contra-argumentação', 'Reconhece a posição contrária e a refuta'],
        ['Operador "até"', 'Marca o argumento mais forte da escala']
      ]
    },
    questions: [
      {
        id: 'L6.1', base: ['(1) A cidade inaugurou uma ciclovia na avenida central. (2) A obra levou dois anos. (3) Comerciantes temiam perder clientes, mas <u>eles</u> agora registram aumento nas vendas. (4) <u>Isso</u> surpreendeu até a prefeitura.'],
        src: 'Texto escrito para esta apostila.', cmd: 'Com base na organização coesiva do texto, o(a)',
        alts: ['pronome "eles" (3) retoma "clientes", mencionado na mesma frase.', 'pronome "isso" (4) retoma o aumento nas vendas registrado pelos comerciantes.', 'pronome "isso" (4) anuncia uma informação que será apresentada depois.', 'pronome "eles" (3) retoma "dois anos", citado na frase anterior.', 'expressão "a obra" (2) introduz um elemento novo, sem relação com a frase 1.'],
        ans: 'B', pos: 'C', hab: 'H18', dif: 'média',
        ex: { B: '"isso" retoma a ideia anterior inteira: o aumento nas vendas, que contrariou o temor. É a informação que "surpreendeu".', A: '"eles" registram vendas: são os comerciantes, não os clientes. O termo mais próximo nem sempre é o referente.', C: 'não há nada depois de "isso" a ser anunciado; ele retoma (anáfora), não anuncia.', D: 'anos não registram vendas; a substituição não faz sentido.', E: '"a obra" retoma "ciclovia" da frase 1; não é elemento novo.' },
        traps: { A: 'detalhe', C: 'oposto' }
      },
      {
        id: 'L6.2', base: ['"<u>Embora</u> os aplicativos de transporte tenham ampliado o acesso à mobilidade, a renda dos motoristas caiu nos últimos anos."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O conectivo destacado estabelece entre as orações uma relação de',
        alts: ['causa, pois a ampliação do acesso explica a queda da renda.', 'concessão, pois admite um fato que não impede a constatação principal.', 'finalidade, pois indica o objetivo dos aplicativos.', 'conclusão, pois encerra o raciocínio do autor.', 'condição, pois a renda depende do acesso ampliado.'],
        ans: 'B', pos: 'E', hab: 'H18', dif: 'fácil',
        ex: { B: '"embora" admite o ponto positivo (acesso ampliado), mas a ideia principal se impõe (renda caiu): concessão.', A: 'o texto não diz que uma coisa causou a outra.', C: 'não há objetivo indicado.', D: 'conclusão seria "portanto", "logo".', E: 'condição seria "se", "caso".' },
        traps: { A: 'exagero' }
      },
      {
        id: 'L6.3', base: ['"Choveu durante toda a madrugada; portanto, as ruas amanheceram completamente secas."'],
        src: 'Texto escrito para esta apostila.', cmd: 'Esse enunciado apresenta problema de',
        alts: ['coerência, pois o conectivo de conclusão liga ideias que se contradizem.', 'coesão referencial, pois falta um pronome para retomar "madrugada".', 'ortografia, pois "madrugada" está escrita de forma errada.', 'variação linguística, pois usa uma expressão regional.', 'pontuação, pois o ponto e vírgula é proibido antes de "portanto".'],
        ans: 'A', hab: 'H18', dif: 'fácil',
        ex: { A: 'chuva a noite inteira não leva a ruas secas; "portanto" anuncia uma conclusão que contradiz a premissa.', B: 'não há necessidade de retomada.', C: 'a palavra está correta.', D: 'não há expressão regional.', E: 'o ponto e vírgula antes de "portanto" é aceito.' }
      },
      {
        id: 'L6.4', base: ['"Os defensores da semana de quatro dias dizem que a produtividade aumenta. É verdade que alguns estudos apontam esse resultado. Esses estudos, porém, foram feitos em empresas de escritório, e não se aplicam à indústria nem ao comércio."'],
        src: 'Texto escrito para esta apostila.', cmd: 'A estratégia argumentativa do autor consiste em',
        alts: ['citar uma autoridade para confirmar a tese dos defensores.', 'apresentar dados estatísticos que encerram a discussão.', 'reconhecer parcialmente o argumento contrário e, em seguida, limitar seu alcance.', 'narrar uma experiência pessoal numa empresa.', 'comparar o Brasil com outros países.'],
        ans: 'C', pos: 'D', hab: 'H23', dif: 'média',
        ex: { C: '"É verdade que..." admite o argumento; "porém" restringe sua validade a escritórios: contra-argumentação.', A: 'não há autoridade citada nominalmente, e o autor não confirma a tese.', B: 'não há números; e a discussão não é "encerrada".', D: 'não há relato pessoal.', E: 'não há comparação entre países.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L6.5', base: ['"Até os críticos mais duros do projeto reconheceram que ele reduziu as filas nos postos de saúde."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O uso de "até" reforça a argumentação porque',
        alts: ['indica um limite de tempo para o reconhecimento.', 'apresenta o reconhecimento dos críticos como o argumento mais forte a favor do projeto.', 'introduz uma oposição entre críticos e defensores.', 'marca uma dúvida do autor sobre os resultados.', 'indica a finalidade do projeto.'],
        ans: 'B', pos: 'A', hab: 'H24', dif: 'média',
        ex: { B: 'se até quem é contra reconhece, o argumento ganha força máxima: "até" marca o ponto mais alto da escala.', A: '"até" aqui não é preposição de tempo.', C: 'não há oposição introduzida; os críticos concordam.', D: 'não há dúvida; o operador fortalece.', E: 'não indica finalidade.' },
        traps: { A: 'detalhe', D: 'oposto' }
      }
    ],
    cards: [
      ['Anáfora × catáfora', 'Retoma o anterior × anuncia o posterior'],
      ['"Isso" costuma retomar...', 'Uma ideia inteira já dita (anáfora)'],
      ['Teste para achar o referente', 'Substituir o pronome pelo termo candidato'],
      ['Embora, ainda que', 'Concessão'],
      ['Portanto, logo', 'Conclusão'],
      ['Contra-argumentação', 'Admite o argumento contrário e o refuta'],
      ['Operador "até"', 'Argumento mais forte da escala']
    ],
    vf: [
      ['O pronome sempre retoma o substantivo mais próximo dele no texto.', false, 'Retoma o termo que faz sentido no lugar dele; nem sempre é o mais próximo.'],
      ['Um texto pode ter muitos conectivos e ainda assim ser incoerente.', true, 'Coesão é a ligação; coerência é o sentido global. Uma não garante a outra.'],
      ['"Embora" e "mas" expressam ambos contraste, mas de maneiras diferentes.', true, '"Mas" introduz o argumento que prevalece; "embora" introduz o fato admitido.'],
      ['A repetição de uma palavra é sempre um defeito de coesão.', false, 'Pode ser estratégia de progressão e de construção de sentido.']
    ]
  });

  L({
    module: {
      id: 'L7', title: 'Gramática em uso: escolhas que produzem sentido', habs: 'H18, H25, H26, H27', faixa: 'B',
      note: 'O Enem não pede classificação gramatical pela classificação: pergunta o que uma escolha (tempo verbal, voz passiva, pontuação, diminutivo) faz no texto.',
      html: `<h4>1. Tempos e modos verbais com efeito de sentido</h4>
<ul>
<li><strong>Futuro do pretérito</strong> ("teria", "seria"): hipótese, polidez ou distanciamento. Em notícias, "o suspeito <u>teria</u> fugido" indica que o jornal não confirma a informação.</li>
<li><strong>Subjuntivo</strong> ("se eu <u>fosse</u>", "que você <u>venha</u>"): hipótese, desejo, dúvida.</li>
<li><strong>Imperativo</strong>: ordem, pedido, conselho; muito usado na propaganda e nas instruções.</li>
<li><strong>Presente atemporal</strong> ("a água <u>ferve</u> a 100 °C"): verdades gerais, definições.</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"O prefeito <u>teria recebido</u> propina, segundo a denúncia." O futuro do pretérito marca que a informação vem da denúncia e ainda não foi comprovada. Trocar por "recebeu" mudaria o grau de certeza e a responsabilidade do veículo.</p></div>
<h4>2. Voz passiva e apagamento do agente</h4>
<p>"<u>Foram cometidos erros</u>" omite quem errou. A voz passiva sem agente e o sujeito indeterminado ("<u>disseram</u> que...") servem para esconder, generalizar ou proteger responsáveis. Em textos institucionais, é um recurso de distanciamento.</p>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Modalizadores</strong> indicam o grau de certeza ou a avaliação do autor: "talvez", "provavelmente", "certamente", "é possível que", "infelizmente", "felizmente". Eles mostram a posição de quem escreve sem que ele precise dizer "eu acho".</p></div>
<h4>3. Pronomes e pessoas do discurso</h4>
<ul>
<li><strong>"Nós" inclusivo</strong> ("<u>precisamos</u> cuidar da cidade"): aproxima o autor do leitor e cria responsabilidade compartilhada.</li>
<li><strong>"A gente"</strong>: equivale a "nós" na fala e na escrita informal; concorda com o verbo na 3ª pessoa ("a gente <u>vai</u>").</li>
<li><strong>"Você" genérico</strong> ("quando <u>você</u> estuda, aprende"): fala de qualquer pessoa, não só do leitor.</li>
</ul>
<h4>4. Pontuação e sinais que mudam o sentido</h4>
<ul>
<li><strong>Vírgula:</strong> "Não, quero" × "Não quero". E a vírgula do vocativo: "Vamos comer, crianças" × "Vamos comer crianças".</li>
<li><strong>Aspas:</strong> citação, mas também <strong>ironia ou distanciamento</strong> ("o 'especialista' errou de novo").</li>
<li><strong>Reticências:</strong> hesitação, suspense, insinuação.</li>
<li><strong>Exclamação e interrogação retórica:</strong> ênfase e envolvimento do leitor.</li>
</ul>
<h4>5. Diminutivo, aumentativo e adjetivação</h4>
<p>"Casinha" pode ser afeto ou desprezo, conforme o contexto; "um <u>cafezinho</u>" é cortesia; "aquele <u>sujeitinho</u>" é pejorativo. Adjetivos e advérbios avaliativos ("o <u>lamentável</u> episódio") revelam a opinião do autor.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Pergunta típica: "o uso do futuro do pretérito em X indica...", "as aspas em 'especialista' sugerem...", "a forma diminutiva confere ao texto...". Responda pelo <strong>efeito no contexto</strong>, não pela nomenclatura.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Diminutivo não indica tamanho na maioria das questões: indica <strong>afeto, ironia ou desprezo</strong>. E aspas não marcam só citação: numa palavra isolada, costumam indicar ironia ou distanciamento do autor em relação ao termo.</p></div>`,
      resumo: [
        ['Futuro do pretérito', 'Hipótese, polidez ou informação não confirmada ("teria fugido")'],
        ['Subjuntivo', 'Hipótese, desejo, dúvida'],
        ['Voz passiva sem agente', 'Oculta ou protege o responsável'],
        ['Modalizadores', 'Grau de certeza e avaliação do autor: talvez, certamente, infelizmente'],
        ['"Nós" inclusivo', 'Aproxima autor e leitor numa responsabilidade comum'],
        ['Aspas numa palavra', 'Ironia ou distanciamento'],
        ['Diminutivo', 'Afeto, ironia ou desprezo, conforme o contexto']
      ]
    },
    questions: [
      {
        id: 'L7.1', base: ['"Segundo a investigação, o empresário <u>teria transferido</u> os recursos para uma conta no exterior."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O uso do futuro do pretérito na forma destacada indica que o jornal',
        alts: ['confirma que a transferência ocorreu.', 'apresenta a informação como não confirmada, atribuída à investigação.', 'deseja que a transferência aconteça.', 'ordena que o empresário devolva os recursos.', 'narra um fato que ocorrerá no futuro.'],
        ans: 'B', hab: 'H25', dif: 'fácil',
        ex: { B: '"teria transferido" e "segundo a investigação" mostram que o veículo relata sem confirmar.', A: 'o futuro do pretérito afasta a confirmação. Termo oposto.', C: 'não há desejo; isso seria subjuntivo em outra construção.', D: 'não há ordem.', E: 'o fato teria ocorrido no passado; a forma não indica futuro.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L7.2', base: ['<em>Nota oficial de uma empresa após um vazamento de dados:</em>', '"Falhas foram identificadas no sistema e providências estão sendo tomadas."'],
        src: 'Texto escrito para esta apostila.', cmd: 'A construção das frases na voz passiva, sem indicação de quem agiu, produz o efeito de',
        alts: ['identificar com precisão os responsáveis pela falha.', 'aproximar a empresa do leitor pelo uso da primeira pessoa.', 'ocultar os responsáveis pelas falhas e pelas providências.', 'expressar indignação da empresa com o ocorrido.', 'convencer o leitor a trocar de senha.'],
        ans: 'C', hab: 'H26', dif: 'média',
        ex: { C: 'sem agente, não se sabe quem falhou nem quem age: o texto se distancia da responsabilidade.', A: 'é o contrário: ninguém é identificado. Termo oposto.', B: 'não há primeira pessoa.', D: 'não há marca de indignação.', E: 'não há apelo ao leitor.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L7.3', base: ['"Mais uma vez, o \'especialista\' da televisão previu sol para o feriado. Choveu os três dias."'],
        src: 'Texto escrito para esta apostila.', cmd: 'As aspas em "especialista" sugerem',
        alts: ['uma citação literal de um documento oficial.', 'ironia, ao pôr em dúvida a competência de quem fez a previsão.', 'um termo estrangeiro ainda não incorporado à língua.', 'o título de um programa de televisão.', 'respeito do autor pelo profissional citado.'],
        ans: 'B', pos: 'D', hab: 'H17', dif: 'fácil',
        ex: { B: 'a previsão errada ("choveu os três dias") mostra que as aspas questionam o título de especialista: ironia.', A: 'não há documento citado.', C: '"especialista" é palavra do português.', D: 'não há indicação de título de programa.', E: 'é o contrário: há crítica. Termo oposto.' },
        traps: { E: 'oposto' }
      },
      {
        id: 'L7.4', base: ['<em>Cartaz de uma campanha de bairro:</em> "Se cada um de nós cuidar da sua calçada, a gente muda a cara da rua."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O uso de "nós" e de "a gente" no cartaz contribui para',
        alts: ['afastar o autor da responsabilidade pela limpeza.', 'criar um sentido de responsabilidade compartilhada entre autor e leitores.', 'indicar que a campanha é dirigida a uma única pessoa.', 'expressar uma ordem da prefeitura aos moradores.', 'apresentar dados oficiais sobre limpeza urbana.'],
        ans: 'B', pos: 'E', hab: 'H26', dif: 'fácil',
        ex: { B: '"nós" e "a gente" incluem quem fala e quem lê na mesma tarefa: responsabilidade compartilhada.', A: 'o autor se inclui; não se afasta. Termo oposto.', C: '"nós" é coletivo.', D: 'não há ordem nem autoria da prefeitura.', E: 'não há dados.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L7.5', base: ['— Vem cá, meu <u>amorzinho</u>, que a vovó fez um <u>bolinho</u>.', '— De novo aquele <u>vereadorzinho</u> prometendo asfalto?'],
        src: 'Falas escritas para esta apostila.', cmd: 'Nas duas falas, o diminutivo expressa, respectivamente,',
        alts: ['tamanho pequeno e tamanho pequeno.', 'afeto e desprezo.', 'desprezo e afeto.', 'ironia e respeito.', 'dúvida e certeza.'],
        ans: 'B', pos: 'A', hab: 'H25', dif: 'fácil',
        ex: { B: 'na fala da avó, carinho; na segunda, depreciação do político que repete promessas.', A: 'o diminutivo não indica tamanho nesses contextos.', C: 'inverte a ordem dos efeitos.', D: 'na segunda fala não há respeito.', E: 'diminutivo não expressa grau de certeza.' },
        traps: { C: 'oposto' }
      }
    ],
    cards: [
      ['"O suspeito teria fugido"', 'Futuro do pretérito: informação não confirmada'],
      ['Voz passiva sem agente', 'Oculta o responsável'],
      ['Modalizador', 'Indica grau de certeza ou avaliação: talvez, certamente'],
      ['Aspas numa palavra isolada', 'Ironia ou distanciamento'],
      ['"A gente vai"', '"A gente" = nós, verbo na 3ª pessoa do singular'],
      ['Diminutivo no Enem', 'Afeto, ironia ou desprezo, mais do que tamanho']
    ],
    vf: [
      ['O futuro do pretérito pode indicar que uma informação não foi confirmada.', true, 'Em notícias, "teria" atribui a informação a outra fonte.'],
      ['A voz passiva sem agente sempre deixa claro quem praticou a ação.', false, 'É o contrário: ela omite o agente.'],
      ['Aspas servem apenas para marcar citações literais.', false, 'Também indicam ironia, distanciamento ou termo estrangeiro.'],
      ['"Precisamos cuidar do planeta" usa um "nós" inclusivo.', true, 'O autor se inclui com o leitor na responsabilidade.']
    ]
  });

  L({
    module: {
      id: 'L8', title: 'Literatura I: do Quinhentismo ao Realismo e ao Parnasianismo', habs: 'H15, H16, H17', faixa: 'B',
      note: 'O Enem raramente pede a escola pelo nome: pede que você reconheça no trecho as marcas de uma estética e a relação com o seu tempo.',
      html: `<h4>1. Quinhentismo e Barroco</h4>
<ul>
<li><strong>Quinhentismo (século XVI):</strong> textos de informação sobre a terra (a <em>Carta</em> de Pero Vaz de Caminha, de 1500, com olhar europeu, deslumbrado e interessado na exploração) e de catequese (José de Anchieta).</li>
<li><strong>Barroco (século XVII):</strong> conflito entre fé e prazer, céu e terra, efemeridade da vida. Linguagem rebuscada, cheia de <strong>antíteses, paradoxos e hipérboles</strong>. <strong>Gregório de Matos</strong>, o "Boca do Inferno", fez poesia lírica, religiosa e satírica sobre a Bahia; <strong>Padre Antônio Vieira</strong>, nos sermões, argumentou com engenho (conceptismo).</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Triste Bahia! Ó quão dessemelhante / Estás e estou do nosso antigo estado!" (Gregório de Matos). O eu lírico e a cidade decaem juntos: lamento e crítica à exploração comercial da colônia.</p></div>
<h4>2. Arcadismo (século XVIII)</h4>
<p>Reação ao exagero barroco: simplicidade, razão, natureza idealizada. Marcas: <strong>bucolismo</strong>, pastores fictícios, <strong>fugere urbem</strong> (fugir da cidade), <strong>carpe diem</strong> (aproveitar o dia), <strong>locus amoenus</strong> (lugar ameno). Autores ligados a Minas Gerais e à Inconfidência: Cláudio Manuel da Costa e <strong>Tomás Antônio Gonzaga</strong> (<em>Marília de Dirceu</em>). Épicos: <em>O Uraguai</em> (Basílio da Gama) e <em>Caramuru</em> (Santa Rita Durão).</p>
<h4>3. Romantismo (século XIX)</h4>
<div class="tw"><table><thead><tr><th>Geração / vertente</th><th>Marcas</th><th>Nomes</th></tr></thead><tbody>
<tr><td>1ª geração: nacionalista e indianista</td><td>Exaltação da pátria e do indígena idealizado</td><td>Gonçalves Dias ("Canção do exílio", "I-Juca-Pirama")</td></tr>
<tr><td>2ª geração: ultrarromântica ("mal do século")</td><td>Pessimismo, tédio, amor e morte</td><td>Álvares de Azevedo, Casimiro de Abreu</td></tr>
<tr><td>3ª geração: condoreira</td><td>Poesia social, abolicionista, grandiloquente</td><td>Castro Alves ("O navio negreiro")</td></tr>
<tr><td>Prosa</td><td>Romance indianista, urbano e regionalista</td><td>José de Alencar (<em>Iracema</em>, <em>O Guarani</em>, <em>Senhora</em>), Joaquim Manuel de Macedo, Maria Firmina dos Reis (<em>Úrsula</em>, 1859)</td></tr>
</tbody></table></div>
<div class="box conceito"><b class="box-t">Conceito</b><p>O Romantismo brasileiro ajudou a construir uma <strong>identidade nacional</strong> depois da Independência; o indígena virou herói idealizado, com valores de cavaleiro europeu. Maria Firmina dos Reis, com <em>Úrsula</em>, é considerada a primeira romancista negra do Brasil e deu voz a personagens escravizados.</p></div>
<h4>4. Realismo, Naturalismo e Parnasianismo (fim do século XIX)</h4>
<ul>
<li><strong>Realismo:</strong> crítica à burguesia, análise psicológica, ironia, objetividade. <strong>Machado de Assis</strong> inaugura o Realismo com <em>Memórias póstumas de Brás Cubas</em> (1881), narradas por um defunto; em <em>Dom Casmurro</em>, o narrador Bentinho é suspeito, e a dúvida sobre Capitu é construída pelo próprio relato.</li>
<li><strong>Naturalismo:</strong> o ser humano determinado pelo meio, pela herança e pelo momento (determinismo); personagens animalizadas (zoomorfização); temas sociais e sexuais. <em>O cortiço</em> (Aluísio Azevedo).</li>
<li><strong>Parnasianismo:</strong> poesia da "arte pela arte": rigor formal, soneto, rima rica, vocabulário raro, objetividade. Olavo Bilac, Raimundo Correia, Alberto de Oliveira.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Machado aparece muito, quase sempre para cobrar <strong>ironia</strong>, crítica social e o narrador que conversa com o leitor. Gregório, para cobrar sátira e antíteses. Castro Alves, para cobrar a denúncia da escravidão.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Romantismo × Realismo: idealização × crítica. Um amor perfeito e uma heroína pura apontam para o Romantismo; o casamento por interesse analisado com ironia aponta para o Realismo. E rigor formal com objetividade é Parnasianismo, não Romantismo.</p></div>`,
      resumo: [
        ['Quinhentismo', 'Informação (Carta de Caminha) e catequese (Anchieta)'],
        ['Barroco', 'Conflito fé × prazer; antítese e paradoxo; Gregório de Matos, Vieira'],
        ['Arcadismo', 'Bucolismo, fugere urbem, carpe diem; Gonzaga'],
        ['Romantismo', 'Idealização, nacionalismo, indianismo; Gonçalves Dias, Álvares de Azevedo, Castro Alves, Alencar'],
        ['Realismo', 'Ironia, análise psicológica, crítica à burguesia; Machado (1881)'],
        ['Naturalismo', 'Determinismo, zoomorfização; O cortiço'],
        ['Parnasianismo', 'Arte pela arte, soneto, rigor formal; Bilac']
      ]
    },
    questions: [
      {
        id: 'L8.1', base: ['"Senhor Deus dos desgraçados! / Dizei-me vós, Senhor Deus! / Se é loucura... se é verdade / Tanto horror perante os céus?!"'],
        src: 'ALVES, C. O navio negreiro. Domínio público.', cmd: 'Esses versos manifestam uma característica da terceira geração romântica, que é a',
        alts: ['idealização do indígena como herói nacional.', 'denúncia social expressa em tom grandiloquente.', 'evasão para a morte e o tédio do "mal do século".', 'busca da forma perfeita e da arte pela arte.', 'descrição objetiva da natureza brasileira.'],
        ans: 'B', pos: 'C', hab: 'H16', dif: 'fácil',
        ex: { B: 'a interpelação a Deus diante do "horror" do tráfico negreiro, com exclamações, é a poesia social e condoreira de Castro Alves.', A: 'o indianismo é da primeira geração.', C: 'o "mal do século" é da segunda geração.', D: 'a arte pela arte é parnasiana.', E: 'não há descrição da natureza.' },
        traps: { C: 'autor' }
      },
      {
        id: 'L8.2', base: ['"Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas."'],
        src: 'ASSIS, M. Memórias póstumas de Brás Cubas. Domínio público.', cmd: 'A dedicatória antecipa um traço central do romance, que é a',
        alts: ['idealização romântica do amor e da morte.', 'ironia de um narrador que escreve depois de morto.', 'exaltação da natureza tropical.', 'descrição científica da decomposição do corpo.', 'linguagem rebuscada, cheia de antíteses barrocas.'],
        ans: 'B', pos: 'E', hab: 'H17', dif: 'média',
        ex: { B: 'dedicar o livro ao verme com "saudosa lembrança" é humor irônico; o narrador é um defunto-autor.', A: 'a morte é tratada com ironia, não idealizada. Termo oposto.', C: 'não há natureza.', D: 'a imagem do verme é irônica, não científica; o determinismo é naturalista.', E: 'não há antíteses barrocas.' },
        traps: { A: 'oposto', D: 'detalhe' }
      },
      {
        id: 'L8.3', base: ['"Triste Bahia! Ó quão dessemelhante / Estás e estou do nosso antigo estado!"'],
        src: 'MATOS, G. Obra poética. Domínio público.', cmd: 'Nesses versos, o eu lírico',
        alts: ['celebra a prosperidade alcançada pela cidade.', 'identifica a própria decadência com a decadência da Bahia.', 'descreve com objetividade a paisagem baiana.', 'convida o leitor a fugir da cidade para o campo.', 'exalta o indígena como símbolo da pátria.'],
        ans: 'B', pos: 'A', hab: 'H16', dif: 'média',
        ex: { B: '"Estás e estou" iguala cidade e eu lírico na mesma perda do "antigo estado".', A: 'há lamento, não celebração. Termo oposto.', C: 'não há descrição objetiva.', D: 'fugere urbem é traço árcade e não aparece aqui.', E: 'o indianismo é romântico.' },
        traps: { A: 'oposto', D: 'autor' }
      },
      {
        id: 'L8.4', base: ['"Última flor do Lácio, inculta e bela, / És, a um tempo, esplendor e sepultura"'],
        src: 'BILAC, O. Poesias. Domínio público.', cmd: 'O soneto "Língua portuguesa", do qual vêm esses versos, é de Olavo Bilac, poeta do Parnasianismo. A escola é reconhecível nos versos pela',
        alts: ['linguagem coloquial e o verso livre.', 'busca do rigor formal e o vocabulário elevado.', 'denúncia da escravidão.', 'fragmentação e a colagem de imagens urbanas.', 'religiosidade e o conflito entre fé e pecado.'],
        ans: 'B', hab: 'H15', dif: 'média',
        ex: { B: 'verso medido, imagem erudita ("flor do Lácio") e vocabulário elevado: marcas parnasianas.', A: 'coloquialismo e verso livre são modernistas.', C: 'a denúncia da escravidão é condoreira.', D: 'fragmentação urbana é modernista.', E: 'conflito fé × pecado é barroco.' },
        traps: { A: 'autor' }
      },
      {
        id: 'L8.5', base: ['<em>Trecho escrito para esta apostila, no estilo do Naturalismo:</em>', '"No cortiço acordado, a gente formigava entre as tinas, como bichos que o calor e a fome empurravam para fora das tocas; e cada um parecia feito do mesmo barro do lugar."'],
        src: 'Texto escrito para esta apostila.', cmd: 'A visão de mundo naturalista se revela no trecho pela',
        alts: ['idealização heroica das personagens pobres.', 'animalização das pessoas e pela ideia de que o meio as determina.', 'ironia de um narrador que conversa com o leitor.', 'fuga do eu lírico para a natureza amena.', 'busca da perfeição formal do soneto.'],
        ans: 'B', pos: 'D', hab: 'H16', dif: 'média',
        ex: { B: '"formigava", "como bichos" (zoomorfização) e "feito do mesmo barro do lugar" (determinismo do meio).', A: 'não há idealização; é o oposto.', C: 'o narrador-conversador é traço machadiano.', D: 'a natureza amena é árcade.', E: 'o texto é prosa.' },
        traps: { C: 'autor' }
      }
    ],
    cards: [
      ['Barroco: marcas', 'Antítese, paradoxo, conflito fé × prazer'],
      ['Arcadismo: expressões latinas', 'Fugere urbem, carpe diem, locus amoenus'],
      ['3ª geração romântica', 'Condoreira, social, abolicionista: Castro Alves'],
      ['Marco do Realismo no Brasil', 'Memórias póstumas de Brás Cubas (1881), Machado de Assis'],
      ['Naturalismo', 'Determinismo e zoomorfização (O cortiço)'],
      ['Parnasianismo', 'Arte pela arte, rigor formal, soneto (Bilac)'],
      ['Maria Firmina dos Reis', 'Úrsula (1859), primeira romancista negra do Brasil']
    ],
    vf: [
      ['O Arcadismo valoriza a vida simples no campo e a razão.', true, 'Bucolismo e equilíbrio, em reação ao exagero barroco.'],
      ['Machado de Assis é o principal nome do Naturalismo brasileiro.', false, 'Machado é realista; o Naturalismo tem em Aluísio Azevedo seu nome central.'],
      ['A segunda geração romântica é marcada pelo pessimismo e pelo tema da morte.', true, 'É o "mal do século" de Álvares de Azevedo.'],
      ['O Parnasianismo defendia a linguagem coloquial e o verso livre.', false, 'Defendia o rigor formal; coloquialismo e verso livre são modernistas.']
    ]
  });

  L({
    module: {
      id: 'L9', title: 'Literatura II: Simbolismo, Pré-Modernismo e Modernismo', habs: 'H15, H16, H17', faixa: 'A',
      note: 'O Modernismo é o período literário mais cobrado no Enem: linguagem coloquial, verso livre, humor e crítica ao Brasil oficial.',
      html: `<h4>1. Simbolismo (fim do século XIX)</h4>
<p>Reação ao objetivismo parnasiano e realista: <strong>musicalidade</strong> (aliterações, assonâncias), <strong>sinestesia</strong>, espiritualidade, mistério, maiúsculas alegorizantes. <strong>Cruz e Sousa</strong> ("Ó Formas alvas, brancas, Formas claras") e Alphonsus de Guimaraens.</p>
<h4>2. Pré-Modernismo (1902–1922)</h4>
<p>Não é uma escola, mas um período de transição com <strong>denúncia da realidade brasileira</strong>:</p>
<ul>
<li><strong>Euclides da Cunha</strong>, <em>Os sertões</em> (1902): a Guerra de Canudos e o sertanejo ("o sertanejo é, antes de tudo, um forte").</li>
<li><strong>Lima Barreto</strong>, <em>Triste fim de Policarpo Quaresma</em>: o nacionalismo ingênuo e a crítica à República; racismo e exclusão no Rio.</li>
<li><strong>Monteiro Lobato</strong>, <em>Urupês</em>: o caipira Jeca Tatu.</li>
<li><strong>Augusto dos Anjos</strong>, <em>Eu</em> (1912): vocabulário científico, pessimismo, morte ("Vês?! Ninguém assistiu ao formidável / Enterro de tua última quimera").</li>
</ul>
<h4>3. Modernismo: primeira fase (1922–1930)</h4>
<p>A <strong>Semana de Arte Moderna</strong> (fevereiro de 1922, Theatro Municipal de São Paulo) marca a ruptura: <strong>verso livre</strong>, linguagem coloquial, <strong>humor e poema-piada</strong>, crítica ao academicismo e um nacionalismo crítico, que revê o passado colonial.</p>
<ul>
<li><strong>Oswald de Andrade:</strong> Manifesto da Poesia Pau-Brasil (1924) e <strong>Manifesto Antropófago</strong> (1928): "devorar" a cultura estrangeira para produzir algo brasileiro.</li>
<li><strong>Mário de Andrade:</strong> <em>Pauliceia desvairada</em> (1922) e <em>Macunaíma</em> (1928), o "herói sem nenhum caráter".</li>
<li><strong>Manuel Bandeira:</strong> "Os sapos", sátira aos parnasianos; poesia do cotidiano.</li>
<li>Nas artes: Anita Malfatti e Tarsila do Amaral (<em>Abaporu</em>, 1928).</li>
</ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>"Dê-me um cigarro / Diz a gramática / Do professor e do aluno / E do mulato sabido / Mas o bom negro e o bom branco / Da Nação Brasileira / Dizem todos os dias / Deixa disso camarada / Me dá um cigarro" (Oswald de Andrade, "Pronominais"). O poema valoriza o português falado no Brasil contra a regra lusitana de colocação pronominal.</p></div>
<h4>4. Segunda fase (1930–1945)</h4>
<ul>
<li><strong>Poesia:</strong> Carlos Drummond de Andrade (inquietação existencial e social), Cecília Meireles (lirismo, transitoriedade), Vinicius de Moraes, Murilo Mendes.</li>
<li><strong>Romance de 30 (regionalista e social):</strong> Rachel de Queiroz (<em>O quinze</em>, a seca de 1915), <strong>Graciliano Ramos</strong> (<em>Vidas secas</em>, 1938; <em>São Bernardo</em>), José Lins do Rego (<em>Menino de engenho</em>), Jorge Amado (<em>Capitães da areia</em>).</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p>Em <em>Vidas secas</em>, a linguagem seca e econômica imita a aridez do sertão e a dificuldade de expressão das personagens. A forma reforça o tema: é uma das relações que o Enem mais cobra.</p></div>
<h4>5. Terceira fase (pós-1945)</h4>
<ul>
<li><strong>Clarice Lispector:</strong> fluxo de consciência, epifania (momento de revelação), introspecção (<em>A hora da estrela</em>, com Macabéa).</li>
<li><strong>Guimarães Rosa:</strong> invenção de palavras (neologismos), sertão como universo, oralidade recriada (<em>Grande sertão: veredas</em>, 1956).</li>
<li><strong>João Cabral de Melo Neto:</strong> poesia construída, antilírica, "engenharia" do poema; <em>Morte e vida severina</em>.</li>
</ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Os comandos pedem a <strong>ruptura</strong> modernista (verso livre, coloquialismo, humor contra o academicismo) e a relação entre <strong>forma e tema</strong> (a secura de Graciliano, a invenção de Rosa, a epifania de Clarice).</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Nacionalismo romântico × nacionalismo modernista: o romântico <strong>idealiza</strong> o Brasil e o indígena; o modernista <strong>revê criticamente</strong> o passado, com humor e paródia (Oswald parodia a "Canção do exílio" e a Carta de Caminha).</p></div>`,
      resumo: [
        ['Simbolismo', 'Musicalidade, sinestesia, espiritualidade; Cruz e Sousa'],
        ['Pré-Modernismo', 'Denúncia da realidade: Euclides, Lima Barreto, Lobato, Augusto dos Anjos'],
        ['Semana de 1922', 'Ruptura: verso livre, coloquialismo, humor'],
        ['Antropofagia', 'Oswald (1928): devorar o estrangeiro para criar o brasileiro'],
        ['Macunaíma', 'Mário de Andrade (1928): "herói sem nenhum caráter"'],
        ['Romance de 30', 'Regionalismo social: O quinze, Vidas secas'],
        ['3ª fase', 'Clarice (epifania), Guimarães Rosa (neologismos), João Cabral (poesia construída)']
      ]
    },
    questions: [
      {
        id: 'L9.1', base: ['"Dê-me um cigarro / Diz a gramática / Do professor e do aluno / E do mulato sabido / Mas o bom negro e o bom branco / Da Nação Brasileira / Dizem todos os dias / Deixa disso camarada / Me dá um cigarro"'],
        src: 'ANDRADE, O. Pronominais. Domínio público.', cmd: 'O poema dialoga com uma proposta da primeira fase modernista ao',
        alts: ['defender a colocação pronominal da norma lusitana.', 'valorizar a variedade do português falado no Brasil.', 'imitar a linguagem rebuscada dos parnasianos.', 'idealizar o indígena como herói nacional.', 'lamentar a decadência moral da sociedade.'],
        ans: 'B', pos: 'D', hab: 'H16', dif: 'média',
        ex: { B: 'opõe "Dê-me" (gramática) a "Me dá" (fala de todos os dias) e fica com a fala brasileira.', A: 'é o contrário: o poema ironiza a regra. Termo oposto.', C: 'o poema é coloquial e anti-parnasiano.', D: 'o indianismo idealizado é romântico.', E: 'não há lamento moral.' },
        traps: { A: 'oposto', D: 'autor' }
      },
      {
        id: 'L9.2', base: ['"Na planície avermelhada os juazeiros alargavam duas manchas verdes."'],
        src: 'RAMOS, G. Vidas secas. Domínio público.', cmd: 'A frase de abertura do romance antecipa uma característica de Vidas secas, que é a',
        alts: ['linguagem enxuta, que se ajusta à paisagem árida do sertão.', 'invenção de palavras e de sintaxe próprias do sertanejo.', 'idealização da natureza como lugar de felicidade.', 'narração em fluxo de consciência de uma personagem urbana.', 'musicalidade intensa obtida com sinestesias.'],
        ans: 'A', pos: 'B', hab: 'H16', dif: 'média',
        ex: { A: 'frase curta, poucos adjetivos e as manchas verdes raras na planície: forma seca para um mundo seco.', B: 'a invenção de palavras é marca de Guimarães Rosa.', C: 'o sertão não é idealizado.', D: 'o fluxo de consciência urbano lembra Clarice.', E: 'musicalidade e sinestesia são simbolistas.' },
        traps: { B: 'autor', D: 'autor' }
      },
      {
        id: 'L9.3', base: ['"Ó Formas alvas, brancas, Formas claras / De luares, de neves, de neblinas!"'],
        src: 'SOUSA, C. Broquéis. Domínio público.', cmd: 'Os versos apresentam traços do Simbolismo, como',
        alts: ['a linguagem coloquial e o humor.', 'a musicalidade e as imagens vagas, espiritualizadas.', 'a denúncia social e o tom panfletário.', 'o vocabulário científico e a visão materialista.', 'a narração objetiva de fatos históricos.'],
        ans: 'B', hab: 'H15', dif: 'fácil',
        ex: { B: 'repetição sonora (Formas... Formas), maiúscula alegórica e imagens brancas e difusas (luares, neves, neblinas).', A: 'coloquialismo e humor são modernistas.', C: 'não há denúncia.', D: 'o vocabulário científico lembra Augusto dos Anjos.', E: 'não há narração.' },
        traps: { D: 'autor' }
      },
      {
        id: 'L9.4', base: ['"No fundo do mato-virgem nasceu Macunaíma, herói de nossa gente."'],
        src: 'ANDRADE, M. Macunaíma. Domínio público.', cmd: 'O romance de Mário de Andrade, que se abre com essa frase, propõe',
        alts: ['um herói idealizado, de caráter nobre e cavalheiresco.', 'uma síntese crítica e bem-humorada das contradições da cultura brasileira.', 'uma descrição científica da Amazônia.', 'uma defesa da imitação dos modelos europeus.', 'um retrato ultrarromântico do amor e da morte.'],
        ans: 'B', pos: 'A', hab: 'H17', dif: 'média',
        ex: { B: 'Macunaíma, "herói sem nenhum caráter", mistura mitos, línguas e regiões com humor para pensar o Brasil.', A: 'o herói é anti-herói; a idealização é romântica.', C: 'não há descrição científica.', D: 'o modernismo critica a imitação.', E: 'não há ultrarromantismo.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L9.5', base: ['"Vês?! Ninguém assistiu ao formidável / Enterro de tua última quimera."'],
        src: 'ANJOS, A. Versos íntimos. Domínio público.', cmd: 'Os versos de Augusto dos Anjos expressam',
        alts: ['otimismo diante das conquistas da ciência.', 'pessimismo e solidão diante da perda das ilusões.', 'exaltação patriótica da natureza brasileira.', 'alegria pela vida simples no campo.', 'devoção religiosa e esperança na salvação.'],
        ans: 'B', pos: 'E', hab: 'H16', dif: 'fácil',
        ex: { B: 'o "enterro" da "última quimera" (ilusão), sem testemunhas, é imagem de desilusão e solidão.', A: 'não há otimismo.', C: 'não há exaltação da pátria.', D: 'a vida no campo é tema árcade.', E: 'não há esperança religiosa.' },
        traps: { A: 'oposto' }
      }
    ],
    cards: [
      ['Simbolismo', 'Musicalidade, sinestesia, espiritualidade (Cruz e Sousa)'],
      ['Os sertões (1902)', 'Euclides da Cunha: Guerra de Canudos'],
      ['Semana de Arte Moderna', 'Fevereiro de 1922, Theatro Municipal de São Paulo'],
      ['Manifesto Antropófago', 'Oswald, 1928: devorar o estrangeiro'],
      ['Vidas secas', 'Graciliano Ramos, 1938: linguagem seca para o sertão seco'],
      ['Guimarães Rosa', 'Neologismos e sertão universal'],
      ['Clarice Lispector', 'Introspecção e epifania']
    ],
    vf: [
      ['O Pré-Modernismo é uma escola literária com manifesto próprio.', false, 'É um período de transição, com autores de estilos diferentes unidos pela denúncia da realidade.'],
      ['A primeira fase modernista usou o humor e o verso livre contra o academicismo.', true, 'Poema-piada, coloquialismo e ruptura formal.'],
      ['O nacionalismo modernista repete a idealização romântica do indígena.', false, 'O modernismo revê o passado com crítica e paródia.'],
      ['Em Vidas secas, a linguagem econômica reforça o tema da aridez.', true, 'Forma e tema caminham juntos.']
    ]
  });

  L({
    module: {
      id: 'L10', title: 'Literatura III: contemporânea, afro-brasileira, indígena e periférica', habs: 'H15, H16, H17, H25, H27', faixa: 'A',
      note: 'O Enem vem dando espaço crescente a autoras negras, indígenas e periféricas. As questões cobram identidade, memória, ancestralidade e denúncia social.',
      html: `<h4>1. Vanguardas da segunda metade do século XX</h4>
<ul>
<li><strong>Concretismo</strong> (a partir de 1956): poema como objeto visual; o espaço da página, a forma das letras e a disposição das palavras produzem sentido. Augusto de Campos, Haroldo de Campos, Décio Pignatari.</li>
<li><strong>Poesia marginal</strong> (anos 1970): livros mimeografados, linguagem coloquial e irreverente, cotidiano, humor; circulava fora do mercado editorial. Ana Cristina Cesar, Chacal, Paulo Leminski (próximo do grupo).</li>
</ul>
<h4>2. Literatura afro-brasileira</h4>
<p>Produção que assume o ponto de vista de sujeitos negros, com temas de memória, ancestralidade, racismo e resistência.</p>
<ul>
<li><strong>Carolina Maria de Jesus</strong>, <em>Quarto de despejo</em> (1960): diário de uma catadora na favela do Canindé, em São Paulo.</li>
<li><strong>Conceição Evaristo</strong>: criou o conceito de <strong>escrevivência</strong>, escrita que nasce da vivência, sobretudo das mulheres negras (<em>Ponciá Vicêncio</em>, <em>Olhos d'água</em>).</li>
<li>Itamar Vieira Junior, <em>Torto arado</em> (2019): trabalhadores rurais negros no sertão da Bahia e a luta pela terra.</li>
</ul>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Escrevivência</strong> (Conceição Evaristo): a experiência de quem escreve, marcada por raça, gênero e classe, torna-se matéria literária e memória coletiva. Não é autobiografia simples: é a vivência individual que fala por muitas.</p></div>
<h4>3. Literatura indígena</h4>
<p>Autores indígenas escrevendo sobre si mesmos, e não sendo apenas personagens idealizados por outros (como no Romantismo). Temas: <strong>ancestralidade, relação com a terra, oralidade, crítica ao modelo de desenvolvimento</strong>. Ailton Krenak (<em>Ideias para adiar o fim do mundo</em>), Daniel Munduruku, Eliane Potiguara.</p>
<div class="box conexao"><b class="box-t">Conexão</b><p>A Lei 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira, e a Lei 11.645/2008 incluiu a indígena. Isso ajuda a explicar a presença crescente desses textos no Enem, e o tema conversa com Sociologia (identidade, racismo, movimentos sociais).</p></div>
<h4>4. Literatura periférica, slam e rap</h4>
<p>Escritores das periferias urbanas publicam por conta própria, em saraus e coletivos (como a Cooperifa, em São Paulo), com linguagem da rua e denúncia da violência e da desigualdade. Ferréz (<em>Capão pecado</em>), Sérgio Vaz. O <strong>slam</strong> (batalha de poesia falada) e o <strong>rap</strong> (Racionais MC's) entram no Enem como gêneros de crítica social e afirmação de identidade.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Os comandos pedem o que o texto <strong>evidencia, denuncia ou valoriza</strong>: memória ancestral, identidade, protagonismo de sujeitos historicamente silenciados, crítica à desigualdade. A resposta quase sempre está na <strong>voz</strong> de quem fala.</p></div>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Alternativas que leem esses textos como "exóticos", "folclóricos" ou como simples descrição de costumes costumam estar erradas. E a literatura indígena contemporânea não idealiza o indígena: ela o apresenta como sujeito que fala de si e critica a sociedade não indígena.</p></div>`,
      resumo: [
        ['Concretismo', 'Poema visual; espaço da página produz sentido (1956)'],
        ['Poesia marginal', 'Anos 1970: mimeógrafo, coloquialismo, cotidiano'],
        ['Carolina Maria de Jesus', 'Quarto de despejo (1960): diário da favela'],
        ['Escrevivência', 'Conceição Evaristo: a vivência que vira memória coletiva'],
        ['Literatura indígena', 'Autores indígenas falando de si: Krenak, Munduruku, Potiguara'],
        ['Literatura periférica', 'Saraus, slam, rap; denúncia e identidade'],
        ['Leis 10.639 e 11.645', 'Ensino de cultura afro-brasileira e indígena']
      ]
    },
    questions: [
      {
        id: 'L10.1', base: ['A minha avó contava histórias enquanto debulhava o milho. Hoje eu escrevo com as mãos dela: cada palavra minha carrega a voz das mulheres que vieram antes, e que nunca puderam escrever.'],
        src: 'Texto escrito para esta apostila.', cmd: 'O trecho se aproxima do conceito de escrevivência, formulado por Conceição Evaristo, porque',
        alts: ['apresenta uma biografia objetiva da autora, com datas e locais.', 'transforma a experiência pessoal em memória coletiva de mulheres silenciadas.', 'descreve técnicas agrícolas tradicionais.', 'idealiza a vida no campo como lugar sem conflitos.', 'defende a separação entre literatura e vida.'],
        ans: 'B', pos: 'C', hab: 'H16', dif: 'média',
        ex: { B: 'a narradora escreve "com as mãos" da avó e fala pelas mulheres "que nunca puderam escrever": vivência individual que vira memória coletiva.', A: 'não há dados biográficos objetivos.', C: 'o milho é cenário, não tema técnico.', D: 'não há idealização; há a memória de quem foi silenciado.', E: 'é o contrário: literatura e vida se unem. Termo oposto.' },
        traps: { E: 'oposto', C: 'detalhe' }
      },
      {
        id: 'L10.2', base: ['<em>Poema visual:</em> a palavra "terra" é repetida dezenas de vezes formando o desenho de um mapa; no centro, onde deveria estar a palavra, há um espaço em branco com o formato de uma cerca.'],
        src: 'Descrição de poema criado para esta apostila.', cmd: 'O poema se vincula ao Concretismo porque',
        alts: ['usa a disposição gráfica das palavras para construir sentido.', 'narra uma história em versos rimados.', 'expressa sentimentos íntimos do eu lírico.', 'imita a linguagem dos sermões barrocos.', 'segue a forma fixa do soneto.'],
        ans: 'A', pos: 'E', hab: 'H17', dif: 'fácil',
        ex: { A: 'a forma visual (mapa, vazio em forma de cerca) é parte do sentido: crítica à concentração de terra.', B: 'não há narrativa rimada.', C: 'não há eu lírico confessional.', D: 'não há relação com sermões.', E: 'não há soneto.' }
      },
      {
        id: 'L10.3', base: ['"Os brancos acham que a terra é uma coisa para usar. Para nós, a terra é parente: a gente não vende a avó."'],
        src: 'Texto escrito para esta apostila, inspirado em temas da literatura indígena contemporânea.', cmd: 'A fala expressa uma perspectiva presente na literatura indígena contemporânea, que é a',
        alts: ['valorização da terra como mercadoria.', 'relação de parentesco e pertencimento com a terra, em contraste com a lógica de exploração.', 'idealização romântica do indígena como herói europeu.', 'defesa da venda de terras para o desenvolvimento.', 'descrição folclórica de costumes exóticos.'],
        ans: 'B', pos: 'D', hab: 'H16', dif: 'fácil',
        ex: { B: '"a terra é parente" se opõe à terra como "coisa para usar": pertencimento × exploração.', A: 'é a visão criticada. Termo oposto.', C: 'o indígena fala de si; não é o herói romântico.', D: 'a fala rejeita a venda.', E: 'ler como "exótico" é a leitura que o texto contesta.' },
        traps: { A: 'oposto', E: 'exagero' }
      },
      {
        id: 'L10.4', base: ['<em>Trecho de um diário escrito para esta apostila, no estilo de Quarto de despejo:</em>', '"15 de maio. Hoje não teve janta. Juntei papel o dia todo e o dinheiro só deu para o pão. As crianças dormiram cedo, que é o jeito de não sentir fome."'],
        src: 'Texto escrito para esta apostila.', cmd: 'Assim como em Quarto de despejo, de Carolina Maria de Jesus, o gênero diário permite',
        alts: ['registrar o cotidiano da fome a partir da voz de quem a vive.', 'apresentar dados estatísticos sobre a pobreza urbana.', 'criar personagens fictícias de outra classe social.', 'idealizar a pobreza como modo de vida simples.', 'defender a ordem política vigente.'],
        ans: 'A', hab: 'H17', dif: 'fácil',
        ex: { A: 'datas, primeira pessoa e detalhes do dia a dia dão voz direta a quem vive a fome.', B: 'não há estatísticas.', C: 'a voz é de quem vive a situação, não de um observador de outra classe.', D: 'a fome não é idealizada.', E: 'não há defesa política.' }
      },
      {
        id: 'L10.5', base: ['<em>Verso de um slam escrito para esta apostila:</em>', '"Me chamaram de periferia como se fosse defeito; / periferia é o centro de quem nasceu nela."'],
        src: 'Texto escrito para esta apostila.', cmd: 'O verso promove',
        alts: ['a ressignificação positiva da periferia como lugar de identidade.', 'a aceitação do estigma associado à periferia.', 'a descrição geográfica dos bairros afastados.', 'a defesa da mudança para o centro da cidade.', 'o uso da linguagem formal acadêmica.'],
        ans: 'A', pos: 'B', hab: 'H27', dif: 'fácil',
        ex: { A: 'o verso inverte o estigma ("defeito") e faz da periferia o "centro" de quem nasceu nela.', B: 'o verso recusa o estigma. Termo oposto.', C: 'não há descrição geográfica.', D: 'não há defesa da mudança.', E: 'a linguagem é oral e direta.' },
        traps: { B: 'oposto' }
      }
    ],
    cards: [
      ['Concretismo', 'Poema visual, a partir de 1956'],
      ['Poesia marginal', 'Anos 1970, mimeógrafo, coloquialismo'],
      ['Quarto de despejo', 'Carolina Maria de Jesus, 1960'],
      ['Escrevivência', 'Conceição Evaristo: vivência individual como memória coletiva'],
      ['Ailton Krenak', 'Ideias para adiar o fim do mundo: crítica ao modelo de desenvolvimento'],
      ['Slam', 'Batalha de poesia falada; crítica social e identidade']
    ],
    vf: [
      ['A literatura indígena contemporânea repete a idealização romântica do indígena.', false, 'Nela, o indígena é sujeito que fala de si e critica a sociedade não indígena.'],
      ['No Concretismo, a disposição visual das palavras faz parte do sentido do poema.', true, 'O espaço da página é linguagem.'],
      ['Quarto de despejo é um diário escrito por uma catadora da favela do Canindé.', true, 'Carolina Maria de Jesus, publicado em 1960.'],
      ['Ler textos afro-brasileiros como descrição de costumes exóticos é a leitura esperada no Enem.', false, 'O Enem cobra identidade, memória e protagonismo, não exotismo.']
    ]
  });
})(window.DATA);
