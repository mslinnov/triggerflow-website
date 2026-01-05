import type { Metadata } from 'next';
import { IBM_Plex_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
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
      <body className={`${ibmPlexSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
