# Vague 2 de prospection : campagnes des fêtes

E-mail envoyé par Mounir depuis Brevo à la liste « Equip'Hôtel 2026 », après la mise en ligne de
`/fr/campagnes-email-fetes` (TriggerFlow déployé avant le site : les aperçus chargent leurs photos depuis
api.trigger-flow.com).

## Objet

- Principal : **Sept e-mails des fêtes, chacun à sa date**
- Variante A : **Vos campagnes des fêtes, prêtes à envoyer**
- Variante B : **Noël, le 31, les vœux : vos e-mails sont prêts**

## Pré-en-tête

Bons cadeaux, réveillons, dernières chambres, vœux : 7 modèles à copier, ou à créer à vos couleurs.

## Fichiers

- `email.txt` : version texte (à coller dans la version texte de Brevo).
- `email.html` : version HTML (éditeur Brevo « Coller votre code »), direction « Calendrier » validée par Mounir
  le 22/11, à la charte du site (skill `triggerflow-brand`) : papier `#F5F1EA`, IBM Plex Sans (repli Arial, police
  web cachée à Outlook), titre en deux temps, bouton en pilule pêche, aucun « en un clic ». Tableaux et styles en
  ligne, 600 px, une seule image : le logo `https://www.trigger-flow.com/images/logo-email.png`
  (`public/images/logo-email.png`, PNG car Outlook ne lit pas le WebP ; texte de remplacement « TriggerFlow »).
  Le site doit être déployé avant l'envoi, sinon le logo manque.

## Liens suivis

| Lien | `utm_content` |
|------|---------------|
| Bouton « Voir le calendrier des fêtes » | `bouton` |
| Logo | `logo` |
| Chaque campagne de la liste (ouvre son modèle sur la page, ancre `#<code>`) | `calendrier-<code>` |
| Lien de la page dans la version texte | `lien` |
| Démo (`https://app.lemcal.com/@trigger-flow/demo`) | `demo` |

Toutes les adresses de la page sont `https://www.trigger-flow.com/fr/campagnes-email-fetes?utm_source=brevo&utm_medium=email&utm_campaign=vague-2-fetes&utm_content=…`.

Sur la page, les UTM de la visite remplacent ceux des boutons démo (DemoClickTracker) : une démo prise depuis la page
reste attribuée à `vague-2-fetes`.

## Avant l'envoi

- Désinscription et version en ligne : balises Brevo `{{ unsubscribe }}` et `{{ mirror }}` (à vérifier dans l'aperçu
  Brevo, elles doivent devenir des liens).
- Prénom : l'e-mail commence par « Bonjour, » (sous le titre) ; si la liste a un attribut prénom fiable, remplacer par
  `Bonjour {{ contact.PRENOM | default : "" }},` (nom de l'attribut à vérifier dans Brevo).
- Envoi test à soi-même (Gmail et Outlook), clic sur les 3 liens, puis envoi un mardi ou un jeudi matin.
