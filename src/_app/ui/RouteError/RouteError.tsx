'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Container, ErrorState } from '@/shared/ui';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

interface RouteErrorProps extends ErrorPageProps {
  title: string;
  description: string;
}

export function RouteError({ error, reset, title, description }: RouteErrorProps) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <Container>
      <ErrorState
        title={title}
        description={description}
        digest={error.digest}
        isRetrying={isRetrying}
        onRetry={retry}
      />
    </Container>
  );
}
