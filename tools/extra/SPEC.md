# Formato das questões extras do 2º dia (JSON, lista de objetos)
Cada objeto:
{
 "mod": "MA01",            // id da estação (MA01-14, FI01-11, QU01-10, BI01-10)
 "base": ["parágrafo 1 do texto-base", "parágrafo 2 (opcional)"],   // só texto; sem tabelas/figuras. Pode usar **negrito** e `código`.
 "cmd": "O comando/pergunta final, terminando sem alternativa, ex.: 'A dose, em mililitro, é'",
 "alts": ["A","B","C","D","E"],   // exatamente 5, sem a letra, terminando com ponto
 "ans": "C",
 "dif": "fácil|média|difícil",
 "hab": "H16",              // habilidade da Matriz (da área da estação)
 "ex": {"C": "resolução passo a passo + ' **Lição:** ...'", "A": "por que errou (o erro de raciocínio que leva a ela)", "B": "...", "D": "...", "E": "..."},  // uma chave por letra, as 5
 "traps": {"A":"conta","B":"leitura","D":"unidade","E":"inversao"}  // para as 4 erradas; valores só: oposto, conceito, detalhe, exagero, unidade, conta, leitura, inversao
}
Regras: estilo ENEM (situação contextualizada, nada de "calcule x" seco), gabarito DISTRIBUÍDO entre A-E, distratores plausíveis que representam erros reais, números conferidos (Matemática/Física/Química: confira TODA conta com Python antes de escrever), fatos de Biologia/Química só se tiver certeza (sem inventar citação/dado; use dados reais bem conhecidos ou claramente fictícios). Texto em pt-BR, ASCII-safe JSON válido (UTF-8). Questões NOVAS e diferentes das existentes na estação.
