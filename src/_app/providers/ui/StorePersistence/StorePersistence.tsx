'use client';

import { persistRegistry } from '../../../lib/persist-registry';
import { PersistSlice } from '../PersistSlice';

export function StorePersistence() {
  return (
    <>
      {persistRegistry.map((config) => (
        <PersistSlice key={config.storageKey} {...config} />
      ))}
    </>
  );
}
