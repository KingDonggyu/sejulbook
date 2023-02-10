import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLayoutContext } from '@/contexts/layoutContext';
import Button from '@/components/atoms/Button';
import SideBar from '@/components/molecules/SideBar';
import Route from '@/constants/routes';
import * as s from './style';

interface NewbookWriteProps {
  bookName?: string;
  sejulTextarea: ReactNode;
  contentTextarea: ReactNode;
  publishButton: ReactNode;
  draftSaveButton: ReactNode;
}

const NewbookWrite = ({
  bookName,
  sejulTextarea,
  contentTextarea,
  publishButton,
  draftSaveButton,
}: NewbookWriteProps) => {
  const {
    showHeaderBar,
    hideHeaderBar,
    showScreenModeButton,
    hideScreenModeButton,
  } = useLayoutContext();
  const router = useRouter();

  useEffect(() => {
    if (bookName) {
      hideHeaderBar();
      hideScreenModeButton();
    }
    return () => {
      showHeaderBar();
      showScreenModeButton();
    };
  }, [
    bookName,
    hideHeaderBar,
    hideScreenModeButton,
    showHeaderBar,
    showScreenModeButton,
  ]);

  if (!bookName) {
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
      <s.ButtonWrapper>
        {draftSaveButton}
        {publishButton}
      </s.ButtonWrapper>
      <s.Wrapper>
        <s.BookName>{bookName}</s.BookName>
        {sejulTextarea}
        {contentTextarea}
      </s.Wrapper>
    </>
  );
};

export default NewbookWrite;
