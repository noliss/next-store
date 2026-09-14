import {
  CATEGORY_LABELS,
  ProductCharacteristics,
  ProductImage,
  ProductPrice,
} from '@/entities/product';
import type { Product } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { FavoriteButton } from '@/features/toggle-favorite';
import { ROUTES } from '@/shared/config';
import { Badge, Link } from '@/shared/ui';
import styles from './ProductDetailsView.module.scss';

interface ProductDetailsViewProps {
  product: Product;
}

export function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const {
    id,
    name,
    previewPicture,
    price,
    discountPrice,
    category,
    inStock,
    quantity,
    reviewsCount,
    characteristics,
    labels,
  } = product;

  const hasDiscount = discountPrice !== null;
  const hasLabels = labels.newLabel || hasDiscount || !inStock;

  return (
    <article className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link href={ROUTES.HOME} className={styles.breadcrumbLink}>
          Каталог
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden="true">
          /
        </span>
        <span className={styles.breadcrumbCurrent}>{name}</span>
      </nav>

      <div className={styles.hero}>
        <div className={styles.gallery}>
          <div className={styles.imageFrame}>
            <ProductImage
              src={previewPicture}
              alt={name}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
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
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.category}>{CATEGORY_LABELS[category]}</p>

          <h1 className={styles.title}>{name}</h1>

          <p className={styles.reviews}>
            {reviewsCount > 0 ? `Отзывов: ${reviewsCount}` : 'Пока нет отзывов'}
          </p>

          <ProductPrice
            price={price}
            discountPrice={discountPrice}
            size="lg"
            className={styles.price}
          />

          <p className={styles.stock}>
            {inStock ? (
              <>
                <span className={styles.inStock}>В наличии</span>
                <span className={styles.quantity}> · {quantity} шт.</span>
              </>
            ) : (
              <span className={styles.outOfStock}>Нет в наличии</span>
            )}
          </p>

          <div className={styles.actions}>
            <AddToCartButton productId={id} inStock={inStock} maxQuantity={quantity} fullWidth />
            <FavoriteButton productId={id} />
          </div>
        </div>
      </div>

      <ProductCharacteristics items={characteristics} />
    </article>
  );
}
