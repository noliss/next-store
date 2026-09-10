'use client';

import { useState, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState<AppStore>(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
