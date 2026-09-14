import { PRODUCTS_PER_PAGE, ProductSearchParams } from '@/entities/product';
import { ProductFilters } from '@/features/catalog-filters';
import { Container } from '@/shared/ui';
import { ProductList, ProductListSkeleton } from '@/widgets';
import { Suspense } from 'react';

interface HomePageProps {
  searchParams: Promise<ProductSearchParams>;
}
export async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  return (
    <Container>
      <h1>Каталог товаров</h1>
      <ProductFilters values={params} />
      <Suspense fallback={<ProductListSkeleton count={PRODUCTS_PER_PAGE} />}>
        <ProductList searchParams={params} />
      </Suspense>
    </Container>
  );
}
