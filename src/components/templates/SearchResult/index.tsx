import { ReactNode } from 'react';
import * as s from './style';

interface SearchResultTemplateProps {
  pageTitle: string;
  searchBar: ReactNode;
  sortButton: ReactNode;
  bookshelf: ReactNode;
}

const SearchResultTemplate = ({
  pageTitle,
  searchBar,
  sortButton,
  bookshelf,
}: SearchResultTemplateProps) => (
  <s.Wrapper>
    <s.Title>{pageTitle}</s.Title>
    <s.SearchBarWrapper>
      {searchBar}
      {sortButton}
    </s.SearchBarWrapper>
    {bookshelf ? (
      <s.BookReviewListWrapper>{bookshelf}</s.BookReviewListWrapper>
    ) : (
      <s.AltText>
        <span>{pageTitle}</span>에 대한 기록이 없습니다
      </s.AltText>
    )}
  </s.Wrapper>
);

export default SearchResultTemplate;
