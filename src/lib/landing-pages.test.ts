import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { brand } from '../data/brand';
import { companyStats, stat } from '../data/company-stats';
import { getEntryPrice, getPricingPhase, PRICE_CHANGE_AT } from '../data/pricing';
import { getCaseStudyBySlug } from './case-studies';
import { getAllLandingPages, landingPageValues, resolveLandingPage } from './landing-pages';
import type { LandingPageConfig } from '../types/landing-page';

const ROOT = process.cwd();

/** Toutes les chaînes et tous les objets d'une config, pour les règles qui valent partout dans la page. */
function walk(value: unknown, visit: (node: unknown, key?: string) => void, key?: string): void {
  visit(value, key);
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === 'object') {
    for (const [childKey, child] of Object.entries(value)) walk(child, visit, childKey);
  }
}

function strings(value: unknown): string[] {
  const out: string[] = [];
  walk(value, (node) => {
    if (typeof node === 'string') out.push(node);
  });
  return out;
}

const minimal = (sections: unknown): LandingPageConfig =>
  ({ slug: 'test', locale: 'fr', header: { ctaLabel: '', ctaHref: '' }, metadata: { title: '', description: '' }, sections }) as LandingPageConfig;

test('valeurs des pages : PMS de brand.ts, liste des connecteurs, prix d’entrée de la phase du moment', () => {
  const before = new Date(PRICE_CHANGE_AT.getTime() - 1000);
  const after = new Date(PRICE_CHANGE_AT.getTime() + 1000);
  const config = minimal([{ type: 'LPFAQ', props: { sectionTitle: '{pmsCompatibles} PMS', items: [{ question: '{pmsList}', answer: '{entryPrice} €' }] } }]);

  const [early] = resolveLandingPage(config, before).sections as unknown as Array<{ props: { sectionTitle: string; items: Array<{ question: string; answer: string }> } }>;
  assert.equal(early.props.sectionTitle, `${brand.pmsCompatibles.fr} PMS`);
  assert.equal(early.props.items[0].answer, `${getEntryPrice(getPricingPhase(before))} €`);
  const [late] = resolveLandingPage(config, after).sections as unknown as typeof early[];
  assert.equal(late.props.items[0].answer, `${getEntryPrice(getPricingPhase(after))} €`);

  const list = landingPageValues('fr').pmsList;
  for (const pms of brand.pms) assert.ok(list.includes(pms), `${pms} dans la liste`);
  assert.ok(list.endsWith(` et ${brand.pms[brand.pms.length - 1]}`));
  assert.ok(landingPageValues('en').pmsList.endsWith(` and ${brand.pms[brand.pms.length - 1]}`));
});

test('valeurs des pages : un objet qui ne porte qu’un statId reçoit le chiffre de company-stats.ts', () => {
  const config = minimal([
    { type: 'LPSocialProof', props: { stats: [{ statId: 'hotels', label: 'hôtels' }, { statId: 'messages', value: 'gardée', label: 'm' }] } },
  ]);
  const [section] = resolveLandingPage(config).sections as unknown as Array<{ props: { stats: Array<{ value: string }> } }>;
  assert.equal(section.props.stats[0].value, stat('hotels', 'fr'));
  assert.equal(section.props.stats[1].value, 'gardée');
});

const pages = getAllLandingPages();

test('pages d’atterrissage : chaque {valeur} posée, chiffres et cas clients publiés, images présentes', () => {
  assert.ok(pages.length >= 2);
  for (const page of pages) {
    const where = `${page.slug}.${page.locale}`;
    // getAllLandingPages rend des pages déjà résolues : metadata et sections, sans {valeur} en clair.
    for (const text of strings(page)) {
      assert.doesNotMatch(text, /\{\w+\}/, `${where} : valeur non posée dans « ${text} »`);
      assert.ok(!text.includes('\u2014'), `${where} : tiret cadratin dans « ${text} »`);
    }
    walk(page, (node, key) => {
      if (!node || typeof node !== 'object' || Array.isArray(node)) return;
      const record = node as Record<string, unknown>;
      if (typeof record.statId === 'string') {
        assert.ok(record.statId in companyStats, `${where} : statId inconnu ${record.statId}`);
      }
      if (key === 'caseStudies' || typeof record.slug !== 'string' || record.slug === page.slug) return;
      assert.ok(getCaseStudyBySlug(record.slug), `${where} : cas client inconnu ${record.slug}`);
    });
    walk(page, (node, key) => {
      if (typeof node !== 'string' || !['image', 'imageSrc', 'src', 'logoSrc'].includes(key ?? '')) return;
      assert.ok(existsSync(join(ROOT, 'public', node)), `${where} : image absente ${node}`);
    });
  }
});

test('grille des PMS : un logo présent dans public/ pour chaque connecteur', () => {
  const source = readFileSync(join(ROOT, 'src/components/landing/shared/LPIntegrations.tsx'), 'utf-8');
  const logos = [...source.matchAll(/src: '([^']+)'/g)].map((match) => match[1]);
  assert.equal(logos.length, brand.pms.length);
  for (const logo of logos) assert.ok(existsSync(join(ROOT, 'public', logo)), `logo absent ${logo}`);
});

test('crm-hotelier : la promesse de la pub dès le premier écran, liens de démo suivis par emplacement', () => {
  const page = pages.find((lp) => lp.slug === 'crm-hotelier' && lp.locale === 'fr');
  assert.ok(page);
  assert.equal(page.noindex, true);

  const hero = page.sections[0];
  assert.equal(hero.type, 'LPHero');
  const props = hero.props as { title: string; titleAccent?: string; subtitle: string; benefitCards?: Array<{ title: string; description: string }> };
  assert.equal(`${props.title} ${props.titleAccent}`, 'Le CRM hôtelier connecté à votre PMS.');
  assert.ok(props.subtitle.startsWith('Plus de réservations en direct et plus de ventes'));
  // Les trois avantages de l'annonce, mot pour mot.
  assert.deepEqual(props.benefitCards?.map((card) => `${card.title} : ${card.description}`), [
    'Plus de réservations en direct : Vos anciens clients reviennent, sans commission OTA',
    'Plus de ventes par séjour : Surclassements et options proposés avant l\'arrivée',
    'Plus d\'avis positifs : Enquête envoyée automatiquement après le séjour',
  ]);

  const demoLinks = strings(page).filter((text) => text.includes('lemcal.com'));
  assert.ok(demoLinks.length >= 5);
  for (const link of demoLinks) assert.match(link, /utm_campaign=lp-crm-hotelier(&|$)/);
  const placements = demoLinks.map((link) => new URL(link).searchParams.get('utm_content')).filter(Boolean);
  assert.deepEqual(placements, ['hero', 'milieu', 'tarifs', 'cta-bas']);

  // L'issue secondaire reste sur la page : le formulaire de rappel, pas un nouvel onglet.
  const secondary = (hero.props as { secondaryCtaHref?: string }).secondaryCtaHref;
  assert.equal(secondary, '#rappel');
  assert.ok(page.sections.some((section) => (section.props as { id?: string }).id === 'rappel' && 'callback' in section.props));
});
