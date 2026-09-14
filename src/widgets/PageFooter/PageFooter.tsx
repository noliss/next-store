import { Container, Link } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import styles from './PageFooter.module.scss';

export function PageFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>
        <div className={styles.infoBlock}>
          <h3 className={styles.title}>О Магазине</h3>
          <p className={styles.text}>Test</p>
        </div>

        <div className={styles.navBlock}>
          <h3 className={styles.title}>Навигация</h3>
          <ul className={styles.list}>
            <li>
              <Link href={ROUTES.HOME} className={styles.link}>
                Каталог
              </Link>
            </li>
            <li>
              <Link href={ROUTES.CART} className={styles.link}>
                Корзина
              </Link>
            </li>
            <li>
              <Link href={ROUTES.FAVORITES} className={styles.link}>
                Избранное
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navBlock}>
          <h3 className={styles.title}>Категории</h3>
          <ul className={styles.list}>
            <li>
              <Link href="/?category=rifle" className={styles.link}>
                Карабины
              </Link>
            </li>
            <li>
              <Link href="/?category=shotgun" className={styles.link}>
                Ружья
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className={styles.bottom}>
        <Container>
          <p>© {currentYear} Магазин. Все права защищены.</p>
        </Container>
      </div>
    </footer>
  );
}
