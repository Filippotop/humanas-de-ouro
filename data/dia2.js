/* Humanas de Ouro: linhas N (Natureza e suas Tecnologias) e M (Matemática e suas Tecnologias), 2º dia do Enem.
   O conteúdo fica em DATA.dia2 e só entra no app depois que o dia 2 é liberado (applyDia2, no index.html).
   Mesmo formato dos módulos de Linguagens: teoria em camadas, resumo, questões inéditas com explicação de cada
   alternativa, cartões e V ou F. Habilidades: Matriz de Referência do Enem (Inep).
   Esta primeira leva cobre temas que caem todo ano. A ordem dos próximos módulos vem dos erros nas provas oficiais do dia 2. */
(function (D) {
  const X = D.dia2 = { modules: [], questions: [], cards: [], vf: [], applied: false };
  /* pos: posição final da alternativa correta (que é escrita sempre como A). Troca de lugar com a alternativa que
     estava lá e remapeia explicações e armadilhas, para o gabarito não se concentrar numa letra. */
  function placeAnswer(q, to) {
    const K = 'ABCDE', i = K.indexOf(q.ans), j = K.indexOf(to);
    [q.alts[i], q.alts[j]] = [q.alts[j], q.alts[i]];
    const swap = o => { const r = Object.assign({}, o); delete r[q.ans]; delete r[to]; if (o[q.ans] !== undefined) r[to] = o[q.ans]; if (o[to] !== undefined) r[q.ans] = o[to]; return r; };
    q.ex = swap(q.ex || {}); q.traps = swap(q.traps || {}); q.ans = to;
  }
  function add(line, vol, x) {
    x.module.vol = vol; x.module.line = line;
    x.module.qs = x.questions.map(q => q.id);
    X.modules.push(x.module);
    x.questions.forEach(q => { if (q.pos && q.pos !== q.ans) placeAnswer(q, q.pos); delete q.pos; });
    x.questions.forEach((q, i) => { q.vol = vol; q.mod = x.module.id; q.n = i + 1; q.kind = q.kind || 'fixacao'; q.tag = q.tag || 'Inédita, estilo ENEM'; q.traps = q.traps || {}; X.questions.push(q); });
    x.cards.forEach((c, i) => X.cards.push({ id: x.module.id + '-c' + i, vol: vol, q: c[0], a: c[1] }));
    x.vf.forEach((v, i) => X.vf.push({ id: 'vf-' + x.module.id + '-' + i, mod: x.module.id, s: v[0], v: v[1], why: v[2] }));
  }
  const SRC = 'Texto escrito para esta apostila.';

  /* ================= MATEMÁTICA ================= */
  add('M', 'MT', {
    module: {
      id: 'M1', title: 'Proporção, porcentagem e escala', habs: 'H3, H11 e H15 a H18 (números, escala e variação de grandezas)', faixa: 'A',
      note: 'É o assunto que mais aparece em Matemática: quase todo problema "de contexto" é uma razão disfarçada. Domine a regra de três, o fator de multiplicação da porcentagem e as unidades.',
      html: `<h4>1. O que a prova mede</h4>
<p>A prova de Matemática tem <strong>45 questões</strong> no segundo dia. Boa parte delas não pede uma fórmula difícil: pede que você <strong>reconheça a relação entre duas grandezas</strong> (quantidade e preço, distância e tempo, operários e dias) e faça a conta com cuidado. Por isso razão, proporção e porcentagem valem mais pontos do que qualquer tópico "avançado".</p>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Razão</strong> é a divisão de duas grandezas (km por hora, reais por quilo). <strong>Proporção</strong> é a igualdade entre duas razões. Duas grandezas são <strong>diretamente proporcionais</strong> quando uma cresce e a outra cresce na mesma razão, e <strong>inversamente proporcionais</strong> quando uma cresce e a outra diminui nessa razão.</p></div>
<h4>2. Regra de três: direta ou inversa?</h4>
<p>O erro mais comum não é a conta, é <strong>escolher o tipo</strong>. Faça sempre a pergunta: "se eu aumentar a primeira grandeza, a segunda aumenta ou diminui?"</p>
<ul><li><strong>Aumenta junto</strong> (mais pão, mais dinheiro): direta. Monte a proporção e multiplique em cruz.</li><li><strong>Uma sobe, a outra desce</strong> (mais operários, menos dias): inversa. O produto das duas grandezas fica constante.</li></ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>8 máquinas fazem um serviço em 15 dias. Com 12 máquinas, no mesmo ritmo: 8 · 15 = 120 máquina-dia; 120 ÷ 12 = <strong>10 dias</strong>. Mais máquinas, menos dias: inversa.</p></div>
<h4>3. Porcentagem é multiplicação</h4>
<p>Porcentagem é uma razão de denominador 100. Na prática, use o <strong>fator de multiplicação</strong>: aumento de 20% multiplica por 1,20; desconto de 15% multiplica por 0,85; aumento de 5% multiplica por 1,05.</p>
<ul><li><strong>Variações sucessivas se multiplicam, não se somam.</strong> Um aumento de 25% seguido de um desconto de 20% dá 1,25 · 0,80 = 1,00: o preço volta ao original.</li><li>Para achar o valor original, <strong>divida</strong> pelo fator: se após um aumento de 10% o preço é R$ 330, o original era 330 ÷ 1,10 = R$ 300.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Dois erros clássicos. (1) Somar porcentagens de bases diferentes: +25% e −20% não dão +5%. (2) Confundir <strong>pontos percentuais</strong> com porcentagem: uma taxa que vai de 8% para 10% subiu <strong>2 pontos percentuais</strong>, que correspondem a um aumento de <strong>25%</strong> sobre a taxa anterior.</p></div>
<h4>4. Escala e unidades</h4>
<p>Escala 1:250.000 significa que 1 cm no mapa vale 250.000 cm na realidade, ou 2,5 km. Passe a distância do mapa para centímetros reais e só depois converta: 100 cm = 1 m e 100.000 cm = 1 km.</p>
<ul><li>Se as medidas lineares ficam k vezes maiores, a <strong>área</strong> fica k² vezes maior e o <strong>volume</strong> k³ vezes maior.</li><li>Conversões de tempo: 2,5 h é 2 h 30 min, <strong>não</strong> 2 h 50 min. A parte decimal da hora multiplica 60.</li></ul>
<h4>5. Como o Enem cobra e como conferir</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>O enunciado conta uma situação (obra, receita, viagem, promoção, mapa) e pergunta por um valor final, uma comparação ou "qual opção é mais vantajosa". Escreva a razão com unidade antes de calcular e <strong>desconfie de resultados absurdos</strong>: um pedreiro a mais não pode demorar mais dias, e um desconto não pode deixar o preço maior.</p></div>
<p>Antes de marcar, faça uma estimativa grosseira (arredondando) e veja se a alternativa está na ordem de grandeza certa. Isso elimina de duas a três opções em segundos.</p>`,
      resumo: [
        ['Razão', 'Divisão entre duas grandezas, com unidade (km/h, R$/kg)'],
        ['Direta ou inversa', 'Aumentei uma, a outra aumenta (direta) ou diminui (inversa)?'],
        ['Inversa', 'O produto das duas grandezas é constante (operário · dias)'],
        ['Fator de multiplicação', '+20% é ×1,20; −15% é ×0,85'],
        ['Variações sucessivas', 'Multiplicam-se; não se somam (+25% e −20% voltam ao original)'],
        ['Valor original', 'Divida o valor final pelo fator de multiplicação'],
        ['Pontos percentuais', 'Diferença entre duas taxas (8% para 10% = 2 pontos), diferente do aumento relativo (25%)'],
        ['Escala 1:N', '1 cm no mapa = N cm na realidade; converta para km no final'],
        ['Comprimento, área, volume', 'Fator k no comprimento: k² na área e k³ no volume']
      ]
    },
    questions: [
      {
        id: 'M1.1', base: ['Uma equipe de 6 operários pavimenta uma rua em 10 dias, todos trabalhando no mesmo ritmo e pelo mesmo número de horas por dia.'],
        src: SRC, cmd: 'Para terminar a mesma obra com 15 operários, mantido o ritmo, serão necessários',
        alts: ['4 dias.', '25 dias.', '16 dias.', '6 dias.', '2,5 dias.'],
        ans: 'A', pos: 'D', hab: 'H16', dif: 'fácil',
        ex: { A: 'mais operários, menos dias: grandezas inversas. 6 · 10 = 60 operário-dia; 60 ÷ 15 = 4 dias.', B: 'resulta de tratar como proporção direta (10 · 15 ÷ 6). Mais operários não podem demorar mais.', C: 'resulta de somar a diferença de operários aos dias (10 + 6), sem relação com a proporção.', D: 'seria o resultado com 10 operários, não com 15.', E: 'resulta de dividir 10 por 4, sem base no problema.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'M1.2', base: ['Uma loja aumentou em 25% o preço de um aparelho. Na semana seguinte, para estimular as vendas, concedeu um desconto de 20% sobre o preço já reajustado.'],
        src: SRC, cmd: 'Em relação ao preço original, o preço final do aparelho',
        alts: ['é igual ao original.', 'ficou 5% maior.', 'ficou 5% menor.', 'ficou 25% maior.', 'ficou 45% maior.'],
        ans: 'A', pos: 'B', hab: 'H3', dif: 'média',
        ex: { A: '1,25 · 0,80 = 1,00: o desconto de 20% sobre o preço maior compensa exatamente o aumento de 25%.', B: 'vem de somar +25% e −20%. As porcentagens têm bases diferentes e se multiplicam.', C: 'vem de errar o sinal da soma (20 − 25), com o mesmo erro de somar porcentagens.', D: 'ignora o desconto e mantém só o aumento.', E: 'soma 25% com 20%, ignorando que o segundo é desconto.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M1.3', base: ['Em um mapa rodoviário na escala 1:250.000, a distância em linha reta entre duas cidades mede 6 cm.'],
        src: SRC, cmd: 'A distância real entre as cidades, em quilômetros, é',
        alts: ['15.', '1,5.', '150.', '1.500.', '60.'],
        ans: 'A', pos: 'E', hab: 'H11', dif: 'fácil',
        ex: { A: '6 cm · 250.000 = 1.500.000 cm = 15.000 m = 15 km.', B: 'erra uma casa na conversão de unidades (divide por 10 a mais).', C: 'erra uma casa na conversão de unidades (multiplica por 10 a mais).', D: 'divide 1.500.000 cm por 1.000 em vez de 100.000 (1 km tem 100.000 cm).', E: 'cálculo sem relação com a escala (6 · 10).' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M1.4', base: ['Uma pesquisa mostrou que a taxa de desocupação em uma região passou de 8% para 10% da força de trabalho em um ano.'],
        src: SRC, cmd: 'Sobre essa variação, é correto afirmar que a taxa',
        alts: ['aumentou 2 pontos percentuais, o que equivale a um aumento de 25% em relação à taxa anterior.', 'aumentou 2%, pois passou de 8% para 10%.', 'aumentou 20% em relação à taxa anterior.', 'aumentou 2 pontos percentuais, equivalentes a 2% da taxa anterior.', 'aumentou 12,5% em relação à taxa anterior.'],
        ans: 'A', pos: 'A', hab: 'H17', dif: 'média',
        ex: { A: 'a diferença é 10 − 8 = 2 pontos percentuais; em relação à taxa anterior, 2 ÷ 8 = 0,25 = 25%.', B: 'trata a diferença entre taxas como se fosse porcentagem: a unidade é ponto percentual.', C: 'divide 2 por 10 (a taxa nova) em vez de pela taxa anterior (8).', D: 'acerta os pontos, mas erra o aumento relativo: 2 pontos sobre 8 não são 2%.', E: 'resulta de dividir 1 por 8; não corresponde à variação do problema.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M1.5', base: ['Um ciclista percorre 30 km em 1 h 30 min, mantendo velocidade constante. Ele pretende fazer um percurso de 50 km no mesmo ritmo.'],
        src: SRC, cmd: 'O tempo previsto para o percurso de 50 km é de',
        alts: ['2 h 30 min.', '2 h 50 min.', '3 h.', '2 h 15 min.', '2 h.'],
        ans: 'A', pos: 'C', hab: 'H16', dif: 'média',
        ex: { A: 'velocidade: 30 km ÷ 1,5 h = 20 km/h. Tempo: 50 ÷ 20 = 2,5 h = 2 h 30 min.', B: 'lê 2,5 h como "2 h 50 min". A parte decimal da hora multiplica 60: 0,5 · 60 = 30 min.', C: 'arredonda para cima; o cálculo exato dá 2,5 h.', D: 'não corresponde a nenhuma etapa do cálculo.', E: 'esse tempo corresponderia a 40 km, não a 50 km.' },
        traps: { B: 'detalhe' }
      }
    ],
    cards: [
      ['Como saber se uma regra de três é direta ou inversa?', 'Aumente a primeira grandeza: se a segunda aumenta, é direta; se diminui, é inversa'],
      ['Qual o fator de multiplicação de um aumento de 20%? E de um desconto de 15%?', '1,20 e 0,85'],
      ['+25% seguido de −20% dá quanto?', '1,25 · 0,80 = 1,00: volta ao valor original, sem ganho nem perda'],
      ['Como achar o preço original sabendo o preço após um aumento de 10%?', 'Divida por 1,10'],
      ['Taxa de 8% que vai para 10%: qual a variação?', '2 pontos percentuais; aumento relativo de 25%'],
      ['Mapa 1:250.000: quantos km real vale 1 cm?', '2,5 km (250.000 cm)'],
      ['Se o lado de um quadrado dobra, o que acontece com a área?', 'Fica 4 vezes maior (k²)'],
      ['2,5 horas são quantas horas e minutos?', '2 h 30 min (0,5 h = 30 min)']
    ],
    vf: [
      ['Um aumento de 30% seguido de um desconto de 30% devolve o preço original.', false, '1,30 · 0,70 = 0,91: o preço final fica 9% menor. Só volta ao original quando os fatores são inversos (1,25 e 0,80).'],
      ['Em grandezas inversamente proporcionais, o produto entre elas permanece constante.', true, 'Operários · dias de trabalho é constante: dobrar os operários divide os dias por dois.'],
      ['Uma taxa que passa de 5% para 6% teve aumento de 1%.', false, 'Teve aumento de 1 ponto percentual, que equivale a 20% sobre a taxa anterior.'],
      ['Se um objeto é ampliado com fator 3 em todas as dimensões, seu volume fica 27 vezes maior.', true, 'O volume cresce com o cubo do fator de ampliação: 3³ = 27.']
    ]
  });

  add('M', 'MT', {
    module: {
      id: 'M2', title: 'Estatística e probabilidade', habs: 'H27 a H30 (estatística e probabilidade)', faixa: 'A',
      note: 'Média, mediana, moda, desvio padrão e probabilidade simples respondem por uma fatia estável da prova, e as contas são curtas. O que decide é saber qual medida usar e por quê.',
      html: `<h4>1. O que a prova mede</h4>
<p>Estatística e probabilidade aparecem todo ano com tabelas, gráficos e situações do cotidiano (notas, salários, pesquisas, sorteios). A conta costuma ser curta: o desafio é <strong>ler o dado certo</strong> e <strong>escolher a medida adequada</strong>.</p>
<h4>2. Média, mediana e moda</h4>
<ul><li><strong>Média aritmética</strong>: soma dos valores dividida pela quantidade. É sensível a valores extremos.</li><li><strong>Média ponderada</strong>: cada valor multiplica seu peso; some e divida pela soma dos pesos.</li><li><strong>Mediana</strong>: valor central dos dados em ordem crescente. Com quantidade par, é a média dos dois centrais. Não é distorcida por valores extremos.</li><li><strong>Moda</strong>: o valor que mais se repete.</li></ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Notas 6 (peso 2) e 8 (peso 3): média ponderada = (6 · 2 + 8 · 3) ÷ 5 = 36 ÷ 5 = <strong>7,2</strong>. A média simples (7) seria errada, porque os pesos são diferentes.</p></div>
<h4>3. Dispersão: amplitude e desvio padrão</h4>
<p>A <strong>amplitude</strong> é a diferença entre o maior e o menor valor. O <strong>desvio padrão</strong> mede o quanto os dados se afastam, em geral, da média: quanto <strong>menor</strong> o desvio padrão, mais <strong>regulares</strong> (homogêneos) são os dados. Se duas máquinas têm a mesma média de produção, a de menor desvio padrão é a mais confiável.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "qual medida melhor representa", "qual candidato foi mais regular", "qual a probabilidade de". Quando aparece um valor muito fora do padrão (um salário altíssimo), a resposta quase sempre é a <strong>mediana</strong>, não a média. Quando comparam regularidade com médias iguais, vale o <strong>menor desvio padrão</strong>.</p></div>
<h4>4. Probabilidade</h4>
<p>Probabilidade é <strong>casos favoráveis ÷ casos possíveis</strong>, desde que os casos sejam igualmente prováveis. Regras que resolvem a maioria das questões:</p>
<ul><li><strong>E</strong> (eventos independentes): multiplica. Sortear duas vezes com reposição: P · P.</li><li><strong>OU</strong> (eventos que não ocorrem juntos): soma.</li><li><strong>Complementar</strong>: P(não A) = 1 − P(A). Útil para "pelo menos um".</li><li>Em conjuntos que se sobrepõem, evite contar duas vezes quem está na interseção.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Confundir <strong>com reposição</strong> e <strong>sem reposição</strong>: no segundo caso o total diminui a cada retirada. E confundir "pelo menos um" com "exatamente um" ao contar elementos de dois conjuntos.</p></div>
<h4>5. Ler tabelas e gráficos</h4>
<p>Antes de calcular, leia o <strong>título, a unidade e a escala dos eixos</strong>. Gráficos com eixo truncado (que não começa no zero) exageram diferenças. Em tabelas de frequência, cada valor vale pela quantidade de vezes que aparece: a média usa essa frequência como peso.</p>`,
      resumo: [
        ['Média ponderada', 'Soma de (valor · peso) dividida pela soma dos pesos'],
        ['Mediana', 'Valor central dos dados em ordem; com quantidade par, média dos dois centrais'],
        ['Moda', 'O valor que mais aparece'],
        ['Valores extremos', 'Distorcem a média; a mediana resiste a eles'],
        ['Amplitude', 'Maior valor menos menor valor'],
        ['Desvio padrão', 'Quanto menor, mais regulares os dados'],
        ['Probabilidade', 'Casos favoráveis divididos pelos casos possíveis'],
        ['Eventos independentes (E)', 'As probabilidades se multiplicam'],
        ['Complementar', 'P(não A) = 1 − P(A); bom para "pelo menos um"'],
        ['Com e sem reposição', 'Sem reposição, o total diminui a cada retirada']
      ]
    },
    questions: [
      {
        id: 'M2.1', base: ['Em uma disciplina, a nota final é a média ponderada de três avaliações: a primeira prova (peso 2), a segunda prova (peso 3) e um trabalho (peso 5). Uma estudante tirou 6,0 na primeira prova, 8,0 na segunda e 7,0 no trabalho.'],
        src: SRC, cmd: 'A nota final dessa estudante foi',
        alts: ['7,1.', '7,0.', '7,3.', '6,8.', '7,5.'],
        ans: 'A', pos: 'A', hab: 'H27', dif: 'fácil',
        ex: { A: '(6 · 2 + 8 · 3 + 7 · 5) ÷ 10 = (12 + 24 + 35) ÷ 10 = 7,1.', B: 'é a média aritmética simples (6 + 8 + 7) ÷ 3; ignora os pesos.', C: 'não corresponde a nenhuma combinação correta dos pesos.', D: 'erra a soma dos produtos ou divide por um total de pesos diferente de 10.', E: 'seria o resultado se o trabalho tivesse peso muito maior que o real.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M2.2', base: ['O salário mensal, em reais, dos sete funcionários de uma pequena empresa é: 1.500; 1.500; 1.800; 2.000; 2.200; 2.500 e 11.000 (o proprietário). Um jornal quer divulgar o "salário típico" nessa empresa.'],
        src: SRC, cmd: 'A medida que melhor representa o salário típico e o seu valor são',
        alts: ['a mediana, R$ 2.000, pois não é distorcida pelo salário mais alto.', 'a média, aproximadamente R$ 3.214, pois usa todos os valores.', 'a moda, R$ 1.500, pois é a menor remuneração.', 'a amplitude, R$ 9.500, pois mostra todos os valores.', 'a média, R$ 2.000, pois os valores se compensam.'],
        ans: 'A', pos: 'C', hab: 'H29', dif: 'média',
        ex: { A: 'com sete valores em ordem, o central (4º) é 2.000. O salário de 11.000 puxa a média para cima, mas não altera a mediana.', B: 'a conta da média está certa (22.500 ÷ 7), mas ela é inflada por um único valor extremo e não representa a maioria.', C: '1.500 é de fato a moda, mas é só o valor que se repete; não é o típico, e a justificativa "menor remuneração" não faz sentido estatístico.', D: 'a amplitude mede dispersão, não representa um valor típico.', E: 'a média não é 2.000; os valores não "se compensam" quando há um extremo.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M2.3', base: ['Uma fábrica de café testa quatro máquinas de embalar pacotes de 500 g. Em 200 pacotes cada, as quatro obtiveram média de 500 g. Os desvios padrão foram: máquina I, 4 g; máquina II, 9 g; máquina III, 2 g; máquina IV, 6 g.'],
        src: SRC, cmd: 'Para garantir pacotes o mais uniformes possível, a fábrica deve escolher a máquina',
        alts: ['III, de menor desvio padrão.', 'II, de maior desvio padrão.', 'I, por ser a primeira da lista.', 'IV, que tem desvio padrão intermediário.', 'qualquer uma, pois todas têm a mesma média.'],
        ans: 'A', pos: 'D', hab: 'H29', dif: 'fácil',
        ex: { A: 'com médias iguais, o menor desvio padrão indica dados menos espalhados em torno da média: pacotes mais uniformes.', B: 'o maior desvio padrão indica a maior irregularidade, exatamente o oposto do que se quer.', C: 'a ordem da lista não tem relação com a uniformidade.', D: 'o desvio padrão intermediário não é o mais regular.', E: 'a média igual não garante uniformidade: dois lotes podem ter a mesma média e dispersões bem diferentes.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'M2.4', base: ['Uma urna contém 10 bolas idênticas ao tato: 3 vermelhas, 5 azuis e 2 verdes. Retira-se uma bola ao acaso, anota-se a cor e ela é devolvida à urna. Em seguida, retira-se uma segunda bola.'],
        src: SRC, cmd: 'A probabilidade de as duas bolas retiradas serem azuis é',
        alts: ['25%.', 'cerca de 22%.', '50%.', '10%.', '75%.'],
        ans: 'A', pos: 'B', hab: 'H28', dif: 'média',
        ex: { A: 'com reposição, os eventos são independentes: (5/10) · (5/10) = 1/4 = 25%.', B: 'seria a probabilidade sem reposição: (5/10) · (4/9) = 2/9, cerca de 22%. O enunciado diz que a bola é devolvida.', C: 'é a probabilidade de uma só bola ser azul (5/10); falta multiplicar pelo segundo sorteio.', D: 'não corresponde a nenhum raciocínio válido para o problema.', E: 'soma 50% com 25%, sem base no enunciado.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M2.5', base: ['Em uma turma de 40 estudantes, 24 estudam inglês, 16 estudam espanhol e 6 estudam as duas línguas. Um estudante da turma é sorteado ao acaso.'],
        src: SRC, cmd: 'A probabilidade de o sorteado estudar exatamente uma dessas duas línguas é',
        alts: ['70%.', '85%.', '60%.', '40%.', '15%.'],
        ans: 'A', pos: 'E', hab: 'H28', dif: 'média',
        ex: { A: 'só inglês: 24 − 6 = 18; só espanhol: 16 − 6 = 10. Exatamente uma: 28 estudantes; 28 ÷ 40 = 70%.', B: 'é 34 ÷ 40: conta quem estuda pelo menos uma língua, incluindo os 6 que estudam as duas.', C: 'é 24 ÷ 40: só considera quem estuda inglês.', D: 'é 16 ÷ 40: só considera quem estuda espanhol.', E: 'é 6 ÷ 40: só considera quem estuda as duas.' },
        traps: { B: 'detalhe' }
      }
    ],
    cards: [
      ['Como calcular uma média ponderada?', 'Soma de (valor · peso) dividida pela soma dos pesos'],
      ['Quando a mediana representa melhor que a média?', 'Quando há valores extremos (outliers), que distorcem a média'],
      ['Mediana de uma quantidade par de dados?', 'Média dos dois valores centrais, com os dados em ordem'],
      ['O que um desvio padrão menor indica?', 'Dados mais próximos da média, ou seja, mais regulares'],
      ['Como calcular a probabilidade de um evento?', 'Casos favoráveis ÷ casos possíveis (igualmente prováveis)'],
      ['Dois sorteios independentes: como combinar as probabilidades?', 'Multiplica (evento A E evento B)'],
      ['Como resolver "a probabilidade de pelo menos um"?', 'Calcule 1 menos a probabilidade de nenhum (o complementar)'],
      ['Em dois conjuntos que se sobrepõem, como contar quem está em exatamente um?', 'Total de cada conjunto menos a interseção, para cada um, e some']
    ],
    vf: [
      ['A média aritmética é sempre a melhor medida para representar um conjunto de dados.', false, 'Valores extremos distorcem a média; nesses casos a mediana representa melhor.'],
      ['Duas máquinas com a mesma média podem ter regularidades diferentes.', true, 'A média diz o centro; a regularidade vem do desvio padrão.'],
      ['Ao sortear sem reposição, a probabilidade do segundo sorteio depende do resultado do primeiro.', true, 'O total de elementos diminui, e o número de favoráveis pode mudar.'],
      ['A probabilidade de um evento pode valer 130%.', false, 'Probabilidade fica sempre entre 0 e 1 (0% e 100%).']
    ]
  });

  /* ================= NATUREZA ================= */
  add('N', 'CN', {
    module: {
      id: 'N1', title: 'Eletricidade: potência, energia e circuitos', habs: 'H5 e H6 (dispositivos e circuitos elétricos de uso cotidiano)', faixa: 'A',
      note: 'Conta de luz, chuveiro, fusível e lâmpadas em série ou paralelo caem todo ano. A física é pouca; o que pesa é separar potência (W) de energia (kWh) e cuidar das unidades.',
      html: `<h4>1. O que a prova mede</h4>
<p>Em Física, o Enem prefere <strong>situações domésticas</strong>: aparelhos com potência e tensão na etiqueta, conta de energia, circuitos de casa. As fórmulas são poucas e vêm de três grandezas: <strong>tensão U</strong> (volts), <strong>corrente i</strong> (ampères) e <strong>resistência R</strong> (ohms).</p>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Primeira lei de Ohm</strong>: U = R · i. Para uma mesma tensão, quanto <strong>menor a resistência</strong>, <strong>maior a corrente</strong>. A <strong>potência elétrica</strong> é a taxa de energia por tempo: P = U · i, o que também dá P = R · i² e P = U² ÷ R.</p></div>
<h4>2. Potência (W) não é energia (kWh)</h4>
<p><strong>Potência</strong> diz quanto de energia o aparelho usa por segundo; <strong>energia</strong> é o total usado num intervalo: E = P · Δt. A conta de luz cobra <strong>energia em quilowatt-hora (kWh)</strong>: potência em kW multiplicada pelo tempo em horas.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Uma lâmpada de 100 W (0,1 kW) acesa 5 h por dia, por 30 dias: 0,1 · 5 · 30 = <strong>15 kWh</strong>. Se o kWh custa R$ 0,80, o gasto é R$ 12,00.</p></div>
<h4>3. Circuitos em série e em paralelo</h4>
<ul><li><strong>Série</strong>: um só caminho. A corrente é a mesma em todos; a tensão se divide. Resistência equivalente = soma. Se um elemento queima, <strong>o circuito abre e todos apagam</strong>.</li><li><strong>Paralelo</strong>: vários caminhos. A tensão é a mesma em todos; a corrente se divide. O inverso da resistência equivalente é a soma dos inversos, e o resultado é <strong>menor que a menor resistência</strong>. Se um queima, os outros continuam funcionando.</li></ul>
<p>As tomadas e lâmpadas de uma casa são ligadas <strong>em paralelo</strong>, por isso cada aparelho recebe a mesma tensão e funciona independentemente.</p>
<h4>4. Chuveiro, disjuntor e fusível</h4>
<p>Com a tensão da rede fixa, P = U² ÷ R mostra que <strong>menos resistência significa mais potência</strong>. É por isso que, no chuveiro elétrico, a posição "inverno" usa uma parte menor do resistor (menor resistência, maior corrente, água mais quente).</p>
<p>A corrente que o aparelho puxa vale i = P ÷ U. O <strong>disjuntor</strong> (ou fusível) é dimensionado para a corrente do circuito: se a corrente ultrapassa o limite, ele desliga e protege a fiação do aquecimento.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "o consumo mensal de energia, em kWh", "a corrente elétrica no aparelho", "o que ocorre com as demais lâmpadas se uma queimar", "qual a posição do seletor de maior potência". Escreva primeiro P, U, i e t com unidades.</p></div>
<h4>5. Cuidados com unidades</h4>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>(1) Usar minutos como se fossem horas: 30 min é 0,5 h. (2) Misturar W com kW: 5.500 W = 5,5 kW. (3) Dizer que um aparelho de "maior potência" gasta mais por si só: o gasto depende também do <strong>tempo de uso</strong>. Um chuveiro de 5.500 W ligado 15 min gasta menos energia que uma lâmpada de 100 W ligada 60 h.</p></div>`,
      resumo: [
        ['Lei de Ohm', 'U = R · i'],
        ['Potência elétrica', 'P = U · i = R · i² = U² ÷ R'],
        ['Energia', 'E = P · Δt; na conta de luz, kWh = kW · horas'],
        ['Conversões', '1 kW = 1.000 W; 30 min = 0,5 h'],
        ['Série', 'Mesma corrente; tensões se dividem; R equivalente = soma; se um queima, todos apagam'],
        ['Paralelo', 'Mesma tensão; correntes se dividem; R equivalente menor que a menor'],
        ['Rede doméstica', 'Aparelhos ligados em paralelo'],
        ['Chuveiro no inverno', 'Menor resistência, maior corrente, maior potência (tensão fixa)'],
        ['Corrente do aparelho', 'i = P ÷ U; o disjuntor é dimensionado por ela']
      ]
    },
    questions: [
      {
        id: 'N1.1', base: ['Um chuveiro elétrico de potência 5.500 W é usado durante 30 minutos por dia, todos os dias de um mês de 30 dias.'],
        src: SRC, cmd: 'O consumo de energia elétrica desse chuveiro no mês, em kWh, é',
        alts: ['82,5.', '165.', '2.475.', '5,5.', '41,25.'],
        ans: 'A', pos: 'B', hab: 'H5', dif: 'média',
        ex: { A: '5,5 kW · 0,5 h · 30 dias = 82,5 kWh.', B: 'usa 1 h por dia (5,5 · 1 · 30) em vez de 30 minutos.', C: 'multiplica por 30 duas vezes (82,5 · 30): conta os dias em dobro.', D: 'é só a potência em kW: falta multiplicar pelo tempo de uso.', E: 'corresponde a 15 dias de uso, não 30.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N1.2', base: ['Na etiqueta de um chuveiro elétrico lê-se: "4.400 W e 220 V". Ele será instalado em um circuito da residência com essa tensão.'],
        src: SRC, cmd: 'A corrente elétrica que percorre o chuveiro em funcionamento é, em ampères, de',
        alts: ['20.', '0,05.', '968.000.', '4.620.', '200.'],
        ans: 'A', pos: 'D', hab: 'H5', dif: 'fácil',
        ex: { A: 'P = U · i, logo i = P ÷ U = 4.400 ÷ 220 = 20 A.', B: 'inverte a divisão (220 ÷ 4.400).', C: 'multiplica potência por tensão; a relação é divisão.', D: 'soma potência e tensão, grandezas diferentes.', E: 'erra uma casa decimal da divisão correta.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N1.3', base: ['Três lâmpadas idênticas estão ligadas em paralelo a uma bateria, e as três acendem com o mesmo brilho. Depois de algum tempo, o filamento de uma delas se rompe.'],
        src: SRC, cmd: 'Após o rompimento, as outras duas lâmpadas',
        alts: ['continuam acesas, com o mesmo brilho de antes.', 'apagam, porque o circuito fica aberto.', 'passam a brilhar menos, pois a corrente se divide em menos caminhos.', 'passam a brilhar mais, pois recebem a corrente da lâmpada queimada.', 'passam a brilhar mais, pois a tensão da bateria sobe.'],
        ans: 'A', pos: 'A', hab: 'H6', dif: 'fácil',
        ex: { A: 'no paralelo, cada lâmpada fica submetida à mesma tensão da bateria e tem seu próprio caminho. A que queimou deixa de conduzir, mas as outras não são afetadas.', B: 'é o que ocorreria em uma ligação em série, em que há um só caminho.', C: 'o brilho depende da tensão sobre cada lâmpada, que não muda.', D: 'a corrente de cada ramo depende da sua própria resistência; não há "transferência".', E: 'a tensão da bateria é característica dela e não depende do número de lâmpadas (bateria ideal).' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N1.4', base: ['Um técnico liga dois resistores, de 6 Ω e de 3 Ω, em paralelo, e precisa informar a resistência equivalente do conjunto.'],
        src: SRC, cmd: 'A resistência equivalente é, em ohms, igual a',
        alts: ['2.', '9.', '4,5.', '0,5.', '18.'],
        ans: 'A', pos: 'E', hab: 'H5', dif: 'média',
        ex: { A: '1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2, logo R = 2 Ω (menor que 3 Ω, como deve ser no paralelo).', B: 'é a soma 6 + 3, valor da ligação em série.', C: 'é a média aritmética; não vale para resistores.', D: 'é o valor de 1/R (0,5), sem inverter o resultado no final.', E: 'é o produto 6 · 3; falta dividir pela soma (produto ÷ soma = 2).' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N1.5', base: ['O chuveiro elétrico de uma casa funciona sempre ligado à mesma tensão da rede. Um seletor permite escolher as posições "verão" e "inverno", mudando o comprimento do fio resistor que é percorrido pela corrente. Na posição "inverno", a água sai mais quente.'],
        src: SRC, cmd: 'Em comparação com a posição "verão", na posição "inverno" o resistor tem',
        alts: ['menor resistência, e é percorrido por maior corrente.', 'maior resistência, e é percorrido por maior corrente.', 'maior resistência, e é percorrido por menor corrente.', 'menor resistência, e é percorrido por menor corrente.', 'a mesma resistência, mas é submetido a uma tensão maior.'],
        ans: 'A', pos: 'C', hab: 'H5', dif: 'média',
        ex: { A: 'com tensão fixa, P = U² ÷ R: mais potência (água mais quente) exige menor R, e i = U ÷ R aumenta.', B: 'combina uma resistência maior com corrente maior, o que contraria a lei de Ohm (U = R · i, com U fixo).', C: 'descreve a posição "verão": mais resistência, menos corrente e menos potência.', D: 'com menor resistência a corrente não pode diminuir se a tensão é a mesma.', E: 'o enunciado diz que a tensão é sempre a mesma.' },
        traps: { C: 'oposto' }
      }
    ],
    cards: [
      ['Qual a primeira lei de Ohm?', 'U = R · i (tensão = resistência · corrente)'],
      ['Quais as três formas da potência elétrica?', 'P = U · i = R · i² = U² ÷ R'],
      ['Como calcular o consumo em kWh?', 'Potência em kW multiplicada pelo tempo em horas'],
      ['Em um circuito em série, o que é igual para todos os elementos?', 'A corrente elétrica'],
      ['Em um circuito em paralelo, o que é igual para todos os elementos?', 'A tensão (ddp)'],
      ['Como é a resistência equivalente em paralelo?', 'Menor que a menor das resistências; 1/R = soma dos 1/R'],
      ['Se um elemento queima numa ligação em série, o que ocorre?', 'O circuito abre e todos os elementos param de funcionar'],
      ['Como calcular a corrente de um aparelho?', 'i = P ÷ U']
    ],
    vf: [
      ['As lâmpadas de uma residência são ligadas em série.', false, 'Em série, uma lâmpada queimada apagaria todas. A rede doméstica é em paralelo.'],
      ['Um aparelho de maior potência sempre consome mais energia que um de menor potência.', false, 'A energia depende da potência e do tempo de uso (E = P · Δt).'],
      ['Com tensão constante, diminuir a resistência de um chuveiro aumenta sua potência.', true, 'P = U² ÷ R: menor R, maior P.'],
      ['A unidade quilowatt-hora mede potência.', false, 'kWh é unidade de energia; potência se mede em watt ou quilowatt.']
    ]
  });

  add('N', 'CN', {
    module: {
      id: 'N2', title: 'Ecologia: energia, ciclos e impactos', habs: 'H9, H10 e H28 (fluxo de energia, ciclos e perturbações ambientais)', faixa: 'A',
      note: 'Ecologia aparece em quase toda prova de Natureza e cobra raciocínio, não decoreba: para onde vai a energia, quem recicla a matéria e o que um poluente faz ao longo da cadeia.',
      html: `<h4>1. O que a prova mede</h4>
<p>O Enem cobra Ecologia com <strong>situações reais</strong> (um lago poluído, uma lavoura, uma floresta desmatada) e pede que você aplique poucos conceitos centrais: níveis tróficos, fluxo de energia, ciclos da matéria, relações entre os seres vivos e impactos humanos.</p>
<h4>2. Cadeias alimentares e fluxo de energia</h4>
<p>Em uma cadeia, os <strong>produtores</strong> (plantas, algas, algumas bactérias) fixam a energia da luz na fotossíntese. Os <strong>consumidores</strong> se organizam em níveis (primário, secundário, terciário) e os <strong>decompositores</strong> (fungos e bactérias) devolvem a matéria ao ambiente.</p>
<div class="box conceito"><b class="box-t">Conceito</b><p>A energia flui em <strong>sentido único</strong>: entra pela luz do Sol e sai como calor. Em cada passagem de um nível para o seguinte, só uma pequena parte (em geral cerca de <strong>10%</strong>) fica disponível; o resto é gasto na respiração e perdido como calor. Por isso as cadeias têm poucos níveis, e a <strong>pirâmide de energia nunca é invertida</strong>.</p></div>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Capim (100.000 kJ) → gafanhoto → sapo → cobra. Com 10% de transferência: gafanhoto 10.000; sapo 1.000; cobra <strong>100 kJ</strong>.</p></div>
<h4>3. Ciclos da matéria</h4>
<p>Ao contrário da energia, a <strong>matéria circula</strong>. No ciclo do <strong>carbono</strong>, a fotossíntese retira CO₂ da atmosfera; a respiração, a decomposição e a queima de combustíveis devolvem. O desequilíbrio entre retirada e devolução (queima de combustíveis fósseis, desmatamento) contribui para o aumento do efeito estufa.</p>
<p>No ciclo do <strong>nitrogênio</strong>, o N₂ do ar não é usado direto pelas plantas. Bactérias fixadoras (como as do gênero <em>Rhizobium</em>, em nódulos nas raízes de leguminosas como soja e feijão) o transformam em compostos assimiláveis. Por isso a rotação com leguminosas ajuda a repor nitrogênio ao solo.</p>
<h4>4. Impactos: acúmulo de poluentes e eutrofização</h4>
<ul><li><strong>Bioacumulação e magnificação trófica</strong>: substâncias persistentes, que o organismo não elimina nem degrada (certos pesticidas, mercúrio), acumulam-se nos tecidos e ficam <strong>mais concentradas a cada nível da cadeia</strong>. Os maiores teores aparecem nos predadores de topo.</li><li><strong>Eutrofização</strong>: esgoto e adubos despejam nitrogênio e fósforo em um corpo d'água; algas proliferam; ao morrerem, são decompostas por bactérias aeróbias que consomem o oxigênio dissolvido. Resultado: <strong>falta de oxigênio e morte de peixes</strong>.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Não confunda <strong>energia</strong> (que não recicla) com <strong>matéria</strong> (que recicla). E não afirme que o excesso de nutrientes "envenena" o peixe diretamente: na eutrofização a causa da mortandade é a queda do oxigênio dissolvido.</p></div>
<h4>5. Relações entre os seres vivos</h4>
<ul><li><strong>Mutualismo</strong> (+/+): ambos se beneficiam e dependem da relação (bactérias fixadoras e leguminosas).</li><li><strong>Comensalismo</strong> (+/0): um se beneficia e o outro não é afetado (epífitas sobre árvores, como bromélias e orquídeas).</li><li><strong>Parasitismo</strong> (+/−): um se beneficia e prejudica o hospedeiro, em geral sem matá-lo logo.</li><li><strong>Predação</strong> (+/−): o predador mata e consome a presa.</li><li><strong>Competição</strong> (−/−): disputa por recurso limitado.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a energia disponível no último nível", "o nível em que o poluente é mais concentrado", "a causa da morte dos peixes", "a relação ecológica descrita". Identifique primeiro quem é produtor, quem come quem e o que o texto diz sobre persistência do poluente.</p></div>`,
      resumo: [
        ['Energia', 'Fluxo de sentido único: entra como luz e sai como calor'],
        ['Transferência de energia', 'Cerca de 10% passa a cada nível trófico'],
        ['Pirâmide de energia', 'Nunca invertida'],
        ['Matéria', 'Circula (ciclos do carbono, do nitrogênio, da água)'],
        ['Fixação do nitrogênio', 'Bactérias (Rhizobium) transformam N₂ em compostos assimiláveis pelas plantas'],
        ['Magnificação trófica', 'Poluente persistente se concentra mais a cada nível; maior no topo'],
        ['Eutrofização', 'Excesso de nutrientes, algas, decomposição, falta de oxigênio, morte de peixes'],
        ['Mutualismo', '+/+'],
        ['Comensalismo', '+/0'],
        ['Parasitismo e predação', '+/−']
      ]
    },
    questions: [
      {
        id: 'N2.1', base: ['Em um campo, a cadeia alimentar é: capim → gafanhoto → sapo → cobra → gavião. O capim fixa 100.000 kJ de energia por dia. Considere que, em cada transferência entre níveis tróficos, apenas 10% da energia é aproveitada pelo nível seguinte.'],
        src: SRC, cmd: 'A energia que chega ao gavião, em kJ, é de',
        alts: ['10.', '100.', '1.000.', '10.000.', '1.'],
        ans: 'A', pos: 'C', hab: 'H9', dif: 'fácil',
        ex: { A: 'são 4 transferências: 100.000 → 10.000 → 1.000 → 100 → 10 kJ.', B: 'seria o valor que chega à cobra, parando uma transferência antes.', C: 'seria o valor que chega ao sapo (duas transferências).', D: 'seria o valor que chega ao gafanhoto (uma transferência).', E: 'corresponde a cinco transferências, uma a mais que o número de setas.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N2.2', base: ['Um pesticida persistente, solúvel em gordura e que os organismos não conseguem degradar nem eliminar, foi aplicado em lavouras vizinhas a um lago e chegou à água em baixa concentração. No lago, a cadeia alimentar é: fitoplâncton → zooplâncton → peixes pequenos → peixes predadores → aves piscívoras.'],
        src: SRC, cmd: 'Passado algum tempo, a maior concentração do pesticida nos tecidos será encontrada',
        alts: ['nas aves piscívoras.', 'no fitoplâncton.', 'no zooplâncton.', 'nos peixes pequenos.', 'igual em todos os níveis da cadeia.'],
        ans: 'A', pos: 'E', hab: 'H10', dif: 'média',
        ex: { A: 'sendo persistente e não eliminado, o poluente se acumula nos tecidos e é transferido concentrado a cada nível: a magnificação trófica leva ao maior teor no topo da cadeia.', B: 'o fitoplâncton tem a menor concentração, pois está na base e só absorve o que está na água.', C: 'o zooplâncton acumula mais que o fitoplâncton, mas menos que os níveis seguintes.', D: 'os peixes pequenos acumulam mais que o zooplâncton, mas menos que os predadores.', E: 'a concentração não é igual: a cada nível o predador consome muitos indivíduos da presa, somando o poluente que ela acumulou.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N2.3', base: ['Esgoto doméstico sem tratamento, rico em fósforo e nitrogênio, foi lançado em um lago raso. Algumas semanas depois, a superfície ficou coberta por algas verdes, e muitos peixes apareceram mortos.'],
        src: SRC, cmd: 'A causa principal da morte dos peixes foi',
        alts: ['a queda do oxigênio dissolvido, causada pela decomposição das algas mortas por bactérias aeróbias.', 'a toxicidade direta do fósforo presente no esgoto.', 'o excesso de luz que chegava ao fundo do lago.', 'a falta de gás carbônico para a respiração dos peixes.', 'o aumento da fotossíntese, que liberou oxigênio demais.'],
        ans: 'A', pos: 'A', hab: 'H10', dif: 'média',
        ex: { A: 'eutrofização: o excesso de nutrientes causa proliferação de algas; ao morrerem, são decompostas por bactérias aeróbias que consomem o oxigênio da água, e os peixes morrem asfixiados.', B: 'nas concentrações do esgoto, o fósforo é nutriente para as algas; a mortandade não vem de toxicidade direta.', C: 'ocorre o contrário: a camada de algas na superfície reduz a luz que chega às camadas inferiores.', D: 'peixes respiram oxigênio, não gás carbônico.', E: 'a fotossíntese aumenta o oxigênio durante o dia, mas a decomposição posterior o consome.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N2.4', base: ['Produtores de soja relatam que podem reduzir bastante o uso de adubo nitrogenado nas lavouras, desde que as sementes sejam tratadas com bactérias do gênero Rhizobium.'],
        src: SRC, cmd: 'Essa prática é eficaz porque as bactérias',
        alts: ['vivem em nódulos nas raízes e transformam o nitrogênio do ar em compostos que a planta absorve.', 'decompõem o nitrogênio do solo, tornando-o inutilizável para as plantas concorrentes.', 'produzem nitrogênio a partir da fotossíntese, realizada nas folhas.', 'absorvem o nitrogênio do ar e o liberam diretamente nas folhas da planta.', 'fazem a planta absorver gás nitrogênio pelas folhas, dispensando as raízes.'],
        ans: 'A', pos: 'D', hab: 'H9', dif: 'média',
        ex: { A: 'a fixação biológica do nitrogênio ocorre em nódulos das raízes de leguminosas, em mutualismo: a planta fornece alimento e a bactéria fornece compostos nitrogenados.', B: 'as bactérias fixam nitrogênio, não o destroem, e a ação não é dirigida contra plantas concorrentes.', C: 'a fotossíntese produz açúcares a partir de CO₂ e água; não produz nitrogênio.', D: 'a absorção ocorre nas raízes, pelos compostos formados no nódulo, não nas folhas.', E: 'plantas não absorvem N₂ diretamente do ar, nem pelas folhas.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N2.5', base: ['Bromélias e orquídeas crescem presas aos galhos de grandes árvores de uma floresta. Elas obtêm mais luz do que teriam no chão sombreado e retiram água da chuva e nutrientes do ar e da matéria acumulada, sem retirar nada da árvore nem lhe causar prejuízo ou benefício.'],
        src: SRC, cmd: 'A relação ecológica descrita é denominada',
        alts: ['comensalismo.', 'mutualismo.', 'parasitismo.', 'competição.', 'predação.'],
        ans: 'A', pos: 'B', hab: 'H28', dif: 'fácil',
        ex: { A: 'comensalismo é +/0: a epífita se beneficia e a árvore não é afetada.', B: 'mutualismo exigiria benefício para as duas partes, e a árvore não ganha nada.', C: 'no parasitismo o hospedeiro é prejudicado; o texto diz que a árvore não sofre prejuízo.', D: 'competição é disputa por recurso, com prejuízo para ambos.', E: 'predação envolve matar e consumir; as plantas não consomem a árvore.' },
        traps: { B: 'detalhe' }
      }
    ],
    cards: [
      ['Para onde vai a energia que não passa ao nível trófico seguinte?', 'É gasta na respiração e perdida como calor'],
      ['Que fração da energia costuma passar de um nível trófico ao seguinte?', 'Cerca de 10%'],
      ['O que é magnificação trófica?', 'Aumento da concentração de um poluente persistente a cada nível da cadeia, com maior teor no topo'],
      ['O que causa a mortandade de peixes na eutrofização?', 'A queda do oxigênio dissolvido, consumido na decomposição das algas mortas'],
      ['Qual o papel das bactérias Rhizobium?', 'Fixam o nitrogênio do ar em nódulos de raízes de leguminosas (mutualismo)'],
      ['Energia e matéria: qual circula em ciclos?', 'A matéria circula; a energia flui em sentido único'],
      ['Comensalismo: quem ganha e quem perde?', 'Um ganha, o outro não é afetado (+/0)'],
      ['Que processos devolvem CO₂ à atmosfera no ciclo do carbono?', 'Respiração, decomposição e queima de combustíveis']
    ],
    vf: [
      ['Em uma cadeia alimentar, a energia circula entre os níveis, como a matéria.', false, 'A energia flui em sentido único e se perde como calor; só a matéria é reciclada.'],
      ['A pirâmide de energia de um ecossistema pode ser invertida.', false, 'A energia disponível sempre diminui de um nível para o seguinte. Pirâmides de números ou biomassa é que podem inverter em alguns casos.'],
      ['Poluentes persistentes costumam estar mais concentrados nos predadores de topo.', true, 'A magnificação trófica soma o poluente acumulado nas presas a cada nível.'],
      ['Na eutrofização, os peixes morrem porque o excesso de fósforo é diretamente tóxico para eles.', false, 'A causa principal é a falta de oxigênio, consumido na decomposição das algas.']
    ]
  });

  add('M', 'MT', {
    module: {
      id: 'M3', title: 'Geometria: áreas, volumes e semelhança', habs: 'H7 a H9 e H12 (figuras planas e espaciais, grandezas e medidas)', faixa: 'A',
      note: 'Áreas, volumes e Pitágoras aparecem em contextos práticos (pintar parede, encher caixa-d\'água, comparar embalagens). A conta é curta; o erro costuma ser a unidade ou o raio no lugar do diâmetro.',
      html: `<h4>1. O que a prova mede</h4>
<p>Geometria no Enem é <strong>medida aplicada</strong>: quanta tinta, quanta água, que embalagem compensa, qual a altura de algo que não dá para medir. Você precisa de poucas fórmulas, mas precisa <strong>lê-las com as unidades certas</strong>.</p>
<h4>2. Áreas e perímetros</h4>
<ul><li>Retângulo: base · altura. Triângulo: base · altura ÷ 2. Trapézio: (base maior + base menor) · altura ÷ 2.</li><li>Círculo: área = π · r²; comprimento da circunferência = 2 · π · r. Atenção: <strong>r é o raio</strong>, metade do diâmetro.</li><li>Perímetro é a soma dos lados (medida em comprimento); área é medida em unidade ao quadrado.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Usar o <strong>diâmetro no lugar do raio</strong> na fórmula do círculo e do cilindro: o resultado fica 4 vezes maior. E esquecer de <strong>descontar portas e janelas</strong> ao calcular a área de parede a pintar.</p></div>
<h4>3. Pitágoras e semelhança</h4>
<p>No triângulo retângulo, <strong>hipotenusa² = cateto² + cateto²</strong>. O triplo 3-4-5 (e seus múltiplos, como 6-8-10) resolve muitas questões sem calculadora. Dois triângulos são <strong>semelhantes</strong> quando têm os mesmos ângulos; os lados correspondentes são proporcionais. É o raciocínio da sombra: no mesmo instante, objeto e sombra guardam a mesma razão.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Uma estaca de 2 m projeta sombra de 1,5 m. Uma árvore projeta, no mesmo instante, sombra de 9 m. Altura: 2 ÷ 1,5 = h ÷ 9, logo h = <strong>12 m</strong>.</p></div>
<h4>4. Volumes e capacidade</h4>
<ul><li>Prisma e cilindro: <strong>área da base · altura</strong>. Cilindro: π · r² · h. Paralelepípedo: comprimento · largura · altura.</li><li>Pirâmide e cone: um terço de (área da base · altura).</li><li>Esfera: (4 ÷ 3) · π · r³.</li><li><strong>1 m³ = 1.000 litros</strong>; 1 dm³ = 1 litro; 1 cm³ = 1 mililitro.</li></ul>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a quantidade mínima de latas/litros", "a capacidade do reservatório", "qual embalagem é mais vantajosa", "a altura estimada". Sempre: (1) desenhe e marque as medidas, (2) converta tudo para a mesma unidade <strong>antes</strong> de calcular, (3) confira se o resultado tem ordem de grandeza razoável.</p></div>
<h4>5. Comparar tamanhos e preços</h4>
<p>Quando o enunciado compara objetos de mesma forma, lembre: se as medidas lineares multiplicam por k, a <strong>área</strong> multiplica por k² e o <strong>volume</strong> por k³. Uma pizza com diâmetro 1,5 vez maior tem área 2,25 vezes maior. Preço por área (ou por volume) é o que decide a vantagem, não o preço por diâmetro.</p>`,
      resumo: [
        ['Área do triângulo', 'base · altura ÷ 2'],
        ['Área do trapézio', '(B + b) · h ÷ 2'],
        ['Círculo', 'Área = π · r²; comprimento = 2 · π · r (r é o raio)'],
        ['Pitágoras', 'hipotenusa² = cateto² + cateto²; triplo 3-4-5'],
        ['Semelhança', 'Lados correspondentes proporcionais (razão da sombra)'],
        ['Volume de prisma e cilindro', 'Área da base · altura'],
        ['Pirâmide e cone', '1/3 da área da base · altura'],
        ['Esfera', 'V = (4/3) · π · r³'],
        ['Capacidade', '1 m³ = 1.000 L; 1 dm³ = 1 L'],
        ['Fator k', 'Comprimento ×k: área ×k², volume ×k³']
      ]
    },
    questions: [
      {
        id: 'M3.1', base: ['Uma escada de 5 m de comprimento está apoiada em uma parede vertical. O pé da escada está no chão, a 3 m da parede.'],
        src: SRC, cmd: 'A altura, em metros, que a escada atinge na parede é',
        alts: ['4.', '2.', 'cerca de 5,8.', '8.', '15.'],
        ans: 'A', pos: 'B', hab: 'H8', dif: 'fácil',
        ex: { A: 'a escada é a hipotenusa: h² = 5² − 3² = 25 − 9 = 16, logo h = 4 m (triplo 3-4-5).', B: 'subtrai os comprimentos (5 − 3) em vez de usar Pitágoras.', C: 'soma os quadrados (3² + 5² = 34) como se a escada fosse um cateto.', D: 'soma os comprimentos (5 + 3), sem relação com o triângulo.', E: 'multiplica os comprimentos (5 · 3), sem relação com o triângulo.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M3.2', base: ['Uma caixa-d\'água tem forma de cilindro reto, com raio da base igual a 1 m e altura igual a 1,5 m. Use π = 3.'],
        src: SRC, cmd: 'A capacidade dessa caixa, em litros, é',
        alts: ['4.500.', '450.', '45.000.', '18.000.', '1.500.'],
        ans: 'A', pos: 'E', hab: 'H12', dif: 'média',
        ex: { A: 'V = π · r² · h = 3 · 1² · 1,5 = 4,5 m³ = 4.500 litros.', B: 'erra a conversão de unidade: 1 m³ equivale a 1.000 L, não a 100 L.', C: 'erra a conversão no outro sentido (multiplica por 10.000).', D: 'usa o diâmetro (2 m) no lugar do raio: 3 · 2² · 1,5 = 18 m³.', E: 'esquece o fator π: 1² · 1,5 = 1,5 m³ = 1.500 L.' },
        traps: { D: 'detalhe' }
      },
      {
        id: 'M3.3', base: ['Uma pizzaria vende a pizza pequena, de 20 cm de diâmetro, por R$ 20,00 e a pizza grande, de 30 cm de diâmetro, por R$ 36,00. As duas têm a mesma espessura e a mesma cobertura.'],
        src: SRC, cmd: 'Considerando o preço por quantidade de pizza, a conclusão correta é que',
        alts: ['a grande compensa mais, pois sua área é 2,25 vezes a da pequena e o preço é 1,8 vez o da pequena.', 'a pequena compensa mais, pois seu preço total é menor.', 'a pequena compensa mais, pois o diâmetro da grande é 1,5 vez o da pequena e o preço é 1,8 vez.', 'as duas compensam igual, pois o preço cresce na mesma proporção do diâmetro.', 'a grande compensa mais, pois tem diâmetro maior.'],
        ans: 'A', pos: 'C', hab: 'H12', dif: 'média',
        ex: { A: 'a área é proporcional ao quadrado do diâmetro: (30 ÷ 20)² = 2,25. Como 2,25 > 1,8, o preço por área é menor na grande.', B: 'o preço total menor não significa mais vantagem: é preciso comparar preço por quantidade de pizza.', C: 'compara o preço com o diâmetro, grandeza linear. O que importa é a área, que cresce com o quadrado do diâmetro.', D: 'o preço cresce 1,8 vez e o diâmetro 1,5 vez; não são proporcionais, e o diâmetro não é a medida certa para comparar.', E: 'a conclusão coincide, mas a justificativa é insuficiente: diâmetro maior não garante preço menor por quantidade. É preciso comparar as áreas (2,25) com o preço (1,8).' },
        traps: { C: 'detalhe' }
      },
      {
        id: 'M3.4', base: ['No mesmo instante em que uma pessoa de 1,8 m de altura projeta no chão uma sombra de 1,2 m, um poste projeta uma sombra de 6 m. O chão é plano e horizontal.'],
        src: SRC, cmd: 'A altura do poste, em metros, é',
        alts: ['9.', '4.', '7,2.', '10,8.', '3.'],
        ans: 'A', pos: 'A', hab: 'H8', dif: 'média',
        ex: { A: 'triângulos semelhantes: 1,8 ÷ 1,2 = h ÷ 6, logo h = 6 · 1,5 = 9 m.', B: 'inverte a razão: 6 · (1,2 ÷ 1,8) = 4, como se o poste fosse menor que a sombra.', C: 'soma a sombra da pessoa à do poste (6 + 1,2), sem proporção.', D: 'multiplica a altura pela sombra (1,8 · 6), unidade sem sentido.', E: 'divide a sombra por 2, sem base na semelhança.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'M3.5', base: ['Uma parede retangular de 4 m de largura por 2,5 m de altura tem uma janela de 1,5 m por 1 m e uma porta de 0,8 m por 2 m. Ela será pintada com uma tinta que rende 4 m² por litro, vendida em embalagens de 1 litro.'],
        src: SRC, cmd: 'O número mínimo de embalagens necessárias para uma demão de tinta é',
        alts: ['2.', '1.', '3.', '4.', '7.'],
        ans: 'A', pos: 'D', hab: 'H12', dif: 'média',
        ex: { A: 'área da parede: 4 · 2,5 = 10 m²; janela 1,5 m²; porta 1,6 m². Área a pintar: 10 − 1,5 − 1,6 = 6,9 m²; 6,9 ÷ 4 = 1,725, que exige 2 embalagens.', B: '1 litro cobre só 4 m², menos que os 6,9 m² a pintar.', C: 'é o resultado de não descontar a janela e a porta (10 ÷ 4 = 2,5, que pede 3 embalagens).', D: 'chega a esse valor ao somar a área da parede com as das aberturas, em vez de subtrair.', E: 'não resulta de nenhum cálculo coerente com o enunciado.' },
        traps: { C: 'detalhe' }
      }
    ],
    cards: [
      ['Qual a área de um triângulo?', 'base · altura ÷ 2'],
      ['Qual a área e o comprimento de um círculo?', 'Área = π · r²; comprimento = 2 · π · r'],
      ['O que é o triplo pitagórico mais usado?', '3, 4, 5 (e múltiplos, como 6, 8, 10)'],
      ['Como usar semelhança em problemas de sombra?', 'Altura ÷ sombra é a mesma razão para os dois objetos, no mesmo instante'],
      ['Qual o volume de um cilindro?', 'π · r² · h (área da base vezes altura)'],
      ['Quantos litros tem 1 m³?', '1.000 litros'],
      ['Qual o volume de uma pirâmide ou cone?', 'Um terço de (área da base · altura)'],
      ['Se o raio dobra, o que ocorre com a área do círculo?', 'Fica 4 vezes maior']
    ],
    vf: [
      ['Se o diâmetro de uma pizza passa de 20 cm para 30 cm, sua área aumenta 50%.', false, 'A área cresce com o quadrado: (30/20)² = 2,25, ou seja, 125% maior.'],
      ['1 m³ de água corresponde a 1.000 litros.', true, 'Conversão fundamental para questões de caixa-d\'água e reservatórios.'],
      ['No triângulo retângulo, a hipotenusa é sempre o maior lado.', true, 'Pitágoras: hipotenusa² é a soma dos quadrados dos catetos, então supera cada cateto.'],
      ['Ao usar o diâmetro no lugar do raio na fórmula da área do círculo, o resultado fica duas vezes maior.', false, 'Fica quatro vezes maior, pois o raio é elevado ao quadrado.']
    ]
  });

  add('M', 'MT', {
    module: {
      id: 'M4', title: 'Funções e leitura de gráficos', habs: 'H19 a H21 e H24 a H26 (relações entre grandezas, gráficos e tabelas)', faixa: 'A',
      note: 'Função, no Enem, é uma conta de celular, uma corrida de táxi, uma bola lançada. O que cai é modelar a situação, interpretar o gráfico e saber o que significa cada número da fórmula.',
      html: `<h4>1. O que a prova mede</h4>
<p>O Enem raramente pede "resolva a função". Ele descreve uma situação (tarifa, produção, trajetória), pede que você <strong>monte a expressão</strong> ou <strong>leia um gráfico</strong>, e interpreta o resultado. Dois modelos resolvem a maior parte: a função afim e a quadrática.</p>
<h4>2. Função afim: f(x) = a·x + b</h4>
<ul><li><strong>b</strong> é o valor inicial (a parte fixa: bandeirada, taxa de adesão). É onde o gráfico corta o eixo vertical.</li><li><strong>a</strong> é a taxa de variação: quanto a função muda para cada unidade de x (preço por km, por minuto). Se a &gt; 0, cresce; se a &lt; 0, decresce.</li><li>O gráfico é uma reta. O ponto em que f(x) = 0 é x = −b ÷ a.</li></ul>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Um táxi cobra R$ 6,00 de bandeirada e R$ 3,00 por km. Para x km: f(x) = 6 + 3x. Em 10 km: 6 + 30 = <strong>R$ 36,00</strong>.</p></div>
<h4>3. Comparar duas situações</h4>
<p>Para saber quando um plano passa a compensar mais que outro, <strong>iguale as duas expressões</strong>. O ponto em que as retas se cruzam é o ponto de equilíbrio; antes e depois dele, o mais barato muda. Plano com parte fixa maior e variável menor compensa com <strong>muito uso</strong>.</p>
<h4>4. Função quadrática: parábola</h4>
<p>f(x) = a·x² + b·x + c. Se a &lt; 0, a parábola tem <strong>concavidade para baixo</strong> e um ponto de máximo (lucro máximo, altura máxima). O vértice fica em x = −b ÷ (2a). As raízes são os valores de x que anulam a função; se a &lt; 0, a função é positiva <strong>entre</strong> as raízes.</p>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a expressão que representa", "a partir de quantos", "o valor máximo", "o intervalo em que", "em que período a variação foi mais intensa". Em gráficos, leia título, eixos e unidades; a <strong>inclinação</strong> do trecho mostra a rapidez da variação.</p></div>
<h4>5. Ler gráficos e tabelas</h4>
<p>Diferença entre <strong>variação total</strong> e <strong>taxa de variação</strong>: um trecho pode ter queda grande no total, mas lenta, se durou muito tempo. A taxa é variação ÷ tempo. Trechos horizontais têm taxa zero (valor constante).</p>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Dizer que a maior variação é a do trecho com maior mudança total, sem dividir pelo tempo. E entender "lucro positivo" como "lucro maior ou igual a zero": nas raízes o lucro é nulo.</p></div>`,
      resumo: [
        ['Função afim', 'f(x) = a·x + b; reta'],
        ['Coeficiente b', 'Valor inicial (parte fixa)'],
        ['Coeficiente a', 'Taxa de variação (quanto muda por unidade de x)'],
        ['Zero da afim', 'x = −b ÷ a'],
        ['Comparar planos', 'Iguale as duas expressões para achar o ponto de equilíbrio'],
        ['Parábola', 'a < 0: concavidade para baixo, ponto de máximo'],
        ['Vértice', 'x = −b ÷ (2a)'],
        ['Taxa de variação', 'Variação do valor dividida pelo tempo; trecho horizontal vale zero'],
        ['Lucro positivo', 'Estritamente maior que zero; nas raízes o lucro é nulo']
      ]
    },
    questions: [
      {
        id: 'M4.1', base: ['Uma empresa de transporte por aplicativo cobra R$ 5,00 de taxa fixa mais R$ 2,50 por quilômetro rodado.'],
        src: SRC, cmd: 'O valor de uma corrida de 12 km é, em reais,',
        alts: ['35,00.', '30,00.', '90,00.', '17,00.', '7,50.'],
        ans: 'A', pos: 'C', hab: 'H19', dif: 'fácil',
        ex: { A: 'f(x) = 5 + 2,5x; f(12) = 5 + 30 = 35.', B: 'esquece a taxa fixa de R$ 5,00.', C: 'soma a taxa fixa ao preço por km (7,50) e multiplica por 12: a taxa fixa é cobrada uma só vez.', D: 'soma 5 com 12 km, sem multiplicar pelo preço por km.', E: 'é o valor de 1 km (5 + 2,5), não de 12 km.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M4.2', base: ['Duas operadoras oferecem planos de internet por hora de uso: o plano A cobra R$ 40,00 fixos por mês mais R$ 0,50 por minuto de uso; o plano B cobra R$ 20,00 fixos mais R$ 1,00 por minuto.'],
        src: SRC, cmd: 'O plano A passa a ser mais barato que o B quando o tempo de uso mensal ultrapassa',
        alts: ['40 minutos.', '20 minutos.', '60 minutos.', '80 minutos.', '10 minutos.'],
        ans: 'A', pos: 'A', hab: 'H21', dif: 'média',
        ex: { A: '40 + 0,5t < 20 + t ⇒ 20 < 0,5t ⇒ t > 40. No equilíbrio (t = 40) os dois custam R$ 60,00.', B: 'é a diferença das partes fixas (40 − 20), sem dividir pela diferença das taxas variáveis.', C: 'é o custo, em reais, no ponto de equilíbrio, não o tempo.', D: 'dobra o valor correto; resulta de dividir 40 por 0,5 em vez de 20 por 0,5.', E: 'não resulta da igualdade das duas expressões.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M4.3', base: ['Em um chute, a altura h (em metros) de uma bola em função do tempo t (em segundos) é dada por h(t) = −5t² + 20t, para t entre 0 e o instante em que ela volta ao solo.'],
        src: SRC, cmd: 'A altura máxima atingida pela bola, em metros, é',
        alts: ['20.', '2.', '15.', '4.', '40.'],
        ans: 'A', pos: 'E', hab: 'H21', dif: 'média',
        ex: { A: 'o vértice está em t = −20 ÷ (2 · −5) = 2 s; h(2) = −20 + 40 = 20 m.', B: 'é o instante do ponto mais alto (2 s), não a altura.', C: 'é h(1): a altura em t = 1 s, antes do ponto mais alto.', D: 'é o instante em que a bola volta ao solo (h(4) = 0), não uma altura.', E: 'é o produto 20 · 2, sem calcular h(2) corretamente.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M4.4', base: ['A tabela mostra o nível de um reservatório (em % da capacidade) em quatro instantes. Em cada trecho, o nível variou de forma constante (gráfico formado por segmentos de reta).', '<table class="tb"><tr><th>Mês</th><td>0</td><td>4</td><td>6</td><td>8</td></tr><tr><th>Nível (%)</th><td>80</td><td>40</td><td>40</td><td>70</td></tr></table>'],
        src: SRC, cmd: 'O trecho em que o nível variou mais rapidamente, em módulo, foi',
        alts: ['do mês 6 ao mês 8, subindo 15 pontos percentuais por mês.', 'do mês 0 ao mês 4, porque a queda foi de 40 pontos percentuais.', 'do mês 4 ao mês 6, porque o nível ficou constante.', 'do mês 0 ao mês 4, descendo 15 pontos percentuais por mês.', 'todos os trechos tiveram a mesma rapidez.'],
        ans: 'A', pos: 'D', hab: 'H24', dif: 'média',
        ex: { A: 'subida de 30 pontos em 2 meses = 15 pontos por mês, a maior taxa em módulo.', B: 'a queda total de 40 pontos é a maior, mas ocorreu em 4 meses: 10 pontos por mês. Variação total não é taxa de variação.', C: 'no trecho constante a taxa é zero.', D: 'a queda foi de 40 pontos em 4 meses, ou seja, 10 pontos por mês, não 15.', E: 'as taxas são −10, 0 e +15 pontos por mês; não são iguais.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'M4.5', base: ['O lucro mensal L, em milhares de reais, de uma fábrica de bicicletas que vende x centenas de unidades por mês é L(x) = −x² + 10x − 21, para 0 ≤ x ≤ 10.'],
        src: SRC, cmd: 'O lucro é positivo para os valores de x tais que',
        alts: ['3 < x < 7.', 'x < 3 ou x > 7.', '3 ≤ x ≤ 7.', 'x > 3.', '0 < x < 10.'],
        ans: 'A', pos: 'B', hab: 'H21', dif: 'média',
        ex: { A: 'raízes de −x² + 10x − 21 = 0: x = 3 e x = 7. Com a < 0, a parábola fica acima do eixo entre as raízes, ou seja, L > 0 se 3 < x < 7.', B: 'é o intervalo em que L < 0 (fora das raízes), o oposto do pedido.', C: 'inclui as raízes, onde L = 0 (lucro nulo, não positivo).', D: 'ignora que o lucro volta a ser negativo após x = 7.', E: 'é todo o domínio do problema; o lucro não é positivo em todo ele.' },
        traps: { B: 'oposto' }
      }
    ],
    cards: [
      ['O que representam os coeficientes de f(x) = a·x + b?', 'a é a taxa de variação (inclinação); b é o valor inicial (parte fixa)'],
      ['Como achar quando um plano passa a compensar mais que outro?', 'Iguale as duas expressões e resolva; o ponto de equilíbrio separa os dois casos'],
      ['Qual a coordenada x do vértice da parábola?', 'x = −b ÷ (2a)'],
      ['Parábola com a < 0: tem máximo ou mínimo?', 'Máximo (concavidade para baixo)'],
      ['A função de a < 0 é positiva onde?', 'Entre as raízes'],
      ['Qual a diferença entre variação total e taxa de variação?', 'A taxa é a variação dividida pelo tempo'],
      ['Qual é a taxa de variação de um trecho horizontal de gráfico?', 'Zero (valor constante)'],
      ['Onde a reta f(x) = a·x + b corta o eixo vertical?', 'No ponto b (valor inicial)']
    ],
    vf: [
      ['Em uma função afim, o coeficiente b é a taxa de variação.', false, 'A taxa de variação é o coeficiente a; b é o valor inicial.'],
      ['Se dois planos têm custo igual para certo uso, esse uso é o ponto de equilíbrio.', true, 'É onde as duas retas se cruzam; antes e depois dele o plano mais barato muda.'],
      ['A parábola com coeficiente a negativo tem um ponto de mínimo.', false, 'Com a < 0 a concavidade é para baixo, e o vértice é um máximo.'],
      ['Um trecho de gráfico com a maior queda total é sempre o de maior rapidez de variação.', false, 'A rapidez depende da variação dividida pelo tempo do trecho.']
    ]
  });

  add('N', 'CN', {
    module: {
      id: 'N3', title: 'Química: mol, soluções e pH', habs: 'H17, H24 e H25 (linguagem química, transformações e produção de materiais)', faixa: 'A',
      note: 'Estequiometria, concentração e pH aparecem em contextos de ambiente, saúde e indústria. As contas são de proporção; o erro costuma ser unidade (mL em vez de L) ou a lógica logarítmica do pH.',
      html: `<h4>1. O que a prova mede</h4>
<p>Química no Enem é <strong>quantidade de matéria em contexto</strong>: quanto de produto se forma, qual a concentração de uma solução, quão ácida está a água de um lago. Poucas fórmulas, usadas com cuidado.</p>
<h4>2. Mol, massa molar e estequiometria</h4>
<p>1 mol é uma quantidade fixa de partículas; sua massa em gramas é a <strong>massa molar</strong> (g/mol). Os <strong>coeficientes</strong> de uma equação balanceada indicam a proporção em <strong>mols</strong> (não em gramas). Roteiro: (1) balancear; (2) passar o dado para mols; (3) aplicar a proporção; (4) converter para a unidade pedida.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>2 H₂ + O₂ → 2 H₂O. Massas molares: H₂ 2 g/mol; H₂O 18 g/mol. Queimando 4 g de H₂ (2 mol): formam-se 2 mol de água = <strong>36 g</strong>.</p></div>
<h4>3. Concentração e diluição</h4>
<ul><li><strong>Concentração comum</strong>: massa do soluto ÷ volume da solução (g/L).</li><li><strong>Molaridade</strong>: mols do soluto ÷ volume em litros (mol/L).</li><li><strong>Diluição</strong>: adicionar solvente não muda a quantidade de soluto. Logo M₁ · V₁ = M₂ · V₂.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>(1) Volume em <strong>mL</strong> usado como se fosse litro. (2) Confundir g/L com mol/L: 23,4 g/L de NaCl são 0,4 mol/L (massa molar 58,5). (3) Na diluição, o volume que entra na conta é o <strong>final</strong> (soluto + água adicionada).</p></div>
<h4>4. Ácidos, bases e pH</h4>
<p>pH = −log[H⁺]. Em água pura a 25 °C, pH = 7 (neutro); abaixo de 7, ácido; acima de 7, básico. A escala é <strong>logarítmica</strong>: a cada unidade de pH, a concentração de H⁺ muda <strong>10 vezes</strong>. Um pH 2 é 10.000 vezes mais ácido (em [H⁺]) que um pH 6.</p>
<p>Ácido + base → sal + água (neutralização). Um carbonato (como o calcário, CaCO₃) <strong>consome H⁺</strong> e por isso eleva o pH: é usado para corrigir solos e lagos ácidos.</p>
<h4>5. Como o Enem cobra</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a massa de produto formada", "a concentração final", "quantas vezes mais ácido", "o procedimento para corrigir". A prova costuma <strong>dar as massas molares</strong>. Escreva a proporção em mols e confira se o resultado faz sentido (a massa dos produtos conserva a dos reagentes).</p></div>`,
      resumo: [
        ['Mol e massa molar', 'Massa molar em g/mol; dados em gramas viram mols dividindo pela massa molar'],
        ['Coeficientes', 'Proporção em mols numa equação balanceada'],
        ['Concentração comum', 'g/L = massa do soluto ÷ volume da solução'],
        ['Molaridade', 'mol/L = mols do soluto ÷ volume em litros'],
        ['Diluição', 'M₁ · V₁ = M₂ · V₂ (o soluto não muda)'],
        ['pH', 'pH = −log[H⁺]; 7 é neutro; menor que 7 é ácido'],
        ['Escala de pH', 'Cada unidade muda [H⁺] em 10 vezes'],
        ['Neutralização', 'Ácido + base dá sal + água'],
        ['Calcário (CaCO₃)', 'Consome H⁺, elevando o pH de solos e lagos ácidos']
      ]
    },
    questions: [
      {
        id: 'N3.1', base: ['O metano queima segundo a equação balanceada CH₄ + 2 O₂ → CO₂ + 2 H₂O. Massas molares (g/mol): CH₄ = 16; CO₂ = 44.'],
        src: SRC, cmd: 'A queima completa de 32 g de metano libera, de gás carbônico, a massa de',
        alts: ['88 g.', '44 g.', '32 g.', '176 g.', '16 g.'],
        ans: 'A', pos: 'D', hab: 'H25', dif: 'média',
        ex: { A: '32 g de CH₄ são 2 mol; a proporção CH₄ : CO₂ é 1 : 1, então se formam 2 mol de CO₂ = 2 · 44 = 88 g.', B: 'seria a massa para 1 mol (16 g) de metano.', C: 'repete a massa do metano; massas de substâncias diferentes não são iguais.', D: 'multiplica por 2 o resultado correto, usando o coeficiente do O₂ no lugar do de CO₂.', E: 'é a massa de 1 mol de metano, não de CO₂.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N3.2', base: ['Dissolvem-se 11,7 g de cloreto de sódio (NaCl, massa molar 58,5 g/mol) em água suficiente para completar 500 mL de solução.'],
        src: SRC, cmd: 'A concentração dessa solução, em mol/L, é',
        alts: ['0,4.', '0,2.', '23,4.', '0,1.', '4,0.'],
        ans: 'A', pos: 'A', hab: 'H17', dif: 'média',
        ex: { A: 'n = 11,7 ÷ 58,5 = 0,2 mol; V = 0,5 L; M = 0,2 ÷ 0,5 = 0,4 mol/L.', B: 'é a quantidade de matéria (0,2 mol); falta dividir pelo volume em litros.', C: 'é a concentração em g/L (11,7 ÷ 0,5), não em mol/L.', D: 'divide os 0,2 mol por 2 L, ou usa o volume errado.', E: 'erra uma casa decimal na divisão final.' },
        traps: { C: 'detalhe' }
      },
      {
        id: 'N3.3', base: ['Em um laboratório, 100 mL de uma solução de concentração 0,6 mol/L são diluídos com água destilada até o volume final de 300 mL.'],
        src: SRC, cmd: 'A concentração da solução diluída, em mol/L, é',
        alts: ['0,2.', '0,6.', '1,8.', '0,3.', '0,1.'],
        ans: 'A', pos: 'B', hab: 'H17', dif: 'fácil',
        ex: { A: 'M₁V₁ = M₂V₂ ⇒ 0,6 · 100 = M₂ · 300 ⇒ M₂ = 0,2 mol/L.', B: 'seria a concentração antes da diluição.', C: 'multiplica por 3 em vez de dividir: diluir diminui a concentração.', D: 'divide por 2, usando só metade da razão de diluição.', E: 'divide por 6, sem base na razão 300 ÷ 100.' },
        traps: { C: 'oposto' }
      },
      {
        id: 'N3.4', base: ['O suco gástrico humano tem pH em torno de 2, enquanto o leite tem pH em torno de 6.'],
        src: SRC, cmd: 'Em relação ao leite, a concentração de íons H⁺ no suco gástrico é',
        alts: ['10.000 vezes maior.', '4 vezes maior.', '40 vezes maior.', '400 vezes maior.', '1.000 vezes maior.'],
        ans: 'A', pos: 'C', hab: 'H17', dif: 'média',
        ex: { A: 'a diferença é de 4 unidades de pH, e cada unidade corresponde a 10 vezes: 10⁴ = 10.000.', B: 'subtrai os pHs (6 − 2 = 4) e para por aí, ignorando a escala logarítmica.', C: 'multiplica 10 por 4 em vez de elevar 10 à quarta potência.', D: 'chega a 400 pela mesma confusão entre multiplicar e elevar.', E: 'usa 3 unidades de diferença (10³) em vez de 4.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N3.5', base: ['Em regiões atingidas por chuva ácida, lagos podem apresentar pH baixo, com prejuízo para peixes e outros organismos. Uma das medidas adotadas é espalhar calcário (carbonato de cálcio, CaCO₃) sobre a água.'],
        src: SRC, cmd: 'Essa medida diminui a acidez porque o carbonato',
        alts: ['reage com os íons H⁺, consumindo-os e elevando o pH.', 'libera íons H⁺ na água e aumenta a concentração hidrogeniônica.', 'absorve o gás oxigênio da água e reduz a acidez.', 'retira os peixes da região ácida da água.', 'é um ácido forte que neutraliza as bases do lago.'],
        ans: 'A', pos: 'E', hab: 'H25', dif: 'média',
        ex: { A: 'o íon carbonato reage com H⁺, formando espécies como bicarbonato ou CO₂ e água, o que consome H⁺ e eleva o pH.', B: 'faria o contrário: mais H⁺ significa menos pH, mais acidez.', C: 'não há relação entre carbonato e o oxigênio dissolvido para a acidez.', D: 'não descreve nenhum processo químico.', E: 'carbonato tem caráter básico, não é ácido; e o lago já está ácido, não básico.' },
        traps: { B: 'oposto' }
      }
    ],
    cards: [
      ['O que os coeficientes de uma equação balanceada indicam?', 'A proporção em mols (não em gramas)'],
      ['Como transformar gramas em mols?', 'Divida a massa pela massa molar'],
      ['Qual a fórmula da molaridade?', 'mol/L = quantidade de soluto (mol) ÷ volume da solução (L)'],
      ['Em uma diluição, o que não muda?', 'A quantidade de soluto (M₁V₁ = M₂V₂)'],
      ['O que significa pH menor que 7?', 'Solução ácida (mais H⁺ do que na água pura)'],
      ['A cada unidade de pH, quanto muda a concentração de H⁺?', '10 vezes'],
      ['O que o calcário faz num lago ácido?', 'Consome H⁺ e eleva o pH'],
      ['Que unidade de volume deve usar para molaridade?', 'Litros (converter mL antes)']
    ],
    vf: [
      ['Os coeficientes de uma equação balanceada indicam a proporção em gramas.', false, 'Indicam a proporção em mols. Para chegar às massas, multiplica-se pela massa molar.'],
      ['Diluir uma solução diminui a sua concentração, mas mantém a quantidade de soluto.', true, 'Acrescentar solvente só aumenta o volume.'],
      ['Uma solução de pH 3 tem 10 vezes mais H⁺ que uma de pH 4.', true, 'Uma unidade de pH corresponde a um fator 10 na concentração de H⁺.'],
      ['Adicionar um carbonato a uma água ácida torna a água ainda mais ácida.', false, 'O carbonato consome H⁺, elevando o pH.']
    ]
  });

  add('N', 'CN', {
    module: {
      id: 'N4', title: 'Mecânica e energia', habs: 'H20 e H23 (movimento, forças e transformações de energia)', faixa: 'A',
      note: 'Velocidade média, leis de Newton e conversão de energia caem todo ano em contextos de trânsito, usinas e esporte. Concentre-se em unidades, proporções e rendimento.',
      html: `<h4>1. O que a prova mede</h4>
<p>Mecânica no Enem é <strong>situação do cotidiano com poucas fórmulas</strong>: um carro, uma usina, um astronauta. O que se cobra é interpretar o enunciado, cuidar das unidades e raciocinar com <strong>proporção</strong> (o que acontece com uma grandeza se outra dobra).</p>
<h4>2. Velocidade média e unidades</h4>
<p>Velocidade média = distância percorrida ÷ intervalo de tempo. Para converter, <strong>km/h para m/s divida por 3,6</strong>; m/s para km/h multiplique por 3,6. Exemplo: 72 km/h = 20 m/s. A aceleração é a variação da velocidade por tempo: a = Δv ÷ Δt.</p>
<h4>3. Leis de Newton</h4>
<ul><li><strong>1ª</strong> (inércia): sem força resultante, o corpo mantém repouso ou movimento retilíneo uniforme.</li><li><strong>2ª</strong>: F = m · a. Para a mesma força, maior massa significa menor aceleração.</li><li><strong>3ª</strong> (ação e reação): forças iguais e opostas, aplicadas em <strong>corpos diferentes</strong>, por isso não se anulam.</li></ul>
<div class="box conceito"><b class="box-t">Conceito</b><p><strong>Massa</strong> (kg) é a quantidade de matéria e não muda de lugar. <strong>Peso</strong> (N) é a força gravitacional: P = m · g. Na Lua (g ≈ 1,6 m/s²), uma pessoa tem a mesma massa e peso bem menor que na Terra (g ≈ 10 m/s²).</p></div>
<h4>4. Energia, trabalho e rendimento</h4>
<ul><li>Energia cinética: m · v² ÷ 2. Energia potencial gravitacional: m · g · h.</li><li>Trabalho de uma força: força · deslocamento (na direção da força). Potência: trabalho ÷ tempo.</li><li><strong>Conservação</strong>: a energia não some, se transforma. Em sistemas reais, parte vira calor.</li><li><strong>Rendimento</strong> = energia (ou potência) útil ÷ energia (ou potência) total.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>A energia cinética depende de v²: <strong>dobrar a velocidade quadruplica a energia</strong> (e a distância de frenagem). E rendimento nunca passa de 100%: se o resultado deu 125%, a razão está invertida.</p></div>
<h4>5. Como o Enem cobra</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a velocidade média em m/s", "o rendimento da usina", "o que ocorre com a energia se a velocidade dobra", "a força resultante". Usinas hidrelétricas (energia potencial da água → cinética → elétrica), térmicas e eólicas aparecem como exemplos de <strong>transformação de energia</strong>, com discussão de impactos ambientais.</p></div>`,
      resumo: [
        ['Velocidade média', 'Distância ÷ tempo'],
        ['Conversão', 'km/h ÷ 3,6 = m/s; m/s × 3,6 = km/h'],
        ['2ª lei de Newton', 'F = m · a'],
        ['3ª lei de Newton', 'Ação e reação: forças em corpos diferentes, que não se anulam'],
        ['Massa e peso', 'Massa em kg não muda; peso P = m · g em newtons'],
        ['Energia cinética', 'm · v² ÷ 2: dobrar v quadruplica'],
        ['Energia potencial', 'm · g · h'],
        ['Rendimento', 'Útil ÷ total; nunca passa de 100%'],
        ['Conservação de energia', 'A energia se transforma; parte vira calor']
      ]
    },
    questions: [
      {
        id: 'N4.1', base: ['Um carro percorre 150 km em 2 horas e 30 minutos, sem paradas.'],
        src: SRC, cmd: 'A velocidade média desse carro, em m/s, é aproximadamente',
        alts: ['16,7.', '60,0.', '20,8.', '216,0.', '1,7.'],
        ans: 'A', pos: 'E', hab: 'H20', dif: 'média',
        ex: { A: '150 ÷ 2,5 = 60 km/h; 60 ÷ 3,6 ≈ 16,7 m/s.', B: 'é a velocidade correta, mas em km/h; falta converter para m/s.', C: 'usa 2 horas (150 ÷ 2 = 75 km/h) em vez de 2,5 h.', D: 'multiplica por 3,6 em vez de dividir.', E: 'não resulta de nenhum cálculo coerente com os dados.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N4.2', base: ['Um veículo de massa constante trafega a 36 km/h e, em seguida, acelera até 72 km/h, o dobro da velocidade inicial.'],
        src: SRC, cmd: 'Nessa situação, a energia cinética do veículo',
        alts: ['quadruplicou.', 'dobrou.', 'permaneceu a mesma.', 'triplicou.', 'ficou oito vezes maior.'],
        ans: 'A', pos: 'C', hab: 'H20', dif: 'fácil',
        ex: { A: 'a energia cinética é m · v² ÷ 2; dobrar v multiplica a energia por 2² = 4.', B: 'trata a energia como proporcional à velocidade, mas ela depende de v².', C: 'a energia só permaneceria a mesma se a velocidade e a massa não mudassem.', D: 'não resulta da dependência quadrática.', E: 'seria o fator de 2³, e a dependência não é cúbica.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N4.3', base: ['Uma usina hidrelétrica recebe, da queda d\'água, energia em uma taxa de 500 MW. Sua produção de eletricidade é de 400 MW. A diferença se perde, principalmente, como calor e atrito.'],
        src: SRC, cmd: 'O rendimento dessa usina é de',
        alts: ['80%.', '125%.', '20%.', '90%.', '45%.'],
        ans: 'A', pos: 'D', hab: 'H23', dif: 'fácil',
        ex: { A: 'rendimento = potência útil ÷ potência total = 400 ÷ 500 = 0,8 = 80%.', B: 'inverte a razão (500 ÷ 400); um rendimento não pode passar de 100%.', C: 'é a fração perdida (100 MW de 500 MW), não o rendimento.', D: 'não corresponde à razão entre as potências dadas.', E: 'não corresponde à razão entre as potências dadas.' },
        traps: { B: 'oposto' }
      },
      {
        id: 'N4.4', base: ['Um astronauta de 70 kg viaja até a Lua, onde a aceleração da gravidade é de aproximadamente 1,6 m/s².'],
        src: SRC, cmd: 'Na superfície da Lua, a massa e o peso desse astronauta são, respectivamente,',
        alts: ['70 kg e 112 N.', '11,2 kg e 112 N.', '70 kg e 700 N.', '11,2 kg e 700 N.', '112 kg e 70 N.'],
        ans: 'A', pos: 'B', hab: 'H20', dif: 'média',
        ex: { A: 'a massa não depende do local: 70 kg. O peso é P = m · g = 70 · 1,6 = 112 N.', B: 'afirma que a massa diminuiu, mas ela é a mesma em qualquer lugar.', C: '700 N seria o peso na Terra (g ≈ 10 m/s²).', D: 'erra a massa e usa o peso da Terra.', E: 'troca as grandezas e as unidades.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N4.5', base: ['Uma caixa de massa 20 kg está sobre uma superfície sem atrito e recebe, na horizontal, uma força resultante de 50 N.'],
        src: SRC, cmd: 'A aceleração adquirida pela caixa, em m/s², é',
        alts: ['2,5.', '0,4.', '1.000.', '30.', '70.'],
        ans: 'A', pos: 'A', hab: 'H20', dif: 'fácil',
        ex: { A: 'F = m · a ⇒ a = 50 ÷ 20 = 2,5 m/s².', B: 'inverte a divisão (20 ÷ 50).', C: 'multiplica força e massa.', D: 'subtrai a massa da força (50 − 20).', E: 'soma a força com a massa (50 + 20).' },
        traps: { B: 'oposto' }
      }
    ],
    cards: [
      ['Como converter km/h em m/s?', 'Divida por 3,6'],
      ['Qual a 2ª lei de Newton?', 'F = m · a'],
      ['Por que ação e reação não se anulam?', 'Atuam em corpos diferentes'],
      ['Qual a diferença entre massa e peso?', 'Massa (kg) não muda de lugar; peso P = m · g (N) depende da gravidade'],
      ['O que ocorre com a energia cinética se a velocidade dobra?', 'Quadruplica (depende de v²)'],
      ['Qual a fórmula da energia potencial gravitacional?', 'm · g · h'],
      ['Como se calcula o rendimento?', 'Energia (ou potência) útil ÷ total'],
      ['Um rendimento pode ser maior que 100%?', 'Não: seria criar energia']
    ],
    vf: [
      ['Na Lua, a massa de uma pessoa é menor que na Terra.', false, 'A massa é a mesma; o que muda é o peso, porque a gravidade é menor.'],
      ['Dobrar a velocidade de um carro dobra sua energia cinética.', false, 'A energia cinética depende de v²: quadruplica.'],
      ['As forças de ação e reação têm o mesmo módulo e atuam em corpos diferentes.', true, 'Por isso não se cancelam.'],
      ['Uma máquina com rendimento de 120% é possível se for bem projetada.', false, 'Rendimento é útil ÷ total e não passa de 100%; do contrário haveria criação de energia.']
    ]
  });

  add('N', 'CN', {
    module: {
      id: 'N5', title: 'Genética: Mendel, heredogramas e sangue', habs: 'H13 e H15 (transmissão de características e modelos biológicos)', faixa: 'A',
      note: 'Genética cai todo ano e vale pontos fáceis: quase tudo é probabilidade com cruzamento simples. Domine o quadro de Punnett e a leitura de heredograma.',
      html: `<h4>1. O que a prova mede</h4>
<p>Genética no Enem é <strong>um cruzamento simples mais uma conta de probabilidade</strong>, quase sempre em contexto de saúde (doenças hereditárias, tipo sanguíneo, daltonismo). Entenda poucos termos e monte o quadro de cruzamento.</p>
<h4>2. Termos que fazem diferença</h4>
<ul><li><strong>Gene</strong>: trecho do DNA; <strong>alelos</strong> são as versões do gene (A e a).</li><li><strong>Genótipo</strong>: os alelos do indivíduo (AA, Aa, aa). <strong>Fenótipo</strong>: a característica que aparece.</li><li><strong>Dominante</strong>: aparece mesmo em heterozigoto (Aa). <strong>Recessivo</strong>: só aparece em homozigoto (aa).</li></ul>
<h4>3. Primeira lei de Mendel</h4>
<p>Cada indivíduo tem dois alelos e passa um deles a cada gameta. Do cruzamento <strong>Aa × Aa</strong> saem AA, Aa, Aa e aa: proporção genotípica 1 : 2 : 1 e fenotípica 3 dominantes : 1 recessivo. Se os pais são normais e têm filho afetado, a doença é <strong>recessiva</strong> e os pais são portadores (Aa). A chance de cada filho ser afetado é 1/4, <strong>independente</strong> dos filhos anteriores.</p>
<div class="box exemplo"><b class="box-t">Exemplo</b><p>Casal normal, ambos Aa. Probabilidade de ter uma criança aa: 1/4. Probabilidade de a criança ser menina <em>e</em> aa: 1/2 · 1/4 = <strong>1/8</strong>. Eventos independentes: multiplica.</p></div>
<h4>4. Sangue e herança ligada ao X</h4>
<ul><li><strong>Sistema ABO</strong>: alelos IA e IB (codominantes entre si) e i (recessivo). Tipo A: IAIA ou IAi; B: IBIB ou IBi; AB: IAIB; O: ii.</li><li><strong>Fator Rh</strong>: Rh+ é dominante, Rh− é recessivo.</li><li><strong>Ligada ao X</strong> (daltonismo, hemofilia): geralmente recessiva. Homens (XY) têm um só X, então a manifestam com mais frequência; mulheres só se tiverem os dois X afetados. Pai afetado passa o X a todas as filhas, e <strong>nunca</strong> ao filho homem.</li></ul>
<div class="box pegadinha"><b class="box-t">Pegadinha</b><p>Confundir "probabilidade de ser menino daltônico" (entre <em>todas</em> as crianças) com "probabilidade de o menino ser daltônico" (entre os meninos): a segunda é o dobro da primeira. Leia a pergunta com calma. E lembrar que cada filho é um novo sorteio, mesmo que o primeiro já tenha nascido afetado.</p></div>
<h4>5. Heredogramas</h4>
<div class="box enem"><b class="box-t">No Enem</b><p>Comandos típicos: "a probabilidade de o próximo filho", "o tipo de herança", "qual o genótipo do indivíduo". Pistas: <strong>pais normais com filho afetado</strong> indica recessivo; <strong>afetado sempre com ao menos um pai afetado</strong> aponta para dominante; filha afetada de pai normal exclui herança recessiva ligada ao X.</p></div>`,
      resumo: [
        ['Alelos', 'Versões de um gene (A e a)'],
        ['Genótipo e fenótipo', 'Genes presentes e característica que aparece'],
        ['Aa × Aa', 'Genótipos 1 AA : 2 Aa : 1 aa; fenótipos 3 : 1'],
        ['Pais normais, filho afetado', 'Doença recessiva; pais Aa'],
        ['Eventos independentes', 'Probabilidades se multiplicam (menina E aa)'],
        ['ABO', 'IA e IB codominantes; i recessivo; tipo O é ii'],
        ['Rh', 'Rh+ dominante; Rh− recessivo'],
        ['Recessivo ligado ao X', 'Mais comum em homens; pai afetado não passa ao filho homem'],
        ['Cada filho', 'É um novo sorteio: o resultado anterior não altera a chance']
      ]
    },
    questions: [
      {
        id: 'N5.1', base: ['O albinismo é uma condição de herança autossômica recessiva. Um casal sem albinismo tem um filho albino e deseja ter outro filho.'],
        src: SRC, cmd: 'A probabilidade de o segundo filho também ser albino é de',
        alts: ['25%.', '50%.', '75%.', '0%.', '100%.'],
        ans: 'A', pos: 'A', hab: 'H13', dif: 'fácil',
        ex: { A: 'o casal tem filho aa, logo os pais são Aa. Em Aa × Aa, a chance de aa é 1/4 = 25%, a cada filho.', B: 'seria o caso de um genitor aa e outro Aa.', C: 'é a chance de a criança ser sem albinismo (A_), não de ser albina.', D: 'o primeiro filho albino não impede um segundo: cada gestação é independente.', E: 'só ocorreria se ambos os pais fossem aa, o que contraria o enunciado.' },
        traps: { C: 'oposto' }
      },
      {
        id: 'N5.2', base: ['Em uma planta, a cor vermelha das flores (V) é dominante sobre a branca (v). Uma planta Vv é cruzada com outra planta Vv, e uma das sementes obtidas é escolhida ao acaso.'],
        src: SRC, cmd: 'A probabilidade de uma semente dar planta com flor vermelha e genótipo heterozigoto é de',
        alts: ['50%.', '75%.', '25%.', '100%.', '12,5%.'],
        ans: 'A', pos: 'B', hab: 'H13', dif: 'média',
        ex: { A: 'Vv × Vv dá 1/4 VV, 2/4 Vv e 1/4 vv; heterozigotos (vermelhas) são 2/4 = 50%.', B: 'são todas as plantas vermelhas (VV ou Vv), que incluem as homozigotas.', C: 'é a probabilidade de VV, ou a de vv, isoladamente.', D: 'o cruzamento de dois heterozigotos não gera só vermelhas heterozigotas.', E: 'não corresponde a nenhuma razão do cruzamento.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N5.3', base: ['Um homem do tipo sanguíneo A (genótipo IAi) e uma mulher do tipo B (genótipo IBi) planejam ter um filho.'],
        src: SRC, cmd: 'A probabilidade de o filho ter sangue do tipo O é de',
        alts: ['1/4.', '1/2.', '0.', '3/4.', '1/8.'],
        ans: 'A', pos: 'C', hab: 'H13', dif: 'média',
        ex: { A: 'IAi × IBi dá IA IB (AB), IA i (A), IB i (B) e ii (O), 1/4 cada. O tipo O é ii: 1/4.', B: 'é a probabilidade de o filho ser A ou B, ou de ser AB ou O.', C: 'o tipo O é possível, pois ambos os pais carregam o alelo i.', D: 'é a probabilidade de o filho ser de qualquer tipo, menos O.', E: 'não corresponde a nenhuma razão do cruzamento.' },
        traps: { C: 'oposto' }
      },
      {
        id: 'N5.4', base: ['O daltonismo é uma condição recessiva ligada ao cromossomo X. Uma mulher com visão normal, portadora do alelo (XDXd), e um homem com visão normal (XDY) planejam ter um filho.'],
        src: SRC, cmd: 'A probabilidade de a criança ser um menino daltônico é de',
        alts: ['1/4.', '1/2.', '1/8.', '0.', '3/4.'],
        ans: 'A', pos: 'E', hab: 'H13', dif: 'difícil',
        ex: { A: 'os gametas femininos XD e Xd se combinam com XD ou Y: XDXD, XDXd, XDY, XdY (1/4 cada). O menino daltônico é XdY: 1/4.', B: 'seria a probabilidade de um menino ser daltônico, já sabendo que é menino (1/2 dos meninos).', C: 'não corresponde ao cruzamento.', D: 'o pai é normal, mas a mãe é portadora: meninos podem herdar o Xd.', E: 'é a probabilidade de a criança ser normal para o daltonismo.' },
        traps: { B: 'detalhe' }
      },
      {
        id: 'N5.5', base: ['Em uma família, um casal sem determinada doença hereditária teve uma filha com a doença. Não há consanguinidade conhecida e a doença não é de origem mitocondrial.'],
        src: SRC, cmd: 'O tipo de herança mais provável dessa doença é',
        alts: ['autossômica recessiva.', 'autossômica dominante.', 'recessiva ligada ao X.', 'dominante ligada ao X.', 'ligada ao cromossomo Y.'],
        ans: 'A', pos: 'D', hab: 'H15', dif: 'média',
        ex: { A: 'pais sem a doença com filha afetada indicam alelo recessivo em ambos os pais; e uma filha afetada de pai sem a doença exclui a herança recessiva ligada ao X: a herança é autossômica.', B: 'na herança dominante, ao menos um dos pais afetados teria a doença, o que contraria o enunciado.', C: 'uma filha afetada de herança recessiva ligada ao X precisaria receber um X afetado do pai, que seria afetado também; mas o pai é normal.', D: 'na herança dominante, um dos pais também seria afetado.', E: 'herança ligada ao Y só ocorre em homens, e a criança é uma menina.' },
        traps: { B: 'oposto' }
      }
    ],
    cards: [
      ['Qual a proporção fenotípica de Aa × Aa (dominância completa)?', '3 dominantes : 1 recessivo'],
      ['Pais normais com filho afetado: dominante ou recessivo?', 'Recessivo; os pais são heterozigotos (Aa)'],
      ['Cada filho é um novo sorteio?', 'Sim; o resultado dos anteriores não altera a probabilidade'],
      ['Quais os genótipos possíveis do sangue tipo O?', 'Somente ii'],
      ['Que alelos do sistema ABO são codominantes?', 'IA e IB'],
      ['Por que o daltonismo é mais frequente em homens?', 'Homens têm um só X; o alelo recessivo se manifesta sem precisar de um segundo'],
      ['Pai daltônico pode ter filho homem daltônico por herança do pai?', 'Não: o filho recebe o Y do pai e o X da mãe'],
      ['Como combinar probabilidades de eventos independentes?', 'Multiplicando (menina E aa: 1/2 · 1/4)']
    ],
    vf: [
      ['Se um casal já teve um filho com uma doença recessiva, o próximo terá a doença com certeza.', false, 'Cada filho tem 1/4 de chance, independentemente dos anteriores.'],
      ['Pessoas do tipo sanguíneo O têm genótipo ii.', true, 'O alelo i é recessivo e só se manifesta em homozigose.'],
      ['Em Aa × Aa, três quartos dos descendentes têm o fenótipo dominante.', true, 'AA e Aa (3/4) mostram o fenótipo dominante.'],
      ['Uma filha afetada por herança recessiva ligada ao X pode ter pai sem a doença.', false, 'A filha recebe um X do pai, então ele precisa ter o alelo e, sendo homem, manifestá-lo.']
    ]
  });
})(window.DATA);
