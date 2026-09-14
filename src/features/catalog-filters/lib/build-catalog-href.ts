import { ROUTES } from '@/shared/config';
import type { ProductSearchParams } from '@/entities/product';

export function buildCatalogHref(params: ProductSearchParams): string {
  const query = new URLSearchParams();

  if (params.search?.trim()) query.set('search', params.search.trim());
  if (params.category) query.set('category', params.category);
  if (params.minPrice) query.set('minPrice', params.minPrice);
  if (params.maxPrice) query.set('maxPrice', params.maxPrice);
  if (params.inStock === '1') query.set('inStock', '1');
  if (params.sort) query.set('sort', params.sort);
  if (params.page && params.page !== '1') query.set('page', params.page);

  const qs = query.toString();
  return qs ? `${ROUTES.HOME}?${qs}` : ROUTES.HOME;
}
