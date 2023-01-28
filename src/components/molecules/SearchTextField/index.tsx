import { ChangeEvent, MouseEvent } from 'react';
import TextField, { TextFieldProps } from '@/components/atoms/TextField';
import Menu from '@/components/molecules/Menu';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import * as s from './style';

type SearchTextFieldProps = {
  searchedList: string[];
} & TextFieldProps;

const SearchTextField = ({
  searchedList,
  onChange,
  ...textFieldProps
}: SearchTextFieldProps) => {
  const { anchorEl, handleMenuOpen, handleMenuClose } = useDropdownMenu();

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (searchedList.length) {
      handleMenuOpen(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (searchedList.length) {
      handleMenuOpen(e);
      return;
    }

    handleMenuClose();
  };

  return (
    <div>
      <TextField
        {...textFieldProps}
        onClick={handleClick}
        onBlur={handleMenuClose}
        onChange={handleChange}
      />
      <Menu top={5} anchorEl={anchorEl} handleClose={handleMenuClose} full>
        {searchedList.map((name, key) => (
          // 각 항목에 대한 수정, 삭제가 일어나지 않기에 index를 key로 허용한다.
          // eslint-disable-next-line react/no-array-index-key
          <s.SearchedItem key={key}>{name}</s.SearchedItem>
        ))}
      </Menu>
    </div>
  );
};

export default SearchTextField;
