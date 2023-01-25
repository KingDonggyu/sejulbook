import BookReviewItem from '../BookReivewItem';
import * as s from './style';

const Bookshelf = () => (
  <s.Wrapper>
    <s.Row>
      <BookReviewItem />
      <BookReviewItem />
    </s.Row>
    <s.Divider />
  </s.Wrapper>
);

export default Bookshelf;
