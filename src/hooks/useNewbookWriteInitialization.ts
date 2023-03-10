import { useEffect } from 'react';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { BookReviewId } from '@/types/features/bookReview';
import useLayoutVisibility from './useLayoutVisibility';
import useSavedBookReviewInitialization from './useSavedBookReviewInitialization';

const useNewbookWriteInitialization = (savedBookReviewId?: BookReviewId) => {
  const { getNewbook } = useNewbookContext();
  const { newBook, isLoading: isNewBookLoading } = getNewbook();

  const { bookReview, setBook, setThumbnail } = bookReviewStore();

  const { isLoading } = useSavedBookReviewInitialization(savedBookReviewId);

  useEffect(() => {
    if (savedBookReviewId) {
      return;
    }

    if (newBook && !bookReview.book.title) {
      setBook(newBook);
      setThumbnail(newBook.thumbnail);
    }
  }, [
    bookReview.book.title,
    newBook,
    savedBookReviewId,
    setBook,
    setThumbnail,
  ]);

  useLayoutVisibility(Boolean(bookReview.book.title));

  return { bookReview, isLoading: isLoading || isNewBookLoading };
};

export default useNewbookWriteInitialization;
