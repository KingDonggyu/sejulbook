import { ReactNode } from 'react';
import Link from 'next/link';
import { BookReviewResponse } from '@/types/features/bookReview';
import Route from '@/constants/routes';
import * as s from './style';

export interface BookReviewBottomProps {
  bookReivew: BookReviewResponse;
  ratingViewer: ReactNode;
  tagList: ReactNode;
  comment: ReactNode;
}

const BookReviewBottom = ({
  bookReivew,
  ratingViewer,
  tagList,
  comment,
}: BookReviewBottomProps) => (
  <s.Bottom>
    <s.RatingWrapper>
      <s.Writer>
        <Link href={`${Route.LIBRARY}/${bookReivew.id}`}>
          {bookReivew.writer}
        </Link>
        의 평점
      </s.Writer>
      {ratingViewer}
    </s.RatingWrapper>
    {tagList}
    {comment}
  </s.Bottom>
);

export default BookReviewBottom;
