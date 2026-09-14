'use client';

import { useAppDispatch, useAppSelector } from '@/_app/store';
import { useIsPersistReady } from '@/_app/lib/use-is-persist-ready';
import { addToFavorites, FAVORITES_STORAGE_KEY, selectIsFavorite } from '@/entities/favorites';
import { Button, Icon, Skeleton } from '@/shared/ui';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  productId: string;
  iconOnly?: boolean;
}

export function FavoriteButton({ productId, iconOnly = false }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavoritesReady = useIsPersistReady(FAVORITES_STORAGE_KEY);
  const isFavorite = useAppSelector(selectIsFavorite(productId));

  if (!isFavoritesReady) {
    return (
      <span className={styles.status} role="status" aria-label="Состояние избранного загружается">
        <Skeleton className={iconOnly ? styles.skeletonIcon : styles.skeleton} />
      </span>
    );
  }

  if (iconOnly) {
    return (
      <Button
        type="button"
        variant="secondary"
        iconOnly
        disabled={isFavorite}
        aria-label={isFavorite ? 'В избранном' : 'Добавить в избранное'}
        onClick={() => dispatch(addToFavorites(productId))}
      >
        <Icon name={isFavorite ? 'heartFilled' : 'heart'} size={18} />
      </Button>
    );
  }

  if (isFavorite) {
    return (
      <Button type="button" disabled>
        <Icon name="heartFilled" size={18} />В избранном
      </Button>
    );
  }

  return (
    <Button type="button" onClick={() => dispatch(addToFavorites(productId))}>
      <Icon name="heart" size={18} />В избранное
    </Button>
  );
}
