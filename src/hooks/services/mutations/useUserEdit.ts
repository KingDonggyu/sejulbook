import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import UserRepository from '@/repository/api/UserRepository';
import { getUserQuery } from '../queries/useUser';

type Request = Omit<Parameters<UserRepository['update']>[0], 'id'>;

const useUserEdit = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (id, { name, introduce }) => {
      queryKey = getUserQuery(id).queryKey;
      await new UserRepository().update({ id, name, introduce });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
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

export default useUserEdit;
