import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { CalendarCheck } from 'lucide-react';
import { Container } from '@/components/ui';
import { BookingConversion } from './BookingConversion';
import { pageAlternates } from '@/lib/seo';

/**
 * Page de confirmation après une réservation lemcal : chaque type de réunion
 * lemcal y redirige (« URL de redirection de confirmation »), avec
 * `?source=<page>`. C'est ici, et seulement ici, que la conversion Google Ads
 * « rendez-vous réservé » est comptée : un clic vers lemcal n'est pas un
 * rendez-vous.
 */
const TEXTES = {
  fr: {
    title: 'Votre rendez-vous est réservé',
    body: 'Vous recevez la confirmation par e-mail, avec le lien de la visio ou le lieu du rendez-vous. Si un imprévu survient, le même e-mail permet de déplacer le créneau.',
    back: "Retour à l'accueil",
  },
  en: {
    title: 'Your meeting is booked',
    body: 'A confirmation email is on its way, with the video link or the meeting place. The same email lets you move the slot if something comes up.',
    back: 'Back to the home page',
  },
} as const;

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseMetadata: Metadata = {
  title: { absolute: 'TriggerFlow' },
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { ...baseMetadata, alternates: pageAlternates(locale, '/merci-rdv') };
}

export default async function MerciRdvPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = locale === 'en' ? TEXTES.en : TEXTES.fr;

  return (
    <main className="flex min-h-[70vh] items-center bg-brand-light/40 py-20">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <CalendarCheck className="h-12 w-12 text-brand-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-brand-dark">{t.title}</h1>
          <p className="text-lg text-zinc-600">{t.body}</p>
          <Link href={`/${locale}`} className="font-medium text-brand-primary underline">
            {t.back}
          </Link>
        </div>
      </Container>
      <BookingConversion />
    </main>
  );
}
