import { useTranslations } from 'next-intl';
import { ArrowRight, MessageSquare, Hotel, Lock, CreditCard, Star, Zap, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Container, CtaBand, DsButton, Eyebrow, Section, TrustStrip } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { pmsPages } from '@/content/pms';

/** Pages dédiées : Mews (page historique) et les pages générées depuis src/content/pms.ts. */
const integrationLinks: Record<string, string> = {
  mews: '/integrations/pms/mews',
  ...Object.fromEntries(Object.values(pmsPages).map((p) => [p.key, `/integrations/pms/${p.slug}`])),
};

interface Integration {
  key: string;
  logo: string;
  /** PMS de brand.pmsEnCours : badge « bientôt disponible », jamais compté dans le total connecté. */
  comingSoon?: boolean;
}

interface Category {
  key: string;
  iconBg: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  integrations: Integration[];
}

const integrationCategories: Category[] = [
  {
    key: 'pms',
    borderColor: 'group-hover:border-blue-200',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: Hotel,
    integrations: [
      { key: 'thais', logo: '/images/integrations/thais.svg' },
      { key: 'misterbooking', logo: '/images/integrations/misterbooking.png' },
      { key: 'medialog', logo: '/images/integrations/medialog.svg' },
      { key: 'opera', logo: '/images/integrations/opera.png' },
      { key: 'mews', logo: '/images/integrations/mews.svg' },
      { key: 'asterio', logo: '/images/integrations/asterio.png' },
      { key: 'leanpms', logo: '/images/integrations/leanpms.webp' },
      { key: 'vega', logo: '/images/integrations/vega.png' },
      { key: 'apaleo', logo: '/images/integrations/apaleo.png' },
      { key: 'zeswitch', logo: '/images/integrations/zeswitch.png' },
      { key: 'beds24', logo: '/images/integrations/beds24.svg' },
      { key: 'reservit', logo: '/images/integrations/reservit.webp' },
    ],
  },
  {
    key: 'hardware',
    borderColor: 'group-hover:border-amber-200',
    iconBg: 'bg-amber-100 text-amber-600',
    icon: Lock,
    integrations: [
      { key: 'sesame', logo: '/images/integrations/sesame.png' },
      { key: 'igloohome', logo: '/images/integrations/igloohome.svg' },
    ],
  },
  {
    key: 'payments',
    borderColor: 'group-hover:border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    icon: CreditCard,
    integrations: [
      { key: 'stripe', logo: '/images/integrations/stripe.svg' },
      { key: 'payzen', logo: '/images/integrations/payzen.png' },
      { key: 'systempay', logo: '/images/integrations/systempay.png' },
      { key: 'thaispay', logo: '/images/integrations/thais.svg' },
      { key: 'applepay', logo: '/images/integrations/applepay.svg' },
      { key: 'googlepay', logo: '/images/integrations/googlepay.svg' },
    ],
  },
  {
    key: 'reviews',
    borderColor: 'group-hover:border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
    icon: Star,
    integrations: [
      { key: 'google', logo: '/images/integrations/google.svg' },
      { key: 'tripadvisor', logo: '/images/integrations/tripadvisor.svg' },
      { key: 'booking', logo: '/images/integrations/booking.svg' },
      { key: 'airbnb', logo: '/images/integrations/airbnb.svg' },
    ],
  },
  {
    key: 'messaging',
    borderColor: 'group-hover:border-green-200',
    iconBg: 'bg-green-100 text-green-600',
    icon: MessageSquare,
    integrations: [
      { key: 'whatsapp', logo: '/images/integrations/whatsapp.svg' },
      { key: 'microsoft', logo: '/images/integrations/microsoft.svg' },
      { key: 'twilio', logo: '/images/integrations/twilio.svg' },
      { key: 'google', logo: '/images/integrations/google.svg' },
      { key: 'smtp', logo: '/images/integrations/smtp.svg' },
    ],
  },
  {
    key: 'other',
    borderColor: 'group-hover:border-orange-200',
    iconBg: 'bg-orange-100 text-orange-600',
    icon: Zap,
    integrations: [
      { key: 'zapier', logo: '/images/integrations/zapier.svg' },
      { key: 'make', logo: '/images/integrations/make.svg' },
      { key: 'n8n', logo: '/images/integrations/n8n.svg' },
      { key: 'webhook', logo: '/images/integrations/webhook.svg' },
      { key: 'api', logo: '/images/integrations/api.svg' },
    ],
  },
];

export function IntegrationsContent() {
  const t = useTranslations('integrations');
  const nav = useTranslations('nav');
  // Les intégrations « bientôt disponibles » ne comptent pas : seuls les connecteurs existants.
  const connectedCount = (category: Category) => category.integrations.filter((i) => !i.comingSoon).length;

  return (
    <>
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('hero.count')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('hero.title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('hero.subtitle')}</p>
          <nav className="mt-9 flex flex-wrap justify-center gap-2" aria-label={t('hero.title')}>
            {integrationCategories.map((c) => (
              <a key={c.key} href={`#${c.key}`} className="rounded-full border border-line px-3.5 py-1.5 text-[14px] text-ink-2 hover:border-accent hover:text-ink">
                {t(`categories.${c.key}.title`)}
              </a>
            ))}
          </nav>
          <TrustStrip className="mt-8" />
        </Container>
      </section>

      {integrationCategories.map((category, idx) => {
        const Icon = category.icon;
        return (
          <Section key={category.key} id={category.key} tone={idx % 2 === 0 ? 'paper' : 'white'} compact>
            <Container>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-mono text-eyebrow font-medium uppercase text-accent">
                    <Icon className="h-4 w-4" /> {t('badges.count', { count: connectedCount(category) })}
                  </p>
                  <h2 className="mt-3 text-h3 font-medium text-ink md:text-[2rem]">{t(`categories.${category.key}.title`)}</h2>
                  <p className="mt-2 max-w-2xl text-[15px] text-ink-2">{t(`categories.${category.key}.description`)}</p>
                </div>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {category.integrations.map((integration) => {
                  const name = t(`categories.${category.key}.integrations.${integration.key}.name`);
                  const href = category.key === 'pms' ? integrationLinks[integration.key] : undefined;
                  const inner = (
                    <>
                      <div className="flex h-12 items-center justify-center">
                        <Image src={integration.logo} alt={name} width={120} height={48} className="max-h-10 w-auto object-contain" />
                      </div>
                      <p className="mt-3 text-[14px] font-semibold text-ink">{name}</p>
                      <p className="mt-0.5 line-clamp-2 text-[12.5px] text-ink-3">{t(`categories.${category.key}.integrations.${integration.key}.description`)}</p>
                      {integration.comingSoon && <span className="mt-2 inline-block rounded-full bg-peach px-2 py-0.5 text-[11px] text-ink">{t('badges.comingSoon')}</span>}
                      {href && <span className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-accent">{t('pmsPage')} <ArrowRight className="h-3.5 w-3.5" /></span>}
                    </>
                  );
                  return (
                    <li key={category.key + integration.key}>
                      {href ? (
                        <Link href={href} className="block h-full rounded-xl border border-line bg-white p-4 transition-colors hover:border-accent">{inner}</Link>
                      ) : (
                        <div className="h-full rounded-xl border border-line bg-white p-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Container>
          </Section>
        );
      })}

      <section className="bg-ink py-16 text-white md:py-20">
        <Container className="flex flex-col items-center gap-8 md:flex-row">
          <div className="shrink-0 rounded-2xl bg-white p-5">
            <Image src="/images/integrations/synapse.svg" alt="Label Synapse" width={160} height={54} className="h-11 w-auto object-contain" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-h3 font-medium">{t('synapse.title')}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">{t('synapse.description')}</p>
            <a href="https://synapse-hotel.fr/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-mint hover:text-white">
              {t('synapse.link')} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>

      <Section tone="white" id="request-integration" compact>
        <Container narrow className="text-center">
          <h2 className="text-h3 font-medium text-ink md:text-[2rem]">{t('request.title')}</h2>
          <p className="mt-3 text-[16px] text-ink-2">{t('request.description')}</p>
          <DsButton href={brand.demoUrl} variant="secondary" className="mt-7">{t('request.cta')}</DsButton>
        </Container>
      </Section>

      <CtaBand title={t('cta.title')} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: t('cta.pricing'), href: '/tarifs' }} />
    </>
  );
}
