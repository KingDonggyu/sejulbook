import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { dehydrate } from '@tanstack/react-query';

import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor, {
  editorElementId,
} from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';

import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import useSavedBookReview from '@/hooks/useSavedBookReview';
import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import { BookReviewId } from '@/types/features/bookReview';
import Route from '@/constants/routes';
import checkLogin, { checkRedirect } from '@/services/middlewares/checkLogin';
import prefetchQuery from '@/services/prefetchQuery';
import {
  getBookReviewQuery,
  getTagsQuery,
} from '@/services/queries/bookReview';
import getUsedS3ImageURLs from '@/utils/getUsedS3ImageURLs';

const NewbookWritePage = ({
  savedBookReviewId,
}: {
  savedBookReviewId: BookReviewId | null;
}) => {
  const router = useRouter();

  // 저장된 독후감 정보로 초기화
  const { isLoading: isSavedBookReviewLoading } =
    useSavedBookReview(savedBookReviewId);

  // 검색한 책 정보 가져오기 (in 로컬스토리지)
  const { getNewbook } = useNewbookContext();
  const { book, isLoading: isNewBookLoading } = getNewbook();

  // 독후감 작성 상태 관리
  const { bookReview, setBook, setThumbnail } = bookReviewStore();
  const { deleteImageKey } = s3ImageURLStore();

  const isLoading = isSavedBookReviewLoading || isNewBookLoading;

  // S3 이미지 스토리지 최적화
  useS3GarbageCollection();

  useEffect(() => {
    if (savedBookReviewId) {
      return;
    }

    if (book && !bookReview.book.title) {
      setBook(book);
      setThumbnail(book.thumbnail);
    }
  }, [book, bookReview.book.title, savedBookReviewId, setBook, setThumbnail]);

  const handleComplete = (bookReviewId: BookReviewId) => {
    getUsedS3ImageURLs(editorElementId).forEach((url) => {
      deleteImageKey(url);
    });

    if (bookReview.thumbnail) {
      deleteImageKey(bookReview.thumbnail);
    }

    router.replace(`${Route.BOOKREVIEW}/${bookReviewId}`);
  };

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      {!isLoading && (
        <NewbookWrite
          bookName={book ? book.title : undefined}
          sejulTextarea={<SejulTextArea />}
          contentTextarea={<ContentEditor />}
          publishButton={
            book && (
              <PublishSideBar.Button
                newbook={book}
                handleComplete={handleComplete}
              />
            )
          }
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

  return { props: { savedBookReviewId: null } };
};

export default NewbookWritePage;
