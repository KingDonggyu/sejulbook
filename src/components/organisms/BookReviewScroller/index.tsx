import CardScoller from '@/components/molecules/CardScroller';
import type { GetHomeBookReviewResponse } from 'bookReview';
import SejulThumbnail from '../SejulThumbnail';
import * as s from './style';

interface BookReviewScrollerProps {
  bookReviewList?: GetHomeBookReviewResponse[];
}

const BookReviewScroller = ({ bookReviewList }: BookReviewScrollerProps) => {
  const thumbnailSize = { width: 300, height: 400 };

  if (!bookReviewList) {
    return (
      <CardScoller hideButton css={s.bookReviewListStyle}>
        {Array.from({ length: 10 }, (_, i) => (
          <s.ThumbnailSkeleton key={i} {...thumbnailSize} />
        ))}
      </CardScoller>
    );
  }

  if (!bookReviewList.length) {
    return (
      <s.AltWrapper>
        <s.BookReviewListAltText>
          최근 좋아요를 받은 독후감이 없습니다.
        </s.BookReviewListAltText>
      </s.AltWrapper>
    );
  }

  return (
    <CardScoller css={s.bookReviewListStyle}>
      {bookReviewList.map(({ id, bookname, sejul, thumbnail, writer }) => (
        <SejulThumbnail
          key={id}
          bookReviewId={id}
          sejul={sejul}
          src={thumbnail}
          alt={`${bookname} 책 표지 이미지`}
          width={thumbnailSize.width}
          height={thumbnailSize.height}
          isGrayscale
          isLargeSejul
        >
          <s.ContentWrapper>
            <s.Content>
              <s.Writer>{writer}의 세 줄</s.Writer>
              <s.BookName>&apos;{bookname}&apos;</s.BookName>
            </s.Content>
          </s.ContentWrapper>
        </SejulThumbnail>
      ))}
    </CardScoller>
  );
};

export default BookReviewScroller;
