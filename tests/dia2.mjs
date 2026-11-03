/* Humanas de Ouro: 2º dia (Matemática, Física, Química, Biologia), gerado de Apostila_2o_dia_ENEM_2026.md por tools/apostila_dia2.py.
   Fica escondido enquanto o dia 2 está guardado. Rodar: node tests/dia2.mjs   (usa o Chromium do Playwright) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp' };
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const DATA_FILES = [...html.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
function loadData() {
  const ctx = vm.createContext({ window: {} });
  for (const f of DATA_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  return ctx.window.DATA;
}

check(DATA_FILES.includes('data/dia2.js'), 'dia 2: o index.html não carrega data/dia2.js');
check(DATA_FILES.indexOf('data/dia2.js') > DATA_FILES.indexOf('data/base.js'), 'dia 2: data/dia2.js precisa vir depois de data/base.js');
check(/SHELL_FILES=\[[^\]]*'data\/dia2\.js'/.test(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8')), 'dia 2: data/dia2.js não está em SHELL_FILES do sw.js');

/* Estações da apostila: 14 + 11 + 10 + 10. A linha M é Matemática (vol MT); P, Q e B são Natureza (vol CN). */
const LINES = { D: { vol: 'GD', name: 'Guia do dia 2', n: 3, guide: true }, M: { vol: 'MT', name: 'Matemática', n: 14 }, P: { vol: 'CN', name: 'Física', n: 11 }, Q: { vol: 'CN', name: 'Química', n: 10 }, B: { vol: 'CN', name: 'Biologia', n: 10 } };
const RAW = /\*\*|\]\(fig\/|^\s*\|\s*-{3}/m;
if (DATA_FILES.includes('data/dia2.js')) {
  const D0 = loadData(), D = Object.assign({ modules: [], questions: [], cards: [], vf: [] }, D0.dia2), ids = new Set(D.questions.map(q => q.id));
  check(!!D0.dia2, 'dia 2: data/dia2.js deveria guardar o conteúdo em DATA.dia2 (o app só o junta ao DATA depois da liberação)');
  check(!D0.modules.some(m => LINES[m.line]) && !D0.questions.some(q => q.vol === 'CN' || q.vol === 'MT') && !D0.cards.some(c => c.vol === 'CN' || c.vol === 'MT') && !D0.vf.some(v => /^(MA|FI|QU|BI)\d/.test(v.mod)), 'dia 2: o conteúdo não pode entrar no DATA antes da liberação');
  for (const [line, A] of Object.entries(LINES)) {
    const mods = D.modules.filter(m => m.line === line);
    check(mods.length === A.n, `${A.name}: ${mods.length} estações (esperadas ${A.n})`);
    for (const m of mods) {
      if (A.guide) { /* Guia: Parte 0, visões gerais e formulário; sem questões nem cartões */
        check(m.vol === 'GD' && (m.html.match(/<h4>/g) || []).length >= 3, `${m.id}: guia com menos de 3 seções`);
        check(!RAW.test(m.html), `${m.id}: sobrou markdown`);
        check(m.qs.length === 0, `${m.id}: o guia não tem questões`);
        continue;
      }
      check(m.mins > 0 && /Pré-requisitos:/.test(m.note), `${m.id}: faltam o tempo sugerido e os pré-requisitos da ficha`);
      const h4 = (m.html.match(/<h4>/g) || []).length;
      check(m.vol === A.vol, `${m.id}: vol "${m.vol}"`);
      check(h4 >= 4 && h4 <= 7, `${m.id}: ${h4} seções (de 4 a 7)`);
      check(m.resumo.length >= 4, `${m.id}: resumo com ${m.resumo.length} pares (mínimo 4)`);
      check(m.qs.length >= 2, `${m.id}: ${m.qs.length} questões (mínimo 2)`);
      check(/H\d+/.test(m.habs || ''), `${m.id}: sem habilidades da matriz`);
      check(['A', 'B', 'C'].includes(m.faixa), `${m.id}: faixa "${m.faixa}"`);
      check(D.cards.filter(c => c.id.startsWith(m.id + '-c')).length >= 5, `${m.id}: menos de 5 cartões`);
      const vf = D.vf.filter(v => v.mod === m.id);
      check(vf.length === 4 && vf.filter(v => v.v).length === 2, `${m.id}: V ou F precisa de 4 itens, 2 verdadeiros (tem ${vf.length}, ${vf.filter(v => v.v).length} verdadeiros)`);
      for (const v of vf) check(typeof v.v === 'boolean' && v.s && v.why && !RAW.test(v.s + v.why) && !/ENEM 20\d\d|Q\d{3}/i.test(v.s + v.why), `${m.id}: item de V ou F inválido ("${(v.s || '').slice(0, 40)}")`);
      check(!RAW.test(m.html + JSON.stringify(m.resumo)), `${m.id}: sobrou markdown na teoria ou no resumo`);
      for (const id of m.qs) { check(ids.has(id), `${m.id}: questão ${id} não existe`); const q = D.questions.find(x => x.id === id); if (q) check(q.vol === A.vol && q.mod === m.id, `${m.id}: questão ${id} com vol/mod errados`); }
    }
  }
  for (const vol of ['MT', 'CN']) {
    const qs = D.questions.filter(q => q.vol === vol), dist = {};
    for (const q of qs) dist[q.ans] = (dist[q.ans] || 0) + 1;
    check(qs.length >= (vol === 'MT' ? 38 : 70), `${vol}: só ${qs.length} questões`);
    for (const k of 'ABCDE') { const s = (dist[k] || 0) / Math.max(1, qs.length); check(s >= 0.1 && s <= 0.32, `${vol}: gabarito desequilibrado, ${k} em ${Math.round(s * 100)}% das ${qs.length} questões`); }
  }
  /* Figuras da apostila: toda imagem citada existe em fig/ e está no cache do app. */
  const swSrc = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const figs = [...new Set([...D.modules.map(m => m.html), ...D.questions.map(q => q.base.join(' '))].flatMap(h => [...h.matchAll(/src="(fig\/[^"]+)"/g)].map(x => x[1])))];
  check(figs.length === 56, `figuras: ${figs.length} citadas (esperadas 56)`);
  for (const f of figs) { check(fs.existsSync(path.join(ROOT, f)), `figura ${f} não existe`); check(swSrc.includes(`'${f}'`), `figura ${f} não está em FIGS do sw.js`); }
  for (const q of D.questions) {
    check(q.alts.length === 5 && /^[A-E]$/.test(q.ans), `${q.id}: alternativas ou gabarito inválidos`);
    check(Object.keys(q.ex || {}).sort().join('') === 'ABCDE', `${q.id}: falta explicação para alguma alternativa`);
    check(!RAW.test(JSON.stringify([q.base, q.cmd, q.alts, q.ex])), `${q.id}: sobrou markdown`);
    check(/^H\d+/.test(q.hab || ''), `${q.id}: sem habilidade`);
    for (const t of Object.values(q.traps || {})) check(['oposto', 'conceito', 'detalhe', 'exagero', 'unidade', 'conta', 'leitura', 'inversao'].includes(t), `${q.id}: armadilha "${t}" desconhecida`);
    check(!/[Ã][ -¿]|�/.test(JSON.stringify(q)), `${q.id}: texto com acentos corrompidos`);
  }
}

/* Interface: guardado até o dia 2 liberar; depois aparece no mapa, nos anéis e no relatório. */
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const f = p.endsWith(path.sep) ? path.join(p, 'index.html') : p;
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const URL_ = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
try {
  for (const [day, open] of [['2026-10-23T09:00:00-03:00', false], ['2026-11-09T09:00:00-03:00', true]]) {
    for (const colorScheme of ['light', 'dark']) {
      if (!open && colorScheme === 'dark') continue;
      const ctx = await browser.newContext({ viewport: { width: 375, height: 780 }, colorScheme, serviceWorkers: 'block' });
      const page = await ctx.newPage(); const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.clock.setFixedTime(new Date(day)); await page.goto(URL_); await page.waitForTimeout(500);
      const hasLine = await page.evaluate(() => Object.fromEntries('DMPQB'.split('').map(L => [L, !!document.querySelector(`.line.lc-${L}`)])));
      const next = await page.evaluate(() => nextModules(60).map(m => m.id));
      const rings = await page.evaluate(() => [...document.querySelectorAll('.aring')].map(r => r.dataset.area));
      if (!open) {
        check(!Object.values(hasLine).some(Boolean), `guardado (${day.slice(0, 10)}): as linhas M, P, Q e B não deveriam aparecer no mapa`);
        check(!next.some(id => /^(GD|MA|FI|QU|BI)\d/.test(id)), 'guardado: nextModules sugere módulo do dia 2 antes da liberação');
        check(rings.join() === 'LC,HUM,RD', `guardado: anéis do início = ${rings.join()}`);
      } else {
        check(Object.values(hasLine).every(Boolean), `liberado (${colorScheme}): faltam linhas no mapa (${JSON.stringify(hasLine)})`);
        check(rings.includes('CN') && rings.includes('MT'), `liberado: faltam os anéis de Natureza e Matemática (${rings.join()})`);
        const c = await page.evaluate(() => {
          const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
          return 'DMPQB'.split('').map(L => { const b = document.querySelector(`.line.lc-${L} .line-head .badge`); if (!b) return 0; const cs = getComputedStyle(b), x = lum(cs.color), y = lum(cs.backgroundColor); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); });
        });
        c.forEach((r, i) => check(r >= 4.5, `liberado (${colorScheme}): selo da linha ${'DMPQB'[i]} com contraste ${r.toFixed(2)}`));
        if (colorScheme === 'light') {
          check(await page.evaluate(() => !!M.MA01 && !!M.FI08 && !!M.QU04 && !!M.BI05 && !!M.GD1 && !!M.GD3), 'liberado: faltam módulos MA01, FI08, QU04, BI05, GD1 ou GD3');
          for (const id of ['MA01', 'FI08', 'QU04', 'BI05', 'GD1', 'GD2', 'GD3']) {
            for (const tab of ['teoria', 'q', 'resumo', 'vf']) {
              await page.evaluate(([id, tab]) => { if (M[id]) go('mod', { id, tab }); }, [id, tab]); await page.waitForTimeout(150);
              const txt = await page.locator('#modbody').textContent({ timeout: 1500 }).catch(() => '');
              check(txt.length > (tab === 'teoria' ? 200 : 20), `liberado: ${id}/${tab} abriu vazio`);
              if (tab === 'q') check(!/volume \d/.test(txt) && !/são da apostila/.test(txt), `liberado: as questões de ${id} aparecem como "volume" da apostila de Humanas`);
            }
          }
          await page.evaluate(() => go('linhas'));
          const rep = await page.evaluate(() => typeof buildReport === 'function' ? buildReport() : '');
          for (const nm of ['Matemática', 'Física', 'Química', 'Biologia']) check(new RegExp(nm + ': ').test(rep), `liberado: o relatório do Painel não lista ${nm}`);
        }
      }
      check(!errs.length, `erro de JavaScript na página (${day.slice(0, 10)}): ${errs[0]}`);
      await ctx.close();
    }
  }
} finally { await browser.close(); server.close(); }
if (fails.length) { console.error('dia2: FALHOU\n- ' + fails.slice(0, 40).join('\n- ') + (fails.length > 40 ? `\n... e mais ${fails.length - 40}` : '')); process.exit(1); }
console.log('dia2: apostila do 2º dia ok');
