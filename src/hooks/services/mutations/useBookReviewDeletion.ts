import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import { getDraftSavedListQuery } from '../queries/useDraftSavedList';

type Request = Parameters<BookReviewRepository['delete']>[0];
interface UseBookReviewDeletionOption {
  onSuccess?: () => void;
}

const useBookReviewDeletion = ({ onSuccess }: UseBookReviewDeletionOption) => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (userId, bookReviewId) => {
      queryKey = getDraftSavedListQuery(userId).queryKey;
      await new BookReviewRepository().delete(bookReviewId, userId);
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

export default useBookReviewDeletion;
