import { parseDocumentPath } from '@/lib/document-views';
import { failurePage, relaySharedPdf } from '@/lib/shared-pdf';

/**
 * PDF partagé depuis le CRM. Atteint par la réécriture du middleware
 * (/doc/<clé>/<suffixe>) : le lecteur ne voit jamais cette adresse.
 *
 * Revalide la forme de l'adresse : la route est joignable directement, elle ne
 * doit relayer au backend que ce que /doc/ aurait relayé. Le reste (document
 * retiré, suffixe jamais émis) est tranché par le backend, qui répond 404 sans
 * rien compter.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ document: string; slug: string }> }) {
  const { document, slug } = await params;
  const target = parseDocumentPath(`/doc/${document}/${slug}`);

  if (target?.kind !== 'pdf') return failurePage(404);

  return relaySharedPdf(target.document, target.slug, request);
}

/**
 * Sans cette réponse, Next servirait un HEAD en appelant GET puis en jetant le corps : chaque
 * sonde (aperçu de lien, antivirus d'une messagerie) compterait une ouverture et garderait une
 * place de relais jusqu'à ce que le délai d'inactivité la rende.
 */
export function HEAD(): Response {
  return new Response(null, { status: 405, headers: { Allow: 'GET', 'Cache-Control': 'no-store' } });
}
