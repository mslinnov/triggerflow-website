import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, ButtonLink } from '@/components/ui';
import { getLPIcon } from './lp-icons';
import { lpLinkProps } from './lp-links';

export interface LPHeroBenefitCard {
  icon: string;
  title: string;
  description: string;
}

export interface LPHeroBadge {
  label: string;
  icon?: string;
  /** Pastille pleine, qui ressort des autres (l'offre gratuite, par exemple). */
  solid?: boolean;
}

export interface LPHeroProps {
  /** `dark` : fond vert foncé, celui des visuels de pub ; `light` (défaut) : fond clair. */
  variant?: 'light' | 'dark';
  badge?: string;
  title: string;
  /** Fin du titre, sur sa propre ligne et en couleur d'accent (« connecté à votre PMS. »). */
  titleAccent?: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Cartes de bénéfices en face du texte, à la place d'une image : les promesses de l'annonce, mot pour mot. */
  benefitCards?: LPHeroBenefitCard[];
  trustIndicators?: string[];
  badges?: LPHeroBadge[];
  className?: string;
}

/** Classes propres à chaque variante, en un seul endroit : le JSX ne garde que la structure. */
const variantClasses = {
  dark: {
    section: 'bg-gradient-to-b from-surface-dark-light to-brand-dark py-8 text-white sm:py-14 lg:py-20',
    badge: 'border-brand-mint/40 text-brand-mint',
    title: 'text-[2.1rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]',
    accent: 'text-brand-mint',
    subtitle: 'text-white/80',
    secondaryCta: 'border-white/30 text-white hover:bg-white/10',
    badgeItem: 'border border-white/30 text-white',
    trust: 'text-white/70',
    check: 'text-brand-mint',
  },
  light: {
    section: 'bg-gradient-to-br from-brand-light via-white to-brand-light py-16 md:py-24',
    badge: 'border-brand-primary/20 bg-brand-primary/10 text-brand-primary',
    title: 'text-3xl leading-tight text-brand-dark sm:text-4xl lg:text-5xl',
    accent: 'text-brand-primary',
    subtitle: 'text-lg text-zinc-600',
    secondaryCta: '',
    badgeItem: 'border border-brand-primary/20 text-brand-dark',
    trust: 'text-zinc-500',
    check: 'text-brand-primary',
  },
} as const;

export function LPHero({
  variant = 'light',
  badge,
  title,
  titleAccent,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageSrc,
  imageAlt = '',
  benefitCards,
  trustIndicators,
  badges,
  className,
}: LPHeroProps) {
  const dark = variant === 'dark';
  const v = variantClasses[variant];
  const hasAside = Boolean(imageSrc || benefitCards?.length);

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        v.section,
        className
      )}
    >
      <Container>
        <div
          className={cn(
            'grid items-center gap-8',
            hasAside ? 'lg:grid-cols-2 lg:gap-16' : 'mx-auto max-w-3xl text-center'
          )}
        >
          <div className={cn(!hasAside && 'flex flex-col items-center')}>
            {badge && (
              <span
                className={cn(
                  'mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium',
                  v.badge
                )}
              >
                {!dark && <Check className="h-3.5 w-3.5" />}
                {badge}
              </span>
            )}

            <h1 className={cn('font-bold tracking-tight', v.title)}>
              {title}
              {titleAccent && (
                <span className={cn('block', v.accent)}>
                  {titleAccent}
                </span>
              )}
            </h1>

            <p className={cn('mt-4 max-w-xl leading-relaxed sm:mt-5 sm:text-lg', v.subtitle)}>
              {subtitle}
            </p>

            <div
              className={cn(
                'mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row',
                hasAside ? 'sm:items-center' : 'items-center'
              )}
            >
              <ButtonLink href={ctaHref} variant={dark ? 'accent' : 'primary'} size="lg" {...lpLinkProps(ctaHref)}>
                {ctaLabel}
              </ButtonLink>
              {secondaryCtaLabel && secondaryCtaHref && (
                <ButtonLink
                  href={secondaryCtaHref}
                  variant="ghost"
                  size="lg"
                  className={v.secondaryCta}
                  {...lpLinkProps(secondaryCtaHref)}
                >
                  {secondaryCtaLabel}
                </ButtonLink>
              )}
            </div>

            {badges && badges.length > 0 && (
              <ul className={cn('mt-5 flex flex-wrap gap-2', !hasAside && 'justify-center')}>
                {badges.map((item) => {
                  const Icon = getLPIcon(item.icon);
                  return (
                    <li
                      key={item.label}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium',
                        item.solid ? 'bg-white text-brand-dark' : v.badgeItem
                      )}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            )}

            {trustIndicators && trustIndicators.length > 0 && (
              <div className={cn('mt-6 flex flex-wrap items-center gap-4 text-sm', v.trust)}>
                {trustIndicators.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className={cn('h-4 w-4', v.check)} />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {benefitCards && benefitCards.length > 0 && (
            <ul className="grid gap-3">
              {benefitCards.map((card) => {
                const Icon = getLPIcon(card.icon);
                return (
                  <li
                    key={card.title}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 text-brand-dark shadow-xl shadow-black/20 sm:p-5"
                  >
                    {Icon && (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                      </span>
                    )}
                    <span>
                      <span className="block text-[1.05rem] font-bold leading-snug sm:text-xl">{card.title}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-text-secondary sm:text-[0.95rem]">
                        {card.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {imageSrc && !benefitCards?.length && (
            <div className="relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={640}
                height={480}
                className="rounded-xl shadow-lg"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
