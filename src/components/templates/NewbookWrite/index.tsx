import { ReactNode, useEffect } from 'react';
import { useLayoutContext } from '@/contexts/layoutContext';
import * as s from './style';

interface NewbookWriteProps {
  bookName: string;
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

  useEffect(() => {
    hideHeaderBar();
    hideScreenModeButton();
    return () => {
      showHeaderBar();
      showScreenModeButton();
    };
  }, [
    hideHeaderBar,
    hideScreenModeButton,
    showHeaderBar,
    showScreenModeButton,
  ]);

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
