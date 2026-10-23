# Crítica de design: Humanas de Ouro (outubro de 2026)

Telas avaliadas: Linhas (início e missão), Módulo (leitura de teoria), Provas e Painel, em 375 e 1280 px, nos temas claro e escuro. Objetivo: um visual mais profissional e didático **sem mudar a estrutura nem a navegação**.

## Impressão geral

A identidade é forte: tipografia de leitura serifada, dourado como cor de destaque e a metáfora do mapa de metrô. O que derruba a sensação de produto profissional são problemas de **hierarquia** (tudo com o mesmo peso) e de **acabamento** (caixas esticadas, ícones improvisados, campos sem estilo). A estrutura não precisa mudar. Precisa de ordem visual.

## Usabilidade

| Achado | Gravidade | Recomendação |
|---|---|---|
| Missão de hoje: de 8 a 10 tarefas com o mesmo peso visual; a próxima ação não se destaca. | 🔴 Crítico | Um bloco "Próximo passo" em destaque no topo; o resto vira lista compacta. |
| Provas: 6 botões do mesmo tamanho por cartão; a ação recomendada (simulado inteiro, no `24d1`) não se distingue de "Modo estudo". | 🟡 Moderado | Um botão principal por cartão, de acordo com o estado da prova; os demais em linha secundária. |
| Celular: o cabeçalho ocupa 3 linhas (marca, ferramentas e contagem), cerca de 130 px de 812, em todas as telas. | 🟡 Moderado | Cabeçalho compacto: marca e contagem na mesma linha; ferramentas como ícones menores. |
| "abrir →" repetido em cada tarefa, sendo que o cartão inteiro já é clicável. | 🟢 Menor | Trocar por uma seta discreta. |
| Módulo no celular: os chips de metadados quebram em 2 ou 3 linhas antes do título. | 🟢 Menor | Uma linha só, com rolagem horizontal, e o selo do erro de 2025 em destaque. |

## Hierarquia visual

- **O que chama o olho primeiro:** no desktop, as quatro caixas de estatística vazias e esticadas até a altura da coluna da missão. Errado: elas empurram a missão para segundo plano e parecem quebradas.
- **Fluxo de leitura:** título, parágrafo longo de explicação e uma pilha uniforme de tarefas. O parágrafo explicativo aparece todo dia e vira ruído.
- **Ênfase:**
  - Os ícones das tarefas são caracteres Unicode (★, ✍, ▦, ◷, ↺) num círculo dourado de 34 px. Ficam pequenos, inconsistentes e alguns somem em certos aparelhos (o mesmo defeito do ícone do Painel corrigido na v9).
  - O módulo, ao contrário, tem boa hierarquia: título, abas e um sumário lateral no desktop.

## Consistência

| Elemento | Problema | Recomendação |
|---|---|---|
| Tamanhos de fonte | Valores soltos (10,5 a 46 px, com `clamp`) espalhados no CSS, sem escala. | Escala única de 7 passos: 12, 14, 16, 18, 22, 28 e 36 px. |
| Espaçamentos | Paddings de 6, 7, 9, 10, 12, 14, 15 e 18 px misturados. | Múltiplos de 4 com tokens `--sp-*`. |
| Campos de formulário | O campo de chave da sincronização e outros `input`s ficam com o visual padrão do navegador. | Um estilo único para `input`, `textarea` e `select`, com foco visível. |
| Links | Azul padrão do navegador dentro dos painéis. | Cor de tinta com sublinhado dourado. |
| Caixas de estatística | `align-items: stretch` no grid da tela inicial. | `align-self: start` e cartões compactos. |

## Acessibilidade

- **Contraste:** passa em AA nas 8 abas e nos 2 temas (teste automático da v9).
- **Alvos de toque:** abas inferiores com 46 px; botões com 40 px de altura no mínimo. Bom.
- **Leitura:** corpo de texto serifado com cerca de 17 px e entrelinha de 1,6. Bom. No desktop, o sumário do módulo fica perto do texto, numa medida confortável.
- **Movimento:** não existe tratamento para quem configurou o aparelho para reduzir animações (`prefers-reduced-motion`).

## O que funciona bem

- A tipografia de leitura (Source Serif) e a de títulos (Bricolage) formam um par com personalidade.
- O sumário lateral do módulo no desktop e a barra de leitura.
- O tema escuro é cuidadoso, e não uma simples inversão de cores.
- O bloco "Dia 2 · guardado" comunica bem o estado e a meta.

## Recomendações por prioridade

1. **Tela inicial com hierarquia (Tarefa 7):**
   - "Próximo passo" em destaque;
   - estatísticas compactas e sem esticar;
   - anéis de progresso por área;
   - ícones SVG nas tarefas;
   - lista compacta.
2. **Tokens e acabamento (Tarefa 5):**
   - escala tipográfica e de espaçamento;
   - campos e links estilizados;
   - cabeçalho compacto no celular;
   - um botão principal por cartão de prova;
   - movimento reduzido respeitado.
3. **Leitura didática (Tarefa 6):**
   - quadros por tipo (Conceito, Exemplo, No Enem, Pegadinha, Conexão);
   - chips em uma linha só no celular;
   - sumário também no celular (recolhível no topo).

## Aplicado na Tarefa 5

- **Margem do app:** o `<body>` tinha a margem padrão de 8 px, e o app instalado inteiro ficava recuado. Agora `margin:0`.
- **Cabeçalho no celular:** caiu de 121 px para 74 px em 375 e cabe em 84 px em 320. A contagem divide a linha com a marca.
- **Um botão principal por prova:**
  - pendente: a primeira área;
  - guardada: o dia inteiro;
  - feita: "Ver correção".
- **Formulários e links:** campos com estilo próprio e foco dourado; links com sublinhado dourado em vez do azul padrão do navegador.
- **Tokens:** escala `--fs-1..7`, espaçamentos `--sp-1..8`, `--r-sm`, `--r-lg`, `--shadow-1`, `--ease` e a cor da linha L (`--l`).
- **Movimento:** com redução de movimento ativada no aparelho, nada anima.
