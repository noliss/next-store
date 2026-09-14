import { getProducts } from '@/entities/product/api';
import { Container } from '@/shared/ui';
import { CartView } from '@/widgets';

export async function CartPage() {
  const { items } = await getProducts();

  return (
    <Container>
      <h1>Корзина</h1>
      <CartView products={items} />
    </Container>
  );
}
