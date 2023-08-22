import type { GetPublishedBookReviewResponse, Id } from 'bookReview';
import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

export const getBookReviewQuery = (
  bookReviewId?: Id,
  isOnlyPublished = false,
): Query<GetPublishedBookReviewResponse | null> => ({
  queryKey: ['bookReview_get', bookReviewId],
  queryFn: () =>
    bookReviewId
      ? new BookReviewRepository().httpGet(bookReviewId, isOnlyPublished)
      : null,
  options: { enabled: !!bookReviewId },
});

const useBookReview = (bookReviewId?: Id, isOnlyPublished = false) => {
  const { data: bookReview, isLoading } =
    useQuery<GetPublishedBookReviewResponse | null>(
      getBookReviewQuery(bookReviewId, isOnlyPublished),
    );

  return { bookReview, isLoading };
};

export default useBookReview;
