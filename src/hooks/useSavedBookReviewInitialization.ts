import { useEffect, useState } from 'react';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { Book } from '@/types/features/book';
import { BookReviewId } from '@/types/features/bookReview';
import useBookReview from './services/queries/useBookReview';
import useTags from './services/queries/useTags';

const useSavedBookReviewInitialization = (
  bookReviewId: BookReviewId | undefined,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const savedBookReview = useBookReview(bookReviewId);
  const tags = useTags(bookReviewId);

  const { setNewbook } = useNewbookContext();
  const { setBookReivew, initBookReview } = bookReviewStore();

  useEffect(() => {
    if (savedBookReview) {
      const savedBook: Book = {
        title: savedBookReview.bookname,
        authors: savedBookReview.authors.split(', '),
        publisher: savedBookReview.publisher,
        datetime: savedBookReview.publication,
        thumbnail: savedBookReview.originThumbnail,
      };

      setNewbook(savedBook);

      setBookReivew({
        ...savedBookReview,
        book: savedBook,
        category: {
          id: savedBookReview.categoryId,
          category: savedBookReview.category,
        },
        rating: Number(savedBookReview.rating),
        tag: new Set(tags),
        thumbnail: undefined,
      });
    }

    setIsLoading(false);

    return () => {
      initBookReview();
    };
  }, [
    bookReviewId,
    initBookReview,
    savedBookReview,
    setBookReivew,
    setNewbook,
    tags,
  ]);

  return { isLoading };
};

export default useSavedBookReviewInitialization;
