'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock, Check, Coffee, Filter, Mail, RefreshCw, Users } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Connector, FlowNode, Reveal } from './shared';

const DURATIONS = [700, 700, 700, 900, 700, 700, 900, 1100, 800, 1000, 1];

/**
 * Hero de la home : un segment se construit, un flow le prend en charge, l'offre part,
 * le client l'achète et la réservation est mise à jour dans le PMS. Données de démo fictives.
 */
export function HeroScenario() {
  const t = useTranslations('visuals.hero');
  const { ref, step } = useScenario(DURATIONS);
  const chips = [t('chip1'), t('chip2'), t('chip3')];
  const counts = ['142', '61', '24', '18'];
  const count = counts[Math.min(step, 3)];

  return (
    <div ref={ref} className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_1fr_1.05fr] lg:gap-5">
      {/* 1. Segment */}
      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <Filter aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            {t('segment')}
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-ink-3">
            <Users aria-hidden className="h-3.5 w-3.5" />
            <span className="tabular-nums text-ink">{count}</span> {t('guests')}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {chips.map((chip, i) => (
            <Reveal key={chip} show={step >= i + 1} from="left">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2 text-[12.5px] text-ink">
                <span className="font-mono text-[10px] uppercase text-ink-3">{i === 0 ? t('where') : t('and')}</span>
                {chip}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 2. Flow */}
      <div className="rounded-xl border border-line bg-paper/60 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('flow')}</p>
        <div className="mt-3">
          <FlowNode kind="trigger" label={t('trigger')} title={t('triggerTitle')} active={step >= 4} icon={<CalendarClock className="h-3.5 w-3.5" />} />
          <Connector active={step >= 5} />
          <FlowNode kind="condition" label={t('condition')} title={t('conditionTitle')} active={step >= 5} icon={<Filter className="h-3.5 w-3.5" />} />
          <Connector active={step >= 6} />
          <FlowNode kind="action" label={t('action')} title={t('actionTitle')} active={step >= 6} icon={<Mail className="h-3.5 w-3.5" />} />
        </div>
      </div>

      {/* 3. Côté client puis côté hôtel */}
      <div className="flex flex-col gap-3">
        <Reveal show={step >= 7}>
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-white">HT</span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-ink">{t('emailFrom')}</p>
                <p className="truncate text-[11px] text-ink-3">{t('emailSubject')}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-peach/60 text-ink">
                <Coffee aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t('offer')}</p>
                <p className="font-mono text-[12px] text-ink-2">{t('offerPrice')}</p>
              </div>
              <span
                className={cn(
                  'rounded-md px-3 py-1.5 font-mono text-[11px] font-medium uppercase transition-all duration-300',
                  step >= 8 ? 'scale-95 bg-accent-hover text-white' : 'bg-accent text-white'
                )}
              >
                {step >= 8 ? <Check aria-hidden className="h-3.5 w-3.5" /> : t('add')}
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal show={step >= 9}>
          <div className="flex items-center gap-3 rounded-xl bg-peach px-4 py-3 text-ink">
            <Check aria-hidden className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            <p className="text-[13px] font-semibold">{t('paid')}</p>
            <span className="ml-auto font-mono text-[13px] font-medium">{t('paidAmount')}</span>
          </div>
        </Reveal>
        <Reveal show={step >= 10}>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3">
            <RefreshCw aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <p className="text-[12.5px] text-ink-2">{t('synced')}</p>
            <span className="ml-auto rounded-full bg-mint px-2 py-0.5 font-mono text-[10px] uppercase text-ink">PMS</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
