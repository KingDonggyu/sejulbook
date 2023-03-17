import { useState } from 'react';
import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { deleteBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { BookReviewId } from '@/types/features/bookReview';
import { getDraftSavedListQuery } from '@/services/queries/bookReview';

interface DraftSavedBookReviewDeletionProps {
  bookReviewId: BookReviewId;
  isDraftSaved?: boolean;
  onSuccess?: () => void;
}

const useBookReviewDeletion = ({
  bookReviewId,
  isDraftSaved,
  onSuccess,
}: DraftSavedBookReviewDeletionProps) => {
  const queryClient = useQueryClient();
  const [queryKey, setQueryKey] = useState<QueryKey>([]);

  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      if (isDraftSaved) {
        setQueryKey(getDraftSavedListQuery(userId).queryKey);
      }

      await deleteBookReview({ userId, bookReviewId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useBookReviewDeletion;
