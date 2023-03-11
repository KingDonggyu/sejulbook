import { GetServerSideProps } from 'next';
import { dehydrate } from '@tanstack/react-query';

import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';

import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import useNewbookFetch from '@/hooks/useNewbookFetch';
import { BookReviewId } from '@/types/features/bookReview';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';
import useSavedBookReviewFetch from '@/hooks/useSavedBookReviewFetch';
import useHiddenLayout from '@/hooks/useHiddenLayout';

const NewbookWritePage = ({
  savedBookReviewId,
}: {
  savedBookReviewId?: BookReviewId;
}) => {
  const { newBook, isLoading: newBookLoading } =
    useNewbookFetch(savedBookReviewId);

  const { isLoading: savedBookReviewLoading } =
    useSavedBookReviewFetch(savedBookReviewId);

  const isLoading = newBookLoading || savedBookReviewLoading;

  useHiddenLayout();
  useS3GarbageCollection();

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      {!isLoading && (
        <NewbookWrite
          bookName={newBook ? newBook.title : undefined}
          sejulTextarea={<SejulTextArea />}
          contentTextarea={<ContentEditor />}
          publishButton={newBook && <PublishSideBar.Button />}
          draftSaveButton={newBook && <DraftSaveButton />}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const serverSideProps = await checkLogin(ctx);

  if (checkRedirect(serverSideProps)) {
    return serverSideProps;
  }

  const savedBookReviewId = ctx.query.draft;

  if (savedBookReviewId) {
    const queryClient = await prefetchQuery([
      getBookReviewQuery(Number(savedBookReviewId)),
      getTagsQuery(Number(savedBookReviewId)),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        savedBookReviewId,
      },
    };
  }

  return { props: {} };
};

export default NewbookWritePage;
