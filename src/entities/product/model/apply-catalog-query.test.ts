import { describe, expect, it } from 'vitest';
import { applyCatalogQuery } from './apply-catalog-query';
import type { Product } from './types';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  name: 'Карабин Вепрь',
  previewPicture: null,
  price: 100000,
  discountPrice: null,
  category: 'rifle',
  inStock: true,
  quantity: 5,
  reviewsCount: 0,
  characteristics: [],
  labels: { discount: null, newLabel: null },
  ...overrides,
});

describe('applyCatalogQuery', () => {
  it('фильтрует по категории', () => {
    const items = [
      makeProduct({ id: '1', category: 'rifle' }),
      makeProduct({ id: '2', category: 'shotgun' }),
    ];

    expect(applyCatalogQuery(items, { category: 'shotgun' }).map((item) => item.id)).toEqual(['2']);
  });

  it('игнорирует неизвестную категорию', () => {
    const items = [makeProduct({ id: '1' }), makeProduct({ id: '2' })];

    expect(applyCatalogQuery(items, { category: 'pistol' })).toHaveLength(2);
  });

  it('оставляет только товары в наличии', () => {
    const items = [
      makeProduct({ id: '1', inStock: true }),
      makeProduct({ id: '2', inStock: false }),
    ];

    expect(applyCatalogQuery(items, { inStock: '1' }).map((item) => item.id)).toEqual(['1']);
  });

  it('сравнивает диапазон цен по цене со скидкой', () => {
    const items = [makeProduct({ id: '1', price: 100000, discountPrice: 50000 })];

    expect(applyCatalogQuery(items, { maxPrice: '60000' })).toHaveLength(1);
    expect(applyCatalogQuery(items, { minPrice: '60000' })).toHaveLength(0);
  });

  it('ищет по названию без учёта регистра', () => {
    const items = [
      makeProduct({ id: '1', name: 'Карабин Вепрь' }),
      makeProduct({ id: '2', name: 'Ружьё ИЖ' }),
    ];

    expect(applyCatalogQuery(items, { search: '  вепрь ' }).map((item) => item.id)).toEqual(['1']);
  });

  it('сортирует по цене со скидкой по возрастанию', () => {
    const items = [
      makeProduct({ id: '1', price: 100000 }),
      makeProduct({ id: '2', price: 200000, discountPrice: 50000 }),
    ];

    expect(applyCatalogQuery(items, { sort: 'price-asc' }).map((item) => item.id)).toEqual([
      '2',
      '1',
    ]);
  });

  it('сортирует по названию с русской локалью', () => {
    const items = [makeProduct({ id: '1', name: 'Ягуар' }), makeProduct({ id: '2', name: 'Барс' })];

    expect(applyCatalogQuery(items, { sort: 'name' }).map((item) => item.id)).toEqual(['2', '1']);
  });

  it('сортирует по количеству отзывов по убыванию', () => {
    const items = [
      makeProduct({ id: '1', reviewsCount: 2 }),
      makeProduct({ id: '2', reviewsCount: 10 }),
    ];

    expect(applyCatalogQuery(items, { sort: 'rating' }).map((item) => item.id)).toEqual(['2', '1']);
  });

  it('не мутирует исходный массив', () => {
    const items = [
      makeProduct({ id: '1', price: 200000 }),
      makeProduct({ id: '2', price: 100000 }),
    ];

    applyCatalogQuery(items, { sort: 'price-asc' });

    expect(items.map((item) => item.id)).toEqual(['1', '2']);
  });

  it('игнорирует нечисловые границы цены', () => {
    const items = [makeProduct({ id: '1', price: 100000 })];

    expect(applyCatalogQuery(items, { minPrice: 'abc' })).toHaveLength(1);
    expect(applyCatalogQuery(items, { maxPrice: 'abc' })).toHaveLength(1);
  });
});
