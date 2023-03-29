import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { getBookReviewListByCategoryInfinityQuery } from '@/services/queries/bookReview';
import { FeedBookReviewSummary } from '@/types/features/bookReview';
import { Category } from '@/types/features/category';

const useInfinityBookReviewListByCategory = (category: Category) => {
  const { data, fetchNextPage } = useInfiniteQuery<FeedBookReviewSummary[]>({
    ...getBookReviewListByCategoryInfinityQuery({ query: category }),
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

export default useInfinityBookReviewListByCategory;
