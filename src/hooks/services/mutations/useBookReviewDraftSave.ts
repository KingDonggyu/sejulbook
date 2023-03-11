import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useUserStatus from '@/hooks/useUserStatus';
import { bookReviewSussess, userError } from '@/constants/message';
import { draftSaveBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import { UserId } from '@/types/features/user';
import { BookReviewId, NewBookReview } from '@/types/features/bookReview';
import { getBookReviewQuery } from '@/services/queries/bookReview';

interface BookReviewDraftSaveProps {
  bookReview: NewBookReview;
  savedBookReviewId?: UserId;
  onSuccess?: (bookReviewId: BookReviewId) => void;
  onError?: () => void;
}

const useBookReviewDraftSave = ({
  bookReview,
  savedBookReviewId,
  onSuccess,
  onError,
}: BookReviewDraftSaveProps) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return null;
    }

    const bookReviewId = await draftSaveBookReview({
      userId: session.id,
      bookReviewId: savedBookReviewId,
      bookReview,
    });

    return bookReviewId;
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (bookReviewId) => {
      toast.success(bookReviewSussess.DRAFT_SAVE);

      if (!bookReviewId) {
        return;
      }

      queryClient.invalidateQueries(getBookReviewQuery(bookReviewId).queryKey);

      if (onSuccess) {
        onSuccess(bookReviewId);
      }
    },
    onError: (error) => {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }

      if (onError) {
        onError();
      }
    },
  });

  return mutate;
};

export default useBookReviewDraftSave;
