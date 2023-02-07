import { useEffect } from 'react';
import { useLayoutContext } from '@/contexts/layoutContext';
import Button from '@/components/atoms/Button';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import { ButtonVariant, ColorVariant } from '@/constants';
import * as s from './style';

const NewbookWritePage = () => {
  const { hideHeaderBar } = useLayoutContext();

  useEffect(() => {
    hideHeaderBar();
  }, [hideHeaderBar]);

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
      </s.Wrapper>
    </>
  );
};

export default NewbookWritePage;
