import { useState } from 'react';
import { toast } from 'react-toastify';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { LikeRequest, LikeResponse } from '@/types/features/like';
import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';
import { like, unlike } from '@/services/api/like';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { getLikeStatusQuery } from '@/services/queries/like';

type LikeToggleProps = LikeRequest & Pick<LikeResponse, 'isLike'>;

const useLikeToggle = ({ isLike, bookReviewId }: LikeToggleProps) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();
  const [queryKey, setQueryKey] = useState<QueryKey>();

  const mutationFn = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    setQueryKey(
      getLikeStatusQuery({ userId: session.id, bookReviewId }).queryKey,
    );

    if (isLike) {
      await unlike({ userId: session.id, bookReviewId });
      return;
    }

    await like({ userId: session.id, bookReviewId });
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useLikeToggle;
