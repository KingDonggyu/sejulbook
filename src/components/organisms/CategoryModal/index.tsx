import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import { Category } from '@/types/domain/bookReview';
import * as s from './style';

const categories = [
  '소설',
  '시/에세이',
  '인문',
  '가정/육아',
  '요리',
  '건강',
  '취미/실용/스포츠',
  '경제/경영',
  '자기계발',
  '정치/사회',
  '역사/문화',
  '종교',
  '예술/대중문화',
  '기술/공학',
  '외국어',
  '과학',
  '취업/수험서',
  '여행',
  '컴퓨터/IT',
  '만화',
];

interface CategoryModalProps {
  handleClickCategory: ({ category }: Category) => void;
}

const CategoryModal = ({ handleClickCategory }: CategoryModalProps) => (
  <Modal modalKey={ModalKey.CATEGORY}>
    <s.Title>카테고리</s.Title>
    <s.Wrapper>
      {categories.map((category) => (
        <Button
          key={category}
          variant={ButtonVariant.OUTLINED}
          color={ColorVariant.LINE}
          css={s.buttonStyle}
          onClick={() => handleClickCategory({ category })}
        >
          {category}
        </Button>
      ))}
    </s.Wrapper>
  </Modal>
);

export default CategoryModal;
