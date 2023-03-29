import Image from 'next/image';
import styled from '@emotion/styled';
import SEO from '@/components/atoms/SEO';
import quotesLeftSrc from '@public/images/icon-quotes-left.svg';
import quotesRightSrc from '@public/images/icon-quotes-right.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7rem;
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

const ErrorPage = () => (
  <>
    <SEO />
    <Wrapper>
      <Image src={quotesLeftSrc} alt="왼쪽 큰따옴표 아이콘" />
      <Title>
        예상하지 못한 오류가 발생했습니다.
        <span>잠시 후 다시 시도해 주세요.</span>
      </Title>
      <Image src={quotesRightSrc} alt="오른쪽 큰따옴표 아이콘" />
      <Detail>500 - Server Error</Detail>
    </Wrapper>
  </>
);

export default ErrorPage;
