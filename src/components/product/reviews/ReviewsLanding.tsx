import Image from 'next/image';
import { BellRing, Check, ClipboardList, Inbox, Languages, MailCheck, Sparkles, Star, UserRound, X } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { reviewsLanding as c } from '@/content/products/reviews-landing';

const WATCH_ICONS = [BellRing, MailCheck, Inbox, UserRound];
const SOURCE_COLORS: Record<string, string> = {
  google: 'bg-[#4285F4]', booking: 'bg-[#003580]', tripadvisor: 'bg-[#34E0A1]', expedia: 'bg-[#FFC72C]', airbnb: 'bg-[#FF5A5F]', internal: 'bg-accent',
};

/** Landing dédiée Avis (benchmark Customer Alliance, TrustYou, Partoo, GuestSuite et audit du code, 09/11/2026). */
export function ReviewsLanding({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const l = (v: { fr: string; en: string }) => v[lang];
  const name = (v: string | { fr: string; en: string }) => (typeof v === 'string' ? v : l(v));
  const d = c.reply.demo;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-20 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,226,225,0.55),transparent_55%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{l(c.hero.eyebrow)}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] text-ink md:text-[3.5rem]">{l(c.hero.title)}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{l(c.hero.subtitle)}</p>
            <ul className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-2 sm:items-start">
              {c.hero.bullets.map((b) => (
                <li key={b.fr} className="flex items-start gap-2 text-left text-[15px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(b)}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <DsButton href={brand.demoPage} arrow>{l(c.cta.demo)}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
            </div>
          </div>
          <ProductFrame label="app.trigger-flow.com/avis" className="mx-auto mt-14 max-w-[1100px]">
            <Image src="/images/app/reviews.webp" alt={l(c.hero.alt)} width={1400} height={866} priority sizes="(min-width: 1100px) 1100px, 100vw" className="h-auto w-full" />
          </ProductFrame>
          <p className="mx-auto mt-3 max-w-[1100px] font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{l(c.hero.caption)}</p>
        </Container>
      </section>

      {/* 2. Preuves */}
      <section className="border-y border-line bg-white py-10">
        <Container className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <span className="font-mono text-eyebrow uppercase text-ink-3">{l(c.proof.label)}</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {c.proof.clients.map((n) => {
              const logo = clientLogos[n];
              return logo ? <li key={n}><Image src={logo.src} alt={n} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[130px] object-contain opacity-80" /></li> : null;
            })}
          </ul>
        </Container>
      </section>

      {/* 3. Sources */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.sources.eyebrow)} title={l(c.sources.title)} titleMuted={l(c.sources.titleMuted)} align="left" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.sources.items.map((s) => (
              <li key={s.key} className="rounded-2xl border border-line bg-white p-5">
                <p className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${SOURCE_COLORS[s.key]}`} />
                  {name(s.name)}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{l(s.text)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Demander l'avis */}
      <Section tone="paper">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeader eyebrow={l(c.ask.eyebrow)} title={l(c.ask.title)} align="left" />
            <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{l(c.ask.text)}</p>
            <ol className="mt-8 space-y-0 border-l border-line pl-5">
              {c.ask.steps.map((s, i) => (
                <li key={s.fr} className="relative py-2 text-[15px] text-ink">
                  <span aria-hidden className={`absolute -left-[25px] top-3 h-2.5 w-2.5 rounded-full ${i === 3 ? 'bg-peach' : 'bg-accent'}`} />
                  {l(s)}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-ink p-8 text-white">
            <p className="text-[4rem] font-medium leading-none tracking-[-0.04em] text-mint">{c.ask.figure}</p>
            <p className="mt-4 text-[17px] leading-relaxed text-white/90">{l(c.ask.figureLabel)}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.06em] text-white/60">{l(c.ask.source)}</p>
          </div>
        </Container>
      </Section>

      {/* 5. Répondre */}
      <Section tone="white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader eyebrow={l(c.reply.eyebrow)} title={l(c.reply.title)} align="left" />
            <ul className="mt-8 space-y-3">
              {c.reply.items.map((it) => (
                <li key={it.fr} className="flex items-start gap-2 text-[15px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(it)}</li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink-2">{l(c.reply.note)}</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center gap-2 text-[13px] text-ink-2">
                <span className="rounded bg-[#003580] px-1.5 py-0.5 font-semibold text-white">{d.score}</span>
                <span className="font-semibold text-ink">{d.name}</span> · {l(d.country)} · {d.platform}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{d.review}</p>
            </div>
            <div className="ml-6 rounded-2xl border border-accent/30 bg-mint/30 p-5">
              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-hover"><Sparkles aria-hidden className="h-3.5 w-3.5" />{l(d.label)}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">{d.reply}</p>
              <p className="mt-3 flex gap-2 border-t border-accent/20 pt-3 text-[13.5px] leading-relaxed text-ink-2">
                <Languages aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                {l(d.translation)}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Ne rien laisser passer */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.watch.eyebrow)} title={l(c.watch.title)} align="left" onDark />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.watch.items.map((w, i) => {
              const Icon = WATCH_ICONS[i];
              return (
                <div key={w.title.fr} className="bg-ink p-6">
                  <Icon aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                  <p className="mt-4 text-[16.5px] font-semibold text-white">{l(w.title)}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/80">{l(w.text)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Comprendre + widgets */}
      <Section tone="white">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={l(c.understand.eyebrow)} title={l(c.understand.title)} align="left" />
            <ul className="mt-8 space-y-3">
              {c.understand.items.map((it) => (
                <li key={it.fr} className="flex items-start gap-2 text-[15px] text-ink"><ClipboardList aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(it)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6 md:p-8">
            <Eyebrow>{l(c.widgets.eyebrow)}</Eyebrow>
            <p className="mt-3 text-[22px] font-medium leading-snug tracking-[-0.02em] text-ink">{l(c.widgets.title)}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{l(c.widgets.text)}</p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 shadow-sm">
              <span className="text-[2rem] font-medium leading-none tracking-[-0.03em] text-ink">{c.widgets.badge.rating}</span>
              <span>
                <span className="flex gap-0.5 text-[#F5B400]" role="img" aria-label="5/5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden className="h-4 w-4 fill-current" />)}</span>
                <span className="mt-1 block text-[13px] text-ink-2">{l(c.widgets.badge.count)}</span>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Témoignage */}
      <Section tone="paper">
        <Container narrow>
          <figure className="text-center">
            <blockquote className="text-balance text-[1.5rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-[1.75rem]"><q>{l(c.quote.text)}</q></blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              {clientLogos[c.quote.company] && (
                <Image src={clientLogos[c.quote.company]!.src} alt={c.quote.company} width={clientLogos[c.quote.company]!.width} height={clientLogos[c.quote.company]!.height} className="h-9 w-auto max-w-[110px] object-contain opacity-80" />
              )}
              <span className="text-[14.5px] text-ink-2"><span className="font-semibold text-ink">{c.quote.name}</span>, {l(c.quote.role)}, {c.quote.company}</span>
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* 9. Comparatif */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full table-fixed border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-paper">
                  <th scope="col" className="w-[24%] px-4 py-4 md:px-6"><span className="sr-only">{l(c.compare.criteria)}</span></th>
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

      {/* 10. Tarif */}
      <Section tone="paper" compact>
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[18px] font-medium text-ink">{l(c.pricing)}</p>
            <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
          </div>
          <PricingReassurance className="mt-6" />
        </Container>
      </Section>

      {/* 11. FAQ */}
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
