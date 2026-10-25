import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import GuidesContent from './GuidesContent';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guides' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/ressources/guides'),
    description: t('meta.description'),
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GuidesContent />;
}
