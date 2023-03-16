import { css } from '@emotion/react';
import Button from '@/components/atoms/Button';
import { SearchIcon } from '@/components/atoms/Icon';
import { iconButtonStyle } from '@/styles/common';

const SearchButton = () => (
  <Button
    css={css`
      ${iconButtonStyle};
    `}
  >
    검색
    <SearchIcon size={25} />
  </Button>
);

export default SearchButton;
