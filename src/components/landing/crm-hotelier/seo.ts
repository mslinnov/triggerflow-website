import type { Metadata } from 'next';
import { brand } from '@/data/brand';

export const CHEMIN = '/lp/crm-hotelier';

/** Langues servies par la page. */
export const LANGUES = ['fr'] as const;
export type Langue = (typeof LANGUES)[number];

export const estLangue = (locale: string): locale is Langue => (LANGUES as readonly string[]).includes(locale);

const VIGNETTE = { url: '/og-image.jpg', width: 1200, height: 630 };

/**
 * Page payante : hors index et hors plan du site, comme les autres pages d'atterrissage de campagne. L'Open Graph
 * est entier (Next remplace le bloc du parent, il ne le fusionne pas) : un lien partagé garde sa vignette. Les
 * `alternates` sont posés par la page elle-même (seo.test.ts vérifie leur chemin dans le fichier de la page).
 */
export function metadonnees(locale: Langue, { title, description }: { title: string; description: string }): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, url: `${brand.url}/${locale}${CHEMIN}`, type: 'website', siteName: 'TriggerFlow', images: [{ ...VIGNETTE, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [VIGNETTE.url] },
    robots: { index: false, follow: false },
  };
}
