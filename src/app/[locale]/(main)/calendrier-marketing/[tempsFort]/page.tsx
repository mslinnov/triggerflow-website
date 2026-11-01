import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, CalendarClock, Repeat, Users } from 'lucide-react';
import { OpenInAppLink } from '@/components/calendrier/OpenInAppLink';
import { ThemedTemplateBlock } from '@/components/calendrier/ThemedTemplateBlock';
import { ThemeSelectionProvider } from '@/components/calendrier/ThemeSelection';
import { RappelForm } from '@/components/calendrier/RappelForm';
import { TemplatePreview } from '@/components/calendrier/TemplatePreview';
import { ButtonLink, Container } from '@/components/ui';
import { brand } from '@/data/brand';
import {
  calendarDemoUrl,
  currentCampaign,
  DEFAULT_MJML_THEME,
  MJML_THEMES,
  EXAMPLE_VARIABLES,
  TEMPS_FORTS,
  tempsFortBySlug,
} from '@/data/calendrier-marketing';
import { toPlainText } from '@/lib/calendrier';
import { loadMjmlThemes } from '@/lib/calendrier-mjml';

/**
 * Page « Activer » d'un temps fort (décision 22) : le client ouvre le modèle dans
 * l'app ; le prospect voit l'e-mail sur une charte d'exemple, l'automatisation
 * expliquée, la démo et le formulaire de rappel.
 *
 * Non indexée : elle reprend le modèle de la page calendrier, seule page à classer.
 */

interface PageProps {
  params: Promise<{ locale: string; tempsFort: string }>;
}

export function generateStaticParams() {
  return Object.values(TEMPS_FORTS).map((info) => ({ locale: 'fr', tempsFort: info.slug }));
}

export const dynamicParams = false;

/** Date du jour (Paris) au format AAAA-MM-JJ, pour choisir la campagne en cours. */
function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, tempsFort } = await params;
  const info = tempsFortBySlug(tempsFort);
  if (!info) return {};
  const t = await getTranslations({ locale, namespace: 'calendrierMarketing.activatePage' });
  const url = `${brand.url}/fr/calendrier-marketing/${info.slug}`;

  return {
    title: { absolute: t('metaTitle', { title: info.title }) },
    description: t('metaDescription', { title: info.title }),
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      title: t('metaTitle', { title: info.title }),
      description: t('metaDescription', { title: info.title }),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: info.title }],
    },
  };
}

export default async function ActivateTempsFortPage({ params }: PageProps) {
  const { locale, tempsFort } = await params;
  const info = tempsFortBySlug(tempsFort);
  if (locale !== 'fr' || !info) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('calendrierMarketing.activatePage');
  const tCard = await getTranslations('calendrierMarketing.card');
  const campaign = currentCampaign(info.code, today());
  const send = toPlainText(campaign.send);
  const variants = loadMjmlThemes(info.code).map(({ theme, subject, preheader }) => ({ theme, subject, preheader }));
  const themes = variants.length > 0 ? variants.map((v) => v.theme) : [DEFAULT_MJML_THEME];
  const themeNames = Object.fromEntries(MJML_THEMES.map((theme) => [theme, tCard(`themes.${theme}`)])) as Record<
    (typeof MJML_THEMES)[number],
    string
  >;
  const previewLabels = { subject: tCard('subject'), preheader: tCard('preheader'), preview: tCard('previewLabel') };

  const steps = [
    { icon: Users, title: t('howTarget'), text: t('howTargetText', { audience: info.audience }) },
    { icon: CalendarClock, title: t('howSend'), text: t('howSendText', { send: send.charAt(0).toLowerCase() + send.slice(1) }) },
    { icon: Repeat, title: t('howReminder'), text: t('howReminderText') },
  ];

  return (
    <ThemeSelectionProvider initial={themes[0]}>
      <section className="bg-surface-dark text-text-on-dark">
        <Container className="py-10 md:py-16">
          <a
            href={`/fr/calendrier-marketing#${campaign.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('back')}
          </a>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-accent">{t('eyebrow')}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">{info.title}</h1>

          <div className="mt-8 max-w-2xl rounded-2xl bg-white p-5 text-text-primary shadow-xl sm:p-6">
            <h2 className="text-lg font-semibold">{t('clientTitle')}</h2>
            <p className="mt-1 text-sm text-text-secondary">{t('clientText')}</p>
            <OpenInAppLink code={info.code} themes={themes} themeNames={themeNames} caption={t('clientCaption')} className="mt-4">
              {t('clientCta')}
            </OpenInAppLink>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-serif text-2xl font-bold text-text-primary md:text-3xl">{t('previewTitle')}</h2>
            <p className="mt-2 text-sm text-text-muted">{t('previewNote')}</p>
            {variants.length > 0 ? (
              <div className="mt-6">
                <ThemedTemplateBlock code={info.code} title={info.title} variants={variants} variables={EXAMPLE_VARIABLES} mode="example" />
              </div>
            ) : (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border-light">
                <p className="bg-brand-dark px-5 py-4 text-center font-serif text-xl font-semibold text-white">
                  {EXAMPLE_VARIABLES.facility_name}
                </p>
                <TemplatePreview
                  email={campaign.email}
                  mode="example"
                  variables={EXAMPLE_VARIABLES}
                  labels={previewLabels}
                  className="rounded-none border-0 shadow-none"
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-text-primary md:text-3xl">{t('howTitle')}</h2>
            <ol className="mt-6 space-y-5">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {i + 1}. {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl border border-border-light bg-surface-secondary p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-text-primary">{t('prospectTitle')}</h2>
              <p className="mt-1 text-sm text-text-secondary">{t('prospectText')}</p>
              <ButtonLink
                href={calendarDemoUrl(info.code)}
                target="_blank"
                rel="noopener noreferrer"
                variant="accent"
                className="mt-4 w-full sm:w-auto"
              >
                {t('demoCta')}
              </ButtonLink>

              <h3 className="mt-8 text-lg font-semibold text-text-primary">{t('formTitle')}</h3>
              <div className="relative mt-3">
                <RappelForm tempsFort={info.code} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </ThemeSelectionProvider>
  );
}
