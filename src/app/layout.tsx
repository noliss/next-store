import { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';
import StoreProvider from './providers/StoreProvider';

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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
