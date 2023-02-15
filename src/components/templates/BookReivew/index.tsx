import { ReactNode } from 'react';
import Link from 'next/link';
import { BookReviewPost } from '@/types/domain/bookReview';
import Route from '@/constants/routes';
import formatDateToKorean from '@/utils/formatDateToKorean';
import Button from '@/components/atoms/Button';
import Rating from '@/components/molecules/Rating';
import TagList from '@/components/molecules/TagList';
import * as s from './style';

interface BookReivewProps {
  bookReivew: BookReviewPost;
  sejulViewer: ReactNode;
  contentViewer: ReactNode;
}

const BookReivew = ({
  bookReivew,
  sejulViewer,
  contentViewer,
}: BookReivewProps) => (
  <s.Wrapper>
    <s.Header>
      <s.TitleWrapper>
        <s.Category>{bookReivew.category}</s.Category>
        <s.BookName>{bookReivew.book.title}</s.BookName>
      </s.TitleWrapper>
      <s.HeaderBottom>
        <s.WritingInfo>
          <s.Writer>
            <Link href={`${Route.LIBRARY}/1`}>{bookReivew.writer}</Link>의
            독후감
          </s.Writer>
          <span>·</span>
          <s.DateCreated>
            {formatDateToKorean(bookReivew.createdAt)}
          </s.DateCreated>
        </s.WritingInfo>
        <Button css={s.bookInfoButtonStyle}>책정보</Button>
      </s.HeaderBottom>
    </s.Header>
    <s.Article>
      {sejulViewer}
      {contentViewer}
    </s.Article>
    <s.Bottom>
      <s.RatingWrapper>
        <s.Writer>
          <Link href={`${Route.LIBRARY}/1`}>{bookReivew.writer}</Link>의 평점
        </s.Writer>
        <Rating size={17} gap={3} readonly />
      </s.RatingWrapper>
      <TagList tag={Array.from(bookReivew.tag)} />
    </s.Bottom>
  </s.Wrapper>
);

export default BookReivew;
