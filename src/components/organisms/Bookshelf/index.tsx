import { GiPencil } from '@react-icons/all-files/gi/GiPencil';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { ButtonVariant, ColorVariant } from '@/constants';
import Button from '@/components/atoms/Button';
import BookReviewItem from '../BookReivewItem';
import * as s from './style';

const Bookshelf = () => (
  <s.Wrapper>
    <s.Row>
      <Button
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.PRIMARY}
        css={s.wrtieBookReviewButtonStyle}
      >
        <GiPencil size={40} />
        <AiOutlinePlus size={20} />
      </Button>
      <BookReviewItem />
      <BookReviewItem />
    </s.Row>
    <s.Divider />
  </s.Wrapper>
);

export default Bookshelf;
