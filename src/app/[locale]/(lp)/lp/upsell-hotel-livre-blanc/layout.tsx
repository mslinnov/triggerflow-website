import type { Metadata } from 'next';

/**
 * Landing d'acquisition Facebook Ads, axe « ventes additionnelles », variante livre blanc.
 *
 * Page destinée au trafic payant uniquement : elle reste exclue de l'index pour
 * ne pas concurrencer les pages du site vitrine sur les mêmes requêtes.
 *
 * L'Open Graph est déclaré en entier ici et non hérité : Next remplace le bloc
 * `openGraph` du parent dès qu'un enfant en définit un, il ne le fusionne pas
 * champ par champ. Sans ce rappel, les partages de la page dans Messenger ou
 * WhatsApp partaient sans vignette, ce qui compte pour une page dont tout le
 * trafic vient d'un réseau social.
 *
 * Aucun volume absolu dans ces descriptions : ni le nombre d'offres envoyées,
 * ni le chiffre d'affaires mesuré. Ces volumes ont été retirés des guides pour
 * ne pas renseigner la concurrence sur la taille du parc, et une balise meta
 * est encore plus exposée qu'un PDF. Les résultats se formulent en taux.
 */
export const metadata: Metadata = {
  title: 'Les 5 automatisations qui rapportent le plus | Livre blanc hôtellerie',
  description:
    'Le guide des automatisations qui rapportent le plus en hôtellerie, fondé sur les ventes réellement mesurées chez des hôtels indépendants, résultats exprimés en taux.',
  openGraph: {
    title: 'Les 5 automatisations qui rapportent le plus | Livre blanc hôtellerie',
    description:
      'Le guide fondé sur les ventes réellement mesurées chez des hôtels indépendants.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TriggerFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Livre blanc TriggerFlow : les 5 automatisations qui rapportent le plus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Les 5 automatisations qui rapportent le plus | Livre blanc hôtellerie',
    description:
      'Le guide fondé sur les ventes réellement mesurées chez des hôtels indépendants.',
    images: ['/og-image.jpg'],
  },
  robots: { index: false, follow: false },
};

export default function UpsellWhitepaperLpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
