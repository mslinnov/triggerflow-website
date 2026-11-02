import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { LeadMagnetSuccess } from './LeadMagnetSuccess';

const texts = {
  title: "C'est enregistré.",
  ready: 'Votre guide est prêt :',
  download: 'Télécharger le guide',
  fallback: 'Merci, nous revenons vers vous très vite avec le guide.',
};

test('avec un lien, le succès affiche le bouton « Télécharger le guide », ouvert dans un nouvel onglet', () => {
  const html = renderToString(createElement(LeadMagnetSuccess, { ...texts, downloadUrl: 'https://t-f.co/AbC123' }));
  assert.match(html, /<a[^>]+href="https:\/\/t-f\.co\/AbC123"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /Télécharger le guide/);
  assert.match(html, /Votre guide est prêt/);
  assert.doesNotMatch(html, /nous revenons vers vous/);
});

test('sans lien, le succès reste honnête : aucun bouton, aucune promesse d’e-mail', () => {
  const html = renderToString(createElement(LeadMagnetSuccess, { ...texts, downloadUrl: null }));
  assert.doesNotMatch(html, /<a /);
  assert.match(html, /nous revenons vers vous très vite avec le guide/);
  assert.doesNotMatch(html, /Votre guide est prêt/);
});

test('un lien qui n’est pas un lien compté du backend n’est jamais rendu, même s’il arrive jusqu’au formulaire', () => {
  const html = renderToString(createElement(LeadMagnetSuccess, { ...texts, downloadUrl: 'https://evil.example/guide.pdf' }));
  assert.doesNotMatch(html, /evil\.example/);
  assert.match(html, /nous revenons vers vous/);
});
