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

  // Formation du stand Equip'Hôtel : route protégée par mot de passe, en
  // français seulement. next-intl la redirigerait vers /fr/formation-salon,
  // qui n'existe pas.
  if (pathname === '/formation-salon') {
    return NextResponse.next();
  }

  // Documents commerciaux partagés (/doc/<document>/<suffixe>), de deux sortes.
  //
  // Le Parcours est traité ICI et pas dans une page : c'est un fichier HTML
  // complet, servi tel qu'il est relu et validé, et non une arborescence de
  // composants. Le middleware compte l'ouverture puis réécrit vers ce fichier.
  // Un PDF déposé dans le CRM est réécrit vers la route du relais, qui le
  // demande au backend et le fait compter dans le même appel. Dans les deux
  // cas, le lecteur garde son URL nominative dans la barre d'adresse.
  //
  // Le garde ci-dessus laisse déjà passer les fichiers du dossier
  // (/doc/parcours/captures/x.jpg) : ils portent un point, ils sont servis
  // statiquement et ne comptent pour rien.
  if (pathname.startsWith('/doc/')) {
    const target = parseDocumentPath(pathname);

    // Une URL mal formée repart dans le flot normal et finit sur la page 404 du
    // site, sans rien demander au backend. Une adresse bien formée, elle, part au
    // backend. Pour un PDF, clé inconnue ou suffixe jamais émis reçoivent la page
    // « Document introuvable » du relais. Le Parcours, lui, est servi quel que
    // soit le suffixe : le backend décide seul de compter l'ouverture ou non.
    if (!target) return intlMiddleware(request);

    // Un PDF déposé dans le CRM : la route du site le demande au backend, qui
    // le compte et le sert dans le même appel. Réécrit et non redirigé : le
    // lecteur garde son adresse, et celle du backend n'apparaît nulle part.
    if (target.kind === 'pdf') {
      return NextResponse.rewrite(new URL(`/api/doc/${target.document}/${target.slug}`, request.url));
    }

    // La langue vit dans l'URL (?lang=en) : elle survit au rechargement, au
    // partage du lien et aux ancres internes, et le compteur ne bouge pas
    // puisque le chemin, lui, reste le même.
    const langue = langueDemandee(request.nextUrl);

    // Compté en tâche de fond : le lecteur n'attend pas TriggerFlow. La langue
    // part avec, en champ OPTIONNEL : un backend qui ne la connaît pas encore
    // l'ignore, et l'ordre de déploiement des deux dépôts est indifférent.
    event.waitUntil(recordDocumentView(target.document, target.slug, request, langue));
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
