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
// Aligné sur la règle `email` de l'app pour les cas courants : domaine avec un point,
// extension d'au moins deux lettres, pas de point doublé. L'app reste juge (422).
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

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
  if (!email || email.length > MAX_EMAIL || !EMAIL.test(email) || email.includes('..')) fields.push('email');

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
 * Racine de l'API salon du QR de flyer, ou null si le relais n'est pas configuré ou
 * mal configuré. Le jeton finit dans un chemin d'URL : seuls lettres, chiffres, `-`
 * et `_` passent. Le transport doit être chiffré (seul http://localhost est toléré,
 * pour le local). Partagée avec les statistiques (calendrier-evenements.ts).
 */
export function salonFlyerBaseUrl(apiUrl: string | undefined, token: string | undefined): string | null {
  const base = apiUrl?.trim().replace(/\/+$/, '');
  const flyerToken = token?.trim();
  if (!base || !flyerToken || !/^[A-Za-z0-9_-]{8,128}$/.test(flyerToken)) return null;
  if (!base.startsWith('https://') && !base.startsWith('http://localhost')) return null;
  return `${base}/api/public-salon-flyer/${flyerToken}`;
}

/** URL de création du prospect, ou null si le relais n'est pas configuré. */
export function salonLeadUrl(apiUrl: string | undefined, token: string | undefined): string | null {
  const base = salonFlyerBaseUrl(apiUrl, token);
  return base ? `${base}/leads` : null;
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

/**
 * Limite de débit du formulaire, par IP visiteur, côté site.
 *
 * Indispensable : l'app voit toutes les demandes venir de l'IP du serveur du site,
 * et son limiteur (30 par minute par jeton et par IP) deviendrait un quota unique
 * pour tous les visiteurs. Sans cette limite, un robot créerait des dizaines de faux
 * prospects par minute et ferait répondre 429 aux vrais.
 *
 * En mémoire : le site tourne en un seul processus `next start` (deploy.yml). Un
 * redémarrage remet les compteurs à zéro, ce qui est sans conséquence.
 * Une IP inconnue (en-tête absent) partage un même compteur : plus strict, jamais
 * plus permissif.
 */
export class SlidingWindowLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    /** Au-delà, les entrées expirées sont purgées pour borner la mémoire. */
    private readonly maxKeys = 10_000,
  ) {}

  /** Enregistre une tentative ; false si la limite est déjà atteinte (la tentative n'est pas comptée). */
  allow(key: string, now: number = Date.now()): boolean {
    const since = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > since);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > this.maxKeys) this.prune(since);
    return true;
  }

  /** Nombre d'IP suivies (pour les tests de la purge). */
  get size(): number {
    return this.hits.size;
  }

  private prune(since: number): void {
    for (const [key, times] of this.hits) {
      if (!times.some((t) => t > since)) this.hits.delete(key);
    }
  }
}

/** 5 demandes de rappel par IP visiteur sur 10 minutes. */
export const RAPPEL_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 } as const;
