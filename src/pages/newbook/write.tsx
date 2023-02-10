import { useEffect, useState } from 'react';
import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Button from '@/components/atoms/Button';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentTextarea from '@/components/organisms/ContentTextarea';
import PublishSideBar from '@/components/organisms/PublishSideBar';
import { ButtonVariant } from '@/constants';
import { useNewbookContext } from '@/contexts/newbookContext';
import { Book } from '@/types/domain/book';

const NewbookWritePage = () => {
  const { getNewbook } = useNewbookContext();
  const [targetBook, setTargetBook] = useState<Book | null>(null);

  useEffect(() => {
    setTargetBook(getNewbook());
  }, [getNewbook]);

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
        draftSaveButton={
          <Button variant={ButtonVariant.OUTLINED}>임시 저장</Button>
        }
      />
    </>
  );
};

export default NewbookWritePage;
