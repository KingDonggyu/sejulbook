import { useState } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import BookInfoBox from '@/components/organisms/BookInfoBox';
import { Book } from '@/types/domain/book';
import * as s from './style';

const NewbookPage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <s.Wrapper>
      <DocumentTitle title="독후감 쓰기" />
      <s.Title>독후감 쓰기</s.Title>
      <BookSearchBar
        placeholder="책을 선택해주세요."
        handleClickSearchedItem={(bookInfo: Book) => setSelectedBook(bookInfo)}
      />
      {selectedBook && (
        <s.HiddenWrapper>
          <BookInfoBox {...selectedBook} />
        </s.HiddenWrapper>
      )}
    </s.Wrapper>
  );
};

export default NewbookPage;
