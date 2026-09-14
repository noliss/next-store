'use client';

import { useAppDispatch, useAppSelector } from '@/_app/store';
import { removeFromCart, selectCartItemByProductId, setCartItemQuantity } from '@/entities/cart';
import { Button, Icon } from '@/shared/ui';
import styles from './CartItemControls.module.scss';

interface CartItemControlsProps {
  productId: string;
  maxQuantity?: number;
  canChangeQuantity?: boolean;
}

export function CartItemControls({
  productId,
  maxQuantity,
  canChangeQuantity = true,
}: CartItemControlsProps) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemByProductId(productId));

  if (!cartItem) return null;

  const { quantity } = cartItem;

  return (
    <div className={styles.controls}>
      {canChangeQuantity && (
        <div className={styles.quantity}>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            aria-label="Уменьшить количество"
            onClick={() =>
              dispatch(setCartItemQuantity({ productId, quantity: quantity - 1, maxQuantity }))
            }
          >
            −
          </Button>

          <span className={styles.value} aria-live="polite">
            {quantity}
          </span>

          <Button
            variant="secondary"
            size="sm"
            iconOnly
            aria-label="Увеличить количество"
            disabled={maxQuantity !== undefined && quantity >= maxQuantity}
            onClick={() =>
              dispatch(setCartItemQuantity({ productId, quantity: quantity + 1, maxQuantity }))
            }
          >
            +
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        aria-label="Удалить из корзины"
        onClick={() => dispatch(removeFromCart(productId))}
      >
        <Icon name="trash" size={16} />
        Удалить
      </Button>
    </div>
  );
}
