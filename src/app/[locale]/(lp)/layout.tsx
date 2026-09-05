import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

/**
 * Les landing pages d'acquisition ne consomment qu'un seul namespace. Leur
 * transmettre le fichier de traductions complet ajoutait environ 130 Ko de
 * HTML à chaque page, sur un trafic payant très majoritairement mobile où le
 * poids se paie en conversions perdues et donc en budget publicitaire.
 */
export default async function LandingPagesLayout({
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
    <NextIntlClientProvider locale={locale} messages={{ lpUpsell: messages.lpUpsell }}>
      {children}
    </NextIntlClientProvider>
  );
}
