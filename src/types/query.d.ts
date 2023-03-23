import {
  QueryKey,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

interface Query {
  queryKey: QueryKey;
  queryFn: () => void;
  options?: UseQueryOptions;
}

export interface InfiniteQuery extends Pick<Query, 'queryKey'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: ({ pageParam }: { pageParam: any }) => void;
  options?: UseInfiniteQueryOptions;
}

export default Query;
