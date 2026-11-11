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
 * libère PHP en une fraction de seconde.
 *
 * Il attend ensuite sur le DISQUE, pas en mémoire : relu par blocs au rythme du
 * lecteur, il ne coûte que quelques dizaines de Ko de mémoire par
 * téléchargement, quelle que soit la lenteur du client (le serveur du site, 4 Go,
 * est partagé). Le nombre de relais simultanés est borné, et avec lui le disque
 * occupé ; au-delà, « réessayez dans quelques minutes ».
 */
import { randomUUID } from 'node:crypto';
import { open, unlink, type FileHandle } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readVisitorIp, visitorKey } from './visitor-ip';

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
  /** Relais simultanés ; par défaut, celui du serveur. */
  gate?: RelayGate;
  /** Dossier du fichier temporaire ; par défaut, celui du système. */
  tmpDir?: string;
  /** Un lecteur qui ne demande plus rien pendant ce délai rend sa place. */
  idleMs?: number;
  /** Au-delà, même un lecteur actif rend sa place. */
  maxRelayMs?: number;
};

const NO_INDEX = 'noindex, nofollow, noarchive, nosnippet';

// Limite d'envoi du CRM (25 Mo, ReplaceSharedDocumentFileRequest::MAX_KB), plus une marge.
const MAX_PDF_BYTES = 26 * 1024 * 1024;

// Bloc relu du disque à chaque demande du lecteur : c'est toute la mémoire d'un téléchargement.
const CHUNK_BYTES = 64 * 1024;

/**
 * Plafond de relais simultanés, du fichier écrit au dernier octet reçu par le lecteur : en tout,
 * et par visiteur.
 *
 * 50 en tout : une salle de salon qui scanne un QR code télécharge à quelques dizaines à la fois.
 * Au pire, 50 × 26 Mo = 1,3 Go de disque temporaire, rendu à la fin de chaque téléchargement, et
 * 50 × 64 Ko de mémoire. Une rafale au-delà reçoit « réessayez », au lieu d'emporter le serveur.
 *
 * 25 par visiteur, la moitié du total : un seul client ne prend jamais toutes les places, et
 * une salle derrière un même Wi-Fi passe. Trente personnes qui scannent le QR code d'un stand
 * le font en quelques secondes, pas dans le même dixième de seconde, et un PDF de 15 Mo arrive
 * en quelques secondes sur un Wi-Fi de salon : elles se chevauchent par dizaines, pas par trente.
 * Le visiteur est l'IPv4, ou le /64 d'une IPv6 (un abonné en reçoit 2^64).
 */
export class RelayGate {
  private active = 0;
  // Au plus une entrée par relais en cours : bornée par `max`.
  private readonly perVisitor = new Map<string, number>();

  constructor(
    private readonly max: number,
    private readonly maxPerVisitor = max
  ) {}

  /** Une place, et la fonction qui la rend (une seule fois) ; null si tout est pris. */
  tryAcquire(visitor: string): (() => void) | null {
    const mine = this.perVisitor.get(visitor) ?? 0;
    if (this.active >= this.max || mine >= this.maxPerVisitor) return null;
    this.active += 1;
    this.perVisitor.set(visitor, mine + 1);
    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.active -= 1;
      const left = (this.perVisitor.get(visitor) ?? 1) - 1;
      if (left > 0) this.perVisitor.set(visitor, left);
      else this.perVisitor.delete(visitor);
    };
  }

  get size(): number {
    return this.active;
  }
}

const serverGate = new RelayGate(50, 25);

// Mêmes précautions que le comptage du Parcours : barre finale retirée, secret
// sans retour à la ligne. Le secret ne sort jamais du serveur du site.
export function relayConfigFromEnv(): RelayConfig {
  return {
    apiUrl: process.env.TRIGGERFLOW_API_URL?.trim().replace(/\/+$/, ''),
    secret: process.env.DOCUMENT_VIEW_SECRET?.trim(),
    tmpDir: process.env.SHARED_PDF_TMP_DIR?.trim() || undefined,
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
  // La place est prise AVANT d'appeler le backend : un lecteur refusé n'est pas compté. Les
  // adresses illisibles partagent une seule part.
  const release = (config.gate ?? serverGate).tryAcquire(visitorKey(ip));
  if (!release) {
    console.error('[doc] trop de PDF partagés en cours de relais');
    return failurePage(503);
  }

  let handedOff = false;
  try {
    const spooled = await fetchToDisk(document, slug, request, ip, config, apiUrl, secret);
    if (spooled instanceof Response) return spooled;

    // Liste fermée des en-têtes relayés : rien du backend (cookies, serveur) ne fuit vers le lecteur.
    const headers = new Headers({
      'Content-Type': 'application/pdf',
      'Content-Disposition': inlineDisposition(spooled.disposition),
      // Chaque ouverture repasse par le backend, donc compte ; aucun cache partagé ne garde le fichier.
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': NO_INDEX,
      'Referrer-Policy': 'no-referrer',
      'Content-Length': String(spooled.size),
    });

    handedOff = true;
    const limits = { idleMs: config.idleMs ?? 60_000, maxMs: config.maxRelayMs ?? 30 * 60_000 };
    return new Response(streamFromDisk(spooled.file, release, limits), { status: 200, headers });
  } finally {
    if (!handedOff) release();
  }
}

type Spooled = { file: FileHandle; size: number; disposition: string | null };

/** Demande le PDF au backend et l'écrit en entier sur le disque ; une page d'échec sinon. */
async function fetchToDisk(
  document: string,
  slug: string,
  request: Request,
  ip: string | null,
  config: RelayConfig,
  apiUrl: string,
  secret: string
): Promise<Spooled | Response> {
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
  try {
    const spooled = await spoolCapped(upstream.body, maxBytes, controller.signal, config.tmpDir ?? tmpdir());
    if (!spooled) {
      console.error("[doc] PDF partagé plus lourd que la limite d'envoi");
      return failurePage(503);
    }
    return { ...spooled, disposition: upstream.headers.get('content-disposition') };
  } catch {
    console.error('[doc] PDF partagé interrompu avant son relais (lecture du backend ou écriture du disque)');
    return failurePage(503);
  } finally {
    clearTimeout(timeout);
  }
}

/** Le corps d'une réponse écartée est annulé : sans cela, la connexion au backend reste tenue jusqu'au ramasse-miettes. */
async function discard(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => undefined);
}

/**
 * Le fichier en entier, écrit sur le disque ; null s'il dépasse `max` (la lecture s'arrête
 * alors, sans tout écrire). Rejette quand `signal` est annulé (délai dépassé), quelle que soit
 * l'implémentation de fetch.
 *
 * Le fichier est retiré de son dossier dès sa création : il ne vit que par son descripteur et
 * disparaît du disque à sa fermeture, quoi qu'il arrive (fin, abandon, erreur, arrêt du site).
 */
async function spoolCapped(
  body: ReadableStream<Uint8Array>,
  max: number,
  signal: AbortSignal,
  dir: string
): Promise<{ file: FileHandle; size: number } | null> {
  const reader = body.getReader();
  const aborted = new Promise<never>((_, reject) => {
    signal.addEventListener('abort', () => reject(new Error('délai dépassé')), { once: true });
  });
  aborted.catch(() => undefined);

  const path = join(dir, `tf-doc-${randomUUID()}.pdf`);
  let file: FileHandle | null = null;
  let size = 0;

  try {
    file = await open(path, 'wx+', 0o600);
    await unlink(path);

    for (;;) {
      const { done, value } = await Promise.race([reader.read(), aborted]);
      if (done) return { file, size };
      size += value.byteLength;
      if (size > max) {
        await reader.cancel().catch(() => undefined);
        await file.close();
        return null;
      }
      await file.write(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    await file?.close().catch(() => undefined);
    await unlink(path).catch(() => undefined);
    throw error;
  }
}

/**
 * Le fichier relu par blocs, à la demande du lecteur : un lecteur lent ne retient qu'un bloc.
 * La place et le descripteur sont rendus à la fin, à l'abandon, sur erreur, quand le lecteur ne
 * demande plus rien pendant `idleMs` (délai réarmé à chaque bloc), ou passé `maxMs` en tout.
 *
 * 60 s sans demander de bloc : le lecteur est parti sans fermer, ou ne lit plus. 30 min en tout :
 * 26 Mo à 120 kbit/s, sous un mauvais réseau mobile ; un lecteur plus lent encore garderait
 * sinon sa place des heures en lisant un bloc par minute.
 */
function streamFromDisk(
  file: FileHandle,
  release: () => void,
  { idleMs, maxMs }: { idleMs: number; maxMs: number }
): ReadableStream<Uint8Array> {
  let position = 0;
  let finished = false;
  let idle: ReturnType<typeof setTimeout> | undefined;
  let total: ReturnType<typeof setTimeout> | undefined;

  const finish = async () => {
    if (finished) return;
    finished = true;
    clearTimeout(idle);
    clearTimeout(total);
    release();
    await file.close().catch(() => undefined);
  };

  const stop = (controller: ReadableStreamDefaultController<Uint8Array>, reason: string) => {
    void finish();
    try {
      controller.error(new Error(reason));
    } catch {
      // Déjà fermé.
    }
  };

  // Les gardes seuls ne retiennent pas le processus (arrêt du site, fin des tests).
  const arm = (ms: number, onTimeout: () => void) => {
    const timer = setTimeout(onTimeout, ms);
    timer.unref?.();
    return timer;
  };

  return new ReadableStream<Uint8Array>({
    start(controller) {
      total = arm(maxMs, () => stop(controller, 'téléchargement trop long'));
      idle = arm(idleMs, () => stop(controller, 'lecteur inactif'));
    },
    async pull(controller) {
      clearTimeout(idle);
      try {
        const buffer = new Uint8Array(CHUNK_BYTES);
        const { bytesRead } = await file.read(buffer, 0, CHUNK_BYTES, position);
        if (bytesRead === 0) {
          await finish();
          controller.close();
          return;
        }
        position += bytesRead;
        controller.enqueue(buffer.subarray(0, bytesRead));
        // Réarmé une fois le bloc remis : le délai court jusqu'à la demande suivante.
        if (!finished) idle = arm(idleMs, () => stop(controller, 'lecteur inactif'));
      } catch (error) {
        await finish();
        controller.error(error);
      }
    },
    async cancel() {
      await finish();
    },
  });
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
