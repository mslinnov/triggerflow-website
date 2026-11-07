'use client';

import { useTranslations } from 'next-intl';
import { Check, Sparkles } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [800, 800, 800, 1400, 1000, 1];

/** Messages de canaux différents regroupés, réponse suggérée par l'IA, validée et envoyée. */
export function InboxScenario() {
  const t = useTranslations('visuals.inbox');
  const { ref, step } = useScenario(DURATIONS);
  const threads = [
    { ch: 'WhatsApp', name: 'Camille L.', msg: t('m1') },
    { ch: 'Booking.com', name: 'James T.', msg: t('m2') },
    { ch: 'Instagram', name: 'Lucia R.', msg: t('m3') },
  ];
  return (
    <div ref={ref} className="grid gap-4 p-5 sm:p-8 md:grid-cols-[0.95fr_1.05fr]">
      <ul className="space-y-2">
        {threads.map((th, i) => (
          <Reveal as="li" key={th.name} show={step >= i} from="left">
            <div className={cn('rounded-xl border bg-white px-4 py-3', i === 0 && step >= 3 ? 'border-accent' : 'border-line')}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">{th.name}</span>
                <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase text-ink-3">{th.ch}</span>
              </div>
              <p className="mt-1 truncate text-[12.5px] text-ink-2">{th.msg}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="rounded-xl border border-line bg-white p-4">
        <p className="text-[13px] font-semibold text-ink">Camille L. · {t('room')}</p>
        <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-[13px] text-ink-2">{t('m1')}</p>
        <Reveal show={step >= 3} className="mt-3">
          <div className="rounded-lg border border-dashed border-accent/60 bg-mint/30 px-3 py-2">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-accent"><Sparkles aria-hidden className="h-3.5 w-3.5" />{t('suggested')}</p>
            <p className="mt-1 text-[13px] text-ink">{t('reply')}</p>
          </div>
        </Reveal>
        <Reveal show={step >= 4} className="mt-3 text-right">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-[11px] uppercase text-white">
            <Check aria-hidden className="h-3.5 w-3.5" />{step >= 5 ? t('sent') : t('validate')}
          </span>
        </Reveal>
      </div>
    </div>
  );
}
