import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/hooks/useMutation';
import UserRepository from '@/repository/api/UserRepository';

const useUserDeletion = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<void, void>({
    mutationFn: async (userId) => {
      await new UserRepository().delete(userId);
    },
    onSuccess: () => {
      queryClient.clear();
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
