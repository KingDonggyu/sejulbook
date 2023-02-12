import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useOpenClose from '@/hooks/useOpenClose';

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
  const { anchorEl, handleOpen, handleClose } = useOpenClose();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    handleOpen(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleOpen(e);
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
          handleClose={handleClose}
        >
          {children}
        </Menu>
      )}
    </div>
  );
};

export default SearchBar;
