import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { css, Theme } from '@emotion/react';
import { SearchIcon } from '@/components/atoms/Icon';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useOpenClose from '@/hooks/useOpenClose';
import useDebounce from '@/hooks/useDebounce';

const menuStyle = (theme: Theme) => css`
  max-height: 60vh;
  overflow-y: auto;

  ul {
    padding: 0;
  }

  li {
    cursor: pointer;
    display: flex;
    gap: 10px;
    padding: 20px;
  }

  li:hover {
    background: ${theme.COLOR.HOVER};
  }
`;

interface SearchBarProps extends TextFieldProps {
  children: ReactNode;
  onDebounce?: (value: string) => void;
}

const SearchBar = ({
  children,
  onChange,
  onDebounce = () => {},
  ...textFieldProps
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const { anchorEl, handleOpen, handleClose } = useOpenClose();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    handleOpen(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleOpen(e);
    setKeyword(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleDebounce = useCallback(onDebounce, [onDebounce]);

  useDebounce({ value: keyword, onDebounce: handleDebounce });

  return (
    <div>
      <TextField
        onClick={handleClick}
        onChange={handleChange}
        icon={<SearchIcon size={20} />}
        {...textFieldProps}
      />
      <Menu
        full
        top={5}
        anchorEl={anchorEl}
        css={menuStyle}
        handleClose={handleClose}
      >
        {children}
      </Menu>
    </div>
  );
};

export default SearchBar;
