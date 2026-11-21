import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import en from '../../../../messages/en.json';
import fr from '../../../../messages/fr.json';
import { brand } from '../../../data/brand';
import { companyStats } from '../../../data/company-stats';
import { clientLogos, homeClients } from '../../../data/clients';
import { getDisplayPlans, getEntryPrice, type PricingPhase } from '../../../data/pricing';
import { applyBrandValues, withBrandValues } from '../../../i18n/brand-values';
import { getCaseStudyBySlug } from '../../../lib/case-studies';
import { landingPageValues } from '../../../lib/landing-pages';
import { DEMO, PLACEMENTS, SOURCE_RAPPEL, demoHref } from './liens';
import { ETUDES } from './etudes';
import { montants } from './histoire';
import { LANGUES, metadonnees } from './seo';

const ROOT = join(__dirname, '../../../..');
const DOSSIER = __dirname;
const MESSAGES = { fr, en } as const;

/** Les sources des composants de la page (tests exclus). */
function sources(): Array<[string, string]> {
  return readdirSync(DOSSIER)
    .filter((file) => /\.tsx?$/.test(file) && !file.endsWith('.test.ts'))
    .map((file) => [file, readFileSync(join(DOSSIER, file), 'utf8')]);
}

/** Les textes de la page tels qu'affichés : faits de marque et valeurs des pages d'atterrissage posés. */
function textes(locale: keyof typeof MESSAGES): string[] {
  const messages = withBrandValues(locale, MESSAGES[locale] as Record<string, unknown>) as { lpCrmHotelier: unknown };
  const page = applyBrandValues(messages.lpCrmHotelier, landingPageValues(locale));
  const out: string[] = [];
  const walk = (node: unknown) => {
    if (typeof node === 'string') out.push(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === 'object') Object.values(node).forEach(walk);
  };
  walk(page);
  return out;
}

test('crm-hotelier : la promesse de la pub mot pour mot dans le titre du héros, et sa version anglaise', () => {
  const titre = ({ line1, line2, line3, line4 }: typeof fr.lpCrmHotelier.hero) => [line1, line2, line3, line4].join(' ');
  assert.equal(titre(fr.lpCrmHotelier.hero), 'Le CRM hôtelier connecté à votre PMS.');
  assert.equal(titre(en.lpCrmHotelier.hero), 'The hotel CRM connected to your PMS.');
});

test('crm-hotelier : servie en français et en anglais, mêmes clés et mêmes listes dans les deux langues', () => {
  assert.deepEqual([...LANGUES], ['fr', 'en']);
  const forme = (node: unknown): unknown =>
    Array.isArray(node) ? node.map(forme) : node && typeof node === 'object' ? Object.fromEntries(Object.entries(node).map(([k, v]) => [k, forme(v)])) : typeof node;
  assert.deepEqual(forme(en.lpCrmHotelier), forme(fr.lpCrmHotelier));
});

test('crm-hotelier : aucun reste de français dans la page anglaise', () => {
  for (const texte of textes('en')) {
    assert.doesNotMatch(texte, /[éèêàâùûçœ«»]|\b(le|la|les|des|du|votre|vos|nuit|nuits|jours)\b/i, `français dans « ${texte} »`);
  }
});

test('crm-hotelier : les textes dessinés dans les objets 3D viennent des messages', () => {
  const source = readFileSync(join(DOSSIER, 'objets3d.ts'), 'utf8');
  // Restent écrits dans le code : le nom de Camille et les chiffres de sa carte bancaire, les mêmes dans toutes les langues.
  const permis = new Set(['Camille Rousseau', 'CAMILLE ROUSSEAU', '••••  ••••  ••••  4821', '12/28', 'H']);
  for (const [, , texte] of [...source.matchAll(/fillText\((['"`])(.*?)\1/g)]) {
    assert.ok(permis.has(texte), `texte écrit en dur dans objets3d.ts : « ${texte} »`);
  }
});

test('crm-hotelier : les montants du récit sont repérés dans les deux écritures (72 € et €72)', () => {
  assert.deepEqual(montants(fr.lpCrmHotelier.story.payment.text), ['', '72 €', ' de plus sur le séjour.']);
  assert.deepEqual(montants(en.lpCrmHotelier.story.payment.text).filter((_, i) => i % 2), ['€72']);
});

test('crm-hotelier : chaque cas client a sa citation et sa fonction en anglais', () => {
  for (const etude of ETUDES) {
    assert.ok(etude.en.quote.length > 20, `citation anglaise absente : ${etude.slug}`);
    assert.ok(etude.en.contactRole && etude.en.location, `fonction ou lieu anglais absent : ${etude.slug}`);
    assert.doesNotMatch(etude.en.quote, /[éèêàâùûç«»]/, `citation en français : ${etude.slug}`);
  }
});

test('crm-hotelier : chaque lien de démo est suivi par emplacement, aucun lien lemcal écrit à la main', () => {
  for (const placement of PLACEMENTS) {
    const url = new URL(demoHref(placement));
    assert.equal(url.searchParams.get('utm_campaign'), 'lp-crm-hotelier');
    assert.equal(url.searchParams.get('utm_medium'), 'landing');
    assert.equal(url.searchParams.get('utm_content'), placement);
  }
  for (const [file, source] of sources()) {
    if (file === 'liens.ts') continue;
    assert.doesNotMatch(source, /lemcal\.com/, `${file} : lien de démo sans demoHref`);
  }
  assert.ok(DEMO.startsWith('https://app.lemcal.com/@trigger-flow/demo?'));
});

test('crm-hotelier : chaque emplacement de démo a son bouton sur la page', () => {
  const all = sources().map(([, source]) => source).join('\n');
  for (const placement of PLACEMENTS) {
    const motif = new RegExp(`demoHref\\('${placement}'\\)|placement="${placement}"`);
    assert.match(all, motif, `aucun bouton de démo « ${placement} »`);
  }
});

test('crm-hotelier : l’action secondaire mène au formulaire de rappel de la page', () => {
  const all = sources().map(([, source]) => source).join('\n');
  assert.match(all, /id=\{RAPPEL\}|id="rappel"/);
  assert.match(all, /href=\{`#\$\{RAPPEL\}`\}|href="#rappel"/);
  assert.equal(SOURCE_RAPPEL, 'lp-crm-hotelier');
});

test('crm-hotelier : page payante hors index, vignette de partage gardée', () => {
  for (const locale of LANGUES) {
    const meta = metadonnees(locale, { title: 't', description: 'd' });
    assert.deepEqual(meta.robots, { index: false, follow: false });
    assert.equal(meta.openGraph?.url, `${brand.url}/${locale}/lp/crm-hotelier`);
  }
});

test('crm-hotelier : vrais clients seulement, jamais de logo de chaîne', () => {
  assert.ok(ETUDES.length > 0);
  for (const etude of ETUDES) {
    assert.ok(getCaseStudyBySlug(etude.slug), `cas client inconnu : ${etude.slug}`);
    assert.ok(existsSync(join(ROOT, 'public', etude.image)), `image absente ${etude.image}`);
  }
  for (const name of homeClients) {
    assert.doesNotMatch(name, /^(Accor|Ibis|Best Western|The Originals|Logis)\b/, `logo de chaîne : ${name}`);
    const logo = clientLogos[name];
    if (logo) assert.ok(existsSync(join(ROOT, 'public', logo.src)), `logo absent ${logo.src}`);
  }
});

test('crm-hotelier : tout chiffre affiché vient du dépôt, avec son unité, aucun n’est inventé', () => {
  // Les sources hors code, vérifiées ici pour qu'un changement là-bas casse ce test plutôt que la page.
  assert.match(fr.pricing.faq.items.trial.answer, /14 jours d'essai/);
  assert.match(fr.pricing.faq.items.commitment.answer, /préavis de 30 jours/);
  assert.match(en.pricing.faq.items.trial.answer, /14-day free trial/);
  assert.match(en.pricing.faq.items.commitment.answer, /30 days notice/);
  assert.match(getCaseStudyBySlug('groupe-noemys')?.type ?? '', /15 établissements/);
  // L'étude des ventes additionnelles, citée sous le taux d'achat des offres.
  assert.match(companyStats.upsellAccepted.source, /envoyées 3 à 7 jours avant/);
  assert.match(companyStats.upsellAccepted.source, /36 708 envois/);

  const phases: PricingPhase[] = ['announce', 'new'];
  const prix = phases.flatMap((phase) => [getEntryPrice(phase), ...getDisplayPlans(phase).map((plan) => plan.price)]);
  // Un chiffre n'est permis qu'avec son unité : « 30 jours » de préavis ne laisse pas passer « 30 minutes ».
  const permis = [
    brand.pmsCompatibles.fr,
    brand.pmsCompatibles.en,
    `${brand.setupHours} h`,
    `${brand.setupHours} hours`,
    `${brand.supportDays}j/${brand.supportDays}`,
    `${brand.supportDays} days a week`,
    '14 jours',
    '14-day',
    '30 jours',
    '30 days',
    '15 établissements',
    '15 properties',
    '3 à 7 jours',
    '3 to 7 days',
    '36 708 offres',
    '36,708 offers',
    // Les jalons du séjour de Camille, l'exemple du récit (message de J-3 à 10:00, petit-déjeuner à 72 €), et les
    // séjours des fiches de démonstration de l'ouverture.
    'J-3',
    '10:00',
    '72 €',
    '€72',
    '1 nuit',
    '2 nuits',
    '3 nuits',
    '4 nuits',
    '1 night',
    '2 nights',
    '3 nights',
    '4 nights',
    ...prix.map((value) => `${value} €`),
    ...prix.map((value) => `€${value}`),
  ];
  const motif = new RegExp(permis.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  for (const locale of Object.keys(MESSAGES) as Array<keyof typeof MESSAGES>) {
    for (const texte of textes(locale)) {
      const reste = texte.replace(/[\u00a0\u202f]/g, ' ').replace(motif, '');
      // Un chiffre collé à une lettre qui le précède fait partie d'un nom (n8n, Beds24), pas d'une promesse.
      const nombre = reste.match(/(?<![\p{L}\d])\d+/u);
      assert.equal(nombre, null, `${locale} : chiffre sans source « ${nombre?.[0]} » dans « ${texte} »`);
    }
  }
});
