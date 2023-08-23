import useQuery from '@/lib/react-query/hooks/useQuery';
import type { Query } from '@/lib/react-query/types/query';
import CommentRepository from '@/repository/api/CommentRepository';

type Response = Awaited<ReturnType<CommentRepository['httpGet']>>;

export const getCommentsQuery = (bookReviewId: number): Query<Response> => ({
  queryKey: ['comment_get', bookReviewId],
  queryFn: () => new CommentRepository().httpGet(bookReviewId),
});

const useComments = (bookReviewId: number) => {
  const { data: comments, isLoading } = useQuery<Response>(
    getCommentsQuery(bookReviewId),
  );

  return { comments, isLoading };
};

export default useComments;
