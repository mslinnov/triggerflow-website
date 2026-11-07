import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { SiteHeader, SiteFooter, AnnouncementBar } from '@/components/layout';

/** Régénère le HTML statique toutes les heures : la bascule des tarifs au 1er janvier se fait sans redéploiement. */
export const revalidate = 3600;

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
      <SiteHeader banner={<AnnouncementBar />} />
      <main className="pt-[100px]">{children}</main>
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
