import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { CommentUpdateRequest } from '@/types/features/comment';
import { updateComment } from '@/services/api/comment';
import { getCommentsQuery } from '@/services/queries/comment';
import CommentError from '@/services/errors/CommentError';

type MutationArgType = Pick<CommentUpdateRequest, 'id' | 'content'>;

const useCommentEdit = ({
  bookReviewId,
}: Pick<CommentUpdateRequest, 'bookReviewId'>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, MutationArgType>({
    mutationFn: async (userId, { id, content }) => {
      await updateComment({
        id,
        content,
        bookReviewId,
        userId,
      });
    },

    onSuccess: () => {
      const queryKey = getCommentsQuery(bookReviewId);
      queryClient.invalidateQueries(queryKey);
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
