'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, ClipboardList, Clock, Filter, Mail, MessageCircle, UserRound, X } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { FlowNode, Reveal } from './shared';

/**
 * Étapes : 0 repos · 1 données entrantes · 2 filtre · 3 cardex · 4-6 conditions · 7 email · 8 attente · 9 WhatsApp.
 */
const DURATIONS = [700, 1100, 900, 1000, 700, 700, 900, 1000, 900, 1];

const SOURCES = [
  { key: 'pms', logo: '/images/integrations/thais.svg', w: 53, h: 16, size: 'h-4' },
  { key: 'ota', logo: '/images/integrations/booking.svg', w: 16, h: 16, size: 'h-4' },
  { key: 'pay', logo: '/images/integrations/stripe.svg', w: 38, h: 16, size: 'h-4' },
  { key: 'lock', logo: '/images/integrations/salto.svg', w: 35, h: 16, size: 'h-4' },
  { key: 'form', logo: null, w: 0, h: 0, size: '' },
] as const;

/** Trajets des données : 5 sources (x = 10, 30, 50, 70, 90) qui convergent vers le filtre. */
const PATHS = ['M10 0 C10 22 50 18 50 40', 'M30 0 C30 22 50 18 50 40', 'M50 0 L50 40', 'M70 0 C70 22 50 18 50 40', 'M90 0 C90 22 50 18 50 40'];

/** Du flux de données à l'action : sources connectées, fiche client unique, arbre de décision, messages. */
export function DataFlowScenario() {
  const t = useTranslations('visuals.dataFlow');
  const { ref, step } = useScenario(DURATIONS);
  const conditions = ['ota', 'christmas', 'rooms'] as const;

  return (
    <div ref={ref} className="relative mx-auto max-w-[600px] px-4 py-7 sm:px-7">
      {/* 1. Les sources connectées */}
      <ul className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {SOURCES.map((s) => (
          <li
            key={s.key}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-lg border bg-white px-1 py-2 transition-colors duration-500',
              step >= 1 ? 'border-accent/50' : 'border-line'
            )}
          >
            <span className="flex h-4 items-center">
              {s.logo ? (
                <Image src={s.logo} alt="" width={s.w} height={s.h} className={cn(s.size, 'w-auto max-w-full')} />
              ) : (
                <ClipboardList aria-hidden className="h-4 w-4 text-accent" />
              )}
            </span>
            <span className="text-center font-mono text-[8px] uppercase leading-tight text-ink-3 sm:text-[10px] sm:tracking-[0.04em]">{t(`sources.${s.key}`)}</span>
          </li>
        ))}
      </ul>

      <div className="relative h-9">
        <DataLines className="absolute inset-x-0 top-0 h-9" stroke="#E4E8E7" />
        <div className={cn('absolute inset-x-0 top-0 overflow-hidden transition-[height] duration-700 ease-out', step >= 1 ? 'h-full' : 'h-0')}>
          <DataLines className="h-9" stroke="#006F68" />
        </div>
      </div>

      {/* 2. Une seule carte centrée : le filtre fusionne les doublons, puis le cardex est mis à jour */}
      <div
        className={cn(
          'mx-auto grid max-w-[420px] grid-cols-[auto_auto_1fr] items-center gap-3 rounded-xl border bg-white px-3.5 py-3 transition-all duration-500',
          step >= 2 ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.12)]' : 'border-line'
        )}
      >
        <div>
          <span className="inline-flex rounded-full bg-mint/60 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-accent-hover">{t('filterLabel')}</span>
          <p className="mt-2 flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors', step >= 2 ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>
              <Filter aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span className="leading-tight">{t('filterTitle')}</span>
          </p>
        </div>
        <ArrowRight aria-hidden className={cn('h-4 w-4 transition-colors duration-500', step >= 3 ? 'text-accent' : 'text-line')} />
        <div className="min-w-0 border-l border-line pl-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
              <span className={cn('flex h-6 w-6 items-center justify-center rounded-full transition-colors', step >= 3 ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>
                <UserRound aria-hidden className="h-3.5 w-3.5" />
              </span>
              Jean Dupont
            </span>
            <Reveal show={step >= 3} from="scale">
              <span className="rounded-full bg-mint px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.04em] text-accent-hover">{t('updated')}</span>
            </Reveal>
          </div>
          <p className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.03em] text-ink-3">{t('cardex')}</p>
        </div>
      </div>

      <div className="relative mx-auto h-5 w-px bg-line">
        <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all duration-500', step >= 4 ? 'h-full' : 'h-0')} />
      </div>

      {/* 3. L'arbre de décision */}
      <div className={cn('mx-auto max-w-[380px] rounded-xl border bg-white px-3.5 py-3 transition-colors duration-500', step >= 4 ? 'border-accent' : 'border-line')}>
        <span className="inline-flex rounded-full bg-peach/50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-[#8A5A1C]">{t('conditionLabel')}</span>
        <ul className="mt-2.5 space-y-1.5">
          {conditions.map((c, i) => {
            const on = step >= 4 + i;
            return (
              <li key={c} className="flex items-center justify-between gap-3 text-[12.5px]">
                <span className={cn('transition-colors', on ? 'font-semibold text-ink' : 'text-ink-3')}>{t(`conditions.${c}`)}</span>
                <span
                  className={cn(
                    'flex h-5 shrink-0 items-center gap-1 rounded-full px-1.5 font-mono text-[9px] uppercase transition-colors duration-300',
                    on ? 'bg-accent text-white' : 'bg-paper text-ink-3'
                  )}
                >
                  <Check aria-hidden className="h-3 w-3" />
                  {t('yes')}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Branches OUI / NON, alignées sur le centre des deux colonnes */}
      <div className="relative h-7">
        <div className="absolute left-1/2 top-0 h-2.5 w-px bg-line">
          <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all duration-300', step >= 7 ? 'h-full' : 'h-0')} />
        </div>
        <div className="absolute left-1/4 right-1/4 top-2.5 h-px bg-line" />
        <div className={cn('absolute right-1/2 top-2.5 h-px bg-accent transition-all delay-200 duration-300', step >= 7 ? 'w-1/4' : 'w-0')} />
        <div className="absolute left-1/4 top-2.5 h-4.5 w-px bg-line">
          <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all delay-500 duration-300', step >= 7 ? 'h-full' : 'h-0')} />
        </div>
        <div className="absolute right-1/4 top-2.5 h-4.5 w-px bg-line" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* OUI : formulaire par email, puis relance WhatsApp */}
        <div>
          <p className={cn('mb-2 text-center font-mono text-[10px] uppercase', step >= 7 ? 'text-accent' : 'text-ink-3')}>{t('yesBranch')}</p>
          <FlowNode kind="action" label={t('action')} title={t('email')} active={step >= 7} icon={<Mail className="h-3.5 w-3.5" />} />
          <div className="relative mx-auto h-4 w-px bg-line">
            <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all duration-500', step >= 8 ? 'h-full' : 'h-0')} />
          </div>
          <div
            className={cn(
              'mx-auto flex w-fit items-center gap-1.5 rounded-full border bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.03em] transition-colors duration-500',
              step >= 8 ? 'border-accent text-accent' : 'border-line text-ink-3'
            )}
          >
            <Clock aria-hidden className="h-3 w-3" />
            {t('wait')}
          </div>
          <div className="relative mx-auto h-4 w-px bg-line">
            <div className={cn('absolute inset-x-0 top-0 bg-accent transition-all duration-500', step >= 9 ? 'h-full' : 'h-0')} />
          </div>
          <FlowNode kind="action" label={t('followUp')} title={t('whatsapp')} active={step >= 9} icon={<MessageCircle className="h-3.5 w-3.5" />} />
        </div>

        {/* NON : un autre scénario */}
        <div>
          <p className="mb-2 text-center font-mono text-[10px] uppercase text-ink-3">{t('noBranch')}</p>
          <div className="rounded-xl border border-dashed border-line bg-white/70 px-3.5 py-3 opacity-80">
            <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-ink-3">
              <X aria-hidden className="h-3 w-3" />
              {t('otherLabel')}
            </span>
            <p className="mt-2 text-[12.5px] leading-snug text-ink-3">{t('other')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Les 5 trajets, en pixels réels de largeur (trait net à toute taille). */
function DataLines({ className, stroke }: { className?: string; stroke: string }) {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden className={cn('block w-full', className)}>
      {PATHS.map((d) => (
        <path key={d} d={d} fill="none" stroke={stroke} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
