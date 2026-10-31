# Humanas de Ouro: briefing para a sessão do 2º dia

> Cole este arquivo no início da nova sessão (ou peça: "leia docs/briefing-dia2.md"). Ele reúne só o que importa. Tudo que está em "Fatos" foi conferido no código e nos dados em 31/10/2026; o que é suposição está marcado como tal.

## 1. Quem é o usuário e como responder

- Estuda sozinho para o **Enem 2026**. Responda em **português**, bem fundamentado, didático, com fontes confiáveis.
- Preferência explícita: **conselheiro brutalmente honesto**. Sem elogio, sem validação. Questione suposições, aponte desculpas e custo de oportunidade, e termine com um plano priorizado.
- Prova: **dia 1 em 08/11/2026** (Linguagens, Humanas, Redação) e **dia 2 em 15/11/2026** (Ciências da Natureza e Matemática).
- Decisão dele: **só estuda o dia 2 quando se sentir pronto para o dia 1**. O app transformou isso em critério numérico (seção 4).

## 2. O que já está pronto (dia 1)

App em produção: <https://filippotop.github.io/humanas-de-ouro/> (PWA, funciona offline). Repositório: `Filippotop/humanas-de-ouro`.

- Humanas: 31 módulos (História 10, Geografia 9, Filosofia 7, Sociologia 5) com aprofundamento, "Como o Enem cobra", pegadinhas e questões extras.
- Linguagens: 14 módulos, 70 questões inéditas.
- Redação: 8 estações e oficina com correção por competência.
- Provas oficiais 2024 e 2025 recortadas por questão, com gabarito.
- Sincronização do progresso entre aparelhos por **Gist secreto** do próprio usuário (token só com a permissão `gist`, guardado em `localStorage['hdo-gist']`, nunca no repositório nem na exportação).
- `npm test` roda merge, service worker e um teste de fumaça com Chromium.

Diagnóstico dele no 1º dia de 2025 (feito no papel, lançado no app): **72/90**. Linguagens 37/45, Humanas 35/45. Erros: 3, 7, 15, 17, 23, 25, 36, 38, 46, 50, 66, 67, 69, 76, 79, 81, 83, 90.

## 3. O que o app tem para o dia 2: quase nada

**Fatos:**

| Item | Estado |
|---|---|
| Provas `25d2` e `24d2` (questões 91–180) | Imagens por questão em `provas/25d2/` e `provas/24d2/` (90 cada) e gabarito em `DATA.exams`. Natureza = 91–135, Matemática = 136–180. |
| Questões anuladas | 25d2: 123, 132, 174. 24d2: 129. |
| Módulos de estudo de Natureza e Matemática | **Não existem.** As linhas do app são só H, G, F, S, R e L. A especificação do dia 1 deixou "conteúdo do dia 2" fora do escopo. |
| Plano de 09 a 14/11 (em `data/base.js`) | 09/11 diagnóstico de Natureza (25d2) · 10/11 diagnóstico de Matemática (25d2) · 11/11 revisão pelos erros · 12/11 simulado `24d2` completo · 13/11 correção · 14/11 véspera leve. |
| Fluxo no papel | O app corrige prova feita no papel pelo gabarito oficial ("Lance as respostas"). |

**Consequência:** hoje o dia 2 do app é só **fazer, corrigir e revisar as duas provas oficiais**. Não há teoria, cartões nem questões de Física, Química, Biologia ou Matemática.

## 4. Modo Dia 1: quando o dia 2 está liberado

Em `index.html`, `dia2Status()`. O dia 2 libera se:

1. existir uma tentativa do `24d1` **entregue**, em **modo prova** (cronometrada) e com as duas áreas (`areas === 'LH'`), com **≥ 72 acertos** (`DIA2_META = 72`); ou
2. o usuário liberar manualmente (`S.dia2 = {t, via:'manual'}`, exige dois toques); ou
3. a data for ≥ **2026-11-09** (`DIA2_DATA`).

O simulado do critério está marcado para **domingo 01/11/2026**. **Não sei se foi feito nem a nota.** Pergunte antes de planejar qualquer coisa.

## 5. Como a nova sessão deve começar

1. **Peça o relatório de progresso.** No app, aba **Painel → "Copiar relatório"**: gera um texto com notas por prova, domínio por módulo, erros recentes, tipos de erro e estado do plano. Ele cola na conversa. Sem isso, qualquer plano é chute.
2. **Pergunte três coisas:** nota do simulado de 01/11 (ou se não fez), quantas horas por dia ele tem até 14/11, e se já tentou alguma prova de Natureza ou Matemática (mesmo no papel).
3. **Decida o escopo com ele**, de forma honesta. Duas rotas:
   - **A. Só estudar com o que existe:** diagnóstico em 09 e 10/11, revisão pelos erros, simulado 24d2. Custa zero de desenvolvimento, mas não ensina conteúdo.
   - **B. Construir módulos de Natureza e Matemática no app:** vale a pena só se o diagnóstico mostrar lacunas de conteúdo, não de leitura ou de tempo.

**Minha recomendação (opinião, não fato):** se for construir, faça **guiado pelos erros** e não por currículo. Natureza (Física, Química, Biologia) e Matemática têm muito mais assunto que Humanas, e escrever teoria de tudo em poucos dias dá material raso. Mapeie as questões de 2024 e 2025 para tópicos (como foi feito com `DATA.enemMap`) e cubra primeiro os tópicos onde ele mais erra.

## 6. Se for construir: arquitetura mínima

- App: `index.html` (script inline), `data/*.js`, `merge.js`, `gist-sync.js`, `sw.js`, `pwa.js`. Sem build.
- Os dados ficam em `window.DATA` e são carregados por `<script src="data/...">` **antes** do script do app, nesta ordem: `base.js`, `linguagens.js`, `enem-map.js`, `aprofundamento-fs.js`, `aprofundamento-hg.js`.
- **Módulo:** `{id, title, habs, faixa, note, html, resumo:[[termo, definição]], vol, line, qs:[ids]}`. A `line` hoje é H, G, F, S, R ou L. Uma linha nova (por exemplo `N` e `M`) exige entrada em `LINES`, `STUDY_LINES` e na cor, em `index.html`. Olhe como a linha `L` foi adicionada (commit da Fase 3).
- **Questão:** `{id, vol, n, tag, base:[], src, cmd, alts:[5], mod, ans, ex:{A..E}, hab, dif, traps:{letra: tipo}, kind}`. Todas as 5 letras precisam de explicação (o teste de integridade falha se faltar).
- **Modelo para copiar:** `data/linguagens.js`. A função `L(x)` monta módulo, questões, cartões e V ou F, e `placeAnswer` redistribui o gabarito.
- **Adicionar um arquivo de dados exige 3 coisas:** a tag `<script>` em `index.html`, o caminho em `SHELL_FILES` do `sw.js` (senão o app abre em branco offline) e **subir o `VER` do `sw.js`**.
- **Ler e gravar dados em lote:** `tools/data_io.py` (`load` e `dump`), com ida e volta exata.
- **Testes:** `npm install && npm test`. O `tests/smoke.mjs` descobre os arquivos pelas tags `<script>`. Veja `testIntegrity`, `testLinguagensData` e `testDeepContent` como moldes.
- **Fluxo de entrega que já usamos:** TDD (teste que falha primeiro), PR, merge com `expectedHeadSha` completo (40 caracteres), e depois conferir o `VER` ao vivo com `curl https://filippotop.github.io/humanas-de-ouro/sw.js`.

## 7. Armadilhas que já custaram caro

1. **Spoiler do simulado.** O aprofundamento do dia 1 citava as respostas do `24d1`, a prova que libera o dia 2. Foi corrigido com `spoil24()` e `modHtml()`. **Mesma regra aqui:** `25d2` é o diagnóstico (09 e 10/11) e `24d2` é o simulado (12/11). Nenhum conteúdo novo pode citar essas questões ou suas respostas antes de a prova ser entregue.
2. **Gabarito concentrado numa letra.** Nas questões novas de Linguagens, 60% caíram na B. Hoje há teste de distribuição (no conteúdo de aprofundamento, entre 10% e 32% por letra); mantenha para qualquer questão nova.
3. **Exclusões que voltavam com a sincronização.** `merge.js` usa `S.del` e `S.reset`. Se criar qualquer ação de "apagar", registre com `markDel(caminho, true)`.
4. **Texto com direitos autorais.** Use textos escritos para a apostila ou de domínio público com redação conferida.
5. **Gabaritos oficiais.** Foram conferidos contra os PDFs do Inep. O servidor do Inep manda a cadeia de certificados incompleta: baixe o certificado intermediário (GlobalSign, `rnpicpedugr46ovtlsca2025.crt`), valide contra as raízes do sistema e **nunca desligue a verificação TLS**.
6. **Teste fraco passa em branco.** Já houve teste que não testava nada. Quando escrever um, faça a mutação: quebre o código de propósito e veja o teste falhar.

## 8. Regras de ambiente para a nova sessão

- Desenvolva e envie só no branch que a sessão designar. Não abra PR sem o usuário pedir.
- Nunca grave o token do Gist, nem outro segredo, em arquivo do repositório.
- Se um PR já foi mesclado, recomece o branch a partir do `main` atual em vez de empilhar commits.
- O `main` também recebe trabalho de outra frente (a pasta `bancada/`, da Transpetro). Não mexa nela.
