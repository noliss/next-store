import type { Metadata } from 'next';
import { getProductById } from '@/entities/product/api';
import { ROUTES } from '@/shared/config';

interface ProductPageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Товар не найден',
      robots: { index: false, follow: false },
    };
  }

  const description = `Купить ${product.name} в нашем магазине`;

  return {
    title: product.name,
    description,
    alternates: { canonical: ROUTES.PRODUCT_DETAILS(product.id) },
    openGraph: {
      type: 'website',
      siteName: 'Магазин',
      locale: 'ru_RU',
      url: ROUTES.PRODUCT_DETAILS(product.id),
      title: product.name,
      description,
      images: product.previewPicture
        ? [{ url: product.previewPicture, alt: product.name }]
        : undefined,
    },
  };
}
