import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const bookReviewListStyle = (theme: Theme) => css`
  padding-left: 10%;
  padding-right: 10%;
  div {
    font-size: ${theme.FONT_SIZE.SMALL};
  }
`;

export const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  gap: 10px;
  color: ${({ theme }) => theme.COLOR.WHITE};
`;

export const Content = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BookName = styled.h3`
  position: absolute;
  top: 35%;
  padding: 20px;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const Writer = styled.h4`
  position: absolute;
  bottom: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const AltWrapper = styled.div`
  width: fit-content;
  margin: 80px auto;
  padding-left: 15px;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    margin: 20px auto;
  }
`;

export const BookReviewListAltText = styled.div`
  color: ${({ theme }) => theme.COLOR.SECOND_TEXT};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE};
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  }
`;

export const loginButtonStyle = (theme: Theme) => css`
  margin: auto;
  margin-top: 30px;
  padding-right: 10px;
  padding-left: 10px;
  color: ${theme.COLOR.PRIMARY};
  border-color: ${theme.COLOR.PRIMARY};
  font-size: ${theme.FONT_SIZE.SMALL};
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    margin-top: 20px;
    font-size: ${theme.FONT_SIZE.EXTRA_SMALL};
  }
`;
