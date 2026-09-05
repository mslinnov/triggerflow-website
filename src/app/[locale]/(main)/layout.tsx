import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';

/**
 * Fournit les traductions aux pages de ce groupe. Le layout racine ne transmet
 * plus que ses propres namespaces, chaque groupe déclare donc les siens.
 * Ces pages consomment une large part du fichier, on le passe entier.
 */
export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
