import Image from 'next/image';
import { ArrowDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import type { StatId } from '@/data/company-stats';
import { getLPIcon } from './lp-icons';

export interface LPFeatureRowVisualItem {
  /** Icône lucide, ou à défaut `tag` (« J-7 ») dans la pastille de gauche. */
  icon?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  pill?: string;
  tone?: 'default' | 'gold' | 'alert';
}

export interface LPFeatureRowVisual {
  /** Mention en coin, « Exemple » : les cartes illustrent l'interface, ce ne sont pas des données réelles. */
  caption?: string;
  /** Flèches entre les cartes, pour une suite d'étapes. */
  arrows?: boolean;
  items: LPFeatureRowVisualItem[];
}

export interface LPFeatureRowStat {
  /** Chiffre officiel de company-stats.ts ; la valeur est posée au chargement (lib/landing-pages.ts). */
  statId?: StatId;
  value?: string;
  label: string;
}

export interface LPFeatureRow {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  stat?: LPFeatureRowStat;
  visual?: LPFeatureRowVisual;
  imageSrc?: string;
  imageAlt?: string;
}

export interface LPFeatureRowsProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  rows: LPFeatureRow[];
  className?: string;
}

const pillTones: Record<NonNullable<LPFeatureRowVisualItem['tone']>, string> = {
  default: 'bg-brand-primary/10 text-brand-primary',
  gold: 'bg-brand-accent-light text-brand-dark',
  alert: 'bg-brand-accent text-brand-dark',
};

/** Pastille d'icône : seule l'alerte change de couleur, le ton « gold » garde le vert. */
const iconTones: typeof pillTones = { default: pillTones.default, gold: pillTones.default, alert: pillTones.alert };

function Visual({ visual }: { visual: LPFeatureRowVisual }) {
  return (
    <div className="relative grid gap-2.5 rounded-3xl bg-gradient-to-br from-surface-tertiary to-surface-secondary px-4 pb-5 pt-9 sm:p-9 sm:pt-11">
      {visual.caption && (
        <span className="absolute right-3 top-3 rounded bg-white px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          {visual.caption}
        </span>
      )}
      {visual.items.map((item, index) => {
        const Icon = getLPIcon(item.icon);
        const tone = item.tone ?? 'default';
        return (
          <div key={`${item.title}-${index}`} className="grid gap-2.5">
            {visual.arrows && index > 0 && (
              <ArrowDown className="mx-auto h-4 w-4 text-brand-primary/60" aria-hidden="true" />
            )}
            <div className="grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-white px-3.5 py-3 text-sm shadow-md shadow-brand-dark/5">
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold',
                  iconTones[tone]
                )}
              >
                {Icon ? <Icon className="h-[18px] w-[18px]" aria-hidden="true" /> : item.tag}
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-brand-dark">{item.title}</span>
                {item.subtitle && <span className="block text-xs text-text-muted">{item.subtitle}</span>}
              </span>
              {item.pill && (
                <span className={cn('whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold', pillTones[tone])}>
                  {item.pill}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Bénéfices en lignes alternées : texte, puces, chiffre mesuré, et en face un visuel d'exemple ou une image. */
export function LPFeatureRows({ sectionTitle, sectionSubtitle, rows, className }: LPFeatureRowsProps) {
  return (
    <section className={cn('bg-white py-14 md:py-24', className)}>
      <Container>
        {sectionTitle && (
          <div className="mb-10 max-w-2xl md:mb-16">
            <h2 className="text-[1.65rem] font-bold leading-tight text-brand-dark sm:text-4xl">{sectionTitle}</h2>
            {sectionSubtitle && <p className="mt-3 text-text-secondary">{sectionSubtitle}</p>}
          </div>
        )}
        <div className="grid gap-14 md:gap-24">
          {rows.map((row, index) => (
            <article key={row.title} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
              <div className={cn(index % 2 === 1 && 'lg:order-2')}>
                {row.eyebrow && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{row.eyebrow}</p>
                )}
                <h3 className="mt-2 text-[1.45rem] font-bold leading-tight text-brand-dark sm:text-3xl">{row.title}</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">{row.description}</p>
                {row.bullets && row.bullets.length > 0 && (
                  <ul className="mt-4 grid gap-2">
                    {row.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-[0.95rem] text-brand-dark">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {row.stat?.value && (
                  <p className="mt-5 flex items-baseline gap-3 border-t border-border-light pt-4">
                    <span className="shrink-0 text-3xl font-bold leading-none text-brand-primary">{row.stat.value}</span>
                    <span className="text-sm text-text-secondary">{row.stat.label}</span>
                  </p>
                )}
              </div>
              <div className={cn('min-w-0', index % 2 === 1 && 'lg:order-1')}>
                {row.visual ? (
                  <Visual visual={row.visual} />
                ) : (
                  row.imageSrc && (
                    <Image
                      src={row.imageSrc}
                      alt={row.imageAlt ?? ''}
                      width={800}
                      height={500}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="rounded-2xl shadow-lg"
                    />
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
