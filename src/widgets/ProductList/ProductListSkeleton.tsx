import { Skeleton } from '@/shared/ui';
import styles from './ProductListSkeleton.module.scss';

interface ProductListSkeletonProps {
  count: number;
}

export function ProductListSkeleton({ count }: ProductListSkeletonProps) {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={styles.card}>
          <Skeleton className={styles.image} />
          <div className={styles.body}>
            <Skeleton height="14px" />
            <Skeleton height="12px" width="55%" />
            <Skeleton height="22px" width="40%" className={styles.price} />
          </div>
        </li>
      ))}
    </ul>
  );
}
