import Link from 'next/link';
import Thumbnail from '@/components/atoms/Thumbnail';
import Route from '@/constants/routes';
import { SearchedBookReview } from '@/types/features/bookReview';
import { lightTheme as theme } from '@/styles/theme';
import * as s from './style';

const BookReviewSearchedItem = ({
  id,
  bookname,
  authors,
  thumbnail,
  writer,
}: SearchedBookReview) => (
  <s.Wrapper>
    <Link href={`${Route.BOOKREVIEW}/${id}`}>
      <Thumbnail
        src={thumbnail}
        alt={`${bookname} 표지 이미지`}
        width={theme.TUMBNAIL.SMALL.W}
        height={theme.TUMBNAIL.SMALL.H}
      />
      <s.TextWrapper>
        <s.BookTitle>
          <span>{bookname}</span> ({authors})
        </s.BookTitle>
        <s.Writer>
          <span>{writer}</span>의 세 줄
        </s.Writer>
      </s.TextWrapper>
    </Link>
  </s.Wrapper>
);

export default BookReviewSearchedItem;
