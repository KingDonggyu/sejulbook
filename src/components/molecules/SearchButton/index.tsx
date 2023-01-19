import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import Button from '@/components/atoms/Button';
import { iconButtonStyle } from '@/styles/common';

const SearchButton = () => (
  <Button
    css={css`
      ${iconButtonStyle};
      width: 50px;
    `}
  >
    <AiOutlineSearch size={25} />
    검색
  </Button>
);

export default SearchButton;
