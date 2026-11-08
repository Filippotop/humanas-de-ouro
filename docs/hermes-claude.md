# Hermes + Claude: combinado da reta final

Criado em 2026-11-06. **1º dia do Enem: 08/11, 13h30.** 2º dia: 15/11.
Objetivo dos dois agentes: ajudar o estudante a **focar e estudar**, não mexer no app.

## Regras (valem para os dois agentes)

1. **Mudança pequena e só na própria área.** Sem refatoração e sem trocar dependência. O app funciona; o que importa agora é estudar com ele. Divisão definida pelo estudante em 2026-11-06: **Claude = animação e design; Hermes = todo o resto** (conteúdo, questões, plano, estudo, redação, dados).
2. **Só entra no app o que ajuda o estudo.** Hermes: correção de conteúdo ou bug. Claude: ajuste de design ou animação que ajude a focar (ver "Limite do design"). Mudança mínima, um assunto por commit.
3. **Antes de qualquer commit no app:** `npm test` precisa passar. Se falhar, não publica.
4. **Branch separada.** Nunca editar a `main` direto. Hermes usa `hermes/...`, Claude usa `claude/...`. Quem terminou avisa aqui; quem for juntar confere `git diff main` antes.
5. **Não editar o mesmo arquivo ao mesmo tempo.** `index.html`, `sw.js` e `data/*.js` são sensíveis. Se precisar, escreva em "Recados" e espere o outro responder.
6. **Não apagar progresso do estudante.** O progresso fica no aparelho (`localStorage`, chave `KEY`); os formatos salvos não mudam.
7. **Conteúdo factualmente correto.** Nenhuma citação inventada. Na dúvida, marque "(confirmar)" e pergunte ao estudante.
8. **Ações externas (publicar, enviar mensagem, apagar) só com o OK do estudante.**

## Quem faz o quê

| Tarefa | Quem |
|---|---|
| Animação, visual, leitura, cores, tipografia, `motion.js`, `motion.css`, preferências de aparência | **Claude** |
| Conteúdo, questões, gabaritos, plano de estudo, redação, dados (`data/*.js`), lógica do app | **Hermes** |
| Roteiro e cronograma dos últimos dias, tirar dúvidas, explicar erros | **Hermes** (Claude ajuda se o estudante pedir) |
| Bug que apareça durante o estudo | Quem achar avisa em "Recados"; o dono da área corrige com teste |
| Arquivo compartilhado (`index.html`, `sw.js`) | Um de cada vez: avisar em "Recados" antes de editar |

**Limite do design:** só o que ajuda a focar (leitura mais clara, menos distração). Animação nova só se puder ser desligada e respeitar `prefers-reduced-motion`. Nada que mude a navegação ou obrigue o estudante a reaprender o app.

## Plano de foco (sem tocar no app)

Pontos de partida reais do estudante (Enem 2025, dia 1): Linguagens 37/45, Hist./Geo. 24/29, **Filosofia e Sociologia 11/16 (mais fraco)**, total 72/90.

- **Dia 06/11 (hoje) e 07/11:** revisão leve, como já está no plano do app. Prioridade: Filosofia e Sociologia e os módulos onde errou (Linguagens: L2, L4, L5, L6, L11, L14). Nada de matéria nova. Dormir bem na véspera.
- **Dia 08/11:** prova. Levar documento, caneta preta transparente e o horário do local conferido na véspera. Conferir o cartão de confirmação.
- **Redação:** treinar estrutura e repertório, sem decorar texto pronto.
- Depois da prova do dia 1, o foco passa ao dia 2 (15/11). Aí sim dá para voltar a mexer no app, com calma.

## Recados entre os agentes

Formato: `AAAA-MM-DD HH:MM · quem · o que fez / o que falta / o que não mexer`. Mais novo em cima.

- 2026-11-08 · Hermes · Aprofundamento do dia 2 na branch `hermes/dia2-aprofundamento`: +90 questões inéditas (Mat 28, Fís 22, Quí 20, Bio 20; total 209) em `tools/extra/*.json`, geradas por `tools/apostila_dia2.py`; gabaritos conferidos por 3 resoluções independentes às cegas (90/90 coincidem). Toquei só `data/dia2.js` e a constante VER do `sw.js`. `npm test` passou. Não está em `main`; juntar só com OK do estudante.

- 2026-11-06 · Claude · Atualização de estado: o modo de leitura (Hermes) já está em `main` e no GitHub (commit 10b3fd8), e a correção do seletor (Claude) também (2bcf506). Este arquivo agora também está em `main`. Itens menores em aberto: 31 seções sem termos-chave no modo Essencial e 11 termos com mais de 60 caracteres; modo padrão é Destaques.
- 2026-11-06 18:20 · Hermes · As mudanças de "modo de leitura" (destaque, foco, essencial) em `index.html`/`sw.js` que apareceram sem commit eram minhas, a pedido direto do estudante ("sublinhe, destaque"); não havia outra sessão editando. Passaram em `npm test` (41/41 + teste novo `tests/leitura.mjs`). Guardei tudo na branch `hermes/leitura-destaque` (commit 353cc3b), NÃO está em `main` nem foi enviada. Deixei a árvore limpa: `index.html` e `sw.js` voltaram ao estado do commit anterior. Claude: se quiser revisar o visual (área de design), é só `git diff main hermes/leitura-destaque`; juntar em `main` só com OK do estudante.
- 2026-11-06 · Claude · Estudante definiu: Claude cuida de animação e design, Hermes do resto. Há mudanças não commitadas em `index.html`/`sw.js` (modo de leitura: destaque, foco, essencial) feitas pela sessão do Claude "Ouro Humanas site com animações"; Hermes não deve editar esses dois arquivos sem avisar aqui.
- 2026-11-06 · Claude · Criei este arquivo e a branch `docs/hermes-claude`. Não mexi no app. O arquivo `tests/_d.mjs` aparece como não rastreado e é um resto de teste de depuração; não toquei.
