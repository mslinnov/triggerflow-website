import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HelpCenterContent from './HelpCenterContent';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'helpCenter' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/ressources/aide'),
    description: t('meta.description'),
  };
}

export default async function HelpCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HelpCenterContent />;
}
