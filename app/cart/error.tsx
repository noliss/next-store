'use client';

import { RouteError, type ErrorPageProps } from '@/_app/ui/RouteError';

export default function CartError({ error, reset }: ErrorPageProps) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Не удалось загрузить корзину"
      description="Товары не подгрузились, но состав корзины сохранён"
    />
  );
}
