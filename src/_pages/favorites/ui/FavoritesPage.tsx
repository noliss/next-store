import { getProducts } from '@/entities/product/api';
import { Container } from '@/shared/ui';
import { FavoritesView } from '@/widgets';

export async function FavoritesPage() {
  const { items } = await getProducts();

  return (
    <Container>
      <h1>Избранное</h1>
      <FavoritesView products={items} />
    </Container>
  );
}
