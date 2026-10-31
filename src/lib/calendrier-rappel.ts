/**
 * Formulaire « Être rappelé » des pages « Activer » du calendrier marketing.
 *
 * Le prospect est créé dans le CRM de l'app, rattaché à l'événement EquipHotel,
 * par l'API publique du QR de flyer du module salon
 * (`POST /api/public-salon-flyer/{flyer_token}/leads`, canal « flyer »). Le site
 * relaie côté serveur : le jeton du salon ne part jamais dans le navigateur.
 *
 * Ici, la seule logique pure (validation, corps envoyé à l'app, traduction de la
 * réponse), testée sans réseau dans calendrier-rappel.test.ts.
 */

export interface RappelInput {
  hotelName: string;
  city?: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  wantsDemo: boolean;
}

/** Corps attendu par `CaptureFlyerSalonLeadRequest` côté app. */
export interface SalonFlyerLeadPayload {
  establishment: { name: string; city?: string };
  contact: { firstname: string; lastname?: string; email: string; phone?: string };
  wants_demo: boolean;
}

const MAX_TEXT = 100;
const MAX_EMAIL = 255;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max = MAX_TEXT): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';
}

export type ParseResult =
  | { kind: 'ok'; input: RappelInput }
  | { kind: 'bot' }
  | { kind: 'invalid'; fields: string[] };

/**
 * Lit le corps JSON du formulaire. `website` est le champ piège (invisible pour un
 * humain) : rempli, la demande est un robot, écartée sans le lui dire.
 */
export function parseRappelBody(body: unknown): ParseResult {
  const data = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  if (text(data.website)) return { kind: 'bot' };

  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const input: RappelInput = {
    hotelName: text(data.hotelName, 255),
    city: text(data.city) || undefined,
    firstname: text(data.firstname),
    lastname: text(data.lastname) || undefined,
    email,
    phone: text(data.phone, 50) || undefined,
    wantsDemo: data.wantsDemo === true,
  };

  const fields: string[] = [];
  if (!input.hotelName) fields.push('hotelName');
  if (!input.firstname) fields.push('firstname');
  // Une adresse trop longue est refusée, jamais tronquée : tronquée, elle resterait
  // « valide » et créerait un prospect sur une adresse qui n'existe pas.
  if (!email || email.length > MAX_EMAIL || !EMAIL.test(email)) fields.push('email');

  return fields.length ? { kind: 'invalid', fields } : { kind: 'ok', input };
}

export function toSalonPayload(input: RappelInput): SalonFlyerLeadPayload {
  return {
    establishment: { name: input.hotelName, ...(input.city ? { city: input.city } : {}) },
    contact: {
      firstname: input.firstname,
      ...(input.lastname ? { lastname: input.lastname } : {}),
      email: input.email,
      ...(input.phone ? { phone: input.phone } : {}),
    },
    wants_demo: input.wantsDemo,
  };
}

/**
 * URL de l'API salon, ou null si le relais n'est pas configuré ou mal configuré.
 * Le jeton finit dans un chemin d'URL : seuls lettres, chiffres, `-` et `_` passent.
 * Le transport doit être chiffré (seul http://localhost est toléré, pour le local).
 */
export function salonLeadUrl(apiUrl: string | undefined, token: string | undefined): string | null {
  const base = apiUrl?.trim().replace(/\/+$/, '');
  const flyerToken = token?.trim();
  if (!base || !flyerToken || !/^[A-Za-z0-9_-]{8,128}$/.test(flyerToken)) return null;
  if (!base.startsWith('https://') && !base.startsWith('http://localhost')) return null;
  return `${base}/api/public-salon-flyer/${flyerToken}/leads`;
}

export type RelayOutcome = 'ok' | 'busy' | 'invalid' | 'error';

/** Traduit le statut HTTP de l'app en issue affichable. */
export function relayOutcome(status: number): RelayOutcome {
  if (status >= 200 && status < 300) return 'ok';
  // 409 : la même demande est déjà en cours d'enregistrement ; 429 : limite de débit.
  if (status === 409 || status === 429) return 'busy';
  if (status === 422) return 'invalid';
  return 'error';
}
