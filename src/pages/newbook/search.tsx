import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';
import NewbookSearch from '@/components/templates/NewbookSearch';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import DraftSavedListModal from '@/components/organisms/DraftSavedListModal';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import { getDraftSavedListQuery } from '@/services/queries/bookReview';
import useDraftSavedList from '@/hooks/services/queries/useDraftSavedList';
import { UserId } from '@/types/features/user';
import { Book } from '@/types/features/book';
import { useNewbookContext } from '@/contexts/newbookContext';
import Route from '@/constants/routes';

const NewbookSearchPage = ({ myId }: { myId: UserId }) => {
  const router = useRouter();
  const { setNewbook } = useNewbookContext();
  const draftSavedList = useDraftSavedList(myId);

  const handleClickSearchedItem = (book: Book) => {
    setNewbook(book);
    router.push(Route.NEWBOOK_WRITE);
  };

  return (
    <>
      <DocumentTitle title="책 선택" />
      <NewbookSearch
        bookSearchBar={
          <BookSearchBar onClickSearchedItem={handleClickSearchedItem} />
        }
        draftSavedListButton={
          <DraftSavedListModal.Button draftSavedList={draftSavedList} />
        }
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverSideProps = await checkLogin(ctx);

  if (checkRedirect(serverSideProps) || !serverSideProps.props.userId) {
    return serverSideProps;
  }

  const queryClient = await prefetchQuery([
    getDraftSavedListQuery(serverSideProps.props.userId),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      myId: serverSideProps.props.userId,
    },
  };
};

export default NewbookSearchPage;
