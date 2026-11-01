import type { Metadata } from 'next';
import { LpMessagesProvider } from '@/components/landing/LpMessagesProvider';

/**
 * Landing d'acquisition Facebook Ads, axe « clients OTA », variante livre blanc.
 *
 * Mêmes règles que les deux landings jumelles (voir
 * `post-sejour-hotel-livre-blanc/layout.tsx`) : page exclue de l'index, Open
 * Graph déclaré en entier (Next remplace le bloc du parent, il ne le fusionne
 * pas), aucun volume absolu dans les descriptions, des taux seulement.
 */
const TITLE = 'Le guide du client OTA | Livre blanc hôtellerie';
const DESCRIPTION =
  "Un client OTA sur quatre vous donne sa vraie adresse si vous la lui demandez au bon moment. Les sept réglages pour la récupérer, mesurés chez des hôtels indépendants, résultats exprimés en taux.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TriggerFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Livre blanc TriggerFlow : le guide du client OTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: { index: false, follow: false },
};

/** Fournisseur de traductions posé ici et non dans le layout du groupe `(lp)`. */
export default async function ClientsOtaWhitepaperLpLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LpMessagesProvider locale={locale} namespace="lpClientsOta">
      {children}
    </LpMessagesProvider>
  );
}
