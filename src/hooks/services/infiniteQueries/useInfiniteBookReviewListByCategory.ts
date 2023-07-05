import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByCategory']>>;

export const getBookReviewListByCategoryInfinityQuery = ({
  category,
}: {
  category: string;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByCategory', category],
  queryFn: ({ pageParam = null }) =>
    new BookReviewRepository().getPagesByCategory({
      category,
      targetId: pageParam,
    }),
});

const useInfiniteBookReviewListByCategory = (category: string) => {
  const { data, fetchNextPage, isLoading, isInitialLoading } =
    useInfiniteQuery<Response>({
      ...getBookReviewListByCategoryInfinityQuery({ category }),
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
    isInitialLoading,
  };
};

export default useInfiniteBookReviewListByCategory;
