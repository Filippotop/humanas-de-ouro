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


FORM = {}  # texto original da fórmula -> {f: arquivo em fm/, w, h, lido}; preenchido por carregar_formulas() (tools/formulas.json)


def carregar_formulas():
    """Fórmulas desenhadas como imagem SVG (tools/formulas_render.mjs). Sem os arquivos, tudo continua como texto."""
    aqui = pathlib.Path(__file__).resolve().parent
    fj, fi = aqui / 'formulas.json', aqui / 'formulas_index.json'
    FORM.clear()
    if fj.exists() and fi.exists():
        F, I = json.loads(fj.read_text(encoding='utf8')), json.loads(fi.read_text(encoding='utf8'))
        FORM.update({v['original']: dict(I[k], lido=v.get('lido')) for k, v in F.items() if k in I})
    return len(FORM)


def fm_img(txt, cls):
    """<img> da fórmula (o texto original vai no alt, para leitor de tela e para quem não vê a imagem), ou None."""
    e = FORM.get(txt)
    if not e:
        return None
    alt = re.sub(r'\*\*', '', txt).replace('&', '&amp;').replace('<', '&lt;').replace('"', '&quot;')
    return f'<img class="{cls}" src="fm/{e["f"]}" alt="{alt}" style="--w:{e["w"]:.2f}ex" loading="lazy" decoding="async">'


def split_row(r):
    """Divide uma linha de tabela markdown; '\\|' é uma barra literal (valor absoluto), não separador de célula."""
    return [c.replace('\\|', '|').strip() for c in re.split(r'(?<!\\)\|', r.strip().strip('|'))]


def table(rows):
    cells = [split_row(r) for r in rows if not re.match(r'^\s*\|[\s:|-]+\|\s*$', r)]
    head, body = cells[0], cells[1:]
    sym = ' sym' if re.match(r'(?i)s[íi]mbolo', head[0]) else ''
    def cell(i, c):
        if i == 0 and head[0] == 'Fórmula':  # Formulário-mestre: a fórmula vira imagem (★ = saber de cor)
            star, txt = re.match(r'^(★\s*)?(.*)$', c, flags=re.S).groups()
            img = fm_img(txt, 'fm-in')
            if img:
                return '<td>' + ('<span class="fm-star" title="saber de cor">★</span> ' if star else '') + img + '</td>'
        return f'<td>{inline(c)}</td>'
    return ('<div class="tw"><table class="tb' + sym + '"><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
            + ''.join('<tr>' + ''.join(cell(i, c) for i, c in enumerate(r)) + '</tr>' for r in body) + '</tbody></table></div>')


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
        img = fm_img(body.strip(), 'fm-img') if title.startswith('Fórmula') else None
        if img:
            lido = FORM[body.strip()].get('lido')
            return (f'<div class="box {kind}"><b class="box-t">{inline(title)}</b><div class="fm">{img}</div>'
                    + (f'<p class="fm-lido"><b>Em palavras:</b> {inline(lido)}</p>' if lido else '') + '</div>')
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
            mod(3, 'Formulário-mestre do 2º dia', 'Todas as fórmulas num só lugar, com o significado de cada símbolo. As marcadas com ★ precisam ser sabidas de cor.', s5, intro5)] + lacunas(mod)


def lacunas(mod):
    """GD4: o que cai em Matemática e nenhuma das 14 estações ensina (tools/dia2_lacunas.md)."""
    f = pathlib.Path(__file__).resolve().parent / 'dia2_lacunas.md'
    if not f.exists():
        return []
    intro, secs = secoes_h2(f.read_text(encoding='utf8'))
    return [mod(4, 'Fora das estações: sistemas, geometria analítica, matrizes e lógica', 'O que cai em cerca de 5% da Matemática e nenhuma estação ensina: base mínima, com exemplos conferidos.', secs)]


AQUI = pathlib.Path(__file__).resolve().parent
EX_ANO = {'2024': '24d2', '2025': '25d2'}  # provas do dia 2 que o app guarda como imagem (questões tocáveis)


def fmt(x):
    return f'{x:.1f}'.replace('.', ',')


def freq_json():
    """Frequência dos assuntos em 12 provas (2014 a 2025), gerada por tools/enem_freq.py."""
    f = AQUI / 'enem_freq.json'
    return json.loads(f.read_text(encoding='utf8')) if f.exists() else None


def bloco_freq(m, fq, F):
    """Seção 'Quanto cai e como já caiu' no fim da teoria de cada estação."""
    esc = lambda s: s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    area = 'Matemática' if fq['area'] == 'MT' else 'Ciências da Natureza'
    anos = F['anos']
    h = [f'<h4>Quanto cai e como já caiu ({F["provas"]} provas, {anos[0]} a {anos[1]})</h4>']
    h.append(f'<p>Este tema foi o assunto principal de <strong>{fq["total"]} questões</strong>: <strong>{fmt(fq["por_prova"])} por prova</strong> '
             f'(nas últimas 5 provas, {fmt(fq["ult5"])}). Ocupa a posição <strong>{fq["rank"]} de {fq["de"]}</strong> em {area} e apareceu como assunto '
             f'secundário em mais {fq["sec"]}. Faixa <strong>{fq["faixa"]}</strong> por frequência.</p>')
    if fq['palavras']:
        h.append('<p>O que mais se repete nos enunciados: ' + ', '.join(f'<strong>{esc(w)}</strong> ({n})' for w, n in fq['palavras']) + '.</p>')
    h.append('<p>Questões por prova: ' + ' · '.join(f'{y}: {n}' for y, n in fq['por_ano'].items()) + '.</p>')
    por = {}
    for y, n, sub in fq['itens']:
        por.setdefault(y, []).append((n, sub))
    li = []
    for y in sorted(por, reverse=True):
        itens = []
        for n, sub in sorted(por[y]):
            ref = f'<a href="#" data-ex="{EX_ANO[y]}" data-n="{n}">q. {n}</a>' if y in EX_ANO else f'q. {n}'
            itens.append(f'{ref}: {esc(sub)}')
        li.append(f'<li><strong>{y}</strong> · ' + '; '.join(itens) + '</li>')
    h.append(f'<details><summary>Ver as {fq["total"]} questões, ano a ano</summary><ul>' + ''.join(li) + '</ul></details>')
    h.append('<p class="note">Classificação feita por leitura das provas oficiais do Inep (não é oficial; 2021 veio de OCR). '
             'Em 2024 e 2025 você toca no número para abrir a questão (caderno 7, o mesmo do app). De 2014 a 2023 os números seguem a numeração de um dos cadernos do Inep, não necessariamente o do seu: cada cor de caderno tem a mesma prova em outra ordem.</p>')
    return '\n'.join(h)


def aplicar_freq(mods, F):
    """Refaz a faixa A/B/C pela frequência real, acrescenta a seção e o texto curto 'cai X por prova'. Devolve [(id, antes, depois)]."""
    mudou = []
    for m in mods:
        fq = F['mods'].get(m['id'])
        if not fq:
            continue
        if m['faixa'] != fq['faixa']:
            mudou.append((m['id'], m['faixa'], fq['faixa']))
        m['faixa'] = fq['faixa']
        m['fx'] = fq['expo']
        m['cai'] = f'cai ~{fmt(fq["por_prova"])} por prova · nº {fq["rank"]} de {fq["de"]}'
        m['note'] += f' Cai {fmt(fq["por_prova"])} por prova em média.'
        m['html'] += '\n' + bloco_freq(m, fq, F)
    return mudou


def secao_05(md, F, mods, mudou):
    """Troca a seção 0.5 da Parte 0 (contagem de 2 anos) pela contagem de 12 provas."""
    tit = {m['id']: m['title'] for m in mods}
    antes = {i: a for i, a, _ in mudou}
    linhas = []
    for area, nome in (('MT', 'Matemática'), ('CN', 'Ciências da Natureza')):
        rows = sorted(((v['rank'], m, v) for m, v in F['mods'].items() if v['area'] == area), key=lambda x: x[0])
        linhas.append(f'### {nome}\n\n| # | Estação | Questões por prova | Últimas 5 | Exposição | Faixa |\n|---|---|---|---|---|---|')
        for r, m, v in rows:
            ch = f' (era {antes[m]})' if m in antes else ''
            linhas.append(f'| {r} | {m} · {tit[m].split(":")[0]} | {fmt(v["por_prova"])} | {fmt(v["ult5"])} | {fmt(v["expo"])} | {v["faixa"]}{ch} |')
        linhas.append('')
    disc = {d: sum(v['total'] for m, v in F['mods'].items() if m.startswith(p)) / F['provas'] for d, p in (('Física', 'FI'), ('Química', 'QU'), ('Biologia', 'BI'))}
    fora = F['fora'].get('MT', [])
    cats = [('Geometria analítica (distância, reta, circunferência, mediatriz)', r'analítica|circunfer|hipérbole|cartesiano|mediatriz|lugar geom|inequa'),
            ('Sistemas de equações do 1º grau', r'sistema|equaç'), ('Matrizes', r'matriz'),
            ('Orientação espacial, mapas, trajetos e raciocínio lógico', r'orienta|lógic|malha|código|trajeto|calend|regra de forma'),
            ('Conjuntos e sistemas de numeração', r'conjunto|numeração')]
    usado, tab = set(), []
    for nome_c, pat in cats:
        n = [i for i, (_, _, s) in enumerate(fora) if i not in usado and re.search(pat, s, re.I)]
        usado |= set(n)
        tab.append(f'| {nome_c} | {len(n)} |')
    resto = len(fora) - len(usado)
    if resto:
        tab.append(f'| Outros | {resto} |')
    raros = ', '.join(f'{m} ({fmt(v["por_prova"])})' for m, v in sorted(F['mods'].items(), key=lambda x: x[1]['por_prova']) if v['por_prova'] < 0.8)
    novas = ', '.join(f'{i} ({a}→{d})' for i, a, d in mudou) or 'nenhuma'
    txt = f'''## 0.5 O que mais caiu: 12 provas, 2014 a 2025

Li as {str(F["questoes"])[:-3]}.{str(F["questoes"])[-3:]} questões do 2º dia de {F["provas"]} provas do Inep (45 de Natureza e 45 de Matemática em cada uma) e classifiquei cada questão na estação que ela exige para ser resolvida. **A classificação é minha, feita por leitura, e não é oficial**; a prova de 2021 veio de OCR (o PDF oficial tem fonte corrompida) e tem mais incerteza. Use para decidir a ordem de estudo, não para prever a prova de 2026: frequência passada não garante nada.

"Questões por prova" conta as questões em que a estação é o assunto principal. A faixa A/B/C segue a **exposição**, que também conta meia questão quando a estação é assunto secundário (uma conversão de unidades dentro de um problema de volume, por exemplo), com peso 60% para as 12 provas e 40% para as últimas 5. Por isso uma estação com menos questões como assunto principal pode ter faixa mais alta (limites: A a partir de 3,0 por prova em Matemática e 2,0 em Natureza; B a partir de 1,8 e 1,0). Mudaram em relação à apostila original: {novas}.

{chr(10).join(linhas)}
Natureza tem, em média por prova, **{fmt(disc["Física"])} questões de Física, {fmt(disc["Química"])} de Química e {fmt(disc["Biologia"])} de Biologia** (as demais não se encaixam numa das três).

### O que cai e as 45 estações não cobrem

Em Matemática, {len(fora)} questões em {F["provas"]} provas ficaram fora de qualquer estação. O guia **GD4** resume o essencial de cada assunto.

| Assunto | Questões |
|---|---|
{chr(10).join(tab)}

### Conferência com outras fontes

- **Matemática:** as páginas consultadas (Tessat, Aprova Total, Quanta, Politano, XTRI) também colocam razão e proporção, porcentagem, gráficos e tabelas e geometria no topo, e deixam matrizes, geometria analítica, PA e PG, logaritmo e trigonometria na cauda. Discordam em geometria plana (de 8% a 18%) e em funções (de 5% a 12%), conforme o agrupamento.
- **Natureza:** em Física, ondulatória, termologia e eletrodinâmica são os três primeiros nas nossas contas e também na contagem da Tessat (2010 a 2025); em Biologia, ecologia e impactos ambientais formam o maior bloco nas duas; em Química, orgânica é a estação mais cobrada nas nossas contas.
- **Cai pouco (menos de 0,8 por prova como assunto principal):** {raros}.

> **Dica de prova:** razão, proporção, porcentagem, unidades, escala e aritmética somam cerca de um terço da Matemática ({round(100*sum(F["mods"][m]["total"] for m in ("MA01","MA02","MA03","MA14"))/ (F["provas"]*45))}% dos itens como assunto principal). É o bloco que mais rende por hora de estudo, e onde um erro bobo pesa mais na TRI.

'''
    novo, n = re.subn(r'^## 0\.5 .*?(?=^## 0\.6)', lambda _: txt, md, count=1, flags=re.M | re.S)
    assert n == 1, 'seção 0.5 não encontrada'
    return novo


def extras(mods):
    """Questões extras (tools/extra/*.json, formato em SPEC.md). Entram depois das da apostila, com o mesmo id (MA01.4...)."""
    byid = {m['id']: m for m in mods}
    out = []
    for f in sorted((pathlib.Path(__file__).resolve().parent / 'extra').glob('*.json')):
        for it in json.loads(f.read_text(encoding='utf8')):
            m = byid[it['mod']]
            n = len(m['qs']) + 1
            assert len(it['alts']) == 5 and it['ans'] in 'ABCDE' and sorted(it['ex']) == list('ABCDE'), (f.name, it['mod'], n)
            assert sorted(it['traps']) == [k for k in 'ABCDE' if k != it['ans']], (f.name, it['mod'], n)
            out.append(dict(id=f"{it['mod']}.{n}", vol=m['vol'], mod=it['mod'], n=n, kind='fixacao', tag='Inédita, estilo ENEM',
                            base=[inline(b) for b in it['base']], src='Apostila do 2º dia (questão inédita, aprofundamento).', cmd=inline(it['cmd']),
                            alts=[inline(a) for a in it['alts']], ans=it['ans'], dif=it['dif'], hab=it['hab'],
                            ex={k: inline(v) for k, v in it['ex'].items()}, traps=it['traps']))
            m['qs'].append(out[-1]['id'])
    return out


def main(path):
    text = pathlib.Path(path).read_text(encoding='utf8')
    print(f'{carregar_formulas()} fórmulas como imagem (fm/)')
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
    n_base = len(qs)
    qs += extras(mods)  # questões extras de tools/extra/*.json (aprofundamento da semana de 09 a 15/11)
    print(f'{len(qs) - n_base} questões extras')
    F = freq_json()
    if F:  # frequência de 12 provas (tools/enem_freq.py): refaz as faixas, acrescenta a seção em cada estação e troca a seção 0.5
        mudou = aplicar_freq(mods, F)
        text = secao_05(text, F, mods, mudou)
        print(f'faixas alteradas: {mudou}')
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
