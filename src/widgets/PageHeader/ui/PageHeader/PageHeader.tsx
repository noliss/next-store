'use client';

import { usePathname } from 'next/navigation';
import { PersistGate } from '@/_app/providers';
import { useAppSelector } from '@/_app/store';
import { CART_STORAGE_KEY, selectCartItemsCount } from '@/entities/cart';
import { Container, Link, Badge } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import styles from './PageHeader.module.scss';
import { FAVORITES_STORAGE_KEY, selectFavoritesCount } from '@/entities/favorites';

export function PageHeader() {
  const pathname = usePathname();
  const cartCount = useAppSelector(selectCartItemsCount);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const isActive = (href: string) => pathname === href;

  return (
    <header className={styles.header}>
      <Container className={styles.content}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          МАГАЗИН
        </Link>

        <nav className={styles.nav} aria-label="Главная навигация">
          <Link
            href={ROUTES.HOME}
            className={`${styles.navLink} ${isActive(ROUTES.HOME) ? styles.activeLink : ''}`}
          >
            Каталог
          </Link>

          <Link
            href={ROUTES.FAVORITES}
            className={`${styles.navLink} ${isActive(ROUTES.FAVORITES) ? styles.activeLink : ''}`}
            aria-label={`Избранное, ${favoritesCount} товаров`}
          >
            <span>Избранное</span>
            <PersistGate storageKey={FAVORITES_STORAGE_KEY} fallback={null}>
              {favoritesCount > 0 && (
                <Badge variant="danger" shape="counter" aria-hidden="true">
                  {favoritesCount}
                </Badge>
              )}
            </PersistGate>
          </Link>

          <Link
            href={ROUTES.CART}
            className={`${styles.navLink} ${isActive(ROUTES.CART) ? styles.activeLink : ''}`}
            aria-label={`Корзина, ${cartCount} товаров`}
          >
            <span>Корзина</span>
            <PersistGate storageKey={CART_STORAGE_KEY} fallback={null}>
              {cartCount > 0 && (
                <Badge variant="danger" shape="counter" aria-hidden="true">
                  {cartCount}
                </Badge>
              )}
            </PersistGate>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
