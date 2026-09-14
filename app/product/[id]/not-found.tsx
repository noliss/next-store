import { Container, EmptyState, Link } from '@/shared/ui';
import { ROUTES } from '@/shared/config';

export default function ProductNotFound() {
  return (
    <Container>
      <EmptyState
        title="Товар не найден"
        description="Возможно, он был удалён или ссылка устарела"
        action={<Link href={ROUTES.HOME}>Вернуться в каталог</Link>}
      />
    </Container>
  );
}
