import useQuery from '@/hooks/useQuery';
import { getFollowingBookReviewListQuery } from '@/services/queries/bookReview';
import { ExtendedBookReviewSummary } from '@/types/features/bookReview';
import useMe from './useMe';

const useFollowingBookReviewList = () => {
  const me = useMe();
  const { data: followingBookReviewList } = useQuery<
    ExtendedBookReviewSummary[]
  >(getFollowingBookReviewListQuery(me?.id));

  return followingBookReviewList;
};

export default useFollowingBookReviewList;
