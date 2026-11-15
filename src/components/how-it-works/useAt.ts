'use client';

import { useTransform, type MotionValue } from 'framer-motion';
import type { JourneyTime } from '@/lib/how-it-works/timeline';

/** Une valeur dérivée de l'instant du parcours : `fn(p, q)`, recalculée à chaque changement de défilement. */
export function useAt<T>(time: MotionValue<JourneyTime>, fn: (p: number, q: number) => T): MotionValue<T> {
  return useTransform(time, (t) => fn(t.p, t.q));
}
