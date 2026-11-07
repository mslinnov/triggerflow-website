import type { L } from './types';

/** Vraies captures de l'application (compte de démo), affichées sous « Comment ça marche ». */
export interface ProductScreenshot {
  src: string;
  width: number;
  height: number;
  alt: L;
}

export const productScreenshots: Record<string, ProductScreenshot> = {
  flows: { src: '/images/homepage/workflow-builder.webp', width: 2800, height: 1726, alt: { fr: 'Éditeur de flows TriggerFlow : déclencheur 3 jours avant l’arrivée, conditions et envois par canal', en: 'TriggerFlow flow editor: trigger 3 days before arrival, conditions and sends per channel' } },
  crm: { src: '/images/homepage/crm-client-card.webp', width: 1600, height: 913, alt: { fr: 'Fiche client TriggerFlow : historique des messages, réservations et formulaires', en: 'TriggerFlow guest profile: message history, bookings and forms' } },
  inbox: { src: '/images/homepage/hub-inbox.webp', width: 1600, height: 999, alt: { fr: 'Messagerie unifiée TriggerFlow : e-mails, SMS et WhatsApp dans une seule boîte', en: 'TriggerFlow unified inbox: email, SMS and WhatsApp in one place' } },
  forms: { src: '/images/homepage/form-builder.webp', width: 2024, height: 1248, alt: { fr: 'Éditeur de formulaires TriggerFlow avec pages, conditions et offres', en: 'TriggerFlow form editor with pages, conditions and offers' } },
  reviews: { src: '/images/homepage/review-dashboard.webp', width: 1600, height: 999, alt: { fr: 'Tableau de bord des avis TriggerFlow : notes par plateforme et réponses', en: 'TriggerFlow reviews dashboard: ratings per platform and replies' } },
  upsell: { src: '/images/homepage/upsell-offer.webp', width: 1600, height: 999, alt: { fr: 'Statistiques de ventes TriggerFlow : chiffre d’affaires, ventes et panier moyen', en: 'TriggerFlow sales statistics: revenue, sales and average basket' } },
  analytics: { src: '/images/homepage/analytics-dashboard.webp', width: 1600, height: 999, alt: { fr: 'Statistiques TriggerFlow : occupation, ADR, RevPAR et calendrier', en: 'TriggerFlow analytics: occupancy, ADR, RevPAR and calendar' } },
};
