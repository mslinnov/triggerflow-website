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
 * - Arrivée à l'écran : état complet, puis lecture en boucle ; pause quand il sort de l'écran.
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

  // Premier passage à l'écran : le visuel s'affiche complet, puis le scénario se rejoue
  // depuis le début après la pause (jamais de cadre vide à l'arrivée).
  const started = useRef(false);
  useEffect(() => {
    if (!enabled || !visible || started.current) return;
    started.current = true;
    setStep(last);
  }, [enabled, visible, last]);

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
