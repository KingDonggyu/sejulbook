import { GetServerSidePropsContext } from 'next';
import NewbookSearch from '@/components/templates/NewbookSearch';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import DraftSavedListModal from '@/components/organisms/DraftSavedListModal';
import checkLogin from '@/services/middlewares/checkLogin';

const NewbookSearchPage = () => (
  <>
    <DocumentTitle title="책 선택" />
    <NewbookSearch
      bookSearchBar={<BookSearchBar placeholder="책을 선택해주세요." />}
      draftSavedListButton={<DraftSavedListModal.Button />}
    />
  </>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverSideProps = await checkLogin(ctx);
  return serverSideProps;
};

export default NewbookSearchPage;
