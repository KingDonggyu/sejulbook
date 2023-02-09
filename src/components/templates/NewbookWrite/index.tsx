import { useEffect } from 'react';
import { useLayoutContext } from '@/contexts/layoutContext';
import Button from '@/components/atoms/Button';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentTextarea from '@/components/organisms/ContentTextarea';
import { useNewbookContext } from '@/contexts/newbookContext';
import { ButtonVariant, ColorVariant } from '@/constants';
import * as s from './style';

const NewbookWrite = () => {
  const { newbook } = useNewbookContext();
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
        <Button variant={ButtonVariant.OUTLINED}>임시 저장</Button>
        <Button variant={ButtonVariant.OUTLINED} color={ColorVariant.PRIMARY}>
          발행
        </Button>
      </s.ButtonWrapper>
      <s.Wrapper>
        <s.BookName>브레이킹 루틴</s.BookName>
        <SejulTextarea />
        <ContentTextarea />
      </s.Wrapper>
    </>
  );
};

export default NewbookWrite;
