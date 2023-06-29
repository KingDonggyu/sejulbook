import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import type { SearchTagResponse, Tag } from 'tag';
import TagRepository from '@/repository/api/TagRepository';
import { TextFieldProps } from '@/components/atoms/TextField';
import SearchBar from '@/components/molecules/SearchBar';
import Route from '@/constants/routes';
import * as s from './style';

interface TagSearchedItemProps extends SearchTagResponse {
  onClickSearchedItem: (tag: Tag) => void;
}

const TagSearchedItem = ({
  tag,
  count,
  onClickSearchedItem,
}: TagSearchedItemProps) => (
  <s.Wrapper onClick={() => onClickSearchedItem(tag)}>
    <s.TagName>#{tag}</s.TagName>
    <s.TagCount>독후감 {count}개</s.TagCount>
  </s.Wrapper>
);

interface TagSearchBarProps extends TextFieldProps {
  initialValue?: string;
}

const TagSearchBar = ({
  initialValue,
  ...textFieldProps
}: TagSearchBarProps) => {
  const router = useRouter();
  const [searchedList, setSearchedList] = useState<SearchTagResponse[]>([]);
  const tagRepository = useMemo(() => new TagRepository(), []);

  const handleDebounce = useCallback(
    async (query: string) => {
      if (!query) {
        setSearchedList([]);
        return;
      }
      const searchedTags = await tagRepository.search(query);
      setSearchedList(searchedTags);
    },
    [tagRepository],
  );

  const handleClickSearchedItem = (tag: Tag) => {
    router.push({
      pathname: Route.SEARCH_RESULT_BY_TAG,
      query: { q: tag },
    });
  };

  return (
    <SearchBar
      initialValue={initialValue}
      onDebounce={handleDebounce}
      {...textFieldProps}
    >
      {searchedList.map(({ tag, count }) => (
        <TagSearchedItem
          key={tag}
          tag={tag}
          count={count}
          onClickSearchedItem={handleClickSearchedItem}
        />
      ))}
    </SearchBar>
  );
};

export default TagSearchBar;
