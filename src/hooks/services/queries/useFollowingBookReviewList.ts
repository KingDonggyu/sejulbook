import useQuery from '@/hooks/useQuery';
import { getFollowingBookReviewListQuery } from '@/services/queries/bookReview';
import { HomeBookReviewSummary } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

const useFollowingBookReviewList = (myUserId?: UserId) => {
  const { data: followingBookReviewList } = useQuery<HomeBookReviewSummary[]>(
    getFollowingBookReviewListQuery(myUserId),
  );

  return followingBookReviewList;
};

export default useFollowingBookReviewList;
