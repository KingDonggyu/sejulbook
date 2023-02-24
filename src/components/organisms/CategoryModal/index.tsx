import Button, { ButtonProps } from '@/components/atoms/Button';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import modalStore from '@/stores/modalStore';
import { Category } from '@/types/features/bookReview';
import { useState } from 'react';
import * as s from './style';

const categories: Category[] = [
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

type CategoryModalProps = {
  modalKey: string;
  handleClickCategory: (category: Category) => void;
};

const CategoryModal = ({
  modalKey,
  handleClickCategory,
  ...modalProps
}: CategoryModalProps & Omit<ModalProps, 'children'>) => (
  <Modal modalKey={modalKey} {...modalProps}>
    <s.Title>카테고리</s.Title>
    <s.Wrapper>
      {categories.map((category) => (
        <Button
          key={category}
          variant={ButtonVariant.OUTLINED}
          color={ColorVariant.LINE}
          css={s.categoryItemStyle}
          onClick={() => handleClickCategory(category)}
        >
          {category}
        </Button>
      ))}
    </s.Wrapper>
  </Modal>
);

const CategoryButton = ({
  modalKey,
  handleClickCategory,
  ...buttonProps
}: CategoryModalProps & ButtonProps) => {
  const [category, setCategory] = useState<Category | null>(null);
  const { openModal, closeModal } = modalStore();

  const handleClick = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    handleClickCategory(selectedCategory);
    closeModal(modalKey);
  };

  return (
    <>
      <Button
        color={category ? ColorVariant.PRIMARY : ColorVariant.SECONDARY}
        css={s.categoryButtonStyle}
        onClick={() => openModal(modalKey)}
        {...buttonProps}
      >
        {category || '선택'}
      </Button>
      <CategoryModal modalKey={modalKey} handleClickCategory={handleClick} />
    </>
  );
};

CategoryModal.Button = CategoryButton;

export default CategoryModal;
