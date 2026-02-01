import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, ButtonLink } from '@/components/ui';

export interface LPCTAProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  benefits?: string[];
  className?: string;
}

export function LPCTA({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  benefits,
  className,
}: LPCTAProps) {
  return (
    <section className={cn('bg-brand-dark py-16 md:py-24', className)}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-4 text-lg text-white/70">{subtitle}</p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href={ctaHref}
              variant="accent"
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
                className="border-white/20 text-white hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryCtaLabel}
              </ButtonLink>
            )}
          </div>

          {benefits && benefits.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              {benefits.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-brand-primary" />
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
