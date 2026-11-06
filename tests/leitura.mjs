/* Humanas de Ouro: modos de leitura (normal, destaques, foco, essencial) na aba Teoria.
   Rodar: node tests/leitura.mjs [pasta-para-capturas]   (usa o Chromium do Playwright) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHOTS = process.argv[2];
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.css': 'text/css' };
const axeSrc = fs.readFileSync(path.join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const srv = http.createServer((q, r) => {
  const f = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  const g = fs.existsSync(f) && fs.statSync(f).isDirectory() ? path.join(f, 'index.html') : f;
  if (!fs.existsSync(g)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': TYPES[path.extname(g)] || 'application/octet-stream' });
  fs.createReadStream(g).pipe(r);
});
await new Promise(o => srv.listen(0, '127.0.0.1', o));
const url = `http://127.0.0.1:${srv.address().port}/index.html`;

const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, colorScheme: theme });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(url);
  await page.evaluate(() => { localStorage.clear(); });
  await page.reload();
  await page.waitForFunction(() => typeof go === 'function');
  await page.evaluate(() => go('mod', { id: 'H1', tab: 'teoria' }));
  await page.waitForSelector('#prose .readmode');

  const state = () => page.evaluate(() => {
    const s = document.querySelector('#prose p strong, #prose li strong');
    const p = s.closest('p,li');
    const cs = getComputedStyle(s), ps = getComputedStyle(p);
    const ess = document.querySelector('#prose .ess');
    return {
      read: document.documentElement.dataset.read,
      bg: cs.backgroundImage, underline: cs.textDecorationLine,
      pColor: ps.color, sColor: cs.color,
      pDisplay: ps.display, essDisplay: ess ? getComputedStyle(ess).display : null,
      essCount: document.querySelectorAll('#prose .ess li').length,
      pressed: [...document.querySelectorAll('.readmode button')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.v),
    };
  });

  const d = await state();
  check(d.read === 'hl', `${theme}: padrão deveria ser "hl" e é ${d.read}`);
  check(d.bg !== 'none' && d.underline.includes('underline'), `${theme}: destaques sem marca-texto e sublinhado`);
  check(d.pressed.join() === 'hl', `${theme}: botão do modo atual não está marcado`);
  check(d.essDisplay === 'none', `${theme}: lista essencial visível fora do modo essencial`);

  for (const mode of ['plain', 'focus', 'essential', 'hl']) {
    await page.click(`.readmode [data-v="${mode}"]`);
    const s = await state();
    check(s.read === mode && s.pressed.join() === mode, `${theme}/${mode}: modo não aplicado`);
    if (mode === 'plain') check(s.bg === 'none', `${theme}/plain: ainda destaca`);
    if (mode === 'focus') check(s.pColor !== s.sColor, `${theme}/focus: texto comum não ficou apagado em relação ao termo-chave`);
    if (mode === 'essential') {
      check(s.pDisplay === 'none', `${theme}/essential: parágrafos continuam visíveis`);
      check(s.essDisplay !== 'none' && s.essCount > 5, `${theme}/essential: lista de termos-chave vazia (${s.essCount})`);
    }
    const res = await page.evaluate(async src => { (0, eval)(src); return (await axe.run('#prose', { runOnly: ['wcag2a', 'wcag2aa'] })).violations.map(v => v.id + ' x' + v.nodes.length); }, axeSrc);
    check(res.length === 0, `${theme}/${mode}: axe ${res.join(', ')}`);
    if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, `${theme}-${mode}.png`) }); }
  }

  // trocar pelo painel Aa também atualiza os botões da página
  await page.click('#prefsBtn');
  await page.click('#pop [data-v="essential"]');
  check((await page.evaluate(() => [...document.querySelectorAll('.readmode button')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.v).join())) === 'essential', `${theme}: botões da página não acompanham o painel Aa`);
  await page.keyboard.press('Escape');

  // a escolha persiste ao recarregar
  await page.click('.readmode [data-v="focus"]');
  await page.reload();
  await page.waitForFunction(() => typeof go === 'function');
  check((await page.evaluate(() => document.documentElement.dataset.read)) === 'focus', `${theme}: modo não persistiu`);
  check(errs.length === 0, `${theme}: erros de página: ${errs.join(' | ')}`);
  await page.close();
}
await browser.close();
srv.close();

if (fails.length) { console.error('FALHOU:\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('leitura OK: destaques, foco e essencial em tema claro e escuro, acessibilidade e persistência.');
