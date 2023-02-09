import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};
`;

interface NewbookSearchProps {
  bookSearchBar: ReactNode;
}

const NewbookSearch = ({ bookSearchBar }: NewbookSearchProps) => (
  <Wrapper>{bookSearchBar}</Wrapper>
);

export default NewbookSearch;
