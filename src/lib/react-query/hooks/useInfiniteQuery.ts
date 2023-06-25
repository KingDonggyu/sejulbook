import { useMemo, useState } from 'react';
import { useInfiniteQuery as useInfiniteQueryOrigin } from '@tanstack/react-query';
import ExceptionBase from '@/lib/HttpErrorException';
import type { InfiniteQuery } from '../types/query';

const useInfiniteQuery = <TQueryFnData extends Array<TQueryFnData[number]>>({
  queryKey,
  queryFn,
  options,
}: InfiniteQuery<TQueryFnData>) => {
  const [isLoading, setIsLoading] = useState(false);
  const result = useInfiniteQueryOrigin<TQueryFnData, ExceptionBase>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      setIsLoading(true);
      const data = await queryFn({ pageParam });
      setIsLoading(false);
      return data;
    },
    ...options,
  });

  const data = useMemo(() => {
    if (result.data?.pages) {
      return result.data.pages.flatMap<TQueryFnData[number]>((page) => page);
    }
    return [];
  }, [result.data]);

  const fetchNextPage = () => {
    if (result.hasNextPage && !result.isFetching) {
      result.fetchNextPage();
    }
  };

  return { ...result, data, isLoading, fetchNextPage };
};

export default useInfiniteQuery;
