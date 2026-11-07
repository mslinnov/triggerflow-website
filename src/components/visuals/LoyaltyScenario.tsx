'use client';

import { useTranslations } from 'next-intl';
import { Award, Wallet } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { Reveal } from './shared';

const DURATIONS = [900, 1100, 1000, 1000, 1];

/** Séjour terminé → points crédités → palier atteint → carte Wallet mise à jour. */
export function LoyaltyScenario() {
  const t = useTranslations('visuals.loyalty');
  const { ref, step } = useScenario(DURATIONS);
  const points = step >= 1 ? 1240 : 880;
  const pct = Math.min(100, Math.round((points / 1200) * 100));
  return (
    <div ref={ref} className="grid items-center gap-6 p-5 sm:p-8 md:grid-cols-2">
      <div className="rounded-xl border border-line bg-white p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('account')}</p>
        <p className="mt-2 text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink transition-all">{points.toLocaleString('fr-FR')} pts</p>
        <Reveal show={step >= 1}><p className="text-[12.5px] text-accent">{t('credited')}</p></Reveal>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper">
          <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase text-ink-3"><span>Silver</span><span>Gold · 1 200</span></div>
        <Reveal show={step >= 2} className="mt-4">
          <p className="flex items-center gap-2 rounded-lg bg-peach px-3 py-2 text-[13px] font-semibold text-ink"><Award aria-hidden className="h-4 w-4" />{t('tier')}</p>
        </Reveal>
      </div>
      <Reveal show={step >= 3} from="scale">
        <div className="mx-auto w-full max-w-[280px] rounded-2xl bg-ink p-5 text-white shadow-product">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">Hôtel des Tilleuls</p>
            <Wallet aria-hidden className="h-4 w-4 text-mint" />
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-white/60">{t('member')}</p>
          <p className="text-[15px] font-semibold">Camille Laurent</p>
          <div className="mt-4 flex items-end justify-between">
            <span className="rounded-full bg-peach px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink">Gold</span>
            <span className="font-mono text-[13px]">1 240 pts</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
