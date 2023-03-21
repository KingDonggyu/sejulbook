import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const bookReviewListStyle = (theme: Theme) => css`
  padding-left: 10%;
  padding-right: 20px;
  div {
    font-size: ${theme.FONT_SIZE.SMALL};
  }
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.COLOR.WHITE};
`;

export const Test = styled.div`
  padding: 20px;
  position: absolute;
  text-align: center;
  top: 35%;
`;

export const BookName = styled.h3`
  line-height: 1.5;
  font-size: ${({ theme }) => theme.FONT_SIZE.EXTRA_LARGE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const Writer = styled.h4`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.MEDIUM};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.MYEONGJO_BOLD};
`;

export const AltWrapper = styled.div`
  width: fit-content;
  margin: 80px auto;
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    margin: 50px auto;
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
  padding-right: 15px;
  padding-left: 15px;
  color: ${theme.COLOR.PRIMARY};
  border-color: ${theme.COLOR.PRIMARY};
  font-size: ${theme.FONT_SIZE.LARGE};
  @media screen and (max-width: ${theme.MAX_WIDTH.MOBILE}) {
    font-size: ${theme.FONT_SIZE.SMALL};
  }
`;
