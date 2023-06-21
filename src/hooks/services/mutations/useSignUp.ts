import { toast } from 'react-toastify';
import useMutation from '@/lib/react-query/hooks/useMutation';
import UserRepository from '@/repository/api/UserRepository';

type Request = Parameters<UserRepository['signUp']>[0];

const useSignUp = () => {
  const mutate = useMutation<void, Request>({
    mutationFn: async (_, user) => {
      await new UserRepository().signUp(user);
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  return mutate;
};

export default useSignUp;
