import { toast } from 'react-toastify';
import useMutation from '@/lib/react-query/useMutation';
import UserRepository from '@/repository/api/UserRepository';

const useUserDeletion = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      await new UserRepository().delete(userId);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useUserDeletion;
