import type { MetadataRoute } from 'next';
import { getAllArticles, getSilos } from '@/lib/blog';
import { getAllLandingPages } from '@/lib/landing-pages';
import { getAllLegalSlugs, getLegalDoc } from '@/lib/legal';
import { moduleSlugs } from '@/data/modules';
import { solutionSlugs } from '@/data/solutions';

const baseUrl = 'https://www.trigger-flow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ─── Static pages ────────────────────────────────────────────
  const staticPages = [
    { frPath: '/fr', enPath: '/en', priority: 1.0, changeFrequency: 'weekly' as const },
    { frPath: '/fr/produit', enPath: '/en/produit', priority: 0.8, changeFrequency: 'weekly' as const },
    { frPath: '/fr/tarifs', enPath: '/en/tarifs', priority: 0.9, changeFrequency: 'monthly' as const },
    { frPath: '/fr/integrations', enPath: '/en/integrations', priority: 0.8, changeFrequency: 'monthly' as const },
    { frPath: '/fr/contact', enPath: '/en/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { frPath: '/fr/entreprise/a-propos', enPath: '/en/entreprise/a-propos', priority: 0.5, changeFrequency: 'monthly' as const },
    { frPath: '/fr/entreprise/carrieres', enPath: '/en/entreprise/carrieres', priority: 0.4, changeFrequency: 'monthly' as const },
    { frPath: '/fr/ressources/aide', enPath: '/en/ressources/aide', priority: 0.5, changeFrequency: 'monthly' as const },
    { frPath: '/fr/ressources/cas-clients', enPath: '/en/ressources/cas-clients', priority: 0.6, changeFrequency: 'monthly' as const },
    { frPath: '/fr/ressources/guides', enPath: '/en/ressources/guides', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  for (const page of staticPages) {
    // French version
    sitemapEntries.push({
      url: `${baseUrl}${page.frPath}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${baseUrl}${page.frPath}`,
          en: `${baseUrl}${page.enPath}`,
        },
      },
    });

    // English version
    sitemapEntries.push({
      url: `${baseUrl}${page.enPath}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority - 0.1,
      alternates: {
        languages: {
          fr: `${baseUrl}${page.frPath}`,
          en: `${baseUrl}${page.enPath}`,
        },
      },
    });
  }

  // ─── Product / Module pages ──────────────────────────────────
  for (const slug of moduleSlugs) {
    const frUrl = `${baseUrl}/fr/produit/${slug}`;
    const enUrl = `${baseUrl}/en/produit/${slug}`;

    sitemapEntries.push({
      url: frUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });

    sitemapEntries.push({
      url: enUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });
  }

  // ─── Solution pages ──────────────────────────────────────────
  for (const slug of solutionSlugs) {
    const frUrl = `${baseUrl}/fr/solutions/${slug}`;
    const enUrl = `${baseUrl}/en/solutions/${slug}`;

    sitemapEntries.push({
      url: frUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });

    sitemapEntries.push({
      url: enUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });
  }

  // ─── Blog listing page ───────────────────────────────────────
  sitemapEntries.push(
    {
      url: `${baseUrl}/fr/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { fr: `${baseUrl}/fr/blog`, en: `${baseUrl}/en/blog` } },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: { languages: { fr: `${baseUrl}/fr/blog`, en: `${baseUrl}/en/blog` } },
    }
  );

  // ─── Blog silo pages ────────────────────────────────────────
  const silos = getSilos();
  for (const silo of silos) {
    const frUrl = `${baseUrl}/fr/blog/${silo.slug}`;
    const enUrl = `${baseUrl}/en/blog/${silo.slug}`;

    sitemapEntries.push(
      {
        url: frUrl,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: { fr: frUrl, en: enUrl } },
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: { fr: frUrl, en: enUrl } },
      }
    );
  }

  // ─── Blog articles ──────────────────────────────────────────
  const frArticles = getAllArticles('fr');
  const enArticles = getAllArticles('en');
  const processedTranslationKeys = new Set<string>();

  for (const frArticle of frArticles) {
    const frUrl = `${baseUrl}/fr/blog/${frArticle.siloSlug}/${frArticle.slug}`;
    const languages: Record<string, string> = { fr: frUrl };

    if (frArticle.translationKey) {
      processedTranslationKeys.add(frArticle.translationKey);
      const enArticle = enArticles.find(
        (a) => a.translationKey === frArticle.translationKey
      );
      if (enArticle) {
        languages.en = `${baseUrl}/en/blog/${enArticle.siloSlug}/${enArticle.slug}`;
      }
    }

    sitemapEntries.push({
      url: frUrl,
      lastModified: frArticle.dateMiseAJour ? new Date(frArticle.dateMiseAJour) : lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages },
    });

    if (languages.en) {
      const enArticle = enArticles.find(
        (a) => a.translationKey === frArticle.translationKey
      );
      sitemapEntries.push({
        url: languages.en,
        lastModified: enArticle?.dateMiseAJour ? new Date(enArticle.dateMiseAJour) : lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages },
      });
    }
  }

  // EN-only articles (no FR counterpart)
  for (const enArticle of enArticles) {
    if (enArticle.translationKey && processedTranslationKeys.has(enArticle.translationKey)) {
      continue;
    }

    const enUrl = `${baseUrl}/en/blog/${enArticle.siloSlug}/${enArticle.slug}`;
    sitemapEntries.push({
      url: enUrl,
      lastModified: enArticle.dateMiseAJour ? new Date(enArticle.dateMiseAJour) : lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: { languages: { en: enUrl } },
    });
  }

  // ─── Legal pages ────────────────────────────────────────────
  // Slugs FR identiques sur les 2 locales (pas de pathnames localises).
  // En attendant les versions EN traduites, /en/<slug> sert le contenu
  // FR en fallback (cf. src/lib/legal.ts).
  for (const slug of getAllLegalSlugs()) {
    const doc = getLegalDoc(slug, 'fr');
    const legalLastModified = doc?.frontmatter.lastUpdated
      ? new Date(doc.frontmatter.lastUpdated)
      : lastModified;

    const frUrl = `${baseUrl}/fr/${slug}`;
    const enUrl = `${baseUrl}/en/${slug}`;

    sitemapEntries.push(
      {
        url: frUrl,
        lastModified: legalLastModified,
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: { languages: { fr: frUrl, en: enUrl } },
      },
      {
        url: enUrl,
        lastModified: legalLastModified,
        changeFrequency: 'yearly',
        priority: 0.2,
        alternates: { languages: { fr: frUrl, en: enUrl } },
      }
    );
  }

  // ─── Landing pages (exclude noindex) ─────────────────────────
  const landingPages = getAllLandingPages().filter((lp) => !lp.noindex);
  for (const lp of landingPages) {
    const lpUrl =
      lp.locale === 'fr'
        ? `${baseUrl}/fr/lp/${lp.slug}`
        : `${baseUrl}/${lp.locale}/lp/${lp.slug}`;

    sitemapEntries.push({
      url: lpUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return sitemapEntries;
}
