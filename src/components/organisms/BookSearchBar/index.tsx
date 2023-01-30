import { ChangeEvent, ReactNode, useCallback, useState } from 'react';
import Image from 'next/image';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import SearchBar from '@/components/molecules/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import { getBooksByTitle } from '@/services/api/book';
import { BookSearchedItem } from '@/types/domain/book';
import { searchedItemThumbnailSize } from '@/styles/common';
import * as s from './style';

const SearchedItem = ({
  title,
  authors,
  thumbnail,
  publisher,
}: BookSearchedItem) => (
  <s.SearchedItemWrapper>
    {thumbnail ? (
      <Image
        src={thumbnail}
        alt={`${title} 표지 이미지`}
        width={searchedItemThumbnailSize.width}
        height={searchedItemThumbnailSize.height}
      />
    ) : (
      <s.AltTumbnail>
        <AiOutlineQuestionCircle size={25} />
      </s.AltTumbnail>
    )}
    <s.TextWrapper>
      <s.BookTitle>{title}</s.BookTitle>
      <s.BookAuthors>{authors.join(', ')}</s.BookAuthors>
      <s.BookPublisher>{publisher}</s.BookPublisher>
    </s.TextWrapper>
  </s.SearchedItemWrapper>
);

const BookSearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [searchedList, setSearchedList] = useState<ReactNode[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const { documents } = await getBooksByTitle({ title: value });
    setSearchedList(
      // 각 항목에 대한 수정, 삭제가 일어나지 않기에 index를 key로 허용한다.
      // eslint-disable-next-line react/no-array-index-key
      documents.map((bookProps, i) => <SearchedItem key={i} {...bookProps} />),
    );
  }, []);

  useDebounce({ value: keyword, onDebounce });

  return <SearchBar searchedList={searchedList} onChange={handleChange} />;
};

export default BookSearchBar;
