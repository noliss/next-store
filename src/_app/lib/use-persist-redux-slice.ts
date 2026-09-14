'use client';

import { useEffect, useRef } from 'react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { readStorage, writeStorage } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '../store';
import type { RootState } from '../store';
import { markPersistRehydrated } from '../model/persist-slice';

export interface PersistSliceConfig<T> {
  storageKey: string;
  fallback: T;
  selectValue: (state: RootState) => T;
  hydrateAction: ActionCreatorWithPayload<T>;
}

export type AnyPersistSliceConfig = PersistSliceConfig<unknown>;

export function definePersistSlice<T>(config: PersistSliceConfig<T>): AnyPersistSliceConfig {
  return config as AnyPersistSliceConfig;
}

export function usePersistReduxSlice<T>({
  storageKey,
  fallback,
  selectValue,
  hydrateAction,
}: PersistSliceConfig<T>) {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectValue);
  const skipNextSaveRef = useRef(true);

  useEffect(() => {
    dispatch(hydrateAction(readStorage(storageKey, fallback)));
    dispatch(markPersistRehydrated(storageKey));
  }, [dispatch, storageKey, fallback, hydrateAction]);

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    writeStorage(storageKey, value);
  }, [storageKey, value]);
}
