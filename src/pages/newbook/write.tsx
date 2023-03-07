import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
import useS3GarbageCollection from '@/hooks/useS3GarbageCollection';
import { BookReviewId } from '@/types/features/bookReview';
import Route from '@/constants/routes';
import checkLogin from '@/services/middlewares/checkLogin';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import getUsedS3ImageURLs from '@/utils/getUsedS3ImageURLs';

const NewbookWritePage = () => {
  const router = useRouter();

  const { getNewbook } = useNewbookContext();
  const { book, isLoading } = getNewbook();

  const { bookReview, setBook, setThumbnail } = bookReviewStore();
  const { deleteImageKey } = s3ImageURLStore();

  const handleComplete = (bookReviewId: BookReviewId) => {
    getUsedS3ImageURLs(editorElementId).forEach((url) => {
      deleteImageKey(url);
    });
    if (bookReview.thumbnail) {
      deleteImageKey(bookReview.thumbnail);
    }
    router.push(`${Route.BOOKREVIEW}/${bookReviewId}`);
  };

  useEffect(() => {
    if (book && !bookReview.book.title) {
      setBook(book);
      setThumbnail(book.thumbnail);
    }
  }, [book, bookReview.book.title, setBook, setThumbnail]);

  useS3GarbageCollection();

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
  return serverSideProps;
};

export default NewbookWritePage;
