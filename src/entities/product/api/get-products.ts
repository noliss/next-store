import { mapProductsResponseDto } from './mapper';
import type { ProductsResponseDto } from './dto';
import type { ProductsPage } from '../model/types';
import { API_URL } from '@/shared/config/env/env';

export const getProducts = async (): Promise<ProductsPage> => {
  const url = `${API_URL}/api/products`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Не удалось загрузить товары');
  }

  const dto: ProductsResponseDto = await response.json();

  return mapProductsResponseDto(dto);
};
