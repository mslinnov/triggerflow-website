import createMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { DOCUMENTS, langueDemandee, parseDocumentPath, recordDocumentView } from './lib/document-views';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Documents commerciaux partagés (/doc/<document>/<suffixe>).
  //
  // Traités ICI et pas dans une page : le document est un fichier HTML complet,
  // servi tel qu'il est relu et validé, et non une arborescence de composants.
  // Le middleware compte l'ouverture puis réécrit vers ce fichier, ce qui laisse
  // au lecteur son URL nominative dans la barre d'adresse.
  //
  // Le garde ci-dessus laisse déjà passer les fichiers du dossier
  // (/doc/parcours/captures/x.jpg) : ils portent un point, ils sont servis
  // statiquement et ne comptent pour rien.
  if (pathname.startsWith('/doc/')) {
    const target = parseDocumentPath(pathname);

    // Une URL mal formée ne doit pas révéler que /doc existe : elle repart
    // dans le flot normal et finira sur la page 404 du site.
    if (!target) return intlMiddleware(request);

    // Compté en tâche de fond : le lecteur n'attend pas TriggerFlow.
    event.waitUntil(recordDocumentView(target.document, target.slug, request));

    // La langue vit dans l'URL (?lang=en) : elle survit au rechargement, au
    // partage du lien et aux ancres internes, et le compteur ne bouge pas
    // puisque le chemin, lui, reste le même.
    const langue = langueDemandee(request.nextUrl);
    const fichier = DOCUMENTS[target.document][langue];

    const response = NextResponse.rewrite(new URL(fichier, request.url));

    // Ceinture et bretelles avec la balise meta du document : un en-tête
    // couvre aussi les réponses que les robots obtiennent sans exécuter le
    // HTML.
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  // Match everything except static files
  matcher: ['/:path*']
};
