import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation as useOriginMutation } from '@tanstack/react-query';
import { userError } from '@/constants/message';
import { UserId } from '@/types/features/user';
import useUserStatus from './useUserStatus';

class MutationFail {
  fail = true;
}

interface MutationProps<T, U> {
  mutationFn: (userId: UserId, args: U) => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: unknown) => void;
}

const useMutation = <T, U = void>({
  mutationFn,
  onSuccess,
  onError,
}: MutationProps<T, U>) => {
  const mutationFail = new MutationFail();
  const [isLoading, setIsLoading] = useState(false);
  const { session, isLogin } = useUserStatus();

  const mutationResult = useOriginMutation({
    mutationFn: async (args: U) => {
      if (mutationResult.isLoading || isLoading) {
        return mutationFail;
      }

      setIsLoading(true);

      if (!isLogin) {
        toast.error(userError.NOT_LOGGED);
        return mutationFail;
      }

      return mutationFn(session.id, args);
    },

    onSuccess: (data) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

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
