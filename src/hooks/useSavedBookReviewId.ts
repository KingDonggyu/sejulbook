import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Id } from 'bookReview';

const useSavedBookReviewId = () => {
  const router = useRouter();
  const [savedBookReviewId, setSavedBookReviewId] = useState<Id | null>(null);

  useEffect(() => {
    const draft = Number(router.query.draft);
    const publish = Number(router.query.publish);

    setSavedBookReviewId(draft || publish || null);
  }, [router.query]);

  return { savedBookReviewId, setSavedBookReviewId };
};

export default useSavedBookReviewId;
