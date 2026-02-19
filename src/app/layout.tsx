import type { Metadata } from 'next';
import Script from 'next/script';
import { IBM_Plex_Sans, Geist_Mono, Fraunces, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-MD02XP125T';

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.trigger-flow.com'),
  title: 'TriggerFlow | Automatisation relation client hôtelière',
  description: "Solution SaaS pour automatiser SMS, emails et fidélisation client dans l'hôtellerie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${ibmPlexSans.variable} ${geistMono.variable} ${fraunces.variable} ${cormorantGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
