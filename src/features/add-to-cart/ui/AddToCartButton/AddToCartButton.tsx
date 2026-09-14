'use client';

import { useAppDispatch, useAppSelector } from '@/_app/store';
import { useIsPersistReady } from '@/_app/lib/use-is-persist-ready';
import { addToCart, CART_STORAGE_KEY, selectIsInCart } from '@/entities/cart';
import { Button, Icon, Skeleton } from '@/shared/ui';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  maxQuantity?: number;
  fullWidth?: boolean;
}

export function AddToCartButton({
  productId,
  inStock,
  maxQuantity,
  fullWidth = true,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const isCartReady = useIsPersistReady(CART_STORAGE_KEY);
  const isInCart = useAppSelector(selectIsInCart(productId));
  if (!inStock) {
    return (
      <Button fullWidth={fullWidth} disabled>
        Отсутствует
      </Button>
    );
  }
  if (!isCartReady) {
    return (
      <span className={styles.status} role="status" aria-label="Состояние корзины загружается">
        <Skeleton className={fullWidth ? styles.skeleton : styles.skeletonInline} />
      </span>
    );
  }
  if (isInCart) {
    return (
      <Button fullWidth={fullWidth} disabled>
        <Icon name="cart" size={18} />В корзине
      </Button>
    );
  }
  return (
    <Button fullWidth={fullWidth} onClick={() => dispatch(addToCart({ productId, maxQuantity }))}>
      <Icon name="cart" size={18} />В корзину
    </Button>
  );
}
