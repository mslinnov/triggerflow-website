#!/usr/bin/env node
// One-shot : retire le `# Titre` H1 en tête de corps des MDX blog (le template du site
// affiche déjà le titre en <h1> → sinon double-H1 = défaut SEO). Idempotent.
import fs from 'fs';
import path from 'path';

const dir = path.resolve('content/blog');
let n = 0;
for (const silo of fs.readdirSync(dir)) {
  const sp = path.join(dir, silo);
  if (!fs.statSync(sp).isDirectory()) continue;
  for (const f of fs.readdirSync(sp)) {
    if (!f.endsWith('.mdx')) continue;
    const fp = path.join(sp, f);
    const c = fs.readFileSync(fp, 'utf8');
    const m = c.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
    if (!m) continue;
    const body = m[2].replace(/^\s*#\s+[^\n]+\n+/, ''); // retire UNIQUEMENT un H1 (`# `, pas `## `) en tête
    if (body !== m[2]) { fs.writeFileSync(fp, m[1] + body); n++; console.log('  ✂︎ H1 retiré :', `${silo}/${f}`); }
  }
}
console.log(`${n} fichier(s) nettoyé(s).`);
