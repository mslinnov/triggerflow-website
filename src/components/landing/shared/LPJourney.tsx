import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { getLPIcon } from './lp-icons';
import { LPStory } from './LPStory';

export interface LPJourneyStep {
  icon: string;
  title: string;
  description: string;
}

export interface LPJourneyProps {
  eyebrow?: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  /** Étapes numérotées, sous la scène s'il y en a une (facultatives : la scène peut les remplacer). */
  steps?: LPJourneyStep[];
  note?: string;
  /** Scène animée au défilement (page « Comment ça marche » du nouveau site), sous le titre, sur fond blanc. */
  story?: boolean;
  className?: string;
}

/** Parcours du séjour : la scène animée, les étapes numérotées (une liste sur mobile, une frise sur ordinateur), ou les deux. */
export function LPJourney({ eyebrow, sectionTitle, sectionSubtitle, steps, note, story, className }: LPJourneyProps) {
  return (
    <section className={cn(story ? 'bg-white' : 'bg-surface-secondary', 'py-14 md:py-24', className)}>
      <Container>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>}
        <h2 className="mt-2 max-w-3xl text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{sectionTitle}</h2>
        {sectionSubtitle && <p className="mt-3 max-w-2xl text-text-secondary">{sectionSubtitle}</p>}
      </Container>
      {/* Hors du conteneur : la scène prend toute la largeur, comme sur la page d'origine. */}
      {story && <LPStory className="mt-8" />}
      <Container>
        {steps && steps.length > 0 && (
          <ol className="mt-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => {
              const Icon = getLPIcon(step.icon);
              return (
                <li
                  key={step.title}
                  className="flex items-center gap-3 rounded-2xl border border-border-light bg-white p-3.5 lg:flex-col lg:items-start lg:p-4"
                >
                  {Icon && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                  <span>
                    <span className="block text-[0.95rem] font-semibold text-brand-dark">
                      <span className="text-brand-primary">{index + 1}. </span>
                      {step.title}
                    </span>
                    <span className="block text-sm text-text-muted">{step.description}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
        {note && <p className="mt-5 text-sm text-text-secondary">{note}</p>}
      </Container>
    </section>
  );
}
