'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { SIMULATOR_BOUNDS, UPSELL_SERVICES } from '@/data/upsell-services';
import { cn } from '@/lib/utils';
import { UpsellEyebrow, UpsellSection } from './primitives';
import { UpsellIcon } from './UpsellIcon';
import { UpsellResultPanel } from './UpsellResultPanel';
import { useUpsell } from './UpsellContext';

/**
 * Le simulateur : commandes à gauche, résultat à droite. C'est le cœur de la
 * page, placé haut volontairement. La première manipulation déclenche
 * l'événement Meta ViewContent, ce qui donne un signal d'engagement exploitable
 * pour l'optimisation des campagnes.
 */
export function UpsellSimulator() {
  const t = useTranslations('lpUpsell.simulator');
  const tServices = useTranslations('lpUpsell.services');
  const {
    rooms,
    setRooms,
    occupancy,
    setOccupancy,
    enabledIds,
    toggleService,
    hasInteracted,
    markInteracted,
    goal,
  } = useUpsell();

  const trackedRef = useRef(false);
  useEffect(() => {
    if (!hasInteracted || trackedRef.current) return;
    trackedRef.current = true;
    trackMetaEvent('ViewContent', { content_name: 'lp-upsell-simulator', variant: goal });
  }, [hasInteracted, goal]);

  return (
    <UpsellSection id="simulateur" className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-12">
          <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 md:p-8">
            <Slider
              label={t('roomsLabel')}
              value={rooms}
              suffix={t('roomsSuffix', { count: rooms })}
              bounds={SIMULATOR_BOUNDS.rooms}
              onChange={(value) => {
                markInteracted();
                setRooms(value);
              }}
            />

            <div className="mt-8">
              <Slider
                label={t('occupancyLabel')}
                value={occupancy}
                suffix="%"
                bounds={SIMULATOR_BOUNDS.occupancy}
                onChange={(value) => {
                  markInteracted();
                  setOccupancy(value);
                }}
              />
            </div>

            <fieldset className="mt-10 border-t border-[var(--up-line)] pt-8">
              <legend className="sr-only">{t('servicesLabel')}</legend>
              <p className="text-sm font-medium text-[var(--up-ink)]">{t('servicesLabel')}</p>
              <p className="mt-1 text-sm text-[var(--up-ink-soft)]">{t('servicesHint')}</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {UPSELL_SERVICES.map((service) => {
                  const checked = enabledIds.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={cn(
                        'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors',
                        'focus-within:ring-2 focus-within:ring-[var(--up-accent)]/40',
                        checked
                          ? 'border-[var(--up-accent)] bg-[var(--up-accent-wash)] text-[var(--up-ink)]'
                          : 'border-[var(--up-line-strong)] bg-[var(--up-surface)] text-[var(--up-ink-soft)] hover:border-[var(--up-ink-muted)]'
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => {
                          markInteracted();
                          toggleService(service.id);
                        }}
                      />
                      <UpsellIcon
                        name={service.icon}
                        className={cn(
                          'h-4 w-4',
                          checked ? 'text-[var(--up-accent)]' : 'text-[var(--up-ink-muted)]'
                        )}
                      />
                      {tServices(`${service.id}.name`)}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="lg:sticky lg:top-24">
            <UpsellResultPanel />
          </div>
        </div>
      </div>
    </UpsellSection>
  );
}

interface SliderProps {
  label: string;
  value: number;
  suffix: string;
  bounds: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}

function Slider({ label, value, suffix, bounds, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-[var(--up-ink)]" htmlFor={`slider-${label}`}>
          {label}
        </label>
        <output
          htmlFor={`slider-${label}`}
          className="font-[family-name:var(--font-geist-mono)] text-lg font-semibold text-[var(--up-ink)]"
        >
          {value}
          <span className="ml-1 text-sm font-normal text-[var(--up-ink-muted)]">{suffix}</span>
        </output>
      </div>
      {/* Le curseur natif ne fait que 8 px de haut : on lui donne une zone
          tactile de 44 px et on redessine piste et poignée en pseudo-éléments,
          plutôt que d'imposer un geste de précision sur mobile. */}
      <input
        id={`slider-${label}`}
        type="range"
        min={bounds.min}
        max={bounds.max}
        step={bounds.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          'mt-1 h-11 w-full cursor-pointer appearance-none bg-transparent',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--up-accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--up-surface)] focus-visible:rounded-full',
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
