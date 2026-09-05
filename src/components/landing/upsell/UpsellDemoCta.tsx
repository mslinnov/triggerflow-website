'use client';

import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL_WHITEPAPER } from '@/data/upsell-links';
import { cn } from '@/lib/utils';
import { useUpsell } from './UpsellContext';

/**
 * Passerelle vers la prise de rendez-vous, proposée sur la variante livre blanc
 * pour les visiteurs déjà convaincus qui n'ont pas envie d'attendre un PDF.
 *
 * Volontairement traitée en secondaire : sur cette variante, l'offre principale
 * reste le livre blanc, et deux appels à l'action de même poids se neutralisent.
 * Le clic est remonté à Meta pour pouvoir le distinguer d'un téléchargement.
 */
export function UpsellDemoCta({
  variant = 'inline',
  className,
}: {
  /** `inline` sous le simulateur, `band` en bande pleine largeur entre sections. */
  variant?: 'inline' | 'band';
  className?: string;
}) {
  const t = useTranslations('lpUpsell.demoBridge');
  const { result } = useUpsell();

  const link = (
    <a
      href={LEMCAL_DEMO_URL_WHITEPAPER}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackMetaEvent('ViewContent', {
          content_name: 'lp-upsell-demo-bridge',
          variant: 'whitepaper',
          value: result.monthlyRevenue,
          currency: 'EUR',
        })
      }
      className={cn(
        'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full',
        'border border-[var(--up-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--up-accent-text)]',
        'transition-colors duration-200 hover:bg-[var(--up-accent-wash)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--up-accent)] focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[var(--up-surface)] active:translate-y-[1px]'
      )}
    >
      <CalendarClock className="h-4 w-4" strokeWidth={2} aria-hidden />
      {t('cta')}
    </a>
  );

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5',
          className
        )}
      >
        <p className="text-[15px] leading-relaxed text-[var(--up-ink-soft)]">{t('inline')}</p>
        {link}
      </div>
    );
  }

  return (
    <section className={cn('border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10', className)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[var(--up-ink)]">{t('bandTitle')}</p>
          <p className="mt-1.5 max-w-[54ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('bandBody')}
          </p>
        </div>
        {link}
      </div>
    </section>
  );
}
