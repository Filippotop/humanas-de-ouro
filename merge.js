/* Humanas de Ouro: junção de progresso entre aparelhos.
   mergeS(a, b) devolve um progresso novo com o trabalho dos dois lados, sem alterar a nem b.
   Regras (especificação v10, seção 6):
   - ans: primeira tentativa (menor t); vf, recal, redo: mais recente (maior t)
   - read, best, act: maior valor; cards: maior due, empate maior box
   - sims: união por t; pv[ex].runs: união por id (entregue vence; senão mais respostas)
   - red.drafts: união por id (concluída vence; senão maior secs)
   - demais mapas: união de chaves; no conflito vence o lado com updated maior */
function mergeS(a, b) {
  const clone = x => x == null ? x : JSON.parse(JSON.stringify(x));
  a = clone(a) || {}; b = clone(b) || {};
  const bNewer = (b.updated || 0) > (a.updated || 0);
  const obj = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
  const byKey = (x, y, pick) => { x = obj(x); y = obj(y); const out = {};
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) out[k] = !(k in x) ? y[k] : !(k in y) ? x[k] : pick(x[k], y[k]);
    return out; };
  const byNewer = (x, y) => byKey(x, y, (p, q) => bNewer ? q : p);
  const byT = earliest => (x, y) => byKey(x, y, (p, q) => ((q && q.t) || 0) === ((p && p.t) || 0) ? (bNewer ? q : p) : (((q && q.t) || 0) < ((p && p.t) || 0)) === earliest ? q : p);
  const byMax = (x, y) => byKey(x, y, (p, q) => Math.max(+p || 0, +q || 0));
  const unionBy = (x, y, id, pick) => { const m = new Map();
    for (const it of [...(Array.isArray(x) ? x : []), ...(Array.isArray(y) ? y : [])]) { const k = it && it[id]; if (k == null) continue; m.set(k, m.has(k) ? pick(m.get(k), it) : it); }
    return [...m.values()]; };
  const nAns = r => Object.keys((r && r.ans) || {}).length;
  const pickRun = (p, q) => p.done !== q.done ? (q.done ? q : p) : (nAns(q) > nAns(p) ? q : p);
  const pickDraft = (p, q) => !!p.done !== !!q.done ? (q.done ? q : p) : ((q.secs || 0) > (p.secs || 0) ? q : p);

  const out = Object.assign({}, bNewer ? a : b, bNewer ? b : a);
  out.v = 1;
  out.ans = byT(true)(a.ans, b.ans);
  for (const k of ['vf', 'recal', 'redo']) out[k] = byT(false)(a[k], b[k]);
  for (const k of ['read', 'best', 'act']) out[k] = byMax(a[k], b[k]);
  out.cards = byKey(a.cards, b.cards, (p, q) => (q.due || '') !== (p.due || '') ? ((q.due || '') > (p.due || '') ? q : p) : ((q.box || 0) > (p.box || 0) ? q : p));
  for (const k of ['marks', 'chute', 'rep', 'plan', 'notes', 'snotes']) out[k] = byNewer(a[k], b[k]);
  out.sims = unionBy(a.sims, b.sims, 't', (p, q) => bNewer ? q : p);
  out.pv = byKey(a.pv, b.pv, (p, q) => ({ ...(bNewer ? { ...p, ...q } : { ...q, ...p }), runs: unionBy(p.runs, q.runs, 'id', pickRun), notes: byNewer(p.notes, q.notes) }));
  if (a.red || b.red) { const ra = obj(a.red), rb = obj(b.red);
    out.red = { ...(bNewer ? { ...ra, ...rb } : { ...rb, ...ra }), drafts: unionBy(ra.drafts, rb.drafts, 'id', pickDraft), plans: byNewer(ra.plans, rb.plans), check: byNewer(ra.check, rb.check) }; }
  out.dia2 = a.dia2 || b.dia2 ? ((a.dia2 && b.dia2) ? ((a.dia2.t || 0) <= (b.dia2.t || 0) ? a.dia2 : b.dia2) : (a.dia2 || b.dia2)) : undefined;
  if (out.dia2 === undefined) delete out.dia2;
  out.updated = Math.max(a.updated || 0, b.updated || 0);
  return out;
}
