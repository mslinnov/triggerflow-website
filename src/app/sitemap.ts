import type { MetadataRoute } from 'next';
import { getAllArticles, getSilos } from '@/lib/blog';
import { getAllLandingPages } from '@/lib/landing-pages';

const baseUrl = 'https://www.trigger-flow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Define all static pages with their localized paths
  const pages = [
    {
      path: '',
      frPath: '',
      enPath: '/en',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/mentions-legales',
      frPath: '/mentions-legales',
      enPath: '/en/legal-notice',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/cgv',
      frPath: '/cgv',
      enPath: '/en/terms-of-sale',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/cgu',
      frPath: '/cgu',
      enPath: '/en/terms-of-use',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/politique-confidentialite',
      frPath: '/politique-confidentialite',
      enPath: '/en/privacy-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each static page in both locales
  pages.forEach((page) => {
    // French version (default)
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
  });

  // Blog listing page
  sitemapEntries.push(
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    }
  );

  // Blog silo pages
  const silos = getSilos();
  for (const silo of silos) {
    sitemapEntries.push(
      {
        url: `${baseUrl}/blog/${silo.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/blog/${silo.slug}`,
            en: `${baseUrl}/en/blog/${silo.slug}`,
          },
        },
      },
      {
        url: `${baseUrl}/en/blog/${silo.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            fr: `${baseUrl}/blog/${silo.slug}`,
            en: `${baseUrl}/en/blog/${silo.slug}`,
          },
        },
      }
    );
  }

  // Blog articles — use translationKey to pair FR/EN and avoid duplicates
  const frArticles = getAllArticles('fr');
  const enArticles = getAllArticles('en');
  const processedTranslationKeys = new Set<string>();

  for (const frArticle of frArticles) {
    const frUrl = `${baseUrl}/blog/${frArticle.siloSlug}/${frArticle.slug}`;
    const languages: Record<string, string> = { fr: frUrl };

    // Find EN counterpart via translationKey
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

    // Add EN entry with same alternates (if EN counterpart exists)
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

  // Add EN-only articles (no FR counterpart)
  for (const enArticle of enArticles) {
    if (enArticle.translationKey && processedTranslationKeys.has(enArticle.translationKey)) {
      continue; // Already processed via FR counterpart
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

  // Dynamic landing pages (exclude noindex)
  const landingPages = getAllLandingPages().filter((lp) => !lp.noindex);
  for (const lp of landingPages) {
    const lpUrl =
      lp.locale === 'fr'
        ? `${baseUrl}/lp/${lp.slug}`
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
