/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';
import type { Query, InfiniteQuery } from './types/query';

const prefetchQuery = async (
  queries: Query<any>[],
  infinityQueries: InfiniteQuery<any>[] = [],
) => {
  const queryClient = new QueryClient();

  await Promise.all([
    ...queries.map(({ queryKey, queryFn, options }) =>
      queryClient.prefetchQuery(queryKey, queryFn, { ...options }),
    ),
    ...infinityQueries.map(({ queryKey, queryFn, options }) =>
      queryClient.prefetchInfiniteQuery(
        queryKey,
        () => queryFn({ pageParam: null }),
        { ...options },
      ),
    ),
  ]);

  infinityQueries.forEach(({ queryKey }) => {
    queryClient.setQueryData(queryKey, (data: any) => ({
      ...data,
      pageParams: [null],
    }));
  });

  return queryClient;
};

export default prefetchQuery;
