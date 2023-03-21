import { useState } from 'react';
import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { subscribe } from '@/services/api/follow';
import FollowError from '@/services/errors/FollowError';
import { getFollowInfoQuery } from '@/services/queries/follow';
import { SubscribeRequest } from '@/types/features/follow';

const useSubscribe = ({
  targetUserId,
}: Pick<SubscribeRequest, 'targetUserId'>) => {
  const queryClient = useQueryClient();
  const [queryKey, setQueryKey] = useState<QueryKey>();

  const { mutate } = useMutation({
    mutationFn: async (myUserId) => {
      setQueryKey(getFollowInfoQuery({ targetUserId, myUserId }).queryKey);
      await subscribe({ targetUserId, myUserId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },

    onError: (error) => {
      if (error instanceof FollowError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useSubscribe;
