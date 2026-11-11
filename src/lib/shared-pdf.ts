/**
 * PDF partagés depuis le CRM, servis à /doc/<clé>/<suffixe>.
 *
 * Le fichier vit dans TriggerFlow, jamais sur le site : la route le demande au
 * backend, qui vérifie que le suffixe a été émis, compte l'ouverture et rend le
 * PDF dans le même appel. Le site le relaie tel quel. Aucune autre adresse ne
 * sert le fichier, et une page introuvable ne compte rien.
 *
 * Contrairement au Parcours (compté en tâche de fond, page servie quoi qu'il
 * arrive), le PDF dépend du backend : sans lui, le lecteur obtient une page
 * « momentanément indisponible », jamais une page blanche.
 */
import { readVisitorIp } from './visitor-ip';

export type RelayConfig = {
  apiUrl: string | undefined;
  secret: string | undefined;
  fetch?: typeof fetch;
  /** Délai pour recevoir la réponse du backend ; le transfert du fichier, lui, n'est pas borné. */
  timeoutMs?: number;
};

const NO_INDEX = 'noindex, nofollow, noarchive, nosnippet';

// Mêmes précautions que le comptage du Parcours : barre finale retirée, secret
// sans retour à la ligne. Le secret ne sort jamais du serveur du site.
export function relayConfigFromEnv(): RelayConfig {
  return {
    apiUrl: process.env.TRIGGERFLOW_API_URL?.trim().replace(/\/+$/, ''),
    secret: process.env.DOCUMENT_VIEW_SECRET?.trim(),
  };
}

export async function relaySharedPdf(
  document: string,
  slug: string,
  request: Request,
  config: RelayConfig = relayConfigFromEnv()
): Promise<Response> {
  const { apiUrl, secret } = config;
  // Le secret ne part que sur un canal chiffré (ou vers la machine elle-même, en local).
  if (!apiUrl || !secret || !(apiUrl.startsWith('https://') || apiUrl.startsWith('http://localhost'))) {
    console.error('[doc] relais des PDF non configuré');
    return failurePage(503);
  }

  const ip = readVisitorIp(request);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 10_000);

  let upstream: Response;
  try {
    upstream = await (config.fetch ?? fetch)(`${apiUrl}/api/public-shared-document`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/pdf, application/json',
        'X-TF-Doc-Secret': secret,
        // Omis quand l'adresse est inconnue : posé vide, il ferait retomber le
        // backend sur l'adresse de notre serveur, et tous les lecteurs seraient
        // regroupés en un seul.
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
    console.error('[doc] backend injoignable pour un PDF partagé');
    return failurePage(503);
  } finally {
    clearTimeout(timeout);
  }

  if (upstream.status === 404) return failurePage(404);

  // Jamais autre chose qu'un PDF sous cette adresse, même si le backend se trompe.
  const isPdf = upstream.headers.get('content-type')?.toLowerCase().startsWith('application/pdf');
  if (!upstream.ok || !isPdf || !upstream.body) {
    console.error(`[doc] réponse inattendue du backend pour un PDF partagé : ${upstream.status}`);
    return failurePage(503);
  }

  // Liste fermée des en-têtes relayés : rien du backend (cookies, serveur) ne fuit vers le lecteur.
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': inlineDisposition(upstream.headers.get('content-disposition')),
    // Chaque ouverture repasse par le backend, donc compte ; aucun cache partagé ne garde le fichier.
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': NO_INDEX,
    'Referrer-Policy': 'no-referrer',
  });
  const length = upstream.headers.get('content-length');
  if (length && /^\d+$/.test(length)) headers.set('Content-Length', length);

  return new Response(upstream.body, { status: 200, headers });
}

/** `inline` toujours : le PDF s'ouvre dans le navigateur, qui propose de le télécharger. Le nom du fichier suit. */
function inlineDisposition(upstream: string | null): string {
  if (!upstream || /[\r\n]/.test(upstream)) return 'inline';
  const filenames = upstream
    .split(';')
    .slice(1)
    .map((part) => part.trim())
    .filter((part) => /^filename\*?=/i.test(part));

  return ['inline', ...filenames].join('; ');
}

const PAGES = {
  404: {
    fr: ['Document introuvable', "Ce lien ne mène à aucun document, ou le document n'est plus partagé. Si vous l'avez reçu par e-mail, répondez à son expéditeur pour en obtenir un nouveau."],
    en: ['Document not found', 'This link does not lead to a document, or the document is no longer shared. If you received it by email, reply to the sender to get a new one.'],
  },
  503: {
    fr: ['Document momentanément indisponible', 'Réessayez dans quelques minutes.'],
    en: ['Document temporarily unavailable', 'Please try again in a few minutes.'],
  },
} as const;

/** Page sobre, en français puis en anglais : le lecteur peut être l'un ou l'autre. */
export function failurePage(status: 404 | 503): Response {
  const { fr, en } = PAGES[status];
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${fr[0]}</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f4f8f8; color: #1f2937; font-family: system-ui, -apple-system, sans-serif; }
  main { max-width: 32rem; margin: 1.5rem; padding: 2rem; background: #fff; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); }
  h1 { margin: 0 0 0.5rem; font-size: 1.25rem; color: #006f68; }
  p { margin: 0 0 1rem; line-height: 1.5; }
  hr { border: 0; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
  a { color: #006f68; }
</style>
</head>
<body>
<main>
  <h1>${fr[0]}</h1>
  <p>${fr[1]}</p>
  <hr>
  <h1 lang="en">${en[0]}</h1>
  <p lang="en">${en[1]}</p>
  <p><a href="https://www.trigger-flow.com/">trigger-flow.com</a></p>
</main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': NO_INDEX,
      ...(status === 503 ? { 'Retry-After': '120' } : {}),
    },
  });
}
