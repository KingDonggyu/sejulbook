import DocumentTitle from '@/components/atoms/DocumentTitle';
import TextField from '@/components/atoms/TextField';
import { getBooksByTitle } from '@/services/api/book';
import { useEffect } from 'react';

const NewbookPage = () => {
  useEffect(() => {
    getBooksByTitle('브레이킹');
  }, []);

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      <TextField placeholder="원하는 책을 입력하세요." />
    </>
  );
};

export default NewbookPage;
