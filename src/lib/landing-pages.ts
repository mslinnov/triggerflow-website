import fs from 'fs';
import path from 'path';
import type { LandingPageConfig } from '@/types/landing-page';

const LANDING_PAGES_DIR = path.join(process.cwd(), 'src/data/landing-pages');

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

  return config;
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
