import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin: auto;
  padding-top: 30px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  max-width: ${({ theme }) => theme.MAX_WIDTH.CONTENT};

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 20px 0;
    padding-bottom: 0;
  }
`;

export const Title = styled.h1`
  line-height: 1.5;
  text-align: center;
  padding-bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};

  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  padding: 10px 0;

  & > *:first-of-type {
    width: 100%;
  }

  button {
    border-color: ${({ theme }) => theme.COLOR.LINE};
  }
`;

export const BookReviewListWrapper = styled.div``;

export const AltText = styled.p`
  line-height: 1.5;
  text-align: center;
  margin-top: 100px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.notoSansKR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.BOLD};
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;
