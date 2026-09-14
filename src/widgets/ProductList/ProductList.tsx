import styles from './ProductList.module.scss';
import { applyCatalogQuery, getProducts } from '@/entities/product';
import { Button, EmptyState, Icon, Link } from '@/shared/ui';
import { ProductCard } from '@/entities/product';
import type { ProductSearchParams } from '@/entities/product';
import { ROUTES } from '@/shared/config';

export async function ProductList({ searchParams }: { searchParams: ProductSearchParams }) {
  const products = applyCatalogQuery((await getProducts()).items, searchParams);

  if (!products.length)
    return (
      <EmptyState
        title="Товары не найдены"
        action={<Link href={ROUTES.HOME}>Сбросить фильтры</Link>}
      />
    );

  return (
    <ul className={styles.grid}>
      {products.map((product, index) => (
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
