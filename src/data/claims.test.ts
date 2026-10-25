import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { brand } from './brand';
import { companyStats } from './company-stats';
import { modules } from './modules';
import { solutions } from './solutions';

/**
 * Les moteurs IA reprennent les chiffres du site comme des faits sur TriggerFlow : un chiffre
 * de résultat publié doit être mesuré (company-stats.ts, avec sa source) ou ne pas exister.
 * Hors périmètre volontaire (décision du 25/10/2026) : les témoignages et les maquettes
 * d'interface, traités à part.
 */

const root = join(__dirname, '..', '..');

/** Valeurs mesurées publiables, plus les pourcentages qui ne sont pas des résultats. */
const allowedPercents = new Set([
  ...Object.values(companyStats).flatMap((s) => [s.fr, s.en]),
  '0 %',
  '0%',
  // Valeur exacte de l'étude ventes additionnelles (upsell-services.ts), arrondie à 5 % dans les stats.
  '5,15 %',
  '5.15%',
]);

/** Chiffre de résultat : pourcentage, multiplicateur ou note. */
const RESULT = /[+-]?\d+(?:[.,]\d+)?\s?%|\b\d+(?:[.,]\d+)?\s?x\b|\b\d[.,]\d\s?\/\s?5\b|\d+(?:[.,]\d+)?\s?\/\s?10\b/gi;

/**
 * Pourcentages qui ne sont pas des résultats TriggerFlow : qualité « 100 % personnalisable »,
 * commissions OTA, remises d'un exemple d'offre, frais d'un prestataire de paiement, seuil de note.
 */
function isNotAResult(text: string, index: number, match: string): boolean {
  const before = text.slice(Math.max(0, index - 25), index);
  const after = text.slice(index + match.length, index + match.length + 30);
  if (/^100\s?%$/.test(match.trim()) && /^\s*(personnalis|visuel|français|à votre image|à l'image|conforme|administrable|customi|visual|French|on-brand)/i.test(after)) return true;
  if (/^\s*(de )?commission/i.test(after)) return true;
  if (match.trim().startsWith('-') && (/offre|remise|offer|discount/i.test(before) || /^\s*(sur|on|newsletter|pour les|for |aujourd|today)/i.test(after))) return true;
  if (/Stripe|frais|fees/i.test(before)) return true;
  if (/[≤<>≥]\s*$/.test(before)) return true;
  return false;
}

function results(text: string): string[] {
  return [...text.matchAll(RESULT)]
    .filter((m) => !isNotAResult(text, m.index ?? 0, m[0]))
    .map((m) => m[0].trim())
    .filter((m) => !allowedPercents.has(m));
}

/** Toutes les chaînes d'un objet, sauf les clés exclues (témoignages). */
function strings(value: unknown, skip: Set<string>, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, skip, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => (skip.has(k) ? [] : strings(v, skip, path ? `${path}.${k}` : k)));
  }
  return [];
}

function offenders(entries: Array<[string, string]>): string[] {
  return entries.flatMap(([path, text]) => results(text).map((r) => `${path}: « ${r} » dans « ${text.slice(0, 90)} »`));
}

test('chaque chiffre officiel a une source (date de mesure, méthode)', () => {
  for (const [id, s] of Object.entries(companyStats)) {
    assert.ok(s.source && s.source.length > 20, `companyStats.${id} sans source`);
  }
});

test('pages produit et solutions : aucun chiffre de résultat non mesuré hors témoignages', () => {
  const skip = new Set(['testimonial', 'icon', 'mockup', 'image', 'heroImage']);
  // Les stats sont rendues « value + suffix » : on les recolle pour juger le chiffre affiché.
  const glue = (data: Record<string, { stats?: Array<{ value: string; suffix?: string }> }>) =>
    Object.entries(data).flatMap(([slug, d]) =>
      (d.stats ?? []).map((s, i) => [`${slug}.stats[${i}]`, `${s.value}${s.suffix === '%' ? ' %' : s.suffix ?? ''}`] as [string, string]),
    );
  const found = [
    ...offenders(strings(modules, skip, 'modules')),
    ...offenders(strings(solutions, skip, 'solutions')),
    ...offenders(glue(modules)),
    ...offenders(glue(solutions)),
  ];
  assert.deepEqual(found, []);
});

test('messages FR/EN : aucun chiffre de résultat non mesuré hors témoignages et études publiées', () => {
  // lpUpsell et lpPostStay publient des études mesurées (upsell-services.ts, post-stay.ts).
  // heroDashboard : valeurs d'exemple de la maquette du tableau de bord (maquettes hors périmètre).
  const skip = new Set(['testimonialFeatured', 'testimonialsCarousel', 'testimonial', 'heroDashboard', 'lpUpsell', 'lpPostStay', 'pricing', 'priceChange']);
  for (const locale of ['fr', 'en']) {
    const messages = JSON.parse(readFileSync(join(root, 'messages', `${locale}.json`), 'utf8'));
    assert.deepEqual(offenders(strings(messages, skip, locale)), []);
  }
});

function files(dir: string, ext: RegExp): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p, ext) : ext.test(f) ? [p] : [];
  });
}

const BANNED = [
  /9[,.]4\s?\/\s?10/,
  /4[,.][89]\s?\/\s?5/,
  /150\+ (avis|reviews)/,
  /98 ?% de satisfaction/i,
  /(plus de|more than|\+) ?50 (PMS|systèmes|systems|intégrations|integrations)/i,
  /50\+ (other |hotel |outils |native )?(PMS|systems|integrations|connecteurs|connectors|tools|hôteliers)/i,
  /8[.,]2 ?→ ?9[.,]1/,
  /\+35 ?% de taux d'ouverture|23 ?% de conversion|avis\/mois en moyenne|0 réclamation client/i,
  /\d+ ?h(eures)? (gagnées|économisées|récupérées|par semaine)/i,
  /\d+ ?h(ours)? (saved|per week|a week)/i,
  /délivrabilité de 98|98 ?% de délivrabilité|98 ?% deliverability/i,
  /(lus|read) à 98|98 ?% (of the time|de taux de lecture|read|des clients|de taux d'ouverture)/i,
  /85 ?% (payés|paid|des acomptes)/i,
  /statId="(googleReviews|avgBasket|hoursSaved|onlineCheckin|countries)"/,
  /<Stat id="(googleReviews|avgBasket|hoursSaved|onlineCheckin|countries)"/,
  // Connexions sans connecteur dans l'app (25/10/2026).
  /Mollie|Payline|PayPal|Trustpilot|'Salto'/,
  // Connecteur suspendu : domaine de l'API ne pointant plus vers l'éditeur (25/10/2026).
  /Hotello/i,
];

test('messages FR/EN : affirmations retirées absentes hors témoignages', () => {
  const skip = new Set(['testimonialFeatured', 'testimonialsCarousel', 'testimonial']);
  for (const locale of ['fr', 'en']) {
    const messages = JSON.parse(readFileSync(join(root, 'messages', `${locale}.json`), 'utf8'));
    const found = strings(messages, skip, locale).flatMap(([path, text]) =>
      BANNED.filter((re) => re.test(text)).map((re) => `${path} ${re}`),
    );
    assert.deepEqual(found, []);
  }
});

test('affirmations retirées absentes du code, du blog et des LP', () => {
  // modules.ts et solutions.ts sont jugés champ par champ plus haut ; témoignages hors périmètre ;
  // ThaisUseCases n'est rendu par aucune page ; ThaisV3Hero ne garde qu'un badge flottant de
  // maquette (« 4h gagnées cette semaine »), maquettes inchangées par décision du 25/10/2026.
  const excluded = /Testimonial|case-studies|ThaisUseCases|ThaisV3Hero|data\/(modules|solutions)\.ts$|\.test\.ts$/;
  const scanned = [
    ...files(join(root, 'content'), /\.mdx$/),
    ...files(join(root, 'src', 'data'), /\.(ts|json)$/),
    ...files(join(root, 'src', 'components', 'landing'), /\.tsx$/),
    ...files(join(root, 'src', 'components', 'sections'), /\.tsx$/),
    ...files(join(root, 'src', 'app'), /\.tsx?$/),
    join(root, 'src', 'lib', 'llms.ts'),
    join(root, 'content', 'formation-salon', 'index.html'),
  ].filter((f) => !excluded.test(f));
  const found: string[] = [];
  for (const file of scanned) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const re of BANNED) if (re.test(line)) found.push(`${file.slice(root.length + 1)}:${i + 1} ${re}`);
      });
  }
  assert.deepEqual(found, []);
});

test('connexions : nombre de PMS tiré de brand.ts, toujours présenté avec Zapier et n8n', () => {
  // Une mention « N PMS » (ou « et N autres PMS » après 4 noms) se lit avec le reste des
  // connexions : chaque chaîne qui la porte cite aussi Zapier et n8n.
  const messageTexts = ['fr', 'en'].flatMap((locale) =>
    strings(JSON.parse(readFileSync(join(root, 'messages', `${locale}.json`), 'utf8')), new Set(), locale).map(([, t]) => t),
  );
  const codeTexts = files(join(root, 'src'), /\.(ts|tsx)$/)
    .filter((f) => !/\.test\.ts$/.test(f))
    .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/value: '(\d+)',\s*(?:suffix: '', )?label: '([^']*PMS[^']*)'/g)].map((m) => `${m[1]} ${m[2]}`));
  const found: string[] = [];
  for (const text of [...messageTexts, ...codeTexts]) {
    for (const m of text.matchAll(/\b(\d+) (autres |more )?PMS\b/g)) {
      const shown = Number(m[1]) + (m[2] ? 4 : 0);
      if (shown !== brand.pms.length || !/Zapier/.test(text) || !/n8n/.test(text)) found.push(text.slice(0, 120));
    }
  }
  assert.ok(messageTexts.join('\n').match(/\b\d+ PMS\b/g)!.length > 5, 'nombre de PMS introuvable');
  assert.deepEqual(found, []);
});

test('connexions sans connecteur dans l\'app : absentes ; PMS en cours seulement depuis brand.ts', () => {
  const page = readFileSync(join(root, 'src', 'app', '[locale]', '(main)', 'integrations', 'IntegrationsContent.tsx'), 'utf8');
  const keys = [...page.matchAll(/key: '([a-z0-9]+)', logo/g)].map((m) => m[1]);
  for (const missing of ['salto', 'printer', 'mollie', 'paypal', 'trustpilot', 'hotelscom']) {
    assert.ok(!keys.includes(missing), `${missing} affiché sans connecteur`);
  }
  assert.ok(brand.pmsEnCours.every((p) => !(brand.pms as readonly string[]).includes(p)), 'un PMS en cours compté comme connecté');
  const showcase = readFileSync(join(root, 'src', 'components', 'sections', 'IntegrationsShowcase.tsx'), 'utf8');
  // Chaque PMS en cours est marqué « bientôt disponible » là où il s'affiche.
  const comingSoonCards = page.match(/comingSoon: true/g) ?? [];
  assert.equal(comingSoonCards.length, brand.pmsEnCours.length, 'chaque PMS en cours a sa carte « bientôt disponible »');
  for (const name of brand.pmsEnCours) assert.match(showcase, new RegExp(`name: '${name}'[^\n]*comingSoon: true`));
  const all = ['fr', 'en'].map((l) => readFileSync(join(root, 'messages', `${l}.json`), 'utf8')).join('\n') + page;
  assert.doesNotMatch(all, /Chloë/);
});

test('logos des intégrations : fichier présent, SVG sans script ni gestionnaire d\'événement', () => {
  const page = readFileSync(join(root, 'src', 'app', '[locale]', '(main)', 'integrations', 'IntegrationsContent.tsx'), 'utf8');
  for (const [, logo] of page.matchAll(/logo: '(\/images\/integrations\/[^']+)'/g)) {
    const file = join(root, 'public', logo);
    assert.ok(statSync(file).size > 0, `${logo} absent`);
    if (logo.endsWith('.svg')) assert.doesNotMatch(readFileSync(file, 'utf8'), /<script|\son[a-z]+=|javascript:|<foreignObject/i, logo);
  }
});
