import {
  QueryKey,
  UseQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import ExceptionBase from '@/lib/HttpErrorException';

export interface Query<TQueryFnData> {
  queryKey: QueryKey;
  queryFn: () => TQueryFnData | Promise<TQueryFnData>;
  options?: UseQueryOptions<TQueryFnData, ExceptionBase>;
}

export interface InfiniteQuery<TQueryFnData> {
  queryKey: QueryKey;
  queryFn: ({
    pageParam,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageParam: any;
  }) => TQueryFnData | Promise<TQueryFnData>;
  options?: UseInfiniteQueryOptions<TQueryFnData, ExceptionBase>;
}
