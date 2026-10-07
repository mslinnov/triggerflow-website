import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  BarChart3,
  Clock,
  Headphones,
  MessagesSquare,
  RefreshCw,
  ShieldCheck,
  Star,
  TrendingUp,
  UserRound,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL_FEATURES, type EquiphotelFeature } from '@/data/equiphotel';

const featureIcons: Record<EquiphotelFeature, LucideIcon> = {
  communication: MessagesSquare,
  parcours: Workflow,
  crm: UserRound,
  revenus: TrendingUp,
  experience: Star,
  paiements: BarChart3,
};

const badges: { key: 'setup' | 'support' | 'rgpd'; icon: LucideIcon }[] = [
  { key: 'setup', icon: Clock },
  { key: 'support', icon: Headphones },
  { key: 'rgpd', icon: ShieldCheck },
];

export function EquiphotelAbout() {
  const t = useTranslations('equiphotel.about');

  return (
    <section className="bg-surface-dark py-16 text-white md:py-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-light">{t('eyebrow')}</p>
        <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          {t('titleLine1')}
          <br />
          <span className="text-brand-light">{t('titleLine2')}</span>
        </h2>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPHOTEL_FEATURES.map((key) => {
            const Icon = featureIcons[key];
            return (
              <li key={key} className="flex gap-4 bg-surface-dark-light p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/40 text-brand-light">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{t(`features.${key}.title`)}</h3>
                  <p className="mt-1 text-sm text-white/65">{t(`features.${key}.text`)}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 flex items-center gap-2 text-sm text-brand-light">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t('pms')}
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {badges.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                {t(`badges.${key}`)}
              </li>
            ))}
          </ul>
          <Link
            href="/fr"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-accent"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
