import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper, SectionHeader, ButtonLink } from '@/components/ui';

export interface LPPricingPlan {
  name: string;
  description?: string;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface LPPricingProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  plans: LPPricingPlan[];
  footnote?: string;
  className?: string;
}

export function LPPricing({
  sectionTitle,
  sectionSubtitle,
  plans,
  footnote,
  className,
}: LPPricingProps) {
  return (
    <SectionWrapper background="light" className={className}>
      <Container>
        {sectionTitle && (
          <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        )}

        <div
          className={cn(
            'mx-auto grid gap-6',
            plans.length === 1 && 'max-w-md',
            plans.length === 2 && 'max-w-3xl sm:grid-cols-2',
            plans.length >= 3 && 'max-w-5xl sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-white p-6 md:p-8',
                plan.popular
                  ? 'border-brand-primary shadow-lg ring-1 ring-brand-primary/20'
                  : 'border-brand-light'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-xs font-semibold text-white">
                  Populaire
                </span>
              )}

              <h3 className="text-xl font-bold text-brand-dark">{plan.name}</h3>
              {plan.description && (
                <p className="mt-1 text-sm text-zinc-500">{plan.description}</p>
              )}

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-dark">{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-lg text-zinc-400 line-through">
                    {plan.originalPrice}
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zinc-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={plan.ctaHref}
                variant={plan.popular ? 'primary' : 'ghost'}
                size="md"
                className="mt-6 w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.ctaLabel}
              </ButtonLink>
            </div>
          ))}
        </div>

        {footnote && (
          <p className="mt-8 text-center text-sm text-zinc-500">{footnote}</p>
        )}
      </Container>
    </SectionWrapper>
  );
}
