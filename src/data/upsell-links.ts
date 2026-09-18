/**
 * Liens de prise de rendez-vous des landing pages d'acquisition.
 *
 * Un calendrier lemcal par thème de livre blanc, et non un par variante de
 * page : lemcal limite le slug à vingt caractères et multiplier les
 * calendriers multiplie surtout les agendas à surveiller. L'attribution fine
 * (variante démo ou variante livre blanc) se lit côté site, pas côté lemcal.
 */

/** Thème « ventes additionnelles », variante démo : la démo est l'offre principale. */
export const LEMCAL_DEMO_URL = 'https://app.lemcal.com/@trigger-flow/ventes-en-plus';

/**
 * Thème « ventes additionnelles », variante livre blanc : démo proposée en
 * second, à côté du guide. Même calendrier que la variante démo.
 */
export const LEMCAL_DEMO_URL_WHITEPAPER = 'https://app.lemcal.com/@trigger-flow/ventes-en-plus';

/** Thème « post-séjour » : calendrier de la landing du guide avis clients. */
export const LEMCAL_DEMO_URL_POST_STAY = 'https://app.lemcal.com/@trigger-flow/post-sejour';
