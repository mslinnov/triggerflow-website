'use client';

import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp, defaultViewport } from '@/lib/animations';

interface TimelineItem {
  day: string;
  description: string;
}

interface ScenarioCardProps {
  badge: string;
  title: string;
  context: string;
  timeline: TimelineItem[];
  result: string;
  index: number;
}

const accentColors = [
  { dot: 'bg-brand-primary', ring: 'border-brand-primary/30 bg-brand-primary/5', text: 'text-brand-primary', result: 'bg-brand-primary/[0.06] border-brand-primary/10' },
  { dot: 'bg-amber-500', ring: 'border-amber-300/40 bg-amber-50', text: 'text-amber-600', result: 'bg-amber-50 border-amber-200/30' },
  { dot: 'bg-sky-500', ring: 'border-sky-300/40 bg-sky-50', text: 'text-sky-600', result: 'bg-sky-50 border-sky-200/30' },
];

export function ScenarioCard({ badge, title, context, timeline, result, index }: ScenarioCardProps) {
  const number = String(index + 1).padStart(2, '0');
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={defaultViewport}
      className="group relative"
    >
      <div
        className="overflow-hidden rounded-2xl border border-border-default bg-white transition-all duration-300 hover:shadow-lg"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Header — full-width accent strip */}
        <div className="relative border-b border-border-light/60 px-8 py-7 md:px-10 md:py-8">
          {/* Background number watermark */}
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[5.5rem] font-bold leading-none text-brand-primary/[0.06] md:text-[7rem]">
            {number}
          </span>

          <div className="relative flex items-start gap-4">
            {/* Step indicator */}
            <div className={cn('mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold', accent.ring, accent.text)}>
              {number}
            </div>
            <div className="min-w-0">
              <span className={cn('text-[11px] font-semibold uppercase tracking-[0.15em]', accent.text)}>
                {badge}
              </span>
              <h3 className="mt-1 font-serif text-xl font-bold leading-snug text-text-primary md:text-2xl">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7 md:px-10 md:py-8">
          {/* Context narrative */}
          <p className="mb-8 border-l-2 border-brand-primary/15 pl-5 text-sm italic leading-relaxed text-text-secondary">
            {context}
          </p>

          {/* Timeline */}
          <div className="relative space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="relative flex gap-5 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
                    accent.ring
                  )}>
                    <CheckCircle2 className={cn('h-4 w-4', accent.text)} />
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-border-default to-border-light" />
                  )}
                </div>
                <div className="min-w-0 pt-0.5">
                  <span className="text-sm font-bold text-text-primary">{item.day}</span>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Result — highlighted with colored border */}
          <div className={cn('mt-8 flex items-start gap-3 rounded-xl border p-5', accent.result)}>
            <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg', accent.ring)}>
              <TrendingUp className={cn('h-4 w-4', accent.text)} />
            </div>
            <p className="text-sm font-medium leading-relaxed text-text-primary">
              {result}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
