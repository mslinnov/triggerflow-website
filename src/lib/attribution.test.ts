import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
// Les deux modules ne lisent `window` qu'à l'appel : le faux navigateur
// ci-dessous est en place avant le premier test.
import { setConsent } from './cookies';
import { captureAttribution, decorateBookingUrl, getAttribution, syncAttributionStorage, resetAttributionForTests } from './attribution';

// Navigateur minimal : localStorage en mémoire, événements sans effet.
const store = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  },
  dispatchEvent: () => true,
};


const LEMCAL = 'https://app.lemcal.com/@trigger-flow/demo?utm_source=site&utm_medium=landing&utm_campaign=lp-crm-hotelier&utm_content=hero';
const ANNONCE = '?gclid=ABC123&utm_source=google&utm_medium=cpc&utm_campaign=crm-hotelier&utm_term=crm%20hotelier';

beforeEach(() => {
  store.clear();
  resetAttributionForTests();
});

test('sans consentement marketing : rien en stockage, UTM de l’annonce sur le lien, gclid jamais transmis', () => {
  setConsent(true, false);
  captureAttribution(ANNONCE, '/fr/lp/crm-hotelier');
  assert.equal(store.has('tf_attribution'), false);
  const url = new URL(decorateBookingUrl(LEMCAL));
  assert.equal(url.searchParams.get('utm_source'), 'google', 'l’annonce remplace la source écrite en dur');
  assert.equal(url.searchParams.get('utm_campaign'), 'crm-hotelier');
  assert.equal(url.searchParams.get('utm_content'), 'hero', 'un UTM absent de la visite garde celui du lien');
  assert.equal(url.searchParams.get('gclid'), null);
});

test('avec consentement marketing : attribution gardée, gclid transmis, effacée au retrait', () => {
  setConsent(true, true);
  captureAttribution(ANNONCE, '/fr/lp/crm-hotelier');
  assert.ok(store.get('tf_attribution')?.includes('ABC123'));
  assert.equal(new URL(decorateBookingUrl(LEMCAL)).searchParams.get('gclid'), 'ABC123');

  resetAttributionForTests();
  assert.equal(getAttribution()?.gclid, 'ABC123', 'relue au retour du visiteur');

  setConsent(true, false);
  syncAttributionStorage();
  assert.equal(store.has('tf_attribution'), false, 'retrait du consentement = effacement');
  assert.equal(getAttribution(), null);
});

test('une visite sans paramètre ne change rien et le lien reste intact', () => {
  setConsent(false, false);
  captureAttribution('', '/fr');
  assert.equal(getAttribution(), null);
  assert.equal(decorateBookingUrl(LEMCAL), LEMCAL);
});
