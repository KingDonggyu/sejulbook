import { useInfiniteQuery as useInfiniteQueryOrigin } from '@tanstack/react-query';
import { InfiniteQuery } from '@/types/query';
import { useMemo } from 'react';

const useInfiniteQuery = <T>({ queryKey, queryFn, options }: InfiniteQuery) => {
  const result = useInfiniteQueryOrigin({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    ...options,
  });

  const data = useMemo(
    () =>
      result.data?.pages
        ? (result.data.pages.flatMap((page) => page) as T)
        : undefined,
    [result.data],
  );

  return {
    ...result,
    data,
  };
};

export default useInfiniteQuery;
