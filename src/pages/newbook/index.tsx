import { ChangeEvent, useEffect, useState } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SearchTextField from '@/components/molecules/SearchTextField';
import useDebounce from '@/hooks/useDebounce';
import { getBooksByTitle } from '@/services/api/book';

const NewbookPage = () => {
  const [text, setText] = useState('');
  const [searchedList, setSearchedList] = useState<string[]>([]);
  const searchText = useDebounce(text);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (!searchText) {
        setSearchedList([]);
        return;
      }
      const fetchData = await getBooksByTitle(searchText as string);
      setSearchedList(fetchData.documents.map(({ title }) => title));
    })();
  }, [searchText]);

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      <SearchTextField
        value={text}
        searchedList={searchedList}
        onChange={handleChange}
      />
    </>
  );
};

export default NewbookPage;
