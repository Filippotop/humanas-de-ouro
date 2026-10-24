/* Humanas de Ouro: o service worker nunca responde pedidos à API do GitHub com cache. Rodar: node tests/sw.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const handlers = {};
const self = { addEventListener: (t, f) => { handlers[t] = f; }, location: { origin: 'https://filippotop.github.io' }, clients: { claim() {}, matchAll: async () => [] }, skipWaiting() {} };
const puts = []; let fetchImpl = async () => ({ ok: true, clone() { return this; } });
const ctx = vm.createContext({ self, location: self.location, URL, caches: { match: async () => null, open: async () => ({ put(k) { puts.push(k); }, match: async () => null, keys: async () => [] }), keys: async () => [] }, fetch: (...a) => fetchImpl(...a), Promise });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx, { filename: 'sw.js' });

const fails = [];
const fire = url => { let responded = false; handlers.fetch({ request: { method: 'GET', url, mode: 'cors' }, respondWith() { responded = true; } }); return responded; };
for (const url of ['https://api.github.com/gists?per_page=100', 'https://api.github.com/gists/abc123'])
  if (fire(url)) fails.push(`o service worker interceptou ${url}: a sincronização leria dados velhos do cache`);
if (!fire('https://fonts.googleapis.com/css2?family=X')) fails.push('o service worker deixou de cuidar das fontes (teste de sanidade)');
/* navegação que volta 404 (ex.: /bancada/ removida) não pode virar o index.html offline; navegação ok continua sendo guardada */
const navigate = async resp => {
  fetchImpl = async () => resp; puts.length = 0; let p;
  handlers.fetch({ request: { method: 'GET', url: 'https://filippotop.github.io/humanas-de-ouro/bancada/', mode: 'navigate' }, respondWith(x) { p = x; } });
  await p; await new Promise(r => setTimeout(r, 0)); return puts.includes('index.html');
};
if (await navigate({ ok: false, status: 404, clone() { return this; } })) fails.push('o service worker guardou uma resposta 404 como index.html offline');
if (!(await navigate({ ok: true, status: 200, clone() { return this; } }))) fails.push('o service worker deixou de guardar o index.html de uma navegação bem-sucedida (teste de sanidade)');
if (fails.length) { console.error('sw: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('sw: API do GitHub fora do cache');
