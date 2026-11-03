#!/usr/bin/env python3
"""Converte Apostila_2o_dia_ENEM_2026.md em data/dia2.js (2º dia: Matemática, Física, Química e Biologia).

Uso: python tools/apostila_dia2.py CAMINHO/Apostila_2o_dia_ENEM_2026.md

O arquivo gerado guarda tudo em DATA.dia2; o app só junta isso ao DATA depois que o dia 2 é liberado
(applyDia2, no index.html). Estações MAT-xx viram módulos MAxx (linha M); FIS, QUI e BIO viram FIxx, QUxx e BIxx
(linhas P, Q e B). As figuras vêm do PDF da apostila (fig/*.webp, extraídas à parte) e entram como <figure>.
"""
import json, re, sys, pathlib

AREA = {'MAT': ('MA', 'M', 'MT'), 'FIS': ('FI', 'P', 'CN'), 'QUI': ('QU', 'Q', 'CN'), 'BIO': ('BI', 'B', 'CN')}
TRAP = {'termo oposto': 'oposto', 'conceito errado': 'conceito', 'detalhe verdadeiro': 'detalhe', 'exagero': 'exagero',
        'unidade errada': 'unidade', 'conta incompleta': 'conta', 'leitura apressada': 'leitura', 'inversão de proporção': 'inversao'}
BOX = {'Fórmula': 'conceito', 'Intuição': 'conceito', 'Atenção': 'pegadinha', 'Dica de prova': 'enem', 'Conexão': 'conexao'}


def inline(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*(?=\S)(.+?)(?<=\S)\*(?![\w*])', r'<em>\1</em>', s)
    return re.sub(r'`(.+?)`', r'<code>\1</code>', s)


def table(rows):
    cells = [[c.strip() for c in r.strip().strip('|').split('|')] for r in rows if not re.match(r'^\s*\|[\s:|-]+\|\s*$', r)]
    head, body = cells[0], cells[1:]
    sym = ' sym' if re.match(r'(?i)s[íi]mbolo', head[0]) else ''
    return ('<div class="tw"><table class="tb' + sym + '"><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
            + ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in body) + '</tbody></table></div>')


def blocks(md):
    """Quebra o markdown em blocos: parágrafo, tabela, lista, citação, título, figura."""
    out, cur = [], []
    for ln in md.split('\n') + ['']:
        if ln.strip():
            cur.append(ln); continue
        if cur:
            out.append(cur); cur = []
    return out


def block_html(b):
    first = b[0]
    if first.startswith('|'): return table(b)
    if first.startswith('!['):
        cap, name = re.match(r'!\[(.*?)\]\(fig/(.+?)\.png\)', first).groups()
        alt = re.sub(r'[*`"&<>]', '', cap)
        return f'<figure class="fig"><img src="fig/{name}.webp" alt="{alt}" loading="lazy"><figcaption>{inline(cap)}</figcaption></figure>'
    if first.startswith('#### '): return f'<h5>{inline(first[5:])}</h5>'
    if first.startswith('### '): return f'<h5>{inline(first[4:])}</h5>'
    if first.startswith('> '):
        txt = ' '.join(x[1:].strip() for x in b)
        m = re.match(r'\*\*([^*]+?)\*\*\s*(.*)', txt)
        title, body = (m.group(1).rstrip(':').strip(), m.group(2)) if m else ('', txt)
        kind = next((v for k, v in BOX.items() if title.startswith(k)), 'conceito')
        kind += ' formula' if title.startswith('Fórmula') else ''
        return f'<div class="box {kind}"><b class="box-t">{inline(title)}</b><p>{inline(body)}</p></div>'
    if re.match(r'^(- |\d+\. )', first):
        tag = 'ul' if first.startswith('- ') else 'ol'
        items = []  # [texto, [subitens]]
        for ln in b:
            if re.match(r'^(- |\d+\. )', ln): items.append([re.sub(r'^(- |\d+\. )', '', ln), []])
            elif re.match(r'^\s+- ', ln): items[-1][1].append(re.sub(r'^\s+- ', '', ln))
            else: items[-1][0] += ' ' + ln.strip()
        sub = lambda xs: '<ul>' + ''.join(f'<li>{inline(x)}</li>' for x in xs) + '</ul>' if xs else ''
        return f'<{tag}>' + ''.join(f'<li>{inline(t)}{sub(xs)}</li>' for t, xs in items) + f'</{tag}>'
    return '<p>' + inline(' '.join(x.strip() for x in b)) + '</p>'


def to_html(md):
    return '\n'.join(block_html(b) for b in blocks(md))


def sections(body):
    """### N. título → {N: (título, texto)}"""
    parts = re.split(r'^### (\d+)\. (.+)$', body, flags=re.M)
    return {int(parts[i]): (parts[i + 1].strip(), parts[i + 2].strip()) for i in range(1, len(parts), 3)}


def question(block, mod, n):
    paras = [b for b in blocks(block)]
    alts, stmt = {}, []
    for b in paras:
        m = re.match(r'\*\*\(([A-E])\)\*\*\s*(.*)', b[0])
        if m: alts[m.group(1)] = inline(' '.join([m.group(2)] + [x.strip() for x in b[1:]]))
        else: stmt.append(b)
    assert sorted(alts) == list('ABCDE'), (mod, n, sorted(alts))
    htmls = [block_html(b) for b in stmt]
    htmls = [re.sub(r'^<p>(.*)</p>$', r'\1', h, flags=re.S) for h in htmls]
    return htmls[:-1], htmls[-1], [alts[k] for k in 'ABCDE']


def gabaritos(text):
    out = {}
    for code, ans, rest in re.findall(r'^#### (\S+-Q\d+) — Gabarito: ([A-E])\s*\n(.*?)(?=^#### |^## |^# |\Z)', text, flags=re.M | re.S):
        dif = re.search(r'\*\*Dificuldade:\*\* (\w+)', rest).group(1)
        hab = ', '.join(re.findall(r'H\d+', re.search(r'\*\*Habilidade:\*\* ([^\n]*)', rest).group(1)))
        res = re.search(r'\*\*Resolução:\*\*\s*(.*?)\n\n(?=\*\*Por que|\*\*Lição|\Z)', rest, flags=re.S).group(1)
        res = re.sub(r'\s*\n(?:- )?', ' ', res.strip()).lstrip('- ')
        lic = re.search(r'\*\*Lição:\*\* (.*?)(?:\n\n|\Z)', rest, flags=re.S)
        ex, traps = {ans: inline(res) + (f' <strong>Lição:</strong> {inline(lic.group(1).strip())}' if lic else '')}, {}
        for k, body in re.findall(r'^- \*\*\(([A-E])\)\*\* (.*)$', rest, flags=re.M):
            lab = re.search(r'\(\*\*([^*]+)\*\*\)\.?\s*$', body)
            if lab:
                traps[k] = TRAP[lab.group(1).strip().lower()]
                body = body[:lab.start()].rstrip()
            ex[k] = inline(body.split(' — ', 1)[1] if ' — ' in body else body)
        out[code] = dict(ans=ans, dif=dif, hab=hab, ex=ex, traps=traps)
    return out


NL = chr(10)


def partes(md, ini, fim):
    """Texto entre dois títulos de nível 1 (ini inclusive pelo corpo, fim exclusive)."""
    i = md.index(ini); j = md.index(fim, i + 1)
    return md[i:j]


def secoes_h2(texto):
    """Quebra um trecho em [(título, corpo)] pelos '## ' e devolve também o texto antes do primeiro."""
    partes_ = re.split(r'^## (.+)$', texto, flags=re.M)
    return partes_[0], [(partes_[i].strip(), partes_[i + 1].strip()) for i in range(1, len(partes_), 2)]


def guia(md):
    """Linha D: Parte 0 (como usar, matriz, TRI, estratégia), visões gerais das áreas e formulário-mestre."""
    p0 = partes(md, '# Parte 0', '# Sumário')
    _, s0 = secoes_h2(p0)
    gerais = [(re.sub(r' do ENEM$', '', t), c) for t, c in
              (x for part in re.findall(r'^## Visão geral.*?(?=^## )', md, flags=re.M | re.S) for x in [secoes_h2(part)[1][0]])]
    p5 = partes(md, '# Parte 5', '# Parte 6')
    intro5, s5 = secoes_h2(p5)
    intro5 = re.sub(r'^# .*$', '', intro5, flags=re.M).strip()
    def mod(i, title, note, secs, intro=''):
        html = (to_html(intro) + NL if intro else '') + NL.join(f'<h4>{inline(t)}</h4>{NL}{to_html(c)}' for t, c in secs)
        return dict(id=f'GD{i}', title=title, habs='Guia', faixa='', note=inline(note), html=html, resumo=[], qs=[], vol='GD', line='D')
    return [mod(1, 'Antes de começar: prova, nota e estratégia', 'Como esta apostila funciona, o que mais caiu, a Matriz de Referência, a TRI e a estratégia para os 300 minutos.', s0),
            mod(2, 'Visão geral das quatro áreas', 'Como a prova de cada área pensa e como estudar Matemática, Física, Química e Biologia.', gerais),
            mod(3, 'Formulário-mestre do 2º dia', 'Todas as fórmulas num só lugar, com o significado de cada símbolo. As marcadas com ★ precisam ser sabidas de cor.', s5, intro5)]


def main(path):
    text = pathlib.Path(path).read_text(encoding='utf8')
    gab = gabaritos(text)
    mods, qs, cards = [], [], []
    for code, num, title, body in re.findall(r'^## ((?:MAT|FIS|QUI|BIO))-(\d\d) — (.+?)\n(.*?)(?=^## |^# |\Z)', text, flags=re.M | re.S):
        pre, line, vol = AREA[code]
        mid = f'{pre}{num}'
        ficha = re.search(r'\*\*Ficha\*\* · Prioridade \*\*([ABC])\*\* · Matriz: (.*?) · Tempo de estudo sugerido: (\d+) min · Pré-requisitos: (.*?) · Objetivo: (.*)', body)
        sec = sections(body)
        html = '\n'.join(f'<h4>{inline(sec[i][0])}</h4>\n{to_html(sec[i][1])}' for i in range(1, 6))
        rows = [r for r in sec[6][1].split('\n') if r.startswith('|') and not re.match(r'^\|[\s:|-]+\|$', r)][1:]
        resumo = [[inline(c[0]), inline(' · '.join(x for x in c[1:] if x))] for c in ([x.strip() for x in r.strip('|').split('|')] for r in rows)]
        mod_cards = re.findall(r'^- \*\*(.+?)\*\* → (.+)$', sec[7][1], flags=re.M)
        mod_qs = []
        for i, qb in enumerate(re.split(r'^#### Questão \S+ \[Inédita\]\s*$', sec[8][1], flags=re.M)[1:], 1):
            g = gab[f'{code}-{num}-Q{i}']
            base, cmd, alts = question(qb, mid, i)
            qs.append(dict(id=f'{mid}.{i}', vol=vol, mod=mid, n=i, kind='fixacao', tag='Inédita, estilo ENEM', base=base,
                           src='Apostila do 2º dia (questão inédita).', cmd=cmd, alts=alts, **g))
            mod_qs.append(f'{mid}.{i}')
        mods.append(dict(id=mid, title=title.strip(), habs=ficha.group(2), faixa=ficha.group(1), note=inline(ficha.group(5).rstrip('.') + '. Pré-requisitos: ' + ficha.group(4).rstrip('.') + '.'), mins=int(ficha.group(3)),
                         html=html, resumo=resumo, qs=mod_qs, vol=vol, line=line))
        cards += [dict(id=f'{mid}-c{i}', vol=vol, q=inline(q), a=inline(a)) for i, (q, a) in enumerate(mod_cards)]
    assert len(mods) == 45 and len(qs) == 119, (len(mods), len(qs))
    guide = guia(text)
    mods = guide + mods
    vf_file = pathlib.Path(__file__).resolve().parent / 'dia2_vf.json'  # V ou F: 4 por estação, escritos à parte (a apostila não os traz)
    vf = []
    if vf_file.exists():
        seen = {}
        for it in json.loads(vf_file.read_text(encoding='utf8')):
            i = seen[it['mod']] = seen.get(it['mod'], -1) + 1
            vf.append(dict(id=f"vf-{it['mod']}-{i}", mod=it['mod'], s=it['s'], v=it['v'], why=it['why']))
    data = dict(modules=mods, questions=qs, cards=cards, vf=vf, applied=False)
    head = ('/* GERADO por tools/apostila_dia2.py a partir de Apostila_2o_dia_ENEM_2026.md. Não edite à mão.\n'
            '   2º dia do Enem: Matemática (M), Física (P), Química (Q) e Biologia (B). O conteúdo fica em DATA.dia2 e só entra\n'
            '   no app depois que o dia 2 é liberado (applyDia2, no index.html). Figuras em fig/. */\n')
    out = pathlib.Path(__file__).resolve().parent.parent / 'data' / 'dia2.js'
    out.write_text(head + '(function (D) { D.dia2 = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '; })(window.DATA);\n', encoding='utf8')
    print(f'{len(mods)} estações, {len(qs)} questões, {len(cards)} cartões -> {out} ({out.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main(sys.argv[1])
