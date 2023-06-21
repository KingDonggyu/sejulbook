import { toast } from 'react-toastify';
import { QueryKey, useQueryClient } from '@tanstack/react-query';
import useMutation from '@/lib/react-query/useMutation';
import BookReviewRepository from '@/repository/api/BookReviewRepository';
import { getBookReviewQuery } from '../queries/useBookReview';

interface PublishedRequest
  extends Omit<
    Parameters<BookReviewRepository['updatePublished']>[0],
    'userId'
  > {
  isPublished: true;
}

interface DraftSavedRequest
  extends Omit<
    Parameters<BookReviewRepository['updateDraftSaved']>[0],
    'userId'
  > {
  isPublished: false;
}

type Request = PublishedRequest | DraftSavedRequest;

const useBookReviewEdit = () => {
  let queryKey: QueryKey;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Request>({
    mutationFn: async (userId, { isPublished, id, bookReview }) => {
      queryKey = getBookReviewQuery(id).queryKey;
      if (isPublished) {
        await new BookReviewRepository().updatePublished({
          id,
          userId,
          bookReview,
        });
        return;
      }
      await new BookReviewRepository().updateDraftSaved({
        id,
        userId,
        bookReview,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export default useBookReviewEdit;
