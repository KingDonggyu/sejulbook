import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStatus from '@/hooks/useUserStatus';
import { CommentRequest } from '@/types/features/comment';
import { userError } from '@/constants/message';
import { addComment } from '@/services/api/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';

const useCommentCreation = ({
  bookReviewId,
  content,
}: Omit<CommentRequest, 'commenterId'>) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return false;
    }

    await addComment({ bookReviewId, content, commenterId: session.id });
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

export default useCommentCreation;
