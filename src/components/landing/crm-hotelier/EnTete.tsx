import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';
import { lpLinkProps } from '@/components/landing/shared/lp-links';
import { RAPPEL, demoHref } from './liens';

export interface TextesEnTete {
  pricing: string;
  callback: string;
  demo: string;
}

interface EnTeteProps {
  textes: TextesEnTete;
  /**
   * Sur le récit, l'en-tête suit le passage de la nuit au papier : `--nuit` (1 la nuit, 0 sur papier) est posée sur
   * lui seul, jamais sur `:root` (une variable de `:root` écrite au défilement recalcule le style de toute la page).
   */
  sombre?: boolean;
  /** Couleur de nuit de l'ouverture, mêlée au papier selon `--nuit`. */
  fond?: string;
  papier?: string;
}

export function EnTete({ textes, sombre = false, fond, papier }: EnTeteProps) {
  const demo = demoHref('entete');
  return (
    <header
      data-jour
      className={cn(
        'sticky top-0 z-50 h-[61px] border-b transition-[background-color,border-color] duration-300',
        sombre ? 'border-[color:color-mix(in_srgb,rgb(255_255_255/0.1)_calc(var(--nuit,1)*100%),rgb(12_42_38/0.12))]' : 'border-line bg-white/92 backdrop-blur-md',
      )}
      style={sombre && fond && papier ? { backgroundColor: `color-mix(in oklab, ${fond} calc(var(--nuit, 1) * 100%), ${papier})` } : undefined}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center gap-4 px-4 lg:gap-6 lg:px-8">
        {/* La nuit, le logo passe en clair : son pictogramme vert foncé y disparaissait. */}
        <Image
          src="/images/logo.webp"
          alt="TriggerFlow"
          width={140}
          height={32}
          className="h-7 w-auto transition-[filter] duration-300 lg:h-8"
          style={sombre ? { filter: 'brightness(calc(1 - var(--nuit, 1))) invert(var(--nuit, 1))' } : undefined}
          priority
        />
        <nav
          className={cn(
            'ml-auto flex items-center gap-6 text-[15px] font-medium transition-colors duration-300',
            sombre ? 'text-[color:color-mix(in_srgb,rgb(255_255_255/0.8)_calc(var(--nuit,1)*100%),rgb(52_78_74))]' : 'text-ink-2',
          )}
        >
          <a href="#tarifs" className="underline-offset-4 hover:underline">
            {textes.pricing}
          </a>
          <a href={`#${RAPPEL}`} className="hidden underline-offset-4 hover:underline sm:inline">
            {textes.callback}
          </a>
        </nav>
        <ButtonLink href={demo} variant="accent" size="sm" className="shrink-0 whitespace-nowrap" {...lpLinkProps(demo)}>
          {textes.demo}
        </ButtonLink>
      </div>
    </header>
  );
}
