import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import useMutation from '@/lib/react-query/hooks/useMutation';
import UserRepository from '@/repository/api/UserRepository';
import { OAuthName } from '@/constants';

type Request = Parameters<UserRepository['signUp']>[0];

interface MutationFnVariables extends Request {
  oAuth: OAuthName;
}

const useSignUp = () => {
  const { mutate } = useMutation<OAuthName, MutationFnVariables>({
    mutationFn: async (_, user) => {
      await new UserRepository().signUp(user);
      return user.oAuth;
    },
    onSuccess: async (oAuth) => {
      await signIn(oAuth);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    noLoginRequired: true,
  });

  return mutate;
};

export default useSignUp;
