import { LikeRequest } from '@/types/features/like';
import Query from '@/types/query';
import { getLikeStatus } from '../api/like';

const BASE_QUERY_KEY = 'like';

export const getLikeStatusQuery = ({
  userId,
  bookReviewId,
}: LikeRequest): Query => ({
  queryKey: [`${BASE_QUERY_KEY}_getComments`, bookReviewId],
  queryFn: () => getLikeStatus({ userId, bookReviewId }),
});
