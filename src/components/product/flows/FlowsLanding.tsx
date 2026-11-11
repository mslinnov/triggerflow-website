import Image from 'next/image';
import {
  BellRing, Check, Clock, Filter, FlaskConical, GitBranch, Repeat2, ShieldCheck, Sparkles, Users, X, Zap, CalendarRange, Gauge, CircleSlash,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { DataFlowScenario } from '@/components/visuals';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { stat } from '@/data/company-stats';
import { flowsLanding as c } from '@/content/products/flows-landing';

const BLOCK_ICONS = [Filter, Zap, GitBranch, BellRing];
const SAFETY_ICONS = [Gauge, ShieldCheck, FlaskConical, CircleSlash, Repeat2, CalendarRange];

/** Landing dédiée Flows (benchmark Bookboost, Customer.io, Klaviyo et audit du code de l'app, 08/11/2026). */
export function FlowsLanding({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const l = (v: { fr: string; en: string }) => v[lang];

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,226,225,0.55),transparent_55%)]" />
        <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Eyebrow>{l(c.hero.eyebrow)}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] text-ink md:text-[3.5rem]">{l(c.hero.title)}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{l(c.hero.subtitle)}</p>
            <ul className="mt-6 space-y-2">
              {c.hero.bullets.map((b) => (
                <li key={b.fr} className="flex items-start gap-2 text-[15px] text-ink">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {l(b)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DsButton href={brand.demoPage} arrow>{l(c.cta.demo)}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
            </div>
          </div>
          <ProductFrame label="app.trigger-flow.com/flows">
            <div className="bg-[radial-gradient(#E4E8E7_1px,transparent_1px)] [background-size:16px_16px]">
              <DataFlowScenario />
            </div>
          </ProductFrame>
        </Container>
      </section>

      {/* 2. Preuves */}
      <section className="border-y border-line bg-white py-10">
        <Container className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
            <span className="font-mono text-eyebrow uppercase text-ink-3">{l(c.proof.label)}</span>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {c.proof.clients.map((name) => {
                const logo = clientLogos[name];
                return logo ? (
                  <li key={name}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[130px] object-contain opacity-80" /></li>
                ) : null;
              })}
            </ul>
          </div>
          <p className="flex items-baseline gap-3">
            <span className="text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat('messages', locale)}</span>
            <span className="max-w-[240px] text-[14px] text-ink-2">{l(c.proof.stat)}</span>
          </p>
        </Container>
      </section>

      {/* 3. Les capacités, puis les 4 briques */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.blocks.eyebrow)} title={l(c.blocks.title)} titleMuted={l(c.blocks.titleMuted)} align="left" />
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
            {c.capabilities.map((k) => (
              <div key={k.label.fr} className="bg-white p-6">
                <p className="text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-accent">{k.value}</p>
                <p className="mt-2 text-[14.5px] text-ink-2">{l(k.label)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {c.blocks.items.map((b, i) => {
              const Icon = BLOCK_ICONS[i];
              return (
                <article key={b.title.fr} className="rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/60 text-accent">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">0{i + 1}</p>
                  </div>
                  <h3 className="mt-4 text-[19px] font-semibold text-ink">{l(b.title)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{l(b.text)}</p>
                  <p className="mt-4 rounded-lg bg-paper px-3 py-2 text-[13px] leading-relaxed text-ink">{l(b.examples)}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Études */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.study.eyebrow)} title={l(c.study.title)} titleMuted={l(c.study.titleMuted)} align="left" onDark />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
            {c.study.figures.map((f) => (
              <div key={f.value} className="bg-ink p-7">
                <p className="text-[2.75rem] font-medium leading-none tracking-[-0.03em] text-mint">{f.value}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/85">{l(f.label)}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.06em] text-white/65">{l(c.study.source)}</p>
        </Container>
      </Section>

      {/* 5. Trois scénarios réels */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.scenarios.eyebrow)} title={l(c.scenarios.title)} align="left" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {c.scenarios.items.map((s) => (
              <article key={s.name.fr} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <h3 className="text-[19px] font-semibold text-ink">{l(s.name)}</h3>
                <p className="mt-4 flex items-center gap-2 rounded-lg bg-mint/50 px-3 py-2 text-[13.5px] font-medium text-accent-hover">
                  <Zap aria-hidden className="h-4 w-4 shrink-0" />
                  {l(s.trigger)}
                </p>
                <ol className="mt-3 flex-1 space-y-0 border-l border-line pl-4">
                  {s.steps.map((st) => (
                    <li key={st.fr} className="relative py-2 text-[14px] text-ink">
                      <span aria-hidden className="absolute -left-[21px] top-3.5 h-2 w-2 rounded-full bg-accent" />
                      {/^(Attendre|Wait)/.test(st.fr) || /^(Attendre|Wait)/.test(st.en) ? (
                        <span className="inline-flex items-center gap-1.5 text-ink-2"><Clock aria-hidden className="h-3.5 w-3.5" />{l(st)}</span>
                      ) : (
                        l(st)
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">{l(c.scenarios.labels.why)} : </span>
                  {l(s.why)}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Sécurité des envois */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.safety.eyebrow)} title={l(c.safety.title)} align="left" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.safety.items.map((s, i) => {
              const Icon = SAFETY_ICONS[i];
              return (
                <li key={s.title.fr} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-ink">{l(s.title)}</p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{l(s.text)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 7. Statistiques */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.stats.eyebrow)} title={l(c.stats.title)} subtitle={l(c.stats.subtitle)} align="left" />
          <ProductFrame label="app.trigger-flow.com/flows/statistiques" className="mt-10">
            <Image src="/images/app/flow-stats.webp" alt={l(c.stats.alt)} width={1448} height={820} sizes="(min-width: 1200px) 1200px, 100vw" className="h-auto w-full" />
          </ProductFrame>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{l(c.stats.caption)}</p>
        </Container>
      </Section>

      {/* 8. Démarrer vite + IA */}
      <Section tone="white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader eyebrow={l(c.start.eyebrow)} title={l(c.start.title)} align="left" />
            <ul className="mt-8 space-y-5">
              {c.start.items.map((s, i) => {
                const Icon = [Sparkles, Repeat2, Users][i];
                return (
                  <li key={s.title.fr} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{l(s.title)}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{l(s.text)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <ProductFrame label="app.trigger-flow.com/flows">
            <Image src="/images/app/flows-list.webp" alt={l(c.start.alt)} width={1448} height={820} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
          </ProductFrame>
        </Container>
        <Container className="mt-16">
          <div className="grid gap-5 rounded-2xl bg-ink p-6 text-white md:grid-cols-[auto_1fr_1fr] md:items-center md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-mint">
              <Sparkles aria-hidden className="h-6 w-6" />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{l(c.ai.eyebrow)}</p>
              <p className="mt-1 text-[19px] font-medium">{l(c.ai.title)}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">{l(c.ai.today)}</p>
            </div>
            <p className="rounded-xl border border-white/15 bg-white/[0.04] p-4 text-[14.5px] leading-relaxed text-white/85">
              <span className="mr-2 inline-block rounded-full bg-peach px-2 py-0.5 text-[11px] font-semibold text-ink">{l(c.ai.soonLabel)}</span>
              {l(c.ai.soon)}
            </p>
          </div>
        </Container>
      </Section>

      {/* 9. Témoignages */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {c.quotes.map((q) => {
              const logo = clientLogos[q.company];
              return (
                <figure key={q.name} className="flex flex-col rounded-2xl border border-line bg-white p-7">
                  <blockquote className="flex-1 text-[18px] leading-relaxed text-ink"><q>{l(q.text)}</q></blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {logo && <Image src={logo.src} alt={q.company} width={logo.width} height={logo.height} className="h-10 w-auto max-w-[90px] object-contain opacity-80" />}
                    <span className="text-[14px] text-ink-2"><span className="font-semibold text-ink">{q.name}</span>, {l(q.role)}, {q.company}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 10. Comparatif */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full table-fixed border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-paper">
                  <th scope="col" className="w-[26%] px-4 py-4 md:px-6"><span className="sr-only">{l(c.compare.criteria)}</span></th>
                  <th scope="col" className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2 md:px-6">{l(c.compare.other)}</th>
                  <th scope="col" className="bg-mint/40 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-hover md:px-6">TriggerFlow</th>
                </tr>
              </thead>
              <tbody>
                {c.compare.rows.map((r) => (
                  <tr key={r.label.fr} className="border-t border-line">
                    <th scope="row" className="px-4 py-4 font-medium text-ink md:px-6">{l(r.label)}</th>
                    <td className="px-3 py-4 text-ink-2 md:px-6"><span className="flex items-start gap-2"><X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />{l(r.other)}</span></td>
                    <td className="bg-mint/20 px-3 py-4 text-ink md:px-6"><span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(r.us)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 11. Tarif et réassurance */}
      <Section tone="paper" compact>
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[18px] font-medium text-ink">{l(c.pricing)}</p>
            <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
          </div>
          <PricingReassurance className="mt-6" />
        </Container>
      </Section>

      {/* 12. FAQ */}
      <Section tone="white">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={l(c.faqTitle)} align="left" />
          <div className="mt-10">
            <FaqList items={c.faq.map((f) => ({ question: l(f.q), answer: l(f.a) }))} />
          </div>
        </Container>
      </Section>

      <CtaBand title={l(c.cta.title)} text={l(c.cta.text)} primary={{ label: l(c.cta.demo), href: brand.demoPage }} secondary={{ label: l(c.cta.pricing), href: '/tarifs' }} />
    </>
  );
}
