import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header, Footer, PriceChangeBanner } from '@/components/layout';
import { getPricingPhase } from '@/data/pricing';

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
  const announcing = getPricingPhase() === 'announce';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header banner={announcing ? <PriceChangeBanner /> : undefined} />
      <main className={announcing ? 'pt-[100px] md:pt-[116px]' : 'pt-16 md:pt-20'}>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
