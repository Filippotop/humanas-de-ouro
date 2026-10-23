/* Humanas de Ouro: teste de fumaça. Abre o app num navegador de verdade e falha se algo que já funcionava quebrar.
   Rodar: npm install && npm test   (usa o Chromium do Playwright) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const TABS = ['linhas', 'provas', 'redacao', 'biblioteca', 'arena', 'treino', 'plano', 'painel'];
const VIEWPORTS = { '320': { width: 320, height: 640 }, '375': { width: 375, height: 780 }, '1280': { width: 1280, height: 850 } };
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp' };

const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

/* Servidor estático mínimo na raiz do repositório. */
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const f = p.endsWith(path.sep) ? path.join(p, 'index.html') : p;
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const URL_ = `http://127.0.0.1:${server.address().port}/`;

/* Os dados vivem em data/*.js, na ordem em que o index.html os carrega. */
const DATA_FILES = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
function loadData() {
  const ctx = vm.createContext({ window: {} });
  for (const f of DATA_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  return ctx.window.DATA;
}

/* Dados: gabaritos válidos e uma imagem para cada questão. */
function testData() {
  check(DATA_FILES[0] === 'data/base.js', `dados: o index.html deveria carregar data/base.js primeiro (carrega: ${DATA_FILES.join(', ') || 'nada'})`);
  if (!DATA_FILES.length) return;
  const DATA = loadData();
  for (const [id, e] of Object.entries(DATA.exams)) {
    const nums = Object.keys(e.key).map(Number);
    check(nums.length === e.last - e.first + 1, `${id}: gabarito com ${nums.length} questões`);
    for (const [n, k] of Object.entries(e.key)) check(k === null || /^[A-E]$/.test(k), `${id} q${n}: gabarito inválido "${k}"`);
    for (const [n, { f }] of Object.entries({ ...e.img, ...e.shared })) check(fs.existsSync(path.join(ROOT, "provas", id, f)), `${id} q${n}: imagem ${f} não existe`);
  }
}

/* Integridade do conteúdo: ids únicos, toda questão completa e todo módulo apontando para questões que existem. */
function testIntegrity() {
  if (!DATA_FILES.length) return;
  const DATA = loadData();
  const deepQs = Object.values(DATA.deep || {}).flatMap(d => d.questions || []);
  const qs = [...DATA.questions, ...deepQs];
  const ids = new Set();
  for (const q of qs) {
    check(!ids.has(q.id), `questão ${q.id}: id repetido`); ids.add(q.id);
    check(/^[A-E]$/.test(q.ans), `questão ${q.id}: gabarito "${q.ans}"`);
    check(Array.isArray(q.alts) && q.alts.length === 5, `questão ${q.id}: precisa de 5 alternativas`);
    check(Object.keys(q.ex || {}).sort().join('') === 'ABCDE', `questão ${q.id}: falta explicação para alguma alternativa`);
  }
  const mids = new Set();
  for (const m of DATA.modules) {
    check(!mids.has(m.id), `módulo ${m.id}: id repetido`); mids.add(m.id);
    check(m.html && m.html.trim().length > 0, `módulo ${m.id}: sem teoria`);
    check(Array.isArray(m.resumo) && m.resumo.length > 0, `módulo ${m.id}: sem resumo`);
    for (const q of m.qs) check(ids.has(q), `módulo ${m.id}: questão ${q} não existe`);
  }
  for (const id of Object.keys(DATA.deep || {})) check(mids.has(id), `aprofundamento: módulo ${id} não existe`);
}

/* O aprofundamento (DATA.deep) entra no módulo: teoria no fim e questões novas na contagem. */
async function testDeep(browser) {
  if (!DATA_FILES.length) return check(false, 'aprofundamento: sem data/*.js');
  const ctx = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const extra = { id: 'D-TESTE.1', vol: 'FS', mod: 'F1', tag: 'teste', base: ['Texto.'], src: 'Teste.', cmd: 'Comando de teste', alts: ['a', 'b', 'c', 'd', 'e'], ans: 'A', ex: { A: 'a', B: 'b', C: 'c', D: 'd', E: 'e' }, hab: 'H1', dif: 'fácil', traps: {}, kind: 'fixacao' };
  await page.route('**/data/base.js', async r => { const res = await r.fetch(); r.fulfill({ response: res, body: (await res.text()) + `\nwindow.DATA.deep={F1:{html:'<h4>Aprofundamento de teste</h4>',questions:[${JSON.stringify(extra)}]}};` }); });
  await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('mod', { id: 'F1', tab: 'teoria' })); await page.waitForTimeout(250);
  check(await page.locator('#prose h4', { hasText: 'Aprofundamento de teste' }).count() === 1, 'aprofundamento: a teoria extra não apareceu no módulo');
  const qtab = await page.locator('.subtabs button[data-t="q"]').textContent();
  const n = Number((qtab.match(/\/(\d+)/) || [])[1]);
  check(n === loadData().modules.find(m => m.id === 'F1').qs.length + 1, `aprofundamento: contagem de questões "${qtab}"`);
  await ctx.close();
}

/* Offline: os arquivos de dados ficam no cache do app, e ele abre sem internet. */
async function testOfflineShell(browser) {
  check(DATA_FILES.length > 0, 'offline: nenhum data/*.js para conferir no cache');
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage(); await page.goto(URL_);
  await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(1500);
  for (const f of DATA_FILES) check(await page.evaluate(f => caches.match(f).then(r => !!r), f), `offline: ${f} não está no cache`);
  await ctx.setOffline(true); await page.reload(); await page.waitForTimeout(800);
  check(await page.evaluate(() => document.querySelectorAll('#app .st').length) > 0, 'offline: o app abriu sem as estações');
  await ctx.close();
}

/* Cada aba, em cada tamanho e tema: sem erro de JS, sem rolagem lateral, sem falha séria de acessibilidade. */
async function testTabs(browser) {
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport, colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto(URL_); await page.waitForTimeout(400);
    for (const t of TABS) {
      const where = `${vpName}px/${colorScheme}/${t}`;
      await page.click(`#tabs button[data-v="${t}"]`); await page.waitForTimeout(250);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${where}: rolagem horizontal`);
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })).violations
        .filter(x => x.impact === 'serious' || x.impact === 'critical').map(x => `${x.id} em ${x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')}`));
      for (const x of v) check(false, `${where}: acessibilidade: ${x}`);
    }
    for (const e of errs) check(false, `${vpName}px/${colorScheme}: erro de JS: ${e}`);
    await ctx.close();
  }
}

/* Navegação: todo ícone é desenhado (SVG) e, no celular, nenhum rótulo invade o vizinho. */
async function testNav(browser) {
  for (const vpName of ['320', '375']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[vpName], serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    for (const active of ['linhas', 'biblioteca']) {
    await page.click(`#tabs button[data-v="${active}"]`); await page.waitForTimeout(200);
    const r = await page.evaluate(() => [...document.querySelectorAll('#tabs button')].map(b => {
      const svg = b.querySelector('.ni svg'), lr = b.querySelector('.nl').getBoundingClientRect(), br = b.getBoundingClientRect();
      const shown = lr.width > 2; /* no celular só a aba ativa mostra o rótulo; as outras o escondem só da vista */
      return { v: b.dataset.v, svg: !!svg && svg.getBoundingClientRect().width > 0, tap: br.width >= 30 && br.height >= 44,
        over: shown && (lr.left < br.left + 2 || lr.right > br.right - 2), activeHidden: b.getAttribute('aria-current') === 'true' && !shown,
        left: br.left, right: br.right, out: br.left < 0 || br.right > innerWidth };
    }));
    r.forEach((b, i) => {
      check(b.svg, `${vpName}px: ícone da aba ${b.v} não é SVG visível`);
      check(!b.over, `${vpName}px: rótulo da aba ${b.v} não cabe`);
      check(!b.activeHidden, `${vpName}px: a aba ativa ${b.v} está sem rótulo`);
      check(b.tap, `${vpName}px: aba ${b.v} pequena demais para o toque`);
      check(!b.out, `${vpName}px: aba ${b.v} sai da tela`);
      if (i) check(b.left >= r[i - 1].right - 0.5, `${vpName}px: aba ${b.v} encosta na anterior`);
    });
    }
    await ctx.close();
  }
}

/* Questões respondidas: as cores de certo e errado também precisam ser legíveis nos dois temas. */
async function testAnswered(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    await page.click('#tabs button[data-v="treino"]'); await page.click('.subtabs button[data-t="recal"]'); await page.waitForTimeout(200);
    for (const k of ['A', 'B', 'C']) { const alt = page.locator(`.alt[data-k="${k}"]:not([disabled])`).first(); if (await alt.count()) { await alt.click(); await page.waitForTimeout(150); } }
    check(await page.locator('.alt.right').count() > 0 && await page.locator('.alt.wrong').count() > 0, `${colorScheme}: recalibração não marcou certo e errado`);
    /* O axe pula botões desabilitados, e as alternativas viram desabilitadas depois da resposta: o contraste é medido aqui. */
    const v = await page.evaluate(() => {
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      return [...document.querySelectorAll('.alt.right .L, .alt.wrong .L, .task .ic, .line-head .badge')].map(e => {
        const cs = getComputedStyle(e), a = lum(cs.color), b = lum(cs.backgroundColor);
        return [e.className + ' em ' + e.closest('[class]').parentElement.className, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)];
      }).filter(([, r]) => r < 4.5).map(([w, r]) => `${w} (${r.toFixed(2)}:1)`);
    });
    for (const x of v) check(false, `${colorScheme}/respondida: contraste em ${x}`);
    await ctx.close();
  }
}

/* Offline: fora do Wi-Fi o app pergunta antes de baixar as provas e só baixa depois do sim. */
async function testOfflineConsent(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage(); await page.goto(URL_);
  await page.waitForFunction(() => navigator.serviceWorker.controller || navigator.serviceWorker.ready, null, { timeout: 10000 });
  await page.waitForTimeout(2500);
  const count = () => page.evaluate(async () => (await (await caches.open('hdo-provas-v1')).keys()).length);
  check(await count() === 0, 'offline: baixou imagens das provas sem perguntar');
  const ask = page.locator('#pwaWarm');
  check(await ask.isVisible().catch(() => false), 'offline: não apareceu a pergunta para baixar as provas');
  if (await ask.isVisible().catch(() => false)) {
    await ask.click(); await page.waitForTimeout(4000);
    check(await count() > 0, 'offline: não baixou depois do sim');
  }
  await ctx.close();
}

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
try {
  testData();
  testIntegrity();
  await testDeep(browser);
  await testOfflineShell(browser);
  await testNav(browser);
  await testTabs(browser);
  await testAnswered(browser);
  await testOfflineConsent(browser);
} finally { await browser.close(); server.close(); }

if (fails.length) { console.error(`FALHOU (${fails.length}):\n- ` + fails.join('\n- ')); process.exit(1); }
console.log('OK: dados, navegação, 8 abas × 3 tamanhos × 2 temas e download offline.');
