'use client';

import { useTranslations } from 'next-intl';
import { Bot, Languages, MessageSquareText, Mic, ShieldCheck, Sparkles, Star, UserRound } from 'lucide-react';
import { Container, DsButton, SectionHeader } from '@/components/ds';
import { useScenario } from '@/components/ds/useScenario';
import { cn } from '@/lib/utils';

/** Étapes : 0 repos · 1 question de nuit · 2 réponse de l'agent · 3 brouillon d'avis · 4 résumé CRM · 5 vocal traduit · 6 fin. */
const DURATIONS = [500, 1100, 1300, 1300, 1300, 1300, 1];

/** Forme d'onde du message vocal (hauteurs fixes). */
const WAVE = ['h-2', 'h-4', 'h-3', 'h-5', 'h-3', 'h-4', 'h-2', 'h-4', 'h-3', 'h-1.5', 'h-3', 'h-2'];

/**
 * L'IA dans chaque module (contenu repris de /plateforme/ia) : l'agent répond seul sur ce qu'on lui a appris,
 * ailleurs l'IA propose et l'équipe valide.
 */
export function HomeAI() {
  const t = useTranslations('home2.ai');
  const { ref, step } = useScenario(DURATIONS);

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} subtitle={t('subtitle')} align="left" />

        <div ref={ref} className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Agent IA : réponse de nuit, dans la langue du client */}
          <article className="flex flex-col rounded-2xl bg-ink p-6 text-white md:p-8">
            <Head icon={<Bot className="h-4 w-4" />} label={t('agent.label')} tag={t('agent.tag')} onDark />
            <h3 className="mt-4 text-[22px] font-medium tracking-[-0.01em]">{t('agent.title')}</h3>
            <div className="mt-6 flex-1 space-y-3 rounded-xl bg-white/[0.06] p-4">
              <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/60">{t('agent.time')}</p>
              <Line show={step >= 1} className="max-w-[85%] rounded-xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-[14px]">
                {t('agent.question')}
              </Line>
              <Line show={step >= 2} className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-mint px-3.5 py-2.5 text-[14px] text-ink">
                {t('agent.answer')}
                <span className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.04em] text-accent-hover">
                  <Languages aria-hidden className="h-3 w-3" /> {t('agent.meta')}
                </span>
              </Line>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-white/80">{t('agent.text')}</p>
          </article>

          <div className="grid gap-5">
            {/* Avis : brouillon de réponse */}
            <article className={cn('rounded-2xl border p-5 transition-colors duration-500', step >= 3 ? 'border-accent' : 'border-line')}>
              <Head icon={<Star className="h-4 w-4" />} label={t('reviews.label')} tag={t('validate')} />
              <p className="mt-3 flex items-center gap-1 text-peach">
                {[0, 1, 2, 3].map((i) => <Star key={i} aria-hidden className="h-3.5 w-3.5 fill-current" />)}
                <Star aria-hidden className="h-3.5 w-3.5 text-line" />
                <span className="ml-2 text-[13px] text-ink-2"><q>{t('reviews.review')}</q></span>
              </p>
              <Line show={step >= 3} className="mt-3 rounded-lg bg-paper px-3.5 py-2.5 text-[13.5px] text-ink">
                <span className="mb-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.06em] text-accent">
                  <Sparkles aria-hidden className="h-3 w-3" /> {t('draft')}
                </span>
                {t('reviews.draft')}
              </Line>
            </article>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* CRM : résumé de fiche */}
              <article className={cn('rounded-2xl border p-5 transition-colors duration-500', step >= 4 ? 'border-accent' : 'border-line')}>
                <Head icon={<UserRound className="h-4 w-4" />} label={t('crm.label')} />
                <Line show={step >= 4} className="mt-3 space-y-1.5 text-[13px] text-ink">
                  {(t.raw('crm.lines') as string[]).map((l) => (
                    <span key={l} className="flex gap-1.5"><span className="text-accent">•</span>{l}</span>
                  ))}
                </Line>
              </article>
              {/* Appel réception : vocal transcrit et traduit */}
              <article className={cn('rounded-2xl border p-5 transition-colors duration-500', step >= 5 ? 'border-accent' : 'border-line')}>
                <Head icon={<Mic className="h-4 w-4" />} label={t('voice.label')} />
                <p className="mt-3 flex h-5 items-center gap-1" aria-hidden>
                  {WAVE.map((h, i) => (
                    <span key={i} className={cn('w-1 rounded-full transition-colors duration-500', h, step >= 5 ? 'bg-accent' : 'bg-line')} />
                  ))}
                </p>
                <Line show={step >= 5} className="mt-3 text-[13px] text-ink">
                  <q>{t('voice.text')}</q>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{t('voice.meta')}</span>
                </Line>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-paper px-5 py-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-2">
            {(t.raw('principles') as string[]).map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <ShieldCheck aria-hidden className="h-4 w-4 text-accent" />
                {p}
              </li>
            ))}
          </ul>
          <DsButton href="/plateforme/ia" variant="link" arrow>
            {t('more')}
          </DsButton>
        </div>
      </Container>
    </section>
  );
}

function Head({ icon, label, tag, onDark }: { icon: React.ReactNode; label: string; tag?: string; onDark?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={cn('flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]', onDark ? 'text-mint' : 'text-accent')}>
        <span className={cn('flex h-7 w-7 items-center justify-center rounded-md', onDark ? 'bg-white/10' : 'bg-mint/60')}>{icon}</span>
        {label}
      </span>
      {tag && (
        <span className={cn('flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase', onDark ? 'bg-white/10 text-white/80' : 'bg-paper text-ink-2')}>
          <MessageSquareText aria-hidden className="h-3 w-3" />
          {tag}
        </span>
      )}
    </div>
  );
}

function Line({ show, className, children }: { show: boolean; className?: string; children: React.ReactNode }) {
  return <div className={cn('transition-all duration-500', show ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0', className)}>{children}</div>;
}
