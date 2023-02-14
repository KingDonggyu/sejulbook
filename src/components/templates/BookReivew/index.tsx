import { ReactNode } from 'react';
import * as s from './style';

interface BookReivewProps {
  sejul: ReactNode;
  content: ReactNode;
}

const BookReivew = ({ sejul, content }: BookReivewProps) => (
  <s.Wrapper>
    {sejul}
    {content}
  </s.Wrapper>
);

export default BookReivew;
