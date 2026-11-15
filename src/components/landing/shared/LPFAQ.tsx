import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';

export interface LPFAQItem {
  question: string;
  answer: string;
}

export interface LPFAQProps {
  id?: string;
  eyebrow?: string;
  sectionTitle: string;
  items: LPFAQItem[];
  className?: string;
}

/**
 * Questions et objections, en accordéon natif (`<details>`) : aucun JavaScript envoyé au navigateur, et
 * les réponses restent dans le HTML. La première est ouverte pour montrer que les autres s'ouvrent.
 */
export function LPFAQ({ id, eyebrow, sectionTitle, items, className }: LPFAQProps) {
  return (
    <section id={id} className={cn('scroll-mt-20 bg-white py-14 md:py-24', className)}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>}
            <h2 className="mt-2 text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{sectionTitle}</h2>
          </div>
          <div className="grid gap-2">
            {items.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group rounded-xl border border-border-light bg-white open:border-border-default"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3.5 font-semibold text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    className="h-5 w-5 shrink-0 text-brand-primary transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-4 pb-4 leading-relaxed text-text-secondary">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
