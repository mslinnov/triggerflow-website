'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import { chapterOpacity, type JourneyTime } from '@/lib/how-it-works/timeline';

interface ChapterTextProps {
  index: number;
  time: MotionValue<JourneyTime>;
  title: string;
  text: string;
}

/** Un des dix textes du parcours. Tous restent dans la page ; un seul est visible à la fois. */
export function ChapterText({ index, time, title, text }: ChapterTextProps) {
  const opacity = useTransform(time, (t) => chapterOpacity(index, t.p));
  const y = useTransform(opacity, (o) => (1 - o) * 8);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-5 top-2 lg:inset-x-0 lg:top-0">
      <h2 className="text-balance text-[25px] font-medium leading-[1.14] tracking-[-0.02em] text-ink lg:text-[40px] lg:leading-[1.08] xl:text-[44px]">
        {title}
      </h2>
      <p className="mt-2 text-[15.5px] leading-[1.5] text-ink-2 lg:mt-5 lg:text-[19px] xl:text-[20px]">{text}</p>
    </motion.div>
  );
}
