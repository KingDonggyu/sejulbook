import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import { Book } from '@/types/domain/book';
import Route from '@/constants/routes';
import newbookStore from '@/stores/newbookStore';

const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

const NewbookSearchPage = () => {
  const router = useRouter();
  const { setNewBook } = newbookStore();

  const handleClickSearchedItem = (
    _: MouseEvent<HTMLElement>,
    selectedBook: Book,
  ) => {
    setNewBook(selectedBook);
    router.push(
      { pathname: Route.NEWBOOK_WRITE, query: selectedBook },
      Route.NEWBOOK_WRITE,
    );
  };

  return (
    <Wrapper>
      <DocumentTitle title="독후감 쓰기" />
      <BookSearchBar
        placeholder="책을 선택해주세요."
        handleClickSearchedItem={handleClickSearchedItem}
      />
    </Wrapper>
  );
};

export default NewbookSearchPage;
