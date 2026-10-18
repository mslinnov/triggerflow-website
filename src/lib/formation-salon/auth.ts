/**
 * Accès à la formation du stand Equip'Hôtel (/formation-salon).
 *
 * Un seul mot de passe partagé par l'équipe du salon : secret GitHub
 * FORMATION_SALON_PASSWORD, écrit dans .env.production.local par le déploiement.
 * Une fois saisi, un cookie garde l'accès 30 jours sur le téléphone.
 *
 * Le cookie ne contient pas le mot de passe : il porte un HMAC calculé AVEC le
 * mot de passe comme clé. Changer le secret invalide donc tous les cookies
 * déjà posés, sans liste de sessions à tenir côté serveur.
 */

export const COOKIE_NAME = 'tf_formation_salon';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

// Versionné : changer ce libellé déconnecte tout le monde sans toucher au secret.
const SESSION_MESSAGE = 'formation-salon:v1';

const encoder = new TextEncoder();

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Comparaison à temps constant. Les deux entrées sont des empreintes de même
 * longueur : la durée ne dépend pas de l'endroit où elles diffèrent.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function sessionToken(password: string): Promise<string> {
  return hmacHex(password, SESSION_MESSAGE);
}

export async function isValidSession(cookie: string | undefined, password: string): Promise<boolean> {
  if (!cookie) return false;
  return timingSafeEqual(cookie, await sessionToken(password));
}

/**
 * Le mot de passe saisi et le secret passent tous deux par la même empreinte
 * avant comparaison : la longueur du secret ne fuit pas par le temps de réponse.
 */
export async function isValidPassword(input: string, password: string): Promise<boolean> {
  const [given, expected] = await Promise.all([hmacHex(SESSION_MESSAGE, input), hmacHex(SESSION_MESSAGE, password)]);
  return timingSafeEqual(given, expected);
}
