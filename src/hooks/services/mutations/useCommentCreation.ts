import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { CommentRequest } from '@/types/features/comment';
import { addComment } from '@/services/api/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';

interface CommentCreationProps extends Omit<CommentRequest, 'commenterId'> {
  onSuccess?: () => void;
}

const useCommentCreation = ({
  bookReviewId,
  content,
  onSuccess,
}: CommentCreationProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      await addComment({ bookReviewId, content, commenterId: userId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsQuery(bookReviewId));
      if (onSuccess) {
        onSuccess();
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
