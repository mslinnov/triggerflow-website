'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedStatProps {
  value: string;
  suffix?: string;
}

export function AnimatedStat({ value, suffix }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value);

  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView, targetValue]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}
