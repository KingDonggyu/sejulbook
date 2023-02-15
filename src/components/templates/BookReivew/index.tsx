import { ReactNode } from 'react';
import Link from 'next/link';
import { BookReviewPost } from '@/types/domain/bookReview';
import Route from '@/constants/routes';
import formatDateToKorean from '@/utils/formatDateToKorean';
import * as s from './style';

interface BookReivewProps {
  bookReivew: BookReviewPost;
  sejulViewer: ReactNode;
  contentViewer: ReactNode;
  bookInfoButton: ReactNode;
  ratingViewer: ReactNode;
  tagList: ReactNode;
}

const BookReviewHeader = ({
  bookReivew,
  bookInfoButton,
}: {
  bookReivew: BookReviewPost;
  bookInfoButton: ReactNode;
}) => (
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
        <s.DateCreated>
          {formatDateToKorean(bookReivew.createdAt)}
        </s.DateCreated>
      </s.WritingInfo>
      {bookInfoButton}
    </s.HeaderBottom>
  </s.Header>
);

const BookReviewArticle = ({
  sejulViewer,
  contentViewer,
}: {
  sejulViewer: ReactNode;
  contentViewer: ReactNode;
}) => (
  <s.Article>
    {sejulViewer}
    {contentViewer}
  </s.Article>
);

const BookReviewBottom = ({
  bookReivew,
  ratingViewer,
  tagList,
}: {
  bookReivew: BookReviewPost;
  ratingViewer: ReactNode;
  tagList: ReactNode;
}) => (
  <s.Bottom>
    <s.RatingWrapper>
      <s.Writer>
        <Link href={`${Route.LIBRARY}/1`}>{bookReivew.writer}</Link>의 평점
      </s.Writer>
      {ratingViewer}
    </s.RatingWrapper>
    {tagList}
  </s.Bottom>
);

const BookReivew = ({
  bookReivew,
  bookInfoButton,
  sejulViewer,
  contentViewer,
  ratingViewer,
  tagList,
}: BookReivewProps) => (
  <s.Wrapper>
    <BookReviewHeader bookReivew={bookReivew} bookInfoButton={bookInfoButton} />
    <BookReviewArticle
      sejulViewer={sejulViewer}
      contentViewer={contentViewer}
    />
    <BookReviewBottom
      bookReivew={bookReivew}
      ratingViewer={ratingViewer}
      tagList={tagList}
    />
  </s.Wrapper>
);

export default BookReivew;
