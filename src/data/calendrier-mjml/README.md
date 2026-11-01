# Modèles MJML du calendrier marketing

Copie **telle quelle** des modèles de la bibliothèque de l'app
(`backend/resources/email-library/seasonal/<thème>/<code>.{mjml,html,json}`), un dossier
par thème et un trio par code de temps fort (`src/data/calendrier-marketing.ts`).

| Dossier | Thème affiché |
|---|---|
| `moderne/` | Élégant (thème par défaut, les 12 codes) |
| `soiree/` | Soirée |
| `editorial/` | Éditorial |

- `<code>.mjml` : source, copiée par « Copier le MJML » ;
- `<code>.html` : HTML compilé par l'app, copié par « Copier le HTML » et rendu en aperçu ;
- `<code>.json` : `{ "subject": "…", "preheader": "…" }`.

Un thème sans les trois fichiers d'un code n'est pas proposé pour ce code ; un code sans
aucun thème garde le modèle texte de la page. Tous les thèmes présents sont contrôlés par
`src/lib/calendrier-mjml.test.ts` (aucun tiret cadratin, aucun chiffre promis hors d'un
champ `[[Libellé|exemple]]`). `__fixtures__/` ne sert qu'aux tests.
