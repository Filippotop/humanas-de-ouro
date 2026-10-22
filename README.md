# Humanas de Ouro

App de estudo de Ciências Humanas para o ENEM 2026 (História, Geografia, Filosofia e Sociologia), com as provas oficiais de 2024 e 2025 recortadas por questão.

Instalável no celular (PWA) e funciona sem internet depois do primeiro acesso. O progresso fica salvo no aparelho; use **Aa → Copiar ou importar progresso** para levá-lo a outro aparelho.

Conteúdo das estações: apostilas no método "Apostila de Ouro em Camadas", criado por Anália. Provas e gabaritos: Inep/MEC.

## Teste antes de publicar

```
npm install
npm test
```

Abre o app num Chromium de verdade e falha se aparecer erro de JavaScript, rolagem lateral, falha séria de acessibilidade (WCAG AA), gabarito inválido, imagem de prova faltando ou download offline sem consentimento. Rode antes de cada versão nova.
