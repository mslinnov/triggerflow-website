/**
 * Documents commerciaux partagés par lien nominatif.
 *
 * L'URL est /doc/<document>/<suffixe>. Le suffixe identifie le DESTINATAIRE,
 * pas le document : le même prospect garde le sien quel que soit le document
 * qu'on lui envoie.
 *
 * Le comptage se fait côté serveur, au moment où le Worker sert la page. C'est
 * délibérément indépendant de Google Analytics, qui est conditionné au bandeau
 * de consentement : sans acceptation, GA4 ne reçoit que des pings anonymes et
 * modélise le trafic. Pour répondre à « combien de fois ce prospect a-t-il
 * ouvert son document », il faut compter au serveur, sans cookie ni JavaScript.
 */

/** Documents publiables, et le fichier statique qui porte chacun. */
export const DOCUMENTS = {
  parcours: '/doc/parcours/_document.html',
} as const;

export type DocumentName = keyof typeof DOCUMENTS;

/**
 * Forme acceptée pour un suffixe.
 *
 * Volontairement identique à la règle de validation du backend : une URL que
 * le site sert mais que le backend refuse produirait une page lue et jamais
 * comptée, sans que rien ne le signale.
 */
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,119}$/;

export function isDocumentName(value: string): value is DocumentName {
  return Object.prototype.hasOwnProperty.call(DOCUMENTS, value);
}

export function isValidSlug(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

/**
 * Découpe /doc/<document>/<suffixe>. Renvoie null pour tout le reste, y
 * compris les fichiers statiques du dossier (/doc/parcours/captures/x.jpg),
 * qui portent un point et sont servis sans passer par ici.
 */
export function parseDocumentPath(
  pathname: string
): { document: DocumentName; slug: string } | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length !== 3 || segments[0] !== 'doc') return null;

  const [, document, slug] = segments;
  if (!isDocumentName(document) || !isValidSlug(slug)) return null;

  return { document, slug };
}

// Mêmes précautions que la route des livres blancs : une base copiée avec sa
// barre finale produirait une double barre que le routeur Laravel ne
// reconnaît pas, et un secret copié avec un retour à la ligne rendrait
// l'en-tête invalide sans que rien ne distingue ce cas d'une clé révoquée.
const API_URL = process.env.TRIGGERFLOW_API_URL?.trim().replace(/\/+$/, '');
const SECRET = process.env.DOCUMENT_VIEW_SECRET?.trim();

/**
 * Signale une ouverture au backend.
 *
 * AU MIEUX, JAMAIS BLOQUANT. La page doit être servie même si TriggerFlow est
 * indisponible, lent ou mal configuré : un document commercial qui ne
 * s'affiche pas chez un prospect coûte infiniment plus cher qu'une ouverture
 * non comptée. D'où le délai court, le `catch` muet, et l'appel confié à
 * `waitUntil` plutôt qu'attendu.
 */
export async function recordDocumentView(
  document: DocumentName,
  slug: string,
  request: Request
): Promise<void> {
  if (!API_URL || !SECRET) return;

  // Le secret ne part que sur un canal chiffré. Une base saisie en http:// par
  // inadvertance dans le tableau de bord Cloudflare le mettrait en clair sur
  // le réseau, et rien dans la réponse ne le signalerait.
  if (!API_URL.startsWith('https://') && !API_URL.startsWith('http://localhost')) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    await fetch(`${API_URL}/api/public-document-view`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-TF-Doc-Secret': SECRET,
        // Sans cet en-tête, toutes les vues porteraient l'adresse du Worker :
        // le regroupement des rechargements fusionnerait les lecteurs entre
        // eux et le limiteur mettrait tout Internet dans un seul seau.
        'X-TF-Visitor-Ip': readerIp(request),
      },
      body: JSON.stringify({
        document,
        slug,
        referer: request.headers.get('referer')?.slice(0, 512) ?? null,
        user_agent: request.headers.get('user-agent')?.slice(0, 1000) ?? null,
      }),
    });
  } catch {
    // Volontairement muet : rien à faire d'utile ici, et le lecteur n'a pas à
    // attendre que nous ayons fini de compter.
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * IP du lecteur telle que Cloudflare la voit.
 *
 * `CF-Connecting-IP` est posé par Cloudflare lui-même et ne peut pas être
 * usurpé par le client sur ce chemin ; `X-Forwarded-For` sert de repli et on
 * n'en garde que la première adresse, la seule que le client n'a pas choisie.
 */
function readerIp(request: Request): string {
  const cf = request.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  return '';
}
