import type { StyleProps } from '@emotion/react';
import type { GetCategoryResponse } from 'category';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import * as s from './style';

interface CategoryContainerProps extends StyleProps {
  categories: GetCategoryResponse[];
  handleClickCategory: (category: GetCategoryResponse) => void;
}

const CategoryContainer = ({
  categories,
  handleClickCategory,
  ...styleProps
}: CategoryContainerProps) => (
  <s.Wrapper {...styleProps}>
    {categories.map(({ id, category }) => (
      <Button
        key={category}
        radius={0}
        variant={ButtonVariant.OUTLINED}
        color={ColorVariant.LINE}
        css={s.categoryItemStyle}
        onClick={() => handleClickCategory({ id, category })}
      >
        {category}
      </Button>
    ))}
  </s.Wrapper>
);

export default CategoryContainer;
