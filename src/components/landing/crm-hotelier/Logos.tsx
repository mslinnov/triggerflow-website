import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Logos des clients sur une ligne, même poids optique. `dark` : sur fond sombre. */
export function Logos({ logos, dark, className }: { logos: readonly Logo[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-between', className)}>
      {logos.map((logo, i) => {
        const h = Math.round(Math.min(34, Math.max(16, Math.sqrt(2200 / (logo.width / logo.height)))));
        return (
          <li key={logo.alt} className={cn(i >= 3 && 'hidden sm:block', i >= 6 && 'sm:hidden lg:block')}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={Math.round((h * logo.width) / logo.height)}
              height={h}
              className={cn('h-auto', dark ? 'opacity-70 brightness-0 invert' : 'opacity-70')}
            />
          </li>
        );
      })}
    </ul>
  );
}
