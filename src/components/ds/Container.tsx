import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Largeur de lecture (texte long) au lieu de la grille 1200 px. */
  narrow?: boolean;
}

/** Grille de la charte : contenu max 1200 px, marges 16 / 24 / 32 px. */
export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', narrow ? 'max-w-3xl' : 'max-w-[1200px]', className)}>
      {children}
    </div>
  );
}
