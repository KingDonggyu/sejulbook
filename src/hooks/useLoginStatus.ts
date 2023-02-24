import { useSession } from 'next-auth/react';
import Session, {
  SessionAfterLogin,
  SessionBeforeLogin,
} from '@/types/session';

interface LoggedStatus {
  isLogin: true;
  isSignupRequired: false;
  isLoading: false;
  session: SessionAfterLogin;
}

interface NotLoggedStatus {
  isLogin: false;
  isSignupRequired: boolean;
  isLoading: boolean;
  session: SessionBeforeLogin;
}

const useLoginStatus = () => {
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const session = data as unknown as Session;

  const isLogin = isAuth && session && session.id !== null;
  const isSignupRequired = isAuth && session && session.id === null;

  if (isLogin && !isSignupRequired) {
    return {
      session,
      isLogin: true,
      isSignupRequired: false,
      isLoading: false,
    } as LoggedStatus;
  }

  return {
    session,
    isLogin,
    isLoading: status === 'loading',
    isSignupRequired,
  } as unknown as NotLoggedStatus;
};

export default useLoginStatus;
