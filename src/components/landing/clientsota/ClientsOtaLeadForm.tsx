'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { getAttribution } from '@/lib/attribution';
import { trackAdsConversion } from '@/lib/ads';
import { cn } from '@/lib/utils';
import { UpsellButton } from '../upsell/primitives';

/**
 * Formulaire de conversion : l'adresse e-mail, et rien d'autre.
 *
 * ─── UN SEUL CHAMP, COMME SUR LES DEUX LANDINGS JUMELLES ─────────────────
 * C'est une décision produit, pas un oubli. La seule promesse faite ici est
 * l'envoi d'un document : tout champ supplémentaire se paierait en conversions.
 * Les deux conséquences sont assumées, comme sur les landings jumelles :
 *
 * 1. La séquence de relance ne pourra pas s'adresser nommément au
 *    destinataire. Ses e-mails restent rédigés sans nom propre.
 * 2. La fiche prospect naîtra avec le seul domaine de l'adresse comme nom.
 *
 * Les curseurs du simulateur ne partent pas non plus : ce sont des hypothèses
 * que le visiteur essaie, pas une déclaration sur son hôtel. Les transmettre
 * ferait naître des fiches prospect remplies de valeurs par défaut.
 */

/**
 * Slug du guide servi par cette page, tel que le backend le connaît (liste
 * fermée côté `/api/leads`). C'est lui qui déclenche l'envoi du document et la
 * séquence de relance.
 */
const MAGNET = 'clients-ota';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface ClientsOtaLeadFormProps {
  /**
   * Préfixe des identifiants de champs. Explicite plutôt que `useId()` : un
   * identifiant généré produit une divergence d'hydratation serveur/client.
   */
  idPrefix: string;
  className?: string;
}

export function ClientsOtaLeadForm({ idPrefix, className }: ClientsOtaLeadFormProps) {
  const t = useTranslations('lpClientsOta.form');
  const locale = useLocale();

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
          email: data.get('email'),
          source: 'fb-clients-ota',
          goal: 'whitepaper',
          locale,
          honeypot: data.get('company'),
          attribution: getAttribution() ?? undefined,
          // Déclenche le relais vers l'API TriggerFlow, qui envoie le guide et
          // lance la séquence de relance.
          magnet: MAGNET,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !payload?.success) {
        setStatus('error');
        return;
      }

      trackMetaEvent('Lead', { content_name: 'lp-clientsota' });

      trackAdsConversion('lead');
      window.gtag?.('event', 'generate_lead', { form: 'clients-ota' });
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
        <p className="mt-3 text-lg font-semibold text-[var(--up-ink)]">{t('successTitle')}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--up-ink-soft)]">
          {t('successBody')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Piège à robots : invisible pour l'utilisateur, masqué aux lecteurs
          d'écran. Le champ rempli fait rejeter la capture côté route. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Société</label>
        <input
          id={`${idPrefix}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${idPrefix}-email`}
          className="text-sm font-medium text-[var(--up-ink)]"
        >
          {t('email')}
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
        <p className="text-xs text-[var(--up-ink-soft)]">{t('emailHint')}</p>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-[var(--up-danger)]">
          {t('error')}
        </p>
      )}

      <UpsellButton type="submit" size="lg" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />}
        {t('submit')}
      </UpsellButton>

      <p className="text-center text-xs leading-relaxed text-[var(--up-ink-muted)]">
        {t('privacy')}
      </p>
    </form>
  );
}

const inputClass =
  'min-h-11 w-full rounded-xl border border-[var(--up-line-strong)] bg-[var(--up-surface)] px-3.5 py-3 ' +
  'text-[15px] text-[var(--up-ink)] placeholder:text-[var(--up-ink-muted)] ' +
  'focus:border-[var(--up-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--up-accent)]/25';
