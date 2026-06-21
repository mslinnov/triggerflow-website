/**
 * Cookie consent helpers - CNIL-compliant.
 *
 * Stored under localStorage key `tf_cookie_consent` with shape:
 *   { analytics: boolean, marketing: boolean, timestamp: string (ISO 8601), version: string }
 *
 * Consent is considered valid for 6 months. After that, the banner reappears.
 * Bumping CONSENT_VERSION also invalidates all existing consents (use it when
 * the list of categories changes).
 */

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
};

export const CONSENT_STORAGE_KEY = 'tf_cookie_consent';
// 1.1 — added the `marketing` category (advertising pixels). The bump invalidates
// every pre-existing consent so visitors are re-prompted for the new finality.
export const CONSENT_VERSION = '1.1';
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000; // 6 months
export const CONSENT_CHANGED_EVENT = 'tf-consent-changed';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.timestamp !== 'string' ||
      typeof parsed.version !== 'string'
    ) {
      return null;
    }
    // `marketing` was introduced in consent v1.1. Tolerate its absence by
    // defaulting to false; any pre-1.1 blob fails the version check in
    // hasValidConsent() anyway and re-prompts the visitor.
    return { ...parsed, marketing: parsed.marketing === true } as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean, marketing: boolean): void {
  if (!isBrowser()) return;
  const state: ConsentState = {
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_CHANGED_EVENT, { detail: state })
  );
}

export function clearConsent(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(
    new CustomEvent<null>(CONSENT_CHANGED_EVENT, { detail: null })
  );
}

export function hasValidConsent(): boolean {
  const state = getConsent();
  if (!state) return false;
  if (state.version !== CONSENT_VERSION) return false;
  const ageMs = Date.now() - new Date(state.timestamp).getTime();
  return Number.isFinite(ageMs) && ageMs < CONSENT_MAX_AGE_MS;
}

/**
 * Remove Google Analytics cookies set on the current eTLD+1.
 * Called when the user revokes analytics consent.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  // eTLD+1 best-effort: strip leading "www." (covers trigger-flow.com vs www.trigger-flow.com)
  const root = host.replace(/^www\./, '');
  const domains = [host, '.' + host, root, '.' + root];
  const targets = document.cookie.split(';').map((c) => c.trim().split('=')[0]);
  const gaPattern = /^_ga($|_)|^_gid$|^_gat($|_)/;
  for (const name of targets) {
    if (!gaPattern.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Path=/; Domain=${d}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
 * Best-effort removal of advertising/pixel cookies on `marketing` revocation.
 * Covers the common first-party cookies dropped by the pixels in MarketingPixels:
 * Meta (_fbp/_fbc), Google Ads (_gcl_*), Microsoft/Bing (_uet*), LinkedIn
 * (li_*, bcookie, lidc), TikTok (_ttp). Cookies set on the vendors' own domains
 * can't be cleared from here — withholding the scripts prevents new ones.
 */
export function clearMarketingCookies(): void {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const root = host.replace(/^www\./, '');
  const domains = [host, '.' + host, root, '.' + root];
  const targets = document.cookie.split(';').map((c) => c.trim().split('=')[0]);
  const adPattern = /^_fbp$|^_fbc$|^_gcl_|^_uet|^_ttp$|^li_|^lms_|^bcookie$|^lidc$/;
  for (const name of targets) {
    if (!adPattern.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Path=/; Domain=${d}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
