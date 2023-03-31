import { useMemo, useState } from 'react';
import { useInfiniteQuery as useInfiniteQueryOrigin } from '@tanstack/react-query';
import { InfiniteQuery } from '@/types/query';

const useInfiniteQuery = <T>({ queryKey, queryFn, options }: InfiniteQuery) => {
  const [isLoading, setIsLoading] = useState(false);

  const result = useInfiniteQueryOrigin({
    queryKey,
    queryFn: ({ pageParam }) => {
      setIsLoading(true);
      return queryFn({ pageParam });
    },
    onSuccess: () => {
      setIsLoading(false);
    },
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
    isLoading,
    fetchNextPage: () => {
      if (result.hasNextPage && !result.isFetching) {
        result.fetchNextPage();
      }
    },
  };
};

export default useInfiniteQuery;
