import useUserStatus from '@/hooks/useUserStatus';
import useUser from './services/queries/useUser';

const useMe = () => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { user, isLoading } = useUser(myUserId);
  return { user, isLoading };
};

export default useMe;
