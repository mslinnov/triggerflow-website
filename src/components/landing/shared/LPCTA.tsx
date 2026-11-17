import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, ButtonLink } from '@/components/ui';
import { LPCallbackForm, type LPCallbackFormProps } from './LPCallbackForm';
import { lpLinkProps } from './lp-links';

export interface LPCTAProps {
  id?: string;
  /** `dark` (défaut) : bloc de fin, vert foncé ; `light` : bande de rappel en milieu de page. */
  variant?: 'dark' | 'light';
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  benefits?: string[];
  /** Formulaire « Être rappelé » à côté du bouton de démo (variante `dark`). */
  callback?: Omit<LPCallbackFormProps, 'className'>;
  className?: string;
}

export function LPCTA({
  id,
  variant = 'dark',
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  benefits,
  callback,
  className,
}: LPCTAProps) {
  if (variant === 'light') {
    return (
      <section id={id} className={cn('scroll-mt-20 bg-brand-light py-8 md:py-10', className)}>
        <Container>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-brand-dark sm:text-xl">{title}</p>
              {subtitle && <p className="mt-1 text-text-secondary">{subtitle}</p>}
            </div>
            <ButtonLink href={ctaHref} variant="primary" size="lg" className="shrink-0" {...lpLinkProps(ctaHref)}>
              {ctaLabel}
            </ButtonLink>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id={id} className={cn('scroll-mt-20 bg-brand-dark py-16 md:py-24', className)}>
      <Container>
        <div
          className={cn(
            callback ? 'grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16' : 'mx-auto max-w-3xl text-center'
          )}
        >
          <div className={cn(callback && 'text-center lg:text-left')}>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>

            {subtitle && <p className="mt-4 text-lg text-white/70">{subtitle}</p>}

            <div
              className={cn(
                'mt-8 flex flex-col items-center gap-3 sm:flex-row',
                callback ? 'sm:justify-center lg:justify-start' : 'sm:justify-center'
              )}
            >
              <ButtonLink href={ctaHref} variant="accent" size="lg" {...lpLinkProps(ctaHref)}>
                {ctaLabel}
              </ButtonLink>
              {secondaryCtaLabel && secondaryCtaHref && (
                <ButtonLink
                  href={secondaryCtaHref}
                  variant="ghost"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                  {...lpLinkProps(secondaryCtaHref)}
                >
                  {secondaryCtaLabel}
                </ButtonLink>
              )}
            </div>

            {benefits && benefits.length > 0 && (
              <div
                className={cn(
                  'mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70',
                  callback ? 'justify-center lg:justify-start' : 'justify-center'
                )}
              >
                {benefits.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-brand-mint" />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {callback && <LPCallbackForm {...callback} />}
        </div>
      </Container>
    </section>
  );
}
