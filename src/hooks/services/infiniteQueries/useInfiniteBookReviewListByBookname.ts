import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByBookname']>>;

export const getBookReviewListByBooknameInfiniteQuery = ({
  bookname,
}: {
  bookname: string;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByBookname', bookname],
  queryFn: ({ pageParam = null }) =>
    new BookReviewRepository().getPagesByBookname({
      bookname,
      targetId: pageParam,
    }),
});

const useInfiniteBookReviewListByBookname = (bookname: string) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Response>({
    ...getBookReviewListByBooknameInfiniteQuery({ bookname }),
    options: {
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.length) {
          return null;
        }
        return lastPage[lastPage.length - 1].id;
      },
    },
  });

  return {
    bookReviewList: data,
    refetchBookReviewList: fetchNextPage,
    isLoading,
  };
};

export default useInfiniteBookReviewListByBookname;
