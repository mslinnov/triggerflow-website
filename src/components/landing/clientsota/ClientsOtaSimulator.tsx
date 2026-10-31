'use client';

import { useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { calculateAvoidedCommission, OTA_SIMULATOR_BOUNDS, type OtaSimulatorInput } from '@/lib/ota-simulator';
import { cn } from '@/lib/utils';
import { UpsellAmount, UpsellEyebrow, UpsellLinkButton, UpsellSection } from '../upsell/primitives';

/**
 * Simulateur de commissions évitées (réponse de Mounir à Q22 : sur la page,
 * hypothèses annoncées comme illustratives).
 *
 * L'état reste local à la section : contrairement au simulateur des ventes
 * additionnelles, rien n'est transmis au formulaire, qui ne demande que
 * l'adresse e-mail. Un contexte partagé n'aurait aucun lecteur.
 *
 * Le paragraphe d'hypothèses est affiché en permanence sous le résultat, pas
 * replié : un montant en euros lu sans ses hypothèses passerait pour une
 * promesse.
 */
type SliderKey = keyof OtaSimulatorInput;

const SLIDERS: readonly SliderKey[] = [
  'otaStaysPerYear',
  'averageBasket',
  'commissionRate',
  'captureRate',
  'directReturnRate',
];

function defaults(): OtaSimulatorInput {
  return {
    otaStaysPerYear: OTA_SIMULATOR_BOUNDS.otaStaysPerYear.default,
    averageBasket: OTA_SIMULATOR_BOUNDS.averageBasket.default,
    commissionRate: OTA_SIMULATOR_BOUNDS.commissionRate.default,
    captureRate: OTA_SIMULATOR_BOUNDS.captureRate.default,
    directReturnRate: OTA_SIMULATOR_BOUNDS.directReturnRate.default,
  };
}

export function ClientsOtaSimulator() {
  const t = useTranslations('lpClientsOta.simulator');
  const tc = useTranslations('lpClientsOta.cta');
  const [input, setInput] = useState<OtaSimulatorInput>(defaults);
  const tracked = useRef(false);

  const result = useMemo(() => calculateAvoidedCommission(input), [input]);

  function update(key: SliderKey, value: number) {
    if (!tracked.current) {
      tracked.current = true;
      trackMetaEvent('ViewContent', { content_name: 'lp-clientsota-simulator' });
    }
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <UpsellSection id="simulateur" className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-12">
          <div className="space-y-8 rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 md:p-8">
            {SLIDERS.map((key) => (
              <Slider
                key={key}
                id={key}
                label={t(`${key}.label`)}
                hint={t(`${key}.hint`)}
                value={input[key]}
                suffix={t(`${key}.suffix`)}
                bounds={OTA_SIMULATOR_BOUNDS[key]}
                onChange={(value) => update(key, value)}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 shadow-[var(--up-shadow-lg)] md:p-8 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-[var(--up-ink-soft)]">{t('resultLabel')}</p>
            <p className="mt-2 text-[3.25rem] font-semibold leading-none tracking-[-0.03em] text-[var(--up-accent-text)] md:text-6xl">
              <UpsellAmount amount={result.avoidedCommission} />
            </p>
            <p className="mt-1.5 text-sm text-[var(--up-ink-muted)]">{t('perYear')}</p>

            <dl className="mt-6 space-y-3 border-t border-[var(--up-line)] pt-6 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--up-ink-soft)]">{t('captured')}</dt>
                <dd className="font-[family-name:var(--font-geist-mono)] font-semibold text-[var(--up-ink)]">
                  {result.capturedGuests}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--up-ink-soft)]">{t('returns')}</dt>
                <dd className="font-[family-name:var(--font-geist-mono)] font-semibold text-[var(--up-ink)]">
                  {result.directReturns}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[var(--up-ink-soft)]">{t('revenue')}</dt>
                <dd className="font-semibold text-[var(--up-ink)]">
                  <UpsellAmount amount={result.directRevenue} />
                </dd>
              </div>
            </dl>

            <UpsellLinkButton href="#formulaire" size="lg" className="mt-7 w-full">
              {tc('guide')}
            </UpsellLinkButton>

            <p className="mt-6 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
              {t('assumptions')}
            </p>
          </div>
        </div>
      </div>
    </UpsellSection>
  );
}

interface SliderProps {
  id: string;
  label: string;
  hint: string;
  value: number;
  suffix: string;
  bounds: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}

/** Même curseur que le simulateur des ventes additionnelles : zone tactile de 44 px. */
function Slider({ id, label, hint, value, suffix, bounds, onChange }: SliderProps) {
  const inputId = `ota-slider-${id}`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-[var(--up-ink)]" htmlFor={inputId}>
          {label}
        </label>
        <output
          htmlFor={inputId}
          className="shrink-0 font-[family-name:var(--font-geist-mono)] text-lg font-semibold text-[var(--up-ink)]"
        >
          {value}
          <span className="ml-1 text-sm font-normal text-[var(--up-ink-muted)]">{suffix}</span>
        </output>
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">{hint}</p>
      <input
        id={inputId}
        type="range"
        min={bounds.min}
        max={bounds.max}
        step={bounds.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          'mt-1 h-11 w-full cursor-pointer appearance-none bg-transparent',
          'focus:outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[var(--up-accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--up-surface)]',
          '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[var(--up-bg-sunken)]',
          '[&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--up-surface)] [&::-webkit-slider-thumb]:bg-[var(--up-accent)] [&::-webkit-slider-thumb]:shadow-[var(--up-shadow-sm)]',
          '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[var(--up-bg-sunken)]',
          '[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--up-surface)] [&::-moz-range-thumb]:bg-[var(--up-accent)]'
        )}
      />
      <div className="flex justify-between font-[family-name:var(--font-geist-mono)] text-xs text-[var(--up-ink-muted)]">
        <span>{bounds.min}</span>
        <span>{bounds.max}</span>
      </div>
    </div>
  );
}
