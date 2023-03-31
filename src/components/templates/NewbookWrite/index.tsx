import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/atoms/Button';
import Route from '@/constants/routes';
import useLoading from '@/hooks/useLoading';
import * as s from './style';

interface NewbookWriteProps {
  bookName?: string;
  logo: ReactNode;
  sejulTextarea: ReactNode;
  contentTextarea: ReactNode;
  publishButton: ReactNode;
  draftSaveButton: ReactNode;
}

const NewbookWrite = ({
  logo,
  bookName,
  sejulTextarea,
  contentTextarea,
  publishButton,
  draftSaveButton,
}: NewbookWriteProps) => {
  const isShowTemplate = Boolean(bookName);
  const router = useRouter();
  const { isLoading } = useLoading();

  if (!isShowTemplate) {
    return (
      <s.ExceptionWrapper>
        <div>책 선택 후 독후감을 쓸 수 있어요.</div>
        <Button onClick={() => router.push(Route.NEWBOOK_SEARCH)}>
          책 선택하러 가기
        </Button>
      </s.ExceptionWrapper>
    );
  }

  return (
    <>
      {!isLoading && (
        <s.Top>
          <s.Logo>{logo}</s.Logo>
          <s.ButtonWrapper>
            {draftSaveButton}
            {publishButton}
          </s.ButtonWrapper>
        </s.Top>
      )}
      <s.ContentWrapper>
        <s.BookName>{bookName}</s.BookName>
        {sejulTextarea}
        {contentTextarea}
      </s.ContentWrapper>
    </>
  );
};

export default NewbookWrite;
