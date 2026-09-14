'use client';

import type { ErrorPageProps } from '@/_app/ui/RouteError';

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <html lang="ru">
      <body>
        <main style={{ padding: '32px', textAlign: 'center' }}>
          <h1>Что-то пошло не так</h1>
          <p>Попробуйте обновить страницу.</p>
          {error.digest && <p>Код ошибки: {error.digest}</p>}
          <button type="button" onClick={reset}>
            Обновить
          </button>
        </main>
      </body>
    </html>
  );
}
