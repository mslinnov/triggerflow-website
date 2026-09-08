'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UPSELL_SERVICES } from '@/data/upsell-services';
import { UpsellAmount, UpsellSection } from './primitives';

/**
 * Le manque à gagner, pris par l'angle de la marge et non du volume.
 *
 * Le petit-déjeuner, le restaurant et le spa font le gros du chiffre, mais
 * chacun a un coût en face : denrées, personnel, créneau de praticien. Les
 * trois prestations retenues ici n'en ont aucun. Une chambre libérée à 15 h au
 * lieu de 11 h n'a rien coûté de plus à personne, donc l'euro vendu est un euro
 * de marge, à la commission bancaire près. C'est l'argument qui parle à un
 * exploitant : pas « vous vendrez plus », mais « vous gagnerez plus sur ce que
 * vous vendez déjà ».
 *
 * Bande sombre pleine largeur : affirmation à gauche, constats à droite, avec
 * le prix médian constaté en tête de chaque constat. Aucun encadré, la
 * hiérarchie tient aux filets et à l'échelle du chiffre.
 */

/**
 * Les trois prestations sans coût variable, dans l'ordre du séjour.
 *
 * C'est un choix éditorial et non un filtre : le parking et le supplément
 * animaux sont eux aussi sans coût variable, mais ils ne racontent pas la même
 * histoire, celle d'un service qu'on cède au comptoir faute de l'avoir proposé.
 *
 * Les prix sont résolus une fois au chargement du module. Chercher dans le
 * catalogue à chaque rendu laissait passer un identifiant mal orthographié
 * sous la forme d'un « 0 € » affiché ; ici, une faute de frappe casse le
 * chargement du module, ce qui est le bon moment pour l'apprendre.
 */
const MARGIN_SERVICES = (['earlyCheckin', 'roomUpgrade', 'lateCheckout'] as const).map((id) => {
  const service = UPSELL_SERVICES.find((candidate) => candidate.id === id);
  if (!service) throw new Error(`Prestation inconnue dans UPSELL_SERVICES : ${id}`);
  return { id, price: service.medianPrice };
});

export function UpsellGap() {
  const t = useTranslations('lpUpsell.gap');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-ink)] text-[var(--up-bg)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed opacity-75">{t('subtitle')}</p>

          <p className="mt-9 max-w-[38ch] border-t border-white/15 pt-8 text-[15px] leading-relaxed opacity-65">
            {t('margin')}
          </p>
        </div>

        <ul className="divide-y divide-white/12">
          {MARGIN_SERVICES.map(({ id, price }, index) => (
            <motion.li
              key={id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-7 gap-y-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr]"
            >
              <div className="sm:pt-1">
                <p className="text-2xl font-semibold leading-none text-[var(--up-highlight)]">
                  <UpsellAmount amount={price} />
                </p>
                {/* Casse normale : trois petites capitales espacées d'affilée
                    auraient lu comme trois libellés de section. */}
                <p className="mt-1.5 text-[13px] leading-snug opacity-55">{t('noCost')}</p>
              </div>

              <div>
                <h3 className="text-xl leading-snug md:text-[1.35rem]">{t(`${id}.statement`)}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed opacity-60">
                  {t(`${id}.consequence`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </UpsellSection>
  );
}
