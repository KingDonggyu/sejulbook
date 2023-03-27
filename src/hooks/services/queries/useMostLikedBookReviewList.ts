import useQuery from '@/hooks/useQuery';
import { getMostLikedBookReviewListQuery } from '@/services/queries/bookReview';
import { HomeBookReviewSummary } from '@/types/features/bookReview';

const useMostLikedBookReviewList = () => {
  const { data: mostLikedBookReviewList } = useQuery<HomeBookReviewSummary[]>(
    getMostLikedBookReviewListQuery,
  );

  return mostLikedBookReviewList;
};

export default useMostLikedBookReviewList;
