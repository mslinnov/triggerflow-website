import Image from 'next/image';
import { Check, CreditCard, Lock, Minus, Receipt, ShieldCheck, Undo2, Unlock, BellRing, Clock, Zap, Wallet } from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { stat } from '@/data/company-stats';
import { payLanding as c } from '@/content/products/pay-landing';

const TYPE_ICONS = [CreditCard, Lock, Wallet];
const HOLD_ICONS = [Receipt, Unlock, BellRing, Undo2];

/** Landing dédiée Paiements (benchmark Canary, Mews, Duve, Welcom et audit du code, 08/11/2026). */
export function PayLanding({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const l = (v: { fr: string; en: string }) => v[lang];
  const yes = <Check aria-label="✓" className="mx-auto h-4 w-4 text-accent" />;
  const no = <Minus aria-label="—" className="mx-auto h-4 w-4 text-ink-3" />;

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
          <ProductFrame label="app.trigger-flow.com/paiements" className="mx-auto mt-14 max-w-[1100px]">
            <Image src="/images/app/payments.webp" alt={l(c.hero.alt)} width={1448} height={820} priority sizes="(min-width: 1100px) 1100px, 100vw" className="h-auto w-full" />
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
                return logo ? <li key={name}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[130px] object-contain opacity-80" /></li> : null;
              })}
            </ul>
          </div>
          <p className="flex items-baseline gap-3">
            <span className="whitespace-nowrap text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat('paidWithin2h', locale)}</span>
            <span className="max-w-[260px] text-[14px] text-ink-2">{l(c.proof.stat)}</span>
          </p>
        </Container>
      </section>

      {/* 3. Trois façons d'encaisser */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.types.eyebrow)} title={l(c.types.title)} titleMuted={l(c.types.titleMuted)} align="left" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.types.items.map((t, i) => {
              const Icon = TYPE_ICONS[i];
              return (
                <article key={t.title.fr} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                  <h3 className="mt-4 text-[19px] font-semibold text-ink">{l(t.title)}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-2">{l(t.text)}</p>
                  <p className="mt-4 rounded-lg bg-paper px-3 py-2 font-mono text-[12px] uppercase tracking-[0.04em] text-ink">{l(t.example)}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Le bon montant */}
      <Section tone="paper">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeader eyebrow={l(c.amount.eyebrow)} title={l(c.amount.title)} subtitle={l(c.amount.subtitle)} align="left" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.amount.modes.map((m) => (
                <li key={m.title.fr} className="rounded-xl border border-line bg-white p-4">
                  <p className="text-[15.5px] font-semibold text-ink">{l(m.title)}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{l(m.text)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[14.5px] text-ink-2">
              <span className="font-semibold text-ink">{l(c.amount.optionsTitle)}</span> {c.amount.options.map((o) => l(o)).join(' · ')}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[400px] rounded-2xl border border-line bg-white p-6 shadow-sm">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{l(c.amount.example.label)}</p>
            <dl className="mt-4 divide-y divide-line">
              {c.amount.example.rows.map((r) => (
                <div key={r.value} className="flex justify-between py-3 text-[15px]">
                  <dt className="text-ink-2">{l(r.label)}</dt>
                  <dd className="tabular-nums text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 flex items-center justify-between rounded-xl bg-mint/50 px-4 py-3.5">
              <span className="text-[14.5px] font-semibold text-accent-hover">{l(c.amount.example.total)}</span>
              <span className="text-[20px] font-medium tabular-nums text-ink">{c.amount.example.totalValue}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Le bon moment */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.timing.eyebrow)} title={l(c.timing.title)} subtitle={l(c.timing.subtitle)} align="left" />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
            {c.timing.steps.map((s, i) => (
              <li key={s.when.fr} className="bg-white p-6">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                  {i < 2 ? <Clock aria-hidden className="h-3.5 w-3.5" /> : <Zap aria-hidden className="h-3.5 w-3.5" />}
                  {l(s.when)}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{l(s.what)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[14.5px] text-ink-2">{l(c.timing.expiry)}</p>
        </Container>
      </Section>

      {/* 6. Cautions */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.holds.eyebrow)} title={l(c.holds.title)} align="left" onDark />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.holds.items.map((h, i) => {
              const Icon = HOLD_ICONS[i];
              return (
                <div key={h.title.fr} className="bg-ink p-6">
                  <Icon aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                  <p className="mt-4 text-[16.5px] font-semibold text-white">{l(h.title)}</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/80">{l(h.text)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 7. Prestataires */}
      <Section tone="white">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader eyebrow={l(c.providers.eyebrow)} title={l(c.providers.title)} subtitle={l(c.providers.subtitle)} align="left" />
            <p className="mt-6 text-[14.5px] leading-relaxed text-ink-2">{l(c.providers.wallets)}</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{l(c.providers.pms)}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[460px] border-collapse text-[14px]">
              <thead>
                <tr className="bg-paper font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-2">
                  <th scope="col" className="px-4 py-3.5 text-left">{l(c.providers.cols.provider)}</th>
                  {(['payment', 'hold', 'imprint', 'refund'] as const).map((k) => <th key={k} scope="col" className="px-2 py-3.5 text-center">{l(c.providers.cols[k])}</th>)}
                </tr>
              </thead>
              <tbody>
                {c.providers.rows.map((r) => (
                  <tr key={r.name} className="border-t border-line">
                    <th scope="row" className="px-4 py-3.5 text-left font-medium text-ink">{r.name}</th>
                    <td className="px-2 py-3.5">{yes}</td>
                    <td className="px-2 py-3.5">{r.all ? yes : no}</td>
                    <td className="px-2 py-3.5">{r.all ? yes : no}</td>
                    <td className="px-2 py-3.5">{r.all ? yes : no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 8. Suivi + sécurité */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.tracking.eyebrow)} title={l(c.tracking.title)} align="left" />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.tracking.items.map((t) => (
              <li key={t.fr} className="flex items-start gap-2 text-[15px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(t)}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-5 rounded-2xl border border-line bg-white p-6 md:grid-cols-[auto_1fr] md:items-start md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint/60 text-accent"><ShieldCheck aria-hidden className="h-6 w-6" /></span>
            <div>
              <p className="text-[19px] font-semibold text-ink">{l(c.security.title)}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {c.security.items.map((s) => (
                  <li key={s.fr} className="flex items-start gap-2 text-[14.5px] text-ink-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(s)}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. Témoignage */}
      <Section tone="white">
        <Container narrow>
          <figure className="text-center">
            <blockquote className="text-balance text-[1.5rem] font-medium leading-snug tracking-[-0.015em] text-ink md:text-[1.75rem]">« {l(c.quote.text)} »</blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              {clientLogos[c.quote.company] && (
                <Image src={clientLogos[c.quote.company]!.src} alt={c.quote.company} width={clientLogos[c.quote.company]!.width} height={clientLogos[c.quote.company]!.height} className="h-10 w-auto max-w-[90px] object-contain opacity-80" />
              )}
              <span className="text-[14.5px] text-ink-2"><span className="font-semibold text-ink">{c.quote.name}</span>, {l(c.quote.role)}, {c.quote.company}</span>
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* 10. Comparatif */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
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
                    <td className="px-3 py-4 text-ink-2 md:px-6">{l(r.other)}</td>
                    <td className="bg-mint/20 px-3 py-4 text-ink md:px-6"><span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(r.us)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 11. Tarif */}
      <Section tone="white" compact>
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
