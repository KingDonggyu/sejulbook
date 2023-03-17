import useUserStatus from '@/hooks/useUserStatus';
import useUser from './useUser';

const useMe = () => {
  const { session, isLogin } = useUserStatus();
  const myId = isLogin ? session.id : undefined;
  const me = useUser(myId);

  return me;
};

export default useMe;
