import { cn } from '@/lib/utils';

interface LogoWallProps {
  /** Noms des clients, affichés en lettrage en attendant les fichiers logo. */
  names: readonly string[];
  className?: string;
}

/** Mur de clients : même hauteur optique, monochrome encre. */
export function LogoWall({ names, className }: LogoWallProps) {
  return (
    <ul className={cn('grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-8', className)}>
      {names.map((name) => (
        <li
          key={name}
          className="flex h-20 items-center justify-center border-b border-r border-line px-3 text-center text-[14px] font-semibold leading-tight tracking-[-0.01em] text-ink/70"
        >
          {name}
        </li>
      ))}
    </ul>
  );
}
