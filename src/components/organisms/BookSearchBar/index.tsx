import { ChangeEvent, useCallback, useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import BookSearchedItem from '@/components/organisms/BookSearchedItem';
import { TextFieldProps } from '@/components/atoms/TextField';
import useDebounce from '@/hooks/useDebounce';
import { getBooksByTitle } from '@/services/api/book';
import { Book } from '@/types/domain/book';

const BookSearchBar = ({ ...textFieldProps }: TextFieldProps) => {
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
    const { documents } = await getBooksByTitle(value);
    setSearchedList(documents);
  }, []);

  useDebounce({ value: keyword, onDebounce });

  return (
    <SearchBar onChange={handleChange} {...textFieldProps}>
      {Boolean(searchedList.length) &&
        searchedList.map((book) => (
          <BookSearchedItem.Newbook key={book.isbn} book={book} />
        ))}
    </SearchBar>
  );
};

export default BookSearchBar;
