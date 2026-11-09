/* Renderiza as fórmulas (LaTeX) como imagens SVG com MathJax, sem JavaScript no celular.
   Entrada : tools/formulas.json  { "F001": { "tex": "...", "lido": "...", "original": "..." }, ... }
   Saída   : fm/<hash>.svg  (um por fórmula; o nome vem do hash do LaTeX) e tools/formulas_index.json (id -> arquivo, largura, altura)
   Uso     : node tools/formulas_render.mjs   (precisa de: npm install) */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import opentype from 'opentype.js';

const AQUI = path.dirname(fileURLToPath(import.meta.url)), RAIZ = path.resolve(AQUI, '..');
const adaptor = liteAdaptor(); RegisterHTMLHandler(adaptor);
// largura real (da fonte usada nos contornos) das letras que o MathJax não tem, em vez do chute padrão de 0,6 em
adaptor.nodeSize = (node, em = 1) => {
  const t = adaptor.textContent(node); let w = 0;
  for (const ch of t) { const g = FONTE.charToGlyph(ch); w += (g.advanceWidth || 0) / FONTE.unitsPerEm; }
  return [w * em / 1000, 0.8 * em / 1000];
};
const doc = mathjax.document('', { InputJax: new TeX({ packages: AllPackages.filter(p => p !== 'noerrors' && p !== 'noundefined') }), OutputJax: new SVG({ fontCache: 'none' }) });
const INK = '#14161f';  // tinta escura; no tema escuro o CSS inverte (filter: invert) e vira um branco suave

// Letras acentuadas (ã, é, ç...) o MathJax não tem na fonte TeX e as emite como <text font-family=serif>, que depende da fonte do aparelho
// e desalinha. Aqui viram contornos (<path>) da STIX Two Text (OFL), para a imagem ficar autossuficiente.
const FONTE_BUF = fs.readFileSync(path.join(RAIZ, 'node_modules/@fontsource/stix-two-text/files/stix-two-text-latin-400-normal.woff'));
const FONTE = opentype.parse(FONTE_BUF.buffer.slice(FONTE_BUF.byteOffset, FONTE_BUF.byteOffset + FONTE_BUF.byteLength), {});
function textoParaCaminho(svg) {
  return svg.replace(/<text data-variant="normal" (transform="[^"]*") font-size="(\d+)px" font-family="serif">([^<]+)<\/text>/g, (_, tr, fs_, ch) => {
    const d = FONTE.getPath(ch, 0, 0, +fs_).toPathData(1);
    if (!d) throw new Error('glifo ausente na fonte: ' + ch);
    return `<path ${tr} d="${d}"/>`;
  });
}

export function render(tex) {
  const node = doc.convert(tex, { display: true });
  let svg = adaptor.innerHTML(node);
  if (/data-mjx-error|merror/.test(svg)) throw new Error('MathJax não aceitou: ' + tex);
  svg = textoParaCaminho(svg);
  const w = +/width="([\d.]+)ex"/.exec(svg)[1], h = +/height="([\d.]+)ex"/.exec(svg)[1];
  svg = svg.replace(/currentColor/g, INK).replace(/ style="[^"]*"/, '').replace(/ role="img"| focusable="false"| aria-hidden="true"/g, '');
  return { svg, w, h };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const F = JSON.parse(fs.readFileSync(path.join(AQUI, 'formulas.json'), 'utf8'));
  const out = path.join(RAIZ, 'fm'); fs.mkdirSync(out, { recursive: true });
  const idx = {}, usados = new Set(); let erros = 0;
  for (const [id, f] of Object.entries(F)) {
    if (!f.tex) continue;
    try {
      const { svg, w, h } = render(f.tex);
      const nome = crypto.createHash('sha1').update(f.tex).digest('hex').slice(0, 10) + '.svg';
      fs.writeFileSync(path.join(out, nome), svg); usados.add(nome);
      idx[id] = { f: nome, w, h };
    } catch (e) { erros++; console.error(id, e.message); }
  }
  for (const f of fs.readdirSync(out)) if (f.endsWith('.svg') && !usados.has(f)) fs.unlinkSync(path.join(out, f));  // limpa o que saiu de uso
  fs.writeFileSync(path.join(AQUI, 'formulas_index.json'), JSON.stringify(idx, null, 1));
  // pré-carrega as imagens no service worker (funcionam sem internet): mantém a linha `const FMS=[...]` do sw.js
  const swp = path.join(RAIZ, 'sw.js'); let sw = fs.readFileSync(swp, 'utf8');
  const lista = 'const FMS=' + JSON.stringify([...usados].sort().map(n => 'fm/' + n)) + ';';
  sw = /^const FMS=.*;$/m.test(sw) ? sw.replace(/^const FMS=.*;$/m, () => lista) : sw.replace(/^(const FIGS=.*)$/m, (m) => m + '\r\n' + lista);
  sw = sw.replace('c.addAll(SHELL_FILES.concat(FIGS))', 'c.addAll(SHELL_FILES.concat(FIGS, FMS))');
  fs.writeFileSync(swp, sw);
  console.log(`${usados.size} imagens em fm/, ${erros} erros`);
  if (erros) process.exit(1);
}
