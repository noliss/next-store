'use client';

import { useMemo } from 'react';
import { PersistGate } from '@/_app/providers';
import { useAppSelector } from '@/_app/store';
import { FAVORITES_STORAGE_KEY, selectFavoriteIds } from '@/entities/favorites';
import type { Product } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import { EmptyState, Link, Skeleton } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { RemoveFromFavoritesButton } from '@/features/remove-from-favorites';
import styles from './FavoritesView.module.scss';

interface FavoritesViewProps {
  products: Product[];
}

export function FavoritesView({ products }: FavoritesViewProps) {
  return (
    <PersistGate storageKey={FAVORITES_STORAGE_KEY} fallback={<FavoritesViewSkeleton />}>
      <FavoritesViewContent products={products} />
    </PersistGate>
  );
}

function FavoritesViewContent({ products }: FavoritesViewProps) {
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const favoriteProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    return favoriteIds.map((id) => byId.get(id)).filter(Boolean) as Product[];
  }, [favoriteIds, products]);

  if (!favoriteProducts.length) {
    return (
      <EmptyState
        title="Нет товаров в избранном"
        description="Добавьте товары из каталога"
        action={<Link href={ROUTES.HOME}>Перейти в каталог</Link>}
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {favoriteProducts.map((product, index) => (
        <li key={product.id} className={styles.item}>
          <ProductCard
            product={product}
            priority={index < 4}
            actions={<RemoveFromFavoritesButton productId={product.id} />}
          />
        </li>
      ))}
    </ul>
  );
}

function FavoritesViewSkeleton() {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <li key={index} className={styles.item}>
          <Skeleton height="280px" />
        </li>
      ))}
    </ul>
  );
}
