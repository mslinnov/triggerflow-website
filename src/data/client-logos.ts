/**
 * Logos d'hôtels clients affichés sur le site. Une seule liste, lue par le bandeau de logos de l'accueil
 * (LogoCloud) et par les pages d'atterrissage (LPSocialProof, `logos: "clients"`), pour qu'elles montrent
 * exactement les mêmes.
 */
export const clientLogos = [
  { name: 'Accor', src: '/images/logo-accor.webp' },
  { name: 'Sofitel', src: '/images/logo-sofitel.webp' },
  { name: 'Ibis', src: '/images/logo-ibis.webp' },
  { name: 'Best Western', src: '/images/logo-bestwestern.webp' },
  { name: 'Les Hôtels Très Particuliers', src: '/images/logo-hotels.webp' },
  { name: 'Saint James', src: '/images/logo-saintjames.webp' },
] as const;
