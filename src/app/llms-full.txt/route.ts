import { getAllArticles } from '@/lib/blog';
import { buildLlmsFullTxt } from '@/lib/llms';

/** Régénéré toutes les heures, comme /llms.txt (prix d'entrée). Les articles sont lus au build. */
export const revalidate = 3600;

export function GET() {
  const body = buildLlmsFullTxt({ fr: getAllArticles('fr'), en: getAllArticles('en') });
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
