/**
 * Auteurs des articles du blog. Un article cite son auteur par `auteur: <id>` dans le
 * frontmatter ; sans ce champ, il est signé par DEFAULT_AUTHOR_ID.
 *
 * Signer d'une personne réelle (et non de « TriggerFlow ») donne aux moteurs de recherche
 * et aux moteurs IA un auteur identifiable : schema.org Person dans le JSON-LD.
 * Le pipeline tf-agents écrit ces mêmes identifiants.
 */
export type AuthorId = 'mounir-lakhfif' | 'soufiane-bouyahia';

export interface Author {
  id: AuthorId;
  name: string;
  role: { fr: string; en: string };
  /** Profil public ; absent tant qu'il n'est pas confirmé. */
  linkedin?: string;
}

export const authors: Record<AuthorId, Author> = {
  'mounir-lakhfif': {
    id: 'mounir-lakhfif',
    name: 'Mounir Lakhfif',
    role: { fr: 'Fondateur de TriggerFlow', en: 'Founder of TriggerFlow' },
    linkedin: 'https://www.linkedin.com/in/mounir-lakhfif/',
  },
  'soufiane-bouyahia': {
    id: 'soufiane-bouyahia',
    name: 'Soufiane Bouyahia',
    role: { fr: 'Fondateur de TriggerFlow', en: 'Founder of TriggerFlow' },
    linkedin: 'https://www.linkedin.com/in/soufiane-bouyahia/',
  },
};

export const DEFAULT_AUTHOR_ID: AuthorId = 'mounir-lakhfif';

export function getAuthor(id: unknown): Author {
  return typeof id === 'string' && id in authors ? authors[id as AuthorId] : authors[DEFAULT_AUTHOR_ID];
}
