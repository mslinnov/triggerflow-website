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
 *
 * Le fichier est lu en entier avant de répondre : relayé en flux, il avancerait
 * au rythme du lecteur, et un lecteur lent tiendrait un processus PHP du backend
 * pendant tout son téléchargement. Lu d'un coup entre les deux serveurs, il
 * libère PHP en une fraction de seconde ; le site, lui, sait attendre.
 */
import { readVisitorIp } from './visitor-ip';

export type RelayConfig = {
  apiUrl: string | undefined;
  secret: string | undefined;
  fetch?: typeof fetch;
  /** Délai pour recevoir les en-têtes du backend. */
  timeoutMs?: number;
  /** Délai pour recevoir le fichier ensuite, entre deux serveurs : large. */
  bodyTimeoutMs?: number;
  /** Au-delà, le fichier n'est pas relayé. */
  maxBytes?: number;
};

const NO_INDEX = 'noindex, nofollow, noarchive, nosnippet';

// Limite d'envoi du CRM (25 Mo, ReplaceSharedDocumentFileRequest::MAX_KB), plus une marge.
const MAX_PDF_BYTES = 26 * 1024 * 1024;

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
  let timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 10_000);

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
    clearTimeout(timeout);
    console.error('[doc] backend injoignable pour un PDF partagé');
    return failurePage(503);
  }
  clearTimeout(timeout);

  if (upstream.status === 404) {
    await discard(upstream);
    return failurePage(404);
  }

  // Jamais autre chose qu'un PDF sous cette adresse, même si le backend se trompe.
  const maxBytes = config.maxBytes ?? MAX_PDF_BYTES;
  const isPdf = upstream.headers.get('content-type')?.toLowerCase().startsWith('application/pdf');
  const announced = Number(upstream.headers.get('content-length') ?? 0);
  if (!upstream.ok || !isPdf || !upstream.body || announced > maxBytes) {
    await discard(upstream);
    console.error(`[doc] réponse inattendue du backend pour un PDF partagé : ${upstream.status}`);
    return failurePage(503);
  }

  timeout = setTimeout(() => controller.abort(), config.bodyTimeoutMs ?? 30_000);
  let file: Uint8Array<ArrayBuffer> | null;
  try {
    file = await readCapped(upstream.body, maxBytes, controller.signal);
  } catch {
    console.error('[doc] PDF partagé interrompu pendant sa lecture');
    return failurePage(503);
  } finally {
    clearTimeout(timeout);
  }
  if (!file) {
    console.error('[doc] PDF partagé plus lourd que la limite d\'envoi');
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
    'Content-Length': String(file.byteLength),
  });

  return new Response(file, { status: 200, headers });
}

/** Le corps d'une réponse écartée est annulé : sans cela, la connexion au backend reste tenue jusqu'au ramasse-miettes. */
async function discard(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => undefined);
}

/**
 * Le fichier en entier, ou null s'il dépasse `max` (la lecture s'arrête alors, sans tout charger).
 * Rejette quand `signal` est annulé (délai dépassé), quelle que soit l'implémentation de fetch.
 */
async function readCapped(body: ReadableStream<Uint8Array>, max: number, signal: AbortSignal): Promise<Uint8Array<ArrayBuffer> | null> {
  const reader = body.getReader();
  const aborted = new Promise<never>((_, reject) => {
    signal.addEventListener('abort', () => reject(new Error('délai dépassé')), { once: true });
  });
  aborted.catch(() => undefined);
  const chunks: Uint8Array[] = [];
  let size = 0;

  try {
    for (;;) {
      const { done, value } = await Promise.race([reader.read(), aborted]);
      if (done) break;
      size += value.byteLength;
      if (size > max) {
        await reader.cancel().catch(() => undefined);
        return null;
      }
      chunks.push(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  }

  const file = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    file.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return file;
}

// RFC 8187 : charset'langue'valeur, la valeur ne portant que des caractères sûrs ou %XX.
const EXT_VALUE = /^[A-Za-z0-9!#$&+^_`{}~-]+'[A-Za-z0-9-]*'(?:[A-Za-z0-9!#$&+.^_`|~-]|%[0-9A-Fa-f]{2})+$/;

/**
 * `inline` toujours : le PDF s'ouvre dans le navigateur, qui propose de le télécharger.
 * Seul le nom encodé (filename*) suit : il ne contient ni « ; » ni guillemet, qu'un libellé
 * comme « Offre ; groupes » glisserait dans le nom simple et qui casseraient l'en-tête.
 */
function inlineDisposition(upstream: string | null): string {
  if (!upstream || /[\r\n]/.test(upstream)) return 'inline';

  const encoded = /filename\*\s*=\s*([^;\s]+)/i.exec(upstream)?.[1];
  if (encoded && EXT_VALUE.test(encoded)) return `inline; filename*=${encoded}`;

  const plain = /filename\s*=\s*(?:"((?:[^"\\]|\\.)*)"|([^;\s]+))/i.exec(upstream);
  const name = plain ? (plain[1] ?? plain[2]).replace(/\\(.)/g, '$1') : '';
  return name ? `inline; filename*=UTF-8''${encodeExtValue(name)}` : 'inline';
}

function encodeExtValue(value: string): string {
  return encodeURIComponent(value).replace(/['()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
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
