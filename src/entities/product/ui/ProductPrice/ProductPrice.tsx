import { formatPrice } from '@/shared/lib';
import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  discountPrice: number | null;
  size?: 'md' | 'lg';
  className?: string;
}

export function ProductPrice({
  price,
  discountPrice,
  size = 'md',
  className = '',
}: ProductPriceProps) {
  const hasDiscount = discountPrice !== null;
  const currentPrice = discountPrice ?? price;

  return (
    <p className={[styles.row, styles[size], className].filter(Boolean).join(' ')}>
      <span className={hasDiscount ? styles.discounted : styles.current}>
        {formatPrice(currentPrice)}
      </span>
      {hasDiscount && (
        <s className={styles.old}>
          <span className="visually-hidden">Старая цена: </span>
          {formatPrice(price)}
        </s>
      )}
    </p>
  );
}
