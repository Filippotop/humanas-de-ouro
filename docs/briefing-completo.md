# Humanas de Ouro: briefing completo para uma sessão nova

> Cole este arquivo no início da sessão (ou peça: "leia docs/briefing-sessao.md"). Reúne o que importa sobre o projeto, o usuário e as regras de trabalho. Estado conferido em 31/10/2026. O que é suposição está marcado.

## 1. O usuário e como responder

- Estuda sozinho para o **Enem 2026**: **dia 1 em 08/11** (Linguagens, Ciências Humanas e Redação) e **dia 2 em 15/11** (Ciências da Natureza e Matemática).
- Responda sempre em **português**: bem fundamentado, didático, com pesquisa em fontes confiáveis e em mais de um site.
- Preferência explícita dele: **conselheiro brutalmente honesto**. Sem elogio, sem validação, sem suavizar. Questione suposições, aponte desculpas, subestimação de esforço e custo de oportunidade. Termine com um plano preciso e priorizado.
- Ele só estuda o dia 2 quando se sentir pronto para o dia 1. O app transformou isso em critério numérico (seção 5).
- Usa o app em **três lugares**: a versão dentro do Claude, o site no computador e o site no celular Android (instalado como PWA). Ele decidiu manter os três.
- Ele tem outros projetos no claude.ai (Transpetro, jogos). **Não** os misture com este. A pasta `bancada/` do repositório é de outra frente (Transpetro): não mexa nela.

## 2. O projeto

- App: <https://filippotop.github.io/humanas-de-ouro/> (GitHub Pages). Repositório: `Filippotop/humanas-de-ouro`.
- PWA estático, **sem build**: `index.html` (script inline), `pwa.js`, `sw.js`, `merge.js`, `gist-sync.js` e `data/*.js`. Funciona offline depois do primeiro acesso.
- O progresso `S` fica em `localStorage['humanas-de-ouro-v1']`. Dentro do claude.ai o app usa `window.claude.use('db')`.
- Provas oficiais de 2024 e 2025 recortadas por questão em `provas/<id>/qNNN.webp`, com gabarito em `DATA.exams` (conferido contra os PDFs do Inep).

## 3. O que está pronto e no ar

| Entrega | Detalhe |
|---|---|
| Humanas | 31 módulos (História 10, Geografia 9, Filosofia 7, Sociologia 5). Cada um com aprofundamento, **"Como o Enem cobra"** (cita as questões oficiais mapeadas), **pegadinhas** e 3 questões extras. |
| Linguagens | 14 módulos (L1 a L14) e 70 questões inéditas, voltados aos erros dele de 2025. |
| Redação | 8 estações, oficina com projeto de texto, cronômetro e correção por competência. |
| Modo Dia 1 | Dia 2 guardado até um critério (seção 5). Plano novo de 23/10 a 14/11. |
| Design | Tela inicial com "Próximo passo", anéis por área, ícones SVG, um botão principal por prova, quadros didáticos (Conceito, Exemplo, No Enem, Pegadinha, Conexão), sumário no celular, escala de fontes e espaçamentos. Crítica em `docs/design-critique-2026-10.md`. |
| Sincronização | Entre aparelhos por **Gist secreto** do próprio usuário (seção 6). |
| Testes | `npm test`: junção (17 testes), service worker e um teste de fumaça com Chromium (dados, integridade, navegação, 8 abas × 3 tamanhos × 2 temas, acessibilidade, offline, sincronização). |

Histórico: PRs #1 a #5 mesclados. Especificação em `docs/superpowers/specs/2026-10-23-dia1-design.md` e plano em `docs/superpowers/plans/2026-10-23-dia1.md`.

**Diagnóstico dele no 1º dia de 2025** (papel, lançado no app): **72/90**. Linguagens 37/45, Humanas 35/45. Questões erradas: 3, 7, 15, 17, 23, 25, 36, 38, 46, 50, 66, 67, 69, 76, 79, 81, 83, 90. O mapa erro → módulo está em `ERRMOD` no `index.html`.

## 4. Decisões que o usuário já tomou (não reabra)

- Conteúdo: "fazer de tudo" e "quanto mais material melhor", inclusive em Linguagens.
- Dia 2: **Modo Dia 1 + critério** (sem apagar nada, só guardar).
- Design: manter o escopo quase igual, mais profissional e didático.
- Aplicativo: continua nativo (PWA), com salvamento automático entre aparelhos.
- Entrega: em fases, cada uma com testes verdes, PR, merge e conferência do Pages.

## 5. Modo Dia 1 (regras do cadeado)

Em `index.html`, `dia2Status()`. O dia 2 libera se:

1. houver uma tentativa do `24d1` **entregue**, em **modo prova** (cronometrada), com as duas áreas (`areas === 'LH'`) e **≥ 72 acertos** (`DIA2_META`); ou
2. ele liberar à mão (`S.dia2 = {t, via:'manual'}`, dois toques); ou
3. a data for ≥ **2026-11-09** (`DIA2_DATA`).

O simulado do critério estava marcado para **domingo 01/11/2026**. **Não sei se foi feito nem a nota**: pergunte.

## 6. Sincronização por Gist

- `gist-sync.js` roda só no app instalado e no github.io (`window.__PWA`). A versão dentro do Claude não alcança serviços externos e leva progresso por link ou exportação.
- Gist secreto com descrição `humanas-de-ouro-progresso` e arquivo `progresso.json`. O token (só permissão `gist`) fica em `localStorage['hdo-gist']`, **fora** do progresso: nunca vai para a exportação, para o link nem para o repositório.
- Configuração: criar chave em <https://github.com/settings/tokens/new?scopes=gist&description=Humanas%20de%20Ouro> e colar em **Aa → Copiar ou importar progresso**, uma vez por aparelho.
- `merge.js` (`mergeS`) junta os dois lados sem perder trabalho: primeira resposta vence em `ans`, mais recente em `vf/recal/redo`, máximo em `read/best/act`, união em provas e rascunhos. **Exclusões** usam `S.del` (via `markDel(caminho, true)`) e o "Zerar progresso" usa `S.reset`. Toda ação nova de apagar precisa registrar `markDel`.
- Todo envio lê o Gist antes de escrever. Durante prova e oficina de redação, a leitura não troca `S` (essas telas guardam referências).
- O `sw.js` não guarda nada de `api.github.com`.

## 7. Arquitetura mínima para estender

- Ordem de carga dos dados (antes do script do app): `base.js`, `linguagens.js`, `enem-map.js`, `aprofundamento-fs.js`, `aprofundamento-hg.js`. `applyDeep()` junta `DATA.deep[id] = {html, questions}` ao módulo.
- **Módulo:** `{id, title, habs, faixa, note, html, resumo:[[termo, definição]], vol, line, qs:[ids]}`. **Questão:** `{id, vol, n, tag, base:[], src, cmd, alts:[5], mod, ans, ex:{A..E}, hab, dif, traps, kind}`. Todas as 5 letras precisam de explicação.
- Linhas hoje: H, G, F, S (Humanas), L (Linguagens), R (Redação). Linha nova exige entrada em `LINES` e `STUDY_LINES` e uma cor. Modelo a copiar: `data/linguagens.js` (função `L(x)` e `placeAnswer`).
- **Arquivo de dados novo exige 3 coisas:** tag `<script>` no `index.html`, caminho em `SHELL_FILES` do `sw.js` (senão abre em branco offline) e **subir o `VER` do `sw.js`**.
- `tools/data_io.py` (`load` e `dump`) lê e grava `data/*.js` com ida e volta exata.
- Caixas didáticas: `.box.conceito`, `.exemplo`, `.enem`, `.pegadinha`, `.conexao`, cada uma com `<b class="box-t">`. Citação clicável de questão oficial: `<a data-ex="25d1" data-n="50">`.
- Tokens de design: `--fs-1..7` (12 a 36 px), `--sp-1..8` (4 a 40 px), `--r-sm`, `--r-lg`, `--shadow-1`, `--ease`.

## 8. Como trabalhar e entregar

- TDD de verdade: teste que **falha primeiro**, depois o código mínimo, depois a suíte inteira (`npm install && npm test`). Faça a mutação (quebre de propósito e veja o teste falhar).
- Entrega em fases: branch designado → testes verdes → PR → merge com `expectedHeadSha` completo (40 caracteres) → conferir `VER` ao vivo com `curl https://filippotop.github.io/humanas-de-ouro/sw.js`.
- Antes de fechar um trabalho grande, faça uma **revisão final com um revisor novo** (modelo mais capaz). Na última, ele achou três problemas reais que meus testes não pegaram.
- Não abra PR sem o usuário pedir. Se o PR do branch já foi mesclado, recomece o branch a partir do `main` atual.

## 9. Armadilhas que já custaram caro

1. **Spoiler do simulado.** O aprofundamento citava as respostas do `24d1`, a prova que libera o dia 2. Corrigido com `spoil24()` e `modHtml()`. Regra geral: **nenhum conteúdo pode revelar questão ou resposta de uma prova que ele ainda vai fazer como diagnóstico ou simulado.**
2. **Gabarito concentrado numa letra** (60% em B nas primeiras questões). Mantenha a distribuição equilibrada; há teste.
3. **Exclusões ressuscitadas** pela sincronização (item da seção 6).
4. **Texto com direitos autorais.** Use texto escrito para a apostila ou de domínio público com redação conferida.
5. **TLS do Inep.** O servidor manda a cadeia incompleta: baixe o certificado intermediário (GlobalSign, `rnpicpedugr46ovtlsca2025.crt`), valide contra as raízes do sistema e **nunca desligue a verificação TLS**.
6. **Teste que não testa nada.** Já houve seletor que passava em branco. Prove cada teste novo com uma mutação.
7. **CSS.** Largura de texto no celular quebra com tabela larga: use `minmax(0,1fr)`. A classe `.ring` já existia (a nova é `.aring`).

## 10. Pendências conhecidas (menores, não bloqueiam)

- O módulo S1 cita a questão 90 de 2024, que o `enemMap` atribui a S2.
- No celular, o popover do menu **Aa** pode abrir atrás do cabeçalho.
- A janela da questão oficial não prende o foco do teclado nem o devolve ao fechar.
- Se o Gist for apagado (404), o aviso diz "sem internet" em vez de "reconecte"; erro 403 por limite aparece como "chave ruim".
- Atualização que chega no meio de um jogo da Arena reinicia a partida.
- Limite do envio rápido ao sair conta caracteres, não bytes. Com mais de 100 Gists, o app pode criar um duplicado.
- Na primeira abertura após um deploy, `index.html` e `data/*.js` podem vir de versões diferentes (já existia antes).
- O CSS antigo mantém valores soltos; os tokens só valem para o que foi editado.

## 11. Para esta sessão: o 2º dia

O objetivo é preparar o **dia 2 (Natureza e Matemática)**. **Fato:** o app não tem módulos de estudo dessas duas áreas; só tem as provas oficiais de 2024 e 2025 do dia 2 (questões 91 a 180) e o plano de 09 a 14/11. A especificação do dia 1 deixou esse conteúdo fora do escopo.

Comece assim:

1. Peça o relatório: aba **Painel → "Copiar relatório"** (notas por prova, domínio por módulo, erros recentes, estado do plano). Sem ele, qualquer plano é chute.
2. Pergunte: nota do simulado de 01/11 (ou se não fez), horas por dia até 14/11 e se já tentou alguma prova de Natureza ou Matemática.
3. Defina o escopo com ele, com honestidade sobre o custo: construir teoria de Física, Química, Biologia e Matemática em poucos dias dá material raso. **Opinião minha, não fato:** guie pelos erros do diagnóstico, não pelo currículo.
4. Aplique a regra do spoiler (seção 9, item 1) às provas do dia 2.
