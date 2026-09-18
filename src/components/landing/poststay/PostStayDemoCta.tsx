'use client';

import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL_POST_STAY } from '@/data/upsell-links';
import { cn } from '@/lib/utils';

/**
 * Passerelle vers la prise de rendez-vous, pour le visiteur déjà convaincu qui
 * n'a pas envie d'attendre un PDF.
 *
 * Traitée en secondaire, bouton au trait et non plein : l'offre principale de
 * cette page reste le guide, et deux appels à l'action de même poids se
 * neutralisent. Le clic est remonté à Meta sous un nom distinct pour pouvoir
 * le séparer d'un téléchargement dans les rapports de campagne.
 */
export function PostStayDemoCta({ className }: { className?: string }) {
  const t = useTranslations('lpPostStay.demoBridge');

  return (
    <section
      className={cn(
        'border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[var(--up-ink)]">{t('bandTitle')}</p>
          <p className="mt-1.5 max-w-[54ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('bandBody')}
          </p>
        </div>

        <a
          href={LEMCAL_DEMO_URL_POST_STAY}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackMetaEvent('ViewContent', { content_name: 'lp-poststay-demo-bridge' })
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
      </div>
    </section>
  );
}
