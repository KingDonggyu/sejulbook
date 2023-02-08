import NewbookSearch from '@/components/templates/NewbookSearch';
import { NewbookProvider } from '@/contexts/newbookContext';

const NewbookSearchPage = () => (
  <NewbookProvider>
    <NewbookSearch />
  </NewbookProvider>
);

export default NewbookSearchPage;
