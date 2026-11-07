import { test } from 'node:test';
import assert from 'node:assert/strict';
import { solutions } from './solutions';
import { solutionsEn } from './solutions-en';

// Les textes anglais sont fusionnés par index : mêmes longueurs que le français, sinon décalage silencieux.
test('les pages Solutions anglaises suivent la structure française', () => {
  for (const [slug, en] of Object.entries(solutionsEn)) {
    const fr = solutions[slug];
    assert.ok(fr, `solution inconnue : ${slug}`);
    assert.equal(en.challenges.length, fr.challenges.length, `${slug} challenges`);
    assert.equal(en.statLabels.length, fr.stats.length, `${slug} stats`);
    assert.equal(en.features.length, fr.features.length, `${slug} features`);
    assert.equal(en.useCases.length, fr.useCases.length, `${slug} useCases`);
    if (en.painPoints) assert.equal(en.painPoints.length, fr.painPoints?.length, `${slug} painPoints`);
    if (en.benefits) assert.equal(en.benefits.length, fr.benefits?.length, `${slug} benefits`);
    if (en.faq) assert.equal(en.faq.length, fr.faq?.length, `${slug} faq`);
    en.useCases.forEach((u, i) => assert.equal(u.steps.length, fr.useCases[i].steps.length, `${slug} useCase ${i} steps`));
  }
});
