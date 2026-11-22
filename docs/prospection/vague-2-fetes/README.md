# Vague 2 de prospection : campagnes des fêtes

E-mail envoyé par Mounir depuis Brevo à la liste « Equip'Hôtel 2026 », après la mise en ligne de
`/fr/campagnes-email-fetes` (TriggerFlow déployé avant le site : les aperçus chargent leurs photos depuis
api.trigger-flow.com).

## Objet

- Principal : **Vos campagnes des fêtes, prêtes à envoyer**
- Variante A : **Noël, le 31, les vœux : vos e-mails sont prêts**
- Variante B : **7 e-mails des fêtes pour votre hôtel, à copier**

## Pré-en-tête

Bons cadeaux, réveillons, dernières chambres, vœux : 7 modèles à copier ou à créer en un clic.

## Fichiers

- `email.txt` : version texte (à coller dans la version texte de Brevo).
- `email.html` : version HTML (éditeur Brevo « Coller votre code »). Tableaux et styles en ligne, 600 px, sans image :
  l'e-mail se lit comme un message personnel et passe mieux les filtres.

## Liens suivis

| Lien | Adresse |
|------|---------|
| Bouton et lien de la page | `https://www.trigger-flow.com/fr/campagnes-email-fetes?utm_source=brevo&utm_medium=email&utm_campaign=vague-2-fetes&utm_content=bouton` (lien texte : `utm_content=lien`) |
| Démo | `https://app.lemcal.com/@trigger-flow/demo?utm_source=brevo&utm_medium=email&utm_campaign=vague-2-fetes&utm_content=demo` |

Sur la page, les UTM de la visite remplacent ceux des boutons démo (DemoClickTracker) : une démo prise depuis la page
reste attribuée à `vague-2-fetes`.

## Avant l'envoi

- Désinscription et version en ligne : balises Brevo `{{ unsubscribe }}` et `{{ mirror }}` (à vérifier dans l'aperçu
  Brevo, elles doivent devenir des liens).
- Prénom : l'e-mail commence par « Bonjour, » ; si la liste a un attribut prénom fiable, remplacer par
  `Bonjour {{ contact.PRENOM | default : "" }},` (nom de l'attribut à vérifier dans Brevo).
- Envoi test à soi-même (Gmail et Outlook), clic sur les 3 liens, puis envoi un mardi ou un jeudi matin.
