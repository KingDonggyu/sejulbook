import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/hooks/useMutation';
import FollowRepository from '@/repository/api/FollowRepository';
import { getFollowInfoQuery } from '../queries/useFollowInfo';

interface Request
  extends Omit<Parameters<FollowRepository['follow']>[0], 'myUserId'> {
  isSubscribed: boolean;
}

const useSubscribeToggle = () => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (myUserId, { targetUserId, isSubscribed }) => {
      queryKey = getFollowInfoQuery({ targetUserId, myUserId }).queryKey;
      if (isSubscribed) {
        await new FollowRepository().unfollow({ myUserId, targetUserId });
        return;
      }
      await new FollowRepository().follow({ myUserId, targetUserId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useSubscribeToggle;
