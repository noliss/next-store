'use client';

import {
  usePersistReduxSlice,
  type AnyPersistSliceConfig,
} from '../../../lib/use-persist-redux-slice';

export function PersistSlice(config: AnyPersistSliceConfig) {
  usePersistReduxSlice(config);
  return null;
}
