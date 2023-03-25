import { useCallback, useState } from 'react';
import { TextFieldProps } from '@/components/atoms/TextField';
import SearchBar from '@/components/molecules/SearchBar';
import { SearchedBookReview } from '@/types/features/bookReview';
import { searchBookReviewsByTitle } from '@/services/api/bookReview';
import BookReviewSearchedItem from './BookReviewSearchedItem';

const BookReviewSearchBar = ({ ...textFieldProps }: TextFieldProps) => {
  const [searchedList, setSearchedList] = useState<SearchedBookReview[]>([]);

  const handleDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const searchedBookReviews = await searchBookReviewsByTitle(value);
    setSearchedList(searchedBookReviews);
  }, []);

  return (
    <SearchBar onDebounce={handleDebounce} {...textFieldProps}>
      {searchedList.map(({ id, bookname, authors, thumbnail, writer }) => (
        <BookReviewSearchedItem
          key={id}
          id={id}
          bookname={bookname}
          authors={authors}
          thumbnail={thumbnail}
          writer={writer}
        />
      ))}
    </SearchBar>
  );
};

export default BookReviewSearchBar;
