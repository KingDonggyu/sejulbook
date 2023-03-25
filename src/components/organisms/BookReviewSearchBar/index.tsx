import { useCallback, useState } from 'react';
import { TextFieldProps } from '@/components/atoms/TextField';
import SearchBar from '@/components/molecules/SearchBar';
import { SearchedBookReview } from '@/types/features/bookReview';
import { searchBookReviews } from '@/services/api/bookReview';
import BookReviewSearchedItem from './BookReviewSearchedItem';

interface BookReviewSearchBarProps extends TextFieldProps {
  isTitle?: boolean;
}

const BookReviewSearchBar = ({
  isTitle = true,
  ...textFieldProps
}: BookReviewSearchBarProps) => {
  const [searchedList, setSearchedList] = useState<SearchedBookReview[]>([]);

  const handleDebounce = useCallback(
    async (value: string) => {
      if (!value) {
        setSearchedList([]);
        return;
      }
      const searchedBookReviews = await searchBookReviews({
        query: value,
        isTitle,
      });
      setSearchedList(searchedBookReviews);
    },
    [isTitle],
  );

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
