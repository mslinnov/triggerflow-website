import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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
import { LANGUES, metadonnees } from './seo';

const ROOT = join(__dirname, '../../../..');
const DOSSIER = __dirname;
const MESSAGES = { fr } as const;

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

test('crm-hotelier : la promesse de la pub mot pour mot dans le titre du héros', () => {
  const { line1, line2, line3, line4 } = fr.lpCrmHotelier.hero;
  assert.equal([line1, line2, line3, line4].join(' '), 'Le CRM hôtelier connecté à votre PMS.');
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
    `${brand.supportDays}j/${brand.supportDays}`,
    '14 jours',
    '30 jours',
    '15 établissements',
    '3 à 7 jours',
    '36 708 offres',
    // Les jalons du séjour de Camille, l'exemple du récit (message de J-3 à 10:00, petit-déjeuner à 72 €), et les
    // séjours des fiches de démonstration de l'ouverture.
    'J-3',
    '10:00',
    '72 €',
    '1 nuit',
    '2 nuits',
    '3 nuits',
    '4 nuits',
    ...prix.map((value) => `${value} €`),
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
