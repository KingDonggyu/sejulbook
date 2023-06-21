import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import LikeRepository from '@/repository/api/LikeRepository';
import { getLikeStatusQuery } from '../queries/useLikeStatus';

interface Request
  extends Omit<Parameters<LikeRepository['like']>[0], 'likerId'> {
  isLiked: boolean;
}

const useLikeToggle = () => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (likerId, { bookReviewId, isLiked }) => {
      queryKey = getLikeStatusQuery({ bookReviewId, likerId }).queryKey;
      if (isLiked) {
        await new LikeRepository().unlike({ bookReviewId, likerId });
        return;
      }
      await new LikeRepository().like({ bookReviewId, likerId });
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

export default useLikeToggle;
