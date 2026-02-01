import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, ButtonLink } from '@/components/ui';

export interface LPHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  trustIndicators?: string[];
  className?: string;
}

export function LPHero({
  badge,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageSrc,
  imageAlt = '',
  trustIndicators,
  className,
}: LPHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-brand-light via-white to-brand-light py-16 md:py-24',
        className
      )}
    >
      <Container>
        <div
          className={cn(
            'grid items-center gap-10',
            imageSrc ? 'lg:grid-cols-2 lg:gap-16' : 'mx-auto max-w-3xl text-center'
          )}
        >
          {/* Text content */}
          <div className={cn(!imageSrc && 'flex flex-col items-center')}>
            {badge && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1.5 text-sm font-medium text-brand-primary">
                <Check className="h-3.5 w-3.5" />
                {badge}
              </span>
            )}

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <ButtonLink
                href={ctaHref}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaLabel}
              </ButtonLink>
              {secondaryCtaLabel && secondaryCtaHref && (
                <ButtonLink
                  href={secondaryCtaHref}
                  variant="ghost"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {secondaryCtaLabel}
                </ButtonLink>
              )}
            </div>

            {trustIndicators && trustIndicators.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                {trustIndicators.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-brand-primary" />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          {imageSrc && (
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
