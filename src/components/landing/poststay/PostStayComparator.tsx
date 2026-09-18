'use client';

import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  POST_STAY_CTA_SHAPES,
  POST_STAY_MEASURED_SETUPS,
  POST_STAY_REVIEW_LINK,
  POST_STAY_SEND_HOURS,
  sampleSizeOf,
  type PostStayReference,
} from '@/data/post-stay';
import { cn } from '@/lib/utils';
import { UpsellEyebrow, UpsellFigure, UpsellSection } from '../upsell/primitives';

/**
 * Les deux e-mails post-séjour, côte à côte, et rien à saisir.
 *
 * Cette section a remplacé un calculateur qui demandait ses trois réglages au
 * visiteur. Il était à jeter pour trois raisons, et les trois expliquent la
 * forme d'ici :
 *
 * 1. Il réclamait des informations que l'hôtelier n'a pas en tête et doit
 *    aller relire dans son propre e-mail. Le comparateur ne demande rien.
 * 2. Il rendait un taux là où la landing jumelle rend des euros. Le
 *    comparateur n'annonce plus le chiffre DU visiteur : il montre deux
 *    montages mesurés et laisse chacun se reconnaître dans l'un des deux.
 * 3. Il alignait trois unités dans un même panneau (chambres, pourcentage
 *    d'occupation, taux d'avis). Ici tout est dans la même unité, le taux
 *    d'avis terminés par e-mail envoyé.
 *
 * ─── LES DEUX MESSAGES SONT DES RECONSTRUCTIONS ──────────────────────────
 * Ce ne sont pas des captures d'e-mails de clients, et la page le dit à
 * l'écran, juste au-dessus des deux cartes. Ce n'est pas une précaution
 * juridique de bas de page : la seule chose que cette landing vend est la
 * solidité de sa mesure. Faire passer une maquette pour la capture d'un vrai
 * e-mail d'hôtel, c'est offrir à qui le découvrirait de quoi jeter tous les
 * autres chiffres de la page avec celui-là. Aucun nom d'établissement n'est
 * cité, ni réel ni inventé, pour la même raison.
 *
 * ─── AUCUN TAUX ÉCRIT DANS UNE TRADUCTION ────────────────────────────────
 * Les huit taux affichés ici sont tous lus dans `@/data/post-stay` et injectés
 * dans les libellés. Un chiffre recopié en dur dans `fr.json` dériverait de sa
 * constante à la première ré-extraction, et la page se contredirait d'une
 * section à l'autre. Le défaut a déjà été relevé deux fois sur ce dépôt.
 *
 * ─── PAS D'ANIMATION D'APPARITION ────────────────────────────────────────
 * Volontairement aucun `motion` ici, ni au montage ni au défilement. Le reste
 * de la page en utilise, et le HTML prérendu part alors avec un
 * `style="opacity:0"` que seul le JavaScript lève : sur une capture prise
 * avant l'hydratation, le grand chiffre du panneau qui occupait cette place
 * apparaissait blanc. Les deux taux de cette section portent tout l'argument,
 * ils doivent être lisibles même si le script n'arrive jamais.
 */

/** Les trois différences numérotées, dans l'ordre où elles sont annotées. */
const ANNOTATIONS = [
  {
    id: 'cta',
    best: POST_STAY_CTA_SHAPES.find((shape) => shape.id === 'singleButton'),
    worst: POST_STAY_CTA_SHAPES.find((shape) => shape.id === 'starRow'),
  },
  {
    id: 'hour',
    best: POST_STAY_SEND_HOURS.find((hour) => hour.id === 'nineToEleven'),
    worst: POST_STAY_SEND_HOURS.find((hour) => hour.id === 'afterTwenty'),
  },
  {
    id: 'link',
    best: POST_STAY_REVIEW_LINK.absent,
    worst: POST_STAY_REVIEW_LINK.present,
  },
] as const satisfies readonly {
  id: string;
  /**
   * `find` peut rendre `undefined` : une faute de frappe dans un identifiant
   * ne doit pas s'afficher en « 0 % », elle doit casser bruyamment. C'est
   * `rateOf` qui lève, à la lecture.
   */
  best: PostStayReference | undefined;
  worst: PostStayReference | undefined;
}[];

export function PostStayComparator() {
  const t = useTranslations('lpPostStay.comparator');

  /** Taux en pourcentage, ou une erreur bruyante plutôt qu'un « 0 % » muet. */
  const rateOf = (reference: PostStayReference | undefined, label: string): number => {
    if (!reference) throw new Error(`Référence post-séjour introuvable : ${label}`);
    return reference.completionRate * 100;
  };

  return (
    <UpsellSection id="comparatif" className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        {/* L'avertissement de reconstruction, en clair et au-dessus des deux
            cartes. Il n'est ni replié ni réduit à une note de bas de section :
            il doit être lu avant les maquettes, pas après. */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-[var(--up-line-strong)] bg-[var(--up-surface-alt)] p-5 sm:p-6">
          <p className="text-sm font-semibold text-[var(--up-ink)]">{t('reconstructionTitle')}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('reconstructionBody')}
          </p>
        </div>

        {/* Deux colonnes seulement à partir de `lg`. En dessous les deux
            e-mails s'empilent à pleine largeur au lieu de rétrécir : à 400 px,
            deux maquettes côte à côte ne seraient plus lisibles ni l'une ni
            l'autre. */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <EmailCard
            tone="effective"
            rate={rateOf(POST_STAY_MEASURED_SETUPS.effective, 'effective')}
          />
          <EmailCard
            tone="ineffective"
            rate={rateOf(POST_STAY_MEASURED_SETUPS.ineffective, 'ineffective')}
          />
        </div>

        <div className="mt-12 lg:mt-14">
          <h3 className="text-xl font-semibold text-[var(--up-ink)]">{t('annotationsTitle')}</h3>

          <ol className="mt-6 grid gap-5 md:grid-cols-3 md:gap-6">
            {ANNOTATIONS.map((annotation, index) => {
              const worstSample = annotation.worst ? sampleSizeOf(annotation.worst) : undefined;

              return (
                <li
                  key={annotation.id}
                  className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 sm:p-6"
                >
                  <Marker number={index + 1} label={t('markerLabel', { number: index + 1 })} />

                  <h4 className="mt-3 text-base font-semibold leading-snug text-[var(--up-ink)]">
                    {t(`annotations.${annotation.id}.title`)}
                  </h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                    {t(`annotations.${annotation.id}.body`)}
                  </p>

                  <dl className="mt-5 space-y-2.5 border-t border-[var(--up-line)] pt-4">
                    <RateRow
                      label={t(`annotations.${annotation.id}.bestLabel`)}
                      rate={t('rateValue', {
                        rate: rateOf(annotation.best, `${annotation.id}.best`),
                      })}
                      tone="best"
                    />
                    <RateRow
                      label={t(`annotations.${annotation.id}.worstLabel`)}
                      rate={t('rateValue', {
                        rate: rateOf(annotation.worst, `${annotation.id}.worst`),
                      })}
                      tone="worst"
                    />
                  </dl>

                  {/* Le créneau du soir est bien mesuré, mais sur quelques
                      centaines d'envois quand les autres en comptent des
                      milliers. Ce garde-fou vivait dans le simulateur ; il
                      suit le chiffre qu'il protège, il ne disparaît pas avec
                      le bloc qui le portait. */}
                  {worstSample !== undefined && (
                    <p className="mt-4 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                      {t('thinSampleNote', { sends: worstSample })}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('methodNote')}
          </p>
        </div>
      </div>
    </UpsellSection>
  );
}

/**
 * Une des deux maquettes. Le ton ne change que l'habillage : même gabarit,
 * même ordre de lecture, pour que l'œil compare les différences et non les
 * mises en page.
 */
function EmailCard({ tone, rate }: { tone: 'effective' | 'ineffective'; rate: number }) {
  const t = useTranslations('lpPostStay.comparator');
  const isEffective = tone === 'effective';

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border bg-[var(--up-surface)]',
        isEffective
          ? 'border-[var(--up-accent)] shadow-[var(--up-shadow-lg)]'
          : 'border-[var(--up-line-strong)] shadow-[var(--up-shadow-sm)]'
      )}
    >
      {/* Le verdict en tête de carte : le taux mesuré du montage entier. */}
      <div
        className={cn(
          'border-b px-5 py-5 sm:px-7',
          isEffective
            ? 'border-[var(--up-line)] bg-[var(--up-accent-wash)]'
            : 'border-[var(--up-line)] bg-[var(--up-surface-alt)]'
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--up-ink-muted)]">
          {t(`${tone}.badge`)}
        </p>
        <p
          className={cn(
            'mt-2 text-[2.75rem] font-semibold leading-none tracking-[-0.03em]',
            isEffective ? 'text-[var(--up-accent-text)]' : 'text-[var(--up-ink-muted)]'
          )}
        >
          <UpsellFigure value={t('rateNumber', { rate })} unit="%" />
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
          {t('rateCaption')}
        </p>
      </div>

      {/* L'en-tête du message : objet, puis heure d'envoi annotée. */}
      <div className="border-b border-[var(--up-line)] bg-[var(--up-surface-alt)] px-5 py-4 sm:px-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--up-ink-muted)]">
          {t('subjectLabel')}
        </p>
        <p className="mt-1.5 text-[17px] font-semibold leading-snug text-[var(--up-ink)]">
          {t(`${tone}.subject`)}
        </p>
        <p className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px] text-[var(--up-ink-muted)]">
          <Marker number={2} label={t('markerLabel', { number: 2 })} />
          {t(`${tone}.timing`)}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-5 py-7 sm:px-7">
        <p className="text-[15px] text-[var(--up-ink)]">{t('greeting')}</p>
        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
          {t(`${tone}.body`)}
        </p>

        {isEffective ? (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Marker number={1} label={t('markerLabel', { number: 1 })} />
            {/* Faux bouton : c'est la maquette d'un e-mail, pas un appel à
                l'action de la page. Un lien ici partirait vers nulle part et
                concurrencerait le seul bouton qui compte, celui du
                formulaire. Masqué aux lecteurs d'écran pour la même raison. */}
            <p
              aria-hidden
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--up-accent)] px-6 py-3 text-sm font-semibold text-[var(--up-accent-ink)]"
            >
              {t('effective.button')}
            </p>
          </div>
        ) : (
          <div className="mt-7">
            <div className="flex flex-wrap items-center gap-3">
              <Marker number={1} label={t('markerLabel', { number: 1 })} />
              <span aria-hidden className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((index) => (
                  <Star
                    key={index}
                    className="h-7 w-7 fill-[var(--up-highlight)] text-[var(--up-highlight)]"
                    strokeWidth={1.5}
                  />
                ))}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
              {t('ineffective.starsHint')}
            </p>
          </div>
        )}

        {/* La troisième différence : le lien concurrent. Il EXISTE d'un côté,
            et les deux cartes ne peuvent donc pas le traiter pareil.
            À droite c'est du texte d'e-mail, composé comme le reste du corps.
            À gauche il n'y a rien à montrer : la carte pose une note, sur un
            aplat qui la sépare nettement du message, parce qu'une absence ne
            se voit que si on la désigne, et qu'une note glissée dans le corps
            se lirait comme une phrase de l'e-mail. */}
        {isEffective ? (
          <p className="mt-7 flex flex-wrap items-start gap-2.5 rounded-xl bg-[var(--up-accent-wash)] p-4 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
            <Marker number={3} label={t('markerLabel', { number: 3 })} />
            <span className="min-w-0 flex-1">{t('effective.reviewLink')}</span>
          </p>
        ) : (
          <p className="mt-5 flex flex-wrap items-start gap-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            <Marker number={3} label={t('markerLabel', { number: 3 })} />
            <span className="min-w-0 flex-1">{t('ineffective.reviewLink')}</span>
          </p>
        )}

        {/* La signature est poussée en bas de carte : les deux maquettes n'ont
            pas le même nombre de lignes, et deux signatures qui ne tombent pas
            à la même hauteur donneraient l'impression que les gabarits
            diffèrent, alors que seul le contenu diffère. */}
        <p className="mt-7 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-muted)] lg:mt-auto">
          {t(`${tone}.signature`)}
        </p>
      </div>
    </div>
  );
}

/**
 * La pastille numérotée qui relie une ligne de maquette à son annotation.
 *
 * Le chiffre est décoratif pour l'œil mais porteur de sens : il est doublé
 * d'un libellé lisible par un lecteur d'écran, sans quoi la liste des trois
 * différences serait annoncée sans qu'on sache à quoi chacune se rattache.
 */
function Marker({ number, label }: { number: number; label: string }) {
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--up-accent)] font-[family-name:var(--font-geist-mono)] text-xs font-semibold text-[var(--up-accent-ink)]">
      <span aria-hidden>{number}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Une ligne « libellé, taux » dans une annotation. */
function RateRow({ label, rate, tone }: { label: string; rate: string; tone: 'best' | 'worst' }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[13px] leading-snug text-[var(--up-ink-soft)]">{label}</dt>
      <dd
        className={cn(
          'shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-semibold [font-variant-numeric:tabular-nums]',
          tone === 'best' ? 'text-[var(--up-accent-text)]' : 'text-[var(--up-ink-muted)]'
        )}
      >
        {rate}
      </dd>
    </div>
  );
}
