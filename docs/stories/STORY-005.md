# STORY-005: Article import pipeline (script CLI)

**Epic:** EPIC-003 (Blog System)
**Points:** 8
**Sprint:** 3
**Status:** not_started
**Dependencies:** STORY-001 (Blog infrastructure — completed)

---

## User Story

As a content manager
I want to import articles from an external folder
So that articles written by Claude are automatically published with generated images

---

## Context

Les articles de blog sont rédigés par Claude dans un dossier externe (`~/Documents/Msl Innov/Trigger Flow/website/articles/a-implementer/`). Chaque article est un fichier Markdown avec un frontmatter YAML riche (silo, SEO, images avec prompts, liens internes).

Le script d'import doit :
1. Parser le frontmatter
2. Générer les images via l'API Replicate (modèles `nano-banana` ou `nano-banana-pro`)
3. Transformer le contenu (remplacer les marqueurs image, résoudre les liens internes)
4. Écrire le fichier `.mdx` dans `content/blog/{silo-slug}/`
5. Déplacer le fichier source vers `articles/implementes/`

Le script est exécuté manuellement — pas de webhook ni d'automatisation. Le volume est faible (quelques articles par semaine).

---

## Source Article Format

### Naming convention
`{SILO}-{TYPE_INITIAL}-{slug}.md` (e.g., `S1-P-marketing-automation-hotelier.md`)
- P = pilier, S = support, A = satellite

### Frontmatter fields (YAML)
- `silo` — Silo ID (S1-S5)
- `silo_nom` — Human-readable name
- `type` — pilier | support | satellite
- `pilier_parent` — Parent slug (null for piliers)
- `title`, `meta_description`, `mot_cle_principal`, `mots_cles_secondaires`
- `slug`, `url`, `date_publication`, `date_mise_a_jour`
- `longueur_mots`, `temps_lecture`
- `persona_cible`, `cta_principal`, `fonctionnalites_mises_en_avant`, `pms_mentionnes`
- `liens_internes[]` — `{ fichier, ancre, contexte }` where `fichier` references other source files
- `liens_externes[]` — `{ url, ancre, contexte }`
- `images[]` — see below

### Image definition
```yaml
images:
  - id: hero
    filename: hero-email-pre-sejour-hotel.webp
    alt: "Description for accessibility"
    placement: after_title          # or "after_h2:Exact H2 Title"
    width: 1200
    height: 630
    model: nano-banana-pro          # or nano-banana
    prompt: |
      Detailed prompt for Replicate API...
```

### Content markers
- `<!-- IMAGE: hero -->` — replaced by `<ImageBlock id="hero" />`
- `[anchor text](S3-S-upselling-automatise.md)` — internal link to other article file, resolved to `/blog/{silo-slug}/{slug}/`

### Articles currently in `a-implementer/`
1. `S1-P-marketing-automation-hotelier.md` — Pilier (S1, ~4200 words)
2. `S1-S-email-pre-sejour-hotel.md` — Support (S1, ~2200 words)
3. `S2-P-crm-hotelier.md` — Pilier (S2)

---

## Décisions techniques

| Décision | Choix | Justification |
|----------|-------|---------------|
| Runtime | **`npx tsx`** | TypeScript execution without build step, ideal for CLI scripts |
| Replicate SDK | **`replicate` npm package** | Official SDK, handles polling for async predictions |
| Image format | **WebP** | Matches existing convention in `public/images/blog/` |
| Image processing | **Sequential** | Rate limiting — one image at a time with delay |
| Source path | **Configurable** via env or CLI arg | Default: `~/Documents/Msl Innov/Trigger Flow/website/articles/a-implementer/` |
| Error handling | **Fail-soft** | If Replicate fails for one image, log error and continue (article created without that image) |
| Internal link resolution | **Filename → slug mapping** | Parse `S1-P-slug.md` → extract slug, look up silo from prefix |

---

## Scope

### In scope
- Script `scripts/import-articles.ts`
- Frontmatter parsing and validation
- Image generation via Replicate API
- Image download and WebP save to `public/images/blog/{slug}/`
- Content transformation (IMAGE markers → MDX components)
- Internal link resolution (file references → blog URLs)
- MDX file output to `content/blog/{silo-slug}/{slug}.mdx`
- Source file move to `articles/implementes/`
- Console logging (progress, success, errors)
- `--dry-run` flag (preview what would happen without making changes)

### Out of scope
- External link validation
- Image optimization beyond WebP download
- Automatic git commit after import
- CMS or web interface
- Automatic deployment/rebuild trigger
- Duplicate detection (re-importing same article)

---

## Acceptance Criteria

- [ ] Script `scripts/import-articles.ts` exécutable via `npx tsx scripts/import-articles.ts`
- [ ] Scanne le dossier source et liste les fichiers `.md` trouvés
- [ ] Pour chaque fichier :
  - [ ] Parse le YAML frontmatter via gray-matter
  - [ ] Valide les champs requis : `silo`, `title`, `slug`, `images`
  - [ ] Rejette avec message d'erreur clair si champs manquants
- [ ] Pour chaque image dans `images[]` :
  - [ ] Appel API Replicate avec le modèle correspondant (`google/nano-banana` ou `google/nano-banana-pro`)
  - [ ] Attend la fin de la génération (polling)
  - [ ] Télécharge l'image résultat
  - [ ] Sauvegarde en WebP dans `public/images/blog/{slug}/{filename}`
  - [ ] Si erreur Replicate : log l'erreur et continue (article sans cette image)
- [ ] Transformation du contenu :
  - [ ] Remplacement `<!-- IMAGE: {id} -->` par `<ImageBlock id="{id}" />`
  - [ ] Résolution des liens internes : `[texte](S1-P-slug.md)` → `[texte](/blog/{silo-slug}/{slug}/)`
- [ ] Écriture du fichier `.mdx` dans `content/blog/{silo-slug}/{slug}.mdx` avec frontmatter préservé
- [ ] Déplacement du fichier source vers `articles/implementes/`
- [ ] Log console clair pour chaque opération (fichier traité, images générées, MDX écrit, source déplacé)
- [ ] Variable d'environnement `REPLICATE_API_TOKEN` requise — erreur explicite si absente
- [ ] Le dossier `articles/implementes/` est créé automatiquement s'il n'existe pas
- [ ] Build passe après import (`npm run build`)

---

## Technical Notes

### Script structure

```
scripts/import-articles.ts
├── main()                      — Entry point, scan directory, loop files
├── parseArticle(filepath)      — Read file, parse frontmatter, validate
├── generateImages(article)     — Call Replicate for each image, download
├── transformContent(content)   — Replace markers, resolve links
├── resolveInternalLink(ref)    — S1-P-slug.md → /blog/automatisation/slug/
├── writeArticleMDX(article)    — Write .mdx to content/blog/
└── moveToImplemented(filepath) — Move source to implementes/
```

### Silo ID → slug mapping

```typescript
const SILO_SLUG_MAP: Record<string, string> = {
  S1: 'automatisation',
  S2: 'experience-client',
  S3: 'revenue-upselling',
  S4: 'tech-integrations',
  S5: 'guides',
};
```

### Internal link resolution

Source format: `[anchor text](S1-P-marketing-automation-hotelier.md)`
- Extract silo prefix: `S1` → `automatisation`
- Extract slug: everything after `S1-P-` minus `.md` → `marketing-automation-hotelier`
- Resolve to: `/blog/automatisation/marketing-automation-hotelier/`

Handle edge cases:
- Target article doesn't exist yet → still resolve URL (it will exist after all imports)
- Relative link without silo prefix → log warning, keep as-is

### Replicate API

```typescript
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

// Model mapping
const MODEL_MAP = {
  'nano-banana': 'google/nano-banana',
  'nano-banana-pro': 'google/nano-banana-pro',
};

// Generate image
const output = await replicate.run(MODEL_MAP[image.model], {
  input: {
    prompt: image.prompt,
    width: image.width,
    height: image.height,
  },
});
```

### Rate limiting
- Process images sequentially (not in parallel)
- Add 2-second delay between Replicate calls
- Total time per article with 4 images: ~2-5 minutes (depends on Replicate queue)

### MDX output format

The output `.mdx` file keeps the original frontmatter (snake_case YAML as-is, matching what `lib/blog.ts` expects) with the content transformed:

```mdx
---
silo: S1
silo_nom: "Automatisation hôtelière"
type: support
# ... all other frontmatter fields preserved ...
locale: fr
---

# Title

<ImageBlock id="hero" />

Content with [internal links](/blog/automatisation/other-article/) resolved...

## Section Title

<ImageBlock id="section-img" />

More content...
```

### File system operations

```
Before import:
  articles/a-implementer/S1-S-email-pre-sejour-hotel.md

After import:
  content/blog/automatisation/email-pre-sejour-hotel.mdx   (new)
  public/images/blog/email-pre-sejour-hotel/                (new dir)
    hero-email-pre-sejour-hotel.webp                        (new)
    pourquoi-automatiser-email-pre-sejour-hotel.webp        (new)
    ...
  articles/implementes/S1-S-email-pre-sejour-hotel.md       (moved)
```

---

## Estimation

| Tâche | Effort |
|-------|--------|
| Script skeleton + CLI args | ~0.5 pt |
| Frontmatter parsing + validation | ~1 pt |
| Replicate API integration + image download | ~2.5 pt |
| Content transformation (markers + links) | ~1.5 pt |
| MDX writing + source moving | ~0.5 pt |
| Error handling + logging | ~1 pt |
| Testing with real articles | ~1 pt |
| **Total** | **8 pts** |

---

## Dependencies

**Prerequisite Stories:**
- STORY-001: Blog infrastructure (provides `content/blog/`, `src/types/blog.ts`, `src/data/silos.ts`) — completed

**npm packages to install:**
- `replicate` — Replicate API SDK

**Environment:**
- `REPLICATE_API_TOKEN` in `.env.local`

---

## Out of Scope

- Web-based import interface
- Automatic git commit/push after import
- Image optimization (compression, resizing) — Replicate outputs are used as-is
- Duplicate detection / re-import protection
- Article preview before publish
- English article generation (articles are written in FR first)
