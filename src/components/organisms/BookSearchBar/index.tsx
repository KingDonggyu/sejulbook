import { useCallback, useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import { TextFieldProps } from '@/components/atoms/TextField';
import { getBooks } from '@/services/api/book';
import { Book } from '@/types/features/book';
import BookSearchedItem from './BookSearchedItem';

const BookSearchBar = ({ ...textFieldProps }: TextFieldProps) => {
  const [searchedList, setSearchedList] = useState<Book[]>([]);

  const handleDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const { documents } = await getBooks(value);
    setSearchedList(documents);
  }, []);

  return (
    <SearchBar onDebounce={handleDebounce} {...textFieldProps}>
      {Boolean(searchedList.length) &&
        searchedList.map((book, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <BookSearchedItem key={i} book={book} />
        ))}
    </SearchBar>
  );
};

export default BookSearchBar;
