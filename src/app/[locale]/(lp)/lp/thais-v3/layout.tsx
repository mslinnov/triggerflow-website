import { Metadata } from 'next';
import { Suspense } from 'react';
import { pageAlternates } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'TriggerFlow x Thaïs PMS | Automatisation relation client hôtelière',
  description:
    'Solution d\'automatisation email et SMS pour hôtels utilisant Thaïs PMS. Configurez une fois, vos emails s\'envoient automatiquement. Support français.',
  openGraph: {
    title: 'TriggerFlow x Thaïs PMS | Automatisation relation client',
    description:
      'Automatisez vos emails clients avec TriggerFlow, partenaire officiel Thaïs PMS. Configurez une fois, vos emails partent tout seuls.',
    images: ['/images/og/thais-v3.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TriggerFlow x Thaïs PMS',
    description: 'Automatisez vos emails clients avec Thaïs PMS.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  // Page FR seulement : pas de hreflang en tant qu'elle n'est pas traduite.
  return { ...baseMetadata, alternates: pageAlternates(locale, '/lp/thais-v3', ['fr']) };
}

export default function ThaisV3Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
