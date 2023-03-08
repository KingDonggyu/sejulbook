import { ReactNode } from 'react';
import * as s from './style';

interface NewbookSearchProps {
  bookSearchBar: ReactNode;
  draftSavedListButton: ReactNode;
}

const NewbookSearch = ({
  bookSearchBar,
  draftSavedListButton,
}: NewbookSearchProps) => (
  <s.Wrapper>
    {bookSearchBar}
    <s.DraftSavedButtonWrapper>
      {draftSavedListButton}
    </s.DraftSavedButtonWrapper>
  </s.Wrapper>
);

export default NewbookSearch;
