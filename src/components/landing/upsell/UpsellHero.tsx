'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from './primitives';

/**
 * Hero asymétrique : la promesse à gauche, l'offre telle que le client la
 * reçoit à droite. Aucune bande de réassurance ici, elle vit dans la section
 * suivante pour que le hero tienne dans le premier écran sur mobile.
 *
 * Le titre est une seule phrase, à une seule échelle. Composer la circonstance
 * en petit et la promesse en grand cassait la phrase en deux blocs sans lien
 * apparent : l'œil lisait une ligne grise, puis une affirmation, sans les
 * rattacher. Seule la couleur distingue désormais la promesse, ce qui suffit.
 *
 * Le retour à la ligne après la virgule n'est forcé qu'à partir de `lg`, là où
 * la colonne est assez large pour tenir la circonstance sur une ligne. En
 * dessous, la phrase se replie toute seule plutôt que de produire quatre lignes
 * courtes sur mobile.
 *
 * Le libellé de section « Ventes additionnelles » a été retiré : la ligne de
 * circonstance en tient lieu, et le sous-titre porte déjà les mots de
 * l'annonce (petit-déjeuner, spa, parking) pour la continuité publicitaire.
 */
/**
 * ─── ON ANIME DEPUIS UN ÉTAT VISIBLE, JAMAIS DEPUIS L'INVISIBLE ──────────
 * Les deux blocs ci-dessous entrent en glissant, mais leur état de départ est
 * OPAQUE. Framer Motion sérialise l'état initial dans le HTML prérendu : un
 * `opacity: 0` de départ part donc dans la page servie, et seul le JavaScript
 * le lève. Sur une page d'acquisition payante, un script qui tarde affichait
 * alors un premier écran vide, à la place même de la promesse qu'on a payée
 * pour faire lire. C'est ce qui a produit la capture au grand chiffre blanc.
 *
 * Le décalage vertical, lui, peut rester dans l'état de départ : il déplace le
 * bloc de vingt pixels, il ne l'efface pas. Sans JavaScript, le titre est lu,
 * simplement un peu plus bas.
 *
 * Ne pas « rétablir » `opacity: 0` ici pour rendre l'entrée plus franche. Ce
 * qui vit sous la ligne de flottaison peut apparaître en fondu au défilement,
 * le visiteur a forcément le script chargé quand il y arrive ; ce qui est dans
 * le premier écran, non.
 */
export function UpsellHero() {
  const t = useTranslations('lpUpsell.hero');
  const tc = useTranslations('lpUpsell.cta');
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--up-bg)] pt-12 pb-16 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[var(--up-accent-wash)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.28fr_0.72fr] lg:gap-12 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-balance text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-[var(--up-ink)] sm:text-[2.5rem] lg:text-[2.8rem] lg:leading-[1.08]">
            {t('titleLead')}{' '}
            <span className="text-[var(--up-accent-text)] lg:block">{t('titleStatement')}</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
            {t('subtitle')}
          </p>

          <div className="mt-9">
            <UpsellLinkButton href="#simulateur" size="lg">
              {tc('calculate')}
            </UpsellLinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 1, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] shadow-[var(--up-shadow-lg)]">
            <Image
              src="/images/lp/upsell/catalogue-client.webp"
              alt={t('imageAlt')}
              width={1600}
              height={1050}
              priority
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
