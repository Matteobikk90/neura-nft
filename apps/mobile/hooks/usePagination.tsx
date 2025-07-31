import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], perPage = 10) {
  const [page, setPage] = useState(0);

  const paginated = useMemo(() => {
    const start = page * perPage;
    return items.slice(start, start + perPage);
  }, [items, page, perPage]);

  const hasNext = items.length > (page + 1) * perPage;
  const hasPrev = page > 0;

  const nextPage = () => {
    if (hasNext) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (hasPrev) setPage((p) => p - 1);
  };

  const resetPage = () => setPage(0);

  return {
    paginated,
    page,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
    resetPage,
  };
}
