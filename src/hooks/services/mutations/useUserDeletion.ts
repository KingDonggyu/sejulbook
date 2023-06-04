import { toast } from 'react-toastify';
import useMutation from '@/hooks/useMutation';
import { deleteUser } from '@/services/api/user';
import UserError from '@/services/errors/UserError';

const useUserDeletion = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      await deleteUser(userId);
    },

    onSuccess: () => {
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

export default useUserDeletion;
