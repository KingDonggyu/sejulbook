import { ChangeEvent, useCallback, useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import BookSearchedItem from '@/components/organisms/BookSearchedItem';
import { TextFieldProps } from '@/components/atoms/TextField';
import useDebounce from '@/hooks/useDebounce';
import { getBooksByTitle } from '@/services/api/book';
import { Book } from '@/types/domain/book';

interface BookSearchBarProps extends TextFieldProps {
  handleClickSearchedItem: (bookInfo: Book) => void;
}

const BookSearchBar = ({
  handleClickSearchedItem,
  ...textFieldProps
}: BookSearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const [searchedList, setSearchedList] = useState<Book[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const { documents } = await getBooksByTitle({ title: value });
    setSearchedList(documents);
  }, []);

  useDebounce({ value: keyword, onDebounce });

  return (
    <SearchBar onChange={handleChange} {...textFieldProps}>
      {Boolean(searchedList.length) &&
        searchedList.map((bookInfo, i) => (
          <BookSearchedItem
            // 각 항목에 대한 수정, 삭제가 일어나지 않기에 index를 key로 허용한다.
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            handleClick={handleClickSearchedItem}
            {...bookInfo}
          />
        ))}
    </SearchBar>
  );
};

export default BookSearchBar;
