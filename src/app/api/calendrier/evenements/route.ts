import { NextRequest, NextResponse } from 'next/server';
import { calendarEventsUrl, EVENTS_LIMIT, isBotUserAgent, parseCalendarEventsBody } from '@/lib/calendrier-evenements';
import { SlidingWindowLimiter } from '@/lib/calendrier-rappel';
import { readVisitorIp } from '@/lib/visitor-ip';

/**
 * Statistiques du calendrier marketing : relaie à l'app les lots d'événements du
 * navigateur (src/lib/calendrier-tracking.ts), filtrés selon le contrat de l'app
 * (src/lib/calendrier-evenements.ts). Le jeton du salon ne part jamais dans le navigateur.
 *
 * Répond toujours 202 : le navigateur n'attend rien (sendBeacon, fetch keepalive) et
 * une statistique perdue ne doit rien changer pour le visiteur. Robots, lots vides,
 * relais non configuré (TRIGGERFLOW_API_URL, CALENDRIER_SALON_FLYER_TOKEN, comme le
 * rappel) ou limite atteinte : rien n'est relayé.
 */

const RELAY_TIMEOUT_MS = 3000;

// Par IP visiteur : l'app ne voit que l'IP du site (voir SlidingWindowLimiter).
const limiter = new SlidingWindowLimiter(EVENTS_LIMIT.limit, EVENTS_LIMIT.windowMs);

// Un même incident (jeton fermé, relais absent) ne remplit pas le journal : une ligne par heure.
const LOG_EVERY_MS = 60 * 60 * 1000;
const lastLogged = new Map<string, number>();
function logOnce(key: string, message: string): void {
  const now = Date.now();
  if (now - (lastLogged.get(key) ?? -Infinity) < LOG_EVERY_MS) return;
  lastLogged.set(key, now);
  console.error(`[calendrier-evenements] ${message}`);
}

const accepted = () => new NextResponse(null, { status: 202 });

export async function POST(request: NextRequest) {
  if (isBotUserAgent(request.headers.get('user-agent'))) return accepted();

  const url = calendarEventsUrl(process.env.TRIGGERFLOW_API_URL, process.env.CALENDRIER_SALON_FLYER_TOKEN);
  if (!url) {
    logOnce('config', 'Relais non configuré (TRIGGERFLOW_API_URL ou CALENDRIER_SALON_FLYER_TOKEN)');
    return accepted();
  }

  // sendBeacon envoie le JSON en text/plain : lu tel quel, quel que soit le Content-Type.
  const events = parseCalendarEventsBody(await request.json().catch(() => null));
  if (events.length === 0) return accepted();
  if (!limiter.allow(readVisitorIp(request) ?? 'ip-inconnue')) return accepted();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ events }),
      signal: AbortSignal.timeout(RELAY_TIMEOUT_MS),
    });
    // 429 : l'app est saturée, la statistique est abandonnée sans réessai.
    if (!response.ok && response.status !== 429) logOnce(`status-${response.status}`, `Réponse de l’app : ${response.status}`);
  } catch (error) {
    logOnce('error', `Relais en échec : ${error instanceof Error ? error.name : 'inconnu'}`);
  }
  return accepted();
}
