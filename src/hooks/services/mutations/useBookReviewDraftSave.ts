import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useMutation from '@/hooks/useMutation';
import { bookReviewSussess } from '@/constants/message';
import { draftSaveBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { UserId } from '@/types/features/user';
import { BookReviewId, NewBookReview } from '@/types/features/bookReview';
import { getBookReviewQuery } from '@/services/queries/bookReview';

interface BookReviewDraftSaveProps {
  bookReview: NewBookReview;
  savedBookReviewId?: UserId;
  onSuccess?: (bookReviewId: BookReviewId) => void;
}

const useBookReviewDraftSave = ({
  bookReview,
  savedBookReviewId,
  onSuccess,
}: BookReviewDraftSaveProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      const bookReviewId = await draftSaveBookReview({
        userId,
        bookReview,
        bookReviewId: savedBookReviewId,
      });

      return bookReviewId;
    },

    onSuccess: (bookReviewId) => {
      const { queryKey } = getBookReviewQuery(bookReviewId);

      queryClient.invalidateQueries(queryKey);
      toast.success(bookReviewSussess.DRAFT_SAVE);

      if (onSuccess) {
        onSuccess(bookReviewId);
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

export default useBookReviewDraftSave;
