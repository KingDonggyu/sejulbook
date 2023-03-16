import { toast } from 'react-toastify';
import {
  QueryKey,
  useMutation as useOriginMutation,
} from '@tanstack/react-query';
import { userError } from '@/constants/message';
import { UserId } from '@/types/features/user';
import useUserStatus from './useUserStatus';

class MutationFail {
  fail = true;
}

interface MutationProps<T> {
  mutationFn: (userId: UserId) => Promise<T>;
  onSuccess: (data: T) => void;
  onError: (error: unknown) => void;
  queryKeysToRefetch?: QueryKey[];
}

const useMutation = <T>({
  mutationFn,
  onSuccess,
  onError,
}: MutationProps<T>) => {
  const mutationFail = new MutationFail();
  const { session, isLogin } = useUserStatus();

  const mutationResult = useOriginMutation({
    mutationFn: async () => {
      if (mutationResult.isLoading) {
        return mutationFail;
      }

      if (!isLogin) {
        toast.error(userError.NOT_LOGGED);
        return mutationFail;
      }

      return mutationFn(session.id);
    },

    onSuccess: (data) => {
      if (data instanceof MutationFail) {
        return;
      }

      if (onSuccess) {
        onSuccess(data);
      }
    },

    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });

  return mutationResult;
};

export default useMutation;
