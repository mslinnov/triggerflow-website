import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { IntegrationsContent } from './IntegrationsContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'integrations' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function IntegrationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IntegrationsContent />;
}
