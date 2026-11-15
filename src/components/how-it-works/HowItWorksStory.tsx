'use client';

import { HowItWorksAnimated } from './HowItWorksAnimated';
import { HowItWorksStatic } from './HowItWorksStatic';
import { useStaticMode } from './useStaticMode';

/**
 * Le parcours d'une cliente : animé au rythme du défilement, ou en dix images fixes.
 * `header` : hauteur de l'en-tête fixe de la page, en pixels (100 par défaut, celui du site).
 */
export function HowItWorksStory({ header }: { header?: number }) {
  const fixed = useStaticMode(header);
  return fixed ? <HowItWorksStatic /> : <HowItWorksAnimated header={header} />;
}
