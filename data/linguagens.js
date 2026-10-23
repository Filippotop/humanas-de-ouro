/* Humanas de Ouro: linha L (Linguagens, Códigos e suas Tecnologias).
   Cada módulo segue o formato dos módulos de Humanas: teoria em camadas (com quadros .box),
   resumo, questões inéditas no estilo do Enem (explicação para cada alternativa), cartões e V ou F.
   Textos-base: escritos para esta apostila ou de domínio público. Habilidades: Matriz de Referência do Enem (Inep). */
(function (D) {
  function L(x) {
    x.module.vol = 'LC'; x.module.line = 'L';
    x.module.qs = x.questions.map(q => q.id);
    D.modules.push(x.module);
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
        ans: 'B', hab: 'H21', dif: 'fácil',
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
        ans: 'B', hab: 'H16', dif: 'média',
        ex: { B: 'o título faz trocadilho com "erro" e o poema inverte os papéis: com sol, o indígena teria "despido" o português. É ironia contra a imposição cultural.', A: 'o poema critica, não celebra. Termo oposto.', C: 'a chuva é recurso para a ironia, não descrição objetiva.', D: 'quem é vestido é o indígena; a leitura inverte o poema.', E: 'não há defesa de ensino; "erro de português" é trocadilho.' },
        traps: { A: 'oposto' }
      },
      {
        id: 'L1.4', base: ['Em uma questão, o comando pede "o efeito de sentido produzido pela repetição da palavra <em>nunca</em>" em um poema.'],
        src: 'Situação escrita para esta apostila.', cmd: 'Para responder a esse comando, o estudante deve procurar, no texto,',
        alts: ['o significado da palavra "nunca" no dicionário.', 'a biografia do autor do poema.', 'o que a repetição provoca no leitor ou no sentido do poema, como ênfase ou angústia.', 'o número exato de vezes em que a palavra aparece.', 'a escola literária a que o poema pertence.'],
        ans: 'C', hab: 'H17', dif: 'fácil',
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
})(window.DATA);
