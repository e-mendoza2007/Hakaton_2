import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useUrlFilters<T extends Record<string, string | undefined>>(defaults: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = { ...defaults } as T;
  for (const key of Object.keys(defaults)) {
    const val = searchParams.get(key);
    if (val !== null) {
      (filters as Record<string, string | undefined>)[key] = val === '' ? undefined : val;
    }
  }

  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === undefined || value === '') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setFilters = useCallback(
    (updates: Partial<T>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(updates)) {
          if (value === undefined || value === '') {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        }
        return next;
      });
    },
    [setSearchParams]
  );

  return { filters, setFilter, setFilters, searchParams, setSearchParams };
}
