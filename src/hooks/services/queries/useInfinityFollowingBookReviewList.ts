import useInfiniteQuery from '@/hooks/useInfiniteQuery';
import { getFollowingBookReviewListInfinityQuery } from '@/services/queries/bookReview';
import { FeedBookReviewSummary } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

const useInfinityFollowingBookReviewList = (myUserId?: UserId) => {
  const { data, fetchNextPage } = useInfiniteQuery<FeedBookReviewSummary[]>({
    ...getFollowingBookReviewListInfinityQuery({ userId: myUserId }),
    options: {
      getNextPageParam: (lastPage) => {
        const page = lastPage as FeedBookReviewSummary[];

        if (!page || !page.length) {
          return undefined;
        }

        return page[page.length - 1].followId;
      },
    },
  });

  return {
    followingBookReviewList: data || [],
    refetchNextFollowingBookReviewList: fetchNextPage,
  };
};

export default useInfinityFollowingBookReviewList;
