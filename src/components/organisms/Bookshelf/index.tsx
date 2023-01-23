import { GiPencil } from '@react-icons/all-files/gi/GiPencil';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { ButtonVariant, ColorVariant } from '@/constants';
import Button from '@/components/atoms/Button';
import * as s from './style';

const Bookshelf = () => (
  <s.Wrapper>
    <Button
      variant={ButtonVariant.OUTLINED}
      color={ColorVariant.SECONDARY}
      css={s.wrtieBookReviewButtonStyle}
    >
      <GiPencil size={40} />
      <AiOutlinePlus size={20} />
    </Button>
  </s.Wrapper>
);

export default Bookshelf;
