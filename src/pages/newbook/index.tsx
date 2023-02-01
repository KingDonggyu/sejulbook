import { useState } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import BookInfoBox from '@/components/molecules/BookInfoBox';
import CategoryModal from '@/components/organisms/CategoryModal';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import { Book } from '@/types/domain/book';
import * as s from './style';

const NewbookPage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { openModal } = modalStore();

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
      <CategoryModal />
      <button type="button" onClick={() => openModal(ModalKey.CATEGORY)}>
        카테고리
      </button>
    </s.Wrapper>
  );
};

export default NewbookPage;
