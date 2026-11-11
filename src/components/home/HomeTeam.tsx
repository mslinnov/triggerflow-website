import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Compass, LayoutTemplate, LifeBuoy, Plug, Star } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ds';

const ICONS = [Compass, Plug, LayoutTemplate, LifeBuoy];

/** L'équipe et l'accompagnement : photo réelle de l'équipe, 4 engagements, un avis Google. */
export function HomeTeam() {
  const t = useTranslations('home2.team');
  const tq = useTranslations('home2.testimonials');
  const points = t.raw('points') as { title: string; text: string }[];
  return (
    <Section tone="white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <figure>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/team/equipe-triggerflow.webp"
                alt={t('photoAlt')}
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">{t('caption')}</figcaption>
          </figure>
          <div>
            <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} align="left" />
            <ul className="mt-8 space-y-5">
              {points.map((p, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={p.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent">
                      <Icon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{p.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-paper px-5 py-4">
              <span className="flex gap-0.5" role="img" aria-label="5/5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} aria-hidden className="h-4 w-4 fill-peach text-peach" />
                ))}
              </span>
              <p className="mt-2 text-[15px] text-ink"><q>{tq('review')}</q></p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">{tq('reviewLabel')}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
