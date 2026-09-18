'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import {
  POST_STAY_BOUNDS,
  POST_STAY_CTA_SHAPES,
  POST_STAY_REVIEW_LINK,
  POST_STAY_SEND_HOURS,
  sampleSizeOf,
  type CtaShapeId,
  type SendHourId,
} from '@/data/post-stay';
import { cn } from '@/lib/utils';
// Primitives partagées avec la landing jumelle : elles ne portent aucune
// donnée de la page des ventes additionnelles, seulement la grammaire visuelle
// commune aux deux LP (rayons, hauteurs tactiles, composition des chiffres).
// Les dupliquer ferait diverger deux boutons qui doivent rester identiques.
import { UpsellEyebrow, UpsellSection } from '../upsell/primitives';
import { PostStayResultPanel } from './PostStayResultPanel';
import { usePostStay } from './PostStayContext';

/**
 * Le simulateur : les commandes à gauche, le résultat à droite. Cœur de la
 * page, placé juste après la bande de réassurance.
 *
 * Chaque choix porte le taux mesuré qui lui correspond, visible avant même
 * d'être sélectionné. C'est le contraire d'un calculateur qui cache sa
 * mécanique : le visiteur voit sur quoi repose son propre résultat, et peut
 * contester la mesure plutôt que de subir une promesse.
 *
 * ─── LE CRÉNEAU NON MESURÉ ───────────────────────────────────────────────
 * `POST_STAY_SEND_HOURS` marque « avant 9 h » avec `isMeasured: false` : le
 * rapport n'a pas assez d'envois pour isoler ce créneau, et sa valeur est un
 * repère prudent. Ce drapeau est affiché à l'écran, sur la pastille puis en
 * toutes lettres quand le créneau est retenu. Un drapeau que personne
 * n'affiche ne protège personne : c'est le seul chiffre de la page qui n'est
 * pas une mesure, il doit être le seul à porter cette alerte-là.
 *
 * ─── LE CRÉNEAU MESURÉ SUR UN ÉCHANTILLON MINCE ──────────────────────────
 * Le créneau « après 20 h » est bien mesuré, mais sur 557 envois quand les
 * autres en comptent des milliers, et c'est lui qui fabrique l'écart annoncé
 * dans la bande de réassurance. Il porte donc sa propre pastille et sa propre
 * note, distinctes de celles du créneau non mesuré : une mesure fragile n'est
 * pas une absence de mesure, et confondre les deux affaiblirait les deux
 * avertissements.
 */
export function PostStaySimulator() {
  const t = useTranslations('lpPostStay.simulator');
  const {
    rooms,
    setRooms,
    occupancy,
    setOccupancy,
    sendHourId,
    setSendHourId,
    ctaShapeId,
    setCtaShapeId,
    hasReviewSiteLink,
    setHasReviewSiteLink,
    hasInteracted,
    markInteracted,
  } = usePostStay();

  const trackedRef = useRef(false);
  useEffect(() => {
    if (!hasInteracted || trackedRef.current) return;
    trackedRef.current = true;
    trackMetaEvent('ViewContent', { content_name: 'lp-poststay-simulator' });
  }, [hasInteracted]);

  const selectedHour = POST_STAY_SEND_HOURS.find((hour) => hour.id === sendHourId);
  const isSelectedHourEstimated = selectedHour ? !selectedHour.isMeasured : false;
  // `sampleSize` n'est renseigné que sur les créneaux trop minces pour être
  // lus comme les autres. Voir post-stay.ts : c'est le seul volume exporté.
  const selectedThinSample = selectedHour ? sampleSizeOf(selectedHour) : undefined;

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
          <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 sm:p-6 md:p-8">
            <Slider
              id="rooms"
              label={t('roomsLabel')}
              value={rooms}
              suffix={t('roomsSuffix', { count: rooms })}
              bounds={POST_STAY_BOUNDS.rooms}
              onChange={(value) => {
                markInteracted();
                setRooms(value);
              }}
            />

            <div className="mt-8">
              <Slider
                id="occupancy"
                label={t('occupancyLabel')}
                value={occupancy}
                suffix="%"
                bounds={POST_STAY_BOUNDS.occupancy}
                onChange={(value) => {
                  markInteracted();
                  setOccupancy(value);
                }}
              />
            </div>

            {/* Heure d'envoi */}
            <fieldset className="mt-10 border-t border-[var(--up-line)] pt-8">
              <legend className="sr-only">{t('hourLabel')}</legend>
              <p className="text-sm font-medium text-[var(--up-ink)]">{t('hourLabel')}</p>
              <p className="mt-1 text-sm text-[var(--up-ink-soft)]">{t('hourHint')}</p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {POST_STAY_SEND_HOURS.map((hour) => (
                  <Choice
                    key={hour.id}
                    name="post-stay-hour"
                    checked={hour.id === sendHourId}
                    label={t(`hours.${hour.id}`)}
                    note={
                      hour.isMeasured
                        ? t('measured', { rate: t('rateValue', { rate: hour.completionRate * 100 }) })
                        : undefined
                    }
                    badge={
                      !hour.isMeasured
                        ? t('notMeasuredBadge')
                        : sampleSizeOf(hour) !== undefined
                          ? t('thinSampleBadge')
                          : undefined
                    }
                    onSelect={() => {
                      markInteracted();
                      setSendHourId(hour.id as SendHourId);
                    }}
                  />
                ))}
              </div>

              {/* Le drapeau `isMeasured: false` de post-stay.ts, rendu lisible.
                  Il n'apparaît qu'une fois le créneau retenu, pour ne pas noyer
                  les cinq créneaux mesurés sous un avertissement permanent. */}
              {isSelectedHourEstimated && (
                <p
                  role="status"
                  className="mt-4 flex gap-2.5 rounded-xl border border-[var(--up-line-strong)] bg-[var(--up-surface-alt)] p-4 text-[13px] leading-relaxed text-[var(--up-ink-soft)]"
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--up-accent-text)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {t('notMeasuredNote')}
                </p>
              )}

              {/* Même traitement pour le créneau le plus mince de la table. Il
                  est bien mesuré, mais sur 557 envois quand les autres en
                  comptent des milliers, et c'est lui qui fabrique l'écart
                  annoncé plus haut : le visiteur doit pouvoir en tenir compte
                  au lieu de le découvrir dans le rapport. */}
              {selectedThinSample !== undefined && (
                <p
                  role="status"
                  className="mt-4 flex gap-2.5 rounded-xl border border-[var(--up-line-strong)] bg-[var(--up-surface-alt)] p-4 text-[13px] leading-relaxed text-[var(--up-ink-soft)]"
                >
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--up-accent-text)]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {t('thinSampleNote', { sends: selectedThinSample })}
                </p>
              )}
            </fieldset>

            {/* Forme de l'appel à l'action */}
            <fieldset className="mt-9 border-t border-[var(--up-line)] pt-8">
              <legend className="sr-only">{t('ctaLabel')}</legend>
              <p className="text-sm font-medium text-[var(--up-ink)]">{t('ctaLabel')}</p>
              <p className="mt-1 text-sm text-[var(--up-ink-soft)]">{t('ctaHint')}</p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {POST_STAY_CTA_SHAPES.map((shape) => (
                  <Choice
                    key={shape.id}
                    name="post-stay-cta"
                    checked={shape.id === ctaShapeId}
                    label={t(`shapes.${shape.id}`)}
                    note={t('measured', {
                      rate: t('rateValue', { rate: shape.completionRate * 100 }),
                    })}
                    onSelect={() => {
                      markInteracted();
                      setCtaShapeId(shape.id as CtaShapeId);
                    }}
                  />
                ))}
              </div>
            </fieldset>

            {/* Lien vers une plateforme d'avis concurrente */}
            <fieldset className="mt-9 border-t border-[var(--up-line)] pt-8">
              <legend className="sr-only">{t('reviewLinkLabel')}</legend>
              <p className="text-sm font-medium text-[var(--up-ink)]">{t('reviewLinkLabel')}</p>
              <p className="mt-1 text-sm text-[var(--up-ink-soft)]">{t('reviewLinkHint')}</p>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Choice
                  name="post-stay-review-link"
                  checked={!hasReviewSiteLink}
                  label={t('reviewLinkAbsent')}
                  note={t('measured', {
                    rate: t('rateValue', {
                      rate: POST_STAY_REVIEW_LINK.absent.completionRate * 100,
                    }),
                  })}
                  onSelect={() => {
                    markInteracted();
                    setHasReviewSiteLink(false);
                  }}
                />
                <Choice
                  name="post-stay-review-link"
                  checked={hasReviewSiteLink}
                  label={t('reviewLinkPresent')}
                  note={t('measured', {
                    rate: t('rateValue', {
                      rate: POST_STAY_REVIEW_LINK.present.completionRate * 100,
                    }),
                  })}
                  onSelect={() => {
                    markInteracted();
                    setHasReviewSiteLink(true);
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="lg:sticky lg:top-24">
            <PostStayResultPanel />
          </div>
        </div>
      </div>
    </UpsellSection>
  );
}

/**
 * Un choix de réglage. Bouton radio natif masqué plutôt qu'un `<button>` :
 * les six créneaux forment un seul groupe pour le clavier et pour les
 * lecteurs d'écran, ce qu'une rangée de boutons ne donne pas gratuitement.
 */
function Choice({
  name,
  checked,
  label,
  note,
  badge,
  onSelect,
}: {
  name: string;
  checked: boolean;
  label: string;
  note?: string;
  badge?: string;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        'flex min-h-11 cursor-pointer flex-col justify-center gap-0.5 rounded-xl border px-4 py-3 transition-colors',
        'focus-within:ring-2 focus-within:ring-[var(--up-accent)]/40',
        checked
          ? 'border-[var(--up-accent)] bg-[var(--up-accent-wash)]'
          : 'border-[var(--up-line-strong)] bg-[var(--up-surface)] hover:border-[var(--up-ink-muted)]'
      )}
    >
      <input
        type="radio"
        name={name}
        className="sr-only"
        checked={checked}
        onChange={onSelect}
      />
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={cn(
            'text-sm font-medium',
            checked ? 'text-[var(--up-ink)]' : 'text-[var(--up-ink-soft)]'
          )}
        >
          {label}
        </span>
        {badge && (
          <span className="rounded-full border border-[var(--up-line-strong)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--up-ink-muted)]">
            {badge}
          </span>
        )}
      </span>
      {note && (
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--up-ink-muted)]">
          {note}
        </span>
      )}
    </label>
  );
}

interface SliderProps {
  /** Identifiant stable, indépendant du libellé traduit. */
  id: string;
  label: string;
  value: number;
  suffix: string;
  bounds: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}

/**
 * Curseur repris trait pour trait de la landing jumelle : zone tactile de
 * 44 px, piste et poignée redessinées en pseudo-éléments. Le curseur natif ne
 * fait que 8 px de haut, ce qui impose un geste de précision sur mobile, là où
 * arrive la quasi-totalité du trafic payant.
 */
function Slider({ id, label, value, suffix, bounds, onChange }: SliderProps) {
  const inputId = `poststay-slider-${id}`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-[var(--up-ink)]" htmlFor={inputId}>
          {label}
        </label>
        <output
          htmlFor={inputId}
          className="font-[family-name:var(--font-geist-mono)] text-lg font-semibold text-[var(--up-ink)]"
        >
          {value}
          <span className="ml-1 text-sm font-normal text-[var(--up-ink-muted)]">{suffix}</span>
        </output>
      </div>
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
