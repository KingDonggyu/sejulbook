import { useQuery as useQueryOrigin } from '@tanstack/react-query';
import ExceptionBase from '@/lib/HttpErrorException';
import { Query } from '../types/query';

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

  return result;
};

export default useQuery;
