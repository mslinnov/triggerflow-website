import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';

export interface LPHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant?: 'primary' | 'secondary';
  className?: string;
}

export function LPHeader({
  logoSrc = '/images/logo.svg',
  logoAlt = 'TriggerFlow',
  ctaLabel,
  ctaHref,
  ctaVariant = 'primary',
  className,
}: LPHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-brand-light/50 bg-white/90 backdrop-blur-md',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={140}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <ButtonLink
          href={ctaHref}
          variant={ctaVariant}
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </ButtonLink>
      </div>
    </header>
  );
}
