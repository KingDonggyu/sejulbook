import useQuery from '@/hooks/useQuery';
import { getLatestBookReviewListQuery } from '@/services/queries/bookReview';
import { HomeBookReviewSummary } from '@/types/features/bookReview';

const useLatestBookReviewList = () => {
  const { data: latestBookReviewList } = useQuery<HomeBookReviewSummary[]>(
    getLatestBookReviewListQuery,
  );

  return latestBookReviewList;
};

export default useLatestBookReviewList;
