import { useTranslations } from 'next-intl';
import { FileCheck2, ListChecks, MapPin, Timer } from 'lucide-react';
import { Container, DsButton, FeatureItem, Section, SectionHeader } from '@/components/ds';

const ICONS = [MapPin, FileCheck2, ListChecks, Timer];

export function HomeSecurity() {
  const t = useTranslations('home2.security');
  const items = t.raw('items') as { title: string; text: string }[];
  return (
    <Section tone="white">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} align="left" />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FeatureItem key={item.title} icon={ICONS[i]} title={item.title}>
              {item.text}
            </FeatureItem>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-ink-2">{t('sso')}</p>
          <DsButton href="/dpa" variant="link" arrow>
            {t('link')}
          </DsButton>
        </div>
      </Container>
    </Section>
  );
}
