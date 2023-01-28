import DocumentTitle from '@/components/atoms/DocumentTitle';
import SearchTextField from '@/components/molecules/SearchTextField';
import { ChangeEvent, useState } from 'react';

const NewbookPage = () => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      <SearchTextField
        value={text}
        searchedList={['가나다', '가나다', '가나다']}
        onChange={handleChange}
      />
    </>
  );
};

export default NewbookPage;
