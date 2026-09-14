import { describe, expect, it } from 'vitest';
import { mapProductDto, mapProductsResponseDto } from './mapper';
import type { ProductItemDto } from './dto';

const makeDto = (overrides: Partial<ProductItemDto> = {}): ProductItemDto => ({
  available: true,
  characteristics: [{ label: 'Калибр', name: 'caliber', value: '7.62' }],
  id: 608204,
  labels: { discount: '-10%' },
  name: 'Карабин Вепрь',
  preview_picture: '/upload/vepr.jpg',
  price: 100000,
  price_discount: 90000,
  quantity: 3,
  reviews: 7,
  ...overrides,
});

describe('mapProductDto', () => {
  it('приводит id к строке', () => {
    expect(mapProductDto(makeDto()).id).toBe('608204');
  });

  it('подставляет null вместо отсутствующей картинки', () => {
    expect(mapProductDto(makeDto({ preview_picture: undefined })).previewPicture).toBeNull();
  });

  it('считает нулевую скидку отсутствующей', () => {
    expect(mapProductDto(makeDto({ price_discount: 0 })).discountPrice).toBeNull();
    expect(mapProductDto(makeDto({ price_discount: null })).discountPrice).toBeNull();
    expect(mapProductDto(makeDto({ price_discount: 90000 })).discountPrice).toBe(90000);
  });

  it('определяет категорию по названию', () => {
    expect(mapProductDto(makeDto({ name: 'Ружьё ИЖ-27' })).category).toBe('shotgun');
    expect(mapProductDto(makeDto({ name: 'РУЖЬЁ ТОЗ' })).category).toBe('shotgun');
    expect(mapProductDto(makeDto({ name: 'Карабин Вепрь' })).category).toBe('rifle');
  });

  it('выводит наличие из остатка', () => {
    expect(mapProductDto(makeDto({ quantity: 0 })).inStock).toBe(false);
    expect(mapProductDto(makeDto({ quantity: 1 })).inStock).toBe(true);
  });

  it('переносит характеристики', () => {
    expect(mapProductDto(makeDto()).characteristics).toEqual([
      { label: 'Калибр', name: 'caliber', value: '7.62' },
    ]);
  });
});

describe('mapProductsResponseDto', () => {
  it('переносит счётчики страницы', () => {
    const page = mapProductsResponseDto({ count_items: 42, items: [makeDto()], per_page: 12 });

    expect(page.totalCount).toBe(42);
    expect(page.perPage).toBe(12);
    expect(page.items).toHaveLength(1);
  });
});
