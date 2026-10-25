import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { AnimatedStat } from './AnimatedStat';

// Les robots IA lisent le HTML serveur sans lancer le JavaScript : un chiffre vérifié doit y
// figurer tel quel, pas la valeur de départ de l'animation.
test('le rendu serveur porte la valeur finale, pas la valeur de départ', () => {
  const html = renderToString(createElement(AnimatedStat, { value: '94', suffix: '%' }));
  assert.match(html, />94(<!-- -->)?%</);
  assert.doesNotMatch(html, />0(<!-- -->)?%</);
});
