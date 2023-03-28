import SearchTemplate from '@/components/templates/Search';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SearchTabs from '@/components/organisms/SearchTabs';

const SearchPage = () => (
  <>
    <DocumentTitle title="검색" />
    <SearchTemplate searchTabs={<SearchTabs />} />
  </>
);

export default SearchPage;
