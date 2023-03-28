import { useCallback, useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import { TextFieldProps } from '@/components/atoms/TextField';
import { getBooks } from '@/services/api/book';
import { Book } from '@/types/features/book';
import BookSearchedItem from './BookSearchedItem';

interface BookSearchBarProps extends TextFieldProps {
  initialValue?: string;
  onClickSearchedItem?: (book: Book) => void;
}

const BookSearchBar = ({
  initialValue,
  onClickSearchedItem,
  ...textFieldProps
}: BookSearchBarProps) => {
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
    <SearchBar
      placeholder="제목 또는 저자를 입력해주세요."
      initialValue={initialValue}
      onDebounce={handleDebounce}
      {...textFieldProps}
    >
      {Boolean(searchedList.length) &&
        searchedList.map((book, i) => (
          <BookSearchedItem
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            book={book}
            onClickSearchedItem={onClickSearchedItem}
          />
        ))}
    </SearchBar>
  );
};

export default BookSearchBar;
