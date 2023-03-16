import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { updateUser } from '@/services/api/user';
import { User } from '@/types/features/user';
import { getUserQuery } from '@/services/queries/user';
import UserError from '@/services/errors/UserError';
import { useState } from 'react';

const useUserEdit = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const [queryKey, setQueryKey] = useState<QueryKey>([]);

  const { mutate } = useMutation<void, Omit<User, 'id'>>({
    mutationFn: async (userId, { name, introduce }) => {
      setQueryKey(getUserQuery(userId).queryKey);
      await updateUser({ id: userId, name, introduce });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);

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
