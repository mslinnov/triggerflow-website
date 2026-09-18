'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { cn } from '@/lib/utils';
import { UpsellButton } from '../upsell/primitives';

/**
 * Formulaire de conversion : l'adresse e-mail, et rien d'autre.
 *
 * ─── UN SEUL CHAMP, COMME SUR LA LANDING JUMELLE ─────────────────────────
 * C'est une décision produit, pas un oubli. La seule promesse faite ici est
 * l'envoi d'un document : tout champ supplémentaire se paierait en conversions
 * sans rien apporter à cette promesse. Les deux conséquences sont assumées, et
 * ce sont les mêmes que sur la variante livre blanc des ventes additionnelles :
 *
 * 1. La séquence de relance ne pourra pas s'adresser nommément au
 *    destinataire. Ses e-mails doivent rester rédigés sans nom propre, sous
 *    peine d'afficher une formule d'appel vide.
 * 2. La fiche prospect naîtra avec le seul domaine de l'adresse comme nom. Le
 *    commercial qui reprend le lead complétera à la main.
 *
 * Ne pas « rétablir » le prénom ou le nom d'hôtel sans mesurer ce que ça coûte.
 *
 * Le nombre de chambres ne part plus. Il venait du calculateur que le
 * comparateur a remplacé, et celui-ci ne demande plus rien au visiteur :
 * envoyer la valeur par défaut d'un curseur disparu ferait naître des fiches
 * prospect toutes déclarées à la même taille d'établissement, ce qui est pire
 * qu'une fiche sans taille. `/api/leads` traite déjà le champ comme facultatif.
 */

/**
 * Slug du guide servi par cette page, tel que le backend le connaît (liste
 * fermée côté `/api/leads`). C'est lui qui déclenche l'envoi du document et la
 * séquence de relance.
 */
const MAGNET = 'post-sejour';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface PostStayLeadFormProps {
  /**
   * Préfixe des identifiants de champs. Explicite plutôt que `useId()` : un
   * identifiant généré produit une divergence d'hydratation serveur/client.
   */
  idPrefix: string;
  className?: string;
}

export function PostStayLeadForm({ idPrefix, className }: PostStayLeadFormProps) {
  const t = useTranslations('lpPostStay.form');
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
          source: 'fb-post-sejour',
          goal: 'whitepaper',
          locale,
          honeypot: data.get('company'),
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

      trackMetaEvent('Lead', { content_name: 'lp-poststay' });

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
