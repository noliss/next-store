import type { Product } from './types';

export const PRODUCTS_PER_PAGE = 12;

interface ProductsPageSlice {
  items: Product[];
  page: number;
  totalPages: number;
}

export function paginateProducts(items: Product[], page?: string): ProductsPageSlice {
  const totalPages = Math.max(1, Math.ceil(items.length / PRODUCTS_PER_PAGE));
  const requested = Number(page);
  const safePage = Number.isFinite(requested)
    ? Math.min(Math.max(Math.trunc(requested), 1), totalPages)
    : 1;
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;

  return {
    items: items.slice(start, start + PRODUCTS_PER_PAGE),
    page: safePage,
    totalPages,
  };
}
