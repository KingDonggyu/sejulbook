import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { css, Theme } from '@emotion/react';
import { SearchIcon } from '@/components/atoms/Icon';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useOpenClose from '@/hooks/useOpenClose';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';

const menuStyle = (theme: Theme) => css`
  max-height: 60vh;
  overflow-y: auto;

  ul {
    padding: 0;
    font-family: ${theme.FONT_FAMILY.nanumMyeongjo};
  }

  li {
    cursor: pointer;
    display: flex;
    gap: 10px;
    padding: 15px;
  }

  li:hover {
    background: ${theme.COLOR.HOVER};
  }
`;

interface SearchBarProps extends TextFieldProps {
  initialValue?: string;
  children: ReactNode;
  onDebounce?: (value: string) => void;
}

const SearchBar = ({
  children,
  onChange,
  initialValue = '',
  onDebounce = () => {},
  ...textFieldProps
}: SearchBarProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialValue);
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

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleClose);

    return () => {
      router.events.off('routeChangeStart', handleClose);
    };
  }, [handleClose, router.events]);

  return (
    <div>
      <TextField
        value={keyword}
        onClick={handleClick}
        onChange={handleChange}
        icon={<SearchIcon size={25} />}
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
