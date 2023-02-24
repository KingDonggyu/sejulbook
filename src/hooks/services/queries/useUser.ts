import useQuery from '@/hooks/useQuery';
import { getUserQuery } from '@/services/queries/user';
import { User, UserId } from '@/types/features/user';

const useUser = (userId: UserId) => {
  const { data: user } = useQuery(getUserQuery(userId));

  return user as User;
};

export default useUser;
