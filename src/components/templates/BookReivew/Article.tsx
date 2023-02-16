import { ReactNode } from 'react';
import * as s from './style';

export interface BookReviewArticleProps {
  sejulViewer: ReactNode;
  contentViewer: ReactNode;
}

const BookReviewArticle = ({
  sejulViewer,
  contentViewer,
}: BookReviewArticleProps) => (
  <s.Article>
    {sejulViewer}
    {contentViewer}
  </s.Article>
);

export default BookReviewArticle;
