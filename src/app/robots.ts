import type { MetadataRoute } from 'next';

// /doc/ : documents commerciaux envoyés à un prospect précis. Ils portent déjà un
// noindex en balise et en en-tête ; la consigne ici évite en plus qu'un robot ne
// les découvre et n'aille les chercher.
// /formation-salon : formation interne de l'équipe du salon, derrière un mot de passe.
const DISALLOW = ['/api/', '/api/*', '/doc/', '/doc/*', '/formation-salon'];

/**
 * Robots des moteurs IA, nommés explicitement : un robot qui trouve son propre groupe
 * ignore le groupe `*`, d'où la même liste `disallow`. Autorisés aussi pour
 * l'entraînement (décision Mounir du 25/10/2026) : être connu des modèles aide à être
 * recommandé quand un hôtelier demande un CRM hôtelier.
 */
const AI_CRAWLERS = [
  // OpenAI : recherche ChatGPT, navigation à la demande, entraînement
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini, AI Overviews : Googlebot ; entraînement : Google-Extended)
  'Google-Extended',
  // Apple, Microsoft Copilot (Bing), Meta, Mistral, Common Crawl
  'Applebot-Extended',
  'bingbot',
  'meta-externalagent',
  'MistralAI-User',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.trigger-flow.com';

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
