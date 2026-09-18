import type { Metadata } from 'next';

/**
 * Landing d'acquisition Facebook Ads, axe « post-séjour et avis clients »,
 * variante livre blanc.
 *
 * Page destinée au trafic payant uniquement : elle reste exclue de l'index
 * pour ne pas concurrencer les pages du site vitrine sur les mêmes requêtes.
 * Le groupe `(lp)` n'hérite d'aucune règle d'indexation, chaque layout de
 * landing déclare donc la sienne.
 *
 * L'Open Graph est déclaré en entier ici et non hérité : Next remplace le bloc
 * `openGraph` du parent dès qu'un enfant en définit un, il ne le fusionne pas
 * champ par champ. Sans ce rappel, les partages de la page dans Messenger ou
 * WhatsApp partiraient sans vignette, ce qui compte pour une page dont tout le
 * trafic vient d'un réseau social.
 *
 * Aucun volume absolu dans ces descriptions : ni le nombre d'envois suivis, ni
 * le nombre d'établissements de l'étude. Ces volumes ont été retirés des guides
 * pour ne pas renseigner la concurrence sur la taille du parc, et une balise
 * meta est encore plus exposée qu'un PDF. Les résultats se formulent en taux.
 */
export const metadata: Metadata = {
  title: 'Le guide du post-séjour | Livre blanc hôtellerie',
  description:
    "Pourquoi neuf clients sur dix ne laissent jamais d'avis, et les cinq réglages qui changent tout. Guide fondé sur les envois réellement mesurés chez des hôtels indépendants, résultats exprimés en taux.",
  openGraph: {
    title: 'Le guide du post-séjour | Livre blanc hôtellerie',
    description:
      "Les cinq réglages de l'e-mail post-séjour, mesurés sur les envois réels d'hôtels indépendants, résultats exprimés en taux.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TriggerFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Livre blanc TriggerFlow : le guide du post-séjour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le guide du post-séjour | Livre blanc hôtellerie',
    description:
      "Les cinq réglages de l'e-mail post-séjour, mesurés sur les envois réels d'hôtels indépendants, résultats exprimés en taux.",
    images: ['/og-image.jpg'],
  },
  robots: { index: false, follow: false },
};

export default function PostStayWhitepaperLpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
