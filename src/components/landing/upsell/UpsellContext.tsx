'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import {
  DEFAULT_ENABLED_SERVICE_IDS,
  SIMULATOR_BOUNDS,
} from '@/data/upsell-services';
import { calculateUpsellRevenue, type SimulatorResult } from '@/lib/upsell-simulator';

/**
 * État partagé de la landing page : le simulateur écrit, le formulaire lit.
 * Le formulaire arrive ainsi pré-rempli avec le nombre de chambres et transmet
 * le potentiel estimé, ce qui fait remonter un lead déjà qualifié.
 *
 * Le résultat du simulateur est toujours visible, dans les deux variantes :
 * seule l'offre de conversion change (démo ou livre blanc).
 */

/** Offre de conversion testée. C'est la seule différence entre les deux LP. */
export type UpsellGoal = 'demo' | 'whitepaper';

interface UpsellContextValue {
  goal: UpsellGoal;
  rooms: number;
  setRooms: (value: number) => void;
  occupancy: number;
  setOccupancy: (value: number) => void;
  enabledIds: string[];
  toggleService: (id: string) => void;
  result: SimulatorResult;
  /** Passe à true dès que l'utilisateur a manipulé le simulateur. */
  hasInteracted: boolean;
  markInteracted: () => void;
}

const UpsellContext = createContext<UpsellContextValue | null>(null);

export function UpsellProvider({
  goal,
  children,
}: {
  goal: UpsellGoal;
  children: React.ReactNode;
}) {
  const [rooms, setRooms] = useState<number>(SIMULATOR_BOUNDS.rooms.default);
  const [occupancy, setOccupancy] = useState<number>(SIMULATOR_BOUNDS.occupancy.default);
  const [enabledIds, setEnabledIds] = useState<string[]>([...DEFAULT_ENABLED_SERVICE_IDS]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const result = useMemo(
    () => calculateUpsellRevenue({ rooms, occupancyRate: occupancy, enabledServiceIds: enabledIds }),
    [rooms, occupancy, enabledIds]
  );

  const value = useMemo<UpsellContextValue>(
    () => ({
      goal,
      rooms,
      setRooms,
      occupancy,
      setOccupancy,
      enabledIds,
      toggleService: (id: string) =>
        setEnabledIds((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        ),
      result,
      hasInteracted,
      markInteracted: () => setHasInteracted(true),
    }),
    [goal, rooms, occupancy, enabledIds, result, hasInteracted]
  );

  return <UpsellContext.Provider value={value}>{children}</UpsellContext.Provider>;
}

export function useUpsell(): UpsellContextValue {
  const context = useContext(UpsellContext);
  if (!context) {
    throw new Error('useUpsell doit être utilisé dans un <UpsellProvider>');
  }
  return context;
}
