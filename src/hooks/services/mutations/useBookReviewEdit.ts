import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import type { UpdateBookReviewRequest } from 'bookReview';
import useMutation from '@/lib/react-query/hooks/useMutation';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import { bookReviewSuccess } from '@/constants/message';
import { getBookReviewQuery } from '../queries/useBookReview';

interface PublishedRequest {
  bookReview: UpdateBookReviewRequest;
  isPublished: true;
}

interface DraftSavedRequest {
  bookReview: UpdateBookReviewRequest;
  isPublished: false;
}

type Request = PublishedRequest | DraftSavedRequest;

interface UseBookReviewEditOption {
  onSuccess?: () => void;
}

const useBookReviewEdit = ({ onSuccess }: UseBookReviewEditOption = {}) => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (userId, { isPublished, bookReview }) => {
      queryKey = getBookReviewQuery(bookReview.id).queryKey;
      if (isPublished) {
        await new BookReviewRepository().updatePublished({
          id: bookReview.id,
          userId,
          bookReview,
        });
        return;
      }
      await new BookReviewRepository().updateDraftSaved({
        id: bookReview.id,
        userId,
        bookReview,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      toast.success(bookReviewSuccess.DRAFT_SAVE);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useBookReviewEdit;
