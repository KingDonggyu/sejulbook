import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import useUserStatus from '@/hooks/useUserStatus';

type Response = Awaited<
  ReturnType<BookReviewRepository['getAllDraftSavedOfUser']>
>;

export const getDraftSavedListQuery = (userId?: number): Query<Response> => ({
  queryKey: ['bookReveiw_getAllDraftSavedOfUser', userId],
  queryFn: async () => {
    if (!userId) {
      return [];
    }
    const data = await new BookReviewRepository().getAllDraftSavedOfUser(
      userId,
    );
    return data;
  },
});

const useDraftSavedList = () => {
  const { session, isLogin } = useUserStatus();
  const myUserId = isLogin ? session.id : undefined;

  const { data, isLoading } = useQuery<Response>(
    getDraftSavedListQuery(myUserId),
  );

  return { draftSavedList: data || [], isLoading };
};

export default useDraftSavedList;
