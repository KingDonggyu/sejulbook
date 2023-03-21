import CardScoller from '@/components/molecules/CardScroller';
import { ExtendedBookReviewSummary } from '@/types/features/bookReview';
import SejulThumbnail from '../SejulThumbnail';
import * as s from './style';

interface BookReviewScrollerProps {
  bookReviewList: ExtendedBookReviewSummary[];
}

const BookReviewScroller = ({ bookReviewList }: BookReviewScrollerProps) => (
  <CardScoller css={s.bookReviewListStyle}>
    {bookReviewList.map(({ id, bookname, sejul, thumbnail, writer }) => (
      <SejulThumbnail
        key={id}
        bookReviewId={id}
        sejul={sejul}
        src={thumbnail}
        alt={`${bookname} 책 표지 이미지`}
        defaultFilter="brightness(0.5)"
        isHiddenChildren
        width={300}
        height={400}
      >
        <s.Content>
          <s.Test>
            <s.Writer>{writer}의 세 줄</s.Writer>
            <s.BookName>&apos;{bookname}&apos;</s.BookName>
          </s.Test>
        </s.Content>
      </SejulThumbnail>
    ))}
  </CardScoller>
);

export default BookReviewScroller;
