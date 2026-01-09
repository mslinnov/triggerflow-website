import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'TriggerFlow x Thaïs PMS | Automatisation relation client hôtelière',
  description:
    'Solution d\'automatisation email et SMS pour hôtels utilisant Thaïs PMS. Configurez une fois, vos emails s\'envoient automatiquement. Support français.',
  openGraph: {
    title: 'TriggerFlow x Thaïs PMS | Automatisation relation client',
    description:
      'Automatisez vos emails clients avec TriggerFlow, partenaire officiel Thaïs PMS. Gagnez 4h par semaine.',
    images: ['/images/og/thais-v3.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TriggerFlow x Thaïs PMS',
    description: 'Automatisez vos emails clients. Gagnez 4h par semaine.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThaisV3Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
