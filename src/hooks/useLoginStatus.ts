import { useSession } from 'next-auth/react';
import { InitilaizedUser } from '@/types/domain/user';

const useLoginStatus = () => {
  const { data, status } = useSession();
  const isLogin = status === 'authenticated';
  const session = data as unknown as
    | InitilaizedUser
    | Pick<InitilaizedUser, 'id'>;

  return {
    session,
    isLogin,
    isLoading: status === 'loading',
    isSignupRequired: isLogin && session && session.id === null,
  };
};

export default useLoginStatus;
