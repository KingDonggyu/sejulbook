import { useReducer } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Button from '@/components/atoms/Button';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import BookInfoBox from '@/components/molecules/BookInfoBox';
import CategoryModal from '@/components/organisms/CategoryModal';
import { ButtonVariant, ColorVariant } from '@/constants';
import { ModalKey } from '@/constants/keys';
import modalStore from '@/stores/modalStore';
import { Book } from '@/types/domain/book';
import { BookReview, Category } from '@/types/domain/bookReview';
import * as s from './style';

const initialNewbook: BookReview = {
  title: '',
  authors: [],
  thumbnail: '',
  publisher: '',
  datetime: '',
  category: '',
};

const newbookReducer = (
  prev: BookReview,
  next: Partial<BookReview>,
): BookReview => ({
  ...prev,
  ...next,
});

const NewbookPage = () => {
  const [newbook, updateNewbook] = useReducer(newbookReducer, initialNewbook);
  const { openModal, closeModal } = modalStore();
  const isSelectBook = Boolean(newbook.title);

  return (
    <s.Wrapper>
      <DocumentTitle title="독후감 쓰기" />
      <s.Title>독후감 쓰기</s.Title>
      <BookSearchBar
        placeholder="책을 선택해주세요."
        handleClickSearchedItem={(bookInfo: Book) => updateNewbook(bookInfo)}
      />
      {isSelectBook && (
        <>
          <s.HiddenWrapper>
            <BookInfoBox {...newbook} />
          </s.HiddenWrapper>
          <div>
            <s.Label>카테고리</s.Label>
            <Button
              variant={ButtonVariant.OUTLINED}
              color={
                newbook.category ? ColorVariant.PRIMARY : ColorVariant.INHERIT
              }
              onClick={() => openModal(ModalKey.CATEGORY)}
            >
              {newbook.category || '선택'}
            </Button>
          </div>
          <s.Label>평점</s.Label>
          <s.Label>책 표지 사진</s.Label>
          <s.Label>세 줄 독후감</s.Label>
          <s.Label>추가 내용 (선택)</s.Label>
        </>
      )}
      <CategoryModal
        handleClickCategory={(category: Category) => {
          updateNewbook(category);
          closeModal(ModalKey.CATEGORY);
        }}
      />
    </s.Wrapper>
  );
};

export default NewbookPage;
