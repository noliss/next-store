import type { Product, ProductSearchParams } from './types';

const sellingPrice = (product: Product) => product.discountPrice ?? product.price;

export function applyCatalogQuery(items: Product[], query: ProductSearchParams): Product[] {
  let result = items;

  if (query.category === 'rifle' || query.category === 'shotgun') {
    result = result.filter((item) => item.category === query.category);
  }

  if (query.inStock === '1') {
    result = result.filter((item) => item.inStock);
  }

  if (query.minPrice) {
    const min = Number(query.minPrice);
    result = result.filter((item) => sellingPrice(item) >= min);
  }

  if (query.maxPrice) {
    const max = Number(query.maxPrice);
    result = result.filter((item) => sellingPrice(item) <= max);
  }

  if (query.search?.trim()) {
    const needle = query.search.trim().toLowerCase();
    result = result.filter((item) => item.name.toLowerCase().includes(needle));
  }

  switch (query.sort) {
    case 'price-asc':
      return [...result].sort((a, b) => sellingPrice(a) - sellingPrice(b));
    case 'price-desc':
      return [...result].sort((a, b) => sellingPrice(b) - sellingPrice(a));
    case 'name':
      return [...result].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    case 'rating':
      return [...result].sort((a, b) => b.reviewsCount - a.reviewsCount);
    default:
      return result;
  }
}
