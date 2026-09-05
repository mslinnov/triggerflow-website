/**
 * Source unique des plans tarifaires.
 *
 * Consommée par la page /tarifs (affichage) ET par le schema Product/Offer
 * (`src/components/seo/JsonLd.tsx`). Un prix qui change ici se propage aux deux.
 * Les libellés et descriptions restent dans `messages/{locale}.json` (`pricing.plans.*`),
 * sauf ceux repris ci-dessous, que le JSON-LD doit rendre hors contexte React.
 */

export interface Plan {
  key: 'discovery' | 'communication' | 'conversion' | 'allInclusive';
  price: string;
  popular: boolean;
  /** Repris dans le JSON-LD, où les traductions next-intl ne sont pas disponibles. */
  name: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const PLANS: Plan[] = [
  {
    key: 'discovery',
    price: '0',
    popular: false,
    name: { fr: 'Découverte', en: 'Discovery' },
    description: {
      fr: 'Gratuit, sans carte bancaire : testez vos premiers scénarios clients.',
      en: 'Free, no credit card: try your first guest scenarios.',
    },
  },
  {
    key: 'communication',
    price: '69',
    popular: false,
    name: { fr: 'Communication', en: 'Communication' },
    description: {
      fr: 'Segments et messages automatisés avant, pendant et après le séjour.',
      en: 'Segments and automated messages before, during and after the stay.',
    },
  },
  {
    key: 'conversion',
    price: '149',
    popular: true,
    name: { fr: 'Conversion', en: 'Conversion' },
    description: {
      fr: 'Ventes additionnelles, enquêtes de satisfaction et collecte d’avis.',
      en: 'Upselling, satisfaction surveys and review collection.',
    },
  },
  {
    key: 'allInclusive',
    price: '249',
    popular: false,
    name: { fr: 'All Inclusive', en: 'All Inclusive' },
    description: {
      fr: 'Tous les modules inclus, sans limites, avec account manager dédié.',
      en: 'Every module included, no limits, with a dedicated account manager.',
    },
  },
];
