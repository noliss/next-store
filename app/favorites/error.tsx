'use client';

import { RouteError, type ErrorPageProps } from '@/_app/ui/RouteError';

export default function FavoritesError({ error, reset }: ErrorPageProps) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Не удалось загрузить избранное"
      description="Товары не подгрузились, но список избранного сохранён"
    />
  );
}
