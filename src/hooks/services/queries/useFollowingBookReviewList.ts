import useQuery from '@/lib/react-query/useQuery';
import type { Query } from '@/lib/react-query/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Response = Awaited<
  ReturnType<BookReviewRepository['getFollowings']>
> | null;

export const getFollowingBookReviewListQuery = (
  userId?: number,
): Query<Response> => ({
  queryKey: ['bookReview_getFollowings'],
  queryFn: () =>
    userId ? new BookReviewRepository().getFollowings(userId) : null,
});

const useFollowingBookReviewList = () => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data: followingBookReviewList, isLoading } = useQuery<Response>(
    getFollowingBookReviewListQuery(myUserId),
  );

  return { followingBookReviewList, isLoading };
};

export default useFollowingBookReviewList;
