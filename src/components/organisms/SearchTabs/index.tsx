import { useState } from 'react';
import Tabs from '@/components/molecules/Tabs';
import useCategories from '@/hooks/services/queries/useCategories';
import CategoryContainer from '../CategoryContainer';
import UserSearchBar from '../UserSearchBar';
import BookSearchBar from '../BookSearchBar';
import * as s from './style';
import TagSearchBar from '../TagSearchBar';

const BookReviewSearchTabs = () => {
  const categories = useCategories();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const bookReviewSearchItems = [
    { title: '책', onClick: handleSelectTab },
    { title: '태그', onClick: handleSelectTab },
    { title: '카테고리', onClick: handleSelectTab },
  ];

  return (
    <Tabs
      tabItems={bookReviewSearchItems}
      isShowOutline={false}
      isShowDivider
      small
      css={s.bookReviewSearchTabsStyle}
    >
      <s.TabContentWrapper>
        {selectedTab === 0 && (
          <BookSearchBar placeholder="제목 또는 저자를 입력해주세요." />
        )}
        {selectedTab === 1 && (
          <TagSearchBar placeholder="태그를 입력해주세요." />
        )}
        {selectedTab === 2 && (
          <s.CategoryWrapper>
            <CategoryContainer
              categories={categories}
              handleClickCategory={() => {}}
            />
          </s.CategoryWrapper>
        )}
      </s.TabContentWrapper>
    </Tabs>
  );
};

const SearchTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const searchItems = [
    {
      title: '독후감 검색',
      onClick: handleSelectTab,
    },
    {
      title: '서재 검색',
      onClick: handleSelectTab,
    },
  ];

  return (
    <Tabs tabItems={searchItems} css={s.searchTabsStyle}>
      <s.TabContentWrapper>
        {selectedTab === 0 ? (
          <BookReviewSearchTabs />
        ) : (
          <UserSearchBar placeholder="서재 이름을 입력해주세요." />
        )}
      </s.TabContentWrapper>
    </Tabs>
  );
};

export default SearchTabs;
