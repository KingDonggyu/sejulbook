import type { GetPublishedBookReviewResponse, Id } from 'bookReview';
import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import ExceptionBase from '@/lib/HttpErrorException';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import redirectAfterShowingErrorToast from '@/utils/redirectAfterShowingErrorToast';

export const getBookReviewQuery = (
  bookReviewId?: Id,
): Query<GetPublishedBookReviewResponse | null> => ({
  queryKey: ['bookReview_get', bookReviewId],
  queryFn: () =>
    bookReviewId
      ? new BookReviewRepository()
          .get(bookReviewId)
          .catch((error: ExceptionBase) => {
            redirectAfterShowingErrorToast(error.message);
            return null;
          })
      : null,
  options: { enabled: !!bookReviewId },
});

const useBookReview = (bookReviewId?: Id) => {
  const { data: bookReview, isLoading } =
    useQuery<GetPublishedBookReviewResponse | null>(
      getBookReviewQuery(bookReviewId),
    );

  return { bookReview, isLoading };
};

export default useBookReview;
