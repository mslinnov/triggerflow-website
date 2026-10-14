/**
 * Attribution des visites payantes (Google Ads) : gclid, gbraid, wbraid et UTM.
 *
 * Lus dans l'URL d'arrivée et gardés EN MÉMOIRE pour la durée de la page, ce qui
 * suffit à une conversion sur la page d'atterrissage elle-même. Ils ne sont
 * écrits dans le navigateur (localStorage, 90 jours) qu'avec le consentement
 * « marketing » : un identifiant de clic publicitaire est un traceur
 * publicitaire au sens de la CNIL. Retrait du consentement = effacement.
 */
import { getConsent, hasValidConsent } from '@/lib/cookies';

export const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>> & {
  landingPath?: string;
  capturedAt?: string;
};

const STORAGE_KEY = 'tf_attribution';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 200;

let memory: Attribution | null = null;

function marketingGranted(): boolean {
  return hasValidConsent() && getConsent()?.marketing === true;
}

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    const age = Date.now() - new Date(parsed.capturedAt ?? 0).getTime();
    if (!Number.isFinite(age) || age > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Lit les paramètres de l'URL d'arrivée. Sans paramètre, garde l'attribution connue. */
export function captureAttribution(search: string, pathname: string): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value) found[key] = value.slice(0, MAX_VALUE_LENGTH);
  }
  if (Object.keys(found).length === 0) return;
  memory = { ...found, landingPath: pathname, capturedAt: new Date().toISOString() };
  syncAttributionStorage();
}

/** Écrit l'attribution si le consentement marketing est donné, l'efface sinon. */
export function syncAttributionStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    if (!marketingGranted()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    if (memory) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    // Stockage indisponible (navigation privée) : l'attribution reste en mémoire.
  }
}

/** L'attribution de la visite en cours, sinon celle gardée avec consentement. */
export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  if (memory) return memory;
  return marketingGranted() ? readStored() : null;
}

/**
 * Reporte la source de la visite sur le lien de prise de rendez-vous, pour la
 * retrouver dans lemcal. Les UTM de la visite (ceux de l'annonce) REMPLACENT
 * ceux écrits en dur sur le lien, qui ne décrivent qu'une visite directe de la
 * page ; un UTM absent de la visite laisse celui du lien. Le gclid n'y part
 * qu'avec le consentement marketing.
 */
export function decorateBookingUrl(href: string): string {
  const attribution = getAttribution();
  if (!attribution) return href;
  try {
    const url = new URL(href);
    for (const key of ATTRIBUTION_KEYS) {
      const value = attribution[key];
      if (!value) continue;
      if ((key === 'gclid' || key === 'gbraid' || key === 'wbraid') && !marketingGranted()) continue;
      url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return href;
  }
}

/** Pour les tests : repart d'une page neuve. */
export function resetAttributionForTests(): void {
  memory = null;
}
