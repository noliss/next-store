'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Field, Input } from '@/shared/ui';
import { buildQueryHref } from '../../lib/build-query-href';

const DEBOUNCE_MS = 300;

interface SearchFieldProps {
  className?: string;
}

export function SearchField({ className }: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get('search') ?? '';

  const [search, setSearch] = useState(urlSearch);
  const pendingSearchRef = useRef<string | null>(null);
  const prevUrlSearchRef = useRef(urlSearch);

  useEffect(() => {
    if (urlSearch === prevUrlSearchRef.current) return;

    if (pendingSearchRef.current !== null && urlSearch === pendingSearchRef.current) {
      pendingSearchRef.current = null;
    } else {
      setSearch(urlSearch);
      pendingSearchRef.current = null;
    }

    prevUrlSearchRef.current = urlSearch;
  }, [urlSearch]);

  useEffect(() => {
    const trimmed = search.trim();
    const current = (searchParams.get('search') ?? '').trim();

    if (trimmed === current) return;

    const timer = window.setTimeout(() => {
      pendingSearchRef.current = trimmed;
      router.replace(buildQueryHref(searchParams, { search: trimmed }));
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [search, searchParams, router]);

  return (
    <Field label="Поиск" className={className}>
      <Input
        type="search"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Название товара"
        autoComplete="off"
      />
    </Field>
  );
}
