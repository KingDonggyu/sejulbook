import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import { CategoryResponse } from '@/types/features/category';
import { StyleProps } from '@/types/style';
import * as s from './style';

interface CategoryContainerProps extends StyleProps {
  categories: CategoryResponse[];
  handleClickCategory: (category: CategoryResponse) => void;
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
