'use client';

import { useTranslations } from 'next-intl';
import { Check, Coffee } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [700, 800, 800, 1000, 900, 1];

/** Formulaire pré-séjour qui se remplit, bloc d'offre inséré, réponse rattachée à la fiche. */
export function FormsScenario() {
  const t = useTranslations('visuals.forms');
  const { ref, step } = useScenario(DURATIONS);
  const fields = [
    { label: t('arrival'), value: '18:30' },
    { label: t('pillow'), value: t('pillowValue') },
  ];
  return (
    <div ref={ref} className="grid gap-5 p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('title')}</p>
        <div className="mt-4 space-y-3">
          {fields.map((f, i) => (
            <div key={f.label}>
              <p className="text-[12px] text-ink-3">{f.label}</p>
              <p className={cn('mt-1 rounded-lg border px-3 py-2 text-[13px] transition-colors', step > i ? 'border-line text-ink' : 'border-line text-transparent')}>{f.value}</p>
            </div>
          ))}
          <Reveal show={step >= 2}>
            <div className="flex items-center gap-3 rounded-lg border border-accent bg-mint/30 p-3">
              <Coffee aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-ink">{t('offer')}</p>
                <p className="text-[11.5px] text-ink-3">{t('offerPrice')}</p>
              </div>
              <span className={cn('flex h-5 w-5 items-center justify-center rounded border', step >= 3 ? 'border-accent bg-accent text-white' : 'border-line')}>
                {step >= 3 && <Check aria-hidden className="h-3.5 w-3.5" />}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal show={step >= 4}>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="text-[13px] font-semibold text-ink">Camille Laurent</p>
          <p className="font-mono text-[10px] uppercase text-accent">{t('profile')}</p>
          <ul className="mt-4 space-y-2 text-[12.5px] text-ink-2">
            <li>{t('arrival')} : 18:30</li>
            <li>{t('pillow')} : {t('pillowValue')}</li>
            <li className="font-semibold text-ink">{t('offer')} ✓</li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
