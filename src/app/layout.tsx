import type { Metadata } from 'next';
import './globals.css';

// Root layout metadata — metadataBase is inherited by all pages
export const metadata: Metadata = {
  metadataBase: new URL('https://www.trigger-flow.com'),
};

// Since we have a `[locale]` dynamic segment, the locale layout
// is responsible for providing the `<html>` and `<body>` tags.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
