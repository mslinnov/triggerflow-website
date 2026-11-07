import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoWallProps {
  /** Noms des clients, dans l'ordre d'affichage. */
  names: readonly string[];
  /** Logos par nom ; un nom sans logo s'affiche en lettrage. */
  logos?: Partial<Record<string, { src: string; width: number; height: number }>>;
  className?: string;
}

/** Surface visuelle commune à tous les logos (px²), pour qu'un logo large n'écrase pas un logo carré. */
const OPTICAL_AREA = 3200;

/** Mur de clients : même poids optique, monochrome encre. */
export function LogoWall({ names, logos = {}, className }: LogoWallProps) {
  return (
    <ul className={cn('grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-8', className)}>
      {names.map((name) => {
        const logo = logos[name];
        const height = logo ? Math.round(Math.min(48, Math.max(22, Math.sqrt(OPTICAL_AREA / (logo.width / logo.height))))) : 0;
        return (
          <li
            key={name}
            className="flex h-20 items-center justify-center border-b border-r border-line px-3 text-center text-[14px] font-semibold leading-tight tracking-[-0.01em] text-ink/70"
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
