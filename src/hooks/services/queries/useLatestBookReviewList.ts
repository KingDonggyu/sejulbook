import useQuery from '@/lib/react-query/useQuery';
import type { Query } from '@/lib/react-query/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getLatests']>>;

export const latestBookReviewListQuery: Query<Response> = {
  queryKey: ['bookReview_getLatests'],
  queryFn: new BookReviewRepository().getLatests,
};

const useLatestBookReviewList = () => {
  const { data: latestBookReviewList, isLoading } = useQuery<Response>(
    latestBookReviewListQuery,
  );

  return { latestBookReviewList, isLoading };
};

export default useLatestBookReviewList;
