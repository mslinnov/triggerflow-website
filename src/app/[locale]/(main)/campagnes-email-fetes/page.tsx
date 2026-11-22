import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { CampagnesSteps, type EtapeCampagne, type EtapesLabels } from '@/components/campagnes-fetes/CampagnesSteps';
import { MailPreview } from '@/components/campagnes-fetes/MailPreview';
import { PageMotion } from '@/components/campagnes-fetes/PageMotion';
import '@/components/campagnes-fetes/campagnes-fetes.css';
import { brand } from '@/data/brand';
import { CAMPAGNES_FETES, feteActivateUrl, feteDemoUrl, feteFileUrl, fetePreviewUrl } from '@/data/campagnes-fetes';
import { hasFeteTemplate } from '@/lib/campagnes-fetes';
import { Link } from '@/i18n/navigation';
import { pageAlternates } from '@/lib/seo';

const PATH = '/campagnes-email-fetes';
const PAGE_URL = `${brand.url}/fr${PATH}`;
const GUIDE_PATH = '/blog/automatisation/marketing-automation-hotelier-guide';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface FaqItem {
  question: string;
  answer: string;
}

// Français seulement : /en/campagnes-email-fetes redirige vers /fr (next.config.ts).
export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'campagnesFetes.meta' });

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: pageAlternates(locale, PATH, ['fr']),
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: PAGE_URL,
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('title') }],
    },
  };
}

export default async function CampagnesEmailFetesPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'fr') notFound();
  setRequestLocale(locale);

  const t = await getTranslations('campagnesFetes');
  const demoPage = feteDemoUrl('page');

  const etapes: EtapeCampagne[] = CAMPAGNES_FETES.map((c) => ({
    code: c.code,
    nom: c.nom,
    periode: c.periode,
    objet: c.objet,
    pourquoi: c.pourquoi,
    activateUrl: feteActivateUrl(c),
    // Aperçu et copie seulement une fois le modèle exporté dans src/data/calendrier-mjml/fetes/.
    previewUrl: hasFeteTemplate(c) ? fetePreviewUrl(c) : null,
    modale: {
      code: c.code,
      nom: c.nom,
      htmlUrl: feteFileUrl(c, 'html'),
      htmlDownloadUrl: feteFileUrl(c, 'html', true),
      mjmlUrl: feteFileUrl(c, 'mjml'),
      mjmlDownloadUrl: feteFileUrl(c, 'mjml', true),
    },
  }));

  const labels: EtapesLabels = {
    subject: t('sept.subject'),
    from: t('sept.from'),
    activate: t('sept.activate'),
    copy: t('sept.copy'),
    seeFull: t('sept.seeFull'),
    previewTitle: t.raw('sept.previewTitle') as string,
    previewLabel: t('sept.previewLabel'),
    fallbackTitle: t('sept.fallbackTitle'),
    modal: {
      title: t('modal.title'),
      tabsLabel: t('modal.tabsLabel'),
      html: t('modal.html'),
      mjml: t('modal.mjml'),
      noteHtml: t('modal.noteHtml'),
      noteMjml: t('modal.noteMjml'),
      copyHtml: t('modal.copyHtml'),
      copyMjml: t('modal.copyMjml'),
      download: t('modal.download'),
      downloadHtml: t('modal.downloadHtml'),
      downloadMjml: t('modal.downloadMjml'),
      copied: t('modal.copied'),
      copiedShort: t('modal.copiedShort'),
      copyFallback: t('modal.copyFallback'),
      copyError: t('modal.copyError'),
      close: t('modal.close'),
    },
  };

  const faq = t.raw('faq.items') as FaqItem[];
  const bandeRows = t.raw('bande.rows') as { audience: string; campaign: string }[];
  const facons = t.raw('facons.items') as { who: string; title: string; text: string; cta: string; kind: 'button' | 'link' | 'demo' }[];
  // Éventail du héros : trois campagnes réparties sur la période.
  const eventail = [0, 2, 5].map((i) => ({ campagne: CAMPAGNES_FETES[i], etape: etapes[i] }));

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('meta.title'),
    description: t('meta.description'),
    url: PAGE_URL,
    inLanguage: 'fr-FR',
    isPartOf: { '@type': 'WebSite', name: brand.name, url: brand.url },
    publisher: { '@type': 'Organization', name: brand.name, url: brand.url },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CAMPAGNES_FETES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.nom,
        url: `${PAGE_URL}#${c.code}`,
      })),
    },
  };

  return (
    <div className="cf">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <FaqJsonLd items={faq.map(({ question, answer }) => ({ question, answer }))} />
      <BreadcrumbListJsonLd
        items={[
          { name: t('meta.breadcrumbHome'), url: `${brand.url}/fr` },
          { name: t('meta.breadcrumbPage'), url: PAGE_URL },
        ]}
      />
      <PageMotion />

      <header className="cf-sombre cf-hero">
        <div className="cf-wrap">
          <div className="cf-hero-g">
            <div>
              <h1 data-h>
                {t('hero.title')} <em>{t('hero.titleEm')}</em>
              </h1>
              <p className="cf-sous" data-h>
                {t('hero.subtitle')}
              </p>
              <div className="cf-actions" data-h>
                <a className="cf-btn cf-btn-peche" href="#campagnes">
                  {t('hero.seeAll')}
                </a>
                <a className="cf-lien" href={demoPage} target="_blank" rel="noopener noreferrer">
                  {t('hero.demo')}
                </a>
              </div>
            </div>
            <div className="cf-eventail" aria-hidden="true">
              {eventail.map(({ campagne, etape }) => (
                <div className="cf-carte-h" key={campagne.code}>
                  <MailPreview
                    src={etape.previewUrl}
                    title={labels.previewTitle.replace('{name}', campagne.nom)}
                    fallback={{ title: labels.fallbackTitle, objet: campagne.objet, periode: campagne.periode }}
                  />
                  <span className="cf-tag-h">{campagne.periodeCourte}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="cf-sept" id="campagnes">
        <div className="cf-wrap">
          <div className="cf-sept-tete" data-rv>
            <h2 className="cf-titre-s">
              {t('sept.title')} <em>{t('sept.titleEm')}</em>
            </h2>
            <p>{t('sept.intro')}</p>
          </div>
          <CampagnesSteps etapes={etapes} labels={labels} />
        </div>
      </section>

      <section className="cf-bande">
        <div className="cf-wrap cf-bande-g">
          <div data-rv>
            <h2 className="cf-titre-s">
              {t('bande.title')} <em>{t('bande.titleEm')}</em>
            </h2>
            <p>{t('bande.text')}</p>
            <a className="cf-btn cf-btn-peche" href={demoPage} target="_blank" rel="noopener noreferrer">
              {t('bande.demo')}
            </a>
          </div>
          <div className="cf-flux" aria-hidden="true">
            {bandeRows.map((row) => (
              <div className="cf-flux-l" key={row.audience}>
                <span className="cf-aud">{row.audience}</span>
                <i className="cf-fil" />
                <span className="cf-chip">
                  {row.campaign}
                  <small>{t('bande.sent')}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cf-facons">
        <div className="cf-wrap">
          <h2 className="cf-titre-s" data-rv>
            {t('facons.title')} <em>{t('facons.titleEm')}</em>
          </h2>
          <div className="cf-facons-liste">
            {facons.map((f) => (
              <div className="cf-facon" key={f.title} data-rv>
                <span className="cf-qui">{f.who}</span>
                <h3>{f.title}</h3>
                <div>
                  <p>{f.text}</p>
                  <div className="cf-acts">
                    {f.kind === 'button' && (
                      <a className="cf-btn cf-btn-peche" href="#campagnes">
                        {f.cta}
                      </a>
                    )}
                    {f.kind === 'link' && (
                      <a className="cf-lien" href="#campagnes">
                        {f.cta}
                      </a>
                    )}
                    {f.kind === 'demo' && (
                      <a className="cf-lien" href={demoPage} target="_blank" rel="noopener noreferrer">
                        {f.cta}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cf-faq">
        <div className="cf-wrap cf-faq-g">
          <h2 className="cf-titre-s" data-rv>
            {t('faq.title')} <em>{t('faq.titleEm')}</em>
          </h2>
          <div data-rv>
            {faq.map((item, i) => (
              <details key={item.question} open={i === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cf-final">
        <div className="cf-wrap">
          <div className="cf-panneau cf-sombre">
            <div>
              <h2>
                {t('finalCta.title')} <em>{t('finalCta.titleEm')}</em>
              </h2>
              <p>{t('finalCta.text')}</p>
            </div>
            <div className="cf-actions">
              <a className="cf-btn cf-btn-peche" href={demoPage} target="_blank" rel="noopener noreferrer">
                {t('finalCta.demo')}
              </a>
              <Link className="cf-lien" href="/contact">
                {t('finalCta.callback')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="cf-pied" aria-label={t('related.label')}>
        <div className="cf-wrap">
          <Link className="cf-lien" href="/calendrier-marketing">
            {t('related.calendar')}
          </Link>
          <Link className="cf-lien" href={GUIDE_PATH}>
            {t('related.guide')}
          </Link>
        </div>
      </nav>
    </div>
  );
}
