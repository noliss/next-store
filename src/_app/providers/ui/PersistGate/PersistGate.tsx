'use client';

import type { ReactNode } from 'react';
import { useIsPersistReady } from '@/_app/lib/use-is-persist-ready';

interface PersistGateProps {
  storageKey: string;
  fallback: ReactNode;
  children: ReactNode;
}

export function PersistGate({ storageKey, fallback, children }: PersistGateProps) {
  const isReady = useIsPersistReady(storageKey);

  if (!isReady) return fallback;

  return children;
}
