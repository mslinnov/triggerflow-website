# TriggerFlow Website

Site vitrine marketing pour [TriggerFlow](https://www.trigger-flow.com), plateforme SaaS de marketing automation et CRM pour l'hôtellerie.

Built with [Next.js](https://nextjs.org) (App Router, RSC), TypeScript and Tailwind CSS. En production : `next start` sous systemd sur un serveur Scaleway, déployé par GitHub Actions (voir « Déploiement »).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser.

## Commands

```bash
npm run dev          # Dev server (Turbopack, port 3001)
npm run build        # Production build
npm run lint         # ESLint check
npm run preview      # Build & preview via Cloudflare Workers (hors production)
npm run deploy       # Build & deploy to Cloudflare Pages (hors production)
```

## Déploiement

- **Production :** `next start` sous systemd (service `tf-website`, port 3002), derrière Apache, sur
  le serveur Scaleway stayrival-01. Déployé par `.github/workflows/deploy.yml` à chaque push sur
  `main` : build dans GitHub Actions, copie des fichiers par SSH, variables d'exécution écrites dans
  `.env.production.local`, redémarrage du service.
- **Variables :** secrets GitHub du dépôt, recopiés par `deploy.yml` (les `NEXT_PUBLIC_*` au build).
- **Cloudflare :** `wrangler.jsonc` et les scripts `preview` / `deploy` (OpenNext) restent d'un ancien
  hébergement, ils ne servent plus la production.

## Fichiers temporaires des PDF partagés

Les PDF partagés depuis le CRM (`/doc/<clé>/<suffixe>`) sont lus en entier auprès du backend,
puis relayés au lecteur depuis un fichier temporaire : c'est le seul endroit où le site écrit
sur le disque à l'exécution.

- **Dossier :** `SHARED_PDF_TMP_DIR` (côté serveur seulement), sinon celui du système
  (`os.tmpdir()`, en général `/tmp`). En production, `deploy.yml` le pose à `/var/tmp` : sur le
  disque, alors qu'un `/tmp` peut être un tmpfs, donc en mémoire. Le dossier doit exister et être
  accessible en écriture à l'utilisateur du service ; à vérifier avec l'unité systemd (un
  `PrivateTmp=` donne au service un `/tmp` et un `/var/tmp` à lui).
- **Place :** au plus 1,3 Go (`MAX_RELAYS`, 50 relais simultanés, × 26 Mo), rendue à la fin de
  chaque téléchargement. Chaque fichier est retiré du dossier dès sa création : il n'y apparaît
  jamais, même si le site s'arrête en plein relais.
- **Dossier absent ou sans droit d'écriture :** le lecteur voit « Document momentanément
  indisponible », sans que le backend compte d'ouverture, et `[doc] PDF partagé interrompu avant
  son relais` part dans les journaux.
- **Disque plein :** même page pour le lecteur, mais l'ouverture est déjà comptée : le manque de
  place ne se voit qu'à l'écriture, une fois le PDF demandé au backend.
- **Arrêt du site :** à SIGTERM (redémarrage du déploiement), les appels au backend et les écritures
  du fichier en cours sont coupés aussitôt, et le lecteur reçoit « réessayez ». Le backend a pu
  compter l'ouverture d'un appel coupé : une ouverture peut donc être comptée sans être servie.
- **Limites :** 25 relais simultanés par visiteur (`MAX_RELAYS_PER_VISITOR`) et 30 PDF par minute
  (`PDF_PER_VISITOR_PER_MINUTE`). Une salle de salon derrière une seule adresse partage ces 30 PDF :
  la 31e personne de la minute reçoit « réessayez ».

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Cloudflare Pages](https://pages.cloudflare.com/)
