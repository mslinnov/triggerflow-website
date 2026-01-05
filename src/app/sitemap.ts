import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.trigger-flow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Define all pages with their localized paths
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

  // Generate entries for each page in both locales
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
      priority: page.priority - 0.1, // Slightly lower priority for non-default locale
      alternates: {
        languages: {
          fr: `${baseUrl}${page.frPath}`,
          en: `${baseUrl}${page.enPath}`,
        },
      },
    });
  });

  return sitemapEntries;
}
