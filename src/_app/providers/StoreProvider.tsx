'use client';

import { useState, type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '../store';

export function StoreProvider({ children }: PropsWithChildren) {
  const [store] = useState<AppStore>(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
