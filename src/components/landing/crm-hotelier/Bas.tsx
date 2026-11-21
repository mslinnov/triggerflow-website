/*
 * Le bas de la page d'atterrissage CRM hôtelier, sur fonds clairs et sans animation (skill de marque) : PMS
 * connectés, cas clients, tarifs, questions, rappel et appel final, pied de page. Titres de la voix du récit (500,
 * serrés), chiffres en condensé, filets plutôt que cartes ; prix lus dans pricing.ts, comme /tarifs.
 */

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Plus } from 'lucide-react';
import { getDisplayPlans, getPricingPhase } from '@/data/pricing';
import { homeTestimonials as clientQuotes } from '@/data/clients';
import { applyBrandValues } from '@/i18n/brand-values';
import { getCaseStudyBySlug } from '@/lib/case-studies';
import { landingPageValues } from '@/lib/landing-pages';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';
import { LPCTA } from '@/components/landing/shared/LPCTA';
import { LPFooter } from '@/components/landing/shared/LPFooter';
import { pmsLogos } from '@/components/landing/shared/LPIntegrations';
import { lpLinkProps } from '@/components/landing/shared/lp-links';
import { ETUDES } from './etudes';
import { RAPPEL, SOURCE_RAPPEL, demoHref } from './liens';

const BOITE = 'mx-auto max-w-[1240px] px-4 lg:px-8';
/** Le titre de section : la même voix que les titres du récit. */
const TITRE = 'text-balance text-[29px] font-medium leading-[1.1] tracking-[-0.03em] text-ink lg:text-[46px] lg:leading-[1.06]';
const CONDENSE = 'font-[family-name:var(--font-plex-condensed)]';

/** Un extrait fidèle : les premières phrases entières de la citation, dans la limite donnée (trois lignes à l'écran). */
function extrait(quote: string, max: number): string {
  const phrases = quote.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [quote];
  let out = '';
  for (const p of phrases) {
    if (out && (out + p).trim().length > max) break;
    out += p;
  }
  return out.trim();
}

type Lang = 'fr' | 'en';

function Pms({ titre, note }: { titre: string; note: string }) {
  return (
    <section id="pms" className="pt-16 lg:pt-24">
      <div className={BOITE}>
        <h2 className="text-[22px] font-medium tracking-[-0.02em] text-ink lg:text-[28px]">{titre}</h2>
        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:mt-10 lg:grid-cols-6">
          {pmsLogos.map((logo) => (
            <li key={logo.alt}>
              <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-7 w-auto max-w-full object-contain object-left opacity-75 grayscale" />
            </li>
          ))}
        </ul>
        <p className="mt-9 max-w-[70ch] border-b border-ink/15 pb-12 text-[14.5px] leading-[1.5] text-ink-3 lg:pb-16">{note}</p>
      </div>
    </section>
  );
}

function Temoignages({ titre, lang }: { titre: string; lang: Lang }) {
  const studies = ETUDES.flatMap((entry) => {
    const study = getCaseStudyBySlug(entry.slug);
    return study ? [{ ...study, image: entry.image }] : [];
  });
  // Une personne déjà montrée dans un cas client n'a pas de seconde citation (décision du 15/11/2026).
  const shown = new Set(studies.map((study) => study.contactName));
  const home = clientQuotes.filter((quote) => !shown.has(quote.name)).slice(0, 3);
  const [premier, ...suite] = studies;
  return (
    <section className="py-16 lg:py-28">
      <div className={BOITE}>
        <h2 className={cn(TITRE, 'max-w-[24ch]')}>{titre}</h2>
        {premier && (
          <figure className="mt-10 grid items-center gap-7 lg:mt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <Image src={premier.image} alt={`${premier.name}, ${premier.location}`} width={800} height={450} sizes="(min-width: 1024px) 56vw, 100vw" className="aspect-[16/10] w-full rounded-[16px] object-cover" />
            <div>
              <blockquote className="text-pretty text-[23px] font-normal leading-[1.28] tracking-[-0.02em] text-ink lg:text-[32px] lg:leading-[1.22]">« {extrait(premier.quote, 120)} »</blockquote>
              <figcaption className="mt-6 text-[15px] leading-[1.45]">
                <span className="block font-medium text-ink">{premier.contactName}</span>
                <span className="text-ink-3">
                  {premier.contactRole}, {premier.name}. {premier.pms}
                </span>
              </figcaption>
            </div>
          </figure>
        )}
        {suite.length > 0 && (
          <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-20 lg:gap-16">
            {suite.map((study) => (
              <figure key={study.slug} className="grid w-[86%] shrink-0 snap-start grid-cols-[88px_1fr] items-start gap-4 sm:w-auto sm:grid-cols-[104px_1fr] sm:gap-5 lg:grid-cols-[168px_1fr] lg:gap-7">
                <Image src={study.image} alt={`${study.name}, ${study.location}`} width={800} height={450} sizes="168px" className="aspect-square w-full rounded-[16px] object-cover" />
                <div>
                  <blockquote className="text-pretty text-[17px] leading-[1.4] text-ink lg:text-[20px]">« {extrait(study.quote, 130)} »</blockquote>
                  <figcaption className="mt-4 text-[14.5px] leading-[1.45]">
                    <span className="block font-medium text-ink">{study.contactName}</span>
                    <span className="text-ink-3">
                      {study.contactRole}, {study.name}. {study.pms}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        )}
        {home.length > 0 && (
          <ul
            aria-label={titre}
            className={cn('-mx-4 mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-3 lg:mx-0 lg:mt-20 lg:grid lg:gap-16 lg:overflow-visible lg:px-0', home.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2')}
          >
            {home.map((item) => (
              <li key={item.name} className="flex w-[82%] shrink-0 snap-start flex-col justify-between gap-5 border-t border-ink/15 pt-5 lg:w-auto">
                <blockquote className="text-pretty text-[16px] leading-[1.5] text-ink-2">« {extrait(item.quote[lang], 150)} »</blockquote>
                <p className="text-[14.5px] leading-[1.45]">
                  <span className="block font-medium text-ink">{item.name}</span>
                  <span className="text-ink-3">
                    {item.role[lang]}, {item.company}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

interface TextesPlans {
  sectionTitle: string;
  popularLabel: string;
  perMonthLabel: string;
  notes: string[];
  ctaLabel: string;
}

/** Les plans : mêmes données et même phase de prix que /tarifs, en colonnes séparées par des filets. */
async function Plans({ textes, locale, lang }: { textes: TextesPlans; locale: string; lang: Lang }) {
  const phase = getPricingPhase();
  const plans = getDisplayPlans(phase);
  const t = await getTranslations({ locale, namespace: 'priceChange' });
  const demo = demoHref('tarifs');
  return (
    <section id="tarifs" className="scroll-mt-20 bg-[#F2F7F6] py-16 lg:py-28">
      <div className={BOITE}>
        <h2 className={cn(TITRE, 'max-w-[26ch]')}>{textes.sectionTitle}</h2>
        {phase === 'announce' && <p className="mt-5 inline-flex rounded-full bg-peach/70 px-3.5 py-1 text-[14.5px] font-medium text-ink">{t('bannerShort')}</p>}
        <ul className="mt-10 grid border-t border-ink/15 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <li
              key={plan.key}
              className={cn(
                'flex flex-col border-b border-ink/15 py-7 lg:px-7 lg:py-9',
                i > 0 && 'lg:border-l',
                i % 2 === 1 && 'sm:max-lg:border-l sm:max-lg:pl-7',
                i === 0 && 'lg:pl-0',
                plan.popular && 'bg-white max-lg:-mx-4 max-lg:px-4 sm:max-lg:mx-0',
              )}
            >
              <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px] font-medium text-ink">
                {plan.name[lang]}
                {plan.popular && <span className="rounded-full bg-mint px-2.5 py-0.5 text-[12.5px] font-medium">{textes.popularLabel}</span>}
              </h3>
              <p className="mt-5 flex items-baseline gap-2 text-ink">
                <span className={cn(CONDENSE, 'text-[58px] font-light leading-none tracking-[-0.015em] lg:text-[68px]')}>{plan.price}&nbsp;€</span>
                {plan.price !== '0' && <span className="text-[14.5px] text-ink-3">/ {textes.perMonthLabel}</span>}
              </p>
              {plan.upcomingPrice && <p className="mt-2 text-[13px] text-ink-3">{t('upcoming', { price: plan.upcomingPrice })}</p>}
              <p className="mt-4 text-pretty text-[15px] leading-[1.5] text-ink-2">{plan.description[lang]}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="grid gap-1 text-[14.5px] text-ink-2">
            {textes.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <ButtonLink href={demo} variant="accent" size="lg" className="self-start sm:self-auto" {...lpLinkProps(demo)}>
            {textes.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Questions({ titre, items }: { titre: string; items: { question: string; answer: string }[] }) {
  return (
    <section id="questions" className="scroll-mt-20 py-16 lg:py-28">
      <div className={cn(BOITE, 'grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-20')}>
        <h2 className={cn(TITRE, 'max-w-[16ch]')}>{titre}</h2>
        <div className="border-t border-ink/15">
          {items.map((item, index) => (
            <details key={item.question} open={index === 0} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:text-[19px] [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus className="h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <p className="max-w-[64ch] pb-6 text-[16px] leading-[1.55] text-ink-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TextesFinal {
  title: string;
  subtitle: string;
  ctaLabel: string;
  benefits: string[];
  callback: {
    title: string;
    subtitle: string;
    slots: string[];
    labels: Record<'firstName' | 'hotelName' | 'phone' | 'email' | 'slot' | 'submit' | 'successTitle' | 'successBody' | 'error' | 'invalidPhone' | 'privacy' | 'privacyLink', string>;
  };
}

export async function Bas({ locale }: { locale: string }) {
  const lang: Lang = locale === 'fr' ? 'fr' : 'en';
  const t = await getTranslations({ locale, namespace: 'lpCrmHotelier' });
  // `{pmsList}` et `{entryPrice}` : les mêmes valeurs que les autres pages d'atterrissage (liste des PMS, prix d'entrée de la phase).
  const valeurs = landingPageValues(locale);
  const items = applyBrandValues(t.raw('faq.items') as { question: string; answer: string }[], valeurs);
  const final = t.raw('final') as TextesFinal;
  return (
    <>
      <Pms titre={t('pms.gridLabel')} note={t('pms.footnote')} />
      <Temoignages titre={t('testimonials.title')} lang={lang} />
      <Plans textes={t.raw('plans') as TextesPlans} locale={locale} lang={lang} />
      <Questions titre={t('faq.sectionTitle')} items={items} />
      {/* L'appel final : un panneau vert arrondi posé dans la page claire, jamais une bande sombre pleine largeur. */}
      <div className={cn(BOITE, 'pb-10 lg:pb-16')}>
        <div className="overflow-hidden rounded-[28px] lg:rounded-[40px] [&_h2]:text-balance [&_h2]:text-[29px] [&_h2]:font-medium [&_h2]:leading-[1.1] [&_h2]:tracking-[-0.03em] lg:[&_h2]:text-[44px] lg:[&_h2]:leading-[1.06] [&_button[type=submit]]:bg-brand-accent [&_button[type=submit]]:text-brand-dark [&_section]:bg-[#002B28] [&_section]:py-16 lg:[&_section]:py-24">
          <LPCTA
            id={RAPPEL}
            title={final.title}
            subtitle={final.subtitle}
            ctaLabel={final.ctaLabel}
            ctaHref={demoHref('cta-bas')}
            benefits={final.benefits}
            callback={{
              ...final.callback,
              source: SOURCE_RAPPEL,
              locale,
              labels: { ...final.callback.labels, privacyHref: `/${locale}/politique-confidentialite` },
            }}
          />
        </div>
      </div>
      <LPFooter
        links={[
          { label: t('footer.legal'), href: `/${locale}/mentions-legales` },
          { label: t('footer.privacy'), href: `/${locale}/politique-confidentialite` },
          { label: t('footer.terms'), href: `/${locale}/cgv` },
        ]}
        className="border-ink/10 bg-white text-ink-3 [&_a:hover]:!text-ink"
      />
    </>
  );
}
