'use client';

import { Button } from '../Button';
import { EmptyState } from '../EmptyState';

interface ErrorStateProps {
  title?: string;
  description?: string;
  digest?: string;
  isRetrying?: boolean;
  onRetry: () => void;
}

export function ErrorState({
  title = 'Не удалось загрузить данные',
  description = 'Проверьте соединение и попробуйте снова',
  digest,
  isRetrying = false,
  onRetry,
}: ErrorStateProps) {
  return (
    <EmptyState
      role="alert"
      title={title}
      description={digest ? `${description}. Код ошибки: ${digest}` : description}
      action={
        <Button type="button" onClick={onRetry} disabled={isRetrying} aria-busy={isRetrying}>
          {isRetrying ? 'Повторяем…' : 'Повторить'}
        </Button>
      }
    />
  );
}
