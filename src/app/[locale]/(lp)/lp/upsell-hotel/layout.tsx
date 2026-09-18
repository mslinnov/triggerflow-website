import type { Metadata } from 'next';
import { LpMessagesProvider } from '@/components/landing/LpMessagesProvider';

/**
 * Landing d'acquisition Facebook Ads, axe « ventes additionnelles ».
 *
 * Page destinée au trafic payant uniquement : elle reste exclue de l'index pour
 * ne pas concurrencer les pages du site vitrine sur les mêmes requêtes.
 *
 * L'Open Graph est déclaré en entier ici et non hérité : Next remplace le bloc
 * `openGraph` du parent dès qu'un enfant en définit un, il ne le fusionne pas
 * champ par champ. Sans ce rappel, les partages de la page dans Messenger ou
 * WhatsApp partaient sans vignette, ce qui compte pour une page dont tout le
 * trafic vient d'un réseau social.
 */
export const metadata: Metadata = {
  title: 'Combien votre hôtel peut-il gagner en ventes additionnelles ?',
  description:
    'Late check-out, surclassement, spa, parking : calculez en 30 secondes le revenu additionnel que votre hôtel laisse passer chaque mois.',
  openGraph: {
    title: 'Combien votre hôtel peut-il gagner en ventes additionnelles ?',
    description:
      'Calculez en 30 secondes le revenu additionnel que votre hôtel laisse passer chaque mois.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TriggerFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Simulateur de revenus additionnels TriggerFlow pour hôtels indépendants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Combien votre hôtel peut-il gagner en ventes additionnelles ?',
    description:
      'Calculez en 30 secondes le revenu additionnel que votre hôtel laisse passer chaque mois.',
    images: ['/og-image.jpg'],
  },
  robots: { index: false, follow: false },
};

/**
 * Le fournisseur de traductions est posé ici et non dans le layout du groupe
 * `(lp)` : là-haut, il serait commun à toutes les landings et chacune
 * embarquerait les namespaces des autres dans son HTML.
 */
export default async function UpsellLpLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <LpMessagesProvider locale={locale} namespace="lpUpsell">
      {children}
    </LpMessagesProvider>
  );
}
