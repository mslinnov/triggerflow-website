import assert from 'node:assert/strict';
import { test } from 'node:test';
import { trackCalendarEvent } from './calendrier-tracking';

test('suivi du calendrier : un événement GA4 par action, paramètres absents retirés, rien sans consentement', () => {
  const calls: unknown[][] = [];
  const scope = globalThis as unknown as { window?: { gtag?: (...args: unknown[]) => void } };
  scope.window = { gtag: (...args: unknown[]) => calls.push(args) };
  try {
    trackCalendarEvent('calendar_download', { temps_fort: 'valentines_day', format: 'html', theme: 'soiree' });
    trackCalendarEvent('calendar_copy', { temps_fort: 'valentines_day', format: 'text', theme: undefined });
    trackCalendarEvent('calendar_activate', { temps_fort: 'new_year_eve', destination: 'app', theme: 'moderne' });
    assert.deepEqual(calls, [
      ['event', 'calendar_download', { temps_fort: 'valentines_day', format: 'html', theme: 'soiree' }],
      ['event', 'calendar_copy', { temps_fort: 'valentines_day', format: 'text' }],
      ['event', 'calendar_activate', { temps_fort: 'new_year_eve', destination: 'app', theme: 'moderne' }],
    ]);
    // Sans consentement, gtag.js n'est pas chargé : aucun envoi, aucune erreur.
    scope.window = {};
    trackCalendarEvent('calendar_download', { temps_fort: 'valentines_day', format: 'mjml', theme: 'moderne' });
    assert.equal(calls.length, 3);
  } finally {
    delete scope.window;
  }
});
