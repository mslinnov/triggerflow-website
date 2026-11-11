import Image from 'next/image';
import {
  ArrowRight, BadgeCheck, BedDouble, Bot, CalendarCheck, Check, ClipboardList, Coffee, CreditCard, FileText, Mail, MessageCircle,
  ParkingCircle, Smartphone, Sparkles, UtensilsCrossed, X,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { stat } from '@/data/company-stats';
import { integrationLogos } from '@/data/integration-logos';
import { upsellLanding as c } from '@/content/products/upsell-landing';

const PAY = ['Stripe', 'PayZen', 'SystemPay'] as const;
const MOMENT_ICONS = [CalendarCheck, Mail, ClipboardList, Smartphone];
const CATALOGUE_ICONS = [BedDouble, Coffee, CalendarCheck, Sparkles, ParkingCircle, UtensilsCrossed];

/**
 * Landing dédiée Upsell (benchmark Oaky, Duve, Canary, Welcom du 08/11/2026).
 * Chiffres : étude TriggerFlow « Le guide des ventes additionnelles » (été 2026) et company-stats.
 */
export function UpsellLanding({ locale }: { locale: string }) {
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
              <DsButton href="/lp/upsell-hotel-livre-blanc" variant="secondary">{l(c.cta.guide)}</DsButton>
            </div>
          </div>
          {/* Côté hôtel (commandes) et côté client (l'email qui vend) */}
          <div className="relative pb-10 lg:pb-0">
            <ProductFrame label="app.trigger-flow.com/ventes">
              <Image src="/images/app/upsell-orders.webp" alt={l(c.hero.ordersAlt)} width={1448} height={820} priority sizes="(min-width: 1024px) 600px, 100vw" className="h-auto w-full" />
            </ProductFrame>
            <figure className="absolute -bottom-2 -left-4 hidden w-[230px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_50px_-20px_rgba(0,43,40,0.45)] sm:block lg:-left-10">
              <Image src="/images/guest-apps/email-coq-offres.webp" alt={l(c.hero.emailAlt)} width={640} height={610} sizes="230px" className="h-auto w-full" />
              <figcaption className="border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-2">{l(c.hero.emailCaption)}</figcaption>
            </figure>
          </div>
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
            <span className="text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat('paidWithin2h', locale)}</span>
            <span className="max-w-[280px] text-[14px] text-ink-2">{l(c.proof.stat)}</span>
          </p>
        </Container>
      </section>

      {/* 3. Ce que dit notre étude */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.study.eyebrow)} title={l(c.study.title)} titleMuted={l(c.study.titleMuted)} subtitle={l(c.study.subtitle)} align="left" onDark />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
            {c.study.figures.map((f) => (
              <div key={f.value} className="bg-ink p-7">
                <p className="text-[2.75rem] font-medium leading-none tracking-[-0.03em] text-mint">{f.value}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/85">{l(f.label)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.06em] text-white/65">{l(c.study.source)}</p>
            <DsButton href="/lp/upsell-hotel-livre-blanc" variant="secondaryOnDark">
              <FileText aria-hidden className="h-4 w-4" />
              {l(c.cta.guide)}
            </DsButton>
          </div>
        </Container>
      </Section>

      {/* 4. Les moments de vente */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.moments.eyebrow)} title={l(c.moments.title)} subtitle={l(c.moments.subtitle)} align="left" />
          <ol className="relative mt-12 grid gap-5 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-accent via-accent/60 to-accent/20 md:block" />
            {c.moments.items.map((m, i) => {
              const Icon = MOMENT_ICONS[i];
              return (
                <li key={m.when.fr} className="relative flex flex-col">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-white text-accent">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.06em] text-accent">{l(m.when)}</p>
                  <p className="mt-1 text-[18px] font-semibold text-ink">{l(m.title)}</p>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-2">{l(m.text)}</p>
                  <p className="mt-4 rounded-lg bg-paper px-3 py-2 text-[13px] text-ink">
                    <span className="font-semibold">{l(c.moments.exampleLabel)}</span> {l(m.example)}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* 5. Une offre par profil */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.rules.eyebrow)} title={l(c.rules.title)} titleMuted={l(c.rules.titleMuted)} subtitle={l(c.rules.subtitle)} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {c.rules.items.map((r) => (
              <article key={r.if.fr} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8A5A1C]">{l(c.rules.ifLabel)}</p>
                <p className="mt-2 text-[16px] font-semibold text-ink">{l(r.if)}</p>
                <div aria-hidden className="my-4 flex items-center gap-2 text-accent">
                  <span className="h-px flex-1 bg-line" />
                  <ArrowRight className="h-4 w-4" />
                  <span className="h-px flex-1 bg-line" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{l(c.rules.thenLabel)}</p>
                <p className="mt-2 text-[16px] font-semibold text-ink">{l(r.then)}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{l(r.how)}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-[14.5px] text-ink-2">
            <Bot aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {l(c.rules.ai)}
          </p>
        </Container>
      </Section>

      {/* 6. Le catalogue */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.catalogue.eyebrow)} title={l(c.catalogue.title)} subtitle={l(c.catalogue.subtitle)} align="left" />
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {c.catalogue.items.map((item, i) => {
              const Icon = CATALOGUE_ICONS[i];
              return (
                <li key={item.fr} className="flex flex-col items-start gap-3 rounded-xl border border-line bg-white p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/60 text-accent">
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-[14.5px] font-semibold text-ink">{l(item)}</span>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 7. Paiement, PMS, zéro commission */}
      <Section tone="paper">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={l(c.payment.eyebrow)} title={l(c.payment.title)} align="left" />
            <ul className="mt-8 space-y-5">
              {c.payment.points.map((p, i) => {
                const Icon = [CreditCard, BadgeCheck, MessageCircle][i];
                return (
                  <li key={p.title.fr} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-accent ring-1 ring-line">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{l(p.title)}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{l(p.text)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-8 flex flex-wrap items-center gap-6">
              {PAY.map((name) => {
                const logo = integrationLogos[name];
                return logo ? (
                  <li key={name}><Image src={`/images/integrations/${logo.src}`} alt={name} width={logo.w} height={logo.h} className="h-7 w-auto object-contain opacity-80 grayscale" /></li>
                ) : null;
              })}
              <li className="text-[14px] font-semibold text-ink-2">Apaleo Pay</li>
              <li className="text-[14px] font-semibold text-ink-2">Thaïs Payment</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-8 text-white md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{l(c.payment.commission.eyebrow)}</p>
            <p className="mt-3 text-[2.5rem] font-medium leading-none tracking-[-0.03em]">100 %</p>
            <p className="mt-3 text-[18px] font-medium">{l(c.payment.commission.title)}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">{l(c.payment.commission.text)}</p>
          </div>
        </Container>
      </Section>

      {/* 8. Pilotage */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.dashboard.eyebrow)} title={l(c.dashboard.title)} subtitle={l(c.dashboard.subtitle)} align="left" />
          <ProductFrame label="app.trigger-flow.com/ventes/statistiques" className="mt-10">
            <Image src="/images/homepage/upsell-offer.webp" alt={l(c.dashboard.alt)} width={1600} height={999} sizes="(min-width: 1200px) 1200px, 100vw" className="h-auto w-full" />
          </ProductFrame>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{l(c.dashboard.caption)}</p>
        </Container>
      </Section>

      {/* 9. Témoignage */}
      <Section tone="paper">
        <Container narrow>
          <figure className="text-center">
            {clientLogos[c.quote.company] && (
              <Image src={clientLogos[c.quote.company]!.src} alt={c.quote.company} width={clientLogos[c.quote.company]!.width} height={clientLogos[c.quote.company]!.height} className="mx-auto h-12 w-auto opacity-80" />
            )}
            <blockquote className="mt-8 text-balance text-[1.5rem] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[1.875rem]"><q>{l(c.quote.text)}</q></blockquote>
            <figcaption className="mt-6 text-[15px] text-ink-2">
              <span className="font-semibold text-ink">{c.quote.name}</span>, {l(c.quote.role)}, {c.quote.company}
            </figcaption>
            <Link href="/clients/causse-comtal" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
              {l(c.quote.more)} <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </figure>
        </Container>
      </Section>

      {/* 10. Outil à part ou TriggerFlow */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <table className="w-full table-fixed border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-paper">
                  <th scope="col" className="w-[34%] px-4 py-4 md:px-6"><span className="sr-only">{l(c.compare.criteria)}</span></th>
                  <th scope="col" className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2 md:px-6">{l(c.compare.other)}</th>
                  <th scope="col" className="bg-mint/40 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-hover md:px-6">TriggerFlow</th>
                </tr>
              </thead>
              <tbody>
                {c.compare.rows.map((r) => (
                  <tr key={r.label.fr} className="border-t border-line">
                    <th scope="row" className="px-4 py-4 font-medium text-ink md:px-6">{l(r.label)}</th>
                    <td className="px-3 py-4 text-ink-2 md:px-6">
                      <span className="flex items-start gap-2"><X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />{l(r.other)}</span>
                    </td>
                    <td className="bg-mint/20 px-3 py-4 text-ink md:px-6">
                      <span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(r.us)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 11. Mise en place et tarif */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.setup.eyebrow)} title={l(c.setup.title)} align="left" />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {c.setup.steps.map((s, i) => (
              <li key={s.title.fr} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-[12px] text-accent">{i + 1}</span>
                <p className="mt-4 text-[17px] font-semibold text-ink">{l(s.title)}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{l(s.text)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">{l(c.setup.pricingLabel)}</p>
              <p className="mt-2 text-[18px] font-medium text-ink">{l(c.setup.pricing)}</p>
            </div>
            <DsButton href="/tarifs" variant="secondary">{l(c.setup.pricingCta)}</DsButton>
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

      <CtaBand title={l(c.cta.title)} text={l(c.cta.text)} primary={{ label: l(c.cta.demo), href: brand.demoPage }} secondary={{ label: l(c.cta.guide), href: '/lp/upsell-hotel-livre-blanc' }} />
    </>
  );
}
