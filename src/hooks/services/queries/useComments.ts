import useQuery from '@/hooks/useQuery';
import { getCommentsQuery } from '@/services/queries/comment';
import { BookReviewId } from '@/types/features/bookReview';
import { CommentResponse } from '@/types/features/comment';

const useComments = (bookReviewId: BookReviewId) => {
  const { data: comments } = useQuery<CommentResponse[]>(
    getCommentsQuery(bookReviewId),
  );

  return comments;
};

export default useComments;
