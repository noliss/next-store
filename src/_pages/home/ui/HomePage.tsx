import { ProductSearchParams } from '@/entities/product';
import { ProductFilters } from '@/features/catalog-filters';
import { Container } from '@/shared/ui';
import { ProductList, ProductListSkeleton } from '@/widgets';
import { Suspense } from 'react';

interface HomePageProps {
  searchParams: Promise<ProductSearchParams>;
}
export async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const filtersKey = JSON.stringify({
    category: params.category,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    inStock: params.inStock,
    sort: params.sort,
  });

  return (
    <Container>
      <h1>Каталог товаров</h1>
      <ProductFilters key={filtersKey} values={params} />
      <Suspense fallback={<ProductListSkeleton count={8} />}>
        <ProductList searchParams={params} />
      </Suspense>
    </Container>
  );
}
