'use client';

import { selectIsPersistRehydrated } from '../model/persist-selectors';
import { useAppSelector } from '../store';
import { useIsHydrated } from './use-is-hydrated';

export function useIsPersistReady(storageKey: string): boolean {
  const isHydrated = useIsHydrated();
  const isRehydrated = useAppSelector(selectIsPersistRehydrated(storageKey));

  return isHydrated && isRehydrated;
}
