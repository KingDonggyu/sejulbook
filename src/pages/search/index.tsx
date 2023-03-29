import SearchTemplate from '@/components/templates/Search';
import SEO from '@/components/atoms/SEO';
import SearchTabs from '@/components/organisms/SearchTabs';
import Route from '@/constants/routes';

const SearchPage = () => (
  <>
    <SEO title="검색" url={Route.SEARCH} />
    <SearchTemplate searchTabs={<SearchTabs />} />
  </>
);

export default SearchPage;
