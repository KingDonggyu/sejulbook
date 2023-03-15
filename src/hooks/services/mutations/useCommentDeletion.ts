import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentDeleteRequest } from '@/types/features/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';
import { deleteComment } from '@/services/api/comment';
import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';

const useCommentDeletion = ({
  bookReviewId,
}: Pick<CommentDeleteRequest, 'bookReviewId'>) => {
  const { session, isLogin } = useUserStatus();
  const queryClient = useQueryClient();

  const mutationFn = async ({ id }: Pick<CommentDeleteRequest, 'id'>) => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return false;
    }
    await deleteComment({ id, bookReviewId, userId: session.id });
    return true;
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries(getCommentsQuery(bookReviewId));
      }
    },
    onError: (error) => {
      if (error instanceof CommentError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useCommentDeletion;
