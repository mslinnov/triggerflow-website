'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { trackAdsConversion } from '@/lib/ads';

interface RappelFormProps {
  /** Code du temps fort, pour GA4. */
  tempsFort: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'busy' | 'invalid';

/** Rien à écouter : seul compte le passage du rendu serveur (false) au client (true). */
const subscribeNothing = () => () => {};

const inputClass =
  'w-full rounded-xl border border-border-default bg-white px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20';

/** « Être rappelé » : crée un prospect CRM rattaché au salon EquipHotel (src/app/api/calendrier/rappel). */
export function RappelForm({ tempsFort }: RappelFormProps) {
  const t = useTranslations('calendrierMarketing.activatePage');
  const [status, setStatus] = useState<Status>('idle');
  // Bouton actif seulement une fois le composant monté : avant l'hydratation, un envoi
  // natif partirait sans notre gestionnaire.
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    try {
      const response = await fetch('/api/calendrier/rappel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: data.get('hotelName'),
          city: data.get('city'),
          firstname: data.get('firstname'),
          lastname: data.get('lastname'),
          email: data.get('email'),
          phone: data.get('phone'),
          wantsDemo: data.get('wantsDemo') === 'on',
          // Champ piège : nommé hp_check dans la page (l'autoremplissage ne le remplit pas),
          // relu sous le nom attendu par le relais.
          website: data.get('hp_check'),
        }),
      });
      if (response.status === 429) {
        setStatus('busy');
        return;
      }
      if (response.status === 400) {
        setStatus('invalid');
        return;
      }
      if (!response.ok) {
        setStatus('error');
        return;
      }
      trackAdsConversion('lead');
      window.gtag?.('event', 'generate_lead', { form: 'calendrier-rappel', temps_fort: tempsFort });
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-brand-primary bg-brand-light p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto h-8 w-8 text-brand-primary" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold text-text-primary">{t('formSuccessTitle')}</p>
        <p className="mt-1.5 text-sm text-text-secondary">{t('formSuccessText')}</p>
      </div>
    );
  }

  // method="post" : même envoyé avant l'hydratation, les coordonnées ne finissent jamais dans l'URL.
  return (
    <form method="post" onSubmit={handleSubmit} className="space-y-3">
      {/* Champ piège : invisible pour un humain, masqué aux lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Site web
          <input type="text" name="hp_check" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-text-primary">{t('formHotel')} *</span>
        <input name="hotelName" required maxLength={255} autoComplete="organization" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-text-primary">{t('formCity')}</span>
        <input name="city" maxLength={100} autoComplete="address-level2" className={inputClass} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-text-primary">{t('formFirstname')} *</span>
          <input name="firstname" required maxLength={100} autoComplete="given-name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-text-primary">{t('formLastname')}</span>
          <input name="lastname" maxLength={100} autoComplete="family-name" className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-text-primary">{t('formEmail')} *</span>
        <input name="email" type="email" required maxLength={255} autoComplete="email" className={inputClass} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-text-primary">{t('formPhone')}</span>
        <input name="phone" type="tel" maxLength={50} autoComplete="tel" className={inputClass} />
      </label>
      <label className="flex items-center gap-2 text-sm text-text-primary">
        <input name="wantsDemo" type="checkbox" className="h-4 w-4 rounded border-border-default accent-brand-primary" />
        {t('formWantsDemo')}
      </label>

      {(status === 'error' || status === 'busy' || status === 'invalid') && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {status === 'busy' ? t('formBusy') : status === 'invalid' ? t('formInvalid') : t('formError')}
        </p>
      )}

      <button
        type="submit"
        disabled={!mounted || status === 'submitting'}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark/90 disabled:opacity-60"
      >
        {status === 'submitting' ? t('formSubmitting') : t('formSubmit')}
      </button>
      <p className="text-xs text-text-muted">{t('formPrivacy')}</p>
    </form>
  );
}
