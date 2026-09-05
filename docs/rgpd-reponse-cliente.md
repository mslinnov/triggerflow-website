# Réponse RGPD à la cliente — kit prêt à envoyer

> Préparé le 4 juin 2026. Deux blocs : (1) l'email à copier-coller, (2) la fiche
> conformité RGPD à joindre en PDF. **Points à confirmer par Mounir** signalés en
> ⚠️ (surtout la partie IA et la liste des pièces réellement jointes).

---

## 1. Email à la cliente

**Objet : Documentation RGPD — Trigger Flow**

Bonjour [Prénom],

Merci pour votre retour.

Vous trouverez ci-dessous notre documentation RGPD. Comme Trigger Flow agit en
qualité de **sous-traitant** au sens de l'article 28 du RGPD pour les données de
vos clients et voyageurs, notre dossier ne se limite pas à une simple politique de
confidentialité : il se compose de trois éléments complémentaires.

1. **Notre Accord de sous-traitance (DPA)** — pièce jointe. C'est le document de
   référence pour votre Délégué à la protection des données : il précise nos
   engagements, les finalités, les sous-traitants ultérieurs, les mesures de
   sécurité et la localisation des données (Union européenne). Il est conçu pour
   être annexé à notre contrat.
2. **Notre fiche de conformité RGPD** — pièce jointe. Une synthèse d'une page :
   référent à la protection des données, registre des traitements, hébergement,
   sécurité et fonctionnalités d'intelligence artificielle.
3. **Notre politique de confidentialité**, qui couvre les données dont nous sommes
   responsables (votre compte, la facturation, le support) :
   https://www.trigger-flow.com/fr/politique-confidentialite

Si votre Délégué à la protection des données souhaite échanger directement ou
recevoir des éléments complémentaires (par exemple un questionnaire fournisseur à
compléter), il peut nous écrire à **dpo@trigger-flow.com** : nous y répondons
volontiers et rapidement.

Je reste à votre disposition pour la suite, et dans l'attente de la validation des
devis par votre direction.

Belle journée à vous,

Mounir LAKHFIF
Trigger Flow (Utelys SAS)
dpo@trigger-flow.com

---

## 2. Fiche de conformité RGPD (à mettre en PDF et joindre)

### Trigger Flow — Fiche de conformité RGPD

*Sous-traitant au sens de l'article 28 du RGPD — version du 4 juin 2026*

**Éditeur de la solution**
- Société : Utelys SAS (capital 24 000 €)
- RCS : Toulouse 842 608 671
- Siège : 13 rue Saint-Ursule, 31000 Toulouse, France
- Représentant légal : Mounir LAKHFIF, Président

**Rôle dans le traitement**
Pour les données des clients, prospects et voyageurs de l'établissement hôtelier,
Trigger Flow agit en qualité de **sous-traitant**. L'établissement reste
**responsable de traitement**. Les modalités sont fixées dans l'Accord de
sous-traitance (DPA) conforme à l'article 28, fourni avec le contrat.

**Référent à la protection des données**
- Contact : **dpo@trigger-flow.com**

**Registre des traitements (article 30)**
Utelys tient un registre des activités de traitement, en qualité de responsable de
traitement comme de sous-traitant. Il est tenu à disposition de l'autorité de
contrôle et peut être communiqué au client pour les traitements réalisés pour son
compte.

**Hébergement et localisation des données**
- Infrastructure hébergée au sein de l'**Union européenne** (DigitalOcean).

**Sous-traitants ultérieurs**

| Catégorie | Prestataire | Localisation |
|---|---|---|
| Hébergement infrastructure | DigitalOcean | Union européenne |
| Envoi d'emails | Mailgun | Union européenne |
| Envoi de SMS | Twilio, Gateway API | Union européenne / international |
| Paiement par carte | Stripe | Union européenne (Irlande) |
| Prélèvements SEPA | GoCardless | Union européenne / Royaume-Uni |
| Mesure d'audience | Google Analytics | États-Unis |
| Assistance IA (rédaction, résumé, traduction) | Anthropic | États-Unis |

**Transferts hors UE**
Lorsqu'un transfert hors Union européenne est nécessaire, des garanties appropriées
sont mises en œuvre : Clauses Contractuelles Types de la Commission européenne,
décisions d'adéquation, et mesures complémentaires (chiffrement, contrôles d'accès).

**Mesures de sécurité techniques et organisationnelles**
- Chiffrement des communications (TLS 1.2 minimum)
- Authentification renforcée des accès administrateur
- Cloisonnement des environnements (production / préproduction)
- Journalisation des accès et des opérations sensibles
- Sauvegardes régulières et tests de restauration
- Engagement de confidentialité des collaborateurs
- Notification des violations de données conformément à l'article 33 du RGPD

**Droits des personnes concernées**
Trigger Flow assiste le responsable de traitement pour répondre aux demandes
d'exercice de droits (accès, rectification, effacement, limitation, opposition,
portabilité), dans les conditions prévues par le DPA.

**Durées de conservation**
Les données traitées pour le compte du client sont conservées conformément aux
instructions du client et au DPA, puis supprimées ou restituées en fin de contrat.

**Fonctionnalités d'intelligence artificielle**
- **Fonctions concernées** : aide à la rédaction de messages, résumé et analyse de
  conversations, traduction automatique.
- **Données transmises au modèle** : principe de minimisation — les données sont,
  autant que possible, anonymisées ou pseudonymisées avant traitement. Certaines
  données personnelles (notamment le contenu des messages) peuvent néanmoins être
  transmises au modèle, le temps de produire le résultat demandé.
- **Fournisseur** : Anthropic. Le traitement a lieu aux **États-Unis**, encadré par
  les **Clauses Contractuelles Types** de la Commission européenne et un chiffrement
  des communications.
- **Non-entraînement** : le fournisseur **n'utilise pas ces données pour entraîner**
  ses modèles (API sans réutilisation des données soumises).
- **Activation** : fonctionnalités **opt-in**, activées à la main par l'établissement.
- **Décision automatisée** : aucune décision produisant un effet juridique ou
  significatif n'est prise sans intervention humaine (hors champ de l'article 22 du RGPD).

**Contact**
dpo@trigger-flow.com — privacy@trigger-flow.com — Utelys SAS, 13 rue Saint-Ursule,
31000 Toulouse, France
