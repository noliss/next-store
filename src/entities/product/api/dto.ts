export interface ProductsResponseDto {
  count_items: number;
  items: ProductItemDto[];
  per_page: number;
}

export interface ProductItemDto {
  available: boolean;
  characteristics: ProductCharacteristicDto[];
  id: number;
  labels: ProductLabelDto;
  name: string;
  preview_picture?: string;
  price: number;
  price_discount: number | null;
  quantity: number;
  reviews: number;
}

export interface ProductCharacteristicDto {
  label: string;
  name: string;
  value: string;
}

export interface ProductLabelDto {
  discount: string;
  new?: string;
}
