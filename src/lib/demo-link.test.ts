import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyDemoLink } from './demo-link';

const SITE = 'https://www.trigger-flow.com';

test('le calendrier lemcal compte, avec ou sans paramètres', () => {
  assert.equal(classifyDemoLink('https://app.lemcal.com/@trigger-flow/demo', SITE), 'lemcal');
  assert.equal(classifyDemoLink('https://app.lemcal.com/@trigger-flow/demo?utm_source=site', SITE), 'lemcal');
});

test('la page /demo du site compte, dans les deux langues', () => {
  assert.equal(classifyDemoLink(`${SITE}/fr/demo`, SITE), 'demo_page');
  assert.equal(classifyDemoLink(`${SITE}/en/demo/`, SITE), 'demo_page');
  assert.equal(classifyDemoLink('/demo', SITE), 'demo_page');
  assert.equal(classifyDemoLink(`${SITE}/fr/demo#calendrier`, SITE), 'demo_page');
});

test('les autres liens ne comptent pas', () => {
  assert.equal(classifyDemoLink(`${SITE}/fr/demonstration`, SITE), null);
  assert.equal(classifyDemoLink(`${SITE}/fr/blog/demo-guide`, SITE), null);
  assert.equal(classifyDemoLink('https://autre-site.com/fr/demo', SITE), null);
  assert.equal(classifyDemoLink('https://lemcal.com.exemple.net/demo', SITE), null);
  assert.equal(classifyDemoLink('mailto:contact@trigger-flow.com', SITE), null);
});
