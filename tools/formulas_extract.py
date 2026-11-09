#!/usr/bin/env python3
"""Extrai as fórmulas da apostila do 2º dia (caixas '> **Fórmula — ...**' e linhas do Formulário-mestre) para formulas_all.json.
Uso: python3 tools/formulas_extract.py CAMINHO/Apostila_2o_dia_ENEM_2026.md SAIDA.json"""
import json, re, sys


def cells(ln):
    """Divide uma linha de tabela markdown em células; '\\|' é uma barra literal (valor absoluto), não separador."""
    parts = re.split(r'(?<!\\)\|', ln.strip().strip('|'))
    return [x.replace('\\|', '|').strip() for x in parts]


def extrair(md):
    items = {}
    for m in re.finditer(r'^> \*\*Fórmula — ([^*]+?):?\*\*\s*(.*)$', md, flags=re.M):
        items.setdefault(m.group(2).strip(), {'tit': m.group(1).strip(), 'onde': 'box'})
    i, j = md.find('# Parte 5'), md.find('# Parte 6')
    for ln in md[i:j].split('\n'):
        if ln.startswith('|') and not re.match(r'^\|[\s:|-]+\|$', ln):
            c = cells(ln)
            if c[0] == 'Fórmula':
                continue
            b = re.sub(r'^★\s*', '', c[0])
            items.setdefault(b, {'tit': c[2] if len(c) > 2 else '', 'onde': 'gd3', 'simbolos': c[1] if len(c) > 1 else ''})
    return [{'id': f'F{n:03d}', 'original': b, **v} for n, (b, v) in enumerate(items.items(), 1)]


if __name__ == '__main__':
    lst = extrair(open(sys.argv[1], encoding='utf-8').read())
    json.dump(lst, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(len(lst), 'fórmulas;', sum(1 for x in lst if x['onde'] == 'box'), 'em caixas;', sum(1 for x in lst if x['onde'] == 'gd3'), 'no formulário')
