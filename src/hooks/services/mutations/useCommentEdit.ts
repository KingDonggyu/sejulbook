import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import CommentRepository from '@/repository/api/CommentRepository';
import { getCommentsQuery } from '../queries/useComments';

type Request = Omit<Parameters<CommentRepository['update']>[0], 'commenterId'>;

const useCommentEdit = () => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (commenterId, { id, content, bookReviewId }) => {
      queryKey = getCommentsQuery(bookReviewId).queryKey;
      await new CommentRepository().update({
        commenterId,
        id,
        content,
        bookReviewId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useCommentEdit;
