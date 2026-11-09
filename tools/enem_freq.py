"""Frequência dos assuntos do 2º dia do Enem (Natureza e Matemática), 2014 a 2025, por estação do app.
Entrada : tools/enem_labels_d2.json  (uma entrada por questão: "ANO-MT|CN-NNN" -> mod, sec, sub, ctx, conf)
Saída   : tools/enem_freq.json       (lido por tools/apostila_dia2.py)
Como os rótulos foram feitos: as 1.080 questões (12 provas x 90) foram extraídas dos PDFs oficiais do Inep e lidas uma a uma
(classificação por leitura, não oficial). 2021 veio de OCR (PDF com fonte corrompida), então tem mais incerteza.
Exposição = 1 por questão cujo assunto principal é a estação + 0,5 por questão em que ela é o assunto secundário."""
import json, pathlib, re, collections

AQUI = pathlib.Path(__file__).resolve().parent
L = json.loads((AQUI / 'enem_labels_d2.json').read_text(encoding='utf8'))
ANOS = sorted({k[:4] for k in L})
N = len(ANOS)                      # 12 provas
ULT5 = {str(y) for y in range(2021, 2026)}
STOP = set('de da do das dos e em a o as os para com por no na nos nas um uma ao à ou que se entre sobre sem sob'.split())


def expo(area, anos, mod):
    return sum((1 if v['mod'] == mod else 0) + (0.5 if v['sec'] == mod else 0)
               for k, v in L.items() if k[5:7] == area and k[:4] in anos) / len(anos)


def tema_palavras(itens):
    c = collections.Counter()
    for _, _, sub in itens:
        for w in set(re.findall(r'[a-zà-úç]{4,}', sub.lower())):
            if w not in STOP:
                c[w] += 1
    return [(w, n) for w, n in c.most_common(8) if n >= 3][:5]


def faixa(area, e):
    a, b = (3.0, 1.8) if area == 'MT' else (2.0, 1.0)   # limites em questões por prova (exposição mista 60% 12 provas + 40% últimas 5)
    return 'A' if e >= a else 'B' if e >= b else 'C'


mods = sorted({v['mod'] for v in L.values() if v['mod'] != 'OUT'} | {v['sec'] for v in L.values() if v['sec']})
out = {'provas': N, 'anos': [ANOS[0], ANOS[-1]], 'questoes': len(L), 'mods': {}, 'fora': {}}
for m in mods:
    area = 'MT' if m.startswith('MA') else 'CN'
    prim = [(k, v) for k, v in sorted(L.items()) if v['mod'] == m]
    itens = [(k[:4], int(k[-3:]), v['sub']) for k, v in prim]
    e12, e5 = expo(area, set(ANOS), m), expo(area, ULT5, m)
    e = round(0.6 * e12 + 0.4 * e5, 2)
    out['mods'][m] = dict(area=area, total=len(prim), sec=sum(1 for v in L.values() if v['sec'] == m), por_prova=round(len(prim) / N, 1),
                          ult5=round(sum(1 for k, _ in prim if k[:4] in ULT5) / 5, 1), expo=e, faixa=faixa(area, e),
                          por_ano={y: sum(1 for k, _ in prim if k[:4] == y) for y in ANOS}, itens=itens, palavras=tema_palavras(itens))
for area in ('MT', 'CN'):
    rk = sorted((v['expo'], m) for m, v in out['mods'].items() if v['area'] == area)[::-1]
    for i, (_, m) in enumerate(rk, 1):
        out['mods'][m]['rank'] = i; out['mods'][m]['de'] = len(rk)
fora = collections.defaultdict(list)
for k, v in sorted(L.items()):
    if v['mod'] == 'OUT':
        fora[k[5:7]].append((k[:4], int(k[-3:]), v['sub']))
out['fora'] = fora
(AQUI / 'enem_freq.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf8')
print(N, 'provas;', len(mods), 'estações')
for a in ('MT', 'CN'):
    print(a, {f: [m for m, v in out['mods'].items() if v['area'] == a and v['faixa'] == f] for f in 'ABC'})
