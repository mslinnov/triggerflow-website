import { setRequestLocale } from 'next-intl/server';

/**
 * Groupe des landing pages d'acquisition.
 *
 * Ce layout ne fournit AUCUNE traduction au client, et c'est volontaire. Un
 * fournisseur posé ici est commun à toutes les pages du groupe : chacune paie
 * alors dans son HTML les traductions des autres, sur un trafic payant très
 * majoritairement mobile où le poids se paie en conversions perdues et donc en
 * budget publicitaire.
 *
 * L'erreur a déjà été commise : les deux namespaces ont cohabité ici, et la
 * landing des ventes additionnelles, que personne n'avait touchée, embarquait
 * en plus des siens les 13 Ko de sa voisine.
 *
 * Chaque landing déclare donc le namespace dont elle a besoin, et lui seul,
 * dans son propre layout, avec `LpMessagesProvider`. Une nouvelle landing qui
 * appelle `useTranslations` sans ce fournisseur plante côté client avec une
 * erreur qui ne nomme aucun de ces fichiers.
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

  return <>{children}</>;
}
