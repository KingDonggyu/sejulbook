import useQuery from '@/hooks/useQuery';
import { getBookReviewQuery } from '@/services/queries/bookReview';
import { BookReviewId, BookReviewResponse } from '@/types/features/bookReview';

const useBookReview = (
  bookReviewId?: BookReviewId,
  isSaveRequired?: boolean,
) => {
  const { data: bookReview } = useQuery<BookReviewResponse | undefined>(
    getBookReviewQuery(bookReviewId, isSaveRequired),
  );

  return bookReview;
};

export default useBookReview;
