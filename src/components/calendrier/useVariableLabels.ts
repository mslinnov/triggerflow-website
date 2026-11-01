import { useTranslations } from 'next-intl';

/** Variables de fusion affichées dans les aperçus, avec leur libellé humain (« Prénom »). */
const VARIABLES = ['firstname', 'lastname', 'facility_name', 'booking_page_url', 'website_url', 'facility_email', 'facility_phone'] as const;

export function useVariableLabels(): Record<string, string> {
  const t = useTranslations('calendrierMarketing.variables');
  return Object.fromEntries(VARIABLES.map((name) => [name, t(name)]));
}
