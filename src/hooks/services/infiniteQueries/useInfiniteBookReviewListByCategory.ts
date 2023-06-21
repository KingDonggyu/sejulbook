import useInfiniteQuery from '@/lib/react-query/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByCategory']>>;

export const getBookReviewListByCategoryInfinityQuery = ({
  category,
  pageParam = null,
}: {
  category: string;
  pageParam?: number | null;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByCategory', category],
  queryFn: () =>
    new BookReviewRepository().getPagesByCategory({
      category,
      targetId: pageParam,
    }),
});

const useInfiniteBookReviewListByCategory = (category: string) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Response>({
    ...getBookReviewListByCategoryInfinityQuery({ category }),
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

export default useInfiniteBookReviewListByCategory;
