import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { Header, Footer } from '@/components/layout';

const baseUrl = 'https://www.trigger-flow.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | TriggerFlow',
      default: t('title'),
    },
    description: t('description'),
    keywords: [
      'CRM hôtelier',
      'automatisation hôtel',
      'SMS hôtel',
      'email automatique hôtel',
      'relation client hôtellerie',
      'PMS integration',
      'satisfaction client hôtel',
      'upselling hôtel',
      'TriggerFlow',
      'hotel CRM',
      'hotel automation',
    ],
    authors: [{ name: 'TriggerFlow', url: baseUrl }],
    creator: 'TriggerFlow',
    publisher: 'TriggerFlow',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      url: baseUrl,
      siteName: 'TriggerFlow',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'TriggerFlow - Automatisation relation client hôtelière',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
      creator: '@triggerflow',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: locale === 'fr' ? baseUrl : `${baseUrl}/en`,
      languages: {
        'fr-FR': baseUrl,
        'en-US': `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
