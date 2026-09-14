import type { Product } from './types';
export const getSellingPrice = (product: Product) => product.discountPrice ?? product.price;
