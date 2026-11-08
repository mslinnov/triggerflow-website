import { clientLogos } from '@/data/clients';
import { integrationLogos } from '@/data/integration-logos';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { productScreenshots } from '@/content/products/screenshots';
import {
  BarChart3, BedDouble, Bell, Calendar, ClipboardList, Clock, CreditCard, Filter, Layers, Link2, Lock, Mail,
  MessageSquare, Package, Receipt, RefreshCw, Repeat, Shield, Sparkles, Users, Workflow, Zap, ArrowRight, Phone, Mic, Globe, Moon, BadgeCheck, type LucideIcon,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, FeatureItem, ProductFrame, ProofStat, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { UpsellScenario, FlowTreeScenario, PayScenario, VoiceScenario, InboxScenario, ReviewsScenario, FormsScenario, LoyaltyScenario, DedupScenario, CampaignScenario, GuestAppScenario, EventsScenario, B2bScenario, CheckinScenario, HousekeepingScenario, KeysScenario, AnalyticsScenario, BookingScenario } from '@/components/visuals';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { stat } from '@/data/company-stats';
import { getAddonPricingPhase, getDisplayAddons } from '@/data/pricing';
import { FromPriceStar } from '@/components/pricing/FromPriceStar';
import type { IconKey } from '@/content/products/types';

/** Clients TriggerFlow affichés quand le module n'a pas encore de client cité (libellé « Ils ont choisi TriggerFlow »). */
const FALLBACK_CLIENTS = ['Saint James Paris', 'Groupe Noemys', 'AMMI Hôtels', 'Edgar Hôtel & Spa', 'Sezz Saint-Tropez'];
import type { ProductLanding, L } from '@/content/products';

const ICONS: Record<IconKey, LucideIcon> = {
  sparkles: Sparkles, users: Users, mail: Mail, creditCard: CreditCard, clipboard: ClipboardList, bed: BedDouble,
  package: Package, barChart: BarChart3, workflow: Workflow, filter: Filter, clock: Clock, zap: Zap,
  messageSquare: MessageSquare, refresh: RefreshCw, shield: Shield, link: Link2, bell: Bell, repeat: Repeat,
  calendar: Calendar, layers: Layers, lock: Lock, receipt: Receipt, phone: Phone, mic: Mic, globe: Globe, moon: Moon,
};

const VISUALS = { upsell: UpsellScenario, flows: FlowTreeScenario, pay: PayScenario, voice: VoiceScenario, inbox: InboxScenario, reviews: ReviewsScenario, forms: FormsScenario, loyalty: LoyaltyScenario, crm: DedupScenario, campaign: CampaignScenario, guestApp: GuestAppScenario, events: EventsScenario, b2b: B2bScenario, checkin: CheckinScenario, housekeeping: HousekeepingScenario, keys: KeysScenario, analytics: AnalyticsScenario, booking: BookingScenario };

/** Gabarit des landings produit (13 blocs, docs/wireframes.md). Contenu : src/content/products. */
export async function ProductLandingPage({ product, locale }: { product: ProductLanding; locale: string }) {
  const lang = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en';
  const l = (v: L | string) => (typeof v === 'string' ? v : v[lang]);
  const t = await getTranslations({ locale, namespace: 'productPage' });
  const th = await getTranslations({ locale, namespace: 'home2' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const shot = productScreenshots[product.slug];
  const Visual = VISUALS[product.hero.visual];
  const addon = product.pricing.addon ? getDisplayAddons(getAddonPricingPhase()).find((a) => a.key === product.pricing.addon) : undefined;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{l(product.name)}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{l(product.hero.title)}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{l(product.hero.subtitle)}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DsButton href={brand.demoPage} arrow className="w-full sm:w-auto">{nav('startFree')}</DsButton>
              <DsButton href="#comment" variant="secondary" className="w-full sm:w-auto">{t('seeHow')}</DsButton>
            </div>
            <TrustStrip className="mt-7" />
          </div>
          <ProductFrame className="mx-auto mt-14 max-w-[980px]" label={`app.trigger-flow.com/${product.slug}`}>
            <div className={product.hero.visual === 'flows' ? 'bg-[radial-gradient(#E4E8E7_1px,transparent_1px)] [background-size:16px_16px]' : 'bg-paper/40'}>
              <Visual />
            </div>
          </ProductFrame>
        </Container>
      </section>

      {/* 2. Preuves : clients du module (logos), sinon une sélection de clients TriggerFlow ; chiffre mesuré si disponible */}
      <section className="border-y border-line bg-white py-10 md:py-12">
        <Container className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
            <span className="shrink-0 font-mono text-eyebrow uppercase text-ink-3">
              {product.proof.clients.length > 0 ? t('usedBy') : t('chosenBy')}
            </span>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
              {(product.proof.clients.length > 0 ? product.proof.clients : FALLBACK_CLIENTS).map((c) => {
                const logo = clientLogos[c as keyof typeof clientLogos];
                return (
                  <li key={c} className="flex h-10 items-center">
                    {logo ? (
                      <Image src={logo.src} alt={c} width={logo.width} height={logo.height} className="h-8 w-auto max-w-[130px] object-contain opacity-80" />
                    ) : (
                      <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink/70">{c}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {product.proof.stat && product.proof.statLabel && (
            <p className="flex items-baseline gap-3 text-center lg:text-right">
              <span className="text-[2rem] font-medium tabular-nums tracking-[-0.03em] text-ink">{stat(product.proof.stat, locale)}</span>
              <span className="max-w-[260px] text-[14px] text-ink-2">{l(product.proof.statLabel)}</span>
            </p>
          )}
        </Container>
      </section>

      {/* 3. Problème */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('problem')} title={l(product.problem.title)} align="left" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {product.problem.items.map((item, i) => (
              <li key={i} className="rounded-xl border border-line bg-white p-7">
                <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
                <p className="mt-4 text-[16px] leading-relaxed text-ink">{l(item)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Comment ça marche */}
      <Section tone="white" id="comment">
        <Container>
          <SectionHeader eyebrow={t('how')} title={l(product.how.title)} align="left" />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {product.how.steps.map((s, i) => (
              <li key={i} className="bg-white p-7">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-[13px] text-white">{i + 1}</span>
                <p className="mt-6 text-h3 font-medium text-ink">{l(s.title)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{l(s.text)}</p>
              </li>
            ))}
          </ol>
          {shot && (
            <figure className="mt-12">
              <ProductFrame className="mx-auto max-w-[1080px]" label={`app.trigger-flow.com/${product.slug}`}>
                <Image src={shot.src} alt={l(shot.alt)} width={shot.width} height={shot.height} sizes="(min-width: 1080px) 1080px, 100vw" className="h-auto w-full" />
              </ProductFrame>
              <figcaption className="mt-3 text-center font-mono text-[12px] uppercase tracking-[0.06em] text-ink-3">{t('realScreenshot')}</figcaption>
            </figure>
          )}
        </Container>
      </Section>

      {/* 5. Fonctionnalités */}
      <Section tone="paper">
        <Container>
          <SectionHeader eyebrow={t('features')} title={l(product.features.title)} align="left" />
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.items.map((f, i) => (
              <FeatureItem key={i} icon={ICONS[f.icon]} title={l(f.title)}>{l(f.text)}</FeatureItem>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Taillé pour votre hôtel */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={t('tailored')} title={l(product.tailored.title)} align="left" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {product.tailored.items.map((ex, i) => (
              <figure key={i} className="rounded-xl border border-line bg-paper p-7">
                <figcaption className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent">{l(ex.client)}</figcaption>
                <p className="mt-4 text-[16px] leading-relaxed text-ink">{l(ex.text)}</p>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Cas client (vrai client uniquement) */}
      {product.caseStudy && (
        <Section tone="paper">
          <Container narrow className="text-center">
            <Eyebrow>{t('caseStudy')}</Eyebrow>
            <blockquote className="mt-8 text-balance text-[1.5rem] font-medium leading-[1.35] tracking-[-0.015em] text-ink md:text-[2rem]">
              « {l(product.caseStudy.quote)} »
            </blockquote>
            <p className="mt-8 text-[15px] font-semibold text-ink">{product.caseStudy.name}</p>
            <p className="text-[14px] text-ink-3">{l(product.caseStudy.role)}, {product.caseStudy.company}</p>
            {product.caseStudy.href && (
              <DsButton href={product.caseStudy.href} variant="link" arrow className="mt-6">{t('readCase')}</DsButton>
            )}
          </Container>
        </Section>
      )}

      {/* 8. Intégrations */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={t('integrations')} title={l(product.integrations.title)} subtitle={l(product.integrations.text)} align="left" />
          <ul className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-6">
            {[...brand.pms, ...(product.integrations.extra ?? [])].map((name) => {
              const logo = integrationLogos[name];
              return (
                <li key={name} className="flex h-20 items-center justify-center border-b border-r border-line px-4">
                  {logo && logo.w / logo.h >= 1.6 ? (
                    <Image src={`/images/integrations/${logo.src}`} alt={name} width={logo.w} height={logo.h} className="h-6 w-auto max-w-[110px] object-contain opacity-80 grayscale" />
                  ) : (
                    <span className="flex items-center gap-2 text-[14px] font-semibold text-ink-2">
                      {logo && <Image src={`/images/integrations/${logo.src}`} alt="" width={logo.w} height={logo.h} className="h-6 w-6 object-contain grayscale" />}
                      {name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mint/60 px-3 py-2 text-[13.5px] font-medium text-accent-hover">
            <BadgeCheck aria-hidden className="h-4 w-4 shrink-0" />
            {th('integrations.free')}
          </p>
          <DsButton href="/integrations" variant="link" arrow className="mt-4 flex">{t('allIntegrations')}</DsButton>
        </Container>
      </Section>

      {/* 9. Fiabilité et sécurité */}
      <section className="bg-ink py-14 text-white md:py-16">
        <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {product.reliability ? (
            <ProofStat value={stat(product.reliability.stat, locale)} label={l(product.reliability.label)} source={product.reliability.stat === 'messages' ? undefined : t('source')} onDark />
          ) : (
            <p className="max-w-md text-h3 font-medium">{t('trustLine')}</p>
          )}
          <TrustStrip onDark align="left" />
        </Container>
      </section>

      {/* 10. Modules liés */}
      <Section tone="white">
        <Container>
          <SectionHeader eyebrow={t('related')} title={t('relatedTitle')} align="left" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {product.related.map((r) => (
              <Link key={r.slug} href={r.href} className="group rounded-xl border border-line p-7 transition-colors hover:border-accent">
                <p className="flex items-center justify-between text-lg font-semibold text-ink">
                  {l(r.name)}
                  <ArrowRight aria-hidden className="h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                </p>
                <p className="mt-2 text-[15px] text-ink-2">{l(r.text)}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11. Tarif */}
      <Section tone="paper" compact>
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow>{t('pricing')}</Eyebrow>
            <p className="mt-3 text-h3 font-medium text-ink">{l(product.pricing.text)}</p>
            {addon && (
              <p className="mt-2 text-[15px] text-ink-2">
                {addon.from ? (
                  <>
                    {addon.price} €<FromPriceStar label={t('addonFromTooltip')} /> {t('addonUnit')}
                  </>
                ) : (
                  t('addonPrice', { price: addon.price })
                )}
              </p>
            )}
          </div>
          <DsButton href="/tarifs" variant="secondary">{t('seePricing')}</DsButton>
        </Container>
        <Container>
          <PricingReassurance className="mt-8" />
        </Container>
      </Section>

      {/* 12. FAQ */}
      <Section tone="white">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={t('faqTitle')} align="left" />
          <div className="mt-10">
            <FaqList items={product.faq.map((f) => ({ question: l(f.q), answer: l(f.a) }))} />
          </div>
        </Container>
      </Section>

      {/* 13. CTA */}
      <CtaBand
        title={l(product.cta.title)}
        text={t('ctaText')}
        primary={{ label: nav('startFree'), href: brand.demoPage }}
        secondary={{ label: t('seePricing'), href: '/tarifs' }}
      />
    </>
  );
}
