import Button, { ButtonProps } from '@/components/atoms/Button';
import Modal, { ModalProps } from '@/components/molecules/Modal';
import { ButtonVariant, ColorVariant } from '@/constants';
import modalStore from '@/stores/modalStore';
import { CategoryResponse } from '@/types/features/category';
import useCategories from '@/hooks/services/queries/useCategories';
import { useState } from 'react';
import * as s from './style';

type CategoryModalProps = {
  modalKey: string;
  handleClickCategory: (category: CategoryResponse) => void;
};

const CategoryModal = ({
  modalKey,
  handleClickCategory,
  ...modalProps
}: CategoryModalProps & Omit<ModalProps, 'children'>) => {
  const categories = useCategories();

  return (
    <Modal modalKey={modalKey} {...modalProps}>
      <s.Title>카테고리</s.Title>
      <s.Wrapper>
        {categories &&
          categories.map(({ id, category }) => (
            <Button
              key={category}
              variant={ButtonVariant.OUTLINED}
              color={ColorVariant.LINE}
              css={s.categoryItemStyle}
              onClick={() => handleClickCategory({ id, category })}
            >
              {category}
            </Button>
          ))}
      </s.Wrapper>
    </Modal>
  );
};

const CategoryButton = ({
  modalKey,
  handleClickCategory,
  ...buttonProps
}: CategoryModalProps & ButtonProps) => {
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const { openModal, closeModal } = modalStore();

  const handleClick = (selectedCategory: CategoryResponse) => {
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
        {category?.category || '선택'}
      </Button>
      <CategoryModal modalKey={modalKey} handleClickCategory={handleClick} />
    </>
  );
};

CategoryModal.Button = CategoryButton;

export default CategoryModal;
