import NewbookWrite from '@/components/templates/NewbookWrite';
import { NewbookProvider } from '@/contexts/newbookContext';

const NewbookWritePage = () => (
  <NewbookProvider>
    <NewbookWrite />
  </NewbookProvider>
);

export default NewbookWritePage;
