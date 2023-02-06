import { useState } from 'react';
import styled from '@emotion/styled';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import { Book } from '@/types/domain/book';

const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

const NewbookSearchPage = () => {
  const [book, setBook] = useState<Book | null>(null);

  return (
    <Wrapper>
      <DocumentTitle title="독후감 쓰기" />
      <BookSearchBar
        placeholder="책을 선택해주세요."
        handleClickSearchedItem={(selectedBook: Book) => setBook(selectedBook)}
      />
    </Wrapper>
  );
};

export default NewbookSearchPage;
