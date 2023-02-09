import { useRouter } from 'next/router';
import Thumbnail from '@/components/atoms/Thumbnail';
import { Book } from '@/types/domain/book';
import { useNewbookContext } from '@/contexts/newbookContext';
import Route from '@/constants/routes';
import { lightTheme as theme } from '@/styles/theme';
import * as s from './style';

interface BookSearchedItemProps {
  book: Book;
  handleClickSearchedItem: () => void;
}

const BookSearchedItem = ({
  book,
  handleClickSearchedItem,
}: BookSearchedItemProps) => (
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

const NewbookSearchedItem = ({ book }: { book: Book }) => {
  const router = useRouter();
  const { setNewbook } = useNewbookContext();

  const handleClickSearchedItem = () => {
    setNewbook(book);
    router.push(Route.NEWBOOK_WRITE);
  };

  return (
    <BookSearchedItem
      book={book}
      handleClickSearchedItem={handleClickSearchedItem}
    />
  );
};

BookSearchedItem.Newbook = NewbookSearchedItem;

export default BookSearchedItem;
