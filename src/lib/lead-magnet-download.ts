/**
 * Lien de téléchargement immédiat d'un livre blanc.
 *
 * Le backend TriggerFlow répond 201 à une captation avec un `download_url` :
 * un lien compté de son raccourcisseur (`https://t-f.co/<slug>`), qui redirige
 * vers le PDF et compte le clic dans le funnel du guide. La route `/api/leads`
 * le transmet au navigateur, qui l'affiche en bouton à l'écran de succès.
 *
 * ─── UN SEUL DOMAINE ACCEPTÉ ─────────────────────────────────────────────
 * Ce lien finit dans un `href` cliqué par le visiteur. Seule une URL https sur
 * le domaine exact des liens comptés passe : ni sous-domaine, ni port, ni
 * identifiants, ni autre schéma. Tout autre valeur, même venue de notre propre
 * backend, est écartée : un écran de succès sans bouton vaut mieux qu'un lien
 * vers on ne sait où. Le même contrôle est refait dans le navigateur.
 */

/** Domaine des liens comptés du backend (`RedirectLink::REDIRECT_BASE_URL`). */
export const TRACKED_LINK_HOST = 't-f.co';

const MAX_URL_LENGTH = 2048;

/** Le lien s'il est un lien compté du backend en https, sinon null. */
export function safeDownloadUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > MAX_URL_LENGTH) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || url.hostname !== TRACKED_LINK_HOST) return null;
  if (url.port || url.username || url.password) return null;
  return url.href;
}

/** Lit le `download_url` d'une réponse du backend : seulement sur un succès, seulement s'il est sûr. */
export async function readDownloadUrl(response: Response): Promise<string | null> {
  if (!response.ok) return null;

  const payload: unknown = await response.json().catch(() => null);
  if (!payload || typeof payload !== 'object') return null;
  return safeDownloadUrl((payload as { download_url?: unknown }).download_url);
}
