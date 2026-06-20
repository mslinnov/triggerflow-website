/**
 * SOURCE DE VÉRITÉ UNIQUE des chiffres officiels TriggerFlow.
 *
 * → Mettre à jour ICI met à jour TOUT le blog au prochain build/déploiement.
 *   Plus jamais de chiffre figé éparpillé dans les articles.
 * Registre humain miroir : page Notion « Chiffres officiels TriggerFlow ».
 *
 * Valeurs par locale (le séparateur décimal, l'espace insécable avant %, et les
 * unités diffèrent entre FR et EN).
 */
export type StatId =
  | 'hotels'
  | 'rating'
  | 'googleReviews'
  | 'avgBasket'
  | 'hoursSaved'
  | 'onlineCheckin'
  | 'messages'
  | 'countries';

export const companyStats: Record<StatId, { fr: string; en: string }> = {
  hotels: { fr: '500+', en: '500+' },
  rating: { fr: '9,4/10', en: '9.4/10' },
  googleReviews: { fr: '+45 %', en: '+45%' },
  avgBasket: { fr: '+17 %', en: '+17%' },
  hoursSaved: { fr: '~10 h/semaine', en: '~10h/week' },
  onlineCheckin: { fr: '73 %', en: '73%' },
  messages: { fr: '2M+', en: '2M+' },
  countries: { fr: '15', en: '15' },
};

export function stat(id: string, locale: string): string {
  const v = companyStats[id as StatId];
  if (!v) return '';
  return locale === 'fr' ? v.fr : v.en;
}
