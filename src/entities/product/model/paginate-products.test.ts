import { describe, expect, it } from 'vitest';
import { paginateProducts, PRODUCTS_PER_PAGE } from './paginate-products';
import type { Product } from './types';

const makeProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    name: `Товар ${index + 1}`,
    previewPicture: null,
    price: 100,
    discountPrice: null,
    category: 'rifle' as const,
    inStock: true,
    quantity: 1,
    reviewsCount: 0,
    characteristics: [],
    labels: { discount: null, newLabel: null },
  }));

describe('paginateProducts', () => {
  it('отдаёт первую страницу без параметра', () => {
    const result = paginateProducts(makeProducts(30));

    expect(result.page).toBe(1);
    expect(result.items).toHaveLength(PRODUCTS_PER_PAGE);
    expect(result.items[0].id).toBe('1');
  });

  it('считает количество страниц с остатком', () => {
    expect(paginateProducts(makeProducts(25)).totalPages).toBe(3);
    expect(paginateProducts(makeProducts(24)).totalPages).toBe(2);
  });

  it('возвращает как минимум одну страницу для пустого списка', () => {
    const result = paginateProducts([]);

    expect(result.totalPages).toBe(1);
    expect(result.items).toEqual([]);
  });

  it('отдаёт запрошенную страницу', () => {
    const result = paginateProducts(makeProducts(30), '2');

    expect(result.page).toBe(2);
    expect(result.items[0].id).toBe('13');
  });

  it('отдаёт неполную последнюю страницу', () => {
    const result = paginateProducts(makeProducts(25), '3');

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe('25');
  });

  it('прижимает номер страницы к границам диапазона', () => {
    expect(paginateProducts(makeProducts(30), '99').page).toBe(3);
    expect(paginateProducts(makeProducts(30), '0').page).toBe(1);
    expect(paginateProducts(makeProducts(30), '-5').page).toBe(1);
  });

  it('игнорирует нечисловой и дробный номер', () => {
    expect(paginateProducts(makeProducts(30), 'abc').page).toBe(1);
    expect(paginateProducts(makeProducts(30), '2.7').page).toBe(2);
  });
});
