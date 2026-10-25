import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CaseStudiesContent from './CaseStudiesContent';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/ressources/cas-clients'),
    description: t('meta.description'),
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CaseStudiesContent />;
}
