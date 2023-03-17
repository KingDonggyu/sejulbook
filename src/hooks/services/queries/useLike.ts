import useQuery from '@/hooks/useQuery';
import { getLikeStatusQuery } from '@/services/queries/like';
import { LikeRequest, LikeResponse } from '@/types/features/like';

const useLikeStatus = ({ userId, bookReviewId }: LikeRequest) => {
  const { data: likeStatus } = useQuery<LikeResponse>(
    getLikeStatusQuery({ userId, bookReviewId }),
  );

  return likeStatus;
};

export default useLikeStatus;
