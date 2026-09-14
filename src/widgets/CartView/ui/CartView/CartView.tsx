'use client';

import { useMemo } from 'react';
import { PersistGate } from '@/_app/providers';
import { useAppSelector } from '@/_app/store';
import { selectCartItems, CART_STORAGE_KEY } from '@/entities/cart';
import { getSellingPrice, type Product } from '@/entities/product';
import { formatPrice } from '@/shared/lib';
import { EmptyState, Link, Skeleton } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import styles from './CartView.module.scss';
import { CartLineItem } from '../CartLineItem';
import { CartMissingLine } from '../CartMissingLine';

interface CartViewProps {
  products: Product[];
}

interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
  notice: string | null;
  isAvailable: boolean;
}

interface MissingCartLine {
  productId: string;
  quantity: number;
}

export function CartView({ products }: CartViewProps) {
  return (
    <PersistGate storageKey={CART_STORAGE_KEY} fallback={<CartViewSkeleton />}>
      <CartViewContent products={products} />
    </PersistGate>
  );
}

function CartViewContent({ products }: CartViewProps) {
  const cartItems = useAppSelector(selectCartItems);

  const { lines, missingLines } = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    const resolved: CartLine[] = [];
    const missing: MissingCartLine[] = [];

    cartItems.forEach((item) => {
      const product = byId.get(item.productId);

      if (!product) {
        missing.push({ productId: item.productId, quantity: item.quantity });
        return;
      }

      const payableQuantity = Math.min(item.quantity, product.quantity);

      resolved.push({
        product,
        quantity: item.quantity,
        lineTotal: product.inStock ? getSellingPrice(product) * payableQuantity : 0,
        notice: !product.inStock
          ? 'Товара нет в наличии'
          : product.quantity < item.quantity
            ? `В наличии только ${product.quantity} шт.`
            : null,
        isAvailable: product.inStock,
      });
    });

    return { lines: resolved, missingLines: missing };
  }, [cartItems, products]);

  const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const unavailableCount = missingLines.length + lines.filter((line) => !line.isAvailable).length;

  if (!lines.length && !missingLines.length) {
    return (
      <EmptyState
        title="Нет товаров в корзине"
        description="Добавьте товары из каталога"
        action={<Link href={ROUTES.HOME}>Перейти в каталог</Link>}
      />
    );
  }

  return (
    <div className={styles.layout}>
      <ul className={styles.list}>
        {lines.map((line) => (
          <li key={line.product.id} className={styles.item}>
            <CartLineItem
              product={line.product}
              quantity={line.quantity}
              lineTotal={line.lineTotal}
              notice={line.notice}
              isAvailable={line.isAvailable}
            />
          </li>
        ))}

        {missingLines.map((line) => (
          <li key={line.productId} className={styles.item}>
            <CartMissingLine productId={line.productId} quantity={line.quantity} />
          </li>
        ))}
      </ul>

      <aside className={styles.summary} aria-label="Итого по заказу">
        <p className={styles.summaryLabel}>Итого</p>
        <p className={styles.summaryValue}>{formatPrice(total)}</p>

        {unavailableCount > 0 && (
          <p className={styles.summaryNotice} role="status">
            {unavailableCount === 1
              ? '1 товар недоступен и не учтён в сумме'
              : `${unavailableCount} товара недоступны и не учтены в сумме`}
          </p>
        )}
      </aside>
    </div>
  );
}

function CartViewSkeleton() {
  return (
    <div className={styles.layout} aria-hidden="true">
      <ul className={styles.list}>
        {Array.from({ length: 2 }, (_, index) => (
          <li key={index} className={styles.item}>
            <Skeleton height="96px" className={styles.skeletonRow} />
          </li>
        ))}
      </ul>
    </div>
  );
}
