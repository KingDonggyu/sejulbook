import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getMostLikes']>>;

export const mostLikedBookReviewListQuery: Query<Response> = {
  queryKey: ['bookReview_getMostLikes'],
  queryFn: () => new BookReviewRepository().getMostLikes(),
};

const useMostLikedBookReviewList = () => {
  const { data: mostLikedBookReviewList, isLoading } = useQuery<Response>(
    mostLikedBookReviewListQuery,
  );

  return { mostLikedBookReviewList, isLoading };
};

export default useMostLikedBookReviewList;
