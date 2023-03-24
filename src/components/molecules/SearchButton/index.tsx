import Link from 'next/link';
import { css } from '@emotion/react';
import { SearchIcon } from '@/components/atoms/Icon';
import Route from '@/constants/routes';
import { iconButtonStyle } from '@/styles/common';

const SearchButton = () => (
  <Link
    href={Route.SEARCH}
    css={css`
      display: flex;
      ${iconButtonStyle};
    `}
  >
    검색
    <SearchIcon size={25} />
  </Link>
);

export default SearchButton;
