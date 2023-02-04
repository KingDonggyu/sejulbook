import { useReducer } from 'react';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookInfoBox from '@/components/organisms/BookInfoBox';
import BookThumbnailUploader from '@/components/organisms/BookThumbnailUploader';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import { Book } from '@/types/domain/book';
import { BookReview } from '@/types/domain/bookReview';
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
  // const { openModal, closeModal } = modalStore();
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
        <s.HiddenWrapper>
          <BookInfoBox {...newbook} />
          {/* <div>
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
          <s.Label>평점</s.Label> */}
          {/* <s.Label>책 표지 이미지</s.Label>
          <s.ThumbnailSubText>
            *독후감의 대표 이미지로 사용됩니다.
          </s.ThumbnailSubText>
          <BookThumbnailUploader thumbnail={newbook.thumbnail} /> */}
          <s.Label />
          <SejulTextarea />
          {/* <s.Label>추가 내용 (선택)</s.Label> */}
        </s.HiddenWrapper>
      )}
      {/* <CategoryModal
        handleClickCategory={(category: Category) => {
          updateNewbook(category);
          closeModal(ModalKey.CATEGORY);
        }}
      /> */}
    </s.Wrapper>
  );
};

export default NewbookPage;
