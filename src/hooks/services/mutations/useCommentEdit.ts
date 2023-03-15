import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStatus from '@/hooks/useUserStatus';
import { CommentUpdateRequest } from '@/types/features/comment';
import { userError } from '@/constants/message';
import { updateComment } from '@/services/api/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';

const useCommentEdit = ({
  bookReviewId,
}: Pick<CommentUpdateRequest, 'bookReviewId'>) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async ({
    id,
    content,
  }: Pick<CommentUpdateRequest, 'id' | 'content'>) => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return false;
    }

    await updateComment({
      id,
      content,
      bookReviewId,
      userId: session.id,
    });

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

export default useCommentEdit;
