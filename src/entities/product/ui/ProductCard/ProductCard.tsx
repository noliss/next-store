import type { ReactNode } from 'react';
import { Link, Badge } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import type { Product } from '../../model/types';
import styles from './ProductCard.module.scss';
import { ProductImage } from '../ProductImage/ProductImage';
import { ProductPrice } from '../ProductPrice/ProductPrice';

interface ProductCardProps {
  product: Product;
  actions?: ReactNode;
  priority?: boolean;
  overlay?: ReactNode;
}

export function ProductCard({ product, actions, priority = false, overlay }: ProductCardProps) {
  const { id, name, previewPicture, price, discountPrice, inStock, reviewsCount, labels } = product;
  const hasDiscount = discountPrice !== null;
  const hasLabels = labels.newLabel || hasDiscount || !inStock;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <ProductImage
          src={previewPicture}
          priority={priority}
          alt=""
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />

        {hasLabels && (
          <ul className={styles.labels}>
            {labels.newLabel && (
              <li>
                <Badge variant="accent">Новинка</Badge>
              </li>
            )}
            {hasDiscount && (
              <li>
                <Badge variant="danger">{labels.discount ?? 'Скидка'}</Badge>
              </li>
            )}
            {!inStock && (
              <li>
                <Badge variant="muted">Нет в наличии</Badge>
              </li>
            )}
          </ul>
        )}

        {overlay && <div className={styles.overlay}>{overlay}</div>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={ROUTES.PRODUCT_DETAILS(id)} className={styles.titleLink}>
            <span className={styles.titleText}>{name}</span>
          </Link>
        </h3>

        <p className={styles.reviews}>
          {reviewsCount > 0 ? `Отзывов: ${reviewsCount}` : 'Пока нет отзывов'}
        </p>

        <ProductPrice price={price} discountPrice={discountPrice} className={styles.priceSlot} />

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </article>
  );
}
