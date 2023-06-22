import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation as useOriginMutation } from '@tanstack/react-query';

import ExceptionBase from '@/lib/HttpErrorException';
import { userError } from '@/constants/message';
import useUserStatus from '@/hooks/useUserStatus';

class MutationFail {}

interface UseMutationOptions<TQueryFnData, TVariables> {
  mutationFn: (userId: number, args: TVariables) => Promise<TQueryFnData>;
  onSuccess?: (data: TQueryFnData) => void;
  onError?: (error: ExceptionBase) => void;
  noLoginRequired?: boolean;
}

const useMutation = <TQueryFnData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
  noLoginRequired = false,
}: UseMutationOptions<TQueryFnData, TVariables>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, isLogin } = useUserStatus();

  const mutationResult = useOriginMutation<
    TQueryFnData | MutationFail,
    ExceptionBase,
    TVariables
  >({
    mutationFn: async (args) => {
      if (isLoading) {
        return new MutationFail();
      }

      setIsLoading(true);

      if (!noLoginRequired && !isLogin) {
        toast.error(userError.NOT_LOGGED);
        return new MutationFail();
      }

      return mutationFn(isLogin ? session.id : null, args);
    },

    onSuccess: (data) => {
      setTimeout(() => setIsLoading(false), 1000);

      if (data instanceof MutationFail) {
        return;
      }

      if (onSuccess) {
        onSuccess(data);
      }
    },

    onError: (error) => {
      setIsLoading(false);

      if (onError) {
        onError(error);
      }
    },
  });

  return mutationResult;
};

export default useMutation;
