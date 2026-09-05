'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarClock, CheckCircle2, Loader2 } from 'lucide-react';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL } from '@/data/upsell-links';
import { cn } from '@/lib/utils';
import { UpsellButton } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * Formulaire de conversion. Deux jeux de champs selon l'offre testée :
 *
 * - `demo` : qualification complète (hôtel, chambres, PMS, téléphone), parce
 *   qu'un commercial va rappeler et qu'il a besoin du contexte.
 * - `whitepaper` : friction minimale (prénom, hôtel, email), parce que la seule
 *   promesse est l'envoi d'un document.
 *
 * Le nombre de chambres et le potentiel estimé par le simulateur sont transmis
 * dans les deux cas : le lead arrive déjà qualifié côté CRM.
 */

/** Les dix PMS réellement connectés. Toute autre réponse passe par « Autre ». */
const PMS_OPTIONS = [
  'Mews',
  'Thaïs',
  'Opera Cloud',
  'Misterbooking',
  'Medialog',
  'Asterio',
  'Vega',
  'Protel',
  'Reservit',
  'Clock PMS',
] as const;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface UpsellLeadFormProps {
  /**
   * Préfixe des identifiants de champs. Explicite plutôt que `useId()` : un
   * identifiant généré produisait une divergence d'hydratation serveur/client.
   */
  idPrefix: string;
  className?: string;
}

export function UpsellLeadForm({ idPrefix, className }: UpsellLeadFormProps) {
  const t = useTranslations('lpUpsell.form');
  const locale = useLocale();
  const { rooms, result, goal } = useUpsell();

  const [status, setStatus] = useState<Status>('idle');

  // Le champ suit le curseur du simulateur tant que l'utilisateur ne l'a pas
  // édité lui-même. Valeur dérivée plutôt que synchronisée : pas d'effet, donc
  // pas de rendu en cascade quand le curseur bouge.
  const [roomsOverride, setRoomsOverride] = useState<string | null>(null);
  const roomsValue = roomsOverride ?? String(rooms);

  const isDemo = goal === 'demo';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          firstName: data.get('firstName'),
          hotelName: data.get('hotelName'),
          rooms: Number(data.get('rooms') ?? rooms),
          phone: data.get('phone'),
          pms: data.get('pms'),
          estimatedRevenue: result.monthlyRevenue,
          source: 'fb-upsell',
          goal,
          locale,
          honeypot: data.get('company'),
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !payload?.success) {
        setStatus('error');
        return;
      }

      trackMetaEvent('Lead', {
        content_name: 'lp-upsell',
        variant: goal,
        value: result.monthlyRevenue,
        currency: 'EUR',
      });

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-[var(--up-accent)] bg-[var(--up-accent-wash)] p-6 text-center',
          className
        )}
        role="status"
      >
        <CheckCircle2 className="mx-auto h-8 w-8 text-[var(--up-accent)]" strokeWidth={1.8} />
        <p className="mt-3 text-lg font-semibold text-[var(--up-ink)]">
          {t(isDemo ? 'demo.successTitle' : 'whitepaper.successTitle')}
        </p>
        <p className="mt-1.5 text-sm text-[var(--up-ink-soft)]">
          {t(isDemo ? 'demo.successBody' : 'whitepaper.successBody')}
        </p>

        {/* Le lead est déjà enregistré : proposer le créneau ici ne risque plus
            rien et évite un aller-retour d'emails pour caler la démo. */}
        {isDemo && (
          <a
            href={LEMCAL_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetaEvent('CompleteRegistration', { content_name: 'lp-upsell-booking', variant: goal })}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--up-accent)] px-6 py-3 text-sm font-semibold text-[var(--up-accent-ink)] transition-colors hover:bg-[var(--up-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--up-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--up-accent-wash)] active:translate-y-[1px]"
          >
            <CalendarClock className="h-4 w-4" strokeWidth={2} aria-hidden />
            {t('demo.book')}
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Piège à robots : invisible pour l'utilisateur, masqué aux lecteurs d'écran. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Société</label>
        <input id={`${idPrefix}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${idPrefix}-firstName`} label={t('firstName')}>
          <input
            id={`${idPrefix}-firstName`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </Field>
        <Field id={`${idPrefix}-hotelName`} label={t('hotelName')}>
          <input
            id={`${idPrefix}-hotelName`}
            name="hotelName"
            type="text"
            autoComplete="organization"
            required
            className={inputClass}
          />
        </Field>

        {isDemo && (
          <>
            <Field id={`${idPrefix}-rooms`} label={t('rooms')}>
              <input
                id={`${idPrefix}-rooms`}
                name="rooms"
                type="number"
                min={1}
                max={2000}
                required
                value={roomsValue}
                onChange={(event) => setRoomsOverride(event.target.value)}
                className={cn(inputClass, 'font-[family-name:var(--font-geist-mono)]')}
              />
            </Field>
            <Field id={`${idPrefix}-pms`} label={t('pms')}>
              <select id={`${idPrefix}-pms`} name="pms" defaultValue="" required className={inputClass}>
                <option value="" disabled>
                  {t('pmsPlaceholder')}
                </option>
                {PMS_OPTIONS.map((pms) => (
                  <option key={pms} value={pms}>
                    {pms}
                  </option>
                ))}
                <option value="Autre">{t('pmsOther')}</option>
              </select>
            </Field>
          </>
        )}

        <Field
          id={`${idPrefix}-email`}
          label={t('email')}
          className={isDemo ? undefined : 'sm:col-span-2'}
        >
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </Field>

        {isDemo && (
          <Field id={`${idPrefix}-phone`} label={t('phone')} hint={t('phoneHint')}>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-[var(--up-danger)]">
          {t('error')}
        </p>
      )}

      <UpsellButton type="submit" size="lg" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />}
        {t(isDemo ? 'demo.submit' : 'whitepaper.submit')}
      </UpsellButton>

      <p className="text-center text-xs leading-relaxed text-[var(--up-ink-muted)]">
        {t(isDemo ? 'demo.privacy' : 'whitepaper.privacy')}
      </p>
    </form>
  );
}

const inputClass =
  'min-h-11 w-full rounded-xl border border-[var(--up-line-strong)] bg-[var(--up-surface)] px-3.5 py-3 ' +
  'text-[15px] text-[var(--up-ink)] placeholder:text-[var(--up-ink-muted)] ' +
  'focus:border-[var(--up-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--up-accent)]/25';

function Field({
  id,
  label,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-[var(--up-ink)]">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-[var(--up-ink-soft)]">{hint}</p>}
    </div>
  );
}
