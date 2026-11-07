import { getTranslations } from 'next-intl/server';
import { ArrowRight, Clock, LogIn, Mail, Phone } from 'lucide-react';
import { Container, CtaBand, Eyebrow, FaqList, Section, SectionHeader } from '@/components/ds';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { HOME_FAQ_KEYS } from '@/data/home-faq';

/** Page d'aide : contacts réels du support, FAQ existante et liens utiles. Pas de base d'articles fictive. */
export default async function HelpCenterContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'helpPage' });
  const faq = await getTranslations({ locale, namespace: 'faq' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const items = HOME_FAQ_KEYS.map((k) => ({ question: faq(`items.${k}.question`), answer: faq(`items.${k}.answer`) }));
  const contacts = [
    { icon: Mail, label: t('email'), value: brand.email, href: `mailto:${brand.email}` },
    { icon: Phone, label: t('phone'), value: t('phoneValue'), href: `tel:${t('phoneHref')}` },
    { icon: Clock, label: t('hours'), value: t('hoursValue') },
    { icon: LogIn, label: t('app'), value: 'app.trigger-flow.com', href: 'https://app.trigger-flow.com/login' },
  ];
  const links = [
    { href: '/plateforme/securite', key: 'security' },
    { href: '/plateforme/synchronisation', key: 'sync' },
    { href: '/integrations', key: 'integrations' },
    { href: '/dpa', key: 'dpa' },
  ] as const;

  return (
    <>
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">{t('title')}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t('subtitle')}</p>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <Icon aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{c.label}</p>
                  <p className="mt-1 text-[15px] font-semibold text-ink">{c.value}</p>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block h-full rounded-xl border border-line p-5 transition-colors hover:border-accent">{inner}</a>
                  ) : (
                    <div className="h-full rounded-xl border border-line p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <Section tone="paper">
        <Container narrow>
          <SectionHeader eyebrow="FAQ" title={t('faqTitle')} align="left" />
          <div className="mt-10"><FaqList items={items} /></div>
        </Container>
      </Section>
      <Section tone="white" compact>
        <Container>
          <p className="font-mono text-eyebrow uppercase text-ink-3">{t('linksTitle')}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <Link key={l.key} href={l.href} className="group flex items-center justify-between rounded-xl border border-line p-5 text-[15px] font-semibold text-ink hover:border-accent">
                {t(`links.${l.key}`)}<ArrowRight aria-hidden className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t('cta')} primary={{ label: nav('startFree'), href: brand.demoUrl }} secondary={{ label: t('contactCta'), href: '/contact' }} />
    </>
  );
}
