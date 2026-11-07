'use client';

import { useTranslations } from 'next-intl';
import { CalendarClock, ClipboardList, Filter, Mail } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { FlowNode, Reveal } from './shared';

const DURATIONS = [800, 900, 900, 900, 1];

/** L'arbre réel du flow « Confirmation de réservation » (compte de démo) qui s'allume branche par branche. */
export function FlowTreeScenario() {
  const t = useTranslations('visuals.flowTree');
  const { ref, step } = useScenario(DURATIONS);

  return (
    <div ref={ref} className="relative mx-auto max-w-[560px] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-[260px]">
        <Reveal show={step >= 1}>
          <div className="mb-2 text-center">
            <span className="rounded-full bg-mint px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent-hover">{t('triggered')}</span>
          </div>
        </Reveal>
        <FlowNode kind="trigger" label={t('trigger')} title={t('triggerTitle')} active={step >= 1} icon={<CalendarClock className="h-3.5 w-3.5" />} />
      </div>
      <div className="mx-auto h-6 w-px bg-line">
        <div className={cn('w-full bg-accent transition-all duration-500', step >= 2 ? 'h-full' : 'h-0')} />
      </div>
      <div className="mx-auto max-w-[260px]">
        <FlowNode kind="condition" label={t('condition')} title={t('conditionTitle')} active={step >= 2} icon={<Filter className="h-3.5 w-3.5" />} />
      </div>
      {/* Branches */}
      <div className="relative mx-auto mt-0 h-8 max-w-[360px]">
        <div className="absolute left-1/2 top-0 h-3 w-px bg-line" />
        <div className="absolute left-[18%] right-[18%] top-3 h-px bg-line" />
        <div className={cn('absolute left-[18%] top-3 h-px bg-accent transition-all duration-500', step >= 3 ? 'w-[32%]' : 'w-0')} />
        <div className="absolute left-[18%] top-3 h-5 w-px bg-line" />
        <div className="absolute right-[18%] top-3 h-5 w-px bg-line" />
        <span className={cn('absolute left-[18%] top-5 -translate-x-1/2 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase transition-colors', step >= 3 ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>{t('yes')}</span>
        <span className="absolute right-[18%] top-5 translate-x-1/2 rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase text-ink-3">{t('no')}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <FlowNode kind="action" label={t('action')} title={t('yesAction')} active={step >= 4} icon={<Mail className="h-3.5 w-3.5" />} />
        <FlowNode kind="action" label={t('action')} title={t('noAction')} active={false} icon={<ClipboardList className="h-3.5 w-3.5" />} className="opacity-70" />
      </div>
    </div>
  );
}
