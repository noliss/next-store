import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectPersistState = (state: RootState) => state.persist;

export const selectIsPersistRehydrated = (storageKey: string) =>
  createSelector(selectPersistState, (persist) => persist.rehydratedKeys.includes(storageKey));
