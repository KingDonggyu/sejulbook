import useInfiniteQuery from '@/lib/react-query/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByBookname']>>;

export const getBookReviewListByBooknameInfiniteQuery = ({
  bookname,
  pageParam = null,
}: {
  bookname: string;
  pageParam?: number | null;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByBookname', bookname],
  queryFn: () =>
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
          return undefined;
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
