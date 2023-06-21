import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['get']>>;

export const getBookReviewQuery = (bookReviewId: number): Query<Response> => ({
  queryKey: ['bookReview_get', bookReviewId],
  queryFn: () => new BookReviewRepository().get(bookReviewId),
});

const useBookReview = (bookReviewId: number) => {
  const { data: bookReview, isLoading } = useQuery<Response>(
    getBookReviewQuery(bookReviewId),
  );

  return { bookReview, isLoading };
};

export default useBookReview;
