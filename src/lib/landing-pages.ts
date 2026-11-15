import fs from 'fs';
import path from 'path';
import type { LandingPageConfig } from '@/types/landing-page';
import { brand } from '@/data/brand';
import { stat } from '@/data/company-stats';
import { getEntryPrice, getPricingPhase } from '@/data/pricing';
import { applyBrandValues, brandValues } from '@/i18n/brand-values';

const LANDING_PAGES_DIR = path.join(process.cwd(), 'src/data/landing-pages');

/** « Mews, Thaïs, …, Reservit et Lean PMS » : la liste des connecteurs de brand.ts, jamais recopiée. */
function pmsList(locale: string): string {
  const names = [...brand.pms];
  const last = names.pop();
  return `${names.join(', ')} ${locale === 'fr' ? 'et' : 'and'} ${last}`;
}

/** Valeurs que le JSON d'une page écrit `{cle}` : faits de marque, liste des PMS, prix d'entrée du moment. */
export function landingPageValues(locale: string, now?: Date): Record<string, string> {
  return {
    ...brandValues(locale),
    pmsList: pmsList(locale),
    entryPrice: getEntryPrice(getPricingPhase(now)),
  };
}

/** Pose `value` sur chaque objet qui ne porte qu'un `statId` : le chiffre vient de company-stats.ts. */
function resolveStatIds<T>(value: T, locale: string): T {
  if (Array.isArray(value)) return value.map((item) => resolveStatIds(item, locale)) as T;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).map(([key, item]) => [key, resolveStatIds(item, locale)]);
    const resolved = Object.fromEntries(entries) as Record<string, unknown>;
    if (typeof resolved.statId === 'string' && resolved.value === undefined) {
      resolved.value = stat(resolved.statId, locale);
    }
    return resolved as T;
  }
  return value;
}

/**
 * Une page lue sur le disque, ses valeurs posées. Appelée à chaque rendu : le prix d'entrée suit la
 * phase de prix du moment (la page est régénérée toutes les heures).
 */
export function resolveLandingPage(config: LandingPageConfig, now?: Date): LandingPageConfig {
  return resolveStatIds(applyBrandValues(config, landingPageValues(config.locale, now)), config.locale);
}

/**
 * Read all landing page config files from src/data/landing-pages/.
 * Convention: {slug}.{locale}.json (e.g., exemple-mews.fr.json)
 */
export function getAllLandingPages(): LandingPageConfig[] {
  if (!fs.existsSync(LANDING_PAGES_DIR)) return [];

  const files = fs.readdirSync(LANDING_PAGES_DIR).filter((f) => f.endsWith('.json'));
  const configs: LandingPageConfig[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(LANDING_PAGES_DIR, file), 'utf-8');
    const config = JSON.parse(raw) as LandingPageConfig;

    if (config.slug && config.locale && config.metadata && config.sections) {
      configs.push(config);
    }
  }

  return configs;
}

/**
 * Get a single landing page config by slug and locale.
 */
export function getLandingPageBySlug(
  slug: string,
  locale: string
): LandingPageConfig | undefined {
  const filename = `${slug}.${locale}.json`;
  const filepath = path.join(LANDING_PAGES_DIR, filename);

  if (!fs.existsSync(filepath)) return undefined;

  const raw = fs.readFileSync(filepath, 'utf-8');
  const config = JSON.parse(raw) as LandingPageConfig;

  if (!config.slug || !config.locale || !config.metadata || !config.sections) {
    return undefined;
  }

  return resolveLandingPage(config);
}

/**
 * Get all slug+locale pairs for generateStaticParams().
 */
export function getLandingPageSlugs(): Array<{ slug: string; locale: string }> {
  return getAllLandingPages().map((lp) => ({
    slug: lp.slug,
    locale: lp.locale,
  }));
}
