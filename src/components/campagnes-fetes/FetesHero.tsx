import type { ReactNode } from 'react';
import { MailPreview } from '@/components/campagnes-fetes/MailPreview';
import type { CampagneFete } from '@/data/campagnes-fetes';

export type FetesHeroCampagne = Pick<CampagneFete, 'code' | 'nom' | 'periode' | 'periodeCourte' | 'objet'> & {
  previewUrl: string | null;
};

export interface FetesHeroLabels {
  title: ReactNode;
  titleEm: string;
  subtitle: string;
  seeAll: string;
  demo: string;
  /** Modèle « Aperçu de l'e-mail {name} ». */
  previewTitle: string;
  fallbackTitle: string;
}

interface FetesHeroProps {
  campagnes: FetesHeroCampagne[];
  labels: FetesHeroLabels;
  demoUrl: string;
}

/**
 * Haut de page des fêtes : texte à gauche, les 7 e-mails en éventail à droite (cartes égales qui se
 * chevauchent ; la carte survolée ou au clavier passe devant, avec sa légende : `.cf-eventail` dans
 * campagnes-fetes.css). Sur téléphone, un rail qui défile à l'horizontale. Chaque carte mène à sa
 * campagne plus bas (#code) ; « Voir les 7 » et les cartes sont comptés dans GA4 (`data-fetes-event`,
 * CalendarStatsTracker).
 * Fond papier : la section des 7 qui suit est aussi sur papier, un filet les sépare. Espacements par gap :
 * la feuille de la page remet à zéro les marges des h1 et p (`.cf p{margin:0}`, hors couche Tailwind).
 */
export function FetesHero({ campagnes, labels, demoUrl }: FetesHeroProps) {
  return (
    <header className="overflow-x-clip border-b border-[var(--filet)] bg-[var(--papier)] pb-14 pt-8 lg:pb-20 lg:pt-14">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <h1 className="text-balance text-[40px] font-medium leading-[1.04] tracking-[-0.035em] text-[var(--titre)] lg:text-[64px] lg:leading-[1.02]">
            {labels.title} <span className="text-[var(--vert)]">{labels.titleEm}</span>
          </h1>
          <p className="max-w-[42ch] text-lg lg:text-xl">{labels.subtitle}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a className="cf-btn cf-btn-peche" href="#campagnes" data-fetes-event="see_all">
              {labels.seeAll}
            </a>
            <a className="cf-lien" href={demoUrl} target="_blank" rel="noopener noreferrer">
              {labels.demo}
            </a>
          </div>
        </div>
        <ol className="cf-eventail -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:col-span-7 lg:mx-0 lg:overflow-visible lg:p-0">
          {campagnes.map((c) => (
            <li key={c.code} className="w-[62vw] max-w-[260px] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <a
                href={`#${c.code}`}
                data-fetes-event="card"
                data-temps-fort={c.code}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-24px_rgba(0,43,40,0.45),0_0_0_1px_rgba(12,42,38,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vert)]"
              >
                <div className="relative aspect-[3/4]">
                  <MailPreview
                    src={c.previewUrl}
                    title={labels.previewTitle.replace('{name}', c.nom)}
                    fallback={{ title: labels.fallbackTitle, objet: c.objet, periode: c.periode }}
                  />
                </div>
                <div className="cf-eventail-legende border-t border-[var(--filet)] px-3.5 py-3">
                  <div className="text-[13px] font-medium text-[var(--vert)]">{c.periodeCourte}</div>
                  <div className="mt-0.5 text-sm font-medium leading-snug text-[var(--titre)]">{c.nom}</div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
