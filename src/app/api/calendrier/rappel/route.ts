import { NextRequest, NextResponse } from 'next/server';
import { parseRappelBody, RAPPEL_LIMIT, relayOutcome, salonLeadUrl, SlidingWindowLimiter, toSalonPayload } from '@/lib/calendrier-rappel';
import { readVisitorIp, visitorKey } from '@/lib/visitor-ip';

/**
 * Formulaire « Être rappelé » du calendrier marketing : relaie la demande à l'API
 * salon de l'app, qui crée le prospect CRM rattaché à l'événement EquipHotel
 * (canal « flyer »). Voir src/lib/calendrier-rappel.ts.
 *
 * Variables d'exécution : TRIGGERFLOW_API_URL (déjà utilisée par /api/leads) et
 * CALENDRIER_SALON_FLYER_TOKEN (le `flyer_token` de l'événement). Sans elles, la
 * route répond 503 et le formulaire propose la démo : la page reste utilisable.
 */

// Le visiteur attend cette réponse : trois secondes, comme le relais des livres blancs.
const RELAY_TIMEOUT_MS = 3000;

// Par visiteur (IPv4, ou /64 d'une IPv6 : voir visitorKey) : voir SlidingWindowLimiter (l'app ne
// voit que l'IP du site).
const limiter = new SlidingWindowLimiter(RAPPEL_LIMIT.limit, RAPPEL_LIMIT.windowMs);

export async function POST(request: NextRequest) {
  const url = salonLeadUrl(process.env.TRIGGERFLOW_API_URL, process.env.CALENDRIER_SALON_FLYER_TOKEN);
  if (!url) {
    console.error('[calendrier-rappel] Relais non configuré (TRIGGERFLOW_API_URL ou CALENDRIER_SALON_FLYER_TOKEN)');
    return NextResponse.json({ success: false, error: 'unavailable' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = parseRappelBody(body);

  // Robot : succès apparent, rien n'est relayé.
  if (parsed.kind === 'bot') return NextResponse.json({ success: true });
  if (parsed.kind === 'invalid') {
    return NextResponse.json({ success: false, error: 'invalid', fields: parsed.fields }, { status: 400 });
  }

  // Compté après validation : une faute de frappe ne consomme pas le quota d'un humain.
  if (!limiter.allow(visitorKey(readVisitorIp(request)))) {
    return NextResponse.json({ success: false, error: 'busy' }, { status: 429 });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toSalonPayload(parsed.input)),
      signal: AbortSignal.timeout(RELAY_TIMEOUT_MS),
    });
    const outcome = relayOutcome(response.status);
    if (outcome === 'ok') return NextResponse.json({ success: true });

    console.error('[calendrier-rappel] Réponse de l’app :', response.status);
    const status = outcome === 'busy' ? 429 : outcome === 'invalid' ? 400 : 502;
    return NextResponse.json({ success: false, error: outcome }, { status });
  } catch (error) {
    console.error('[calendrier-rappel] Relais en échec :', error instanceof Error ? error.name : 'inconnu');
    return NextResponse.json({ success: false, error: 'error' }, { status: 502 });
  }
}
