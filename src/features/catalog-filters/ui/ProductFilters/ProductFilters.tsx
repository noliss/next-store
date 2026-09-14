'use client';

import { useRouter } from 'next/navigation';
import { Button, Checkbox, Field, Input, Link, Select } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import type { ProductSearchParams } from '@/entities/product';
import styles from './ProductFilters.module.scss';
import { buildCatalogHref, formDataToParams } from '../../lib/build-catalog-href';
import { SearchField } from '../SearchField';

interface ProductFiltersProps {
  values?: ProductSearchParams;
}

export function ProductFilters({ values = {} }: ProductFiltersProps) {
  const router = useRouter();

  const hasQuery = Boolean(
    values.category ||
    values.search ||
    values.minPrice ||
    values.maxPrice ||
    values.inStock ||
    values.sort
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    router.replace(buildCatalogHref(formDataToParams(data)));
  }

  return (
    <form
      className={styles.form}
      method="get"
      action={ROUTES.HOME}
      onSubmit={handleSubmit}
      aria-label="Фильтры каталога"
    >
      <SearchField className={styles.search} />

      <Field label="Категория">
        <Select name="category" defaultValue={values.category ?? ''}>
          <option value="">Все</option>
          <option value="rifle">Карабины</option>
          <option value="shotgun">Ружья</option>
        </Select>
      </Field>

      <Field label="Сортировка">
        <Select name="sort" defaultValue={values.sort ?? ''}>
          <option value="">По умолчанию</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="name">По названию</option>
          <option value="rating">По рейтингу</option>
        </Select>
      </Field>

      <fieldset className={styles.prices}>
        <legend className={styles.legend}>Цена, ₽</legend>
        <div className={styles.priceRow}>
          <Input
            type="number"
            name="minPrice"
            min={0}
            step={1}
            inputMode="numeric"
            defaultValue={values.minPrice ?? ''}
            placeholder="От"
            aria-label="Цена от"
            fullWidth={false}
            className={styles.priceInput}
          />
          <span className={styles.priceSep} aria-hidden="true">
            —
          </span>
          <Input
            type="number"
            name="maxPrice"
            min={0}
            step={1}
            inputMode="numeric"
            defaultValue={values.maxPrice ?? ''}
            placeholder="До"
            aria-label="Цена до"
            fullWidth={false}
            className={styles.priceInput}
          />
        </div>
      </fieldset>

      <Checkbox
        name="inStock"
        value="1"
        label="В наличии"
        defaultChecked={values.inStock === '1'}
      />

      <div className={styles.actions}>
        <Button type="submit" size="sm">
          Применить
        </Button>
        {hasQuery && (
          <Link href={ROUTES.HOME} className={styles.reset}>
            Сбросить
          </Link>
        )}
      </div>
    </form>
  );
}
