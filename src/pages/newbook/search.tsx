import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import checkIsLoggedIn from '@/server/middlewares/checkIsLoggedIn';
import type { Book } from 'book';

import NewbookSearchTemplate from '@/components/templates/NewbookSearch';
import SEO from '@/components/atoms/SEO';
import BookSearchBar from '@/components/organisms/BookSearchBar';
import DraftSavedListModal from '@/components/organisms/DraftSavedListModal';
import Route from '@/constants/routes';
import NewBookRepository from '@/repository/localStorage/NewBookRepository';
import useDraftSavedList from '@/hooks/services/queries/useDraftSavedList';

const NewbookSearchPage = () => {
  const router = useRouter();
  const { draftSavedList, isLoading } = useDraftSavedList();
  const newBookRepository = new NewBookRepository();

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
          <DraftSavedListModal.Button
            draftSavedList={draftSavedList}
            isLoading={isLoading}
          />
        }
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { isLoggedIn } = await checkIsLoggedIn(ctx);

  if (!isLoggedIn) {
    return {
      redirect: {
        permanent: false,
        destination: Route.HOME,
      },
      props: {},
    };
  }

  return { props: {} };
};

export default NewbookSearchPage;
