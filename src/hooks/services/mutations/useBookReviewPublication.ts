import { toast } from 'react-toastify';
import type { BookReviewToPublish } from 'bookReview';
import useMutation from '@/lib/react-query/hooks/useMutation';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

interface UseBookReviewPublicationOption {
  onSuccess?: (bookReviewId: number) => void;
}

const useBookReviewPublication = ({
  onSuccess,
}: UseBookReviewPublicationOption) => {
  const { mutate } = useMutation<number, BookReviewToPublish>({
    mutationFn: async (userId, bookReview) => {
      const { bookReviewId } = await new BookReviewRepository().publish({
        userId,
        ...bookReview,
      });
      return bookReviewId;
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useBookReviewPublication;
