import { useTranslations } from 'next-intl';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL } from '@/data/equiphotel';

export function EquiphotelContact() {
  const t = useTranslations('equiphotel.contact');
  const { email, phone, phoneDisplay, linkedin } = EQUIPHOTEL.contact;

  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl">{t('title')}</h2>
            <p className="mt-2 text-text-secondary">{t('text')}</p>
          </div>
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0 lg:flex-nowrap">
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex w-full items-center gap-2 rounded-full px-5 py-3 font-medium text-text-primary ring-1 ring-border-default transition-colors hover:bg-surface-secondary"
              >
                <Mail className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone}`}
                className="inline-flex w-full items-center gap-2 rounded-full px-5 py-3 font-medium text-text-primary ring-1 ring-border-default transition-colors hover:bg-surface-secondary"
              >
                <Phone className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                {phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center gap-2 rounded-full px-5 py-3 font-medium text-text-primary ring-1 ring-border-default transition-colors hover:bg-surface-secondary"
              >
                <Linkedin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                {t('linkedin')}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
