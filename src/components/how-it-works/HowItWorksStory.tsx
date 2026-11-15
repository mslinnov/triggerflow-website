'use client';

import { HowItWorksAnimated } from './HowItWorksAnimated';
import { HowItWorksStatic } from './HowItWorksStatic';
import { useStaticMode } from './useStaticMode';

/** Le parcours d'une cliente : animé au rythme du défilement, ou en dix images fixes. */
export function HowItWorksStory() {
  const fixed = useStaticMode();
  return fixed ? <HowItWorksStatic /> : <HowItWorksAnimated />;
}
