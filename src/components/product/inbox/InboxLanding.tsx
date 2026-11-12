import Image from 'next/image';
import {
  AlertTriangle, ArrowRightLeft, Bell, Bot, Briefcase, Check, Folder, Forward, Globe, Languages, Mail, MessageCircle, MessageSquareText,
  MessagesSquare, Phone, PhoneCall, Smartphone, Sparkles, StickyNote, UserPlus, UserCheck, Users, X, Filter, Zap, Star,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, PendingShot, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { stat } from '@/data/company-stats';
import { inboxLanding as c } from '@/content/products/inbox-landing';
import { cn } from '@/lib/utils';

const CHANNEL_ICONS: Record<string, typeof Mail> = { email: Mail, whatsapp: MessageCircle, sms: MessageSquareText, chat: Globe, calls: Phone, meta: MessagesSquare, ota: Zap };
const TEAM_ICONS = [UserCheck, Folder, Filter, StickyNote, Zap, Users];
const ACTION_ICONS: Record<string, typeof Mail> = { emailAi: Sparkles, pipeline: Briefcase, newGuest: UserPlus, move: ArrowRightLeft, forward: Forward, errors: AlertTriangle };

/** Landing dédiée Messagerie (benchmark Duve, HiJiffy, Bookboost, Canary et audit du code, 08/11/2026). */
export function InboxLanding({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const l = (v: { fr: string; en: string }) => v[lang];

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
                <li key={b.fr} className="flex items-start gap-2 text-left text-[15px] text-ink">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {l(b)}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <DsButton href={brand.demoPage} arrow>{l(c.cta.demo)}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
            </div>
          </div>
          <ProductFrame label="app.trigger-flow.com/messagerie" className="mx-auto mt-14 max-w-[1100px]">
            <Image src="/images/app/inbox-thread.webp" alt={l(c.hero.alt)} width={1448} height={840} priority sizes="(min-width: 1100px) 1100px, 100vw" className="h-auto w-full" />
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
            <span className="whitespace-nowrap text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat('whatsappRead', locale)}</span>
            <span className="max-w-[260px] text-[14px] text-ink-2">{l(c.proof.stat)}</span>
          </p>
        </Container>
      </section>

      {/* 3. Canaux */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.channels.eyebrow)} title={l(c.channels.title)} align="left" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.channels.items.map((ch) => {
              const Icon = CHANNEL_ICONS[ch.key];
              return (
                <li key={ch.key} className={cn('flex flex-col rounded-2xl border bg-white p-5', ch.status ? 'border-dashed border-line' : 'border-line')}>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                    {ch.status === 'beta' && <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-ink-2">{l(c.channels.beta)}</span>}
                    {ch.status === 'soon' && <span className="rounded-full bg-peach/60 px-2 py-0.5 text-[11px] font-semibold text-ink">{l(c.channels.soon)}</span>}
                  </div>
                  <p className="mt-4 text-[16px] font-semibold text-ink">{l(ch.name)}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{l(ch.text)}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 4. Contexte */}
      <Section tone="paper">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <SectionHeader eyebrow={l(c.context.eyebrow)} title={l(c.context.title)} subtitle={l(c.context.subtitle)} align="left" />
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {c.context.items.map((it) => (
                <li key={it.fr} className="flex items-start gap-2 text-[15px] text-ink"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(it)}</li>
              ))}
            </ul>
          </div>
          <ProductFrame label="app.trigger-flow.com/messagerie">
            <Image src="/images/homepage/hub-inbox.webp" alt={l(c.context.alt)} width={1600} height={999} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
          </ProductFrame>
        </Container>
      </Section>

      {/* 4b. Une journée à la réception */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.day.eyebrow)} title={l(c.day.title)} align="left" />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {c.day.items.map((d) => (
              <li key={d.time} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <p className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                  <span className="text-[15px] font-medium tracking-normal text-ink">{d.time}</span>
                  {typeof d.channel === 'string' ? d.channel : l(d.channel)}
                </p>
                <p className="mt-4 text-[16px] font-semibold leading-snug text-ink">{l(d.title)}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{l(d.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5. Équipe */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={l(c.team.eyebrow)} title={l(c.team.title)} align="left" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.team.items.map((it, i) => {
              const Icon = TEAM_ICONS[i];
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
        </Container>
      </Section>

      {/* 5b. Agir depuis la conversation */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.actions.eyebrow)} title={l(c.actions.title)} subtitle={l(c.actions.subtitle)} align="left" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.actions.items.map((it) => {
              const Icon = ACTION_ICONS[it.key];
              return (
                <li key={it.key} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                    {it.tag && <span className="rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-ink-2">{l(it.tag)}</span>}
                  </div>
                  <p className="mt-4 text-[16px] font-semibold text-ink">{l(it.title)}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{l(it.text)}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 6. Langues + agent IA */}
      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow={l(c.language.eyebrow)} title={l(c.language.title)} align="left" onDark />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.language.items.map((it) => (
              <div key={it.title.fr} className="flex gap-4 rounded-2xl bg-white/[0.06] p-6">
                <Languages aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                <div>
                  <p className="text-[16px] font-semibold">{l(it.title)}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-white/80">{l(it.text)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-mint"><Bot aria-hidden className="h-4 w-4" />{l(c.agent.eyebrow)}</p>
              <h2 className="mt-4 text-balance text-[1.875rem] font-medium leading-[1.15] tracking-[-0.02em] text-white md:text-h2">{l(c.agent.title)}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/85">{l(c.agent.text)}</p>
              <p className="mt-6 text-[14px] font-semibold text-white">{l(c.agent.handoverTitle)}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {c.agent.handover.map((h) => (
                  <li key={h.fr} className="flex items-start gap-2 text-[14px] text-white/85"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-mint" />{l(h)}</li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-relaxed text-white/70">{l(c.agent.modes)}</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.06] p-5">
                <p className="text-center font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/60">WhatsApp · 02:14</p>
                <p className="mt-3 max-w-[85%] rounded-xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-[14px] text-white">{c.agent.question}</p>
                <p className="ml-auto mt-3 max-w-[85%] rounded-xl rounded-tr-sm bg-mint px-3.5 py-2.5 text-[14px] text-ink">
                  {c.agent.answer}
                  <span className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.04em] text-accent-hover"><Languages aria-hidden className="h-3 w-3" />{l(c.agent.meta)}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
                {c.aiFigures.map((f) => (
                  <div key={f.value} className="bg-ink p-5">
                    <p className="text-[2rem] font-medium leading-none tracking-[-0.03em] text-mint">{f.value}</p>
                    <p className="mt-2 text-[13.5px] leading-snug text-white/80">{l(f.label)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ProductFrame label="app.trigger-flow.com/messagerie" className="mx-auto mt-14 max-w-[1000px]">
            <Image src="/images/homepage/chatbot-ia.webp" alt={l(c.agent.alt)} width={1600} height={999} sizes="(min-width: 1000px) 1000px, 100vw" className="h-auto w-full" />
          </ProductFrame>
        </Container>
      </Section>

      {/* 7. Partout */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={l(c.everywhere.eyebrow)} title={l(c.everywhere.title)} align="left" />
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_280px]">
            <ul className="grid gap-4">
              {c.everywhere.items.map((it, i) => {
                const Icon = [Smartphone, Bell, PhoneCall][i];
                return (
                  <li key={it.title.fr} className="flex gap-4 rounded-2xl border border-line bg-white p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/60 text-accent"><Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} /></span>
                    <div>
                      <p className="text-[17px] font-semibold text-ink">{l(it.title)}</p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{l(it.text)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <PendingShot shape="phone" label={l(c.everywhere.pending)} />
          </div>
          <figure className="mt-10 flex flex-col gap-2 rounded-2xl border border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
            <span className="flex gap-0.5 text-peach" role="img" aria-label="5/5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden className="h-4 w-4 fill-current" />)}</span>
            <blockquote className="text-[15px] text-ink"><q>{l(c.quote.text)}</q></blockquote>
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3 sm:ml-auto">{l(c.quote.source)}</figcaption>
          </figure>
        </Container>
      </Section>

      {/* 8. Comparatif */}
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
                    <td className="px-3 py-4 text-ink-2 md:px-6"><span className="flex items-start gap-2"><X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" />{l(r.other)}</span></td>
                    <td className="bg-mint/20 px-3 py-4 text-ink md:px-6"><span className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{l(r.us)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* 9. Tarif et réassurance */}
      <Section tone="white" compact>
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[18px] font-medium text-ink">{l(c.pricing)}</p>
            <DsButton href="/tarifs" variant="secondary">{l(c.cta.pricing)}</DsButton>
          </div>
          <PricingReassurance className="mt-6" />
        </Container>
      </Section>

      {/* 10. FAQ */}
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
