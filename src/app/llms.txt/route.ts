import { getAllArticles } from '@/lib/blog';
import { buildLlmsTxt } from '@/lib/llms';

/** Régénéré toutes les heures : le prix d'entrée suit la bascule tarifaire du 1er janvier 2027. */
export const revalidate = 3600;

export function GET() {
  const body = buildLlmsTxt({ fr: getAllArticles('fr'), en: getAllArticles('en') });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
