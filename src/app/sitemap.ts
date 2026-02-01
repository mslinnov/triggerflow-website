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

  // Blog articles
  const frArticles = getAllArticles('fr');
  const enArticles = getAllArticles('en');

  for (const article of frArticles) {
    const frUrl = `${baseUrl}/blog/${article.siloSlug}/${article.slug}`;
    const enUrl = `${baseUrl}/en/blog/${article.siloSlug}/${article.slug}`;

    sitemapEntries.push({
      url: frUrl,
      lastModified: article.dateMiseAJour ? new Date(article.dateMiseAJour) : lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          fr: frUrl,
          en: enUrl,
        },
      },
    });
  }

  for (const article of enArticles) {
    const frUrl = `${baseUrl}/blog/${article.siloSlug}/${article.slug}`;
    const enUrl = `${baseUrl}/en/blog/${article.siloSlug}/${article.slug}`;

    sitemapEntries.push({
      url: enUrl,
      lastModified: article.dateMiseAJour ? new Date(article.dateMiseAJour) : lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          fr: frUrl,
          en: enUrl,
        },
      },
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
