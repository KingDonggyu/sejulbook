import { useEffect } from 'react';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { BookReviewId } from '@/types/features/bookReview';

const useNewbookFetch = (savedBookReviewId?: BookReviewId) => {
  const { getNewbook } = useNewbookContext();
  const { newBook, isLoading } = getNewbook();
  const { bookReview, setBook, setThumbnail } = bookReviewStore();

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

  return { newBook, isLoading };
};

export default useNewbookFetch;
