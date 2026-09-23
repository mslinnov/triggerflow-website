import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.trigger-flow.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /doc/ : documents commerciaux envoyés à un prospect précis. Ils
        // portent déjà un noindex en balise et en en-tête ; la consigne ici
        // évite en plus qu'un robot ne les découvre et n'aille les chercher.
        disallow: ['/api/', '/api/*', '/doc/', '/doc/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
