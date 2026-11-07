# Arborescence cible du site TriggerFlow

Version 2, 7 novembre 2026. Complète `docs/audit-site.md`.

**Conventions** : préfixe de langue toujours présent (`/fr`, `/en`), mêmes slugs dans les deux langues. Toute ancienne URL est redirigée en 301 une fois sa nouvelle page en ligne.

**Messages transverses à porter partout** : hébergé en France, RGPD ; synchronisation bidirectionnelle avec le PMS ; connecté à tous les outils de l'hôtel (PMS, paiement, serrures, téléphonie, canaux de messagerie et OTA, avis) ; upsell possible dans n'importe quel formulaire ; IA intégrée dans chaque module, pas une « app IA » à part.

---

## 1. Arbre

```
/fr                                Home                                    refonte
│
├── /produit                       Vue d'ensemble de la plateforme         refonte
│   │
│   │  Avant le séjour
│   ├── /upsell                    Ventes additionnelles, surclassement    ex ventes-additionnelles
│   ├── /pay                       Liens de paiement, acompte, caution     ex paiements
│   ├── /forms                     Formulaires libres + upsell intégré     ex formulaires
│   ├── /check-in                  Check-in en ligne, lecture pièce d'id.  nouveau
│   ├── /booking-requests          Demandes de réservation (espaces)       nouveau
│   │
│   │  Pendant le séjour
│   ├── /guest-app                 Guest App, livret d'accueil (Utelys)    nouveau
│   ├── /voice                     Appel réception (fin du tél. en chambre) nouveau
│   ├── /inbox                     Messagerie unifiée (email, SMS,         ex hub-messagerie, sms, whatsapp
│   │                              WhatsApp, Messenger, Instagram, chat)
│   ├── /housekeeping              Ménage, planning, objets trouvés        nouveau
│   ├── /keys                      Clés digitales et serrures              nouveau
│   │
│   │  Après le séjour
│   ├── /reviews                   Avis (Google, Expedia…)                 ex avis
│   │
│   │  Marketing
│   ├── /marketing                 Hub marketing (vue d'ensemble)          nouveau
│   ├── /campaigns                 Campagnes email et SMS                  ex newsletter, email
│   ├── /segments                  Segmentation, ciblage                   nouveau
│   ├── /newsletter                Collecte d'abonnés (widgets, page)      refonte
│   ├── /loyalty                   Fidélité, points, Apple Wallet          ex fidelite
│   │
│   │  Socle
│   ├── /flows                     Éditeur visuel de scénarios             ex automatisations
│   ├── /crm                       Fiche client 360, segments, doublons    + ex analytics
│   ├── /analytics                 Tableaux de bord, BI                    refonte
│   ├── /events                    Événements et séminaires                nouveau
│   └── /b2b                       Comptes sociétés et groupes             nouveau
│
├── /plateforme
│   ├── /synchronisation           Synchro bidirectionnelle PMS            nouveau
│   ├── /ia                        Comment l'IA est intégrée               nouveau
│   └── /securite                  Hébergé en France, RGPD, DPA            nouveau
│
├── /integrations                  Catalogue complet, filtrable            refonte
│   ├── /pms                       Tous les PMS
│   │   └── /[pms]                 une page par PMS (liste en 3.)
│   ├── /paiement                  Stripe, PayZen, SystemPay, Apaleo Pay,  nouveau
│   │                              Thaïs Payment
│   ├── /serrures                  Igloohome, Sesame, Salto                nouveau
│   ├── /telephonie                Aircall, Ringover                       nouveau
│   ├── /canaux                    Email, SMS, WhatsApp, Messenger,        nouveau
│   │                              Instagram, Booking.com (natif, en cours),
│   │                              Expedia (emails relais), Airbnb (formulaires)
│   ├── /avis                      Google, Expedia, TripAdvisor, Booking   nouveau
│   └── /automatisation            Zapier, n8n, API, MCP                   nouveau
│
├── /solutions                     Index des segments                      nouveau
│   ├── /hotels-independants
│   ├── /groupes-hoteliers
│   ├── /hotels-luxe
│   ├── /residences
│   ├── /campings
│   └── /maisons-hotes                                                     nouveau
│
├── /clients                       Cas clients                             ex ressources/cas-clients
│   └── /[slug]
│
├── /tarifs
├── /blog/…                        inchangé
├── /ressources/guides, /aide
├── /a-propos                      ex entreprise/a-propos
├── /carrieres                     ex entreprise/carrieres
├── /contact
└── /dpa, /cgv, /cgu, /mentions-legales, /politique-confidentialite
```

Statut des services : lien externe (outil à choisir).

### Pages transverses : ce qu'elles racontent

- **/plateforme/synchronisation** : ce qui remonte du PMS (réservations, profils, séjours) et ce qui y redescend (statuts ménage, notes, paiements, préférences), en temps réel, dans les deux sens. Schéma PMS ⇄ TriggerFlow ⇄ outils.
- **/plateforme/ia** : l'IA comme couche dans chaque module, avec un exemple concret par module (réponse suggérée dans l'Inbox, réponse aux avis, rédaction d'email, résumé de fiche client, chatbot entraîné sur l'hôtel, connecteur MCP). Ton : « l'équipe garde la main, l'IA fait gagner du temps ». Pas de promesse d'agent autonome. Remplace l'ancien `/produit/ai`.
- **/plateforme/securite** : hébergement en France, RGPD, DPA public, liste des sous-traitants, chiffrement, contrôle d'accès, SSO (SAML), contact sécurité.
- **Upsell dans les formulaires** : section dédiée sur `/produit/forms` et `/produit/upsell` (exemple : le check-in en ligne propose le surclassement et le petit-déjeuner).

---

## 2. Redirections 301

| Ancienne URL | Nouvelle URL |
|---|---|
| `/produit/automatisations` | `/produit/flows` |
| `/produit/hub-messagerie`, `/produit/whatsapp`, `/produit/sms` | `/produit/inbox` |
| `/produit/email` | `/produit/campaigns` |
| `/produit/ventes-additionnelles` | `/produit/upsell` |
| `/produit/formulaires` | `/produit/forms` |
| `/produit/paiements` | `/produit/pay` |
| `/produit/avis` | `/produit/reviews` |
| `/produit/fidelite` | `/produit/loyalty` |
| `/solutions/automatiser-communication` | `/produit/flows` |
| `/solutions/augmenter-avis` | `/produit/reviews` |
| `/solutions/booster-upsell` | `/produit/upsell` |
| `/solutions/fideliser-clients` | `/produit/loyalty` |
| `/ressources/cas-clients(/:slug)` | `/clients(/:slug)` |
| `/entreprise/a-propos` | `/a-propos` |
| `/entreprise/carrieres` | `/carrieres` |
| `/v2` | `/` |

`/produit/crm` et `/produit/analytics` gardent leur URL.

---

## 3. PMS et connecteurs (catalogue réel de l'app, relevé le 7 novembre 2026)

**PMS (14)** : Apaleo, Asterio, Beds24, Hotello, Lean PMS, Medialog, Mews, MisterBooking, OPERA Cloud, Quinta, Reservit, Thaïs, VEGA, Zeswitch. En cours : Infor HMS, Booking.com (messagerie native).

Chloé, Galaxy, Infhotik et Protel (absents de l'app) sont retirés du site pour l'instant (décision du 7 novembre 2026).

**Autres connecteurs** : paiement (Stripe Connect, PayZen, SystemPay, Apaleo Pay, Thaïs Payment), serrures (Igloohome, Sesame, Salto en cours), téléphonie (Aircall, Ringover), restaurant (Zenchef), Guest App (Utelys).

## 4. Header

```
[Logo]  Produit ▾  Plateforme ▾  Intégrations  Solutions ▾  Clients  Tarifs  Ressources ▾     Connexion  [Voir le produit]  [Démarrer gratuitement]
```

**Produit ▾** (méga-menu)

| Avant le séjour | Pendant le séjour | Après le séjour | Marketing | Socle |
|---|---|---|---|---|
| Upsell | Guest App | Reviews | Campagnes | Flows |
| Pay | Appel réception | | Segments | CRM |
| Forms | Inbox | | Newsletter | Analytics |
| Check-in | Housekeeping | | Loyalty | Events |
| Demandes de réservation | Clés digitales | | | B2B |

**Plateforme ▾** : Synchronisation PMS, IA intégrée, Sécurité, Intégrations.

**Solutions ▾** : Hôtels indépendants, Groupes, Luxe, Résidences, Campings, Maisons d'hôtes.

**Ressources ▾** : Blog, Guides, Centre d'aide.

« Démarrer gratuitement » ouvre la prise de rendez-vous (plan gratuit, mise en place offerte). « Voir le produit » descend vers la visite en captures.

---

## 5. Footer

| Produit | Plateforme | Solutions | Clients | Ressources | Entreprise | Légal |
|---|---|---|---|---|---|---|
| Les 21 modules | Synchronisation | 6 segments | Tous les cas | Blog | À propos | Mentions légales |
| Tarifs | IA intégrée | | 4 cas clients | Guides | Carrières | CGV, CGU |
| | Sécurité | | | Centre d'aide | Contact | Confidentialité |
| | Intégrations | | | Newsletter | | DPA, Cookies |
| | Statut | | | | | |

Bas de footer : « Hébergé en France · RGPD », © TriggerFlow, « Une solution Utelys », langue, LinkedIn.

---

## 6. Ordre de mise en ligne

| Étape | Pages |
|---|---|
| Lot 1, corrections rapides | Pages existantes uniquement |
| Lot 3, home | `/`, header, footer |
| Lot 4, produits | Upsell, Flows, Pay, puis Marketing et les autres modules |
| Lot 5, confiance et plateforme | Sécurité, Synchronisation, IA, À propos, Carrières, Clients, catégories d'intégrations, pages PMS |
| Après | Solutions, Maisons d'hôtes |
