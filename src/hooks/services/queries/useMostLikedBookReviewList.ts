import useQuery from '@/hooks/useQuery';
import { getMostLikedBookReviewListQuery } from '@/services/queries/bookReview';
import { ExtendedBookReviewSummary } from '@/types/features/bookReview';

const useMostLikedBookReviewList = () => {
  const { data: mostLikedBookReviewList } = useQuery<
    ExtendedBookReviewSummary[]
  >(getMostLikedBookReviewListQuery);

  return mostLikedBookReviewList;
};

export default useMostLikedBookReviewList;
