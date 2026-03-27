import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper } from '@/components/ui';

export interface LPSocialProofLogo {
  src: string;
  alt: string;
  width?: number;
}

export interface LPSocialProofStat {
  value: string;
  label: string;
}

export interface LPSocialProofTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface LPSocialProofProps {
  title?: string;
  logos?: LPSocialProofLogo[];
  stats?: LPSocialProofStat[];
  testimonial?: LPSocialProofTestimonial;
  className?: string;
}

export function LPSocialProof({
  title,
  logos,
  stats,
  testimonial,
  className,
}: LPSocialProofProps) {
  return (
    <SectionWrapper background="white" className={cn('py-12 md:py-16', className)}>
      <Container>
        {title && (
          <p className="mb-8 text-center text-sm font-medium tracking-wider text-zinc-400 uppercase">
            {title}
          </p>
        )}

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
              logos && logos.length > 0 && 'mt-10 border-t border-brand-light pt-10',
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
