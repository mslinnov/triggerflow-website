'use client';

import { useSyncExternalStore } from 'react';
import { isWithinWindow } from '@/data/equiphotel';

interface ShowWhenClientProps {
  from?: string;
  until?: string;
  initial: boolean;
  children: React.ReactNode;
}

const subscribe = () => () => {};

export function ShowWhenClient({ from, until, initial, children }: ShowWhenClientProps) {
  const visible = useSyncExternalStore(
    subscribe,
    () => isWithinWindow(from, until),
    () => initial
  );
  return visible ? <>{children}</> : null;
}
