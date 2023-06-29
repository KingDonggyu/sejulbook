import { ReactNode } from 'react';
import Link from 'next/link';
import type { GetPublishedBookReviewResponse } from 'bookReview';
import Route from '@/constants/routes';
import formatDate from '@/utils/formatDateToKorean';
import * as s from './style';

export interface BookReviewHeaderProps {
  bookReivew: GetPublishedBookReviewResponse;
  bookInfoButton: ReactNode;
  editDeleteButtonSet: ReactNode;
  likeCommentWidget: ReactNode;
}

const BookReviewHeader = ({
  bookReivew,
  bookInfoButton,
  editDeleteButtonSet,
  likeCommentWidget,
}: BookReviewHeaderProps) => (
  <s.Header>
    <s.HeaderTop>
      <s.Category>{bookReivew.category}</s.Category>
      {editDeleteButtonSet && (
        <s.EditDeleteButtonWrapper>
          {editDeleteButtonSet}
        </s.EditDeleteButtonWrapper>
      )}
    </s.HeaderTop>
    <s.BookName>{bookReivew.bookname}</s.BookName>
    <s.HeaderBottom>
      <s.WritingInfo>
        <s.Writer>
          <Link href={`${Route.LIBRARY}/${bookReivew.userId}`}>
            {bookReivew.writer}
          </Link>
          의 독후감
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
