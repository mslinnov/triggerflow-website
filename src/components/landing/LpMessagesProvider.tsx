import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

/**
 * Fournit à une seule landing page le seul namespace de traductions qu'elle
 * consomme.
 *
 * Le fichier de messages complet pèse environ 130 Ko de HTML une fois
 * sérialisé dans la page, et chaque namespace de landing une dizaine de Ko.
 * Sur du trafic payant mobile, ce poids se paie en conversions perdues, donc
 * en budget publicitaire : une landing ne doit embarquer ni le site vitrine,
 * ni sa voisine.
 *
 * Posé dans le layout de CHAQUE landing et jamais dans celui du groupe `(lp)`,
 * qui serait commun à toutes. C'est la seule façon d'isoler les charges : Next
 * ne donne à un layout de groupe aucun moyen de savoir quelle page il rend.
 */
export async function LpMessagesProvider({
  locale,
  namespace,
  children,
}: {
  locale: string;
  /** Clé de premier niveau de `messages/{locale}.json`, par exemple `lpUpsell`. */
  namespace: string;
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={{ [namespace]: messages[namespace] }}>
      {children}
    </NextIntlClientProvider>
  );
}
