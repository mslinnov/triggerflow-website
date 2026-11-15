'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { getAttribution } from '@/lib/attribution';
import { trackAdsConversion } from '@/lib/ads';
import { cn } from '@/lib/utils';

export interface LPCallbackFormProps {
  title: string;
  subtitle?: string;
  /** Identifiant de la page dans Brevo (attribut SOURCE) et dans la notification. */
  source: string;
  locale?: string;
  labels: {
    firstName: string;
    hotelName: string;
    phone: string;
    email: string;
    slot: string;
    submit: string;
    successTitle: string;
    successBody: string;
    error: string;
    invalidPhone: string;
    privacy: string;
    privacyLink: string;
    privacyHref: string;
  };
  /** Créneaux proposés ; le premier est choisi par défaut. */
  slots: string[];
  className?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'invalid_phone';

const inputClass =
  'min-h-11 w-full rounded-xl border border-border-default bg-white px-3.5 py-2.5 text-[15px] text-brand-dark ' +
  'focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25';

/**
 * Demande de rappel, envoyée à /api/leads avec l'offre `rappel` : contact dans la liste Brevo des leads
 * et e-mail immédiat à l'équipe (« Demande de rappel : … »). Le seul JavaScript de la page.
 */
export function LPCallbackForm({ title, subtitle, source, locale = 'fr', labels, slots, className }: LPCallbackFormProps) {
  const [status, setStatus] = useState<Status>('idle');

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
          firstName: data.get('firstName'),
          hotelName: data.get('hotelName'),
          phone: data.get('phone'),
          email: data.get('email'),
          slot: data.get('slot'),
          source,
          goal: 'rappel',
          locale,
          honeypot: data.get('company'),
          attribution: getAttribution() ?? undefined,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;
      if (!response.ok || !payload?.success) {
        setStatus(payload?.error === 'invalid_phone' ? 'invalid_phone' : 'error');
        return;
      }
      trackMetaEvent('Lead', { content_name: source, variant: 'rappel' });
      trackAdsConversion('lead');
      window.gtag?.('event', 'generate_lead', { form: 'rappel', page: source });
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className={cn('rounded-2xl bg-white p-6 text-brand-dark', className)}>
        <CheckCircle2 className="h-8 w-8 text-brand-primary" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold">{labels.successTitle}</p>
        <p className="mt-1 text-text-secondary">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('grid gap-3 rounded-2xl bg-white p-5 text-left text-brand-dark sm:p-6', className)}>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>

      {/* Champ piège : invisible pour un humain, rempli par les robots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium" htmlFor="rappel-firstName">
          {labels.firstName}
          <input id="rappel-firstName" name="firstName" autoComplete="given-name" required className={inputClass} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium" htmlFor="rappel-hotelName">
          {labels.hotelName}
          <input id="rappel-hotelName" name="hotelName" autoComplete="organization" required className={inputClass} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium" htmlFor="rappel-phone">
          {labels.phone}
          <input
            id="rappel-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={status === 'invalid_phone' || undefined}
            className={inputClass}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium" htmlFor="rappel-email">
          {labels.email}
          <input id="rappel-email" name="email" type="email" autoComplete="email" required className={inputClass} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium" htmlFor="rappel-slot">
        {labels.slot}
        <select id="rappel-slot" name="slot" defaultValue={slots[0]} className={inputClass}>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      {(status === 'error' || status === 'invalid_phone') && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {status === 'invalid_phone' ? labels.invalidPhone : labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 font-medium text-white transition-colors hover:bg-brand-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {labels.submit}
      </button>

      <p className="text-xs leading-relaxed text-text-muted">
        {labels.privacy}{' '}
        <Link href={labels.privacyHref} className="underline underline-offset-2 hover:text-brand-dark">
          {labels.privacyLink}
        </Link>
      </p>
    </form>
  );
}
