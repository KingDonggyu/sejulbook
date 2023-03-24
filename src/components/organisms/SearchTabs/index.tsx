import Tabs from '@/components/molecules/Tabs';

const SearchTabs = () => {
  const searchItems = [
    { title: '독후감 검색', onClick: () => {} },
    { title: '서재 검색', onClick: () => {} },
  ];

  const bookReviewSearchItems = [
    { title: '제목', onClick: () => {} },
    { title: '저자', onClick: () => {} },
    { title: '태그', onClick: () => {} },
    { title: '카테고리', onClick: () => {} },
  ];

  return (
    <Tabs tabItems={searchItems}>
      <Tabs
        tabItems={bookReviewSearchItems}
        isShowBottomLine={false}
        isShowDivider
        small
      >
        test
      </Tabs>
    </Tabs>
  );
};

export default SearchTabs;
