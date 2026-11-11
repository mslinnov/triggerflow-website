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
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';
import { SlidingWindowLimiter } from './calendrier-rappel';
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
  /** PDF demandés par visiteur et par minute ; par défaut, celui du serveur. */
  limiter?: SlidingWindowLimiter;
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
 * Le visiteur est l'IPv4, ou le /64 d'une IPv6 (un abonné en reçoit 2^64). La limite par minute
 * (PDF_PER_VISITOR_PER_MINUTE, plus bas) compte, elle, les PDF demandés, terminés ou non.
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

/**
 * PDF demandés par visiteur et par minute (décision du 11/11/2026) ; au-delà, « réessayez ».
 * Compté avant de prendre une place, donc avant tout appel au backend : un même client ne fait
 * pas lire au backend plus de 30 PDF par minute, même un par un, quand le plafond de relais
 * simultanés ne borne que ceux qui se chevauchent.
 *
 * Limite connue, acceptée : une salle de salon entière derrière une seule adresse (le Wi-Fi du
 * stand) partage ces 30 PDF. Si elle scanne le QR code dans la même minute, la 31e personne
 * reçoit « réessayez » et passe la minute suivante.
 */
const PDF_PER_VISITOR_PER_MINUTE = 30;

const serverLimiter = new SlidingWindowLimiter(PDF_PER_VISITOR_PER_MINUTE, 60_000);

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
  // Limite et place passent AVANT d'appeler le backend : un lecteur refusé n'est pas compté. Les
  // adresses illisibles partagent une seule part.
  const visitor = visitorKey(ip);
  if (!(config.limiter ?? serverLimiter).allow(visitor)) {
    console.error('[doc] trop de PDF partagés demandés par un même visiteur');
    return failurePage(503);
  }
  const release = (config.gate ?? serverGate).tryAcquire(visitor);
  if (!release) {
    console.error('[doc] trop de PDF partagés en cours de relais');
    return failurePage(503);
  }

  let handedOff = false;
  try {
    const spooled = await fetchToDisk({ document, slug, request, ip, config, apiUrl, secret });
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

type BackendCall = {
  document: string;
  slug: string;
  request: Request;
  ip: string | null;
  config: RelayConfig;
  apiUrl: string;
  secret: string;
};

/**
 * Demande le PDF au backend et l'écrit en entier sur le disque ; une page d'échec sinon.
 *
 * Le fichier temporaire est créé AVANT l'appel : un dossier absent, plein ou sans droit
 * d'écriture refuse le lecteur sans rien demander au backend, qui compterait sinon une
 * ouverture jamais servie. Il est fermé ici sur tout échec, et confié au lecteur sinon.
 */
async function fetchToDisk({ document, slug, request, ip, config, apiUrl, secret }: BackendCall): Promise<Spooled | Response> {
  let file: FileHandle;
  try {
    file = await openTempFile(config.tmpDir ?? tmpdir());
  } catch {
    console.error('[doc] PDF partagé interrompu avant son relais (fichier temporaire impossible à créer)');
    return failurePage(503);
  }

  // Un lecteur parti (onglet fermé, réseau coupé) n'attend plus rien : l'appel au backend et la
  // lecture du fichier s'arrêtent avec lui, et sa place est rendue tout de suite.
  const controller = new AbortController();
  const leave = () => controller.abort();
  if (request.signal.aborted) leave();
  request.signal.addEventListener('abort', leave, { once: true });

  let handedOff = false;
  try {
    let timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 10_000);

    let upstream: Response;
    try {
      upstream = await (config.fetch ?? fetch)(`${apiUrl}/api/public-shared-document`, {
        method: 'POST',
        signal: controller.signal,
        // Une redirection renverrait le secret, tel quel, à l'adresse qu'elle désigne : le backend
        // n'en fait jamais, une réponse 3xx est une erreur.
        redirect: 'error',
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
      const size = await spoolCapped(upstream.body, file, maxBytes, controller.signal);
      if (size === null) {
        console.error("[doc] PDF partagé plus lourd que la limite d'envoi");
        return failurePage(503);
      }
      handedOff = true;
      return { file, size, disposition: upstream.headers.get('content-disposition') };
    } catch {
      console.error('[doc] PDF partagé interrompu avant son relais (lecture du backend ou écriture du disque)');
      return failurePage(503);
    } finally {
      clearTimeout(timeout);
    }
  } finally {
    request.signal.removeEventListener('abort', leave);
    if (!handedOff) await file.close().catch(() => undefined);
  }
}

/** Le corps d'une réponse écartée est annulé : sans cela, la connexion au backend reste tenue jusqu'au ramasse-miettes. */
async function discard(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => undefined);
}

/**
 * Un fichier temporaire, retiré de son dossier dès sa création : il ne vit que par son
 * descripteur et disparaît du disque à sa fermeture, quoi qu'il arrive (fin, abandon, erreur,
 * arrêt du site).
 */
async function openTempFile(dir: string): Promise<FileHandle> {
  const path = join(dir, `tf-doc-${randomUUID()}.pdf`);
  const file = await open(path, 'wx+', 0o600);
  try {
    await unlink(path);
  } catch (error) {
    await file.close().catch(() => undefined);
    throw error;
  }
  return file;
}

/**
 * Le corps du backend, écrit en entier dans `file` : sa taille, ou null s'il dépasse `max` (la
 * lecture s'arrête alors, sans tout écrire). Rejette quand `signal` est annulé (délai dépassé),
 * quelle que soit l'implémentation de fetch : l'annulation coupe la lecture en cours.
 *
 * Un seul écouteur pour tout le fichier, pas de course de promesses à chaque bloc : une
 * `Promise.race` contre une promesse d'annulation qui ne se règle jamais garde chaque bloc lu
 * en mémoire jusqu'au dernier, soit le fichier entier (26 Mo au pire par relais).
 */
async function spoolCapped(
  body: ReadableStream<Uint8Array>,
  file: FileHandle,
  max: number,
  signal: AbortSignal
): Promise<number | null> {
  const reader = body.getReader();
  const cancel = () => reader.cancel().catch(() => undefined);
  signal.addEventListener('abort', cancel, { once: true });
  let size = 0;

  try {
    for (;;) {
      if (signal.aborted) throw new Error('délai dépassé');
      const { done, value } = await reader.read();
      // Une lecture coupée par l'annulation se termine comme un fichier fini : elle ne compte pas.
      if (signal.aborted) throw new Error('délai dépassé');
      if (done) return size;
      if (size + value.byteLength > max) {
        await cancel();
        return null;
      }
      await writeAll(file, value, size);
      size += value.byteLength;
    }
  } catch (error) {
    await cancel();
    throw error;
  } finally {
    signal.removeEventListener('abort', cancel);
  }
}

/** Tout le bloc, à sa place : une écriture peut n'en prendre qu'une partie. */
async function writeAll(file: FileHandle, chunk: Uint8Array, position: number): Promise<void> {
  for (let offset = 0; offset < chunk.byteLength; ) {
    const { bytesWritten } = await file.write(chunk, offset, chunk.byteLength - offset, position + offset);
    // Rien d'écrit : le disque ne prend plus rien, inutile d'insister.
    if (bytesWritten <= 0) throw new Error('écriture impossible sur le disque');
    offset += bytesWritten;
  }
}

/**
 * Relais en cours de lecture par un lecteur, coupés à l'arrêt du site.
 *
 * Au redémarrage (systemctl restart du déploiement), Next ferme le serveur et attend la fin des
 * réponses en cours avant de quitter : un téléchargement lent le retiendrait jusqu'à 30 minutes,
 * et systemd finirait par tuer le processus. Les relais sont donc coupés dès SIGTERM : le lecteur
 * voit un téléchargement interrompu et rouvre le lien. Le site ne quitte pas lui-même (jamais de
 * process.exit) : Next sort, une fois ses réponses closes.
 */
const activeRelays = new Set<(reason: string) => void>();

/** Coupe tous les relais en cours : places et descripteurs rendus, lectures rejetées. */
export function stopActiveRelays(): void {
  for (const stop of [...activeRelays]) stop('arrêt du site');
}

let stopsWithServer = false;

/** Posé une fois, au premier relais servi : rien n'écoute SIGTERM tant qu'aucun PDF n'est relayé. */
function stopRelaysOnSigterm(): void {
  if (stopsWithServer) return;
  stopsWithServer = true;
  process.once('SIGTERM', () => {
    stopActiveRelays();
    // Sous next start, Next écoute aussi SIGTERM et quitte. Si personne d'autre n'écoute, le
    // signal est renvoyé pour garder l'arrêt par défaut, qu'un écouteur seul annulerait.
    if (process.listenerCount('SIGTERM') === 0) process.kill(process.pid, 'SIGTERM');
  });
}

/**
 * Le fichier relu par blocs, à la demande du lecteur : un lecteur lent ne retient qu'un bloc.
 * La place et le descripteur sont rendus à la fin, à l'abandon, sur erreur, quand le lecteur ne
 * demande plus rien pendant `idleMs` (délai réarmé à chaque bloc), passé `maxMs` en tout, ou à
 * l'arrêt du site.
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
  let stopRelay: ((reason: string) => void) | undefined;

  const finish = async () => {
    if (finished) return;
    finished = true;
    if (stopRelay) activeRelays.delete(stopRelay);
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
      stopRelay = (reason) => stop(controller, reason);
      activeRelays.add(stopRelay);
      stopRelaysOnSigterm();
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

/** Textes de la page d'échec : messages/{fr,en}.json, espace « sharedDocument ». */
const PAGES = { 404: 'notFound', 503: 'unavailable' } as const;

/**
 * Jetons de couleur de src/app/globals.css, recopiés tels quels : la page est autonome, elle ne
 * charge pas la feuille du site. Un test vérifie qu'ils n'en divergent pas.
 */
const COLORS = {
  '--surface-tertiary': '#EFF5F5',
  '--surface-primary': '#FFFFFF',
  '--text-primary': '#002B28',
  '--brand-primary': '#006F68',
  '--border-light': '#E5EEED',
  '--shadow-sm': '0 2px 8px rgba(0, 43, 40, 0.04)',
} as const;

const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Page sobre, en français puis en anglais : le lecteur peut être l'un ou l'autre. */
export function failurePage(status: 404 | 503): Response {
  const [frPage, enPage] = [fr, en].map(({ sharedDocument }) => {
    const { title, text } = sharedDocument[PAGES[status]];
    return { title: escapeHtml(title), text: escapeHtml(text) };
  });
  const tokens = Object.entries(COLORS)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ');
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${frPage.title}</title>
<style>
  :root { ${tokens} }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--surface-tertiary); color: var(--text-primary); font-family: system-ui, -apple-system, sans-serif; }
  main { max-width: 32rem; margin: 1.5rem; padding: 2rem; background: var(--surface-primary); border-radius: 1rem; box-shadow: var(--shadow-sm); }
  h1 { margin: 0 0 0.5rem; font-size: 1.25rem; color: var(--brand-primary); }
  p { margin: 0 0 1rem; line-height: 1.5; }
  hr { border: 0; border-top: 1px solid var(--border-light); margin: 1.5rem 0; }
  a { color: var(--brand-primary); }
</style>
</head>
<body>
<main>
  <h1>${frPage.title}</h1>
  <p>${frPage.text}</p>
  <hr>
  <h1 lang="en">${enPage.title}</h1>
  <p lang="en">${enPage.text}</p>
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
