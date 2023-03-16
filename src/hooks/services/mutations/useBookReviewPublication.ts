import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { publishBookReview } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import useMutation from '@/hooks/useMutation';
import { BookReviewId, NewBookReview } from '@/types/features/bookReview';
import { getBookReviewQuery } from '@/services/queries/bookReview';

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
  const queryClient = useQueryClient();

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
      const { queryKey } = getBookReviewQuery(savedBookReviewId);
      queryClient.invalidateQueries(queryKey);

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
