import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import LikeRepository from '@/repository/api/LikeRepository';
import useUserStatus from '@/hooks/useUserStatus';
import { LikeStatusRequest, LikeStatusResponse } from 'like';

export const getLikeStatusQuery = ({
  bookReviewId,
  likerId,
}: LikeStatusRequest): Query<LikeStatusResponse> => ({
  queryKey: ['like_has', bookReviewId],
  queryFn: () => new LikeRepository().has({ bookReviewId, likerId }),
});

const useLikeStatus = (bookReviewId: number) => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data: likeStatus, isLoading } = useQuery<LikeStatusResponse>(
    getLikeStatusQuery({ bookReviewId, likerId: myUserId }),
  );

  return { likeStatus, isLoading };
};

export default useLikeStatus;
