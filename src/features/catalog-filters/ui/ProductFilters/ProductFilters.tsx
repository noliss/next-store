'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox, Field, Input, Link, Select } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import type { ProductSearchParams } from '@/entities/product';
import styles from './ProductFilters.module.scss';
import { buildQueryHref } from '../../lib/build-query-href';
import { SearchField } from '../SearchField';

const PRICE_DEBOUNCE_MS = 300;
const FILTERS_TITLE_ID = 'catalog-filters-title';

interface ProductFiltersProps {
  values?: ProductSearchParams;
}

export function ProductFilters({ values = {} }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlMinPrice = values.minPrice ?? '';
  const urlMaxPrice = values.maxPrice ?? '';

  const [prices, setPrices] = useState({ min: urlMinPrice, max: urlMaxPrice });
  const pendingPricesRef = useRef<{ min: string; max: string } | null>(null);
  const prevUrlPricesRef = useRef({ min: urlMinPrice, max: urlMaxPrice });

  useEffect(() => {
    const prev = prevUrlPricesRef.current;
    if (urlMinPrice === prev.min && urlMaxPrice === prev.max) return;

    const pending = pendingPricesRef.current;
    const isOwnNavigation = pending?.min === urlMinPrice && pending?.max === urlMaxPrice;
    if (!isOwnNavigation) setPrices({ min: urlMinPrice, max: urlMaxPrice });

    pendingPricesRef.current = null;
    prevUrlPricesRef.current = { min: urlMinPrice, max: urlMaxPrice };
  }, [urlMinPrice, urlMaxPrice]);

  useEffect(() => {
    const min = prices.min.trim();
    const max = prices.max.trim();

    if (min === urlMinPrice && max === urlMaxPrice) return;

    const timer = window.setTimeout(() => {
      pendingPricesRef.current = { min, max };
      router.replace(buildQueryHref(searchParams, { minPrice: min, maxPrice: max }));
    }, PRICE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [prices, urlMinPrice, urlMaxPrice, router, searchParams]);

  const hasQuery = Boolean(
    values.category ||
      values.search ||
      values.minPrice ||
      values.maxPrice ||
      values.inStock ||
      values.sort
  );

  function apply(changes: Record<string, string>) {
    router.replace(buildQueryHref(searchParams, changes));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apply({ minPrice: prices.min, maxPrice: prices.max });
  }

  return (
    <form
      className={styles.form}
      method="get"
      action={ROUTES.HOME}
      onSubmit={handleSubmit}
      aria-labelledby={FILTERS_TITLE_ID}
    >
      <h2 className={styles.title} id={FILTERS_TITLE_ID}>
        Фильтры
      </h2>

      <SearchField className={styles.search} />

      <Field label="Категория">
        <Select
          name="category"
          value={values.category ?? ''}
          onChange={(event) => apply({ category: event.target.value })}
        >
          <option value="">Все</option>
          <option value="rifle">Карабины</option>
          <option value="shotgun">Ружья</option>
        </Select>
      </Field>

      <Field label="Сортировка">
        <Select
          name="sort"
          value={values.sort ?? ''}
          onChange={(event) => apply({ sort: event.target.value })}
        >
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
            value={prices.min}
            onChange={(event) => setPrices((current) => ({ ...current, min: event.target.value }))}
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
            value={prices.max}
            onChange={(event) => setPrices((current) => ({ ...current, max: event.target.value }))}
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
        checked={values.inStock === '1'}
        onChange={(event) => apply({ inStock: event.target.checked ? '1' : '' })}
      />

      <div className={styles.actions}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<button type="submit" class="${styles.noscriptSubmit}">Применить</button>`,
          }}
        />
        {hasQuery && (
          <Link href={ROUTES.HOME} className={styles.reset}>
            Сбросить
          </Link>
        )}
      </div>
    </form>
  );
}
