import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { Book } from '@/types/features/book';
import { BookReviewId } from '@/types/features/bookReview';
import Route from '@/constants/routes';
import checkLogin from '@/services/middlewares/checkLogin';

const NewbookWritePage = () => {
  const router = useRouter();
  const { getNewbook, removeNewbook } = useNewbookContext();
  const { setBook, setThumbnail } = bookReviewStore();
  const [targetBook, setTargetBook] = useState<Book | null>(null);

  const handleComplete = (bookReviewId: BookReviewId) => {
    removeNewbook();
    router.replace(`${Route.BOOKREVIEW}/${bookReviewId}`);
  };

  useEffect(() => {
    const book = getNewbook();
    setTargetBook(book);
    if (book) {
      setBook(book);
      setThumbnail(book.thumbnail);
    }
  }, [getNewbook, setBook, setThumbnail]);

  return (
    <>
      <DocumentTitle title="독후감 쓰기" />
      <NewbookWrite
        bookName={targetBook ? targetBook.title : undefined}
        sejulTextarea={<SejulTextArea />}
        contentTextarea={<ContentEditor />}
        publishButton={
          targetBook && (
            <PublishSideBar.Button
              newbook={targetBook}
              handleComplete={handleComplete}
            />
          )
        }
        draftSaveButton={<DraftSaveButton />}
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const serverSideProps = await checkLogin(ctx);
  return serverSideProps;
};

export default NewbookWritePage;
