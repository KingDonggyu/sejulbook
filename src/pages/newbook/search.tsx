import NewbookSearch from '@/components/templates/NewbookSearch';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import { NewbookProvider } from '@/contexts/newbookContext';

const NewbookSearchPage = () => (
  <NewbookProvider>
    <DocumentTitle title="책 선택" />
    <NewbookSearch
      bookSearchBar={<BookSearchBar placeholder="책을 선택해주세요." />}
    />
  </NewbookProvider>
);

export default NewbookSearchPage;
