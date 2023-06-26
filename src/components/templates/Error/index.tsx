import Image from 'next/image';
import styled from '@emotion/styled';
import quotesLeftSrc from '@public/images/icon-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-quotes-right.svg';
import { ReactNode } from 'react';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14rem;
  gap: 30px;
`;

const Title = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

const Detail = styled.p`
  margin-top: 30px;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
`;

interface ErrorTemplateProps {
  title: ReactNode | string;
  errorMessage: string;
}

const ErrorTemplate = ({ title, errorMessage }: ErrorTemplateProps) => (
  <Wrapper>
    <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
    <Title>{title}</Title>
    <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
    <Detail>{errorMessage}</Detail>
  </Wrapper>
);

export default ErrorTemplate;
