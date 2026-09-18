import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

/**
 * Les landing pages d'acquisition ne consomment qu'un seul namespace chacune.
 * Leur transmettre le fichier de traductions complet ajoutait environ 130 Ko de
 * HTML à chaque page, sur un trafic payant très majoritairement mobile où le
 * poids se paie en conversions perdues et donc en budget publicitaire.
 *
 * Toute nouvelle landing du groupe doit ajouter son namespace à la liste
 * ci-dessous : absent d'ici, `useTranslations` plante côté client avec une
 * erreur qui ne nomme pas ce fichier. Les deux pages actuelles ne partagent
 * aucune clé, chacune ne reçoit donc que la sienne.
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
    <NextIntlClientProvider
      locale={locale}
      messages={{ lpUpsell: messages.lpUpsell, lpPostStay: messages.lpPostStay }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
