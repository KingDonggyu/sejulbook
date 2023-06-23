import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';
import type { Book } from 'book';

import NewbookSearchTemplate from '@/components/templates/NewbookSearch';
import SEO from '@/components/atoms/SEO';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import DraftSavedListModal from '@/components/organisms/DraftSavedListModal';
import Route from '@/constants/routes';
import NewBookRepository from '@/repository/localStorage/NewBookRepository';
import prefetchQuery from '@/lib/react-query/prefetchQuery';
import useDraftSavedList, {
  getDraftSavedListQuery,
} from '@/hooks/services/queries/useDraftSavedList';

const NewbookSearchPage = () => {
  const newBookRepository = new NewBookRepository();
  const router = useRouter();
  const { draftSavedList } = useDraftSavedList();

  const handleClickSearchedItem = (book: Book) => {
    newBookRepository.set(book);
    router.push(Route.NEWBOOK_WRITE);
  };

  return (
    <>
      <SEO title="책 선택" />
      <NewbookSearchTemplate
        bookSearchBar={
          <BookSearchBar onClickSearchedItem={handleClickSearchedItem} />
        }
        draftSavedListButton={
          draftSavedList && (
            <DraftSavedListModal.Button draftSavedList={draftSavedList} />
          )
        }
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { isLoggedIn, userId } = await checkIsLoggedIn(ctx);

  if (!isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: Route.HOME,
      },
      props: {},
    };
  }

  const queryClient = await prefetchQuery([getDraftSavedListQuery(userId)]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default NewbookSearchPage;
