import { useState } from 'react';
import { useRouter } from 'next/router';
import Tabs from '@/components/molecules/Tabs';
import CategoryContainer from '@/components/organisms/CategoryContainer';
import UserSearchBar from '@/components/organisms/UserSearchBar';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import TagSearchBar from '@/components/organisms/TagSearchBar';
import useCategories from '@/hooks/services/queries/useCategories';
import Route from '@/constants/routes';
import * as s from './style';

const BookReviewSearchTabs = () => {
  const router = useRouter();
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
        {selectedTab === 0 && <BookSearchBar />}
        {selectedTab === 1 && (
          <TagSearchBar placeholder="태그를 입력해주세요." />
        )}
        {selectedTab === 2 && (
          <s.CategoryWrapper>
            <CategoryContainer
              categories={categories}
              handleClickCategory={({ category }) =>
                router.push({
                  pathname: Route.SEARCH_RESULT_BY_CATEGORY,
                  query: { q: category },
                })
              }
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
