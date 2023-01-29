import { ChangeEvent, useCallback, useState } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SearchBar from '@/components/molecules/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import { getBooksByTitle } from '@/services/api/book';

const NewbookPage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchedList, setSearchedList] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const fetchData = await getBooksByTitle(value);
    setSearchedList(fetchData.documents.map(({ title }) => title));
  }, []);

  useDebounce({ value: keyword, onDebounce });

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      <SearchBar searchedList={searchedList} onChange={handleChange} />
    </>
  );
};

export default NewbookPage;
