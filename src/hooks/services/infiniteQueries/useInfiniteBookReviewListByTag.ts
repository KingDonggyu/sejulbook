import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

type Response = Awaited<ReturnType<BookReviewRepository['getPagesByTag']>>;

export const getBookReviewListByTagInfinityQuery = ({
  tag,
}: {
  tag: string;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getPagesByTag', tag],
  queryFn: ({ pageParam }) =>
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
