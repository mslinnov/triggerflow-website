'use client';

import { useEffect, useRef, useState } from 'react';

interface ScenarioOptions {
  /** Rejoue le scénario en boucle après une pause. */
  loop?: boolean;
  /** Pause en fin de scénario avant de rejouer (ms). */
  hold?: number;
}

/**
 * Moteur des visuels animés (docs/visuels.md). `durations[i]` = temps passé à l'étape i (ms).
 * - Rendu serveur et « animations réduites » : dernière étape, état final complet (jamais de bloc vide).
 * - Lecture quand le visuel entre à l'écran, pause quand il en sort.
 */
export function useScenario<T extends HTMLElement = HTMLDivElement>(durations: number[], { loop = true, hold = 2200 }: ScenarioOptions = {}) {
  const last = durations.length - 1;
  const ref = useRef<T>(null);
  const [step, setStep] = useState(last);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    setEnabled(true);
    return () => io.disconnect();
  }, []);

  // Premier passage à l'écran : on repart du début.
  const started = useRef(false);
  useEffect(() => {
    if (!enabled || !visible || started.current) return;
    started.current = true;
    setStep(0);
  }, [enabled, visible]);

  useEffect(() => {
    if (!enabled || !visible || !started.current) return;
    const atEnd = step >= last;
    if (atEnd && !loop) return;
    const delay = atEnd ? hold : durations[step];
    const id = window.setTimeout(() => setStep(atEnd ? 0 : step + 1), delay);
    return () => window.clearTimeout(id);
  }, [enabled, visible, step, last, loop, hold, durations]);

  return { ref, step, replay: () => setStep(0) };
}
