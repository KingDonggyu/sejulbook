/* eslint-disable react-hooks/rules-of-hooks */
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { Book } from '@/types/features/book';
import { BookReviewId } from '@/types/features/bookReview';
import { useEffect, useState } from 'react';
import useBookReview from './services/queries/useBookReview';
import useTags from './services/queries/useTags';

const useSavedBookReview = (bookReviewId: BookReviewId | null) => {
  if (!bookReviewId) {
    return { isLoading: false };
  }

  const [isLoading, setIsLoading] = useState(true);
  const savedBookReview = useBookReview(bookReviewId);
  const tags = useTags(bookReviewId);
  const { setNewbook, removeNewbook } = useNewbookContext();
  const { setBookReivew, initBookReview } = bookReviewStore();

  useEffect(() => {
    if (savedBookReview) {
      const book: Book = {
        title: savedBookReview.bookname,
        authors: savedBookReview.authors.split(', '),
        publisher: savedBookReview.publisher,
        datetime: savedBookReview.publication,
        thumbnail: savedBookReview.originThumbnail,
      };

      setNewbook(book);

      setBookReivew({
        ...savedBookReview,
        book,
        category: {
          id: savedBookReview.categoryId,
          category: savedBookReview.category,
        },
        rating: Number(savedBookReview.rating),
        tag: new Set(tags),
      });

      setIsLoading(false);
    }

    return () => {
      removeNewbook();
      initBookReview();
    };
  }, [
    initBookReview,
    removeNewbook,
    savedBookReview,
    setBookReivew,
    setNewbook,
    tags,
  ]);

  return { isLoading };
};

export default useSavedBookReview;
