'use client';

import { useTranslations } from 'next-intl';
import { BedDouble, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

const DURATIONS = [900, 1000, 900, 900, 1000, 1];

/** Deux côtés : le téléphone du client (offre de surclassement) et l'écran de l'hôtel (commande, PMS). */
export function UpsellScenario() {
  const t = useTranslations('visuals.upsell');
  const { ref, step } = useScenario(DURATIONS);
  return (
    <div ref={ref} className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-[0.9fr_1.1fr]">
      {/* Téléphone */}
      <div className="mx-auto w-full max-w-[260px] rounded-[28px] border border-line bg-paper p-2.5 shadow-sm">
        <div className="overflow-hidden rounded-[22px] bg-white">
          <div className="bg-ink px-4 py-3 text-white">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/60">{t('hotel')}</p>
            <p className="mt-0.5 text-[13px] font-semibold">{t('greeting')}</p>
          </div>
          <div className="p-3">
            <Reveal show={step >= 1}>
              <div className="overflow-hidden rounded-xl border border-line">
                <div className="flex h-20 items-center justify-center bg-mint/60 text-accent-hover">
                  <BedDouble aria-hidden className="h-8 w-8" strokeWidth={1.25} />
                </div>
                <div className="p-3">
                  <p className="text-[13px] font-semibold text-ink">{t('offer')}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3">{t('offerText')}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-ink">{t('price')}</span>
                    <span className={cn('rounded-md px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase text-white transition-all duration-300', step >= 2 ? 'scale-95 bg-accent-hover' : 'bg-accent')}>
                      {step >= 2 ? <Check aria-hidden className="h-3.5 w-3.5" /> : t('add')}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal show={step >= 3} className="mt-2">
              <p className="rounded-lg bg-peach px-3 py-2 text-center text-[12px] font-semibold text-ink">{t('paid')}</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Écran de l'hôtel */}
      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <ShoppingBag aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            {t('orders')}
          </p>
          <span className="font-mono text-[10px] uppercase text-ink-3">{t('today')}</span>
        </div>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between rounded-lg bg-paper px-3 py-2 text-[12px] text-ink-2">
            <span>{t('order1')}</span>
            <span className="font-mono">{t('order1Price')}</span>
          </li>
          <Reveal as="li" show={step >= 4}>
            <div className="flex items-center justify-between rounded-lg border border-accent bg-white px-3 py-2 text-[12px] text-ink shadow-[0_0_0_3px_rgba(0,111,104,0.10)]">
              <span className="font-semibold">{t('order2')}</span>
              <span className="font-mono">{t('price')}</span>
            </div>
          </Reveal>
        </ul>
        <Reveal show={step >= 5} className="mt-3">
          <div className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
            <RefreshCw aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <span className="text-[12px] text-ink-2">{t('synced')}</span>
            <span className="ml-auto rounded-full bg-mint px-2 py-0.5 font-mono text-[10px] uppercase text-ink">PMS</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
