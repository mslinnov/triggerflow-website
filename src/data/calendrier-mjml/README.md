# Modèles MJML du calendrier marketing

Copie **telle quelle** des modèles « Moderne » de la bibliothèque de l'app
(`backend/resources/email-library/seasonal/moderne/<code>.{mjml,html,json}`), un trio
par code de temps fort (`src/data/calendrier-marketing.ts`, `TEMPS_FORT_CODES`).

- `<code>.mjml` : source, copiée par « Copier le MJML » ;
- `<code>.html` : HTML compilé par l'app, copié par « Copier le HTML » et rendu en aperçu ;
- `<code>.json` : `{ "subject": "…", "preheader": "…" }`.

Un code sans ses trois fichiers garde le modèle texte de la page. Les fichiers sont
contrôlés par `src/lib/calendrier-mjml.test.ts` (aucun tiret cadratin, aucun chiffre
promis hors d'un champ `[[Libellé|exemple]]`). `__fixtures__/` ne sert qu'aux tests.
