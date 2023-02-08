import styled from '@emotion/styled';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';

const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

const NewbookSearch = () => (
  <Wrapper>
    <DocumentTitle title="독후감 쓰기" />
    <BookSearchBar placeholder="책을 선택해주세요." />
  </Wrapper>
);

export default NewbookSearch;
