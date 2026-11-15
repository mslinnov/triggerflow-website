'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { drawPoints } from './draw';

interface PointsCanvasProps {
  /** Côté du visuel, en pixels CSS. */
  side: number;
  time: MotionValue<JourneyTime>;
}

/** La toile des points. Décorative : le récit est porté par les textes. */
export function PointsCanvas({ side, time }: PointsCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || side <= 0) return;
    // Au-delà de 2, la netteté ne se voit plus et le coût double.
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const pixels = Math.round(side * ratio);
    if (canvas.width !== pixels) {
      canvas.width = pixels;
      canvas.height = pixels;
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawPoints(ctx, side, time.get());
  }, [side, time]);

  // Au montage et à chaque changement de taille : l'image de la position courante, pas celle du début.
  useEffect(draw, [draw]);
  useMotionValueEvent(time, 'change', draw);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
