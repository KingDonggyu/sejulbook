import {
  useInfiniteQuery as useInfiniteQueryOrigin,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import Query from '@/types/query';

interface InfiniteQuery extends Omit<Query, 'options'> {
  options: UseInfiniteQueryOptions;
}

const useInfiniteQuery = <T>({ queryKey, queryFn, options }: InfiniteQuery) => {
  const result = useInfiniteQueryOrigin({
    queryKey,
    queryFn: () => queryFn(),
    refetchOnMount: true,
    ...options,
  });

  const data = result.data?.pages
    ? result.data.pages.flatMap((page) => page)
    : undefined;

  return {
    ...result,
    data: result.data ? (data as T) : undefined,
  };
};

export default useInfiniteQuery;
