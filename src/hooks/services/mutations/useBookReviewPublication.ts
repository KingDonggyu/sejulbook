import { toast } from 'react-toastify';
import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import useMutation from '@/hooks/useMutation';
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
  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      const bookReviewId = await publishBookReview({
        userId,
        bookReview,
        bookReviewId: savedBookReviewId,
      });

      return bookReviewId;
    },

    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
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

export default useBookReviewPublication;
