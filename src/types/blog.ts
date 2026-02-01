export type SiloId = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';

export type ArticleType = 'pilier' | 'support' | 'satellite';

export type PersonaCible = 'directeur' | 'marketing_groupe' | 'revenue_manager' | 'tous';

export type CtaPrincipal = 'demo' | 'newsletter' | 'les_deux';

export interface Silo {
  id: SiloId;
  nom: string;
  slug: string;
  description: string;
}

export interface ArticleImage {
  id: string;
  filename: string;
  alt: string;
  placement: string;
  width: number;
  height: number;
  model: string;
  prompt: string;
}

export interface InternalLink {
  fichier: string;
  ancre: string;
  contexte: string;
}

export interface ExternalLink {
  url: string;
  ancre: string;
  contexte: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Article {
  slug: string;
  silo: SiloId;
  siloNom: string;
  siloSlug: string;
  type: ArticleType;
  pilierParent: string | null;
  title: string;
  metaDescription: string;
  motClePrincipal: string;
  motsClesSecondaires: string[];
  datePublication: string;
  dateMiseAJour: string;
  longueurMots: number;
  tempsLecture: number;
  personaCible: PersonaCible;
  ctaPrincipal: CtaPrincipal;
  fonctionnalitesMisesEnAvant: string[];
  pmsMentionnes: string[];
  liensInternes: InternalLink[];
  liensExternes: ExternalLink[];
  images: ArticleImage[];
  content: string;
  locale: string;
}
