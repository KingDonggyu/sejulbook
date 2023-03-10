import {
  BookReviewId,
  DraftSavedBookReviewURLQuery,
  PublishedBookReviewURLQuery,
} from '@/types/features/bookReview';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useSavedBookReviewId = () => {
  const router = useRouter();
  const [savedBookReviewId, setSavedBookReviewId] = useState<BookReviewId>();

  useEffect(() => {
    const { draft } = router.query as unknown as DraftSavedBookReviewURLQuery;
    const { publish } = router.query as unknown as PublishedBookReviewURLQuery;

    setSavedBookReviewId(draft || publish);
  }, [router.query]);

  return { savedBookReviewId, setSavedBookReviewId };
};

export default useSavedBookReviewId;
