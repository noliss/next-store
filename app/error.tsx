'use client';

import { RouteError, type ErrorPageProps } from '@/_app/ui/RouteError';

export default function CatalogError({ error, reset }: ErrorPageProps) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Не удалось загрузить каталог"
      description="Сервис товаров временно недоступен"
    />
  );
}
