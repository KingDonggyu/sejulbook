import { useEffect, useMemo, useState } from 'react';
import type { Book } from 'book';
import type { Id, NewBookReview } from 'bookReview';
import NewBookRepository from '@/repository/localStorage/NewBookRepository';
import { getPublishedBookReviewToBook } from '@/utils/bookReviewDataConverter';
import useBookReview from './services/queries/useBookReview';
import useTags from './services/queries/useTags';

interface FetchInfo {
  newBookReview: NewBookReview | null;
  isLoading: boolean;
}

const useNewBookReview = (bookReviewId?: Id) => {
  const { bookReview: fetchedBookReview } = useBookReview(bookReviewId);
  const { tags } = useTags(bookReviewId);

  const [fetchInfo, setFetchInfo] = useState<FetchInfo>({
    newBookReview: null,
    isLoading: true,
  });

  const newBookRepository = useMemo(() => new NewBookRepository(), []);

  useEffect(() => {
    if (!fetchedBookReview || !tags) {
      setFetchInfo({ newBookReview: null, isLoading: false });
      return;
    }

    const savedBook: Book = getPublishedBookReviewToBook(fetchedBookReview);
    newBookRepository.set(savedBook);

    setFetchInfo({
      newBookReview: {
        ...fetchedBookReview,
        book: savedBook,
        category: {
          id: fetchedBookReview.categorId,
          category: fetchedBookReview.category,
        },
        tags: tags.map(({ tag }) => tag),
      },
      isLoading: false,
    });
  }, [fetchedBookReview, newBookRepository, tags]);

  return fetchInfo;
};

export default useNewBookReview;
