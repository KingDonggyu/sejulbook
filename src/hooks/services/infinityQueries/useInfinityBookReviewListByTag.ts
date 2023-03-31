import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { getBookReviewListByTagInfinityQuery } from '@/services/queries/bookReview';
import { FeedBookReviewSummary } from '@/types/features/bookReview';
import { Tag } from '@/types/features/tag';

const useInfinityBookReviewListByTag = (tag: Tag) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    FeedBookReviewSummary[]
  >({
    ...getBookReviewListByTagInfinityQuery({ query: tag }),
    options: {
      getNextPageParam: (lastPage) => {
        const page = lastPage as FeedBookReviewSummary[];

        if (!page || !page.length) {
          return undefined;
        }

        return page[page.length - 1].id;
      },
    },
  });

  return {
    bookReviewList: data || [],
    refetchBookReviewList: fetchNextPage,
    isLoading,
  };
};

export default useInfinityBookReviewListByTag;
