#!/usr/bin/env python3
"""Plano de 09 a 14/11 (dia 2 do Enem em 15/11): estações na ordem do que mais cai, com tempo marcado.
Lê tools/enem_freq.json (frequência em 12 provas) e tools/enem_labels_d2.json (para achar as questões oficiais de 2025 de cada estação)
e reescreve só os dias 2026-11-09 a 2026-11-14 de DATA.plan em data/base.js.
Uso: python3 tools/plano_dia2.py"""
import json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from data_io import load, dump

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parent
F = json.loads((AQUI / 'enem_freq.json').read_text(encoding='utf8'))
L = json.loads((AQUI / 'enem_labels_d2.json').read_text(encoding='utf8'))
head, D = load(RAIZ / 'data' / 'base.js')

# títulos das estações (só para o texto de reserva quando o dia 2 ainda está guardado)
s = (RAIZ / 'data' / 'dia2.js').read_text(encoding='utf8')
i = s.index('D.dia2 = ') + len('D.dia2 = ')
dia2, _ = json.JSONDecoder().raw_decode(s[i:])
TIT = {m['id']: m['title'] for m in dia2['modules']}

KEY25 = D['exams']['25d2']['key']
OFICIAIS = {}  # estação -> questões de 2025 (caderno 7) que valem (não anuladas)
for k, v in sorted(L.items()):
    if k.startswith('2025') and KEY25.get(str(int(k[-3:]))) is not None:
        OFICIAIS.setdefault(v['mod'], []).append(int(k[-3:]))

EXPO = {m: v['expo'] for m, v in F['mods'].items()}
TOT = {a: sum(v['expo'] for v in F['mods'].values() if v['area'] == a) for a in ('MT', 'CN')}
cob = lambda ids: round(100 * sum(EXPO[m] for m in ids) / TOT[F['mods'][ids[0]]['area']])

HINT = "Leia só 'Exemplos resolvidos', 'Como o ENEM cobra' e 'Armadilhas'; a teoria completa só se travar. Depois as questões. Estourou o tempo? Passe para a próxima."


def est(m, mins, opc=False, hint=HINT):
    t = {'k': 'est', 'a': m, 't': f'{m} · {TIT[m]}', 'm': mins, 'h': hint}
    if opc:
        t['o'] = 1
    return t


def qo(m, n=3, opc=False):
    qs = OFICIAIS.get(m, [])[:n]
    if not qs:
        return []
    t = {'k': 'qo', 'a': m, 't': f'Questões oficiais de 2025 de {m}', 'q': [['25d2', x] for x in qs], 'm': 3 * len(qs) + 1,
         'h': 'Resolva sem olhar o gabarito; ele só aparece quando você pedir.'}
    if opc:
        t['o'] = 1
    return [t]


hh = lambda x: f'{x:.1f}'.replace('.', ',') + ' h'


CARDS = {'k': 'game', 'a': 'cards', 't': 'Cartões de véspera, só os vencidos', 'm': 10}


def flat(tasks):
    return [x for t in tasks for x in (t if isinstance(t, list) else [t])]


def dia(d, l, foco, tasks):
    ts = flat(tasks)
    for k in ('est', 'qo'):  # a dica aparece só na primeira tarefa de cada tipo do dia, para a lista não ficar repetitiva
        for t in [x for x in ts if x['k'] == k][1:]:
            t.pop('h', None)
    return {'d': d, 'l': l, 'foco': 'Dia 2 · ' + foco, 'tasks': ts}


seg = ['MA01', 'MA02', 'MA05', 'MA14', 'MA03']
ter = ['MA09', 'MA08', 'MA04', 'MA10', 'MA06']
qua = ['QU09', 'FI06', 'FI08', 'FI05', 'QU03']
qui = ['BI02', 'BI09', 'BI01', 'BI07', 'BI10', 'QU08']
MIN = {'MA01': 40, 'MA02': 40, 'MA05': 35, 'MA14': 30, 'MA03': 30, 'MA09': 40, 'MA08': 40, 'MA04': 35, 'MA10': 40, 'MA06': 30, 'MA07': 30,
       'QU09': 35, 'FI06': 35, 'FI08': 40, 'FI05': 40, 'QU03': 35, 'QU08': 35,
       'BI02': 35, 'BI01': 35, 'BI09': 35, 'BI07': 40, 'BI10': 25, 'QU02': 30,
       'QU10': 25, 'BI03': 35, 'FI02': 35, 'FI01': 25}
NQ = {'MA03': 2, 'MA14': 1}
OPC = {'MA07', 'QU02', 'QU10', 'BI03', 'FI02', 'FI01'}  # reserva: só depois do essencial do dia


def bloco(ids):
    out = []
    for m in ids:
        out.append(est(m, MIN[m], opc=m in OPC))
        out.append(qo(m, NQ.get(m, 3), opc=m in OPC))
    return out


def tempo(tasks):
    return sum(t.get('m', 0) for t in flat(tasks) if not t.get('o')) / 60


plano = {}
t = [{'k': 'ver', 'a': 'GD1', 't': 'GD1 · Antes de começar: prova, nota e estratégia', 'm': 10,
      'h': "Leia só a seção 0.5 (o que mais caiu) e a parte da TRI e da estratégia. Pule o resto."}] + bloco(seg) + [CARDS]
plano['2026-11-09'] = dia('2026-11-09', 'seg 09/11', f'Matemática básica: {len(seg)} estações = {cob(seg)}% do que cai em Matemática · ~{hh(tempo(t))}', t)
t = bloco(ter) + [CARDS] + bloco(['MA07'])
plano['2026-11-10'] = dia('2026-11-10', 'ter 10/11', f'Geometria, estatística e funções: {len(ter)} estações = {cob(ter)}% de Matemática · ~{hh(tempo(t))}', t)
t = bloco(qua) + [CARDS]
plano['2026-11-11'] = dia('2026-11-11', 'qua 11/11', f'Natureza 1, Física e Química: {len(qua)} estações = {cob(qua)}% de Natureza · ~{hh(tempo(t))}', t)
t = bloco(qui) + [CARDS] + bloco(['QU02', 'QU10', 'BI03', 'FI02', 'FI01'])
plano['2026-11-12'] = dia('2026-11-12', 'qui 12/11', f'Natureza 2, Biologia e Oxirredução: {len(qui)} estações = {cob(qui)}% de Natureza (mais a reserva) · ~{hh(tempo(t))}', t)
plano['2026-11-13'] = dia('2026-11-13', 'sex 13/11', 'Simulado completo de 2024 e correção', [
    {'k': 'out', 't': 'Antes de começar: água, lanche, caneta preta, relógio e celular longe, como no dia', 'm': 5},
    {'k': 'prova', 'a': '24d2:NM', 't': 'ENEM 2024 · 2º dia completo, modo prova (5 h), começando às 13h30', 'm': 300,
     'h': 'Faça primeiro as questões que você resolve rápido; marque e pule a que travar por 2 minutos; não deixe nenhuma em branco.'},
    {'k': 'provares', 'a': '24d2', 't': 'Revisar os erros do simulado: para cada erro, escreva a regra ou fórmula que faltou e a estação', 'm': 60}])
plano['2026-11-14'] = dia('2026-11-14', 'sáb 14/11', 'Fechar os buracos do simulado e descansar · ~2 h', [
    {'k': 'out', 't': 'Refazer, na estação, o assunto de cada erro do simulado (o bloco "Quanto cai" lista as questões ano a ano)', 'm': 60},
    {'k': 'ver', 'a': 'GD3', 't': 'GD3 · Formulário-mestre do 2º dia', 'm': 20, 'h': 'Só passe os olhos nas fórmulas marcadas com ★.'},
    {'k': 'ver', 'a': 'GD4', 't': 'GD4 · Fora das estações: sistemas, geometria analítica, matrizes e lógica', 'm': 40, 'o': 1,
     'h': 'Cai em cerca de 2 questões por prova de Matemática. Só se sobrar fôlego.'},
    CARDS,
    {'k': 'out', 't': 'Separar documento oficial com foto, caneta preta de tubo transparente e cartão de confirmação; dormir cedo', 'm': 5}])

for p in D['plan']:
    if p['d'] in plano:
        p.update(plano.pop(p['d']))
assert not plano, plano.keys()
dump(RAIZ / 'data' / 'base.js', head, D)
for p in D['plan']:
    if '2026-11-09' <= p['d'] <= '2026-11-14':
        print(p['l'], '|', p['foco'], '|', len(p['tasks']), 'tarefas')
