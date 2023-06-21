import { useQuery as useQueryOrigin } from '@tanstack/react-query';
import ExceptionBase from '@/lib/HttpErrorException';
import type { Query } from './query';

const useQuery = <TQueryFnData>({
  queryKey,
  queryFn,
  options,
}: Query<TQueryFnData>) => {
  const result = useQueryOrigin<TQueryFnData, ExceptionBase>({
    queryKey,
    queryFn,
    ...options,
  });

  return { ...result, data: result.data };
};

export default useQuery;
