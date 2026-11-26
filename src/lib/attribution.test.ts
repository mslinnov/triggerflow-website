import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
// Les deux modules ne lisent `window` qu'à l'appel : le faux navigateur
// ci-dessous est en place avant le premier test.
import { setConsent } from './cookies';
import { captureAttribution, decorateActivateUrl, decorateBookingUrl, getAttribution, syncAttributionStorage, resetAttributionForTests } from './attribution';

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

const ACTIVER =
  'https://app.trigger-flow.com/email-templates/library/activate?type=christmas&style=fetes&utm_source=site&utm_medium=campagnes-fetes&utm_campaign=campagnes-fetes&utm_content=christmas';

test('bouton Activer : source, support et campagne de la visite (mail de relance), utm_content du modèle gardé, jamais le gclid', () => {
  setConsent(true, true);
  captureAttribution('?gclid=ABC123&utm_source=brevo&utm_medium=email&utm_campaign=relance-fetes&utm_content=lien-2', '/fr/campagnes-email-fetes');
  const url = new URL(decorateActivateUrl(ACTIVER));
  assert.equal(url.searchParams.get('utm_source'), 'brevo');
  assert.equal(url.searchParams.get('utm_medium'), 'email');
  assert.equal(url.searchParams.get('utm_campaign'), 'relance-fetes');
  assert.equal(url.searchParams.get('utm_content'), 'christmas', 'le code du modèle activé, pas le lien du mail');
  assert.equal(url.searchParams.get('gclid'), null);
  assert.equal(url.searchParams.get('type'), 'christmas');
});

test('bouton Activer : visite directe (sans UTM) ou autre lien, adresse intacte', () => {
  setConsent(false, false);
  assert.equal(decorateActivateUrl(ACTIVER), ACTIVER);
  captureAttribution('?utm_source=brevo', '/fr/campagnes-email-fetes');
  assert.equal(new URL(decorateActivateUrl(ACTIVER)).searchParams.get('utm_medium'), 'campagnes-fetes', 'un UTM absent de la visite garde celui du lien');
  assert.equal(decorateActivateUrl('https://app.trigger-flow.com/login'), 'https://app.trigger-flow.com/login');
});
