import { ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

interface PricingRedirectProps {
  id?: string;
}

/**
 * Remplace les blocs « tarifs partenaires » : le site n'affiche plus que la
 * grille publique, sur /tarifs.
 */
export function PricingRedirect({ id }: PricingRedirectProps) {
  return (
    <section id={id} className="bg-white py-16 md:py-24">
      <Container className="text-center">
        <h2 className="font-serif text-3xl font-bold text-text-primary md:text-4xl">
          Des tarifs publics, sans surprise
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          Un plan gratuit pour démarrer, des plans mensuels sans engagement. Tous les détails sont sur notre page tarifs.
        </p>
        <ButtonLink href="/fr/tarifs" variant="primary" size="lg" className="mt-8 gap-2">
          Voir les tarifs
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}
