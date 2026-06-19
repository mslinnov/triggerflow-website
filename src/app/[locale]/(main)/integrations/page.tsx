import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { IntegrationsContent } from './IntegrationsContent';
import { BreadcrumbListJsonLd } from '@/components/seo';

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'integrations' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/integrations`,
      languages: {
        fr: `${baseUrl}/fr/integrations`,
        en: `${baseUrl}/en/integrations`,
        'x-default': `${baseUrl}/fr/integrations`,
      },
    },
  };
}

export default async function IntegrationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: 'Intégrations', url: `${baseUrl}/${locale}/integrations` },
        ]}
      />
      <IntegrationsContent />
    </>
  );
}
