import Image from 'next/image';
import {
  ArrowRight, BedDouble, Bell, BellRing, Building2, CalendarDays, Camera, Check, ClipboardCheck, Clock, CreditCard, Database, FileSignature,
  FileText, Filter, Gift, Globe, KeyRound, Languages, LayoutList, Link2, ListChecks, Lock, Mail, MessageCircle, MousePointerClick, Phone,
  QrCode, Repeat2, ScanLine, Send, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, Tablet, Tag, Upload, UserRound, Users, Wand2, X, Zap,
  type LucideIcon,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, PendingShot, ProductFrame, Section, SectionHeader } from '@/components/ds';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { clientLogos } from '@/data/clients';
import { stat, type StatId } from '@/data/company-stats';
import { cn } from '@/lib/utils';

export type L = { fr: string; en: string };

const ICONS = {
  arrowRight: ArrowRight, bed: BedDouble, bell: Bell, bellRing: BellRing, building: Building2, calendar: CalendarDays, camera: Camera,
  check: Check, clipboard: ClipboardCheck, clock: Clock, card: CreditCard, database: Database, signature: FileSignature, file: FileText,
  filter: Filter, gift: Gift, globe: Globe, key: KeyRound, languages: Languages, list: LayoutList, link: Link2, listChecks: ListChecks,
  lock: Lock, mail: Mail, message: MessageCircle, click: MousePointerClick, phone: Phone, qr: QrCode, repeat: Repeat2, scan: ScanLine,
  send: Send, shield: ShieldCheck, bag: ShoppingBag, smartphone: Smartphone, sparkles: Sparkles, star: Star, tablet: Tablet, tag: Tag,
  upload: Upload, user: UserRound, users: Users, wand: Wand2, zap: Zap,
} satisfies Record<string, LucideIcon>;
export type IconName = keyof typeof ICONS;

type Shot = { src: string; width: number; height: number; alt: L; label?: string; caption?: L };
/** Capture pas encore disponible : encart gris qui dit ce qu'elle montrera. */
type Pending = { pending: L; shape?: 'screen' | 'phone'; caption?: L };
type Img = Shot | Pending;
type Item = { icon?: IconName; title: L; text: L; tag?: L; href?: string };
type Tone = 'white' | 'paper' | 'dark';

export type LandingSection =
  | { type: 'cards'; tone?: Tone; eyebrow: L; title: L; titleMuted?: L; subtitle?: L; cols?: 2 | 3 | 4; items: Item[]; footnote?: L; image?: Img }
  | { type: 'split'; tone?: Tone; eyebrow: L; title: L; subtitle?: L; bullets?: L[]; steps?: { title: L; text?: L }[]; image?: Img; figure?: { value: string; label: L; source?: L }; panel?: { title: L; items: L[] }; reverse?: boolean }
  | { type: 'band'; eyebrow: L; title: L; items: Item[]; image?: Img }
  | { type: 'table'; tone?: Tone; eyebrow: L; title: L; subtitle?: L; head: L[]; rows: { label: string | L; cells: (boolean | string | L)[] }[] }
  | { type: 'image'; tone?: Tone; eyebrow: L; title: L; subtitle?: L; image: Img };

export interface DedicatedLandingContent {
  hero: { eyebrow: L; title: L; subtitle: L; bullets: L[]; image?: Img; centered?: boolean };
  proof: { label: L; clients: string[]; stat?: { key: StatId; label: L } };
  sections: LandingSection[];
  quote?: { text: L; name: string; role: L; company: string };
  compare?: { eyebrow: L; title: L; other: L; rows: { label: L; other: L; us: L }[] };
  pricing: L;
  faqTitle: L;
  faq: { q: L; a: L }[];
  cta: { title: L; text: L };
}


function IconBox({ name, dark }: { name?: IconName; dark?: boolean }) {
  if (!name) return null;
  const Icon = ICONS[name];
  return (
    <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', dark ? 'bg-white/10 text-mint' : 'bg-mint/60 text-accent')}>
      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

function Frame({ img, lang, priority, className }: { img: Img; lang: 'fr' | 'en'; priority?: boolean; className?: string }) {
  return (
    <div className={className}>
      {'pending' in img ? (
        <PendingShot label={img.pending[lang]} shape={img.shape} />
      ) : (
        <ProductFrame label={img.label ?? 'app.trigger-flow.com'}>
          <Image src={img.src} alt={img.alt[lang]} width={img.width} height={img.height} priority={priority} sizes="(min-width: 1100px) 1100px, 100vw" className="h-auto w-full" />
        </ProductFrame>
      )}
      {img.caption && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{img.caption[lang]}</p>}
    </div>
  );
}

/** Gabarit de landing produit dédiée (même langage visuel que Flows, Messagerie, Paiements, Avis). */
export function DedicatedLanding({ content: c, locale }: { content: DedicatedLandingContent; locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const l = (v: L) => v[lang];
  const tx = (v: string | L) => (typeof v === 'string' ? v : l(v));
  const demo = { fr: 'Demander une démo', en: 'Book a demo' };
  const pricing = { fr: 'Voir les tarifs', en: 'See pricing' };
  const criteria = { fr: 'Critère', en: 'Criterion' };

  return (
    <>
      {/* Hero */}
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
              <DsButton href={brand.demoPage} arrow>{l(demo)}</DsButton>
              <DsButton href="/tarifs" variant="secondary">{l(pricing)}</DsButton>
            </div>
          </div>
          {c.hero.image && <Frame lang={lang} img={c.hero.image} priority className="mx-auto mt-14 max-w-[1100px]" />}
        </Container>
      </section>

      {/* Preuves */}
      <section className="border-y border-line bg-white py-10">
        <Container className={cn('flex flex-col items-center gap-8', c.proof.stat ? 'lg:flex-row lg:justify-between' : 'lg:flex-row lg:gap-10')}>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
            <span className="font-mono text-eyebrow uppercase text-ink-3">{l(c.proof.label)}</span>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {c.proof.clients.map((n) => {
                const logo = clientLogos[n];
                return logo ? <li key={n}><Image src={logo.src} alt={n} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[130px] object-contain opacity-80" /></li> : null;
              })}
            </ul>
          </div>
          {c.proof.stat && (
            <p className="flex items-baseline gap-3">
              <span className="whitespace-nowrap text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat(c.proof.stat.key, locale)}</span>
              <span className="max-w-[260px] text-[14px] text-ink-2">{l(c.proof.stat.label)}</span>
            </p>
          )}
        </Container>
      </section>

      {c.sections.map((s, idx) => {
        const key = `${s.type}-${idx}`;
        if (s.type === 'cards') {
          const dark = s.tone === 'dark';
          const cols = s.cols ?? 3;
          return (
            <Section key={key} tone={(s.tone ?? 'white')}>
              <Container>
                <SectionHeader eyebrow={l(s.eyebrow)} title={l(s.title)} titleMuted={s.titleMuted && l(s.titleMuted)} subtitle={s.subtitle && l(s.subtitle)} align="left" onDark={dark} />
                <ul className={cn('mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2', cols === 3 && 'lg:grid-cols-3', cols === 4 && 'lg:grid-cols-4')}>
                  {s.items.map((it) => (
                    <li key={it.title.fr} className={cn('flex flex-col rounded-2xl p-6', dark ? 'bg-white/[0.06]' : 'border border-line bg-white')}>
                      <div className="flex items-start justify-between gap-3">
                        <IconBox name={it.icon} dark={dark} />
                        {it.tag && <span className="rounded-full bg-peach/60 px-2 py-0.5 text-[11px] font-semibold text-ink">{l(it.tag)}</span>}
                      </div>
                      <p className={cn('mt-4 text-[17px] font-semibold', dark ? 'text-white' : 'text-ink')}>{l(it.title)}</p>
                      <p className={cn('mt-1.5 flex-1 text-[14.5px] leading-relaxed', dark ? 'text-white/80' : 'text-ink-2')}>{l(it.text)}</p>
                      {it.href && (
                        <Link href={it.href} className={cn('mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium hover:underline', dark ? 'text-mint' : 'text-accent')}>
                          {l({ fr: 'En savoir plus', en: 'Learn more' })} <ArrowRight aria-hidden className="h-4 w-4" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                {s.footnote && <p className={cn('mt-5 text-[14px]', dark ? 'text-white/70' : 'text-ink-2')}>{l(s.footnote)}</p>}
                {s.image && <Frame lang={lang} img={s.image} className="mx-auto mt-12 max-w-[1000px]" />}
              </Container>
            </Section>
          );
        }
        if (s.type === 'band') {
          return (
            <Section key={key} tone="dark">
              <Container>
                <SectionHeader eyebrow={l(s.eyebrow)} title={l(s.title)} align="left" onDark />
                <div className={cn('mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2', s.items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
                  {s.items.map((it) => {
                    const Icon = it.icon ? ICONS[it.icon] : null;
                    return (
                      <div key={it.title.fr} className="bg-ink p-6">
                        {Icon && <Icon aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />}
                        <p className="mt-4 text-[16.5px] font-semibold text-white">{l(it.title)}</p>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/80">{l(it.text)}</p>
                      </div>
                    );
                  })}
                </div>
              {s.image && <Frame lang={lang} img={s.image} className="mx-auto mt-12 max-w-[1000px]" />}
              </Container>
            </Section>
          );
        }
        if (s.type === 'image') {
          return (
            <Section key={key} tone={(s.tone ?? 'paper')}>
              <Container>
                <SectionHeader eyebrow={l(s.eyebrow)} title={l(s.title)} subtitle={s.subtitle && l(s.subtitle)} align="left" />
                <Frame lang={lang} img={s.image} className="mt-10" />
              </Container>
            </Section>
          );
        }
        if (s.type === 'table') {
          const cell = (v: boolean | string | L) =>
            typeof v === 'boolean' ? (v ? <Check aria-label="✓" className="mx-auto h-4 w-4 text-accent" /> : <span aria-label="—" className="block text-center text-ink-3">—</span>) : <span className="block text-center">{tx(v)}</span>;
          return (
            <Section key={key} tone={(s.tone ?? 'white')}>
              <Container>
                <SectionHeader eyebrow={l(s.eyebrow)} title={l(s.title)} subtitle={s.subtitle && l(s.subtitle)} align="left" />
                <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
                  <table className="w-full min-w-[560px] border-collapse text-[14px]">
                    <thead>
                      <tr className="bg-paper font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-2">
                        {s.head.map((h, i) => <th key={h.fr} scope="col" className={cn('px-4 py-3.5', i === 0 ? 'text-left' : 'text-center')}>{l(h)}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.map((r) => (
                        <tr key={tx(r.label)} className="border-t border-line">
                          <th scope="row" className="px-4 py-3.5 text-left font-medium text-ink">{tx(r.label)}</th>
                          {r.cells.map((v, i) => <td key={i} className="px-3 py-3.5 text-ink-2">{cell(v)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Container>
            </Section>
          );
        }
        // split
        const dark = s.tone === 'dark';
        return (
          <Section key={key} tone={(s.tone ?? 'white')}>
            <Container className={cn('grid grid-cols-1 items-center gap-12', s.image ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]')}>
              <div className={cn(s.reverse && 'lg:order-2')}>
                <SectionHeader eyebrow={l(s.eyebrow)} title={l(s.title)} subtitle={s.subtitle && l(s.subtitle)} align="left" onDark={dark} />
                {s.bullets && (
                  <ul className="mt-8 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b.fr} className={cn('flex items-start gap-2 text-[15px]', dark ? 'text-white/90' : 'text-ink')}><Check aria-hidden className={cn('mt-0.5 h-4 w-4 shrink-0', dark ? 'text-mint' : 'text-accent')} />{l(b)}</li>
                    ))}
                  </ul>
                )}
                {s.steps && (
                  <ol className="mt-8 border-l border-line pl-5">
                    {s.steps.map((st) => (
                      <li key={st.title.fr} className="relative py-2.5">
                        <span aria-hidden className="absolute -left-[25px] top-4 h-2.5 w-2.5 rounded-full bg-accent" />
                        <p className={cn('text-[15.5px] font-semibold', dark ? 'text-white' : 'text-ink')}>{l(st.title)}</p>
                        {st.text && <p className={cn('mt-0.5 text-[14.5px] leading-relaxed', dark ? 'text-white/75' : 'text-ink-2')}>{l(st.text)}</p>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
              <div className={cn(s.reverse && 'lg:order-1')}>
                {s.image && <Frame lang={lang} img={s.image} />}
                {s.figure && (
                  <div className="rounded-2xl bg-ink p-8 text-white">
                    <p className="text-[4rem] font-medium leading-none tracking-[-0.04em] text-mint">{s.figure.value}</p>
                    <p className="mt-4 text-[17px] leading-relaxed text-white/90">{l(s.figure.label)}</p>
                    {s.figure.source && <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.06em] text-white/60">{l(s.figure.source)}</p>}
                  </div>
                )}
                {s.panel && (
                  <div className={cn('rounded-2xl p-6 md:p-7', dark ? 'bg-white/[0.06]' : 'border border-line bg-paper')}>
                    <p className={cn('text-[18px] font-semibold', dark ? 'text-white' : 'text-ink')}>{l(s.panel.title)}</p>
                    <ul className="mt-4 space-y-2.5">
                      {s.panel.items.map((p) => (
                        <li key={p.fr} className={cn('flex items-start gap-2 text-[14.5px]', dark ? 'text-white/85' : 'text-ink')}><Check aria-hidden className={cn('mt-0.5 h-4 w-4 shrink-0', dark ? 'text-mint' : 'text-accent')} />{l(p)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Container>
          </Section>
        );
      })}

      {c.quote && (
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
      )}

      {c.compare && (
        <Section tone="white">
          <Container>
            <SectionHeader eyebrow={l(c.compare.eyebrow)} title={l(c.compare.title)} align="left" />
            <div className="mt-10 overflow-hidden rounded-2xl border border-line">
              <table className="w-full table-fixed border-collapse text-left text-[14px]">
                <thead>
                  <tr className="bg-paper">
                    <th scope="col" className="w-[24%] px-4 py-4 md:px-6"><span className="sr-only">{l(criteria)}</span></th>
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
      )}

      <Section tone="paper" compact>
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[18px] font-medium text-ink">{l(c.pricing)}</p>
            <DsButton href="/tarifs" variant="secondary">{l(pricing)}</DsButton>
          </div>
          <PricingReassurance className="mt-6" />
        </Container>
      </Section>

      <Section tone="white">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={l(c.faqTitle)} align="left" />
          <div className="mt-10">
            <FaqList items={c.faq.map((f) => ({ question: l(f.q), answer: l(f.a) }))} />
          </div>
        </Container>
      </Section>

      <CtaBand title={l(c.cta.title)} text={l(c.cta.text)} primary={{ label: l(demo), href: brand.demoPage }} secondary={{ label: l(pricing), href: '/tarifs' }} />
    </>
  );
}
