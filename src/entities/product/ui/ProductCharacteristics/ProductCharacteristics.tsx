import type { ProductCharacteristic } from '../../model/types';
import styles from './ProductCharacteristics.module.scss';

interface ProductCharacteristicsProps {
  items: ProductCharacteristic[];
}

export function ProductCharacteristics({ items }: ProductCharacteristicsProps) {
  if (!items.length) return null;

  return (
    <section className={styles.section} aria-labelledby="product-specs-title">
      <h2 id="product-specs-title" className={styles.title}>
        Характеристики
      </h2>

      <dl className={styles.list}>
        {items.map((item) => (
          <div key={item.name} className={styles.row}>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={styles.value}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
