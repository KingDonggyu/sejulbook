import { useState } from 'react';
import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { LikeRequest, LikeResponse } from '@/types/features/like';
import useMutation from '@/hooks/useMutation';
import { like, unlike } from '@/services/api/like';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { getLikeStatusQuery } from '@/services/queries/like';

type LikeToggleProps = LikeRequest & Pick<LikeResponse, 'isLike'>;

const useLikeToggle = ({ isLike, bookReviewId }: LikeToggleProps) => {
  const queryClient = useQueryClient();
  const [queryKey, setQueryKey] = useState<QueryKey>();

  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      setQueryKey(getLikeStatusQuery({ userId, bookReviewId }).queryKey);

      if (isLike) {
        await unlike({ userId, bookReviewId });
        return;
      }

      await like({ userId, bookReviewId });
    },

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
