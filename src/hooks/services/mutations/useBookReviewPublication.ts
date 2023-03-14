import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';

import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';
import { BookReviewId, NewBookReview } from '@/types/features/bookReview';
import { getBookReviewQuery } from '@/services/queries/bookReview';

interface BookReviewPublicationProps {
  bookReview: NewBookReview;
  savedBookReviewId?: BookReviewId;
  onSuccess?: (bookReviewId: BookReviewId) => void;
  onError?: () => void;
  onFinish?: () => void;
}

const useBookReviewPublication = ({
  bookReview,
  savedBookReviewId,
  onSuccess,
  onError,
  onFinish,
}: BookReviewPublicationProps) => {
  const queryClient = useQueryClient();
  const { session, isLogin } = useUserStatus();

  const mutationFn = async () => {
    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return null;
    }

    const bookReviewId = await publishBookReview({
      userId: session.id,
      bookReviewId: savedBookReviewId,
      bookReview,
    });

    return bookReviewId;
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        getBookReviewQuery(savedBookReviewId).queryKey,
      );
      if (onSuccess && data) {
        onSuccess(data);
      }
      if (onFinish) {
        onFinish();
      }
    },
    onError: (error) => {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
      if (onError) {
        onError();
      }
      if (onFinish) {
        onFinish();
      }
    },
  });

  return mutate;
};

export default useBookReviewPublication;
