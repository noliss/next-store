import type { Product } from '../model/types';
import { getProducts } from './get-products';

export async function getProductById(id: string): Promise<Product | null> {
  const { items } = await getProducts();
  return items.find((item) => item.id === id) ?? null;
}
