import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/hooks/useMutation';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import { bookReviewSuccess } from '@/constants/message';
import { getBookReviewQuery } from '../queries/useBookReview';

type Request = Omit<Parameters<BookReviewRepository['draftSave']>[0], 'userId'>;

interface UseBookReviewDraftSaveOption {
  onSuccess?: (bookReviewId: number) => void;
}

const useBookReviewDraftSave = ({
  onSuccess,
}: UseBookReviewDraftSaveOption) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<number, Request>({
    mutationFn: async (userId, bookReview) => {
      const { bookReviewId } = await new BookReviewRepository().draftSave({
        userId,
        ...bookReview,
      });
      return bookReviewId;
    },
    onSuccess: (bookReviewId) => {
      queryClient.invalidateQueries(getBookReviewQuery(bookReviewId).queryKey);
      toast.success(bookReviewSuccess.DRAFT_SAVE);
      if (onSuccess) {
        onSuccess(bookReviewId);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useBookReviewDraftSave;
