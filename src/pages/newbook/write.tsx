import { useEffect, useState } from 'react';
import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextArea from '@/components/organisms/SejulTextarea';
import ContentEditor from '@/components/organisms/ContentEditor';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { Book } from '@/types/features/book';

const NewbookWritePage = () => {
  const { getNewbook } = useNewbookContext();
  const { setBook, setThumbnail } = bookReviewStore();
  const [targetBook, setTargetBook] = useState<Book | null>(null);

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
          targetBook && <PublishSideBar.Button newbook={targetBook} />
        }
        draftSaveButton={<DraftSaveButton />}
      />
    </>
  );
};

export default NewbookWritePage;
