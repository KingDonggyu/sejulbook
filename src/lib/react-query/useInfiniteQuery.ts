import { useMemo } from 'react';
import { useInfiniteQuery as useInfiniteQueryOrigin } from '@tanstack/react-query';
import ExceptionBase from '@/lib/HttpErrorException';
import type { InfiniteQuery } from './query';

const useInfiniteQuery = <TQueryFnData extends Array<TQueryFnData[number]>>({
  queryKey,
  queryFn,
  options,
}: InfiniteQuery<TQueryFnData>) => {
  const result = useInfiniteQueryOrigin<TQueryFnData, ExceptionBase>({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
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

  return { ...result, data, fetchNextPage };
};

export default useInfiniteQuery;
