import { useRouter } from 'next/router';
import type { Book } from 'book';
import Thumbnail from '@/components/atoms/Thumbnail';
import Route from '@/constants/routes';
import { lightTheme as theme } from '@/styles/theme';
import * as s from './style';

interface BookSearchedItemProps {
  book: Book;
  onClickSearchedItem?: (book: Book) => void;
}

const BookSearchedItem = ({
  book,
  onClickSearchedItem,
}: BookSearchedItemProps) => {
  const router = useRouter();

  const handleClickSearchedItem = () => {
    if (onClickSearchedItem) {
      onClickSearchedItem(book);
      return;
    }

    router.push({
      pathname: Route.SEARCH_RESULT_BY_BOOK,
      query: { q: book.title },
    });
  };

  return (
    <s.SearchedItemWrapper onClick={handleClickSearchedItem}>
      <Thumbnail
        src={book.thumbnail}
        alt={`${book.title} 표지 이미지`}
        width={theme.TUMBNAIL.SMALL.W}
        height={theme.TUMBNAIL.SMALL.H}
      />
      <s.TextWrapper>
        <s.BookTitle>{book.title}</s.BookTitle>
        <s.BookAuthors>{book.authors.join(', ')}</s.BookAuthors>
        <s.BookPublisher>{book.publisher}</s.BookPublisher>
      </s.TextWrapper>
    </s.SearchedItemWrapper>
  );
};

export default BookSearchedItem;
