export interface CaseStudyResult {
  metric: string;
  label: string;
}

export interface CaseStudySection {
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  type: string;
  location: string;
  contactName: string;
  contactRole: string;
  initials: string;
  pms: string;
  quote: string;
  image: string;
  objectives: string[];
  highlights: string[];
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'edgar-hotel-spa',
    name: 'Edgar Hotel & Spa ****',
    type: 'Hôtel indépendant',
    location: 'Saint-Brieuc',
    contactName: 'Maxime Jullien',
    contactRole: 'Directeur',
    initials: 'MJ',
    pms: 'Thaïs PMS',
    quote: "Après avoir testé plusieurs solutions CRM, nous avons trouvé avec TriggerFlow l'outil qui correspond vraiment à nos besoins.",
    image: '/images/case-studies/edgar-hotel-spa.jpg',
    objectives: ['Fidélisation', 'Upsell', 'Automatisation'],
    highlights: [
      'Fidélisation client et ventes additionnelles',
      'Formulaires conditionnels personnalisés',
      'WhatsApp mid-stay & questionnaire satisfaction',
    ],
    sections: [
      {
        question: 'Pourquoi avoir choisi TriggerFlow ?',
        answer:
          "Je travaillais avec un autre CRM quand j'ai découvert TriggerFlow et son potentiel.\n\nOn a fait partie des 1ers utilisateurs de l'outil, ce qui nous a permis de partager notre avis sur la solution. Par exemple, on a pu faire des retours pour que ça nous paraisse plus simple de faire des flows (automatisations). C'est comme ça que ça a commencé !",
      },
      {
        question: 'Que pensez-vous de la solution et de ses possibilités ?',
        answer:
          "En me plongeant dedans, j'ai découvert un outil avec des possibilités de dingue, administrable 100% par l'hôtelier.\n\nOn n'est pas limités, on a complètement la main, c'est complètement ouvert.\n\nSi on a envie d'envoyer des Flows personnalisés, on peut le faire : par exemple des confirmations de réservation ultra-personnalisées (par rapport au type de tarif, type de client, type de chambre).\n\nC'est un outil super fort qui me permet de faire des ventes (ex : tables au restaurant) et donc de faire gagner beaucoup de temps à l'équipe.\n\nC'est aussi une sécurité parce qu'il y a une trace de tous les échanges et donc cela permet de calmer le jeu en cas de client mécontent.",
      },
      {
        question: "Quels sont les points forts d'après vous ?",
        answer:
          "Les formulaires peuvent se personnaliser en fonction des réponses aux questions. Selon les réponses que le client donne, on va pouvoir ouvrir d'autres questions, c'est vraiment un point fort. Par exemple : \"Vous venez à Saint-Brieuc pour loisir ou pour affaires ?\" et la suite du formulaire se personnalise en direct, en fonction de la réponse.\n\nLa force en mid stay, c'est les messages WhatsApp. Les clients viennent d'arriver et ils reçoivent un petit message WhatsApp personnalisé.\n\nPost stay, il y a le questionnaire de satisfaction. On peut tout paramétrer selon si le client est satisfait ou pas (ex : s'il met 5/5, certaines questions ne s'affichent pas).\n\nAutre point important : la très bonne connectivité avec notre PMS, on peut récupérer les données du Cardex et on peut tout filtrer comme on veut.",
      },
      {
        question: 'Une conclusion ?',
        answer:
          "L'équipe est adorable, répond toujours présent. L'outil est génial. Ils ont tout compris à ce qu'on voulait aujourd'hui sur le marché.",
      },
    ],
  },
  {
    slug: 'causse-comtal',
    name: 'Causse Comtal',
    type: 'Hôtel Restaurant & Spa — 100 chambres',
    location: 'Montrozier, près de Rodez',
    contactName: 'Baptiste Legout',
    contactRole: "Directeur de l'hôtel",
    initials: 'BL',
    pms: 'Thaïs PMS',
    quote: "Je suis vraiment scotché par l'outil. Les possibilités sont pratiquement infinies.",
    image: '/images/case-studies/causse-comtal.jpg',
    objectives: ['Automatisation', 'Upsell', 'Fidélisation'],
    highlights: [
      'Parcours client complet : pré-stay, mid-stay, post-stay',
      'Centralisation email marketing + transactionnel',
      "Mise en place en une semaine d'un système digne d'une grande chaîne",
    ],
    sections: [
      {
        question: 'Pourquoi avoir voulu rajouter TriggerFlow à votre écosystème digital ?',
        answer:
          "L'idée de rajouter TriggerFlow à notre écosystème vient à l'origine d'une discussion avec les équipes de Thaïs, notre PMS. Thaïs venait de paramétrer la connectivité avec TriggerFlow, et je leur remontais justement l'importance pour nous de limiter le nombre d'outils utilisés dans l'établissement en misant sur une plus grande intégration (bref, que tout communique et que tout soit accessible via un minimum d'interfaces). À ce niveau, Thaïs a poussé la logique jusqu'à intégrer directement TriggerFlow, avec un bouton dédié, dans le PMS, dans son menu de navigation. Bref, ils me proposaient de centraliser encore plus de choses via le PMS, ce que je souhaitais.\n\nAurélien (de Thaïs) m'a expliqué que TriggerFlow me permettrait deux choses : gérer mes envois marketing en récupérant automatiquement ma base client dans Thaïs, et gérer mes e-mails automatiques, de manière plus poussée et personnalisée que ce qui était possible avec l'outil intégré au PMS.",
      },
      {
        question: 'Pourquoi TriggerFlow répondait à vos besoins ?',
        answer:
          "Jusqu'à présent, pour nos envois d'e-mail, nous utilisions deux solutions : Thaïs pour le transactionnel, et Brevo pour le marketing. Le souci avec Brevo, c'était de devoir à chaque fois réimporter nos bases de données. Cela créait une certaine lourdeur, et du coup, nous ne l'exploitions pas assez.\n\nTriggerFlow permet de tout gérer au même endroit. Mais même plus encore. Le logiciel intègre tout ce qu'on peut attendre d'un CRM puissant : outil de segmentation, cardex, pages de ventes, formulaires, et « flow », c'est-à-dire un éditeur de scénarios pour gérer les envois. Le tout directement connecté au PMS.\n\nUne fois compris la puissance de l'outil, il était évident qu'il nous ferait gagner en efficacité.",
      },
      {
        question: "Comment s'est passé le lancement ?",
        answer:
          "En plusieurs temps. L'outil a comme avantage d'être incroyablement personnalisable. La prise en main est assez complexe mais les créateurs de TriggerFlow sont de purs développeurs et ont ouvert de très nombreuses possibilités.\n\nCet été, nous avons commencé par tester la partie d'envoi marketing. On a pu assez facilement lancer deux campagnes. Puis j'ai décidé d'attendre l'automne pour travailler sur la partie transactionnelle. Notre objectif était de vraiment repenser l'intégralité du parcours client.\n\nLors du paramétrage, j'ai eu la chance d'avoir une hotline pratiquement dédiée. Mounir et Soufiane ont été extrêmement disponibles et très réactifs.\n\nAujourd'hui, mes clients reçoivent un e-mail personnalisé qui tient compte de leur réservation. Ils n'ont pas de petit déjeuner ? On leur propose d'en réserver un. Pas de repas ? Idem. Leur réservation comprend la demi-pension ? Ils peuvent, via un formulaire, indiquer à quelle heure ils veulent manger. Si un soin au spa est compris, un questionnaire leur est proposé pour indiquer leurs disponibilités et préférences.\n\nTrois jours avant l'arrivée, ils reçoivent à nouveau un e-mail, avec un questionnaire d'enregistrement. Ils peuvent renseigner toutes les informations obligatoires en avance – qui s'inscrivent automatiquement sur leur fiche client dans le PMS.\n\nAprès leur départ, ils reçoivent un e-mail de remerciement avec un formulaire de satisfaction. S'ils sont satisfaits, nous les invitons à laisser un commentaire sur les réseaux. S'ils ne le sont pas, une alerte est envoyée directement à la direction.",
      },
      {
        question: 'Que pensez-vous de la solution et de ses possibilités ?',
        answer:
          "Je suis vraiment scotché par l'outil. Les possibilités sont pratiquement infinies. À l'inverse des autres solutions CRM, il n'est plus nécessaire de raisonner à partir de ce que l'outil peut faire et de s'adapter à lui. Avec TriggerFlow, on part du besoin, on dessine le scénario qu'on souhaite mettre en place… et ensuite, on le paramètre sur l'outil, sans se retrouver bloqué.\n\nNous avons pu, en une semaine, mettre en place une solution d'e-mails automatisés qu'on retrouve normalement dans les très grosses chaînes d'hôtellerie, et sur lesquelles des équipes complètes passent des mois pour que cela soit fonctionnel. C'est vraiment incroyable, pour peu qu'on prenne le temps de réfléchir à ce qu'on veut.",
      },
      {
        question: "Des remarques sur l'équipe ? Des envies pour la suite ?",
        answer:
          "Merci naturellement à Mounir et Soufiane pour leur disponibilité, leur aide, et aussi leur travail, car pour développer un outil comme cela, avec une petite équipe, vraiment bravo.\n\nÀ l'hôtel, les équipes adorent les possibilités qui s'offrent à nous. L'outil est incroyable. On va essayer d'exploiter pleinement la solution, car on est encore très loin d'en avoir fait le tour !",
      },
    ],
  },
  {
    slug: 'le-vieux-pressoir',
    name: 'Le Vieux Pressoir',
    type: 'Gîte hôtelier — 4 studios & 2 appartements',
    location: 'Dieffenthal, Alsace',
    contactName: 'Guillaume Broutin',
    contactRole: 'Propriétaire',
    initials: 'GB',
    pms: 'Thaïs PMS',
    quote: "Je gagne énormément de temps, tout en sachant que la relation à mes clients est assurée.",
    image: '/images/case-studies/le-vieux-pressoir.jpg',
    objectives: ['Automatisation', 'Fidélisation'],
    highlights: [
      'Messages ultra-personnalisés par canal de réservation',
      'Automatisation complète, fonctionne en autonomie',
      'Suivi des réactions clients en temps réel',
    ],
    sections: [
      {
        question: 'Pourquoi avoir choisi TriggerFlow ?',
        answer:
          "Avec mon PMS, je n'avais pas une assez grande flexibilité pour personnaliser mes messages en fonction des canaux de réservation, des typologies de clients, des groupes, s'ils ont un bon cadeau…\n\nJe me commercialise sur beaucoup de plateformes, donc j'ai des messages spécifiques à faire passer à mes clients en fonction des sources de réservation.\n\nIl y a 6 mois, Alicia de Thaïs m'a parlé d'un nouveau partenaire, avec les fonctionnalités que j'attendais, dans notre budget. J'ai été mis en relation avec l'équipe TriggerFlow, le courant est bien passé, je me suis mis dedans et voilà comment ça a commencé !",
      },
      {
        question: "Après quelques mois de test, que pensez-vous de l'outil ?",
        answer:
          "J'en suis super content. On peut automatiser des messages très personnalisés, anticiper toutes les situations, pour que le bon client reçoive le message qu'on veut, au meilleur moment.\n\nL'outil est super puissant et flexible. On a pu prendre en compte toutes les configurations d'arrivées et de départs possibles : la source de réservation, le type de clients, à quelle heure ils arrivent, le type d'hébergement réservé…\n\nAu début, il y a un peu de travail pour tout mettre en place. Et maintenant, ça tourne tout seul, je n'ai plus besoin de m'en occuper et je gagne énormément de temps, tout en sachant que la relation à mes clients est assurée.\n\nEn plus, on peut suivre comment les clients réagissent. Avec un seul outil, je peux aller très loin.",
      },
      {
        question: "Et l'accompagnement ? Est-il à la hauteur de l'outil ?",
        answer:
          "Il y a une super réactivité des équipes, on note vraiment qu'il n'y a pas que l'outil, il y a un service.\n\nIl y a les hommes derrière qui font le boulot, qui sont là pour nous accompagner.\n\nJ'ai notamment pu échanger avec Soufiane pour faire remonter mes retours au fur et à mesure et ils ont été pris en compte ou sont en train d'être pris en compte.\n\nD'ailleurs, il y a régulièrement des nouveautés. Je n'ai pas encore testé toutes les fonctionnalités, par exemple les formulaires qui viennent d'arriver.",
      },
      {
        question: 'En 3 mots, TriggerFlow pour vous c\'est ?',
        answer:
          "Facilité. Gain de temps. Super relationnel — avec nos clients et avec l'équipe TriggerFlow.\n\nPourvu que ça dure.",
      },
    ],
  },
  {
    slug: 'groupe-noemys',
    name: 'Groupe Noemys',
    type: 'Groupe hôtelier — 15 établissements',
    location: 'France (multi-sites)',
    contactName: 'Marie-Liesse Gaubens',
    contactRole: 'Responsable Communication',
    initials: 'MG',
    pms: 'Mister Booking',
    quote: "Ils ne se contentent pas de fournir une solution, ils l'adaptent à notre réalité.",
    image: '/images/case-studies/noemys.jpg',
    objectives: ['Automatisation', 'Fidélisation', 'E-réputation'],
    highlights: [
      'Centralisation e-mailing pour 15 établissements',
      'Personnalisation et traçabilité des échanges clients',
      'Pilotage de la e-réputation et satisfaction',
    ],
    sections: [
      {
        question: 'Pourquoi avoir choisi TriggerFlow ?',
        answer:
          "Le choix de TriggerFlow s'est imposé dans un contexte de restructuration globale où l'optimisation des coûts était une priorité. Nous recherchions une solution offrant un excellent rapport qualité-prix, capable de s'adapter à nos nouvelles contraintes économiques sans sacrifier la performance.\n\nAu-delà de l'outil technique, c'est la qualité de la relation humaine et de l'accompagnement qui a fait pencher la balance.\n\nSur le plan opérationnel, nous faisions face à une saturation des flux d'e-mails manuels ; il devenait indispensable d'automatiser nos processus pour gagner en efficacité tout en gardant une proximité avec nos clients.",
      },
      {
        question: 'À quels objectifs la solution vous permettait-elle de répondre ?',
        answer:
          "L'intégration de TriggerFlow nous permet de répondre à des objectifs stratégiques majeurs :\n\nMarketing et Fidélisation Personnalisée — La solution nous permet de centraliser l'e-mailing pour l'ensemble de nos hôtels, garantissant une cohérence d'image de marque. Grâce à une base de données unifiée, nous pouvons personnaliser les échanges pour chaque client, garder une trace précise de chaque interaction et accompagner le client de la réservation à l'après-séjour.\n\nGestion de la Réputation et Satisfaction — TriggerFlow est un levier essentiel pour notre e-réputation. En automatisant la sollicitation et la gestion des avis clients, nous améliorons la satisfaction globale et réagissons plus rapidement aux retours.\n\nPilotage et Analyse de l'Activité — La solution nous offre une visibilité précieuse pour mesurer les flux de réservation.",
      },
      {
        question: 'Quels sont les points forts de la solution ?',
        answer:
          "En tant que spécialiste de l'hôtellerie, la plateforme offre des atouts stratégiques majeurs :\n\nAutomatisation & Centralisation — Un gain de temps précieux grâce aux mailings automatiques centralisés pour tout le parc hôtelier.\n\nData & Personnalisation — Une récolte de données efficace pour construire une stratégie marketing ultra-personnalisée et performante.",
      },
      {
        question: 'Quelles sont vos perspectives et futurs projets ?',
        answer:
          "Après quelques mois d'utilisation concluants, nous passons à l'étape supérieure :\n\nDéploiement du \"Pre-stay\" — Automatisation des mails avant l'arrivée pour tous nos hôtels afin d'optimiser l'expérience client dès la réservation.\n\nCentralisation des avis — Intégration complète des flux Google et TripAdvisor pour piloter notre e-réputation depuis une interface unique.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllSlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}

export function getAdjacentCaseStudies(slug: string): { prev: CaseStudy | null; next: CaseStudy | null } {
  const index = caseStudies.findIndex((cs) => cs.slug === slug);
  return {
    prev: index > 0 ? caseStudies[index - 1] : null,
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : null,
  };
}
