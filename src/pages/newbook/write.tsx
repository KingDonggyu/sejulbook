import { useEffect, useState } from 'react';
import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentTextarea from '@/components/organisms/ContentTextarea';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import DraftSaveButton from '@/components/organisms/DraftSaveButton';
import { useNewbookContext } from '@/contexts/newbookContext';
import bookReviewStore from '@/stores/bookReviewStore';
import { Book } from '@/types/domain/book';

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
        sejulTextarea={<SejulTextarea />}
        contentTextarea={<ContentTextarea />}
        publishButton={
          targetBook && <PublishSideBar.Button newbook={targetBook} />
        }
        draftSaveButton={<DraftSaveButton />}
      />
    </>
  );
};

export default NewbookWritePage;
