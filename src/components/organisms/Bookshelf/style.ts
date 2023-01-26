import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { bookThumbnailStyle } from '@/styles/common';

export const wrtieBookReviewButtonStyle = (theme: Theme) => css`
  ${bookThumbnailStyle(theme)}
  margin: 0 auto !important;
  & > span {
    font-size: ${theme.FONT_SIZE.LARGE};
  }
  & > svg > path {
    stroke-width: 1;
  }
`;

export const Wrapper = styled.div``;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  & > * {
    margin: auto;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 15px;
  margin-top: 20px;
  margin-bottom: 50px;
  background: ${({ theme }) => theme.COLOR.BROWN};
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 30%);
  @media screen and (max-width: ${({ theme }) => theme.MAX_WIDTH.MOBILE}) {
    height: 10px;
  }
`;
