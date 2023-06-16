import { useSession } from 'next-auth/react';
import { SessionAfterLogin, SessionBeforeLogin } from '@/types/session.';

interface UserStatus {
  isLoading: boolean;
}

interface NotAuthStatus extends UserStatus {
  session: null;
  isLogin: false;
  isSignupRequired: false;
}

interface LoggedStatus extends UserStatus {
  session: SessionAfterLogin;
  isLogin: true;
  isSignupRequired: false;
}

interface NotLoggedStatus extends UserStatus {
  session: SessionBeforeLogin;
  isLogin: false;
  isSignupRequired: true;
}

const useUserStatus = (): NotAuthStatus | LoggedStatus | NotLoggedStatus => {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuth = status === 'authenticated';

  // 미인증 사용자
  if (!isAuth || session === null) {
    const result: NotAuthStatus = {
      session: null,
      isLoading,
      isLogin: false,
      isSignupRequired: false,
    };
    return result;
  }

  const isLogin = isAuth && session && session.id !== null;

  // 로그인된 사용자
  if (isLogin) {
    const result: LoggedStatus = {
      session,
      isLoading,
      isLogin: true,
      isSignupRequired: false,
    };
    return result;
  }

  // 회원가입이 필요한 사용자
  const result: NotLoggedStatus = {
    session: session as SessionBeforeLogin,
    isLoading,
    isLogin: false,
    isSignupRequired: true,
  };

  return result;
};

export default useUserStatus;
