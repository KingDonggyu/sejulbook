import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { getBookReviewListInfinityQuery } from '@/services/queries/bookReview';
import { BookTitle } from '@/types/features/book';
import { FeedBookReviewSummary } from '@/types/features/bookReview';

const useInfinityBookReviewList = (title: BookTitle) => {
  const { data, fetchNextPage } = useInfiniteQuery<FeedBookReviewSummary[]>({
    ...getBookReviewListInfinityQuery({ query: title }),
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
  };
};

export default useInfinityBookReviewList;
