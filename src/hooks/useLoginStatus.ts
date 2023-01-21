import { useSession } from 'next-auth/react';

const useLoginStatus = () => {
  const { data: session, status } = useSession();

  return {
    session,
    isLogin: status === 'authenticated',
    isLoading: status === 'loading',
  };
};

export default useLoginStatus;
