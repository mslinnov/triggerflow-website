import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { brand } from '@/data/brand';

type ConnectedPms = (typeof brand.pms)[number];

/**
 * Logo de chaque PMS connecté. Le type impose une entrée par PMS de `brand.pms` : un PMS ajouté là-bas
 * sans logo ici casse le type-check au lieu de laisser une case vide sur la page.
 */
const PMS_LOGOS: Record<ConnectedPms, { src: string; width: number; height: number }> = {
  Mews: { src: '/images/integrations/mews.svg', width: 190, height: 24 },
  'Thaïs': { src: '/images/integrations/thais.svg', width: 105, height: 32 },
  'Opera Cloud': { src: '/images/lp/crm-hotelier/pms-opera.webp', width: 173, height: 80 },
  Medialog: { src: '/images/integrations/medialog.svg', width: 152, height: 36 },
  Misterbooking: { src: '/images/lp/crm-hotelier/pms-misterbooking.webp', width: 320, height: 64 },
  Asterio: { src: '/images/lp/crm-hotelier/pms-asterio.webp', width: 153, height: 80 },
  Apaleo: { src: '/images/lp/crm-hotelier/pms-apaleo.webp', width: 316, height: 80 },
  Vega: { src: '/images/lp/crm-hotelier/pms-vega.webp', width: 80, height: 80 },
  Beds24: { src: '/images/integrations/beds24.svg', width: 130, height: 73 },
  Zeswitch: { src: '/images/lp/crm-hotelier/pms-zeswitch.webp', width: 320, height: 70 },
  Reservit: { src: '/images/integrations/reservit.webp', width: 300, height: 173 },
  'Lean PMS': { src: '/images/integrations/leanpms.webp', width: 336, height: 92 },
};

/** Pour les tests : chemin du logo de chaque PMS connecté. */
export const pmsLogoSources = Object.values(PMS_LOGOS).map((logo) => logo.src);

/** Les logos des PMS connectés, dans l'ordre de la grille (aussi pour la page d'atterrissage CRM hôtelier). */
export const pmsLogos = Object.entries(PMS_LOGOS).map(([alt, logo]) => ({ alt, ...logo }));

export interface LPIntegrationsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Intitulé au-dessus de la grille (« +20 PMS compatibles », écrit `{pmsCompatibles} PMS compatibles`). */
  gridLabel?: string;
  /** Phrase sous la grille : PMS en cours d'intégration, autres outils, PMS absent. */
  footnote?: string;
  className?: string;
}

/** Grille des PMS réellement connectés (`brand.pms`), avec le nombre affiché de brand.pmsCompatibles. */
export function LPIntegrations({ eyebrow, title, description, gridLabel, footnote, className }: LPIntegrationsProps) {
  return (
    <section className={cn('bg-surface-secondary py-14 md:py-24', className)}>
      <Container>
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{eyebrow}</p>
            )}
            <h2 className="mt-2 text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{title}</h2>
          </div>
          {description && <p className="max-w-xl leading-relaxed text-text-secondary">{description}</p>}
        </div>

        {gridLabel && <p className="mt-8 text-sm font-semibold text-brand-dark">{gridLabel}</p>}
        <ul className={cn('grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6', gridLabel ? 'mt-3' : 'mt-8')}>
          {brand.pms.map((name) => {
            const logo = PMS_LOGOS[name];
            return (
              <li
                key={name}
                className="flex h-16 items-center justify-center rounded-xl border border-border-light bg-white px-3"
              >
                <Image
                  src={logo.src}
                  alt={name}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-8 w-auto max-w-full object-contain"
                />
              </li>
            );
          })}
        </ul>

        {footnote && <p className="mt-4 text-sm leading-relaxed text-text-secondary">{footnote}</p>}
      </Container>
    </section>
  );
}
