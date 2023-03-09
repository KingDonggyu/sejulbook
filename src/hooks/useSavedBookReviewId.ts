import {
  DraftSavedBookReviewURLQuery,
  PublishedBookReviewURLQuery,
} from '@/types/features/bookReview';
import { useRouter } from 'next/router';

const useSavedBookReviewId = () => {
  const router = useRouter();

  const { draft } = router.query as unknown as DraftSavedBookReviewURLQuery;
  const { publish } = router.query as unknown as PublishedBookReviewURLQuery;

  const bookReviewId = draft || publish;

  if (bookReviewId) {
    return bookReviewId;
  }

  return null;
};

export default useSavedBookReviewId;
