import { Link } from '../Link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  createHref: (page: number) => string;
  className?: string;
}

const WINDOW = 1;

function getPageList(page: number, totalPages: number): (number | 'gap')[] {
  const pages = new Set<number>([1, totalPages]);

  for (let candidate = page - WINDOW; candidate <= page + WINDOW; candidate += 1) {
    if (candidate >= 1 && candidate <= totalPages) pages.add(candidate);
  }

  const sorted = [...pages].sort((a, b) => a - b);

  return sorted.flatMap((current, index) => {
    const previous = sorted[index - 1];
    return previous !== undefined && current - previous > 1 ? ['gap' as const, current] : [current];
  });
}

export function Pagination({ page, totalPages, createHref, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageList(page, totalPages);

  return (
    <nav className={`${styles.pagination} ${className}`.trim()} aria-label="Страницы каталога">
      <ul className={styles.list}>
        <li>
          {page > 1 ? (
            <Link href={createHref(page - 1)} className={styles.arrow} rel="prev">
              Назад
            </Link>
          ) : (
            <span className={`${styles.arrow} ${styles.disabled}`}>Назад</span>
          )}
        </li>

        {items.map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} aria-hidden="true" className={styles.gap}>
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span className={`${styles.page} ${styles.current}`} aria-current="page">
                  {item}
                </span>
              ) : (
                <Link
                  href={createHref(item)}
                  className={styles.page}
                  aria-label={`Страница ${item}`}
                >
                  {item}
                </Link>
              )}
            </li>
          )
        )}

        <li>
          {page < totalPages ? (
            <Link href={createHref(page + 1)} className={styles.arrow} rel="next">
              Вперёд
            </Link>
          ) : (
            <span className={`${styles.arrow} ${styles.disabled}`}>Вперёд</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
