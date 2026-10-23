/* Humanas de Ouro: o service worker nunca responde pedidos à API do GitHub com cache. Rodar: node tests/sw.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const handlers = {};
const self = { addEventListener: (t, f) => { handlers[t] = f; }, location: { origin: 'https://filippotop.github.io' }, clients: { claim() {}, matchAll: async () => [] }, skipWaiting() {} };
const ctx = vm.createContext({ self, location: self.location, URL, caches: { match: async () => null, open: async () => ({ put() {}, match: async () => null, keys: async () => [] }), keys: async () => [] }, fetch: async () => ({ ok: true, clone() { return this; } }), Promise });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx, { filename: 'sw.js' });

const fails = [];
const fire = url => { let responded = false; handlers.fetch({ request: { method: 'GET', url, mode: 'cors' }, respondWith() { responded = true; } }); return responded; };
for (const url of ['https://api.github.com/gists?per_page=100', 'https://api.github.com/gists/abc123'])
  if (fire(url)) fails.push(`o service worker interceptou ${url}: a sincronização leria dados velhos do cache`);
if (!fire('https://fonts.googleapis.com/css2?family=X')) fails.push('o service worker deixou de cuidar das fontes (teste de sanidade)');
if (fails.length) { console.error('sw: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('sw: API do GitHub fora do cache');
