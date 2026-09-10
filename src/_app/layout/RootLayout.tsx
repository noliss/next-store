import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import { PageFooter, PageHeader } from '@/widgets';
import { StoreProvider } from '../providers';

import '@/shared/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Магазин',
    default: 'Магазин',
  },
  description: 'Лучшие товары по доступным ценам',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <PageHeader />
          <main>{children}</main>
          <PageFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
