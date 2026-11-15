'use client';

import { useMotionValue } from 'framer-motion';
import { STATIC_TIMES } from '@/lib/how-it-works/timeline';
import { IntroCards } from './IntroCards';
import { PointsCanvas } from './PointsCanvas';
import { StageOverlay } from './StageOverlay';
import { useSide } from './useSide';

/** Le visuel figé à l'instant qui résume un des dix temps. Même rendu que la version animée. */
export function StaticFrame({ index }: { index: number }) {
  const [visual, side] = useSide();
  const time = useMotionValue(STATIC_TIMES[index]);
  return (
    <div className="pb-[60px]">
      <div ref={visual} className="relative mx-auto aspect-square w-[min(100%,430px)]">
        <PointsCanvas side={side} time={time} />
        {index === 0 ? (
          <IntroCards key={side} side={side} time={time} />
        ) : (
          <StageOverlay key={side} side={side} time={time} />
        )}
      </div>
    </div>
  );
}
