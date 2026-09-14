import type { Product, ProductsPage } from '../model/types';
import type { ProductItemDto, ProductsResponseDto } from './dto';

const getCategory = (name: string): Product['category'] =>
  name.toLowerCase().startsWith('ружь') ? 'shotgun' : 'rifle';

export const mapProductDto = (dto: ProductItemDto): Product => ({
  id: dto.id.toString(),
  name: dto.name,
  previewPicture: dto.preview_picture ?? null,
  price: dto.price,
  discountPrice: dto.price_discount && dto.price_discount > 0 ? dto.price_discount : null,
  category: getCategory(dto.name),
  inStock: dto.quantity > 0,
  quantity: dto.quantity,
  reviewsCount: dto.reviews,
  characteristics: dto.characteristics.map((characteristic) => ({
    label: characteristic.label,
    name: characteristic.name,
    value: characteristic.value,
  })),
  labels: {
    discount: dto.labels.discount ?? null,
    newLabel: dto.labels.new,
  },
});

export const mapProductsResponseDto = (dto: ProductsResponseDto): ProductsPage => ({
  items: dto.items.map(mapProductDto),
  totalCount: dto.count_items,
  perPage: dto.per_page,
});
