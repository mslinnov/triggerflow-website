import type { Metadata } from 'next';

/**
 * Landing d'acquisition Facebook Ads, axe « ventes additionnelles »,
 * variante livre blanc. Page destinée au trafic payant uniquement : elle est
 * exclue de l'index pour ne pas concurrencer les pages du site vitrine.
 */
export const metadata: Metadata = {
  title: 'Les automatisations qui génèrent le plus de ventes additionnelles',
  description:
    "Le guide des automatisations qui rapportent le plus en hôtellerie, fondé sur 89 347 offres envoyées et 201 439 € de ventes réellement mesurées.",
  openGraph: {
    title: 'Les automatisations qui génèrent le plus de ventes additionnelles',
    description:
      'Le guide fondé sur les ventes réellement mesurées chez des hôtels indépendants.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: { index: false, follow: false },
};

export default function UpsellWhitepaperLpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
