'use client';

import { CartItemControls } from '@/features/cart-item-controls';
import { Badge } from '@/shared/ui';
import styles from './CartMissingLine.module.scss';

interface CartMissingLineProps {
  productId: string;
  quantity: number;
}

export function CartMissingLine({ productId, quantity }: CartMissingLineProps) {
  return (
    <article className={styles.row}>
      <div className={styles.info}>
        <h2 className={styles.title}>Товар больше не продаётся</h2>

        <p className={styles.meta}>Артикул {productId}, в корзине {quantity} шт.</p>

        <p className={styles.notice}>
          <Badge variant="danger">Снят с продажи</Badge>
        </p>
      </div>

      <div className={styles.footer}>
        <CartItemControls productId={productId} canChangeQuantity={false} />
        <p className={styles.excluded}>Не учтён в сумме</p>
      </div>
    </article>
  );
}
