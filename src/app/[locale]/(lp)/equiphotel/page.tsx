import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  EquiphotelHeader,
  EquiphotelHero,
  EquiphotelApero,
  EquiphotelGuides,
  EquiphotelBooking,
  EquiphotelInfos,
  EquiphotelAbout,
  EquiphotelContact,
  EquiphotelFooter,
} from '@/components/landing/equiphotel';

const BASE_URL = 'https://www.trigger-flow.com';
const PAGE_URL = `${BASE_URL}/fr/equiphotel`;

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Page FR uniquement (salon français) : /en/equiphotel redirige vers /fr (next.config.ts).
export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'equiphotel.meta' });

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: PAGE_URL,
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('title') }],
    },
  };
}

export default async function EquiphotelPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'fr') notFound();
  setRequestLocale(locale);

  return (
    <>
      <EquiphotelHeader />
      <main>
        <EquiphotelHero />
        <EquiphotelGuides />
        <EquiphotelApero />
        <EquiphotelBooking />
        <EquiphotelInfos />
        <EquiphotelAbout />
        <EquiphotelContact />
      </main>
      <EquiphotelFooter />
    </>
  );
}
