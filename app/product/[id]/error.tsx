'use client';

import { RouteError, type ErrorPageProps } from '@/_app/ui/RouteError';

export default function ProductError({ error, reset }: ErrorPageProps) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Не удалось загрузить товар"
      description="Сервис товаров временно недоступен"
    />
  );
}
