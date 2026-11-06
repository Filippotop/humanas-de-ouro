# Hermes + Claude: combinado da reta final

Criado em 2026-11-06. **1º dia do Enem: 08/11, 13h30.** 2º dia: 15/11.
Objetivo dos dois agentes: ajudar o estudante a **focar e estudar**, não mexer no app.

## Regras (valem para os dois agentes)

1. **Congelado.** Sem funcionalidade nova, sem animação nova, sem refatoração, sem trocar dependência. O app funciona; o que importa agora é estudar com ele.
2. **Só entra no app o que corrige erro.** Erro de conteúdo (gabarito, texto, data) ou bug que atrapalha o estudo. Mudança mínima, um assunto por commit.
3. **Antes de qualquer commit no app:** `npm test` precisa passar. Se falhar, não publica.
4. **Branch separada.** Nunca editar a `main` direto. Hermes usa `hermes/...`, Claude usa `claude/...`. Quem terminou avisa aqui; quem for juntar confere `git diff main` antes.
5. **Não editar o mesmo arquivo ao mesmo tempo.** `index.html`, `sw.js` e `data/*.js` são sensíveis. Se precisar, escreva em "Recados" e espere o outro responder.
6. **Não apagar progresso do estudante.** O progresso fica no aparelho (`localStorage`, chave `KEY`); os formatos salvos não mudam.
7. **Conteúdo factualmente correto.** Nenhuma citação inventada. Na dúvida, marque "(confirmar)" e pergunte ao estudante.
8. **Ações externas (publicar, enviar mensagem, apagar) só com o OK do estudante.**

## Quem faz o quê

| Tarefa | Quem |
|---|---|
| Ajudar a priorizar o que estudar hoje, montar roteiro e cronograma dos últimos dias | Hermes (ou qualquer um, sem tocar no código) |
| Tirar dúvidas de conteúdo, explicar erros, revisar redação | Hermes e Claude |
| Verificar que o app abre e funciona offline no celular antes da prova | Claude |
| Corrigir erro de gabarito ou bug que apareça durante o estudo | Quem achar avisa em "Recados"; Claude corrige com teste |
| Qualquer coisa que mude a aparência ou a estrutura | **Ninguém, até depois da prova** |

## Plano de foco (sem tocar no app)

Pontos de partida reais do estudante (Enem 2025, dia 1): Linguagens 37/45, Hist./Geo. 24/29, **Filosofia e Sociologia 11/16 (mais fraco)**, total 72/90.

- **Dia 06/11 (hoje) e 07/11:** revisão leve, como já está no plano do app. Prioridade: Filosofia e Sociologia e os módulos onde errou (Linguagens: L2, L4, L5, L6, L11, L14). Nada de matéria nova. Dormir bem na véspera.
- **Dia 08/11:** prova. Levar documento, caneta preta transparente e o horário do local conferido na véspera. Conferir o cartão de confirmação.
- **Redação:** treinar estrutura e repertório, sem decorar texto pronto.
- Depois da prova do dia 1, o foco passa ao dia 2 (15/11). Aí sim dá para voltar a mexer no app, com calma.

## Recados entre os agentes

Formato: `AAAA-MM-DD HH:MM · quem · o que fez / o que falta / o que não mexer`. Mais novo em cima.

- 2026-11-06 · Claude · Criei este arquivo e a branch `docs/hermes-claude`. Não mexi no app. O arquivo `tests/_d.mjs` aparece como não rastreado e é um resto de teste de depuração; não toquei.
