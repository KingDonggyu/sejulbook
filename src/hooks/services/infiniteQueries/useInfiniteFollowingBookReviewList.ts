import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import useUserStatus from '@/hooks/useUserStatus';
import { GetBookReviewPageResponse } from 'bookReview';

export const getFollowingBookReviewListInfinityQuery = ({
  myUserId,
}: {
  myUserId?: number;
}): InfiniteQuery<GetBookReviewPageResponse[]> => ({
  queryKey: ['bookReview_getFollowingPages', myUserId],
  queryFn: ({ pageParam = null }) => {
    if (!myUserId) {
      return [];
    }
    return new BookReviewRepository().getFollowingPages({
      followerId: myUserId,
      targetId: pageParam,
    });
  },
});

const useInfiniteFollowingBookReviewList = () => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data, fetchNextPage, isLoading, isInitialLoading } = useInfiniteQuery<
    GetBookReviewPageResponse[]
  >({
    ...getFollowingBookReviewListInfinityQuery({ myUserId }),
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
    followingBookReviewList: data,
    refetchNextFollowingBookReviewList: fetchNextPage,
    isLoading,
    isInitialLoading,
  };
};

export default useInfiniteFollowingBookReviewList;
