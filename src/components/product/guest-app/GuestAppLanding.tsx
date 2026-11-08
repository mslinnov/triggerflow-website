import Image from 'next/image';
import {
  ArrowRight, BedDouble, CalendarDays, Check, Gift, Info, Link2, MessageCircle, Phone, QrCode, ShoppingBag, Sparkles, UtensilsCrossed, X,
  MousePointerClick, Languages, Building2, Wand2,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { guestAppLanding as c } from '@/content/products/guest-app-landing';

const ACCESS_ICONS = [Link2, QrCode, BedDouble];
const INSIDE_ICONS: Record<string, typeof Info> = { info: Info, dining: UtensilsCrossed, spa: Sparkles, order: ShoppingBag, agenda: CalendarDays, chat: MessageCircle, loyalty: Gift, contact: Phone };
const EDITOR_ICONS = [MousePointerClick, Wand2, Languages, Building2];

/** Landing dédiée App client (webapp Utelys connectée à TriggerFlow). Benchmark Duve, Welcom, Canary, 08/11/2026. */
export function GuestAppLanding({ locale }: { locale: string }) {
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
                <li key={b.fr} className="flex items-start gap-2 text-[15px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(b)}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DsButton href={brand.demoPage} arrow>{l(c.cta.demo)}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[640px] items-end justify-center">
            {c.hero.shots.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={l(c.hero.alt).replace('{name}', s.name)}
                width={600}
                height={1231}
                priority={i === 1}
                sizes="(min-width: 1024px) 220px, 32vw"
                className={i === 1 ? 'relative z-10 w-[40%] drop-shadow-2xl' : 'w-[34%] opacity-95 drop-shadow-xl ' + (i === 0 ? '-mr-[4%] mb-6' : '-ml-[4%] mb-6')}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Preuves */}
      <section className="border-y border-line bg-white py-10">
        <Container className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <span className="font-mono text-eyebrow uppercase text-ink-3">{l(c.proof.label)}</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {c.proof.clients.map((name) => {
              const logo = clientLogos[name];
              return logo ? <li key={name}><Image src={logo.src} alt={name} width={logo.width} height={logo.height} className="h-9 w-auto max-w-[140px] object-contain opacity-80" /></li> : null;
            })}
          </ul>
        </Container>
      </section>

      {/* 3. Accès */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.access.eyebrow)} title={l(c.access.title)} titleMuted={l(c.access.titleMuted)} align="left" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.access.items.map((it, i) => {
              const Icon = ACCESS_ICONS[i];
              return (
                <article key={it.title.fr} className="rounded-2xl border border-line bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                  <h3 className="mt-4 text-[18px] font-semibold text-ink">{l(it.title)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{l(it.text)}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Contenu */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.inside.eyebrow)} title={l(c.inside.title)} align="left" />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.inside.items.map((it) => {
              const Icon = INSIDE_ICONS[it.key];
              return (
                <li key={it.key} className="rounded-2xl border border-line bg-white p-5">
                  <Icon aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  <p className="mt-3 text-[16px] font-semibold text-ink">{l(it.title)}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{l(it.text)}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 5. Personnalisée */}
      <Section tone="white">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeader eyebrow={l(c.personal.eyebrow)} title={l(c.personal.title)} align="left" />
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-2">{l(c.personal.text)}</p>
          </div>
          <div className="mx-auto w-full max-w-[340px] rounded-[2rem] border border-line bg-paper p-4 shadow-sm">
            <div className="rounded-[1.5rem] bg-white p-5">
              <p className="text-[22px] font-medium tracking-[-0.02em] text-ink">{l(c.personal.greeting)}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{l(c.personal.stay)}</p>
              <ul className="mt-5 space-y-2.5">
                {c.personal.blocks.map((b, i) => (
                  <li key={b.fr} className={i === 1 ? 'rounded-xl bg-mint/50 px-3.5 py-3 text-[14px] font-medium text-accent-hover' : 'rounded-xl border border-line px-3.5 py-3 text-[14px] text-ink'}>{l(b)}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Connectée à TriggerFlow */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.connected.eyebrow)} title={l(c.connected.title)} align="left" onDark />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {c.connected.items.map((it) => (
              <div key={it.title.fr} className="flex flex-col bg-ink p-6">
                <p className="text-[17px] font-semibold text-white">{l(it.title)}</p>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-white/80">{l(it.text)}</p>
                <Link href={it.href} className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-mint hover:underline">
                  {l(c.connected.more)} {l(it.title).toLowerCase()} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Éditeur + marque */}
      <Section tone="white">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeader eyebrow={l(c.editor.eyebrow)} title={l(c.editor.title)} align="left" />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {c.editor.items.map((it, i) => {
                const Icon = EDITOR_ICONS[i];
                return (
                  <li key={it.title.fr} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{l(it.title)}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{l(it.text)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-6 md:p-7">
            <Eyebrow>{l(c.brand.eyebrow)}</Eyebrow>
            <p className="mt-3 text-[22px] font-medium leading-snug tracking-[-0.02em] text-ink">{l(c.brand.title)}</p>
            <ul className="mt-5 space-y-2.5">
              {c.brand.items.map((b) => (
                <li key={b.fr} className="flex items-start gap-2 text-[14.5px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(b)}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 8. Témoignages */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {c.quotes.map((q) => {
              const logo = clientLogos[q.company];
              return (
                <figure key={q.name} className="flex flex-col rounded-2xl border border-line bg-white p-7">
                  <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">« {l(q.text)} »</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {logo && <Image src={logo.src} alt={q.company} width={logo.width} height={logo.height} className="h-9 w-auto max-w-[90px] object-contain opacity-80" />}
                    <span className="text-[14px] text-ink-2"><span className="font-semibold text-ink">{q.name}</span>, {l(q.role)}, {q.company}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 9. Comparatif */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] table-fixed border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-paper">
                  <th scope="col" className="w-[20%] px-4 py-4 md:px-6"><span className="sr-only">{l(c.compare.criteria)}</span></th>
                  <th scope="col" className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2 md:px-5">{l(c.compare.paper)}</th>
                  <th scope="col" className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2 md:px-5">{l(c.compare.store)}</th>
                  <th scope="col" className="bg-mint/40 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-hover md:px-5">TriggerFlow</th>
                </tr>
              </thead>
              <tbody>
                {c.compare.rows.map((r) => (
                  <tr key={r.label.fr} className="border-t border-line">
                    <th scope="row" className="px-4 py-4 font-medium text-ink md:px-6">{l(r.label)}</th>
                    <td className="px-3 py-4 text-ink-2 md:px-5"><span className="flex items-start gap-2"><X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />{l(r.paper)}</span></td>
                    <td className="px-3 py-4 text-ink-2 md:px-5"><span className="flex items-start gap-2"><X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />{l(r.store)}</span></td>
                    <td className="bg-mint/20 px-3 py-4 text-ink md:px-5"><span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(r.us)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 10. Tarif et réassurance */}
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
