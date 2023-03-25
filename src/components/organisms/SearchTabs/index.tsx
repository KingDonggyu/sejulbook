import { useState } from 'react';
import Tabs from '@/components/molecules/Tabs';
import SearchBar from '@/components/molecules/SearchBar';
import useCategories from '@/hooks/services/queries/useCategories';
import CategoryContainer from '../CategoryContainer';
import * as s from './style';
import UserSearchBar from '../UserSearchBar';
import BookReviewSearchBar from '../BookReviewSearchBar';

const BookReviewSearchTabs = () => {
  const categories = useCategories();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  const bookReviewSearchItems = [
    { title: '제목', onClick: handleSelectTab },
    { title: '저자', onClick: handleSelectTab },
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
          <BookReviewSearchBar placeholder="책 제목을 입력해주세요." />
        )}
        {selectedTab === 1 && (
          <BookReviewSearchBar
            placeholder="책 저자를 입력해주세요."
            isTitle={false}
          />
        )}
        {selectedTab === 2 && (
          <SearchBar placeholder="태그를 입력해주세요.">{null}</SearchBar>
        )}
        {selectedTab === 3 && (
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
    <Tabs tabItems={searchItems}>
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
