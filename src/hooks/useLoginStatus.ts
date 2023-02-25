import { useSession } from 'next-auth/react';
import { SessionAfterLogin, SessionBeforeLogin } from '@/types/session';

interface LoggedStatus {
  session: SessionAfterLogin;
  isLoading: boolean;
  isLogin: true;
  isSignupRequired: false;
}

interface NotLoggedStatus {
  session: SessionBeforeLogin;
  isLoading: boolean;
  isLogin: false;
  isSignupRequired: boolean;
}

const useLoginStatus = () => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuth = status === 'authenticated';
  const isLogin = isAuth && session && session.id !== null;

  if (isLogin) {
    return {
      session: session as SessionAfterLogin,
      isLoading,
      isLogin: true,
      isSignupRequired: false,
    } as LoggedStatus;
  }

  return {
    session: session as SessionBeforeLogin,
    isLoading,
    isLogin: false,
    isSignupRequired: isAuth && session && session.id === null,
  } as NotLoggedStatus;
};

export default useLoginStatus;
