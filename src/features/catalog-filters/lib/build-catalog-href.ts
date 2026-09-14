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

  const qs = query.toString();
  return qs ? `${ROUTES.HOME}?${qs}` : ROUTES.HOME;
}

export function formDataToParams(data: FormData): ProductSearchParams {
  const get = (name: string) => {
    const value = data.get(name);
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  };

  return {
    search: get('search'),
    category: get('category'),
    minPrice: get('minPrice'),
    maxPrice: get('maxPrice'),
    inStock: data.get('inStock') === '1' ? '1' : undefined,
    sort: get('sort') as ProductSearchParams['sort'],
  };
}
