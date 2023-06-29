import styled from '@emotion/styled';

export const Wrapper = styled.main`
  margin: auto;
  padding: 7rem 20px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};

  & > button {
    margin-left: auto;
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
    font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};

  span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  }
`;

export const BookReviewListWrapper = styled.div`
  padding-top: 20px;
`;
