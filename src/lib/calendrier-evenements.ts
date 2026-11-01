/**
 * Statistiques du calendrier marketing pour le super admin de l'app : visites,
 * copies, téléchargements, clics « Activer », « Déjà client », démo, thèmes.
 *
 * Le navigateur envoie ses événements par lots à /api/calendrier/evenements, qui les
 * relaie à l'API salon de l'app
 * (`POST /api/public-salon-flyer/{flyer_token}/calendar-events`, 1 à 20 par lot).
 * L'app refuse le lot ENTIER si un seul événement sort de ses listes (422) : chaque
 * événement est donc filtré ici, et seuls les champs du contrat partent (ni IP, ni
 * user agent, ni e-mail).
 *
 * Logique pure, testée sans réseau dans calendrier-evenements.test.ts.
 */
import { MJML_THEMES, TEMPS_FORT_CODES } from '@/data/calendrier-marketing';
import { salonFlyerBaseUrl } from './calendrier-rappel';

export const CALENDAR_EVENT_TYPES = [
  'page_view',
  'copy',
  'download',
  'activate_click',
  'client_click',
  'demo_click',
  'theme_change',
] as const;
export type CalendarEventType = (typeof CALENDAR_EVENT_TYPES)[number];

/** Événement tel que l'app l'accepte. */
export interface AppCalendarEvent {
  type: CalendarEventType;
  visit_id: string;
  temps_fort: string | null;
  theme: string | null;
  format: 'mjml' | 'html' | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  occurred_at?: string;
}

/** Taille maximale d'un lot, côté app. */
export const MAX_EVENTS_PER_BATCH = 20;

const VISIT_ID = /^[A-Za-z0-9_-]{8,64}$/;
const MAX_UTM = 100;

function oneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value);
}

/** Champ facultatif d'une liste fermée : absent → null ; hors liste → undefined (événement écarté). */
function optionalOf(list: readonly string[], value: unknown): string | null | undefined {
  if (value === null || value === undefined || value === '') return null;
  return oneOf(list, value) ? value : undefined;
}

function utm(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, MAX_UTM);
  return clean || null;
}

/** Date ISO de l'événement, réécrite par le site ; illisible → absente (l'app date à la réception). */
function occurredAt(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 40) return undefined;
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : undefined;
}

/** Un événement reçu du navigateur, ramené au contrat de l'app ; null s'il sort des listes. */
export function sanitizeCalendarEvent(raw: unknown): AppCalendarEvent | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Record<string, unknown>;
  if (!oneOf(CALENDAR_EVENT_TYPES, data.type)) return null;
  if (typeof data.visit_id !== 'string' || !VISIT_ID.test(data.visit_id)) return null;

  const tempsFort = optionalOf(TEMPS_FORT_CODES, data.temps_fort);
  const theme = optionalOf(MJML_THEMES, data.theme);
  const format = optionalOf(['mjml', 'html'], data.format) as AppCalendarEvent['format'] | undefined;
  if (tempsFort === undefined || theme === undefined || format === undefined) return null;
  if (data.type === 'theme_change' && !theme) return null;

  const event: AppCalendarEvent = {
    type: data.type,
    visit_id: data.visit_id,
    temps_fort: tempsFort,
    theme,
    format,
    utm_source: utm(data.utm_source),
    utm_medium: utm(data.utm_medium),
    utm_campaign: utm(data.utm_campaign),
  };
  const when = occurredAt(data.occurred_at);
  return when ? { ...event, occurred_at: when } : event;
}

/** Corps `{ events: [...] }` du navigateur : les événements valides, 20 au plus. */
export function parseCalendarEventsBody(body: unknown): AppCalendarEvent[] {
  const events = body && typeof body === 'object' ? (body as { events?: unknown }).events : undefined;
  if (!Array.isArray(events)) return [];
  return events
    .slice(0, MAX_EVENTS_PER_BATCH)
    .map(sanitizeCalendarEvent)
    .filter((event): event is AppCalendarEvent => event !== null);
}

/** Robots d'indexation et de supervision : jamais comptés. */
export function isBotUserAgent(userAgent: string | null): boolean {
  return /bot|crawler|spider/i.test(userAgent ?? '');
}

/** URL de l'API des événements de l'app, ou null si le relais n'est pas configuré. */
export function calendarEventsUrl(apiUrl: string | undefined, token: string | undefined): string | null {
  const base = salonFlyerBaseUrl(apiUrl, token);
  return base ? `${base}/calendar-events` : null;
}

/**
 * Lots relayés par IP visiteur : 120 sur 10 minutes. Large, car le Wi-Fi du salon et
 * les opérateurs mobiles mettent beaucoup de visiteurs derrière une même IP ; un lot
 * refusé n'est qu'une statistique perdue.
 */
export const EVENTS_LIMIT = { limit: 120, windowMs: 10 * 60 * 1000 } as const;
