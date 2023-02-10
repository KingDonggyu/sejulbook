import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useDropdownMenu from '@/hooks/useDropdownMenu';

const MenuStyle = (theme: Theme) => css`
  max-height: 60vh;
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
  children: ReactNode;
} & TextFieldProps;

const SearchBar = ({
  children,
  onChange,
  ...textFieldProps
}: SearchBarProps) => {
  const { anchorEl, handleMenuOpen, handleMenuClose } = useDropdownMenu();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    handleMenuOpen(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMenuOpen(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <TextField
        {...textFieldProps}
        onClick={handleClick}
        onChange={handleChange}
        icon={<AiOutlineSearch size={20} />}
      />
      {Boolean(children) && (
        <Menu
          full
          top={5}
          anchorEl={anchorEl}
          css={MenuStyle}
          handleClose={handleMenuClose}
        >
          {children}
        </Menu>
      )}
    </div>
  );
};

export default SearchBar;
