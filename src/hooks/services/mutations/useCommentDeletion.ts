import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { CommentDeleteRequest } from '@/types/features/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';
import { deleteComment } from '@/services/api/comment';
import useMutation from '@/hooks/useMutation';

const useCommentDeletion = ({
  bookReviewId,
}: Pick<CommentDeleteRequest, 'bookReviewId'>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Pick<CommentDeleteRequest, 'id'>>({
    mutationFn: async (userId, { id }) => {
      await deleteComment({ id, bookReviewId, userId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsQuery(bookReviewId));
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
