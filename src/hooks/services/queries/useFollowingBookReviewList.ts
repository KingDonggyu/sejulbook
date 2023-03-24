import useQuery from '@/hooks/useQuery';
import useUserStatus from '@/hooks/useUserStatus';
import { getFollowingBookReviewListQuery } from '@/services/queries/bookReview';
import { ExtendedBookReviewSummary } from '@/types/features/bookReview';

const useFollowingBookReviewList = () => {
  const { session } = useUserStatus();
  const myUserId = session ? session.id || undefined : undefined;

  const { data: followingBookReviewList } = useQuery<
    ExtendedBookReviewSummary[]
  >(getFollowingBookReviewListQuery(myUserId));

  return followingBookReviewList;
};

export default useFollowingBookReviewList;
