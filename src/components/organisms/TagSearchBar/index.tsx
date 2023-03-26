import { useCallback, useState } from 'react';
import { TextFieldProps } from '@/components/atoms/TextField';
import SearchBar from '@/components/molecules/SearchBar';
import { searchTags } from '@/services/api/tag';
import { SearchedTag } from '@/types/features/tag';
import * as s from './style';

const TagSearchedItem = ({ tag, count }: SearchedTag) => (
  <s.Wrapper>
    <s.TagName>#{tag}</s.TagName>
    <s.TagCount>독후감 {count}개</s.TagCount>
  </s.Wrapper>
);

const TagSearchBar = ({ ...textFieldProps }: TextFieldProps) => {
  const [searchedList, setSearchedList] = useState<SearchedTag[]>([]);

  const handleDebounce = useCallback(async (value: string) => {
    if (!value) {
      setSearchedList([]);
      return;
    }
    const searchedTags = await searchTags(value);
    setSearchedList(searchedTags);
  }, []);

  return (
    <SearchBar onDebounce={handleDebounce} {...textFieldProps}>
      {searchedList.map(({ tag, count }) => (
        <TagSearchedItem key={tag} tag={tag} count={count} />
      ))}
    </SearchBar>
  );
};

export default TagSearchBar;
