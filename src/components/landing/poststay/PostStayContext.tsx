'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import {
  POST_STAY_BOUNDS,
  POST_STAY_DEFAULT_SETTINGS,
  type CtaShapeId,
  type SendHourId,
} from '@/data/post-stay';
import { calculatePostStayReviews, type PostStayResult } from '@/lib/post-stay-simulator';

/**
 * État partagé de la landing post-séjour : le simulateur écrit, le panneau de
 * résultat et le formulaire lisent.
 *
 * Volontairement distinct de `UpsellContext` et non factorisé avec lui : les
 * deux pages n'ont ni les mêmes entrées (trois réglages ici, un catalogue de
 * prestations là-bas) ni le même résultat. Une abstraction commune coûterait
 * un paramètre de type par champ, pour zéro ligne économisée.
 *
 * Le résultat est visible sans rien donner en échange. Le masquer derrière le
 * formulaire capterait davantage d'adresses, mais la page vend un guide dont
 * tout l'argument est la transparence de la mesure : cacher le chiffre serait
 * se contredire dès le premier écran.
 */
interface PostStayContextValue {
  rooms: number;
  setRooms: (value: number) => void;
  occupancy: number;
  setOccupancy: (value: number) => void;
  sendHourId: SendHourId;
  setSendHourId: (value: SendHourId) => void;
  ctaShapeId: CtaShapeId;
  setCtaShapeId: (value: CtaShapeId) => void;
  hasReviewSiteLink: boolean;
  setHasReviewSiteLink: (value: boolean) => void;
  result: PostStayResult;
  /** Passe à true dès que le visiteur a touché une commande du simulateur. */
  hasInteracted: boolean;
  markInteracted: () => void;
}

const PostStayContext = createContext<PostStayContextValue | null>(null);

export function PostStayProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<number>(POST_STAY_BOUNDS.rooms.default);
  const [occupancy, setOccupancy] = useState<number>(POST_STAY_BOUNDS.occupancy.default);
  const [sendHourId, setSendHourId] = useState<SendHourId>(
    POST_STAY_DEFAULT_SETTINGS.sendHourId
  );
  const [ctaShapeId, setCtaShapeId] = useState<CtaShapeId>(
    POST_STAY_DEFAULT_SETTINGS.ctaShapeId
  );
  const [hasReviewSiteLink, setHasReviewSiteLink] = useState<boolean>(
    POST_STAY_DEFAULT_SETTINGS.hasReviewSiteLink
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const result = useMemo(
    () =>
      calculatePostStayReviews({
        rooms,
        occupancyRate: occupancy,
        sendHourId,
        ctaShapeId,
        hasReviewSiteLink,
      }),
    [rooms, occupancy, sendHourId, ctaShapeId, hasReviewSiteLink]
  );

  const value = useMemo<PostStayContextValue>(
    () => ({
      rooms,
      setRooms,
      occupancy,
      setOccupancy,
      sendHourId,
      setSendHourId,
      ctaShapeId,
      setCtaShapeId,
      hasReviewSiteLink,
      setHasReviewSiteLink,
      result,
      hasInteracted,
      markInteracted: () => setHasInteracted(true),
    }),
    [rooms, occupancy, sendHourId, ctaShapeId, hasReviewSiteLink, result, hasInteracted]
  );

  return <PostStayContext.Provider value={value}>{children}</PostStayContext.Provider>;
}

export function usePostStay(): PostStayContextValue {
  const context = useContext(PostStayContext);
  if (!context) {
    throw new Error('usePostStay doit être utilisé dans un <PostStayProvider>');
  }
  return context;
}
