/**
 * Documents commerciaux partagés par lien nominatif.
 *
 * L'URL est /doc/<document>/<suffixe>. Le suffixe identifie le DESTINATAIRE,
 * pas le document : le même prospect garde le sien quel que soit le document
 * qu'on lui envoie.
 *
 * Le comptage se fait côté serveur, au moment où le site sert la page. C'est
 * délibérément indépendant de Google Analytics, qui est conditionné au bandeau
 * de consentement : sans acceptation, GA4 ne reçoit que des pings anonymes et
 * modélise le trafic. Pour répondre à « combien de fois ce prospect a-t-il
 * ouvert son document », il faut compter au serveur, sans cookie ni JavaScript.
 */

/**
 * Documents publiables, et le fichier statique qui porte chacun, par langue.
 *
 * Une langue = un FICHIER, pas une bascule dans la page. Le document porte des
 * ancres, un fil d'Ariane et des animations liées à ses identifiants :
 * embarquer les deux langues dans la même page aurait mis 74 identifiants en
 * double et cassé les trois.
 */
export const DOCUMENTS = {
  parcours: {
    fr: '/doc/parcours/_document.html',
    en: '/doc/parcours/_document.en.html',
  },
} as const;

export type DocumentName = keyof typeof DOCUMENTS;

/** Langues servies. Le français est la version de référence, donc le défaut. */
export const LANGUES = ['fr', 'en'] as const;
export type Langue = (typeof LANGUES)[number];

/**
 * Langue demandée par l'URL (?lang=en).
 *
 * Tout ce qui n'est pas explicitement une langue servie retombe sur le
 * français : un paramètre bricolé ne doit pas produire une page vide.
 */
export function langueDemandee(url: URL): Langue {
  const demande = url.searchParams.get('lang');
  return (LANGUES as readonly string[]).includes(demande ?? '') ? (demande as Langue) : 'fr';
}

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
  // inadvertance dans les secrets du dépôt le mettrait en clair sur le réseau,
  // et rien dans la réponse ne le signalerait.
  if (!API_URL.startsWith('https://') && !API_URL.startsWith('http://localhost')) return;

  const ip = readerIp(request);

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
        // Omis quand l'adresse est inconnue : posé vide, il ferait retomber
        // le backend sur l'adresse de notre serveur, et le regroupement des
        // rechargements fusionnerait alors tous les lecteurs entre eux.
        ...(ip ? { 'X-TF-Visitor-Ip': ip } : {}),
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
 * IP du lecteur, lue comme le fait déjà `src/app/api/leads/route.ts`.
 *
 * La production n'est PAS Cloudflare malgré la configuration wrangler du
 * dépôt : le site tourne derrière Apache sur un VPS, et c'est Apache qui
 * complète `x-forwarded-for`.
 *
 * D'où l'ordre, et surtout le DERNIER membre de la chaîne plutôt que le
 * premier : Apache AJOUTE à la fin l'adresse du client qu'il constate. Un
 * robot qui fabrique `x-forwarded-for: 1.2.3.4` obtient donc
 * « 1.2.3.4, son adresse réelle ». Prendre le premier laisserait n'importe qui
 * choisir son identité, et donc échapper au regroupement des rechargements en
 * changeant d'adresse à chaque appel.
 *
 * Retourne null dès qu'on ne sait pas, et l'en-tête est alors OMIS : le
 * transmettre vide ferait retomber le backend sur l'adresse de notre serveur,
 * ce qui fusionnerait tous les lecteurs sous une seule IP.
 */
function readerIp(request: Request): string | null {
  const direct = request.headers.get('cf-connecting-ip')?.trim();
  if (direct && isIpAddress(direct)) return direct;

  const forwarded = request.headers.get('x-forwarded-for');
  if (!forwarded) return null;

  const chain = forwarded.split(',');
  const last = chain[chain.length - 1]?.trim();
  return last && isIpAddress(last) ? last : null;
}

function isIpAddress(value: string): boolean {
  // IPv4 en quatre octets, ou IPv6 sous sa forme hexadécimale abrégée.
  return (
    /^(\d{1,3}\.){3}\d{1,3}$/.test(value) ||
    (value.includes(':') && /^[0-9a-fA-F:.]+$/.test(value))
  );
}
