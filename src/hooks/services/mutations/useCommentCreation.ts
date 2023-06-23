import { toast } from 'react-toastify';
import type { CreateCommentRequest } from 'comment';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/hooks/useMutation';
import CommentRepository from '@/repository/api/CommentRepository';
import { getCommentsQuery } from '../queries/useComments';

interface UseCommentCreationOption {
  onSuccess?: () => void;
}

const useCommentCreation = ({ onSuccess }: UseCommentCreationOption) => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    void,
    Omit<CreateCommentRequest, 'commenterId'>
  >({
    mutationFn: async (commenterId, comment) => {
      queryKey = getCommentsQuery(comment.bookReviewId).queryKey;
      await new CommentRepository().create({ commenterId, ...comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useCommentCreation;
