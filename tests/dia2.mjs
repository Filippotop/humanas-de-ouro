/* Humanas de Ouro: Natureza e Matemática (dia 2). Os módulos seguem o formato de Linguagens e ficam escondidos
   enquanto o dia 2 está guardado. Rodar: node tests/dia2.mjs   (usa o Chromium do Playwright) */
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

/* Arquivo carregado, no cache do app e depois de Linguagens. */
check(DATA_FILES.includes('data/dia2.js'), 'dia 2: o index.html não carrega data/dia2.js');
check(DATA_FILES.indexOf('data/dia2.js') > DATA_FILES.indexOf('data/base.js'), 'dia 2: data/dia2.js precisa vir depois de data/base.js');
check(/SHELL_FILES=\[[^\]]*'data\/dia2\.js'/.test(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8')), 'dia 2: data/dia2.js não está em SHELL_FILES do sw.js');

/* Conteúdo: cada módulo cumpre os mesmos mínimos de Linguagens. */
const AREAS = { N: { vol: 'CN', name: 'Natureza', min: 5 }, M: { vol: 'MT', name: 'Matemática', min: 4 } };
if (DATA_FILES.includes('data/dia2.js')) {
  const D0 = loadData(), D = Object.assign({ modules: [], questions: [], cards: [], vf: [] }, D0.dia2), ids = new Set(D.questions.map(q => q.id));
  check(!!D0.dia2, 'dia 2: data/dia2.js deveria guardar o conteúdo em DATA.dia2 (o app só o junta ao DATA depois da liberação)');
  check(!D0.modules.some(m => m.line === 'N' || m.line === 'M'), 'dia 2: o conteúdo não pode entrar em DATA.modules antes da liberação');
  check(!D0.questions.some(q => q.vol === 'CN' || q.vol === 'MT') && !D0.cards.some(c => c.vol === 'CN' || c.vol === 'MT'), 'dia 2: questões e cartões não podem entrar no DATA antes da liberação');
  for (const [line, A] of Object.entries(AREAS)) {
    const mods = D.modules.filter(m => m.line === line);
    check(mods.length >= A.min, `${A.name}: ${mods.length} módulos (mínimo ${A.min})`);
    const qs = D.questions.filter(q => q.vol === A.vol), dist = {};
    for (const q of qs) dist[q.ans] = (dist[q.ans] || 0) + 1;
    for (const k of 'ABCDE') { const share = (dist[k] || 0) / Math.max(1, qs.length);
      check(share >= 0.1 && share <= 0.32, `${A.name}: gabarito desequilibrado, ${k} em ${Math.round(share * 100)}% das ${qs.length} questões`); }
    for (const m of mods) {
      const h4 = (m.html.match(/<h4>/g) || []).length;
      check(m.vol === A.vol, `${m.id}: vol "${m.vol}"`);
      check(h4 >= 4 && h4 <= 7, `${m.id}: ${h4} seções (de 4 a 7)`);
      check(/class="box enem"/.test(m.html) && /class="box pegadinha"/.test(m.html), `${m.id}: falta quadro No Enem ou Pegadinha`);
      check(m.resumo.length >= 6, `${m.id}: resumo com ${m.resumo.length} pares (mínimo 6)`);
      check(m.qs.length >= 5, `${m.id}: ${m.qs.length} questões (mínimo 5)`);
      check(/H\d+/.test(m.habs || ''), `${m.id}: sem habilidades da matriz`);
      check(['A', 'B', 'C'].includes(m.faixa), `${m.id}: faixa "${m.faixa}"`);
      check(D.cards.filter(c => c.id.startsWith(m.id + '-c')).length >= 6, `${m.id}: menos de 6 cartões`);
      check(D.vf.filter(v => v.mod === m.id).length >= 4, `${m.id}: menos de 4 itens de V ou F`);
      for (const id of m.qs) { check(ids.has(id), `${m.id}: questão ${id} não existe`); const q = D.questions.find(x => x.id === id); if (q) check(q.vol === A.vol && q.mod === m.id, `${m.id}: questão ${id} com vol/mod errados`); }
    }
    for (const q of qs) {
      check(q.alts.length === 5 && /^[A-E]$/.test(q.ans), `${q.id}: alternativas ou gabarito inválidos`);
      check(Object.keys(q.ex || {}).sort().join('') === 'ABCDE', `${q.id}: falta explicação para alguma alternativa`);
      check(!/[Ã][ -¿]|�/.test(JSON.stringify(q)), `${q.id}: texto com acentos corrompidos`);
    }
  }
}

/* Interface: guardado até o dia 2 liberar; depois aparece no mapa, nos cartões e no relatório. */
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
      await page.clock.setFixedTime(new Date(day)); await page.goto(URL_); await page.waitForTimeout(300);
      const hasLine = await page.evaluate(() => ({ N: !!document.querySelector('.line.lc-N'), M: !!document.querySelector('.line.lc-M') }));
      const next = await page.evaluate(() => nextModules(30).map(m => m.id));
      const rings = await page.evaluate(() => [...document.querySelectorAll('.aring')].map(r => r.dataset.area));
      if (!open) {
        check(!hasLine.N && !hasLine.M, `guardado (${day.slice(0, 10)}): as linhas N e M não deveriam aparecer no mapa`);
        check(!next.some(id => /^[NM]\d/.test(id)), 'guardado: nextModules sugere módulo de Natureza ou Matemática antes do dia 2');
        check(rings.join() === 'LC,HUM,RD', `guardado: anéis do início = ${rings.join()}`);
      } else {
        check(hasLine.N && hasLine.M, `liberado (${colorScheme}): as linhas N e M deveriam aparecer no mapa`);
        check(rings.includes('CN') && rings.includes('MT'), `liberado: faltam os anéis de Natureza e Matemática (${rings.join()})`);
        const c = await page.evaluate(() => {
          const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
          return ['N', 'M'].map(L => { const b = document.querySelector(`.line.lc-${L} .line-head .badge`); if (!b) return 0; const cs = getComputedStyle(b), x = lum(cs.color), y = lum(cs.backgroundColor); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); });
        });
        c.forEach((r, i) => check(r >= 4.5, `liberado (${colorScheme}): selo da linha ${'NM'[i]} com contraste ${r.toFixed(2)}`));
        if (colorScheme === 'light') {
          check(await page.evaluate(() => !!M.M1), 'liberado: o módulo M1 não existe');
          await page.evaluate(() => { if (M.M1) go('mod', { id: 'M1', tab: 'q' }); }); await page.waitForTimeout(200);
          const txt = await page.locator('#modbody').textContent().catch(() => '');
          check(!/volume \d/.test(txt) && !/são da apostila/.test(txt), 'liberado: as questões de M1 aparecem como "volume" da apostila de Humanas');
          await page.evaluate(() => go('linhas'));
          const rep = await page.evaluate(() => { const o = document.createElement('div'); return typeof buildReport === 'function' ? buildReport() : ''; });
          check(!rep || /Natureza: /.test(rep), 'liberado: o relatório do Painel não lista Natureza');
          check(!rep || /Matemática: /.test(rep), 'liberado: o relatório do Painel não lista Matemática');
        }
      }
      check(!errs.length, `erro de JavaScript na página (${day.slice(0, 10)}): ${errs[0]}`);
      await ctx.close();
    }
  }
} finally { await browser.close(); server.close(); }
if (fails.length) { console.error('dia2: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('dia2: Natureza e Matemática ok');
