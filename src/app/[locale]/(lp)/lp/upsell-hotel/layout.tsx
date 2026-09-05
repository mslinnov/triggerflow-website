import type { Metadata } from 'next';

/**
 * Landing d'acquisition Facebook Ads, axe « ventes additionnelles ».
 * Page destinée au trafic payant uniquement : elle est exclue de l'index pour
 * ne pas concurrencer les pages du site vitrine.
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
  },
  robots: { index: false, follow: false },
};

export default function UpsellLpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
