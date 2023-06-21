import { useMemo } from 'react';
import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<
  ReturnType<BookReviewRepository['getAllPublishedOfUser']>
>;

const getBookReviewListQuery = (userId: number): Query<Response> => ({
  queryKey: ['bookReview_getAllPublishedOfUser', userId],
  queryFn: () => new BookReviewRepository().getAllPublishedOfUser(userId),
});

const useBookReviewList = (userId: number) => {
  const { data, isLoading } = useQuery<Response>(
    getBookReviewListQuery(userId),
  );

  const bookReviewList = useMemo(() => {
    if (data) {
      return data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return data;
  }, [data]);

  return { bookReviewList, isLoading };
};

export default useBookReviewList;
