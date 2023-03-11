import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';
import { deleteBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { BookReviewId } from '@/types/features/bookReview';
import { getDraftSavedListQuery } from '@/services/queries/bookReview';

interface DraftSavedBookReviewDeletionProps {
  bookReviewId: BookReviewId;
}

const useDraftSavedDeletion = ({
  bookReviewId,
}: DraftSavedBookReviewDeletionProps) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return;
    }

    await deleteBookReview({ userId: session.id, bookReviewId });
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      if (isLogin) {
        queryClient.invalidateQueries(getDraftSavedListQuery(session.id));
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

export default useDraftSavedDeletion;
