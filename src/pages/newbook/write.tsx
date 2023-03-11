import { GetServerSideProps } from 'next';
import { dehydrate } from '@tanstack/react-query';

import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';

import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import useNewbookWriteInitialization from '@/hooks/useNewbookWriteInitialization';
import { BookReviewId } from '@/types/features/bookReview';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';

const NewbookWritePage = ({
  savedBookReviewId,
}: {
  savedBookReviewId?: BookReviewId;
}) => {
  const {
    bookReview: { book },
    isLoading,
  } = useNewbookWriteInitialization(savedBookReviewId);

  useS3GarbageCollection();

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      {!isLoading && (
        <NewbookWrite
          bookName={book.title ? book.title : undefined}
          sejulTextarea={<SejulTextArea />}
          contentTextarea={<ContentEditor />}
          publishButton={book && <PublishSideBar.Button />}
          draftSaveButton={book && <DraftSaveButton />}
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
