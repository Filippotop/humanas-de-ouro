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
  const extra = { id: 'D-TESTE.1', vol: 'FS', mod: 'R1', tag: 'teste', base: ['Texto.'], src: 'Teste.', cmd: 'Comando de teste', alts: ['a', 'b', 'c', 'd', 'e'], ans: 'A', ex: { A: 'a', B: 'b', C: 'c', D: 'd', E: 'e' }, hab: 'H1', dif: 'fácil', traps: {}, kind: 'fixacao' };
  await page.route('**/data/base.js', async r => { const res = await r.fetch(); r.fulfill({ response: res, body: (await res.text()) + `\nwindow.DATA.deep=Object.assign(window.DATA.deep||{},{R1:{html:'<h4>Aprofundamento de teste</h4>',questions:[${JSON.stringify(extra)}]}});` }); });
  await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('mod', { id: 'R1', tab: 'teoria' })); await page.waitForTimeout(250);
  check(await page.locator('#prose h4', { hasText: 'Aprofundamento de teste' }).count() === 1, 'aprofundamento: a teoria extra não apareceu no módulo');
  const qtab = await page.locator('.subtabs button[data-t="q"]').textContent();
  const n = Number((qtab.match(/\/(\d+)/) || [])[1]);
  check(n === loadData().modules.find(m => m.id === 'R1').qs.length + 1, `aprofundamento: contagem de questões "${qtab}"`);
  await ctx.close();
}

/* Offline: os arquivos de dados ficam no cache do app, e ele abre sem internet. */
async function testOfflineShell(browser) {
  check(DATA_FILES.length > 0, 'offline: nenhum data/*.js para conferir no cache');
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage(); await page.goto(URL_);
  await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(1500);
  const scripts = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="([^":]+)"/g)].map(m => m[1]);
  for (const f of scripts) check(await page.evaluate(f => caches.match(f).then(r => !!r), f), `offline: ${f} não está no cache`);
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

/* Plano: só dia 1 até a prova, simulado no domingo 1/11 e a semana do dia 2 reservada. */
function testPlan() {
  if (!DATA_FILES.length) return;
  const D = loadData(), byDay = Object.fromEntries(D.plan.map(p => [p.d, p])), mods = new Set(D.modules.map(m => m.id));
  const days = (a, b) => { const out = []; for (let d = new Date(a + 'T12:00:00Z'); d <= new Date(b + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + 1)) out.push(d.toISOString().slice(0, 10)); return out; };
  for (const d of days('2026-10-23', '2026-11-07')) check(byDay[d], `plano: falta o dia ${d}`);
  for (const p of D.plan.filter(p => p.d >= '2026-10-23' && p.d < '2026-11-08'))
    for (const t of p.tasks) check(!/^(24d2|25d2)/.test(t.a || '') && !/:(N|M|NM)$/.test(t.a || ''), `plano: ${p.d} tem tarefa do dia 2 (${t.k}:${t.a})`);
  check((byDay['2026-11-01'] || { tasks: [] }).tasks.some(t => t.k === 'prova' && t.a === '24d1:LH'), 'plano: o simulado 24d1:LH não está no domingo 1/11');
  for (const p of D.plan) for (const t of p.tasks) if (t.k === 'mod') check(mods.has(t.a), `plano: ${p.d} aponta para o módulo inexistente ${t.a}`);
  for (const d of days('2026-10-24', '2026-11-06').filter(d => d !== '2026-11-01' && d !== '2026-11-02'))
    check((byDay[d] || { tasks: [] }).tasks.some(t => t.k === 'mod' && /^L\d+$/.test(t.a)), `plano: ${d} sem bloco de Linguagens`);
  for (const d of days('2026-11-09', '2026-11-14')) check(byDay[d] && /^Dia 2/.test(byDay[d].foco), `plano: ${d} deveria ser da semana do dia 2`);
}

/* Modo Dia 1: o dia 2 fica guardado até 72/90 no dia 1 de 2024 cronometrado, até 9/11 ou até a liberação manual. */
async function testDia1(browser) {
  if (!DATA_FILES.length) return;
  const key = loadData().exams['24d1'].key;
  const run = (nOk, extra = {}) => { const ans = {}; let ok = 0;
    for (let n = 1; n <= 90; n++) { const k = key[n]; if (!k) continue; ans[n] = ok < nOk ? k : (k === 'A' ? 'B' : 'A'); if (ans[n] === k) ok++; }
    return { id: 'r' + nOk, areas: 'LH', mode: 'prova', ans, flag: {}, cut: {}, start: 1, limit: 1, done: true, cur: 0, end: 2, time: 1, ...extra }; };
  const humanasOnly = () => { const r = run(90, { areas: 'H' }); for (let n = 1; n <= 45; n++) delete r.ans[n]; return r; };
  const open = async (S, date = '2026-10-23T12:00:00-03:00') => {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block' });
    await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('humanas-de-ouro-v1', s); sessionStorage.setItem('seeded', '1'); } }, JSON.stringify(S));
    const page = await ctx.newPage(); await page.clock.setFixedTime(new Date(date));
    await page.goto(URL_); await page.waitForTimeout(300); return { ctx, page };
  };
  const lockText = async page => { await page.click('#tabs button[data-v="provas"]'); await page.waitForTimeout(200);
    return (await page.locator('.dia2-lock').count()) ? await page.locator('.dia2-lock').textContent() : null; };
  const withRuns = runs => ({ v: 1, pv: { '24d1': { runs, notes: {} } }, updated: 1 });

  { const { ctx, page } = await open({ v: 1, updated: 1 });
    const tasks = (await page.locator('.task').allTextContents()).filter(t => !t.includes('Plano de hoje'));
    check(!tasks.some(t => /2º dia|Natureza|Matemática/.test(t)), `dia 1: a missão ainda sugere o dia 2 (${tasks.filter(t => /2º dia|Natureza|Matemática/.test(t)).join(' | ')})`);
    const lt = await lockText(page);
    check(lt && lt.includes('2025 · 2º dia') && lt.includes('2024 · 2º dia'), 'dia 1: as provas do dia 2 não estão guardadas em .dia2-lock');
    await ctx.close(); }
  { const { ctx, page } = await open(withRuns([run(72)]));
    check(await lockText(page) === null, 'dia 1: 72/90 cronometrado não liberou o dia 2'); await ctx.close(); }
  { const { ctx, page } = await open(withRuns([run(71)]));
    const lt = await lockText(page); check(lt && lt.includes('71/90'), `dia 1: com 71/90 deveria continuar guardado e mostrar 71/90 (${lt && lt.slice(0, 80)})`); await ctx.close(); }
  for (const [name, r] of [['modo estudo', run(90, { mode: 'estudo' })], ['só Humanas', humanasOnly()], ['não entregue', run(90, { done: false })]]) {
    const { ctx, page } = await open(withRuns([r]));
    check(await lockText(page) !== null, `dia 1: ${name} não deveria liberar o dia 2`); await ctx.close(); }
  { const { ctx, page } = await open({ v: 1, updated: 1 }, '2026-11-09T09:00:00-03:00');
    check(await lockText(page) === null, 'dia 1: em 9/11 o dia 2 deveria estar liberado'); await ctx.close(); }
  { const { ctx, page } = await open({ v: 1, updated: 1 });
    await lockText(page); const b = page.locator('#dia2Force');
    if (await b.count()) { await b.click(); await b.click(); await page.waitForTimeout(200); }
    check(await page.locator('.dia2-lock').count() === 0, 'dia 1: "Liberar mesmo assim" não liberou');
    const via = await page.evaluate(() => (JSON.parse(localStorage.getItem('humanas-de-ouro-v1') || '{}').dia2 || {}).via);
    check(via === 'manual', `dia 1: liberação manual não gravou S.dia2.via (${via})`); await ctx.close(); }
}

/* Sincronização por Gist: o que um aparelho faz aparece no outro; chave ruim avisa; a chave nunca vai no código de exportação. */
async function testGistSync(browser) {
  const TOKEN = 'tok_bom_teste_123', gists = {}; let seq = 0;
  const api = async route => {
    const req = route.request(), url = new URL(req.url()), auth = req.headers()['authorization'];
    if (auth !== 'Bearer ' + TOKEN) return route.fulfill({ status: 401, contentType: 'application/json', body: '{"message":"Bad credentials"}' });
    const json = o => route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(o) });
    const m = url.pathname.match(/^\/gists\/(\w+)$/);
    if (url.pathname === '/gists' && req.method() === 'GET') return json(Object.values(gists));
    if (url.pathname === '/gists' && req.method() === 'POST') { const b = req.postDataJSON(), id = 'g' + (++seq); gists[id] = { id, description: b.description, public: b.public, files: { 'progresso.json': { content: b.files['progresso.json'].content, truncated: false } } }; return json(gists[id]); }
    if (m && req.method() === 'GET') return gists[m[1]] ? json(gists[m[1]]) : route.fulfill({ status: 404, body: '{}' });
    if (m && req.method() === 'PATCH') { gists[m[1]].files['progresso.json'].content = req.postDataJSON().files['progresso.json'].content; return json(gists[m[1]]); }
    return route.fulfill({ status: 404, body: '{}' });
  };
  const device = async () => { const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' }); await ctx.route('https://api.github.com/**', api);
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(500); return { ctx, page }; };

  const A = await device();
  check(await A.page.evaluate(() => typeof window.GistSync === 'object'), 'sync: GistSync não existe no app instalado');
  if (await A.page.evaluate(() => typeof window.GistSync !== 'object')) { await A.ctx.close(); return; }
  check(await A.page.evaluate(t => GistSync.connect(t), TOKEN) === 'ok', 'sync: não conectou com a chave boa');
  const gist = Object.values(gists)[0];
  check(gist && gist.description === 'humanas-de-ouro-progresso' && gist.public === false, 'sync: não criou o Gist secreto humanas-de-ouro-progresso');
  await A.page.evaluate(() => { S.ans['FS-1'] = { first: 'A', ok: true, t: Date.now(), src: 'teste' }; save(); });
  await A.page.waitForTimeout(4500);
  check(gist && JSON.parse(gist.files['progresso.json'].content).ans['FS-1'], 'sync: a resposta não chegou ao Gist 3 s depois de salvar');
  const leaked = await A.page.evaluate(async t => JSON.stringify(await unpackS(await packS())).includes(t) || location.hash.includes(t), TOKEN);
  check(!leaked, 'sync: a chave apareceu no código de exportação');
  check(/sincronizado/.test(await A.page.locator('#sync').textContent()), 'sync: o selo não mostra "sincronizado"');

  const B = await device();
  check(await B.page.evaluate(t => GistSync.connect(t), TOKEN) === 'ok', 'sync: o segundo aparelho não conectou');
  check(Object.keys(gists).length === 1, `sync: o segundo aparelho criou outro Gist (${Object.keys(gists).length})`);
  check(await B.page.evaluate(() => !!S.ans['FS-1']), 'sync: a resposta do aparelho A não apareceu no aparelho B');
  check((await B.page.locator('.stats .stat .n').first().textContent()).trim().startsWith('1'), 'sync: a tela do aparelho B não foi atualizada');
  await B.page.evaluate(() => { S.ans['FS-2'] = { first: 'B', ok: false, t: Date.now(), src: 'teste' }; save(); });
  await B.page.waitForTimeout(4500);
  await A.page.evaluate(() => GistSync.pull());
  check(await A.page.evaluate(() => !!S.ans['FS-1'] && !!S.ans['FS-2']), 'sync: depois da volta, o aparelho A não tem as duas respostas');
  await A.ctx.close(); await B.ctx.close();

  const C = await device();
  check(await C.page.evaluate(() => GistSync.connect('chave_ruim')) === 'auth', 'sync: chave ruim deveria responder "auth"');
  check(/reconecte/.test(await C.page.locator('#sync').textContent()), 'sync: com chave ruim o selo deveria pedir para reconectar');
  await C.ctx.close();
}

/* Design: tokens, campos e links com estilo, cabeçalho compacto no celular, um botão principal por prova e movimento reduzido. */
async function testDesign(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(400);
  const tok = await page.evaluate(() => { const cs = getComputedStyle(document.documentElement); const g = n => cs.getPropertyValue(n).trim();
    return { fs: [1, 2, 3, 4, 5, 6, 7].map(i => g('--fs-' + i)), sp: [1, 2, 3, 4, 5, 6, 7, 8].map(i => g('--sp-' + i)), l: g('--l') }; });
  check(tok.fs.join(' ') === '12px 14px 16px 18px 22px 28px 36px', `design: escala tipográfica --fs-1..7 = "${tok.fs.join(' ')}"`);
  check(tok.sp.every(v => /^\d+px$/.test(v) && parseInt(v) % 4 === 0), `design: espaçamentos --sp-1..8 fora de múltiplos de 4 ("${tok.sp.join(' ')}")`);
  check(!!tok.l, 'design: falta a cor --l da linha de Linguagens');
  for (const w of [320, 375]) { await page.setViewportSize({ width: w, height: 700 }); await page.waitForTimeout(100);
    const h = await page.evaluate(() => { const r = document.querySelector('header.top').getBoundingClientRect(); return { hh: r.height, left: r.left, width: r.width }; });
    check(h.hh <= 84, `design: cabeçalho em ${w} px com ${Math.round(h.hh)} px de altura (máximo 84)`);
    check(h.left === 0 && h.width === w, `design: cabeçalho em ${w} px não ocupa a largura toda (x=${h.left}, largura ${h.width})`); }
  await page.setViewportSize(VIEWPORTS['375']);
  await page.evaluate(() => openPop('sync')); await page.waitForTimeout(200);
  const f = await page.evaluate(() => { const i = document.querySelector('#gsTok, #spTxt'); const a = document.querySelector('#pop a[href^="https://github.com"]'); const ci = getComputedStyle(i);
    return { r: parseFloat(ci.borderRadius), pad: parseFloat(ci.paddingLeft), font: ci.fontFamily, link: a ? getComputedStyle(a).color : null }; });
  check(f.r >= 8 && f.pad >= 10, `design: campo de texto sem estilo (raio ${f.r}, padding ${f.pad})`);
  check(f.link && f.link !== 'rgb(0, 0, 238)', `design: link com o azul padrão do navegador (${f.link})`);
  await page.evaluate(() => closePop()); await page.click('#tabs button[data-v="provas"]'); await page.waitForTimeout(200);
  const prim = await page.evaluate(() => [...document.querySelectorAll('.excard')].map(c => [c.querySelector('h2').textContent, c.querySelectorAll('.exactions .btn.gold').length]));
  for (const [t, n] of prim) check(n === 1, `design: o cartão "${t}" tem ${n} botões principais (deveria ter 1)`);
  await ctx.close();
  const rm = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block', reducedMotion: 'reduce' });
  const p2 = await rm.newPage(); await p2.goto(URL_); await p2.waitForTimeout(300);
  const moving = await p2.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const cs = getComputedStyle(e); return cs.transitionDuration.split(',').some(d => parseFloat(d) > 0) || (cs.animationName !== 'none' && parseFloat(cs.animationDuration) > 0); }).slice(0, 3).map(e => e.className || e.tagName));
  check(!moving.length, `design: com movimento reduzido ainda há animação (${moving.join(', ')})`);
  await rm.close();
}

/* Leitura do módulo: sumário também no celular, metadados numa linha só e quadros didáticos legíveis nos dois temas. */
const BOX_TYPES = ['conceito', 'exemplo', 'enem', 'pegadinha', 'conexao'];
async function testReading(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    await page.evaluate(() => go('mod', { id: 'F5', tab: 'teoria' })); await page.waitForTimeout(250);
    if (colorScheme === 'light') {
      const t = await page.evaluate(() => ({ h: document.querySelectorAll('#prose h4').length, links: document.querySelectorAll('details.toc-m a').length, vis: !!document.querySelector('details.toc-m') && getComputedStyle(document.querySelector('details.toc-m')).display !== 'none' }));
      check(t.vis && t.links === t.h && t.h > 0, `leitura: sumário no celular com ${t.links} links para ${t.h} seções`);
      for (const id of ['F5', 'H5', 'G3', 'S1']) { await page.evaluate(id => go('mod', { id, tab: 'teoria' }), id); await page.waitForTimeout(150);
        const over = await page.evaluate(() => { const w = innerWidth; return [...document.querySelectorAll('#prose > *')].filter(e => !e.classList.contains('tw')).map(e => Math.round(e.getBoundingClientRect().right)).filter(r => r > w); });
        check(!over.length, `leitura: em ${id} o texto passa da borda direita da tela (${over.slice(0, 3).join(', ')} px > 375)`); }
      await page.evaluate(() => go('mod', { id: 'F5', tab: 'teoria' })); await page.waitForTimeout(150);
      const hint = await page.evaluate(() => { const t = document.querySelector('#prose .tw'); return t && t.scrollWidth > t.clientWidth ? t.classList.contains('scrolls') && getComputedStyle(t, '::before').content.includes('deslize') : 'sem tabela larga'; });
      check(hint === true, `leitura: tabela larga no celular sem o aviso "deslize" (${hint})`);
      const tops = await page.evaluate(() => [...document.querySelectorAll('.mod-head .chip')].map(c => c.offsetTop));
      check(new Set(tops).size === 1, `leitura: metadados do módulo quebram em ${new Set(tops).size} linhas no celular`);
    }
    const r = await page.evaluate(types => {
      const prose = document.querySelector('#prose');
      prose.insertAdjacentHTML('afterbegin', types.map(k => `<div class="box ${k}"><b class="box-t">Título ${k}</b><p>Texto de exemplo do quadro ${k}.</p></div>`).join(''));
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      return types.map(k => { const box = prose.querySelector('.box.' + k), cs = getComputedStyle(box);
        const bg = cs.backgroundColor === 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.body).backgroundColor : cs.backgroundColor;
        return { k, edge: cs.borderLeftColor, padded: parseFloat(cs.paddingLeft) >= 12, title: ratio(getComputedStyle(box.querySelector('.box-t')).color, bg), text: ratio(getComputedStyle(box.querySelector('p')).color, bg) }; });
    }, BOX_TYPES);
    for (const b of r) {
      check(b.padded, `leitura/${colorScheme}: quadro .${b.k} sem estilo`);
      check(b.title >= 4.5 && b.text >= 4.5, `leitura/${colorScheme}: quadro .${b.k} com contraste ${b.title.toFixed(2)} / ${b.text.toFixed(2)}`);
    }
    check(new Set(r.map(b => b.edge)).size === BOX_TYPES.length, `leitura/${colorScheme}: os 5 tipos de quadro não se distinguem pela cor`);
    await ctx.close();
  }
}

/* Tela inicial: contagem, anéis por área, próximo passo em destaque, status do dia 2, ícones desenhados e estatísticas sem esticar. */
async function testHome(browser) {
  for (const vp of ['375', '1280']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[vp], serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(400);
    const h = await page.evaluate(() => ({
      count: (document.querySelector('.hero .countdown') || {}).textContent || '', days: String(daysLeft()),
      rings: [...document.querySelectorAll('.hero .rings [data-area]')].map(r => [r.dataset.area, r.getAttribute('aria-label') || '']),
      next: ((document.querySelector('.hero .next b') || {}).textContent || '').trim(),
      d2: (document.querySelector('.hero .dia2-status') || {}).textContent || '',
      icons: [...document.querySelectorAll('.task .ic')].map(i => i.querySelector('svg') ? 'svg' : i.textContent.trim()),
      statH: Math.max(0, ...[...document.querySelectorAll('.hero .stat')].map(s => s.getBoundingClientRect().height)),
    }));
    check(h.count.includes(h.days), `início/${vp}: contagem regressiva sem os ${h.days} dias ("${h.count.trim().slice(0, 60)}")`);
    check(h.rings.map(r => r[0]).join(',') === 'LC,HUM,RD', `início/${vp}: anéis por área = "${h.rings.map(r => r[0]).join(',')}"`);
    for (const [a, l] of h.rings) check(/\d+%/.test(l), `início/${vp}: anel ${a} sem porcentagem no aria-label ("${l}")`);
    check(h.next.length > 0, `início/${vp}: falta o bloco "Próximo passo"`);
    check(await page.evaluate(() => [...document.querySelectorAll('.hero .stat .l')].some(l => /Linguagens · 2025: 82%/.test(l.textContent))), `início/${vp}: falta a estatística de Linguagens comparada a 2025`);
    check(/72/.test(h.d2), `início/${vp}: falta o status do dia 2 com a meta 72 ("${h.d2.trim().slice(0, 60)}")`);
    const bad = h.icons.filter(i => i !== 'svg' && !/^[A-Z]\d+$/.test(i));
    check(!bad.length, `início/${vp}: ícones de tarefa que não são desenhos (${bad.join(' ')})`);
    if (vp === '1280') check(h.statH <= 200, `início/${vp}: cartão de estatística esticado (${Math.round(h.statH)} px)`);
    if (h.next) { await page.click('.hero .next'); await page.waitForTimeout(200);
      check(await page.evaluate(() => view !== 'linhas' || !!document.querySelector('#pop:not([hidden])')), `início/${vp}: o "Próximo passo" não leva a lugar nenhum`); }
    await ctx.close();
  }
  for (const [day, want] of [['2026-10-23T09:00:00-03:00', false], ['2026-11-01T09:00:00-03:00', true]]) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.clock.setFixedTime(new Date(day)); await page.goto(URL_); await page.waitForTimeout(300);
    const nx = await page.locator('.hero .next b').textContent().catch(() => '');
    check(/Simulado do dia 1/.test(nx) === want, `início: em ${day.slice(0, 10)} o próximo passo ${want ? 'deveria' : 'não deveria'} ser o simulado ("${nx}")`);
    const dots = await page.evaluate(() => [...document.querySelectorAll('.aring')].filter(r => r.querySelectorAll('circle').length > 1 && r.getAttribute('aria-label').includes(' 0%')).length);
    check(!dots, `início: ${dots} anel(is) em 0% desenham um arco (pontinho solto)`);
    await ctx.close();
  }
}

/* Linguagens: cada módulo L cumpre os mínimos da especificação; os 8 erros de 2025 estão ligados; a linha aparece no mapa. */
const L_MIN_MODULES = 14;
function testLinguagensData() {
  if (!DATA_FILES.length) return;
  const D = loadData(), L = D.modules.filter(m => m.line === 'L');
  check(L.length >= L_MIN_MODULES, `linguagens: ${L.length} módulos (mínimo ${L_MIN_MODULES})`);
  const qsL = D.questions.filter(q => q.vol === 'LC'), dist = {};
  for (const q of qsL) dist[q.ans] = (dist[q.ans] || 0) + 1;
  for (const k of 'ABCDE') { const share = (dist[k] || 0) / Math.max(1, qsL.length);
    check(share >= 0.12 && share <= 0.30, `linguagens: gabarito desequilibrado, ${k} em ${Math.round(share * 100)}% das ${qsL.length} questões (${JSON.stringify(dist)})`); }
  for (const m of L) {
    const h4 = (m.html.match(/<h4>/g) || []).length;
    check(m.vol === 'LC', `linguagens ${m.id}: vol "${m.vol}"`);
    check(h4 >= 4 && h4 <= 7, `linguagens ${m.id}: ${h4} seções (de 4 a 7)`);
    check(/class="box enem"/.test(m.html) && /class="box pegadinha"/.test(m.html), `linguagens ${m.id}: falta quadro No Enem ou Pegadinha`);
    check(m.resumo.length >= 6, `linguagens ${m.id}: resumo com ${m.resumo.length} pares (mínimo 6)`);
    check(m.qs.length >= 5, `linguagens ${m.id}: ${m.qs.length} questões (mínimo 5)`);
    check(/H\d+/.test(m.habs || ''), `linguagens ${m.id}: sem habilidades da matriz`);
    check(D.cards.filter(c => c.id.startsWith(m.id + '-c')).length >= 6, `linguagens ${m.id}: menos de 6 cartões`);
    check(D.vf.filter(v => v.mod === m.id).length >= 4, `linguagens ${m.id}: menos de 4 itens de V ou F`);
    for (const id of m.qs) { const q = D.questions.find(x => x.id === id); if (q) check(q.vol === 'LC' && q.mod === m.id, `linguagens ${m.id}: questão ${id} com vol/mod errados`); }
  }
}
async function testLinguagensUI(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const b = document.querySelector('.line.lc-L .line-head .badge'); if (!b) return null; const cs = getComputedStyle(b), x = lum(cs.color), y = lum(cs.backgroundColor);
      return { ratio: (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05), err: Object.values(ERRMOD).join(' ') };
    });
    check(r, `linguagens/${colorScheme}: a linha L não aparece no mapa`);
    if (colorScheme === 'light') { await page.evaluate(() => go('mod', { id: 'L6', tab: 'q' })); await page.waitForTimeout(200);
      const txt = await page.locator('#modbody').textContent();
      check(!/volume \d/.test(txt), 'linguagens: questões de L aparecem como "volume" da apostila de Humanas');
      check(!/são da apostila/.test(txt), 'linguagens: a aba de questões diz que as questões de L vêm da apostila');
      await page.evaluate(() => go('linhas')); await page.waitForTimeout(150); }
    if (r) { check(r.ratio >= 4.5, `linguagens/${colorScheme}: selo da linha L com contraste ${r.ratio.toFixed(2)}`);
      if (colorScheme === 'light') for (const n of [3, 7, 15, 17, 23, 25, 36, 38]) check(new RegExp(`\\b${n}\\b`).test(r.err), `linguagens: erro ${n} de 2025 não está em ERRMOD`); }
    await ctx.close();
  }
}

/* Aprofundamento de Humanas: três seções, 3 questões novas, todas as questões oficiais do tema citadas e tocáveis. */
const DEEP_REQUIRED = [...'1234567'.split('').map(n => 'F' + n), ...'12345'.split('').map(n => 'S' + n), ...Array.from({ length: 10 }, (_, i) => 'H' + (i + 1)), ...Array.from({ length: 9 }, (_, i) => 'G' + (i + 1))];
function testDeepContent() {
  if (!DATA_FILES.length) return;
  const D = loadData(), deep = D.deep || {}, map = D.enemMap || {};
  check(Object.keys(map).length === 2, 'aprofundamento: falta DATA.enemMap (2024 e 2025)');
  const dist = {}; let nq = 0;
  for (const id of DEEP_REQUIRED) {
    const d = deep[id];
    check(d, `aprofundamento ${id}: não existe`); if (!d) continue;
    for (const h of ['Aprofundamento', 'Como o Enem cobra', 'Pegadinhas']) check(new RegExp(`<h4>[^<]*${h}`).test(d.html), `aprofundamento ${id}: falta a seção "${h}"`);
    check((d.questions || []).length >= 3, `aprofundamento ${id}: ${(d.questions || []).length} questões novas (mínimo 3)`);
    for (const q of d.questions || []) { check(q.id.startsWith('D-' + id + '.') && q.mod === id, `aprofundamento ${id}: questão ${q.id} com id/mod errados`); dist[q.ans] = (dist[q.ans] || 0) + 1; nq++; }
    for (const [ex, nums] of Object.entries(map)) for (const [n, mod] of Object.entries(nums)) if (mod === id)
      check(d.html.includes(`data-ex="${ex}" data-n="${n}"`), `aprofundamento ${id}: não cita a questão oficial ${n} de 20${ex.slice(0, 2)}`);
  }
  for (const k of 'ABCDE') { const share = (dist[k] || 0) / Math.max(1, nq); check(share >= 0.1 && share <= 0.32, `aprofundamento: gabarito desequilibrado, ${k} em ${Math.round(share * 100)}% (${JSON.stringify(dist)})`); }
}
async function testDeepUI(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('mod', { id: 'F2', tab: 'teoria' })); await page.waitForTimeout(250);
  const a = page.locator('#prose a[data-ex]').first();
  check(await a.count() === 1, 'aprofundamento: F2 sem citação tocável de questão oficial');
  if (await a.count()) { const ex = await a.getAttribute('data-ex'), n = await a.getAttribute('data-n'); await a.click(); await page.waitForTimeout(300);
    const src = await page.locator('.qview img').getAttribute('src').catch(() => null);
    check(src && src.includes(`provas/${ex}/q${String(n).padStart(3, '0')}`), `aprofundamento: tocar na citação não abriu a imagem oficial (${src})`);
    check(!(await page.locator('.qview').innerText()).includes('Gabarito oficial:'), 'aprofundamento: o gabarito oficial aparece antes de a pessoa pedir');
    await page.locator('.qview summary').click().catch(() => {}); await page.waitForTimeout(100);
    check((await page.locator('.qview').innerText()).includes('Gabarito oficial:'), 'aprofundamento: tocar em "ver o gabarito" não mostra a resposta');
    await page.keyboard.press('Escape'); await page.waitForTimeout(150);
    check(await page.locator('.qview').count() === 0, 'aprofundamento: Esc não fecha a questão oficial'); }
  await ctx.close();
}

/* O simulado de 2024 (1º dia) é o ensaio que libera o dia 2: o aprofundamento não pode entregar as respostas antes dele. */
async function testSpoiler24(browser) {
  const open = async (S, date = '2026-10-23T12:00:00-03:00') => {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
    await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('humanas-de-ouro-v1', s); sessionStorage.setItem('seeded', '1'); } }, JSON.stringify(S));
    const page = await ctx.newPage(); await page.clock.setFixedTime(new Date(date));
    await page.goto(URL_); await page.waitForTimeout(300);
    await page.evaluate(() => go('mod', { id: 'G7', tab: 'teoria' })); await page.waitForTimeout(250);
    const r = await page.evaluate(() => ({ c24: document.querySelectorAll('#prose a[data-ex="24d1"]').length, c25: document.querySelectorAll('#prose a[data-ex="25d1"]').length,
      prose: document.querySelector('#prose').innerText, idx: (IDX = null, buildIndex(), IDX.some(x => x.txt.includes('dinamização dos fluxos'))) }));
    await ctx.close(); return r; };
  const run = extra => ({ v: 1, pv: { '24d1': { runs: [{ id: 'r', areas: 'LH', mode: 'prova', ans: {}, flag: {}, cut: {}, start: 1, limit: 1, done: true, cur: 0, end: 2, time: 1, ...extra }], notes: {} } }, updated: 1 });
  { const r = await open({ v: 1, updated: 1 });
    check(r.c24 === 0, `spoiler: antes do simulado de 1/11, G7 mostra ${r.c24} citações do 1º dia de 2024`);
    check(!r.prose.includes('dinamização dos fluxos'), 'spoiler: a resposta da questão 70 de 2024 aparece no texto de G7');
    check(!r.idx, 'spoiler: a busca indexa a resposta de uma questão de 2024');
    check(r.c25 > 0, 'spoiler: as citações de 2025 sumiram junto');
    check(/simulado/i.test(r.prose), 'spoiler: G7 não avisa que as questões de 2024 aparecem depois do simulado'); }
  for (const [name, S] of [['modo estudo', run({ mode: 'estudo' })], ['não entregue', run({ done: false })]]) {
    const r = await open(S); check(r.c24 === 0, `spoiler: ${name} não deveria revelar as questões de 2024`); }
  { const r = await open(run({})); check(r.c24 > 0 && r.prose.includes('dinamização dos fluxos'), 'spoiler: depois do simulado entregue, as questões de 2024 não voltam'); }
  { const r = await open({ v: 1, updated: 1 }, '2026-11-09T09:00:00-03:00'); check(r.c24 > 0, 'spoiler: com o dia 2 liberado pela data, as questões de 2024 continuam escondidas'); }
}

/* Com a sincronização ligada, a junção com a cópia antiga do Gist não pode desfazer o que a pessoa apagou. */
async function testDeletesSync(browser) {
  const old = { v: 1, pv: { '24d1': { runs: [{ id: 'k1', areas: 'LH', mode: 'prova', ans: { 46: 'A' }, flag: {}, cut: {}, start: Date.now(), limit: 1e9, done: false, cur: 0 }], notes: {} } }, ans: { q1: { first: 'A', ok: true, t: 5 } }, updated: 10 };
  const ctx = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block' });
  await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('humanas-de-ouro-v1', s); sessionStorage.setItem('seeded', '1'); } }, JSON.stringify(old));
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
  await page.click('#tabs button[data-v="provas"]'); await page.waitForTimeout(200);
  const drop = page.locator('[data-drop="24d1"]');
  check(await drop.count() === 1, 'exclusão: o teste não achou "Descartar" na prova em andamento');
  if (await drop.count()) { await drop.click(); await drop.click(); await page.waitForTimeout(150); }
  const runs = await page.evaluate(o => mergeS(S, o).pv['24d1'].runs.length, old);
  check(runs === 0, 'exclusão: a tentativa descartada volta ao juntar com o Gist antigo');
  await page.evaluate(() => go('painel')); await page.waitForTimeout(200);
  await page.click('#reset'); await page.click('#reset'); await page.waitForTimeout(150);
  const after = await page.evaluate(o => { const m = mergeS(S, o); return Object.keys(m.ans || {}).length + ((m.pv || {})['24d1'] ? m.pv['24d1'].runs.length : 0); }, old);
  check(after === 0, 'exclusão: depois de "Zerar progresso", a junção com o Gist antigo traz tudo de volta');
  await ctx.close();
}

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
try {
  testData();
  testIntegrity();
  testPlan();
  testLinguagensData();
  testDeepContent();
  await testDeep(browser);
  await testOfflineShell(browser);
  await testDia1(browser);
  await testGistSync(browser);
  await testDeletesSync(browser);
  await testDesign(browser);
  await testReading(browser);
  await testHome(browser);
  await testLinguagensUI(browser);
  await testDeepUI(browser);
  await testSpoiler24(browser);
  await testNav(browser);
  await testTabs(browser);
  await testAnswered(browser);
  await testOfflineConsent(browser);
} finally { await browser.close(); server.close(); }

if (fails.length) { console.error(`FALHOU (${fails.length}):\n- ` + fails.join('\n- ')); process.exit(1); }
console.log('OK: dados, navegação, 8 abas × 3 tamanhos × 2 temas e download offline.');
