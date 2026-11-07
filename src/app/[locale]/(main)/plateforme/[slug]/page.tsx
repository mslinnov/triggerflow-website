import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowDown, ArrowUp, Check } from 'lucide-react';
import { Container, CtaBand, Eyebrow, FaqList, Section, SectionHeader, TrustStrip } from '@/components/ds';
import { DedupScenario } from '@/components/visuals';
import { BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { brand } from '@/data/brand';
import { platformPages, type PlatformBlock, type PlatformPage } from '@/content/platform';
import type { L } from '@/content/products';

const baseUrl = 'https://www.trigger-flow.com';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) => Object.keys(platformPages).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = platformPages[slug as PlatformPage['slug']];
  if (!page) return {};
  const lang = locale === 'en' ? 'en' : 'fr';
  return {
    title: { absolute: page.seo.title[lang] },
    description: page.seo.description[lang],
    openGraph: { title: page.seo.title[lang], description: page.seo.description[lang] },
    alternates: {
      canonical: `${baseUrl}/${locale}/plateforme/${slug}`,
      languages: { fr: `${baseUrl}/fr/plateforme/${slug}`, en: `${baseUrl}/en/plateforme/${slug}`, 'x-default': `${baseUrl}/fr/plateforme/${slug}` },
    },
  };
}

export default async function PlatformRoute({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = platformPages[slug as PlatformPage['slug']];
  if (!page) notFound();
  const lang = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en';
  const l = (v: L | string) => (typeof v === 'string' ? v : v[lang]);
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const t = await getTranslations({ locale, namespace: 'productPage' });

  return (
    <>
      <BreadcrumbListJsonLd
        items={[
          { name: 'TriggerFlow', url: `${baseUrl}/${locale}` },
          { name: l(page.eyebrow), url: `${baseUrl}/${locale}/plateforme/${slug}` },
        ]}
      />
      <FaqJsonLd items={page.faq.map((f) => ({ question: l(f.q), answer: l(f.a) }))} />

      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{l(page.eyebrow)}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{l(page.title)}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{l(page.subtitle)}</p>
          <TrustStrip className="mt-8" />
        </Container>
      </section>

      {page.blocks.map((block, i) => (
        <Block key={i} block={block} l={l} tone={i % 2 === 0 ? 'paper' : 'white'} />
      ))}

      <Section tone="white">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={t('faqTitle')} align="left" />
          <div className="mt-10">
            <FaqList items={page.faq.map((f) => ({ question: l(f.q), answer: l(f.a) }))} />
          </div>
        </Container>
      </Section>

      <CtaBand title={l(page.cta)} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: nav('seeProduct'), href: '/produit' }} />
    </>
  );
}

function Block({ block, l, tone }: { block: PlatformBlock; l: (v: L | string) => string; tone: 'paper' | 'white' }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeader title={l(block.title)} subtitle={block.kind === 'table' ? l(block.text) : undefined} align="left" />
        {block.kind === 'facts' && (
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <div key={i} className="bg-white p-6">
                <p className="text-[16px] font-semibold text-ink">{l(it.title)}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{l(it.text)}</p>
              </div>
            ))}
          </div>
        )}
        {block.kind === 'table' && (
          <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[560px] text-left text-[14.5px]">
              <thead className="border-b border-line bg-paper font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
                <tr>{block.columns.map((c, i) => <th key={i} className="px-5 py-3 font-medium">{l(c)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-line">
                {block.rows.map((r, i) => (
                  <tr key={i}>
                    <td className="px-5 py-3 text-ink-2">{l(r[0])}</td>
                    <td className="px-5 py-3 font-medium text-ink">{r[1]}</td>
                    <td className="px-5 py-3 text-ink-2">{l(r[2])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {block.kind === 'split' && (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[{ side: block.left, Icon: ArrowDown }, { side: block.right, Icon: ArrowUp }].map(({ side, Icon }, i) => (
              <div key={i} className="rounded-xl border border-line bg-white p-7">
                <p className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-accent">
                  <Icon aria-hidden className="h-4 w-4" /> {l(side.title)}
                </p>
                <ul className="mt-5 space-y-3">
                  {side.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[15.5px] text-ink">
                      <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" /> {l(it)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {block.kind === 'examples' && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((ex, i) => (
              <div key={i} className="rounded-xl border border-line bg-white p-7">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent">{l(ex.module)}</p>
                <p className="mt-4 text-[16px] leading-relaxed text-ink">{l(ex.text)}</p>
              </div>
            ))}
          </div>
        )}
        {block.kind === 'principles' && (
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="space-y-4">
              {block.items.map((it, i) => (
                <li key={i} className="flex gap-3 border-b border-line pb-4 text-[16px] text-ink last:border-b-0">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" /> {l(it)}
                </li>
              ))}
            </ul>
            {l(block.title).match(/propres|Clean/) && (
              <div className="rounded-2xl border border-line bg-white p-6">
                <DedupScenario />
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
