import { mapProductsResponseDto } from '../model/mapper';
import type { ProductsResponseDto } from './dto';
import type { ProductSearchParams, ProductsPage } from '../model/types';
import { API_URL } from '@/shared/config/env/env';

export const getProducts = async (
  searchParams: ProductSearchParams = {}
): Promise<ProductsPage> => {
  const query = new URLSearchParams(
    Object.entries(searchParams).filter(([, value]) => Boolean(value)) as [string, string][]
  ).toString();

  const url = query ? `${API_URL}/api/products?${query}` : `${API_URL}/api/products`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  const dto: ProductsResponseDto = await response.json();

  return mapProductsResponseDto(dto);
};
