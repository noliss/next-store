import { ROUTES } from '@/shared/config';

export function buildQueryHref(
  current: URLSearchParams | { toString(): string },
  changes: Record<string, string>
): string {
  const next = new URLSearchParams(current.toString());
  next.delete('page');

  Object.entries(changes).forEach(([name, value]) => {
    const trimmed = value.trim();
    if (trimmed) next.set(name, trimmed);
    else next.delete(name);
  });

  const qs = next.toString();
  return qs ? `${ROUTES.HOME}?${qs}` : ROUTES.HOME;
}
