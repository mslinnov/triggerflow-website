import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactContent } from './ContactContent';
import { BreadcrumbListJsonLd } from '@/components/seo';

const baseUrl = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        'fr-FR': `${baseUrl}/fr/contact`,
        'en-US': `${baseUrl}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: 'Contact', url: `${baseUrl}/${locale}/contact` },
        ]}
      />
      <ContactContent />
    </>
  );
}
