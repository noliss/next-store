import { ProductSearchParams } from '@/entities/product';
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
      {/* <ProductFilters /> */}
      {/* <div>Фильтры</div> */}
      <Suspense key={JSON.stringify(params)} fallback={<ProductListSkeleton count={8} />}>
        <ProductList searchParams={params} />
      </Suspense>
    </Container>
  );
}
