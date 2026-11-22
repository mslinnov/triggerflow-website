/**
 * Liens de la page d'atterrissage CRM hôtelier. Chaque bouton de démo porte son emplacement dans `utm_content` :
 * on sait d'où vient chaque rendez-vous (en-tête, héros, milieu du récit, tarifs, bas de page).
 */

export const DEMO = 'https://app.lemcal.com/@trigger-flow/demo?utm_source=site&utm_medium=landing&utm_campaign=lp-crm-hotelier';

export const PLACEMENTS = ['entete', 'hero', 'milieu', 'tarifs', 'cta-bas'] as const;
export type Placement = (typeof PLACEMENTS)[number];

export const demoHref = (placement: Placement): string => `${DEMO}&utm_content=${placement}`;

/** Ancre du formulaire de rappel, l'action secondaire de la page (l'en-tête et le héros y mènent). */
export const RAPPEL = 'rappel';

/** Source enregistrée avec chaque demande de rappel (route des leads). */
export const SOURCE_RAPPEL = 'lp-crm-hotelier';
