import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import CommentRepository from '@/repository/api/CommentRepository';
import { getCommentsQuery } from '../queries/useComments';

type Request = Omit<Parameters<CommentRepository['delete']>[0], 'commenterId'>;

const useCommentDeletion = () => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (commenterId, { id, bookReviewId }) => {
      queryKey = getCommentsQuery(bookReviewId).queryKey;
      await new CommentRepository().delete({ commenterId, id, bookReviewId });
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

export default useCommentDeletion;
