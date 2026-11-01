// Calendrier marketing hôtelier (/fr/calendrier-marketing), page du QR du flyer EquipHotel.
//
// Contenu éditorial typé (comme les cas clients) : dates et modèles d'e-mails, en
// français seulement. Les libellés d'interface sont dans messages/fr.json
// (namespace « calendrierMarketing »).
//
// Règles de rédaction (plan EquipHotel du 31/10/2026) :
// - toute date s'écrit {date:AAAA-MM-JJ} : le jour de la semaine est calculé ;
// - tout chiffre promis (remise, délai, durée) est un champ [[Libellé|exemple]] ;
// - variables réelles de l'app : {{firstname}}, {{facility_name}}, {{booking_page_url}}… ;
// - jamais de tiret cadratin ; vouvoiement, phrases courtes.
//
// Dates vérifiées le 31/10/2026 : fêtes mobiles recalculées (calendrier-marketing.test.ts),
// vacances scolaires confrontées à l'open data du ministère (data.education.gouv.fr,
// jeu « fr-en-calendrier-scolaire », 2026-2027 et 2027-2028). Les vacances s'écrivent comme
// le calendrier officiel et les modèles de l'app : de la fin des cours (samedi) au jour de
// la reprise (« du 10 au 26 avril »).

import type { EmailModel } from '@/lib/calendrier';
import { brand } from './brand';

/**
 * Thèmes visuels des modèles MJML, un dossier chacun (src/data/calendrier-mjml/<thème>/),
 * même nom que dans la bibliothèque de l'app (seasonal/<thème>/). Liste fermée : le
 * thème vient de l'URL de l'aperçu. Le premier est le thème par défaut.
 */
export const MJML_THEMES = ['moderne', 'soiree', 'editorial'] as const;
export type MjmlTheme = (typeof MJML_THEMES)[number];
export const DEFAULT_MJML_THEME: MjmlTheme = 'moderne';

export function isMjmlTheme(value: unknown): value is MjmlTheme {
  return typeof value === 'string' && (MJML_THEMES as readonly string[]).includes(value);
}

/** Codes partagés avec l'app : /email-templates/ai/new?type=<code> ouvre l'assistant sur ce modèle. */
export const TEMPS_FORT_CODES = [
  'early_booking_summer',
  'valentines_day',
  'spring_holidays',
  'ascension_bridge',
  'mothers_day_voucher',
  'last_rooms_july',
  'late_season',
  'toussaint_holidays',
  'corporate_year_end',
  'new_year_eve',
  'black_friday_voucher',
  'last_minute_gift',
] as const;

export type TempsFortCode = (typeof TEMPS_FORT_CODES)[number];

export interface TempsFortInfo {
  code: TempsFortCode;
  /** Segment d'URL de la page « Activer » (/fr/calendrier-marketing/<slug>). */
  slug: string;
  title: string;
  /** À qui l'envoyer, en clair. */
  audience: string;
}

export const TEMPS_FORTS: Record<TempsFortCode, TempsFortInfo> = {
  early_booking_summer: {
    code: 'early_booking_summer',
    slug: 'reservez-tot-ete',
    title: 'Réservez tôt votre été',
    audience: 'Les clients venus les étés précédents',
  },
  valentines_day: {
    code: 'valentines_day',
    slug: 'saint-valentin',
    title: 'Saint-Valentin',
    audience: 'Les couples (deux adultes, sans enfant)',
  },
  spring_holidays: {
    code: 'spring_holidays',
    slug: 'vacances-de-printemps',
    title: 'Vacances de printemps',
    audience: 'Les familles (séjours avec enfants)',
  },
  ascension_bridge: {
    code: 'ascension_bridge',
    slug: 'pont-de-l-ascension',
    title: "Pont de l'Ascension",
    audience: 'Tous vos clients loisirs',
  },
  mothers_day_voucher: {
    code: 'mothers_day_voucher',
    slug: 'fete-des-meres',
    title: 'Fête des mères : bons cadeaux',
    audience: 'Tous vos clients',
  },
  last_rooms_july: {
    code: 'last_rooms_july',
    slug: 'dernieres-chambres-juillet',
    title: 'Dernières chambres de juillet',
    audience: "Les clients sans réservation pour l'été",
  },
  late_season: {
    code: 'late_season',
    slug: 'arriere-saison',
    title: 'Arrière-saison',
    audience: 'Les couples et les seniors',
  },
  toussaint_holidays: {
    code: 'toussaint_holidays',
    slug: 'vacances-de-la-toussaint',
    title: 'Vacances de la Toussaint',
    audience: 'Les familles (séjours avec enfants)',
  },
  corporate_year_end: {
    code: 'corporate_year_end',
    slug: 'fin-d-annee-entreprises',
    title: "Fin d'année des entreprises",
    audience: 'Les clients affaires et les entreprises',
  },
  new_year_eve: {
    code: 'new_year_eve',
    slug: 'reveillons',
    title: 'Réveillons de Noël et du Nouvel An',
    audience: 'Tous vos clients de la région',
  },
  black_friday_voucher: {
    code: 'black_friday_voucher',
    slug: 'black-friday-bons-cadeaux',
    title: 'Black Friday : bons cadeaux',
    audience: 'Tous vos clients',
  },
  last_minute_gift: {
    code: 'last_minute_gift',
    slug: 'cadeau-derniere-minute',
    title: 'Cadeau de dernière minute',
    audience: 'Tous vos clients',
  },
};

/** Une campagne datée : un temps fort pour une année donnée. */
export interface Campaign {
  /** Identifiant unique (ancre et clé) : `<code>-<année>`. */
  id: string;
  code: TempsFortCode;
  /** Quand l'envoyer (jetons {date:…} permis). */
  send: string;
  /** Quand et comment relancer, si la campagne a une relance. */
  reminder?: string;
  /** Dernière date utile de la campagne : passée, la page « Activer » montre l'occurrence suivante. */
  endsOn: string;
  email: EmailModel;
}

export interface KeyDate {
  /** Premier jour (AAAA-MM-JJ). */
  start: string;
  /** Dernier jour d'une période ; pour des vacances scolaires (`school`), le jour de la reprise. */
  end?: string;
  /** Vacances scolaires : `end` est le jour de la reprise, affiché comme tel. */
  school?: boolean;
  label: string;
  /** Précision affichée après le libellé (zone, reprise, « à confirmer ») ; jetons {date:…} permis. */
  note?: string;
}

export interface CalendarMonth {
  /** Ancre (#janvier… ; #novembre-2026 pour l'année en cours). */
  id: string;
  /** Libellé de la puce (« Nov. 2026 », « Janv. »). */
  chip: string;
  /** Titre de la section (« Novembre 2026 »). */
  title: string;
  keyDates: KeyDate[];
  campaigns: Campaign[];
}

const SIGNATURE = "À très bientôt,\nL'équipe de {{facility_name}}";
const BOOK = '{{booking_page_url}}';
const VOUCHER_SHOP = '[[Lien de votre boutique de bons cadeaux|https://votre-hotel.fr/bons-cadeaux]]';

// ── Modèles réutilisés sur deux années ──────────────────────────────────────

/** Jeton de date d'un modèle paramétré par l'année. */
const d = (iso: string) => `{date:${iso}}`;

function newYearEve(christmasEve: string, newYearsEve: string): EmailModel {
  return {
    subject: 'Noël et Saint-Sylvestre : réservez votre table',
    preheader: `Réveillons le ${d(christmasEve)} et le ${d(newYearsEve)}, et la nuit sur place si vous le souhaitez.`,
    body: [
      'Bonjour {{firstname}},',
      'Les fêtes approchent, et nos tables de réveillon partent tôt chaque année.',
      [
        `Le ${d(christmasEve)} au soir : [[Votre menu de Noël|notre menu de Noël en cinq plats]].`,
        `Le ${d(newYearsEve)} : [[Votre soirée de la Saint-Sylvestre|le dîner de la Saint-Sylvestre, avec un DJ jusqu'à 2 h]].`,
      ],
      "Pour ne pas reprendre la route, restez dormir : [[Votre formule dîner et nuit|la formule dîner, chambre et petit-déjeuner tardif à 290 € pour deux]].",
      SIGNATURE,
    ],
    cta: { label: 'Je réserve ma table', url: BOOK },
  };
}

function blackFriday(lastDay: string): EmailModel {
  return {
    subject: '[[Durée de l’offre|4 jours]] seulement : [[Remise|-20 %]] sur nos bons cadeaux',
    preheader: `Jusqu'au ${d(lastDay)} à minuit, de quoi offrir un séjour à Noël.`,
    body: [
      'Bonjour {{firstname}},',
      `Pour le Black Friday, nos bons cadeaux sont à [[Remise|-20 %]] jusqu'au ${d(lastDay)} à minuit.`,
      'Une nuit, un dîner ou un soin : [[Vos bons cadeaux|une nuit pour deux avec petit-déjeuner, un dîner au restaurant, un soin au spa]].',
      "Le bon arrive par e-mail, prêt à imprimer ou à transférer. Il est valable [[Durée de validité|12 mois]] : il ne reste plus qu'à le glisser sous le sapin.",
      SIGNATURE,
    ],
    cta: { label: "J'en profite", url: VOUCHER_SHOP },
  };
}

function lastMinuteGift(christmasEve: string): EmailModel {
  return {
    subject: 'Un cadeau de dernière minute, reçu en [[Délai de réception|1 minute]]',
    preheader: `Commandez jusqu'au ${d(christmasEve)} à midi : le bon cadeau arrive par e-mail.`,
    body: [
      'Bonjour {{firstname}},',
      'Encore un cadeau à trouver ? Offrez [[Vos bons cadeaux|une nuit, un dîner ou un soin]] à {{facility_name}}.',
      'Vous payez en ligne, le bon arrive aussitôt par e-mail, prêt à imprimer ou à transférer. Pas de livraison, pas de file d’attente.',
      `Commandes possibles jusqu'au ${d(christmasEve)} à midi.`,
      SIGNATURE,
    ],
    cta: { label: 'Offrir un bon cadeau', url: VOUCHER_SHOP },
  };
}

// ── Calendrier : novembre-décembre 2026, puis toute l'année 2027 ────────────

export const CALENDAR: CalendarMonth[] = [
  {
    id: 'novembre-2026',
    chip: 'Nov. 2026',
    title: 'Novembre 2026',
    keyDates: [
      { start: '2026-11-01', label: 'Toussaint (férié)' },
      { start: '2026-11-11', label: 'Armistice (férié)' },
      { start: '2026-11-19', label: 'Beaujolais nouveau' },
      { start: '2026-11-27', label: 'Black Friday' },
    ],
    campaigns: [
      {
        id: 'black_friday_voucher-2026',
        code: 'black_friday_voucher',
        send: 'Le {date:2026-11-26} au soir, veille du Black Friday',
        reminder: 'Le {date:2026-11-29} au matin, dernier jour de l’offre',
        endsOn: '2026-11-29',
        email: blackFriday('2026-11-29'),
      },
      {
        id: 'new_year_eve-2026',
        code: 'new_year_eve',
        send: 'Si ce n’est pas encore fait : dès maintenant',
        reminder: 'Mi-novembre, aux clients qui n’ont pas réservé',
        endsOn: '2026-12-31',
        email: newYearEve('2026-12-24', '2026-12-31'),
      },
    ],
  },
  {
    id: 'decembre-2026',
    chip: 'Déc. 2026',
    title: 'Décembre 2026',
    keyDates: [
      { start: '2026-12-19', end: '2027-01-04', school: true, label: 'Vacances de Noël', note: 'toutes zones' },
      { start: '2026-12-25', label: 'Noël (férié)' },
      { start: '2026-12-31', label: 'Saint-Sylvestre' },
    ],
    campaigns: [
      {
        id: 'last_minute_gift-2026',
        code: 'last_minute_gift',
        send: 'Du {date:2026-12-15} au {date:2026-12-23}',
        reminder: 'Le {date:2026-12-22}, aux clients qui n’ont pas ouvert',
        endsOn: '2026-12-24',
        email: lastMinuteGift('2026-12-24'),
      },
    ],
  },
  {
    id: 'janvier',
    chip: 'Janv.',
    title: 'Janvier 2027',
    keyDates: [
      { start: '2027-01-01', label: "Jour de l'an (férié)" },
      { start: '2027-01-04', label: 'Rentrée des classes' },
      { start: '2027-01-06', label: 'Épiphanie' },
      { start: '2027-01-13', label: "Soldes d'hiver", note: 'date nationale à confirmer' },
    ],
    campaigns: [
      {
        id: 'early_booking_summer-2027',
        code: 'early_booking_summer',
        send: 'La semaine du {date:2027-01-11}',
        reminder: 'Début février, aux clients qui n’ont pas cliqué',
        endsOn: '2027-03-31',
        email: {
          subject: '{{firstname}}, votre été commence maintenant',
          preheader: 'Les meilleures chambres et le meilleur prix, en avant-première sur notre site.',
          body: [
            'Bonjour {{firstname}},',
            "L'été paraît loin. C'est pourtant maintenant que les plus belles chambres partent, et vous avez séjourné chez nous un été : nous voulions vous prévenir en premier.",
            "En réservant sur notre site avant le [[Date limite|31 mars]], vous profitez de [[Avantage réservation directe|10 % de remise]] et de l'annulation gratuite jusqu'à [[Délai d'annulation|7 jours avant l'arrivée]].",
            SIGNATURE,
          ],
          cta: { label: 'Je réserve mon été', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'fevrier',
    chip: 'Févr.',
    title: 'Février 2027',
    keyDates: [
      { start: '2027-02-06', end: '2027-02-22', school: true, label: "Vacances d'hiver", note: 'zone C (Paris, Toulouse, Montpellier)' },
      { start: '2027-02-13', end: '2027-03-01', school: true, label: "Vacances d'hiver", note: 'zone A (Lyon, Bordeaux, Grenoble)' },
      { start: '2027-02-14', label: 'Saint-Valentin' },
      { start: '2027-02-20', end: '2027-03-08', school: true, label: "Vacances d'hiver", note: 'zone B (Marseille, Lille, Nantes)' },
    ],
    campaigns: [
      {
        id: 'valentines_day-2027',
        code: 'valentines_day',
        send: 'Le {date:2027-01-15}, quatre semaines avant',
        reminder: 'Le {date:2027-02-07}, une semaine avant',
        endsOn: '2027-02-14',
        email: {
          subject: 'Une nuit rien que pour vous deux',
          preheader: "Dîner, chambre et petit-déjeuner tardif : on s'occupe de tout.",
          body: [
            'Bonjour {{firstname}},',
            "Cette année, la Saint-Valentin tombe le {date:2027-02-14}. L'occasion d'en faire un vrai week-end à deux.",
            "Nous avons préparé [[Nom de l'offre|l'escapade à deux]] : une chambre [[Catégorie de chambre|avec vue]], [[Ce qui est inclus|le dîner aux chandelles et une coupe de champagne]], et le petit-déjeuner servi jusqu'à [[Heure de fin du petit-déjeuner|11 h]].",
            'Les chambres partent vite ce week-end-là : réservez tôt pour avoir le choix.',
            SIGNATURE,
          ],
          cta: { label: 'Je réserve notre escapade', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'mars',
    chip: 'Mars',
    title: 'Mars 2027',
    keyDates: [
      { start: '2027-03-07', label: 'Fête des grands-mères' },
      { start: '2027-03-28', label: "Pâques et passage à l'heure d'été" },
      { start: '2027-03-29', label: 'Lundi de Pâques (férié)' },
    ],
    campaigns: [
      {
        id: 'spring_holidays-2027',
        code: 'spring_holidays',
        send: 'Le {date:2027-03-01}, un mois avant la première zone',
        reminder: 'Mi-mars, aux familles qui n’ont pas réservé',
        endsOn: '2027-05-03',
        email: {
          subject: 'Vacances de printemps : on vous garde une chambre familiale ?',
          preheader: 'Les dates de votre zone et nos chambres pour toute la famille.',
          body: [
            'Bonjour {{firstname}},',
            'Les vacances de printemps approchent. Voici les dates, de la fin des cours à la reprise, selon votre zone :',
            [
              'Zone C (Paris, Toulouse, Montpellier) : du {date:2027-04-03} au {date:2027-04-19}',
              'Zone A (Lyon, Bordeaux, Grenoble) : du {date:2027-04-10} au {date:2027-04-26}',
              'Zone B (Marseille, Lille, Nantes) : du {date:2027-04-17} au {date:2027-05-03}',
            ],
            'Pour les familles, nous proposons [[Ce que vous offrez aux familles|des chambres communicantes, le petit-déjeuner offert aux moins de 12 ans et le prêt de vélos]].',
            'Les chambres familiales partent en premier : dites-nous vite vos dates.',
            SIGNATURE,
          ],
          cta: { label: 'Voir les disponibilités', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'avril',
    chip: 'Avr.',
    title: 'Avril 2027',
    keyDates: [
      { start: '2027-04-03', end: '2027-04-19', school: true, label: 'Vacances de printemps', note: 'zone C' },
      { start: '2027-04-10', end: '2027-04-26', school: true, label: 'Vacances de printemps', note: 'zone A' },
      { start: '2027-04-17', end: '2027-05-03', school: true, label: 'Vacances de printemps', note: 'zone B' },
    ],
    campaigns: [
      {
        id: 'ascension_bridge-2027',
        code: 'ascension_bridge',
        send: 'Le {date:2027-03-15}, sept semaines avant',
        reminder: 'Le {date:2027-04-15}, aux clients qui n’ont pas réservé',
        endsOn: '2027-05-09',
        email: {
          subject: "Pont de l'Ascension : quatre jours rien que pour vous ?",
          preheader: "Du {date:2027-05-06} au {date:2027-05-09}, sans école le {date:2027-05-07}.",
          body: [
            'Bonjour {{firstname}},',
            "Cette année, l'Ascension tombe le {date:2027-05-06} et les écoles ferment le {date:2027-05-07} : quatre jours de liberté, jusqu'au {date:2027-05-09}.",
            'Profitez-en pour [[Votre proposition|découvrir la région à vélo et dîner en terrasse]]. Pour ce pont, [[Avantage|la troisième nuit est offerte]] en réservant sur notre site.',
            'Les ponts de mai se remplissent vite : on vous garde une chambre ?',
            SIGNATURE,
          ],
          cta: { label: 'Je réserve le pont', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'mai',
    chip: 'Mai',
    title: 'Mai 2027',
    keyDates: [
      { start: '2027-05-01', label: 'Fête du Travail (férié)', note: 'pas de pont' },
      { start: '2027-05-06', end: '2027-05-09', label: "Pont de l'Ascension", note: 'pas d’école le {date:2027-05-07}' },
      { start: '2027-05-08', label: 'Victoire 1945 (férié)' },
      { start: '2027-05-17', label: 'Lundi de Pentecôte (férié)' },
      { start: '2027-05-30', label: 'Fête des mères' },
    ],
    campaigns: [
      {
        id: 'mothers_day_voucher-2027',
        code: 'mothers_day_voucher',
        send: 'Le {date:2027-05-01}, quatre semaines avant',
        reminder: 'Le {date:2027-05-20}, aux clients qui n’ont pas commandé',
        endsOn: '2027-05-30',
        email: {
          subject: "Le cadeau qu'elle n'oubliera pas",
          preheader: 'Un séjour, un dîner ou un soin, à offrir en bon cadeau envoyé par e-mail.',
          body: [
            'Bonjour {{firstname}},',
            'La Fête des mères, c’est le {date:2027-05-30}. Et si, cette année, vous lui offriez un moment rien qu’à elle ?',
            'Nos bons cadeaux : [[Vos bons cadeaux|une nuit avec petit-déjeuner, un dîner pour deux ou un soin au spa]]. Vous choisissez, vous payez en ligne, et le bon arrive par e-mail, prêt à imprimer ou à transférer.',
            'Valable [[Durée de validité|12 mois]], il lui laisse le temps de choisir sa date.',
            SIGNATURE,
          ],
          cta: { label: 'Offrir un bon cadeau', url: VOUCHER_SHOP },
        },
      },
    ],
  },
  {
    id: 'juin',
    chip: 'Juin',
    title: 'Juin 2027',
    keyDates: [
      { start: '2027-06-20', label: 'Fête des pères' },
      { start: '2027-06-21', label: 'Fête de la musique' },
    ],
    campaigns: [
      {
        id: 'last_rooms_july-2027',
        code: 'last_rooms_july',
        send: 'Le {date:2027-06-01}, un mois avant les vacances',
        reminder: 'Mi-juin, aux clients qui n’ont pas cliqué',
        endsOn: '2027-07-31',
        email: {
          subject: 'Il nous reste quelques chambres cet été',
          preheader: 'Juillet approche : les dernières disponibilités, avant tout le monde.',
          body: [
            'Bonjour {{firstname}},',
            "L'été se remplit, mais il nous reste quelques chambres en juillet, notamment [[Dates encore libres|du 5 au 15 juillet]].",
            'Vous avez déjà séjourné chez nous : nous vous les proposons avant de les ouvrir à tous. [[Avantage|Le petit-déjeuner est offert]] si vous réservez sur notre site.',
            'Les vacances d’été commencent le {date:2027-07-03}.',
            SIGNATURE,
          ],
          cta: { label: 'Voir les dernières chambres', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'juillet',
    chip: 'Juil.',
    title: 'Juillet 2027',
    keyDates: [
      { start: '2027-07-03', end: '2027-09-02', school: true, label: "Vacances d'été", note: 'toutes zones' },
      { start: '2027-07-14', label: 'Fête nationale (férié)' },
    ],
    campaigns: [
      {
        id: 'late_season-2027',
        code: 'late_season',
        send: 'Le {date:2027-07-15}',
        reminder: 'Fin août, aux clients qui n’ont pas réservé',
        endsOn: '2027-09-30',
        email: {
          subject: 'Septembre : le plus beau mois pour venir',
          preheader: 'Le soleil est encore là, la foule est partie.',
          body: [
            'Bonjour {{firstname}},',
            'En septembre, tout change : les terrasses retrouvent leur calme, les visites se font sans attendre, et la lumière reste douce.',
            "C'est le moment préféré de nos habitués. Pour l'arrière-saison, nous proposons [[Votre offre|la troisième nuit offerte du dimanche au jeudi]], [[Période de l'offre|tout le mois de septembre]].",
            SIGNATURE,
          ],
          cta: { label: 'Je réserve en septembre', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'aout',
    chip: 'Août',
    title: 'Août 2027',
    keyDates: [
      { start: '2027-08-15', label: 'Assomption (férié)' },
    ],
    campaigns: [
      {
        id: 'toussaint_holidays-2027',
        code: 'toussaint_holidays',
        send: 'La semaine du {date:2027-08-23}, avant la rentrée',
        reminder: 'Fin septembre, aux familles qui n’ont pas réservé',
        endsOn: '2027-11-08',
        email: {
          subject: 'Vacances de la Toussaint : vos dates sont fixées ?',
          preheader: 'Deux semaines pour toutes les zones, du {date:2027-10-23} au {date:2027-11-08}.',
          body: [
            'Bonjour {{firstname}},',
            'Cette année, les vacances de la Toussaint durent deux semaines pour toutes les zones : du {date:2027-10-23} au {date:2027-11-08}.',
            'Halloween tombe en plein milieu, le {date:2027-10-31}. Pour les enfants, nous préparons [[Votre programme|une chasse aux bonbons dans le jardin et un goûter]].',
            'Les chambres familiales partent toujours en premier : réservez dès maintenant.',
            SIGNATURE,
          ],
          cta: { label: 'Réserver la Toussaint', url: BOOK },
        },
      },
    ],
  },
  {
    id: 'septembre',
    chip: 'Sept.',
    title: 'Septembre 2027',
    keyDates: [
      { start: '2027-09-02', label: 'Rentrée des classes' },
      { start: '2027-09-18', end: '2027-09-19', label: 'Journées européennes du patrimoine', note: 'à confirmer' },
    ],
    campaigns: [
      {
        id: 'corporate_year_end-2027',
        code: 'corporate_year_end',
        send: 'Le {date:2027-09-06}, juste après la rentrée',
        reminder: 'Début octobre, aux entreprises qui n’ont pas répondu',
        endsOn: '2027-12-17',
        email: {
          subject: 'Votre soirée de fin d’année, organisée sans stress',
          preheader: 'Repas, séminaire, chambres pour l’équipe : un seul interlocuteur.',
          body: [
            'Bonjour {{firstname}},',
            'La fin d’année arrive plus vite qu’on ne le croit, et les meilleures dates de décembre se réservent dès la rentrée.',
            'À {{facility_name}}, nous organisons [[Ce que vous proposez|votre repas de fin d’année, une demi-journée de séminaire et les chambres pour l’équipe]].',
            'Donnez-nous votre date et votre nombre de participants : vous recevez un devis sous [[Délai de réponse|48 h]].',
            SIGNATURE,
          ],
          cta: { label: 'Demander un devis', url: '[[Lien de votre demande de devis|https://votre-hotel.fr/seminaires]]' },
        },
      },
    ],
  },
  {
    id: 'octobre',
    chip: 'Oct.',
    title: 'Octobre 2027',
    keyDates: [
      { start: '2027-10-23', end: '2027-11-08', school: true, label: 'Vacances de la Toussaint', note: 'toutes zones' },
      { start: '2027-10-31', label: "Halloween et passage à l'heure d'hiver" },
    ],
    campaigns: [
      {
        id: 'new_year_eve-2027',
        code: 'new_year_eve',
        send: 'Le {date:2027-10-15}',
        reminder: 'Le {date:2027-11-15}, aux clients qui n’ont pas réservé',
        endsOn: '2027-12-31',
        email: newYearEve('2027-12-24', '2027-12-31'),
      },
    ],
  },
  {
    id: 'novembre',
    chip: 'Nov.',
    title: 'Novembre 2027',
    keyDates: [
      { start: '2027-11-01', label: 'Toussaint (férié)' },
      { start: '2027-11-11', label: 'Armistice (férié)', note: 'pont possible le {date:2027-11-12}' },
      { start: '2027-11-18', label: 'Beaujolais nouveau' },
      { start: '2027-11-26', label: 'Black Friday' },
    ],
    campaigns: [
      {
        id: 'black_friday_voucher-2027',
        code: 'black_friday_voucher',
        send: 'Le {date:2027-11-25} au soir, veille du Black Friday',
        reminder: 'Le {date:2027-11-28} au matin, dernier jour de l’offre',
        endsOn: '2027-11-28',
        email: blackFriday('2027-11-28'),
      },
    ],
  },
  {
    id: 'decembre',
    chip: 'Déc.',
    title: 'Décembre 2027',
    keyDates: [
      { start: '2027-12-18', end: '2028-01-03', school: true, label: 'Vacances de Noël', note: 'toutes zones' },
      { start: '2027-12-25', label: 'Noël (férié)' },
      { start: '2027-12-31', label: 'Saint-Sylvestre' },
    ],
    campaigns: [
      {
        id: 'last_minute_gift-2027',
        code: 'last_minute_gift',
        send: 'Du {date:2027-12-15} au {date:2027-12-23}',
        reminder: 'Le {date:2027-12-22}, aux clients qui n’ont pas ouvert',
        endsOn: '2027-12-24',
        email: lastMinuteGift('2027-12-24'),
      },
    ],
  },
];

/** Toutes les campagnes, dans l'ordre du calendrier. */
export const CAMPAIGNS: Campaign[] = CALENDAR.flatMap((month) => month.campaigns);

/**
 * Campagne à montrer sur la page « Activer » d'un temps fort : la première qui n'est
 * pas terminée à `today` (AAAA-MM-JJ), sinon la dernière du calendrier.
 */
export function currentCampaign(code: TempsFortCode, today: string): Campaign {
  const all = CAMPAIGNS.filter((campaign) => campaign.code === code);
  return all.find((campaign) => campaign.endsOn >= today) ?? all[all.length - 1];
}

export function tempsFortBySlug(slug: string): TempsFortInfo | undefined {
  return Object.values(TEMPS_FORTS).find((info) => info.slug === slug);
}

/** Lien profond de l'app : ouvre l'assistant e-mails IA sur ce modèle (connexion si besoin). */
export function activateInAppUrl(code: TempsFortCode): string {
  return `https://app.trigger-flow.com/email-templates/ai/new?type=${code}`;
}

/**
 * Démo depuis le calendrier. Ces UTM décrivent une visite directe ; ceux de la visite
 * (le flyer) les remplacent au clic (DemoClickTracker), `utm_content` reste le temps fort.
 */
export function calendarDemoUrl(content: string): string {
  return `${brand.demoUrl}?utm_source=site&utm_medium=calendrier-marketing&utm_campaign=calendrier-marketing&utm_content=${content}`;
}

/** Valeurs de la charte d'exemple (aperçu des pages « Activer »). */
export const EXAMPLE_VARIABLES: Record<string, string> = {
  firstname: 'Camille',
  facility_name: 'Hôtel des Tilleuls',
  booking_page_url: 'https://hotel-des-tilleuls.fr/reserver',
  website_url: 'https://hotel-des-tilleuls.fr',
  facility_address: '12 rue des Tilleuls',
  facility_zip_code: '69002',
  facility_city: 'Lyon',
  facility_phone: '04 78 00 00 00',
  facility_email: 'contact@hotel-des-tilleuls.fr',
  social_instagram: 'https://www.instagram.com/',
  social_facebook: 'https://www.facebook.com/',
  social_linkedin: 'https://www.linkedin.com/',
  social_youtube: 'https://www.youtube.com/',
  social_tripadvisor: 'https://www.tripadvisor.fr/',
  social_tiktok: 'https://www.tiktok.com/',
};

/** Bloc « Toute l'année, en automatique ». */
export const ALL_YEAR = [
  { id: 'pre-arrival', when: 'J-7', title: 'Préparer le séjour', text: 'Petit-déjeuner, surclassement, spa : proposés une semaine avant l’arrivée, quand le client prépare son séjour.' },
  { id: 'practical-info', when: 'J-1', title: 'Infos pratiques', text: 'Accès, parking, heure d’arrivée, code Wi-Fi : la veille, tout ce qui évite un appel à la réception.' },
  { id: 'during-stay', when: 'Pendant le séjour', title: 'Pendant le séjour', text: 'Une table au restaurant, une activité, un départ tardif : proposés au bon moment, sur place.' },
  { id: 'review', when: 'J+1', title: 'Merci et avis Google', text: 'Le lendemain du départ, un merci personnel et un lien direct vers votre fiche Google.' },
  { id: 'birthday', when: 'Anniversaire', title: 'Anniversaire du client', text: 'Un mot et une attention le jour de son anniversaire, pour lui donner envie de revenir le fêter chez vous.' },
  { id: 'win-back', when: '12 mois sans séjour', title: 'Réactivation', text: 'Les clients qui ne sont pas revenus depuis un an reçoivent une invitation à revenir, sans passer par une OTA.' },
] as const;
