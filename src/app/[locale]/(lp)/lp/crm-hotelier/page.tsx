import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Bas } from '@/components/landing/crm-hotelier/Bas';
import type { TextesEnTete } from '@/components/landing/crm-hotelier/EnTete';
import type { TextesImmersion } from '@/components/landing/crm-hotelier/Immersion';
import type { Logo } from '@/components/landing/crm-hotelier/Logos';
import { PageRecit } from '@/components/landing/crm-hotelier/Page';
import { LANGUES, estLangue, metadonnees } from '@/components/landing/crm-hotelier/seo';
import { brand } from '@/data/brand';
import { clientLogos, homeClients } from '@/data/clients';
import { stat } from '@/data/company-stats';
import { pageAlternates } from '@/lib/seo';

/**
 * Page d'atterrissage des campagnes « CRM hôtelier ». Régénérée toutes les heures : les tarifs suivent la phase de
 * prix calculée au rendu, qui bascule le 1er janvier 2027.
 */
export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LANGUES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!estLangue(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'lpCrmHotelier' });
  return {
    ...metadonnees(locale, { title: t('metadata.title'), description: t('metadata.description') }),
    alternates: pageAlternates(locale, '/lp/crm-hotelier', LANGUES),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!estLangue(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'lpCrmHotelier' });
  const textes: TextesImmersion = { hero: t.raw('hero') as TextesImmersion['hero'], story: t.raw('story') as TextesImmersion['story'] };
  const chiffres = { pms: brand.pmsCompatibles[locale], whatsapp: stat('whatsappRead', locale), upsell: stat('upsellAccepted', locale) };
  // Les vrais clients du héros, sur une ligne : huit au plus.
  const logos: Logo[] = homeClients
    .flatMap((name) => {
      const logo = clientLogos[name];
      return logo ? [{ alt: name, ...logo }] : [];
    })
    .slice(0, 8);
  return (
    <PageRecit entete={t.raw('header') as TextesEnTete} textes={textes} chiffres={chiffres} logos={logos}>
      <Bas locale={locale} />
    </PageRecit>
  );
}
