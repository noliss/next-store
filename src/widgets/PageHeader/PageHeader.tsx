import { Container, Link, Badge } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import styles from './PageHeader.module.scss';

export function PageHeader() {
  const mockCartCount = 3;
  const mockFavoritesCount = 5;

  return (
    <header className={styles.header}>
      <Container className={styles.content}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          МАГАЗИН
        </Link>

        <nav className={styles.nav} aria-label="Главная навигация">
          <Link href={ROUTES.HOME} className={`${styles.navLink} ${styles.activeLink}`}>
            Каталог
          </Link>

          <Link
            href={ROUTES.FAVORITES}
            className={styles.navLink}
            aria-label={`Избранное, ${mockFavoritesCount} товаров`}
          >
            <span>Избранное</span>
            {mockFavoritesCount > 0 && (
              <Badge variant="danger" shape="counter" aria-hidden="true">
                {mockFavoritesCount}
              </Badge>
            )}
          </Link>

          <Link
            href={ROUTES.CART}
            className={styles.navLink}
            aria-label={`Корзина, ${mockCartCount} товаров`}
          >
            <span>Корзина</span>
            <Badge variant="danger" shape="counter" aria-hidden="true">
              {mockCartCount}
            </Badge>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
