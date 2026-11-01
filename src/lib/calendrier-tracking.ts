/**
 * Suivi des actions du calendrier marketing. Un seul point d'envoi pour tous les boutons :
 * - GA4 (consentement respecté : `window.gtag` n'existe qu'une fois gtag.js autorisé) ;
 * - statistiques du super admin de l'app : événements mis en file et envoyés par lots
 *   à /api/calendrier/evenements, qui les relaie (src/lib/calendrier-evenements.ts).
 *
 * Rien ici ne doit casser la page ni un bouton : tout échec est avalé.
 */
import { getAttribution } from './attribution';

export interface CalendarEvents {
  calendar_copy: { temps_fort: string; format: 'text' | 'mjml' | 'html'; theme?: string };
  calendar_download: { temps_fort: string; format: 'mjml' | 'html'; theme: string };
  calendar_activate: { temps_fort: string; destination: 'page' | 'app'; theme?: string };
}

export type CalendarStatType = 'page_view' | 'copy' | 'download' | 'activate_click' | 'client_click' | 'demo_click' | 'theme_change';

/** Une action, sans le contexte de la visite. `page_view` avec temps fort = ouverture d'un temps fort. */
export interface CalendarStat {
  type: CalendarStatType;
  temps_fort?: string | null;
  theme?: string | null;
  format?: 'mjml' | 'html' | null;
}

/** Visite : identifiant aléatoire et UTM de son arrivée, le temps de l'onglet (sessionStorage). */
export interface CalendarVisit {
  visit_id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const ENDPOINT = '/api/calendrier/evenements';
const VISIT_KEY = 'tf_calendrier_visite';
const MAX_BATCH = 20;
const FLUSH_DELAY_MS = 2000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

export function trackCalendarEvent<E extends keyof CalendarEvents>(event: E, params: CalendarEvents[E]): void {
  // Paramètres absents retirés : GA4 ne reçoit pas de `theme` vide.
  const sent = Object.fromEntries(Object.entries(params).filter(([, value]) => value));
  window.gtag?.('event', event, sent);
  recordCalendarStat(calendarStatFor(event, params));
}

/** L'événement GA4 traduit pour l'app : un modèle texte n'a pas de format, « Déjà client » est `client_click`. */
export function calendarStatFor(
  event: keyof CalendarEvents,
  params: { temps_fort: string; format?: string; theme?: string; destination?: string },
): CalendarStat {
  const type: CalendarStatType =
    event === 'calendar_copy' ? 'copy' : event === 'calendar_download' ? 'download' : params.destination === 'page' ? 'activate_click' : 'client_click';
  const format = params.format === 'mjml' || params.format === 'html' ? params.format : null;
  return { type, temps_fort: params.temps_fort, theme: params.theme ?? null, format };
}

/** UUID v4, y compris hors contexte sécurisé (crypto.randomUUID absent). */
export function uuidV4(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * La visite de l'onglet, créée au premier événement : UTM de l'URL d'arrivée (sinon de
 * l'attribution connue), figés pour tous les événements de la visite. Stockage refusé
 * (navigation privée, quota) : visite gardée en mémoire, le temps de la page.
 */
export function loadOrCreateVisit(
  storage: Pick<Storage, 'getItem' | 'setItem'> | null,
  search: string,
  fallbackUtm: Partial<Record<(typeof UTM_KEYS)[number], string>> | null = null,
  newId: () => string = uuidV4,
): CalendarVisit {
  try {
    const stored = JSON.parse(storage?.getItem(VISIT_KEY) ?? 'null') as CalendarVisit | null;
    if (stored && typeof stored.visit_id === 'string') return stored;
  } catch {
    // Illisible ou refusé : nouvelle visite.
  }
  const params = new URLSearchParams(search);
  const visit: CalendarVisit = {
    visit_id: newId(),
    ...(Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key)?.trim() || fallbackUtm?.[key] || null])) as Omit<CalendarVisit, 'visit_id'>),
  };
  try {
    storage?.setItem(VISIT_KEY, JSON.stringify(visit));
  } catch {
    // Stockage refusé : la visite vit en mémoire.
  }
  return visit;
}

export interface StatsTransport {
  /** Envoi ordinaire (fetch keepalive). */
  post(body: string): void;
  /** Envoi de sortie de page (sendBeacon) ; false s'il n'a pas été accepté. */
  beacon(body: string): boolean;
}

/**
 * File des événements : un lot part au 20e événement, ou 2 s après le premier en
 * attente ; `flush(true)` vide tout à la sortie de la page (sendBeacon, sinon fetch).
 */
export function createStatsQueue(transport: StatsTransport, schedule: (run: () => void, ms: number) => () => void) {
  let queue: object[] = [];
  let cancel: (() => void) | null = null;

  function flush(leaving = false): void {
    cancel?.();
    cancel = null;
    while (queue.length > 0) {
      const body = JSON.stringify({ events: queue.slice(0, MAX_BATCH) });
      queue = queue.slice(MAX_BATCH);
      try {
        if (!(leaving && transport.beacon(body))) transport.post(body);
      } catch {
        // Lot perdu : une statistique en moins, jamais une erreur dans la page.
      }
    }
  }

  return {
    push(event: object): void {
      queue.push(event);
      if (queue.length >= MAX_BATCH) flush();
      else cancel ??= schedule(() => flush(), FLUSH_DELAY_MS);
    },
    flush,
  };
}

let memoryVisit: CalendarVisit | null = null;
let browserQueue: ReturnType<typeof createStatsQueue> | null = null;

function sessionStore(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function getBrowserQueue(): ReturnType<typeof createStatsQueue> {
  if (browserQueue) return browserQueue;
  const queue = createStatsQueue(
    {
      post: (body) => {
        void fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => undefined);
      },
      beacon: (body) => typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(ENDPOINT, body),
    },
    (run, ms) => {
      const timer = window.setTimeout(run, ms);
      return () => window.clearTimeout(timer);
    },
  );
  // Sortie de page (lien suivi, onglet fermé ou mis en arrière-plan) : rien ne reste en file.
  window.addEventListener('pagehide', () => queue.flush(true));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') queue.flush(true);
  });
  browserQueue = queue;
  return queue;
}

/** Met une action en file pour les statistiques de l'app (GA4 non concerné). */
export function recordCalendarStat(stat: CalendarStat): void {
  try {
    if (typeof window === 'undefined') return;
    // Lue une fois par page (sessionStorage la transmet aux pages suivantes de l'onglet) :
    // un stockage qui refuse l'écriture ne crée pas une visite par événement.
    const visit = (memoryVisit ??= loadOrCreateVisit(sessionStore(), window.location.search, getAttribution()));
    getBrowserQueue().push({
      type: stat.type,
      ...visit,
      temps_fort: stat.temps_fort ?? null,
      theme: stat.theme ?? null,
      format: stat.format ?? null,
      occurred_at: new Date().toISOString(),
    });
  } catch {
    // Jamais d'erreur dans la page pour une statistique.
  }
}
