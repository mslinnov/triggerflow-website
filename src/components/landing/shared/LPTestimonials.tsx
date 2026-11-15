import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { getCaseStudyBySlug } from '@/lib/case-studies';
import { homeTestimonials as clientQuotes } from '@/data/clients';

export interface LPTestimonialsCaseStudy {
  /** Slug d'un cas client publié (lib/case-studies.ts) : citation, nom et fonction viennent de là. */
  slug: string;
  /** Photo pré-optimisée pour la page (l'originale du cas client pèse plusieurs centaines de Ko). */
  image?: string;
}

export interface LPTestimonialsProps {
  eyebrow?: string;
  sectionTitle: string;
  caseStudies?: LPTestimonialsCaseStudy[];
  /**
   * Ajoute les témoignages publiés de data/clients.ts (citations exactes, repris de la refonte du site),
   * sans recopie.
   */
  homeTestimonials?: boolean;
  /** Posée par la page (`[slug]/page.tsx`) depuis la config. */
  locale?: string;
  className?: string;
}

/**
 * Témoignages : les cas clients publiés, avec photo, puis les citations de data/clients.ts dans une rangée
 * qui défile au doigt (défilement natif à crans, sans JavaScript).
 */
export function LPTestimonials({
  eyebrow,
  sectionTitle,
  caseStudies = [],
  homeTestimonials = false,
  locale = 'fr',
  className,
}: LPTestimonialsProps) {
  const studies = caseStudies.flatMap((entry) => {
    const study = getCaseStudyBySlug(entry.slug);
    return study ? [{ ...study, image: entry.image ?? study.image }] : [];
  });
  const lang = locale === 'fr' ? 'fr' : 'en';
  const home = homeTestimonials ? clientQuotes : [];

  return (
    <section className={cn('bg-white py-14 md:py-24', className)}>
      <Container>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>}
        <h2 className="mt-2 text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{sectionTitle}</h2>

        {studies.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {studies.map((study) => (
              <figure key={study.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white">
                <Image
                  src={study.image}
                  alt={`${study.name}, ${study.location}`}
                  width={800}
                  height={450}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <blockquote className="text-[1.02rem] leading-relaxed text-brand-dark">« {study.quote} »</blockquote>
                  <figcaption className="text-sm">
                    <span className="block font-semibold text-brand-dark">{study.contactName}</span>
                    <span className="text-text-muted">
                      {study.contactRole}, {study.name} · {study.pms}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        )}

        {home.length > 0 && (
          <ul
            className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
            aria-label={sectionTitle}
          >
            {home.map((item) => (
              <li
                key={item.name}
                className="flex w-[85%] shrink-0 snap-start flex-col justify-between gap-4 rounded-2xl bg-surface-secondary p-5 sm:w-[46%] lg:w-[31.5%]"
              >
                <blockquote className="leading-relaxed text-brand-dark">« {item.quote[lang]} »</blockquote>
                <div className="flex items-center gap-3 text-sm">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-semibold text-white"
                    aria-hidden="true"
                  >
                    {item.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </span>
                  <span>
                    <span className="block font-semibold text-brand-dark">{item.name}</span>
                    <span className="text-text-muted">
                      {item.role[lang]}, {item.company}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
