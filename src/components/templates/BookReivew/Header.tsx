import { ReactNode } from 'react';
import Link from 'next/link';
import { BookReviewPost } from '@/types/features/bookReview';
import Route from '@/constants/routes';
import formatDate from '@/utils/formatDateToKorean';
import * as s from './style';

export interface BookReviewHeaderProps {
  bookReivew: BookReviewPost;
  bookInfoButton: ReactNode;
  likeCommentWidget: ReactNode;
}

const BookReviewHeader = ({
  bookReivew,
  bookInfoButton,
  likeCommentWidget,
}: BookReviewHeaderProps) => (
  <s.Header>
    <s.TitleWrapper>
      <s.Category>{bookReivew.category}</s.Category>
      <s.BookName>{bookReivew.book.title}</s.BookName>
    </s.TitleWrapper>
    <s.HeaderBottom>
      <s.WritingInfo>
        <s.Writer>
          <Link href={`${Route.LIBRARY}/1`}>{bookReivew.writer}</Link>의 독후감
        </s.Writer>
        <span>·</span>
        <s.DateCreated>{formatDate(bookReivew.createdAt)}</s.DateCreated>
      </s.WritingInfo>
      {bookInfoButton}
    </s.HeaderBottom>
    {likeCommentWidget}
  </s.Header>
);

export default BookReviewHeader;
