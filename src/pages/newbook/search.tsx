import NewbookSearch from '@/components/templates/NewbookSearch';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';

const NewbookSearchPage = () => (
  <>
    <DocumentTitle title="책 선택" />
    <NewbookSearch
      bookSearchBar={<BookSearchBar placeholder="책을 선택해주세요." />}
    />
  </>
);

export default NewbookSearchPage;
