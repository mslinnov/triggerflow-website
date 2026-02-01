import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper, SectionHeader } from '@/components/ui';

export interface LPBenefitItem {
  title: string;
  description: string;
  highlight?: string;
}

export interface LPBenefitsProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  benefits: LPBenefitItem[];
  layout?: 'list' | 'grid';
  className?: string;
}

export function LPBenefits({
  sectionTitle,
  sectionSubtitle,
  benefits,
  layout = 'list',
  className,
}: LPBenefitsProps) {
  return (
    <SectionWrapper background="light" className={className}>
      <Container>
        {sectionTitle && (
          <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        )}

        {layout === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-brand-light bg-white p-6"
              >
                {benefit.highlight && (
                  <p className="mb-2 text-2xl font-bold text-brand-primary">
                    {benefit.highlight}
                  </p>
                )}
                <div className="mb-2 flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <h3 className="text-lg font-semibold text-brand-dark">{benefit.title}</h3>
                </div>
                <p className="pl-7 text-sm leading-relaxed text-zinc-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-10">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={cn(
                  'flex flex-col gap-4 md:flex-row md:items-start md:gap-8',
                  index % 2 === 1 && 'md:flex-row-reverse'
                )}
              >
                <div className="flex-1">
                  {benefit.highlight && (
                    <p className="mb-1 text-3xl font-bold text-brand-primary">
                      {benefit.highlight}
                    </p>
                  )}
                  <div className="flex items-start gap-2">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                    <div>
                      <h3 className="text-lg font-semibold text-brand-dark">{benefit.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
