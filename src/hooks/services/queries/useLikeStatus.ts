import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import LikeRepository from '@/repository/api/LikeRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Request = { bookReviewId: number; likerId?: number };
type Response = Awaited<ReturnType<LikeRepository['has']>>;

export const getLikeStatusQuery = ({
  bookReviewId,
  likerId,
}: Request): Query<Response> => ({
  queryKey: ['like_has', bookReviewId],
  queryFn: () =>
    likerId ? new LikeRepository().has({ bookReviewId, likerId }) : false,
});

const useLikeStatus = (bookReviewId: number) => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data: likeStatus, isLoading } = useQuery<Response>(
    getLikeStatusQuery({ bookReviewId, likerId: myUserId }),
  );

  return { likeStatus, isLoading };
};

export default useLikeStatus;
