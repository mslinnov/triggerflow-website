'use client';

import { useTranslations } from 'next-intl';
import { BedDouble, Check, Mail, Phone } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [1200, 1000, 900, 1];

/** Trois profils du même client (PMS, OTA, formulaire) détectés et fusionnés en une seule fiche. */
export function DedupScenario({ onDark }: { onDark?: boolean }) {
  const t = useTranslations('visuals.dedup');
  const { ref, step } = useScenario(DURATIONS);
  const sources = [
    { name: 'J. Dupont', detail: 'jdupont@gmail.com', source: 'PMS' },
    { name: 'Jean Dupont', detail: '+33 6 12 34 56 78', source: 'Booking.com' },
    { name: 'jean.dupont', detail: t('formSource'), source: t('form') },
  ];
  const merged = step >= 2;

  return (
    <div ref={ref} className="relative mx-auto flex max-w-[480px] flex-col items-center gap-4 py-4">
      <div className="relative h-[180px] w-full">
        {sources.map((s, i) => (
          <div
            key={s.source}
            className={cn(
              'absolute left-1/2 w-[78%] -translate-x-1/2 rounded-xl border bg-white px-4 py-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
              onDark ? 'border-white/10' : 'border-line',
              step >= 1 && !merged && 'border-peach',
              merged && 'opacity-0'
            )}
            style={{ top: merged ? 60 : i * 60, transform: `translateX(-50%) rotate(${merged ? 0 : (i - 1) * 1.5}deg)` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">{s.name}</span>
              <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase text-ink-3">{s.source}</span>
            </div>
            <p className="mt-0.5 font-mono text-[11px] text-ink-3">{s.detail}</p>
          </div>
        ))}
        <Reveal show={merged} from="scale" className="absolute inset-x-0 top-6">
          <div className="mx-auto w-[86%] rounded-xl border border-accent bg-white p-4 shadow-[0_0_0_4px_rgba(0,111,104,0.12)]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[12px] text-white">JD</span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Jean Dupont</p>
                <p className="font-mono text-[10px] uppercase text-accent">{t('oneProfile')}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11.5px] text-ink-2">
              <span className="flex items-center gap-1"><Mail aria-hidden className="h-3.5 w-3.5 text-ink-3" />{t('email')}</span>
              <span className="flex items-center gap-1"><Phone aria-hidden className="h-3.5 w-3.5 text-ink-3" />{t('phone')}</span>
              <span className="flex items-center gap-1"><BedDouble aria-hidden className="h-3.5 w-3.5 text-ink-3" />{t('stays')}</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal show={step >= 1 && !merged}>
        <span className="rounded-full bg-peach px-3 py-1 font-mono text-[11px] uppercase text-ink">{t('detected')}</span>
      </Reveal>
      <Reveal show={step >= 3} className="-mt-8">
        <span className={cn('inline-flex items-center gap-1.5 font-mono text-[11px] uppercase', onDark ? 'text-mint' : 'text-accent')}>
          <Check aria-hidden className="h-3.5 w-3.5" /> {t('merged')}
        </span>
      </Reveal>
    </div>
  );
}
