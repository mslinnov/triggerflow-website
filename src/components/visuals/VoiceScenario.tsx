'use client';

import { useTranslations } from 'next-intl';
import { Mic, Phone, PhoneCall, User } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [900, 1100, 1100, 1300, 1];

/** Le client appelle depuis son téléphone (navigateur), la réception voit qui appelle ; repli en message vocal traduit. */
export function VoiceScenario() {
  const t = useTranslations('visuals.voice');
  const { ref, step } = useScenario(DURATIONS);
  return (
    <div ref={ref} className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-[0.85fr_1.15fr]">
      <div className="mx-auto w-full max-w-[250px] rounded-[28px] border border-line bg-paper p-2.5">
        <div className="flex min-h-[300px] flex-col items-center justify-between rounded-[22px] bg-white px-4 py-6 text-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{t('space')}</p>
            <p className="mt-1 text-[14px] font-semibold text-ink">{t('hotel')}</p>
          </div>
          <span className={cn('flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500', step >= 1 ? 'bg-accent text-white shadow-[0_0_0_10px_rgba(0,111,104,0.12)]' : 'bg-mint text-accent-hover')}>
            {step >= 1 ? <PhoneCall aria-hidden className="h-8 w-8" strokeWidth={1.5} /> : <Phone aria-hidden className="h-8 w-8" strokeWidth={1.5} />}
          </span>
          <div>
            <p className="text-[13px] font-semibold text-ink">{step >= 2 ? t('connected') : step >= 1 ? t('calling') : t('call')}</p>
            <p className="mt-1 text-[11px] text-ink-3">{t('noNumber')}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Reveal show={step >= 1}>
          <div className={cn('rounded-xl border bg-white p-4 transition-colors duration-500', step >= 2 ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.10)]' : 'border-line')}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-accent">{step >= 2 ? t('inCall') : t('incoming')}</span>
              <span className="font-mono text-[11px] text-ink-3">{t('room')}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"><User aria-hidden className="h-4 w-4" /></span>
              <div>
                <p className="text-[14px] font-semibold text-ink">Camille Laurent</p>
                <p className="text-[12px] text-ink-3">{t('stay')}</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal show={step >= 3}>
          <div className="rounded-xl border border-line bg-paper p-4">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
              <Mic aria-hidden className="h-3.5 w-3.5" /> {t('fallback')}
            </p>
            <p className="mt-2 text-[13px] italic text-ink-2">{t('original')}</p>
            <p className="mt-1 text-[13px] text-ink">{t('translated')}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
