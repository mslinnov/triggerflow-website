'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, ExternalLink, Star } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [900, 1000, 1100, 1000, 1];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} aria-hidden className={cn('h-3.5 w-3.5', i < n ? 'fill-peach text-peach' : 'text-line')} />
      ))}
    </span>
  );
}

/** Enquête de départ : note haute → invitation Google ; note basse → alerte à la direction. */
export function ReviewsScenario() {
  const t = useTranslations('visuals.reviews');
  const { ref, step } = useScenario(DURATIONS);
  return (
    <div ref={ref} className="grid gap-4 p-5 sm:p-8 md:grid-cols-2">
      {[
        { n: 5, name: 'Léa M.', comment: t('good'), at: 1, out: t('invite'), icon: ExternalLink, tone: 'bg-mint/60 text-accent' },
        { n: 2, name: 'Marc D.', comment: t('bad'), at: 2, out: t('alert'), icon: AlertTriangle, tone: 'bg-peach/70 text-ink' },
      ].map((r) => (
        <div key={r.name} className="space-y-3">
          <Reveal show={step >= r.at}>
            <div className="rounded-xl border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">{r.name}</span>
                <Stars n={r.n} />
              </div>
              <p className="mt-2 text-[12.5px] text-ink-2">{r.comment}</p>
            </div>
          </Reveal>
          <Reveal show={step >= r.at + 2 || (r.at === 2 && step >= 4)}>
            <div className={cn('flex items-center gap-2 rounded-xl px-4 py-3 text-[12.5px] font-medium', r.tone)}>
              <r.icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />{r.out}
            </div>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
