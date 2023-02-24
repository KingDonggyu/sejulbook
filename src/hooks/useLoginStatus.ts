import { useSession } from 'next-auth/react';
import Session from '@/types/session';

const useLoginStatus = () => {
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const session = data as unknown as Session;

  return {
    session,
    isLogin: isAuth && session && session.id !== null,
    isLoading: status === 'loading',
    isSignupRequired: isAuth && session && session.id === null,
  };
};

export default useLoginStatus;
