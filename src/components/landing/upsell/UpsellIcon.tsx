import {
  ArrowUpRight,
  Bike,
  Car,
  CircleParking,
  Clock,
  Croissant,
  Flower2,
  Heart,
  PawPrint,
  Sunrise,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from 'lucide-react';

/**
 * Table des icônes des prestations. La configuration (src/data/upsell-services.ts)
 * ne référence qu'un nom, ce qui évite d'importer toute la librairie d'icônes.
 */
const ICONS: Record<string, LucideIcon> = {
  Clock,
  Sunrise,
  ArrowUpRight,
  Flower2,
  UtensilsCrossed,
  Croissant,
  CircleParking,
  Heart,
  Car,
  Bike,
  Wine,
  PawPrint,
};

export function UpsellIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Clock;
  return <Icon className={className} strokeWidth={1.9} aria-hidden />;
}
