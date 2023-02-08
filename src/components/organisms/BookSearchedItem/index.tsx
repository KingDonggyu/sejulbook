import Thumbnail from '@/components/atoms/Thumbnail';
import { Book } from '@/types/domain/book';
import { useNewbookContext } from '@/contexts/newbookContext';
import { lightTheme } from '@/styles/theme';
import * as s from './style';

const BookSearchedItem = ({
  title,
  authors,
  thumbnail,
  publisher,
  datetime,
}: Book) => {
  const { handleClickSearchedItem } = useNewbookContext();

  return (
    <s.SearchedItemWrapper
      onClick={() =>
        handleClickSearchedItem({
          title,
          authors,
          thumbnail,
          publisher,
          datetime,
        })
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
};

export default BookSearchedItem;
