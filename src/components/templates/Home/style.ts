import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.nanumMyeongjo};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    gap: 50px;
  }
`;

export const Banner = styled.div`
  width: 100%;
  padding: 60px 0 60px 15%;
  margin-right: auto;
  padding-top: ${({ theme }) => theme.HEADERBAR_HEIGHT + 60}px;
  background: ${({ theme }) => theme.COLOR.PRIMARY};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    padding: 50px 0 50px 15%;
    padding-top: ${({ theme }) => theme.HEADERBAR_HEIGHT + 50}px;
  }
`;

export const BannerContent = styled.div`
  margin-right: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  color: ${({ theme }) => theme.COLOR.WHITE};
  & > img:first-of-type {
    margin-bottom: 20px;
  }
  & > img:last-of-type {
    margin-top: 20px;
  }
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    gap: 20px;
    & > img {
      width: 20px;
    }
    & > img:first-of-type {
      margin-bottom: 10px;
    }
    & > img:last-of-type {
      margin-top: 10px;
    }
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.DISPLAY};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  }
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  }
`;

export const BookReviewListLabel = styled(SubTitle)`
  padding-left: 10%;
  margin-bottom: 25px;
  span {
    color: ${({ theme }) => theme.COLOR.PRIMARY};
  }
`;

export const bookReviewListStyle = css`
  padding-left: 10%;
  padding-right: 20px;
`;
