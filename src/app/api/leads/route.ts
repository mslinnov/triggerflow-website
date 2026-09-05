import { NextRequest, NextResponse } from 'next/server';

/**
 * Réception des leads des landing pages d'acquisition (Facebook Ads).
 *
 * 1. Crée / met à jour le contact dans une liste Brevo dédiée, avec les
 *    attributs de qualification (hôtel, chambres, PMS, potentiel estimé).
 * 2. Notifie l'équipe par email transactionnel pour un rappel à chaud.
 *
 * Calqué sur src/app/api/newsletter/route.ts (même validation, même honeypot,
 * même traitement du contact déjà existant).
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LEADS_LIST_ID = Number(process.env.BREVO_LEADS_LIST_ID) || 0;
const LEADS_NOTIFICATION_EMAIL = process.env.LEADS_NOTIFICATION_EMAIL;
const NOTIFICATION_SENDER = { name: 'TriggerFlow Site', email: 'noreply@trigger-flow.com' };

const MAX_TEXT_LENGTH = 120;

interface LeadBody {
  email: string;
  firstName?: string;
  hotelName?: string;
  rooms?: number;
  phone?: string;
  pms?: string;
  /** Potentiel mensuel estimé par le simulateur, en euros. */
  estimatedRevenue?: number;
  /** Identifiant de la landing page source (ex. « fb-upsell »). */
  source?: string;
  /** Offre de conversion testée : « demo » ou « whitepaper ». */
  goal?: string;
  locale?: string;
  honeypot?: string;
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_TEXT_LENGTH);
}

function sanitizeNumber(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.round(parsed);
}

/**
 * Notifie l'équipe. Best-effort : un échec d'envoi ne doit jamais faire perdre
 * le lead, qui est déjà enregistré dans Brevo à ce stade.
 */
async function notifyTeam(lead: Record<string, string>): Promise<void> {
  if (!BREVO_API_KEY || !LEADS_NOTIFICATION_EMAIL) return;

  const rows = Object.entries(lead)
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${key}</strong></td><td>${value}</td></tr>`)
    .join('');

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: NOTIFICATION_SENDER,
        to: [{ email: LEADS_NOTIFICATION_EMAIL }],
        subject: `Nouveau lead — ${lead.HOTEL || lead.email}`,
        htmlContent: `<h2>Nouveau lead landing page</h2><table>${rows}</table>`,
      }),
    });

    if (!response.ok) {
      console.error('[leads] Brevo notification error:', response.status);
    }
  } catch (error) {
    console.error('[leads] Notification failed:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadBody = await request.json();

    // Honeypot — si rempli, on rejette silencieusement (le bot croit avoir réussi)
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const email = sanitize(body.email).toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    const locale = body.locale === 'en' ? 'en' : 'fr';
    const attributes: Record<string, string | number> = {
      LOCALE: locale,
      SOURCE: sanitize(body.source) || 'landing-page',
    };

    const firstName = sanitize(body.firstName);
    const hotelName = sanitize(body.hotelName);
    const phone = sanitize(body.phone);
    const pms = sanitize(body.pms);
    const rooms = sanitizeNumber(body.rooms);
    const estimatedRevenue = sanitizeNumber(body.estimatedRevenue);
    const goal = sanitize(body.goal);

    if (firstName) attributes.PRENOM = firstName;
    if (hotelName) attributes.HOTEL = hotelName;
    if (phone) attributes.SMS = phone;
    if (pms) attributes.PMS = pms;
    if (rooms !== null) attributes.CHAMBRES = rooms;
    if (estimatedRevenue !== null) attributes.POTENTIEL_ESTIME = estimatedRevenue;
    if (goal) attributes.OFFRE = goal;

    // Pas de clé API configurée (dev) — on log et on rend la main sans erreur
    if (!BREVO_API_KEY || !BREVO_LEADS_LIST_ID) {
      console.warn('[leads] BREVO_API_KEY / BREVO_LEADS_LIST_ID not set — lead not persisted:', {
        email,
        ...attributes,
      });
      return NextResponse.json({ success: true });
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LEADS_LIST_ID],
        attributes,
        updateEnabled: true,
      }),
    });

    const errorData = response.ok || response.status === 204
      ? null
      : await response.json().catch(() => null);

    // Contact déjà existant — mis à jour par updateEnabled, on traite en succès
    if (errorData && errorData.code !== 'duplicate_parameter') {
      console.error('[leads] Brevo API error:', response.status, errorData);
      return NextResponse.json(
        { success: false, error: 'api_error' },
        { status: 500 }
      );
    }

    await notifyTeam({ email, ...Object.fromEntries(
      Object.entries(attributes).map(([key, value]) => [key, String(value)])
    ) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[leads] Error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
