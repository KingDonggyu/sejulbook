import useInfiniteQuery from '@/lib/react-query/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByTag']>>;

export const getBookReviewListByTagInfinityQuery = ({
  tag,
  pageParam = null,
}: {
  tag: string;
  pageParam?: number | null;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByTag', tag],
  queryFn: () =>
    new BookReviewRepository().getPagesByTag({ tag, targetId: pageParam }),
});

const useInfiniteBookReviewListByTag = (tag: string) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Response>({
    ...getBookReviewListByTagInfinityQuery({ tag }),
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

export default useInfiniteBookReviewListByTag;