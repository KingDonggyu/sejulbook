import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import useUserStatus from '@/hooks/useUserStatus';
import { userError } from '@/constants/message';
import { BookReviewId, NewBookReview } from '@/types/features/bookReview';

interface BookReviewPublicationProps {
  bookReview: NewBookReview;
  savedBookReviewId?: BookReviewId;
  onSuccess?: (bookReviewId: BookReviewId) => void;
}

const useBookReviewPublication = ({
  bookReview,
  savedBookReviewId,
  onSuccess,
}: BookReviewPublicationProps) => {
  const { session, isLogin } = useUserStatus();
  const [isPossiblePublish, setIsPossiblePublish] = useState(true);

  const mutationFn = async () => {
    if (!isPossiblePublish) {
      return null;
    }

    if (!isLogin) {
      toast.error(userError.NOT_LOGGED);
      return null;
    }

    setIsPossiblePublish(false);

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
      setIsPossiblePublish(true);
      if (onSuccess && data) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      setIsPossiblePublish(true);
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
    },
  });

  return mutate;
};

export default useBookReviewPublication;
