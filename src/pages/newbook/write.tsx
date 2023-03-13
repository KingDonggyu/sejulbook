import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';

import LogoButton from '@/components/molecules/LogoButton';
import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';

import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import useNewbookFetch from '@/hooks/useNewbookFetch';
import useSavedBookReviewFetch from '@/hooks/useSavedBookReviewFetch';
import useHiddenLayout from '@/hooks/useHiddenLayout';

import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';

import {
  BookReviewId,
  DraftSavedBookReviewURLQuery,
  PublishedBookReviewURLQuery,
} from '@/types/features/bookReview';

const NewbookWritePage = ({
  savedBookReviewId,
  isPublished,
}: {
  savedBookReviewId?: BookReviewId;
  isPublished?: boolean;
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
          logo={<LogoButton />}
          bookName={newBook ? newBook.title : undefined}
          sejulTextarea={<SejulTextArea />}
          contentTextarea={<ContentEditor />}
          publishButton={
            newBook && (
              <PublishSideBar.Button isHiddenDraftSaveButton={isPublished} />
            )
          }
          draftSaveButton={newBook && !isPublished && <DraftSaveButton />}
        />
      )}
    </>
  );
};

interface ExtendedGetServerSidePropsContext
  extends Omit<GetServerSidePropsContext, 'query'> {
  query: PublishedBookReviewURLQuery & DraftSavedBookReviewURLQuery;
}

export const getServerSideProps = async (
  ctx: ExtendedGetServerSidePropsContext,
) => {
  const serverSideProps = await checkLogin(ctx);

  if (checkRedirect(serverSideProps)) {
    return serverSideProps;
  }

  const savedBookReviewId = ctx.query.draft || ctx.query.publish;

  if (savedBookReviewId) {
    const queryClient = await prefetchQuery([
      getBookReviewQuery(Number(savedBookReviewId)),
      getTagsQuery(Number(savedBookReviewId)),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        savedBookReviewId,
        isPublished: !!ctx.query.publish,
      },
    };
  }

  return { props: {} };
};

export default NewbookWritePage;
