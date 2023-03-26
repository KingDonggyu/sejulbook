import { ReactNode } from 'react';
import * as s from './style';

interface SearchTemplateProps {
  searchTabs: ReactNode;
}

const SearchTemplate = ({ searchTabs }: SearchTemplateProps) => (
  <s.Wrapper>{searchTabs}</s.Wrapper>
);

export default SearchTemplate;
