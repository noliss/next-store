'use client';

import type { Product } from '@/entities/product';
import { getSellingPrice, ProductImage, ProductPrice } from '@/entities/product';
import { formatPrice } from '@/shared/lib';
import { Badge, Link } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { CartItemControls } from '@/features/cart-item-controls';
import styles from './CartLineItem.module.scss';

interface CartLineItemProps {
  product: Product;
  quantity: number;
  lineTotal: number;
  notice?: string | null;
  isAvailable?: boolean;
}

export function CartLineItem({
  product,
  quantity,
  lineTotal,
  notice = null,
  isAvailable = true,
}: CartLineItemProps) {
  const { id, name, previewPicture, price, discountPrice, quantity: stock } = product;

  return (
    <article className={styles.row}>
      <Link
        href={ROUTES.PRODUCT_DETAILS(id)}
        className={styles.thumb}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductImage src={previewPicture} alt="" sizes="96px" />
      </Link>

      <div className={styles.info}>
        <h2 className={styles.title}>
          <Link href={ROUTES.PRODUCT_DETAILS(id)} className={styles.titleLink}>
            {name}
          </Link>
        </h2>

        <ProductPrice price={price} discountPrice={discountPrice} className={styles.unitPrice} />

        <p className={styles.meta}>
          {formatPrice(getSellingPrice(product))} × {quantity}
        </p>

        {notice && (
          <p className={styles.notice}>
            <Badge variant={isAvailable ? 'muted' : 'danger'}>{notice}</Badge>
          </p>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.controls}>
          <CartItemControls productId={id} maxQuantity={stock} canChangeQuantity={isAvailable} />
        </div>

        {isAvailable ? (
          <p className={styles.lineTotal}>
            <span className="visually-hidden">Сумма по позиции: </span>
            {formatPrice(lineTotal)}
          </p>
        ) : (
          <p className={styles.excluded}>Не учтён в сумме</p>
        )}
      </div>
    </article>
  );
}
