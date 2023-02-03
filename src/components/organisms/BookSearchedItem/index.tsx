import Thumbnail from '@/components/atoms/Thumbnail';
import { Book } from '@/types/domain/book';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

interface BookSearchedItemProps extends Book {
  handleClick: (bookInfo: Book) => void;
}

const BookSearchedItem = ({
  title,
  authors,
  thumbnail,
  publisher,
  datetime,
  handleClick,
}: BookSearchedItemProps) => (
  <s.SearchedItemWrapper
    onClick={() =>
      handleClick({ title, authors, thumbnail, publisher, datetime })
    }
  >
    <Thumbnail
      src={thumbnail}
      alt={`${title} 표지 이미지`}
      width={lightTheme.TUMBNAIL.SMALL.W}
      height={lightTheme.TUMBNAIL.SMALL.H}
    />
    <s.TextWrapper>
      <s.BookTitle>{title}</s.BookTitle>
      <s.BookAuthors>{authors.join(', ')}</s.BookAuthors>
      <s.BookPublisher>{publisher}</s.BookPublisher>
    </s.TextWrapper>
  </s.SearchedItemWrapper>
);

export default BookSearchedItem;
