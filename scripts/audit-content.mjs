#!/usr/bin/env node
/**
 * Audit déterministe du contenu blog.
 * Vérifie pour chaque article : images présentes/générables, hreflang (translationKey + pendant),
 * liens internes (blog cassés/redirigés), frontmatter & SEO de base.
 * Usage: node scripts/audit-content.mjs   (depuis la racine tf-website)
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = path.resolve('.');
const CONTENT = path.join(ROOT, 'content', 'blog');
const IMAGES = path.join(ROOT, 'public', 'images', 'blog');
const NEXT_APP = path.join(ROOT, '.next', 'server', 'app');

// --- known routes (best effort, depuis le dernier build) ---
const knownRoutes = new Set();
function walkRoutes(dir, base = '') {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walkRoutes(path.join(dir, e.name), base + '/' + e.name);
    else if (e.name.endsWith('.html')) {
      const r = (base + '/' + e.name.replace(/\.html$/, '')).replace(/\/index$/, '');
      knownRoutes.add(r);
    }
  }
}
walkRoutes(NEXT_APP);

// --- gather articles ---
const articles = [];
for (const silo of fs.readdirSync(CONTENT)) {
  const sp = path.join(CONTENT, silo);
  if (!fs.statSync(sp).isDirectory()) continue;
  for (const f of fs.readdirSync(sp)) {
    if (!f.endsWith('.mdx')) continue;
    const raw = fs.readFileSync(path.join(sp, f), 'utf-8');
    const { data, content } = matter(raw);
    articles.push({
      rel: `content/blog/${silo}/${f}`, silo, slug: data.slug,
      locale: data.locale || 'fr', translationKey: data.translationKey || null,
      type: data.type, title: data.title || '', meta: data.meta_description || '',
      images: data.images || [], content,
    });
  }
}
const byKeyLocale = new Map();
const bySiloSlugLocale = new Map();
for (const a of articles) {
  if (a.translationKey) byKeyLocale.set(`${a.translationKey}|${a.locale}`, a);
  bySiloSlugLocale.set(`${a.silo}/${a.slug}|${a.locale}`, a);
}

// --- audit ---
const rows = [];
for (const a of articles) {
  const issues = [];
  // images
  for (const img of a.images) {
    const p = path.join(IMAGES, a.slug, img.filename);
    const exists = fs.existsSync(p);
    if (!exists) issues.push(['🔴 IMG', `manquante: ${a.slug}/${img.filename} (id "${img.id}")`]);
    if (!img.model || !img.prompt) issues.push(['🟠 IMG', `non générable (model/prompt absent): ${img.filename}`]);
  }
  // hreflang
  if (!a.translationKey) issues.push(['🟠 HREF', 'translationKey absent → pas de hreflang']);
  else {
    const other = a.locale === 'fr' ? 'en' : 'fr';
    if (!byKeyLocale.get(`${a.translationKey}|${other}`)) issues.push(['🟡 HREF', `pas de pendant ${other.toUpperCase()} (translationKey "${a.translationKey}")`]);
  }
  // frontmatter / seo
  if (!a.title) issues.push(['🔴 FM', 'title absent']);
  else if (a.title.length > 60) issues.push(['🟡 SEO', `title ${a.title.length} car (>60)`]);
  if (!a.meta) issues.push(['🟠 FM', 'meta_description absente']);
  else if (a.meta.length > 160) issues.push(['🟡 SEO', `meta ${a.meta.length} car (>160)`]);
  if (!a.slug) issues.push(['🔴 FM', 'slug absent']);
  // internal links
  const hrefs = [
    ...[...a.content.matchAll(/\]\((\/(?:fr|en)\/[^)\s]+)\)/g)].map((m) => m[1]),
    ...[...a.content.matchAll(/<InternalLink\s+href="(\/[^"]+)"/g)].map((m) => m[1]),
  ];
  for (const href of hrefs) {
    const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '');
    const blog = clean.match(/^\/(fr|en)\/blog\/([^/]+)\/([^/]+)$/);
    if (blog) {
      if (!bySiloSlugLocale.get(`${blog[2]}/${blog[3]}|${blog[1]}`)) issues.push(['🔴 LINK', `lien blog cassé/redirige: ${href}`]);
    } else if (/^\/(fr|en)\//.test(clean)) {
      if (knownRoutes.size && !knownRoutes.has(clean)) issues.push(['🟡 LINK', `route à vérifier: ${href}`]);
    }
  }
  // currency by locale (EN = $, FR = €)
  if (a.locale === 'en' && /€/.test(a.content)) issues.push(['🟠 CURR', 'symbole € dans un article EN (doit être $)']);
  if (a.locale === 'fr' && /\$\s?\d/.test(a.content)) issues.push(['🟠 CURR', 'symbole $ (prix) dans un article FR (doit être €)']);
  rows.push({ a, issues });
}

// --- report ---
console.log(`\n=== AUDIT CONTENU BLOG — ${articles.length} articles (${articles.filter(x=>x.locale==='fr').length} FR / ${articles.filter(x=>x.locale==='en').length} EN) ===`);
console.log(`routes connues (build): ${knownRoutes.size || 'build absent → liens non-blog non vérifiés'}\n`);
let totalIssues = 0;
for (const { a, issues } of rows.sort((x,y)=>y.issues.length-x.issues.length)) {
  if (!issues.length) continue;
  totalIssues += issues.length;
  console.log(`📄 [${a.locale.toUpperCase()}] ${a.silo}/${a.slug}  (${a.type||'?'})`);
  for (const [tag, msg] of issues) console.log(`     ${tag}  ${msg}`);
}
const clean = rows.filter(r=>!r.issues.length).map(r=>`${r.a.locale.toUpperCase()} ${r.a.slug}`);
console.log(`\n✅ Sans problème (${clean.length}): ${clean.join(', ') || '—'}`);
// counts by tag
const counts = {};
for (const { issues } of rows) for (const [tag] of issues) counts[tag] = (counts[tag]||0)+1;
console.log(`\n=== TOTAUX (${totalIssues} problèmes) ===`);
for (const [tag,n] of Object.entries(counts).sort((a,b)=>b[1]-a[1])) console.log(`  ${tag}: ${n}`);
