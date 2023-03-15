import { useMemo } from 'react';
import useQuery from '@/hooks/useQuery';
import { getBookReviewListQuery } from '@/services/queries/bookReview';
import { BookReivewList } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

const useBookReviewList = (userId: UserId) => {
  const { data } = useQuery<BookReivewList>(
    getBookReviewListQuery(Number(userId)),
  );

  const bookReviewList = useMemo(
    () =>
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [data],
  );

  return bookReviewList;
};

export default useBookReviewList;
