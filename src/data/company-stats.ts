/**
 * SOURCE DE VÉRITÉ UNIQUE des chiffres officiels TriggerFlow.
 *
 * → Mettre à jour ICI met à jour TOUT le blog au prochain build/déploiement.
 *   Plus jamais de chiffre figé éparpillé dans les articles.
 * Registre humain miroir : page Notion « Chiffres officiels TriggerFlow », et la section
 * « Chiffres vérifiés » de docs/geo-strategie.md.
 *
 * Chaque chiffre porte sa source (date de mesure, méthode). Un chiffre sans source ne
 * s'ajoute pas : les moteurs IA le reprendraient comme un fait (test src/data/claims.test.ts).
 * Les taux sont arrondis vers le bas.
 *
 * Valeurs par locale (le séparateur décimal, l'espace insécable avant %, et les
 * unités diffèrent entre FR et EN).
 */
export type StatId =
  | 'hotels'
  | 'messages'
  | 'rating'
  | 'emailDelivered'
  | 'emailOpened'
  | 'smsDelivered'
  | 'whatsappRead'
  | 'paidWithin2h'
  | 'upsellAccepted';

export interface CompanyStat {
  fr: string;
  en: string;
  /** Date de mesure ou de confirmation, et méthode, en une phrase. */
  source: string;
}

export const companyStats: Record<StatId, CompanyStat> = {
  hotels: {
    fr: '300+',
    en: '300+',
    source: 'Confirmé par Mounir le 25/10/2026.',
  },
  messages: {
    fr: '2M+',
    en: '2M+',
    source: 'Confirmé par Mounir le 25/10/2026.',
  },
  rating: {
    fr: '5/5 (3 avis Google)',
    en: '5/5 (3 Google reviews)',
    source: 'Fiche Google de TriggerFlow (Toulouse), relevée le 25/10/2026 : 5,0 sur 3 avis.',
  },
  emailDelivered: {
    fr: '94 %',
    en: '94%',
    source:
      'Base prod, 25/10/2026, 12 mois, 117 établissements : e-mails clients délivrés / tentés (échecs définitifs inclus, envois bloqués avant départ exclus) = 1 927 672 / 2 032 001.',
  },
  emailOpened: {
    fr: '35 %',
    en: '35%',
    source:
      'Base prod, 25/10/2026, 12 mois, 117 établissements : e-mails ouverts / délivrés, hors adresses relais OTA (pixel absent) = 642 417 / 1 820 465. Gonflé par les ouvertures automatiques Apple Mail.',
  },
  smsDelivered: {
    fr: '90 %',
    en: '90%',
    source:
      'Base prod, 25/10/2026, 12 mois, 31 établissements : SMS remis / tentés = 51 154 / 56 423. Un SMS n\'a pas d\'accusé de lecture : aucun taux de lecture n\'est mesurable.',
  },
  whatsappRead: {
    fr: '84 %',
    en: '84%',
    source:
      'Base prod, 25/10/2026, 12 mois, 21 établissements : messages WhatsApp lus (lus, répondus, interagis) / remis = 49 375 / 58 216.',
  },
  paidWithin2h: {
    fr: '91 %',
    en: '91%',
    source:
      'Base prod, 25/10/2026, 12 mois, 20 établissements : paiements par lien réglés dans les 2 h après l\'ouverture du lien = 1 619 / 1 778.',
  },
  upsellAccepted: {
    fr: '5 %',
    en: '5%',
    source:
      'Étude ventes additionnelles (src/data/upsell-services.ts) : 5,15 % des offres envoyées 3 à 7 jours avant l\'arrivée achetées, sur 36 708 envois. Arrondi à 5 % pour l\'affichage en nombre entier.',
  },
};

/** Nombre de tête d'un chiffre officiel (« 94 % » → « 94 », « 300+ » → « 300 »), pour AnimatedStat qui anime `value` puis colle son `suffix`. */
export function statNumber(id: StatId): string {
  return companyStats[id].fr.match(/^\d+(?:[.,]\d+)?/)?.[0] ?? '';
}

export function stat(id: string, locale: string): string {
  const v = companyStats[id as StatId];
  if (!v) return '';
  return locale === 'fr' ? v.fr : v.en;
}
