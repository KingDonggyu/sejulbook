import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';
import { updateUser } from '@/services/api/user';
import { User } from '@/types/features/user';
import { getUserQuery } from '@/services/queries/user';
import UserError from '@/services/errors/UserError';

const useUserEdit = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async ({ name, introduce }: Omit<User, 'id'>) => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return false;
    }

    await updateUser({ id: session.id, name, introduce });
    return true;
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (isSuccess) => {
      if (!isSuccess) {
        return;
      }
      if (isLogin) {
        queryClient.invalidateQueries(getUserQuery(session.id));
      }
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      if (error instanceof UserError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useUserEdit;
