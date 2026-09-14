import styles from './ProductList.module.scss';
import { applyCatalogQuery, paginateProducts } from '@/entities/product';
import { EmptyState, Link, Pagination } from '@/shared/ui';
import { ProductCard } from '@/entities/product';
import type { ProductSearchParams } from '@/entities/product';
import { ROUTES } from '@/shared/config';
import { AddToCartButton } from '@/features/add-to-cart';
import { getProducts } from '@/entities/product/api';
import { buildCatalogHref } from '@/features/catalog-filters';
import { FavoriteButton } from '@/features/toggle-favorite';

export async function ProductList({ searchParams }: { searchParams: ProductSearchParams }) {
  const filtered = applyCatalogQuery((await getProducts()).items, searchParams);

  if (!filtered.length)
    return (
      <EmptyState
        title="Товары не найдены"
        action={<Link href={ROUTES.HOME}>Сбросить фильтры</Link>}
      />
    );

  const { items, page, totalPages } = paginateProducts(filtered, searchParams.page);

  return (
    <>
      <ul className={styles.grid}>
        {items.map((product, index) => (
          <li className={styles.item} key={product.id}>
            <ProductCard
              product={product}
              priority={index < 4}
              overlay={<FavoriteButton productId={product.id} iconOnly />}
              actions={
                <AddToCartButton
                  productId={product.id}
                  inStock={product.inStock}
                  maxQuantity={product.quantity}
                />
              }
            />
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        createHref={(nextPage) => buildCatalogHref({ ...searchParams, page: String(nextPage) })}
      />
    </>
  );
}
