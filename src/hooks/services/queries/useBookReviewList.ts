import useQuery from '@/hooks/useQuery';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import { BookReivewList } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

const useBookReviewList = (userId: UserId) => {
  const { data: bookReviewList } = useQuery<BookReivewList>(
    getBookReviewListQuery(Number(userId)),
  );

  return bookReviewList;
};

export default useBookReviewList;
