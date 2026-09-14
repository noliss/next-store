import { notFound } from 'next/navigation';
import { getProductById } from '@/entities/product/api';
import { Container } from '@/shared/ui';
import { ProductDetailsView } from '@/widgets';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <Container>
      <ProductDetailsView product={product} />
    </Container>
  );
}
