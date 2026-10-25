'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedStatProps {
  value: string;
  suffix?: string;
}

/**
 * Le HTML serveur porte la valeur finale : les robots IA ne lancent pas le JavaScript et
 * liraient sinon « 0 % » à la place d'un chiffre vérifié (test AnimatedStat.test.ts).
 * Le comptage depuis 0 ne se prépare côté client que pour un chiffre encore hors écran,
 * et jamais si l'utilisateur limite les animations.
 */
export function AnimatedStat({ value, suffix }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = parseInt(value);
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    // Hors écran : on repart de 0 à la frame suivante, invisible pour le lecteur.
    const frame = requestAnimationFrame(() => {
      setDisplayValue(0);
      setArmed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!armed || !isInView) return;
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(targetValue * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [armed, isInView, targetValue]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}
