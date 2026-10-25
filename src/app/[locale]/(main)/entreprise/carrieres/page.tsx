import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CareersContent from './CareersContent';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/entreprise/carrieres'),
    description: t('meta.description'),
  };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CareersContent />;
}
