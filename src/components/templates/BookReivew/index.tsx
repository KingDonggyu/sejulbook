import BookReviewHeader, { BookReviewHeaderProps } from './Header';
import BookReviewArticle, { BookReviewArticleProps } from './Article';
import BookReviewBottom, { BookReviewBottomProps } from './Bottom';
import * as s from './style';

type BookReivewProps = BookReviewHeaderProps &
  BookReviewArticleProps &
  BookReviewBottomProps;

const BookReivew = ({
  bookReivew,
  bookInfoButton,
  likeCommentWidget,
  sejulViewer,
  contentViewer,
  ratingViewer,
  tagList,
  comment,
}: BookReivewProps) => (
  <s.Wrapper>
    <BookReviewHeader
      bookReivew={bookReivew}
      bookInfoButton={bookInfoButton}
      likeCommentWidget={likeCommentWidget}
    />
    <BookReviewArticle
      sejulViewer={sejulViewer}
      contentViewer={contentViewer}
    />
    <BookReviewBottom
      bookReivew={bookReivew}
      ratingViewer={ratingViewer}
      tagList={tagList}
      comment={comment}
    />
  </s.Wrapper>
);

export default BookReivew;
