import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useDropdownMenu from '@/hooks/useDropdownMenu';

const MenuStyle = (theme: Theme) => css`
  height: 60vh;
  overflow-y: auto;
  & li {
    cursor: pointer;
    display: flex;
    gap: 10px;
  }
  & li:hover {
    background: ${theme.COLOR.HOVER};
  }
`;

type SearchBarProps = {
  searchedList: ReactNode[];
} & TextFieldProps;

const SearchBar = ({
  searchedList,
  onChange,
  ...textFieldProps
}: SearchBarProps) => {
  const { anchorEl, handleMenuOpen, handleMenuClose } = useDropdownMenu();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    handleMenuOpen(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <TextField
        {...textFieldProps}
        onClick={handleClick}
        onBlur={handleMenuClose}
        onChange={handleChange}
        icon={<AiOutlineSearch size={20} />}
      />
      {Boolean(searchedList.length) && (
        <Menu top={5} anchorEl={anchorEl} css={MenuStyle} full>
          {searchedList.map((searchedItem) => searchedItem)}
        </Menu>
      )}
    </div>
  );
};

export default SearchBar;
