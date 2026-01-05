# CLAUDE.md - TriggerFlow Website

## Project Overview

Site vitrine marketing pour TriggerFlow, un SaaS CRM et automatisation de communication pour hôtels indépendants. Migration depuis Webflow vers Next.js pour performance, SEO et contrôle total.

**URL actuelle:** https://www.trigger-flow.com
**URL app:** https://app.trigger-flow.com
**Démo booking:** https://app.lemcal.com/@trigger-flow/demo

## Tech Stack

- **Framework:** Next.js 15 (App Router, RSC)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl (FR/EN)
- **Hosting:** Vercel
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Routes internationalisées
│   │   ├── page.tsx        # Homepage
│   │   ├── mentions-legales/
│   │   ├── cgv/
│   │   ├── cgu/
│   │   └── politique-confidentialite/
│   ├── layout.tsx          # Root layout
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                 # Button, Badge, Card, Accordion, etc.
│   ├── sections/           # Hero, Features, Pricing, FAQ, etc.
│   └── layout/             # Header, Footer, Navigation
├── lib/
│   ├── utils.ts            # cn() helper, formatters
│   └── constants.ts        # Pricing plans, features data
├── messages/
│   ├── fr.json             # French translations
│   └── en.json             # English translations
└── styles/
    └── globals.css
```

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check (add to package.json: "type-check": "tsc --noEmit")
```

## Code Conventions

### Components

- **Server Components by default** - Only use "use client" when needed (interactivity, hooks)
- **One component per file** - Named exports for components
- **Props interface** - Define Props type above component

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children }: ButtonProps) {
  return <button className={cn(baseStyles, variants[variant], sizes[size])}>{children}</button>;
}
```

### Styling

- **Tailwind only** - No CSS modules, no styled-components
- **Use cn() helper** - For conditional classes (clsx + tailwind-merge)
- **Design tokens** - Define in tailwind.config.ts

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Translations (next-intl)

- **Keys in camelCase** - `hero.title`, `pricing.plans.communication`
- **Interpolation** - Use `{variable}` syntax
- **Pluralization** - Use ICU format when needed

```json
// src/messages/fr.json
{
  "hero": {
    "title": "Automatisez les tâches de votre choix",
    "cta": "Réserver une démo"
  }
}
```

```tsx
// Usage in component
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

### Images

- **Always use next/image** - For automatic optimization
- **WebP format** - Convert all images
- **Explicit dimensions** - Always set width/height
- **Priority for LCP** - Add `priority` to above-fold images

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="TriggerFlow dashboard"
  width={800}
  height={600}
  priority // For hero images
  className="rounded-lg"
/>
```

## Brand & Design

### Colors (from Webflow site)

```ts
// tailwind.config.ts
colors: {
  brand: {
    primary: '#00875a',     // Green - CTAs, accents
    dark: '#1a1a2e',        // Dark blue - Headers, text
    light: '#f5f5f5',       // Light gray - Backgrounds
  }
}
```

### Typography

- **Headings:** Font-weight bold, dark color
- **Body:** 16px base, regular weight
- **CTA buttons:** Medium weight, uppercase optional

### Spacing

- **Sections:** py-16 md:py-24 (64px mobile, 96px desktop)
- **Container:** max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

## Key Features to Implement

### Homepage Sections (in order)

1. **Header** - Logo, nav links (anchors), lang switcher, CTAs
2. **Hero** - Title, subtitle, CTA, badges, hero image
3. **LogoCarousel** - Client logos (Accor, Sofitel, Ibis, Best Western...)
4. **Features** - 3 feature cards with icons
5. **CommunicationTimeline** - Before/During/After stay
6. **Examples** - 4 use case tabs (SMS, Events, Surveys, Upsell)
7. **HowItWorks** - 3 steps with PMS logos
8. **Pricing** - 4 plans comparison table
9. **Benefits** - 4 badges (Support, RGPD, etc.)
10. **DetailedFeatures** - 3 tabs with screenshots
11. **Testimonials** - Carousel with quotes
12. **FAQ** - Accordion component
13. **CTASection** - Final call to action
14. **Footer** - Links, newsletter, social

### Legal Pages

- `/mentions-legales` - Legal notice
- `/cgv` - Terms of sale
- `/cgu` - Terms of use  
- `/politique-confidentialite` - Privacy policy

## SEO Requirements

### Metadata (each page)

```tsx
// src/app/[locale]/page.tsx
export const metadata: Metadata = {
  title: 'TriggerFlow | Automatisation relation client hôtelière',
  description: 'Solution SaaS pour automatiser SMS, emails et fidélisation client dans l\'hôtellerie.',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

### Schema.org (JSON-LD)

- Organization
- SoftwareApplication  
- FAQPage
- Product (pricing)

## Performance Targets

- **Lighthouse Performance:** > 95
- **Lighthouse SEO:** 100
- **LCP:** < 2.5s
- **CLS:** < 0.1

## External Links

- Demo booking: `https://app.lemcal.com/@trigger-flow/demo` (target="_blank")
- App login: `https://app.trigger-flow.com/login`
- Newsletter: Brevo/Sibforms integration
- LinkedIn: Company page link

## DO NOT

- ❌ Use CSS-in-JS or CSS modules
- ❌ Use `any` type in TypeScript
- ❌ Forget alt text on images
- ❌ Use inline styles
- ❌ Create client components without necessity
- ❌ Hardcode text (use translations)
- ❌ Forget responsive design (mobile-first)

## Reference

See `/docs/PRD.docx` for full specifications including:
- Detailed section descriptions
- Complete pricing table structure
- All testimonials content
- FAQ questions/answers
- Security headers configuration
