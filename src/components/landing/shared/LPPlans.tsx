import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { Container, ButtonLink } from '@/components/ui';
import { getDisplayPlans, getPricingPhase } from '@/data/pricing';
import { lpLinkProps } from './lp-links';

export interface LPPlansProps {
  id?: string;
  eyebrow?: string;
  sectionTitle: string;
  /** Mention du plan mis en avant (`popular` dans pricing.ts). */
  popularLabel: string;
  perMonthLabel: string;
  /** Lignes sous la grille : engagement, essai. */
  notes?: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Posée par la page (`[slug]/page.tsx`) depuis la config. */
  locale?: string;
  className?: string;
}

/**
 * Les plans et leurs prix, lus dans pricing.ts comme la page /tarifs : aucun prix recopié dans le JSON.
 * La phase de prix (annonce de la hausse, puis nouvelle grille) est calculée au rendu ; la page est
 * régénérée toutes les heures (`revalidate` de `[slug]/page.tsx`) pour suivre le passage au 1er janvier.
 */
export async function LPPlans({
  id,
  eyebrow,
  sectionTitle,
  popularLabel,
  perMonthLabel,
  notes,
  ctaLabel,
  ctaHref,
  locale = 'fr',
  className,
}: LPPlansProps) {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const phase = getPricingPhase();
  const plans = getDisplayPlans(phase);
  const t = await getTranslations({ locale, namespace: 'priceChange' });

  return (
    <section id={id} className={cn('scroll-mt-20 bg-surface-secondary py-14 md:py-24', className)}>
      <Container>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>}
        <h2 className="mt-2 max-w-3xl text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{sectionTitle}</h2>
        {phase === 'announce' && (
          <p className="mt-3 inline-flex rounded-full bg-brand-accent-light px-3 py-1 text-sm font-medium text-brand-dark">
            {t('bannerShort')}
          </p>
        )}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <li
              key={plan.key}
              className={cn(
                'relative flex flex-col gap-1 rounded-2xl bg-white p-5',
                plan.popular ? 'border-2 border-brand-primary' : 'border border-border-light'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-5 rounded-full bg-brand-primary px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  {popularLabel}
                </span>
              )}
              <h3 className="font-semibold text-brand-dark">{plan.name[lang]}</h3>
              <p className="text-3xl font-bold tabular-nums text-brand-dark">
                {plan.price} €
                {plan.price !== '0' && <span className="text-sm font-medium text-text-muted"> / {perMonthLabel}</span>}
              </p>
              {plan.upcomingPrice && (
                <p className="text-xs text-text-muted">{t('upcoming', { price: plan.upcomingPrice })}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{plan.description[lang]}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {notes && notes.length > 0 && (
            <ul className="grid gap-1 text-sm text-text-secondary">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
          <ButtonLink href={ctaHref} variant="primary" size="lg" className="self-start sm:self-auto" {...lpLinkProps(ctaHref)}>
            {ctaLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
