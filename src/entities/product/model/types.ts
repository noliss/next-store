export interface Product {
  id: string;
  name: string;
  previewPicture: string | null;
  price: number;
  discountPrice: number | null;
  category: 'rifle' | 'shotgun';
  inStock: boolean;
  quantity: number;
  reviewsCount: number;
  characteristics: ProductCharacteristic[];
  labels: ProductLabels;
}

export interface ProductCharacteristic {
  label: string;
  name: string;
  value: string;
}

export interface ProductLabels {
  discount: string | null;
  newLabel?: string | null;
}

export interface ProductsPage {
  items: Product[];
  totalCount: number;
  perPage: number;
}

export interface ProductSearchParams {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sort?: 'price-asc' | 'price-desc' | 'name' | 'rating';
  page?: string;
}
