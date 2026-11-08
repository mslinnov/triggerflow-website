'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowDown, ArrowUp, BedDouble, Check, Mail, Phone } from 'lucide-react';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';
import { Reveal } from './shared';

/** Étapes : 0 repos · 1 PMS → TF · 2 TF → PMS · 3 doublons détectés · 4 fusion · 5 fiche unique. */
const DURATIONS = [600, 1500, 1500, 1300, 900, 1];

const SOURCES = [
  { name: 'J. Dupont', detail: 'jdupont@gmail.com', source: 'PMS', pos: 'top-0 -rotate-[1.5deg]' },
  { name: 'Jean Dupont', detail: '+33 6 12 34 56 78', source: 'Booking.com', pos: 'top-[60px] rotate-0' },
  { name: 'jean.dupont', detail: 'form', source: 'form', pos: 'top-[120px] rotate-[1.5deg]' },
] as const;

/** Fiabilité : synchronisation dans les deux sens avec le PMS, puis doublons fusionnés en une fiche. */
export function ReliabilityScenario() {
  const t = useTranslations('visuals.reliability');
  const td = useTranslations('visuals.dedup');
  const { ref, step } = useScenario(DURATIONS);
  const merging = step >= 4;

  return (
    <div ref={ref} className="space-y-5">
      {/* 1. Synchronisation dans les deux sens */}
      <div className="rounded-xl border border-white/15 bg-white/[0.06] p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{t('syncLabel')}</p>
        <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <span className="flex h-11 items-center rounded-lg bg-white px-3">
            <Image src="/images/integrations/thais.svg" alt="Thaïs" width={53} height={16} className="h-4 w-auto" />
          </span>
          <div className="relative h-11">
            {/* Deux voies : réservation vers TriggerFlow, informations vers le PMS */}
            <span className="absolute inset-x-0 top-3 h-px bg-white/20" />
            <span className="absolute inset-x-0 bottom-3 h-px bg-white/20" />
            <span
              className={cn(
                'absolute top-3 h-2 w-2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_12px_rgba(204,226,225,0.9)] transition-all duration-[1200ms] ease-in-out',
                step >= 1 ? 'left-[calc(100%-8px)] opacity-100' : 'left-0 opacity-0'
              )}
            />
            <span
              className={cn(
                'absolute bottom-3 h-2 w-2 translate-y-1/2 rounded-full bg-peach shadow-[0_0_12px_rgba(255,207,162,0.9)] transition-all duration-[1200ms] ease-in-out',
                step >= 2 ? 'left-0 opacity-100' : 'left-[calc(100%-8px)] opacity-0'
              )}
            />
          </div>
          <span className="flex h-11 items-center rounded-lg bg-accent px-3 text-[13px] font-semibold text-white">TriggerFlow</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Reveal show={step >= 1}>
            <p className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-[13px] text-white/90">
              <ArrowDown aria-hidden className="h-3.5 w-3.5 shrink-0 -rotate-90 text-mint" />
              {t('inbound')}
            </p>
          </Reveal>
          <Reveal show={step >= 2}>
            <p className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-2 text-[13px] text-white/90">
              <ArrowUp aria-hidden className="h-3.5 w-3.5 shrink-0 -rotate-90 text-peach" />
              {t('outbound')}
            </p>
          </Reveal>
        </div>
      </div>

      {/* 2. Doublons détectés puis fusionnés */}
      <div className="rounded-xl border border-white/15 bg-white/[0.06] p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{t('dedupLabel')}</p>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 font-mono text-[10.5px] uppercase transition-colors duration-500',
              merging ? 'bg-mint text-ink' : step >= 3 ? 'bg-peach text-ink' : 'bg-white/10 text-white/70'
            )}
          >
            {merging ? td('merged') : td('detected')}
          </span>
        </div>
        <div className="relative mt-4 h-[176px]">
          {SOURCES.map((s) => (
            <div
              key={s.source}
              className={cn(
                'absolute inset-x-2 rounded-lg border bg-white px-4 py-2.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                step >= 3 && !merging ? 'border-peach' : 'border-transparent',
                merging ? 'top-[56px] rotate-0 scale-95 opacity-0' : s.pos
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold text-ink">{s.name}</span>
                <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase text-ink-2">{s.source === 'form' ? td('form') : s.source}</span>
              </div>
              <p className="mt-0.5 font-mono text-[11px] text-ink-2">{s.detail === 'form' ? td('formSource') : s.detail}</p>
            </div>
          ))}
          <Reveal show={merging} from="scale" className="absolute inset-x-0 top-[36px]">
            <div className="rounded-xl border-2 border-mint bg-white p-4 shadow-[0_0_0_6px_rgba(204,226,225,0.15)]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-[12px] text-white">JD</span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">Jean Dupont</p>
                  <p className="flex items-center gap-1 font-mono text-[10.5px] uppercase text-accent">
                    <Check aria-hidden className="h-3 w-3" />
                    {td('oneProfile')}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[12px] text-ink-2">
                <span className="flex items-center gap-1"><Mail aria-hidden className="h-3.5 w-3.5 text-accent" />{td('email')}</span>
                <span className="flex items-center gap-1"><Phone aria-hidden className="h-3.5 w-3.5 text-accent" />{td('phone')}</span>
                <span className="flex items-center gap-1"><BedDouble aria-hidden className="h-3.5 w-3.5 text-accent" />{td('stays')}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
