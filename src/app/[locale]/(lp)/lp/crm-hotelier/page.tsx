import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Bas } from '@/components/landing/crm-hotelier/Bas';
import { EnTete, type TextesEnTete } from '@/components/landing/crm-hotelier/EnTete';
import { LANGUES, estLangue, metadonnees } from '@/components/landing/crm-hotelier/seo';
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
  return (
    <>
      <EnTete textes={t.raw('header') as TextesEnTete} />
      <main>
        <Bas locale={locale} />
      </main>
    </>
  );
}
