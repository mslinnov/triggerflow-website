import { IBM_Plex_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { LpMessagesProvider } from '@/components/landing/LpMessagesProvider';
import { cn } from '@/lib/utils';
import { LPStoryLoader } from './LPStoryLoader';

/** Hauteur de LPHeader (collé en haut), mesurée à 390 et à 1 440 px : la scène se colle juste dessous. */
const LP_HEADER = 61;

/**
 * Police des libellés de la scène (`font-mono`), celle de new-version. `preload: false` : le fichier n'est
 * téléchargé que lorsque la scène affiche ses libellés, jamais avec le premier écran.
 */
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
});

/**
 * La scène animée de la page « Comment ça marche » du nouveau site (src/components/how-it-works, copiée à
 * l'identique), dans une landing page. Ses textes viennent de `howItWorksPage`, seul namespace fourni ici.
 * Polices de new-version : IBM Plex Sans posée par `font-sans` (le `var(--font-sans)` de `body` dans globals.css
 * n'aboutit pas ici, la page retombe sur la police système), et IBM Plex Mono pour `font-mono`, que ce site
 * donne à Geist Mono : la variable est redirigée dans la scène seulement.
 */
export async function LPStory({ className }: { className?: string }) {
  const locale = await getLocale();
  return (
    <LpMessagesProvider locale={locale} namespace="howItWorksPage">
      <div className={cn(plexMono.variable, 'font-sans [--font-geist-mono:var(--font-plex-mono)]', className)}>
        <LPStoryLoader header={LP_HEADER} />
      </div>
    </LpMessagesProvider>
  );
}
