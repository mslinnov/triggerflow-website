import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TriggerFlow x Thaïs | Automatisation Communication Hôtelière',
  description:
    'Intégration 1-clic entre Thaïs PMS et TriggerFlow. Automatisez vos communications SMS, Email et WhatsApp directement depuis votre interface Thaïs. Synchronisation temps réel et hub de messagerie unifié.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.trigger-flow.com/fr/lp/thais',
    siteName: 'TriggerFlow',
    title: 'TriggerFlow x Thaïs | Partenariat officiel',
    description:
      'L\'intégration qui connecte votre PMS Thaïs à l\'automatisation client TriggerFlow. Synchronisation temps réel, configuration 1-clic, hub de messagerie unifié.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TriggerFlow x Thaïs - Automatisation Communication Hôtelière',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TriggerFlow x Thaïs | Partenariat officiel',
    description:
      'Intégration 1-clic entre Thaïs PMS et TriggerFlow pour automatiser vos communications clients.',
    images: ['/og-image.jpg'],
  },
};

export default function ThaisLandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
