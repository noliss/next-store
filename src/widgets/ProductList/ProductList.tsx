import styles from './ProductList.module.scss';
import { ProductSearchParams, getProducts } from '@/entities/product';
import { Button, EmptyState, Icon } from '@/shared/ui';
import { ProductCard } from '@/entities/product';

interface ProductListProps {
  searchParams: ProductSearchParams;
}

export async function ProductList({ searchParams }: ProductListProps) {
  const { items } = await getProducts(searchParams);

  if (!items.length) return <EmptyState title="Товары не найдены" />;

  return (
    <ul className={styles.grid}>
      {items.map((product, index) => (
        <li className={styles.item} key={product.id}>
          <ProductCard
            product={product}
            priority={index < 4}
            overlay={
              <Button variant="secondary" iconOnly aria-label="Добавить в избранное">
                <Icon name="heart" size={18} />
              </Button>
            }
            actions={
              <Button fullWidth>
                <Icon name="cart" size={18} />В корзину
              </Button>
            }
          />
        </li>
      ))}
    </ul>
  );
}
