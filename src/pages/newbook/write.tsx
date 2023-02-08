import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLayoutContext } from '@/contexts/layoutContext';
import Button from '@/components/atoms/Button';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentTextarea from '@/components/organisms/ContentTextarea';
import { ButtonVariant, ColorVariant } from '@/constants';
import newbookStore from '@/stores/newbookStore';
import * as s from './style';

const NewbookWritePage = () => {
  const { newbook } = newbookStore();

  console.log(useRouter());

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
        <s.BookName>{newbook.title}</s.BookName>
        <SejulTextarea />
        <ContentTextarea />
      </s.Wrapper>
    </>
  );
};

export default NewbookWritePage;
