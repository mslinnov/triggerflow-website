'use client';

import { useTranslations } from 'next-intl';
import { Bell, Check, CreditCard, Link2 } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [900, 1100, 1000, 1000, 1];

/** Lien de caution envoyé, rappel automatique, paiement, statut « Payé » sur la fiche. */
export function PayScenario() {
  const t = useTranslations('visuals.pay');
  const { ref, step } = useScenario(DURATIONS);
  const rows = [
    { icon: Link2, label: t('sent'), time: t('sentTime'), at: 1 },
    { icon: Bell, label: t('reminder'), time: t('reminderTime'), at: 2 },
    { icon: CreditCard, label: t('paidRow'), time: t('paidTime'), at: 3 },
  ];
  return (
    <div ref={ref} className="grid gap-5 p-5 sm:p-8 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-white p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('timeline')}</p>
        <ol className="mt-4 space-y-3">
          {rows.map(({ icon: Icon, label, time, at }) => (
            <Reveal key={label} show={step >= at} from="left">
              <li className="flex items-center gap-3">
                <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', at === 3 ? 'bg-peach text-ink' : 'bg-mint/70 text-accent-hover')}>
                  <Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] text-ink">{label}</span>
                <span className="ml-auto font-mono text-[11px] text-ink-3">{time}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-white">SM</span>
          <div>
            <p className="text-[14px] font-semibold text-ink">Sophie Martin</p>
            <p className="font-mono text-[11px] text-ink-3">{t('stay')}</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-paper p-3">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="text-ink-2">{t('deposit')}</span>
            <span className="font-mono text-ink">{t('amount')}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12.5px] text-ink-2">{t('status')}</span>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] uppercase transition-colors duration-500',
                step >= 4 ? 'bg-accent text-white' : 'bg-peach/60 text-ink'
              )}
            >
              {step >= 4 ? <><Check aria-hidden className="h-3 w-3" />{t('paid')}</> : t('pending')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
