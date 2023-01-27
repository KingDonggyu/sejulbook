import Link from 'next/link';
import { GiPencil } from '@react-icons/all-files/gi/GiPencil';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import Route from '@/constants/routes';
import BookReviewItem from '../BookReivewItem';
import * as s from './style';

const Bookshelf = () => (
  <s.Wrapper>
    <s.Row>
      <Link href={Route.NEWBOOK} css={s.wrtieBookReviewButtonStyle}>
        <GiPencil size={40} />
        <AiOutlinePlus size={20} />
      </Link>
      <BookReviewItem />
      <BookReviewItem />
    </s.Row>
    <s.Divider />
    <s.Row>
      <BookReviewItem />
      <BookReviewItem />
    </s.Row>
    <s.Divider />
  </s.Wrapper>
);

export default Bookshelf;
