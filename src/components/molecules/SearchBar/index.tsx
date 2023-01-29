import { ChangeEvent, MouseEvent } from 'react';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import * as s from './style';

type SearchBarProps = {
  searchedList: string[];
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
      />
      {Boolean(searchedList.length) && (
        <Menu top={5} anchorEl={anchorEl} full>
          {searchedList.map((name, key) => (
            // 각 항목에 대한 수정, 삭제가 일어나지 않기에 index를 key로 허용한다.
            // eslint-disable-next-line react/no-array-index-key
            <s.SearchedItem key={key}>{name}</s.SearchedItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default SearchBar;
