/**
 * IP réelle du visiteur derrière le relais Apache du site, pour toute limitation
 * de débit qui doit porter sur lui et non sur notre serveur. Extrait tel quel de
 * src/app/api/leads/route.ts, partagé avec /api/calendrier/rappel.
 */
import type { NextRequest } from 'next/server';

// Un en-tête d'IP ne sert à rien s'il n'est pas une IP : le backend le
// refuserait ou, pire, l'enregistrerait tel quel. On vérifie la forme avant de
// transmettre. IPv4 strictement bornée, IPv6 reconnue à sa grammaire.
const IPV4_PATTERN = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
// Grammaire IPv6 volontairement permissive : elle accepte l'abréviation « :: »
// et la forme mixte « ::ffff:192.0.2.1 » que produisent certains relais. La
// validation stricte reste l'affaire du backend, on filtre ici le n'importe quoi.
const IPV6_PATTERN = /^[0-9a-f]{0,4}(:[0-9a-f]{0,4}){2,7}(:\d{1,3}(\.\d{1,3}){3})?$/i;

function isIpAddress(value: string): boolean {
  return IPV4_PATTERN.test(value) || IPV6_PATTERN.test(value);
}

/**
 * IP réelle du visiteur, pour que la limitation de débit du backend porte sur
 * lui et non sur nous.
 *
 * La cible réelle est un VPS DigitalOcean derrière Apache, pas Cloudflare :
 * `.github/workflows/deploy.yml` déploie par SSH, et Apache relaie vers
 * `http://127.0.0.1:3002/` avec `ProxyAddHeaders` laissé à sa valeur par
 * défaut. Les commandes OpenNext du `package.json` existent mais ne sont pas
 * le chemin de production.
 *
 * D'où l'ordre de lecture :
 *
 * 1. `cf-connecting-ip`, SEULEMENT si `TRUST_CF_CONNECTING_IP=1`. Le site n'est
 *    pas derrière Cloudflare, et Apache relaie cet en-tête tel que le client
 *    l'envoie : lu sans condition, il laisserait chacun se donner une IP au
 *    hasard à chaque requête et échapper à toute limite par visiteur (leads,
 *    rappels du calendrier, documents partagés). La variable ne s'allume que
 *    le jour où un proxy Cloudflare passe vraiment devant.
 * 2. le DERNIER membre de `x-forwarded-for`, et surtout pas le premier :
 *    Apache AJOUTE l'adresse du client qu'il voit à la fin de l'en-tête reçu.
 *    Un robot qui fabrique `x-forwarded-for: 1.2.3.4` obtient donc
 *    « 1.2.3.4, son adresse réelle ». Le premier membre est ce qu'il a écrit,
 *    le dernier est ce qu'Apache a constaté : seul le dernier est digne de
 *    confiance.
 *
 * Retourne null dès qu'on ne sait pas : l'appelant DOIT alors omettre
 * l'en-tête. Le transmettre vide ferait retomber le backend sur l'IP de notre
 * serveur, et son quota par IP deviendrait un quota unique pour tout Internet,
 * dix envois par minute pour la Terre entière.
 */
export function readVisitorIp(
  request: Pick<NextRequest, 'headers'>,
  trustCloudflare = process.env.TRUST_CF_CONNECTING_IP === '1'
): string | null {
  if (trustCloudflare) {
    const direct = request.headers.get('cf-connecting-ip')?.trim();
    if (direct && isIpAddress(direct)) return direct;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (!forwarded) return null;

  const chain = forwarded.split(',');
  const last = chain[chain.length - 1]?.trim();
  return last && isIpAddress(last) ? last : null;
}

/**
 * Clé d'un visiteur pour une limite qui compte par visiteur : l'IPv4 telle quelle, une IPv6
 * réduite à son /64, comme normalizeIpForRateLimit du backend. Un abonné reçoit un /64 entier :
 * une clé par adresse se contournerait en changeant d'adresse à chaque requête. Une IPv4 écrite
 * en IPv6 (::ffff:203.0.113.9) reste cette IPv4. Les adresses illisibles partagent une seule clé.
 */
export function visitorKey(ip: string | null): string {
  if (!ip) return 'ip-inconnue';
  if (!ip.includes(':')) return ip;

  const ipv4Tail = ip.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (ipv4Tail) return ipv4Tail[1];

  const halves = ip.toLowerCase().split('::');
  if (halves.length > 2) return 'ip-inconnue';
  const head = halves[0] ? halves[0].split(':') : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return 'ip-inconnue';

  const groups = [...head, ...Array<string>(halves.length === 2 ? missing : 0).fill('0'), ...tail];
  if (groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return 'ip-inconnue';

  return `${groups
    .slice(0, 4)
    .map((group) => parseInt(group, 16).toString(16))
    .join(':')}::/64`;
}
