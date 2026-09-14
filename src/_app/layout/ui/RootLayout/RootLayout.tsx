import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import { PageFooter, PageHeader } from '@/widgets';
import { StorePersistence, StoreProvider } from '../../../providers';

import '@/shared/styles/globals.scss';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Магазин',
    default: 'Магазин',
  },
  description: 'Лучшие товары по доступным ценам',
  openGraph: {
    type: 'website',
    siteName: 'Магазин',
    locale: 'ru_RU',
    url: '/',
    title: 'Магазин',
    description: 'Лучшие товары по доступным ценам',
  },
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
          <StorePersistence />
          <PageHeader />
          <main>{children}</main>
          <PageFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
