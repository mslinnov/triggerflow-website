# TriggerFlow Website

Site vitrine marketing pour [TriggerFlow](https://www.trigger-flow.com), plateforme SaaS de marketing automation et CRM pour l'hôtellerie.

Built with [Next.js 15](https://nextjs.org) (App Router, RSC), TypeScript, Tailwind CSS, and deployed on **Cloudflare Pages** via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

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
npm run preview      # Build & preview via Cloudflare Workers
npm run deploy       # Build & deploy to Cloudflare Pages
```

## Deployment

The site is hosted on **Cloudflare Pages** using the OpenNext Cloudflare adapter.

- **Production:** Deployed via `npm run deploy` or Cloudflare Pages Git integration
- **Preview:** `npm run preview` runs a local Cloudflare Workers preview
- **Config:** `wrangler.jsonc` defines the worker entry point and assets directory
- **Environment variables:** Managed in Cloudflare Pages dashboard (Settings > Environment variables)

## Fichiers temporaires des PDF partagés

Les PDF partagés depuis le CRM (`/doc/<clé>/<suffixe>`) sont lus en entier auprès du backend,
puis relayés au lecteur depuis un fichier temporaire : c'est le seul endroit où le site écrit
sur le disque à l'exécution.

- **Dossier :** `SHARED_PDF_TMP_DIR` (côté serveur seulement), sinon celui du système
  (`os.tmpdir()`, en général `/tmp`). Le dossier doit exister et être accessible en écriture à
  l'utilisateur du service ; à vérifier avec l'unité systemd (un `PrivateTmp=` donne au service un
  `/tmp` à lui).
- **Place :** au plus 1,3 Go (50 relais simultanés × 26 Mo), rendue à la fin de chaque
  téléchargement. Chaque fichier est retiré du dossier dès sa création : il n'y apparaît jamais,
  même si le site s'arrête en plein relais.
- **Sans place ou sans droit d'écriture :** le lecteur voit « Document momentanément
  indisponible », et `[doc] PDF partagé interrompu avant son relais` part dans les journaux.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Cloudflare Pages](https://pages.cloudflare.com/)
