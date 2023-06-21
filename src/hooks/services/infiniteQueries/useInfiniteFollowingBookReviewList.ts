import useInfiniteQuery from '@/lib/react-query/hooks/useInfiniteQuery';
import type { InfiniteQuery } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Response = Awaited<ReturnType<BookReviewRepository['getFollowingPages']>>;

export const getFollowingBookReviewListInfinityQuery = ({
  myUserId,
  pageParam = null,
}: {
  myUserId?: number;
  pageParam?: number | null;
}): InfiniteQuery<Response> => ({
  queryKey: ['bookReview_getFollowingPages'],
  queryFn: () => {
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

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<Response>({
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
  };
};

export default useInfiniteFollowingBookReviewList;
