import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper } from '@/components/ui';
import { clientLogos, homeClients } from '@/data/clients';
import type { StatId } from '@/data/company-stats';

export interface LPSocialProofLogo {
  src: string;
  alt: string;
  width?: number;
}

export interface LPSocialProofStat {
  /** Chiffre officiel de company-stats.ts ; la valeur est alors posée au chargement (lib/landing-pages.ts). */
  statId?: StatId;
  value?: string;
  label: string;
}

export interface LPSocialProofTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface LPSocialProofProps {
  title?: string;
  /**
   * `"clients"` : les vrais clients validés (data/clients.ts, repris de la refonte du site : jamais de
   * logo de chaîne ou d'enseigne), sans recopie.
   */
  logos?: LPSocialProofLogo[] | 'clients';
  stats?: LPSocialProofStat[];
  testimonial?: LPSocialProofTestimonial;
  className?: string;
}

/** Surface commune à tous les logos (px²), pour qu'un logo large n'écrase pas un logo carré. */
const OPTICAL_AREA = 3200;

/**
 * Logos des clients, même poids optique, monochromes : le calcul du mur de logos de la refonte
 * (components/ds/LogoWall.tsx sur new-version). Sur mobile (3 colonnes), le logo qui laisserait une
 * rangée incomplète est masqué.
 */
function ClientLogos() {
  return (
    <ul className="grid grid-cols-3 items-center justify-items-center gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
      {homeClients.map((name, index) => {
        const logo = clientLogos[name];
        const orphan = index >= homeClients.length - (homeClients.length % 3);
        const height = logo ? Math.round(Math.min(48, Math.max(22, Math.sqrt(OPTICAL_AREA / (logo.width / logo.height))))) : 0;
        return (
          <li
            key={name}
            className={cn(
              'h-12 items-center justify-center text-center text-sm font-semibold leading-tight text-brand-dark/70',
              orphan ? 'hidden sm:flex' : 'flex'
            )}
          >
            {logo ? (
              <Image
                src={logo.src}
                alt={name}
                width={Math.round((height * logo.width) / logo.height)}
                height={height}
                className="h-auto max-w-full opacity-80"
              />
            ) : (
              name
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function LPSocialProof({
  title,
  logos: logosProp,
  stats,
  testimonial,
  className,
}: LPSocialProofProps) {
  const logos = logosProp === 'clients' ? undefined : logosProp;
  return (
    <SectionWrapper background="white" className={cn('py-12 md:py-16', className)}>
      <Container>
        {title && (
          <p className="mb-8 text-center text-sm font-medium tracking-wider text-zinc-400 uppercase">
            {title}
          </p>
        )}

        {logosProp === 'clients' && <ClientLogos />}

        {/* Logos */}
        {logos && logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 120}
                height={40}
                className="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div
            className={cn(
              'grid gap-8 text-center',
              logosProp && logosProp.length > 0 && 'mt-10 border-t border-brand-light pt-10',
              stats.length === 2 && 'grid-cols-2',
              stats.length === 3 && 'grid-cols-3',
              stats.length >= 4 && 'grid-cols-2 sm:grid-cols-4'
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-brand-dark md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mini testimonial */}
        {testimonial && (
          <div
            className={cn(
              'mx-auto max-w-2xl text-center',
              (logos || stats) && 'mt-10 border-t border-brand-light pt-10'
            )}
          >
            <p className="text-lg italic leading-relaxed text-zinc-600">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium text-brand-dark">
              {testimonial.author}
              <span className="text-zinc-400"> - {testimonial.role}</span>
            </p>
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
